# Purpose: Replicate S2 Chunking methodology and compare with using GNN and traditional methods
# Author: Karen Yi
# Date: 03-02-2025
# %% imports
from __future__ import annotations

import igraph as ig
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
from sklearn.cluster import SpectralClustering
from sklearn.manifold import TSNE
from sklearn.metrics import silhouette_score

# %% read data
# Each row is a chunk

df = pd.read_excel('scrape.xlsx', index_col=None)
# df = df.loc[df['Source']=="The University and South Africa connections"]
# df = df.reset_index(drop=True)

# %% get BERT embeddings
# These will be used as the node features in the graph
# Using Sentence-BERT as it has semantically meaningful and comparable embeddings https://sbert.net/

# 1. Load a pretrained Sentence Transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# 2. Calculate embeddings by calling model.encode()
embeddings = model.encode(df['Text'])
print(embeddings.shape)

# pd.DataFrame({'embeddings':embeddings}).to_excel('embeddings.xlsx')

# %% calculate embedding cosine weights
# Cosine similarity of BERT embeddings is used as edge weights

# 3. Calculate the embedding similarities
similarities = model.similarity(embeddings, embeddings)

# https://scikit-learn.org/stable/modules/clustering.html#spectral-clustering
# apply (normalized) heat kernel
# negative similarities are not solvable
# TODO: shouldn't I apply kernel after creating Laplacian? but Laplacian creator needs positive values only


def heat_kernel(A, beta=1):  # tune?
    return np.exp(-beta * A / A.std())


similarities = heat_kernel(similarities)
print(similarities)
# TODO: shouldn't the diagonal be 1? why is this pushing higher values lower?

# similarities[similarities < .1] = 0

# %% calculate bbox weights

# find centroid for each box
# centroid = (x+w/2,y+h/2)

# %% calculate combined weights

#

# %% create graph

# construct complete graph of all possible connections between all nodes
# https://stackoverflow.com/questions/29655111/igraph-graph-from-numpy-or-pandas-adjacency-matrix

# make matrix more sparse by
# a[similarities < .2] = 0
# print(np.count_nonzero(a))

g = ig.Graph.Weighted_Adjacency(
    similarities.numpy(),
)

# add node features
# https://stackoverflow.com/questions/36713082/add-vertex-attributes-to-a-weighted-igraph-graph-in-python
g.vs['link'] = df['Link']
g.vs['title'] = df['Source']

# ig.Graph(
#     n=df['Text'],
#     e=similarities
# )

# %% replication: use spectral clustering from sklearn

# TODO: tune?
sc = SpectralClustering(
    n_clusters=20,  # ~5 arguments, plus 3 catchall
    affinity='precomputed',
    # eigen_solver='arpack',
    n_init=100,
    assign_labels='discretize',
    verbose=True,
)

# TODO: how do I incorporate node features?
# this constructs Laplacian and applies kernel
df['Args'] = sc.fit_predict(
    similarities,
)

# %% experiment: use GNN

# PyG package which enables use of message passing, normalization, etc.
# also refer to https://www.geeksforgeeks.org/graph-neural-networks-with-pytorch/

class GCN(torch.nn.Module):
    def __init__(self, in_channels, hidden_channels, out_channels):
        super().__init__()
        self.conv1 = GCNConv(in_channels, hidden_channels)
        self.conv2 = GCNConv(hidden_channels, out_channels)

    def forward(self, x: Tensor, edge_index: Tensor) -> Tensor:
        # x: Node feature matrix of shape [num_nodes, in_channels]
        # edge_index: Graph connectivity matrix of shape [2, num_edges]
        x = self.conv1(x, edge_index).relu()
        x = self.conv2(x, edge_index)
        return x

model = GCN(
    in_channels = 384, # n_features
    hidden_channels = 16, # param
    out_channels = 6 # n_clusters
)

optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

for epoch in range(200):
    pred = model(data.x, data.edge_index)
    loss = F.cross_entropy(pred[data.train_mask], data.y[data.train_mask])

    # Backpropagation
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# %% comparison: use k-means clustering from sklearn

kmeans = KMeans(
    n_clusters=20,
    max_iter=100,
    n_init=1,
    random_state=1,
).fit(similarities)

# %% quantitative evaluation: silhouette score (cohesion + separation)

labels = sc.labels_
score = silhouette_score(similarities, labels, metric='euclidean')
print(score)

labels = kmeans.labels_
score = silhouette_score(similarities, labels, metric='euclidean')
print(score)

# %% qualitative evaluation

# visualize spectral clustering results with t-SNE

tsne = TSNE(
    n_components=2,
    learning_rate='auto',
    init='random', perplexity=3,
).fit_transform(sc.affinity_matrix_)

plt.scatter(tsne[:, 0], tsne[:, 1], c=sc.labels_)

# TODO: how do I then make interpretable results from eigenvectors if I used embeddings?

# %%
