# Purpose: Replicate S2 Chunking methodology and compare with using GNN and traditional methods
# Author: Karen Yi
# Date: 03-02-2025
# %% imports
from __future__ import annotations

import igraph as ig
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
from sklearn.cluster import SpectralClustering
from sklearn.metrics import silhouette_score
from sklearn.manifold import TSNE

# with open('log-021825.txt',encoding='utf-8') as f:
#     txt = f.read()

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
# shouldn't I apply kernel after creating Laplacian? but Laplacian creator needs positive values only
def heat_kernel(A,beta = 1): # tune?
    return np.exp(-beta * A / A.std())

similarities = heat_kernel(similarities)
print(similarities)
# shouldn't the diagonal be 1?
# why is this pushing higher values lower?

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
    similarities.numpy()
)

# add node features
# https://stackoverflow.com/questions/36713082/add-vertex-attributes-to-a-weighted-igraph-graph-in-python
g.vs['link'] = df['Link']
g.vs['title'] = df['Source']

# shouldn't the diagonal be 1?
# why is this pushing higher values lower?

# ig.Graph(
#     n=df['Text'],
#     e=similarities
# )

# %% replication: use spectral clustering from sklearn

sc = SpectralClustering(
    n_clusters=20,  # ~5 arguments, plus 3 catchall
    affinity='precomputed',
    n_init=100,
    assign_labels='discretize',
    verbose=True,
)

# how do I incorporate node features?
# this constructs Laplacian and applies kernel
df['Args'] = sc.fit_predict(
    similarities
)

# %% experiment: use GNN

# PyG package which enables use of message passing, normalization, etc.
# also refer to https://www.geeksforgeeks.org/graph-neural-networks-with-pytorch/

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

# visualize with t-SNE https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html

tsne = TSNE(
    n_components=2, 
    learning_rate='auto',
    init='random', perplexity=3
).fit_transform(sc.affinity_matrix_)

plt.scatter(tsne[:,0],tsne[:,1],c=sc.labels_)
