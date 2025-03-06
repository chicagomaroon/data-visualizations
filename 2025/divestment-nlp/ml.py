# Purpose: Replicate S2 Chunking methodology and compare with using GNN and traditional methods
# Author: Karen Yi
# Date: 03-02-2025
# %% imports
from __future__ import annotations

import igraph as ig
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
from sklearn.cluster import SpectralClustering
from sklearn.manifold import TSNE
from sklearn.metrics import silhouette_score
from sklearn.datasets import fetch_20newsgroups
import torch
from torch_geometric import nn
import torch.nn.functional as F

#%% load 20newsgroups

categories = [
    'alt.atheism', 
    'talk.religion.misc',
    'talk.politics.mideast',
    'misc.forsale',
    'comp.graphics', 
    'sci.space'
]

# 4 minutes
newsgroups_train = fetch_20newsgroups(
    subset='train',
    categories=categories
)

# %% read data
# Each row is a chunk

df = pd.read_excel('scrape-clean.xlsx', index_col=None)
# df = df.loc[df['Source']=="The University and South Africa connections"]
# df = df.loc[df['Publication']=="Maroon"]
# df = df.reset_index(drop=True)

df['Metadata'] = df['Administration'] + ' ' + df['Publication'] + ' ' + df['Date of Event'] + ' ' + df['Source'] + ' ' + df['Link']

# %% get BERT embeddings
# These will be used as the node features in the graph
# Using Sentence-BERT as it has semantically meaningful and comparable embeddings https://sbert.net/

# 1. Load a pretrained Sentence Transformer model
sbert = SentenceTransformer('all-MiniLM-L6-v2')

# 2. Calculate embeddings by calling model.encode()
embeddings = sbert.encode(df['Text'])
print(embeddings.shape)

metadata = sbert.encode(df['Metadata'])
print(metadata.shape)

# 2 minutes
newsembeds = sbert.encode(newsgroups_train.data)
print(newsembeds.shape)

# pd.DataFrame({'embeddings':embeddings}).to_excel('embeddings.xlsx')

# %% calculate embedding cosine weights
# Cosine similarity of BERT embeddings is used as edge weights

# 3. Calculate the embedding similarities
similarities = sbert.similarity(embeddings, embeddings)

# similarities[similarities < .1] = 0

# %% calculate bbox weights

# Define adjacency matrix where consecutive paragraphs are counted as adjacent
# However, remove values where articles are adjacent since this is arbitrary

block_sizes=df.groupby('Link').size().values.cumsum()

A=np.diag([1]*embeddings.shape[0])
for i in range(A.shape[0]):
    for j in range(A.shape[1]):
        ok1 = (i-j)==1 and i not in block_sizes
        ok2 = (j-i)==1 and j not in block_sizes
        if ok1 or ok2:
            A[i,j]=1

beta=1 # tune?
A=A*beta

# find centroid for each box
# centroid = (x+w/2,y+h/2)

# %% calculate combined weights

combined = A + np.asarray(similarities)
print(combined)

# %% create graph

# construct complete graph of all possible connections between all nodes
# https://stackoverflow.com/questions/29655111/igraph-graph-from-numpy-or-pandas-adjacency-matrix

# make matrix more sparse by
# a[similarities < .2] = 0
# print(np.count_nonzero(a))

g = ig.Graph.Weighted_Adjacency(
    combined,
)

# add node features
# https://stackoverflow.com/questions/36713082/add-vertex-attributes-to-a-weighted-igraph-graph-in-python
g.vs['metadata'] = metadata

# ig.Graph(
#     n=df['Text'],
#     e=similarities
# )

# %% replication: use spectral clustering from sklearn

# https://scikit-learn.org/stable/modules/clustering.html#spectral-clustering
# apply (normalized) heat kernel
# negative similarities are not solvable
# TODO: shouldn't I apply kernel after creating Laplacian? but Laplacian creator needs positive values only

def heat_kernel(A, beta=1):
    return np.exp(-beta * A / A.std())

# TODO: shouldn't the diagonal be 1? why is this pushing higher values lower?

def train_sc(n,beta=1):
    sc = SpectralClustering(
        n_clusters=n,
        affinity='precomputed',
        # eigen_solver='arpack',
        n_init=100,
        assign_labels='discretize',
        verbose=True,
    )
    # TODO: how do I incorporate node features?
    # this constructs Laplacian and applies kernel
    df['Args'] = sc.fit_predict(
        heat_kernel(combined,beta=beta),
    )
    return sc.labels_, sc.affinity_matrix_

# TODO: cross validation - not sure how to do unsupervised with sklearn
scores = []

train,test = train_test_split(combined, test_size=0.2)

for n in range(5,30):
    labels, _ = train_sc(n)
    score = silhouette_score(combined, labels, metric='euclidean')
    print(score)
    scores.append(score)

bestn = np.argmax(np.asarray(scores)) + 5
print(bestn)

for n in range(1,10):
    labels, _ = train_sc(6,beta=1/n)
    score = silhouette_score(combined, labels, metric='euclidean')
    print(score)
    scores.append(score)

bestb = np.argmax(np.asarray(scores))
print(bestb)

sc_labels,sc_affinity = train_sc(bestn,beta=1/bestb)

# %% comparison: use k-means clustering from sklearn

def train_kmeans(n,data):
    kmeans = KMeans(
        n_clusters=n,
        max_iter=100,
        n_init=1,
        random_state=1,
    ).fit(data)
    return kmeans.labels_

scores=[]
for n in range(5,20):
    labels = train_kmeans(n,combined)
    score = silhouette_score(combined, labels, metric='euclidean')
    print(score)
    scores.append(score)

best = np.argmax(np.asarray(scores)) + 5
print(best)

k_labels = train_kmeans(best,combined)

# %% experiment: use GNN

# https://github.com/google-research/google-research/blob/master/graph_embedding/dmon/train.py

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

"""Deep Modularity Network (DMoN) Keras layer.

Deep Modularity Network (DMoN) layer implementation as presented in
"Graph Clustering with Graph Neural Networks" in a form of TF 2.0 Keras layer.
DMoN optimizes modularity clustering objective in a fully unsupervised regime.
"""
from typing import List
from typing import Tuple

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
            nn.Linear(in_features, n_clusters),
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

def build_dmon(input_features, input_graph, input_adjacency):
    """Builds a Deep Modularity Network (DMoN) model from the PyTorch inputs.

    Args:
        input_features: A dense [n, d] PyTorch tensor for the node features.
        input_graph: A sparse [n, n] PyTorch tensor for the normalized graph.
        input_adjacency: A sparse [n, n] PyTorch tensor for the graph adjacency.

    Returns:
        Built PyTorch DMoN model.
    """
    output = input_features
    for n_channels in FLAGS.architecture:
        output = gcn.GCN(n_channels)([output, input_graph])
    pool, pool_assignment = DMoN(
        FLAGS.n_clusters,
        collapse_regularization=FLAGS.collapse_regularization,
        dropout_rate=FLAGS.dropout_rate)([output, input_adjacency])
    return nn.Module(
        inputs=[input_features, input_graph, input_adjacency],
        outputs=[pool, pool_assignment])

# Example usage
n_nodes = 100  # Example number of nodes
feature_size = 128  # Example feature size
n_clusters = 10  # Example number of clusters
architecture = [64, 32]  # Example architecture
collapse_regularization = 0.1
dropout_rate = 0.5

# Create input tensors
input_features = torch.randn((n_nodes, feature_size))
input_graph = torch.sparse_coo_tensor(indices=[[0, 1], [1, 0]], values=[1, 1], size=(n_nodes, n_nodes))
input_adjacency = torch.sparse_coo_tensor(indices=[[0, 1], [1, 0]], values=[1, 1], size=(n_nodes, n_nodes))

# Build the DMoN model
model = build_dmon(input_features, input_graph, input_adjacency, n_clusters, architecture, collapse_regularization, dropout_rate)

# Example forward pass
output = model(input_features, input_graph, input_adjacency)
print(output)

# Computes the gradients wrt. the sum of losses, returns a list of them.
import torch
import torch.optim as optim
from sklearn.metrics import normalized_mutual_info_score

# Define the gradient computation function
def grad(model, inputs):
    model.train()
    optimizer.zero_grad()
    features, graph_normalized, graph = inputs
    outputs = model(features, graph_normalized, graph)
    loss_value = sum(model.losses)
    loss_value.backward()
    return model.losses, [param.grad for param in model.parameters()]

# Define the optimizer
learning_rate = 0.001  # Example learning rate
optimizer = optim.Adam(model.parameters(), lr=learning_rate)

# Training loop
n_epochs = 100  # Example number of epochs
for epoch in range(n_epochs):
    loss_values, grads = grad(model, [input_features, input_graph, input_adjacency])
    optimizer.step()
    print(f'epoch {epoch}, losses: ' +
          ' '.join([f'{loss_value.item():.4f}' for loss_value in loss_values]))

# Obtain the cluster assignments
model.eval()
with torch.no_grad():
    _, assignments = model(input_features, input_graph, input_adjacency)
assignments = assignments.numpy()
clusters = assignments.argmax(axis=1)  # Convert soft to hard clusters

# Prints some metrics used in the paper
print('Conductance:', metrics.conductance(adjacency, clusters))
print('Modularity:', metrics.modularity(adjacency, clusters))
print(
    'NMI:',
    normalized_mutual_info_score(
        labels, clusters[label_indices], average_method='arithmetic'))
precision = metrics.pairwise_precision(labels, clusters[label_indices])
recall = metrics.pairwise_recall(labels, clusters[label_indices])
print('F1:', 2 * precision * recall / (precision + recall))

# %% quantitative evaluation: silhouette score (cohesion + separation)

score = silhouette_score(combined, sc_labels, metric='euclidean')
print(score)

labels = k_labels
score = silhouette_score(combined, labels, metric='euclidean')
print(score)

# %% qualitative evaluation

# visualize graph plot

# visualize spectral clustering results with t-SNE

tsne = TSNE(
    n_components=2,
    learning_rate='auto',
    perplexity=3,
).fit_transform(sc_affinity)

plt.scatter(tsne[:, 0], tsne[:, 1], label=k_labels, c=k_labels, cmap=plt.get_cmap('tab20'))
plt.show()

plt.figure(figsize=(5, 15))
plt.grid(axis='y')
plt.yticks(range(df.index.min(), df.index.max() + 1, 1))
plt.scatter(
    # df['BBOX'], 
    df['Index'],
    [x[-50:] for x in df['Source']], # TODO: try grouping by Link
    c=k_labels, 
    cmap=plt.get_cmap('tab20')
)
plt.show()

# TODO: how do I then make interpretable results from eigenvectors if I used embeddings?
evals, evecs = np.linalg.eig(sc_affinity)

# %%
