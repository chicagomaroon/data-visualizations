# Purpose: Replicate S2 Chunking methodology and compare with using GNN and traditional methods
# Author: Karen Yi
# Date: 03-02-2025

#%% imports

from __future__ import annotations

import re
from sentence_transformers import SentenceTransformer
import pandas as pd
from sklearn.cluster import SpectralClustering
import igraph as ig
import numpy as np
from sklearn.metrics import silhouette_score
from sklearn.cluster import KMeans

# with open('log-021825.txt',encoding='utf-8') as f:
#     txt = f.read()

#%% read data
# Each row is a chunk

df = pd.read_excel('scrape.xlsx', index_col=None)

#%% get BERT embeddings
# These will be used as the node features in the graph
# Using Sentence-BERT as it has semantically meaningful and comparable embeddings https://sbert.net/

# 1. Load a pretrained Sentence Transformer model
model = SentenceTransformer("all-MiniLM-L6-v2")

# 2. Calculate embeddings by calling model.encode()
embeddings = model.encode(df['Text'])
print(embeddings.shape)
# [3, 384]

# pd.DataFrame({'embeddings':embeddings}).to_excel('embeddings.xlsx')

#%% calculate embedding cosine weights 
# Cosine similarity of BERT embeddings is used as edge weights

# 3. Calculate the embedding similarities
similarities = model.similarity(embeddings, embeddings)
print(similarities)

#%% calculate bbox weights

# find centroid for each box
# centroid = (x+w/2,y+h/2)

#%% calculate combined weights

# 

#%% create graph

#%% replication: use spectral clustering from sklearn

sc = SpectralClustering(
    n_clusters=20, # ~5 arguments, plus 3 catchall
    affinity='precomputed', 
    n_init=100,
    assign_labels='discretize',
    verbose=True
)

df['Args']=sc.fit_predict(similarities)  

#%% experiment: use GNN

# PyG package which enables use of message passing, normalization, etc.
# also refer to https://www.geeksforgeeks.org/graph-neural-networks-with-pytorch/

#%% comparison: use k-means clustering from sklearn

kmeans = KMeans(
    n_clusters=20,
    max_iter=100,
    n_init=1,
    random_state=1,
).fit(similarities)

#%% quantitative evaluation: silhouette score (cohesion + separation)

labels = sc.labels_
silhouette_score(similarities, labels, metric='euclidean')



#%% qualitative evaluation

# visualize with t-SNE https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html
