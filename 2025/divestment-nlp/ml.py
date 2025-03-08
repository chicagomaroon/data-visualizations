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
from sklearn.metrics import silhouette_score, normalized_mutual_info_score
from sklearn.datasets import fetch_20newsgroups
import torch
import torch.optim as optim

from utils import DMoN, build_dmon, GCN

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

np.save('embeddings.npy', embeddings)

metadata = sbert.encode(df['Metadata'])
print(metadata.shape)

np.save('metadata.npy', metadata)

#%%
# 2 minutes
newsembeds = sbert.encode(newsgroups_train.data)
print(newsembeds.shape)

np.save('newsembeds.npy', newsembeds)

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
combined = np.round(combined, 5)
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

# %% experiment: use DMoN from Google Research

# https://github.com/google-research/google-research/blob/master/graph_embedding/dmon/train.py

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
