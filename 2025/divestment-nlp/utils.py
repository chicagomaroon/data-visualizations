# coding=utf-8
# Copyright 2024 The Google Research Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import math
from torch_geometric import nn
import torch.nn.functional as F
import torch

from typing import Tuple
import numpy as np
from scipy.sparse import base
from sklearn.metrics import cluster

"""Deep Modularity Network (DMoN) Keras layer.

Deep Modularity Network (DMoN) layer implementation as presented in
"Graph Clustering with Graph Neural Networks" in a form of TF 2.0 Keras layer.
DMoN optimizes modularity clustering objective in a fully unsupervised regime.
"""

class DMoN(nn.Module):
    """Implementation of Deep Modularity Network (DMoN) layer in PyTorch.

    Deep Modularity Network (DMoN) layer implementation as presented in
    "Graph Clustering with Graph Neural Networks" in a form of PyTorch module.
    DMoN optimizes modularity clustering objective in a fully unsupervised mode,
    however, this implementation can also be used as a regularizer in a supervised
    graph neural network. Optionally, it does graph unpooling.

    Attributes:
        n_clusters: Number of clusters in the model.
        collapse_regularization: Collapse regularization weight.
        dropout_rate: Dropout rate. Note that the dropout in applied to the
          intermediate representations before the softmax.
        do_unpooling: Parameter controlling whether to perform unpooling of the
          features with respect to their soft clusters. If true, shape of the input
          is preserved.
    """

    def __init__(self, n_clusters, collapse_regularization=0.1, dropout_rate=0, do_unpooling=False):
        """Initializes the layer with specified parameters."""
        super(DMoN, self).__init__()
        self.n_clusters = n_clusters
        self.collapse_regularization = collapse_regularization
        self.dropout_rate = dropout_rate
        self.do_unpooling = do_unpooling

        self.transform = nn.Sequential(
            # number of in features
            nn.Linear(384, n_clusters),
            nn.Dropout(dropout_rate)
        )

    def forward(self, features, adjacency):
        """Performs DMoN clustering according to input features and input graph.

        Args:
            features: A (n*d) node feature matrix.
            adjacency: A (n*n) sparse graph adjacency matrix.

        Returns:
            A tuple (features, clusters) with (k*d) cluster representations and
            (n*k) cluster assignment matrix, where k is the number of cluster,
            d is the dimensionality of the input, and n is the number of nodes in the
            input graph. If do_unpooling is True, returns (n*d) node representations
            instead of cluster representations.
        """
        assert isinstance(features, torch.Tensor)
        assert isinstance(adjacency, torch.sparse.FloatTensor)
        assert len(features.shape) == 2
        assert len(adjacency.shape) == 2
        assert features.shape[0] == adjacency.shape[0]

        assignments = F.softmax(self.transform(features), dim=1)
        cluster_sizes = torch.sum(assignments, dim=0)  # Size [k].
        assignments_pooling = assignments / cluster_sizes  # Size [n, k].

        degrees = torch.sparse.sum(adjacency, dim=0)  # Size [n].
        degrees = degrees.view(-1, 1)

        number_of_nodes = adjacency.shape[1]
        number_of_edges = torch.sum(degrees)

        # Computes the size [k, k] pooled graph as S^T*A*S in two multiplications.
        graph_pooled = torch.transpose(torch.sparse.mm(adjacency, assignments), 0, 1)
        graph_pooled = torch.mm(graph_pooled, assignments)

        # We compute the rank-1 normalizer matrix S^T*d*d^T*S efficiently
        # in three matrix multiplications by first processing the left part S^T*d
        # and then multiplying it by the right part d^T*S.
        # Left part is [k, 1] tensor.
        normalizer_left = torch.mm(assignments.t(), degrees)
        # Right part is [1, k] tensor.
        normalizer_right = torch.mm(degrees.t(), assignments)

        # Normalizer is rank-1 correction for degree distribution for degrees of the
        # nodes in the original graph, casted to the pooled graph.
        normalizer = torch.mm(normalizer_left, normalizer_right) / 2 / number_of_edges
        spectral_loss = -torch.trace(graph_pooled - normalizer) / 2 / number_of_edges
        self.add_loss(spectral_loss)

        collapse_loss = torch.norm(cluster_sizes) / number_of_nodes * torch.sqrt(
            torch.tensor(float(self.n_clusters))) - 1
        self.add_loss(self.collapse_regularization * collapse_loss)

        features_pooled = torch.mm(assignments_pooling.t(), features)
        features_pooled = F.selu(features_pooled)
        if self.do_unpooling:
            features_pooled = torch.mm(assignments_pooling, features_pooled)
        return features_pooled, assignments

def build_dmon(input_features, input_graph, input_adjacency, n_clusters, architecture, collapse_regularization, dropout_rate):
    """Builds a Deep Modularity Network (DMoN) model from the PyTorch inputs.

    Args:
        input_features: A dense [n, d] PyTorch tensor for the node features.
        input_graph: A sparse [n, n] PyTorch tensor for the normalized graph.
        input_adjacency: A sparse [n, n] PyTorch tensor for the graph adjacency.

    Returns:
        Built PyTorch DMoN model.
    """
    output = input_features
    for n_channels in architecture:
        output = GCN(n_channels)([output, input_graph])
    pool, pool_assignment = DMoN(
        n_clusters,
        collapse_regularization=collapse_regularization,
        dropout_rate=dropout_rate
    )([output, input_adjacency])
    return nn.Module(
        inputs=[input_features, input_graph, input_adjacency],
        outputs=[pool, pool_assignment]
    )

"""Graph Convolutional Network layer, as in Kipf&Welling with modifications.

Modifications include the skip-connection and changing the nonlinearity to SeLU.
"""

class GCN(nn.Module):
    """Implementation of Graph Convolutional Network (GCN) layer in PyTorch.

    Attributes:
        n_channels: Output dimensionality of the layer.
        skip_connection: If True, node features are propagated without neighborhood
          aggregation.
        activation: Activation function to use for the final representations.
    """

    def __init__(self, 
                 n_channels,
                 activation='selu', 
                 skip_connection=True):
        """Initializes the layer with specified parameters."""
        super(GCN, self).__init__()
        self.n_channels = n_channels
        self.skip_connection = skip_connection

        if isinstance(activation, str):
            self.activation = getattr(F, activation)
        elif callable(activation):
            self.activation = activation
        else:
            raise ValueError('GCN activation of unknown type')

    def build(self, input_shape):
        """Builds the PyTorch model according to the input shape."""
        self.n_features = input_shape[1]
        self.kernel = nn.Parameter(torch.Tensor(self.n_features, self.n_channels))
        self.bias = nn.Parameter(torch.Tensor(self.n_channels))
        if self.skip_connection:
            self.skip_weight = nn.Parameter(torch.Tensor(self.n_channels))
        else:
            self.skip_weight = 0

        nn.init.kaiming_uniform_(self.kernel, a=math.sqrt(5))
        nn.init.zeros_(self.bias)
        if self.skip_connection:
            nn.init.ones_(self.skip_weight)

    def forward(self, inputs):
        """Computes GCN representations according to input features and input graph.

        Args:
            inputs: A tuple of PyTorch tensors. First element is (n*d) node feature
              matrix and the second is normalized (n*n) sparse graph adjacency matrix.

        Returns:
            An (n*n_channels) node representation matrix.
        """
        features, norm_adjacency = inputs

        assert isinstance(features, torch.Tensor)
        assert isinstance(norm_adjacency, torch.sparse.FloatTensor)
        assert len(features.shape) == 2
        assert len(norm_adjacency.shape) == 2
        assert features.shape[0] == norm_adjacency.shape[0]

        output = torch.matmul(features, self.kernel)
        if self.skip_connection:
            output = output * self.skip_weight + torch.sparse.mm(norm_adjacency, output)
        else:
            output = torch.sparse.mm(norm_adjacency, output)
        output = output + self.bias
        return self.activation(output)


"""Clustering metric implementation (pairwise and graph-based)."""

def modularity(adjacency, clusters):
  """Computes graph modularity.

  Args:
    adjacency: Input graph in terms of its sparse adjacency matrix.
    clusters: An (n,) int cluster vector.

  Returns:
    The value of graph modularity.
    https://en.wikipedia.org/wiki/Modularity_(networks)
  """
  degrees = adjacency.sum(axis=0).A1
  n_edges = degrees.sum()  # Note that it's actually 2*n_edges.
  result = 0
  for cluster_id in np.unique(clusters):
    cluster_indices = np.where(clusters == cluster_id)[0]
    adj_submatrix = adjacency[cluster_indices, :][:, cluster_indices]
    degrees_submatrix = degrees[cluster_indices]
    result += np.sum(adj_submatrix) - (np.sum(degrees_submatrix)**2) / n_edges
  return result / n_edges


def conductance(adjacency, clusters):
  """Computes graph conductance as in Yang & Leskovec (2012).

  Args:
    adjacency: Input graph in terms of its sparse adjacency matrix.
    clusters: An (n,) int cluster vector.

  Returns:
    The average conductance value of the graph clusters.
  """
  inter = 0  # Number of inter-cluster edges.
  intra = 0  # Number of intra-cluster edges.
  cluster_indices = np.zeros(adjacency.shape[0], dtype=bool)
  for cluster_id in np.unique(clusters):
    cluster_indices[:] = 0
    cluster_indices[np.where(clusters == cluster_id)[0]] = 1
    adj_submatrix = adjacency[cluster_indices, :]
    inter += np.sum(adj_submatrix[:, cluster_indices])
    intra += np.sum(adj_submatrix[:, ~cluster_indices])
  return intra / (inter + intra)
