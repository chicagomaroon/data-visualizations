# Purpose: Replicate S2 Chunking methodology and compare with using GNN and traditional methods
# Author: Karen Yi
# Date: 03-02-2025

#%% imports

from __future__ import annotations

import re
import BERT
import pandas as pd

# with open('log-021825.txt',encoding='utf-8') as f:
#     txt = f.read()

#%% read data
# Each row is a chunk

df = pd.read_excel('scrape.xlsx', index_col=None)

#%% get BERT embeddings
# These will be used as the node features in the graph
# Cosine similarity is used as edge weights

# def unpack(row):
#     # cite: Copilot
#     if 'campub' in row['Link']:
#         lines = re.split(row['Text'], '\n\n+')
#     else:
#         lines = re.split(row['Text'], '\n')
#     lines = [x for x in lines if len(re.sub('[^A-Za-z ]', '', x)) > 5]
#     temp = pd.DataFrame([row] * len(lines), index=range(len(lines)))
#     temp['Text'] = lines
#     return temp
# unpacked = pd.DataFrame()
# for i, row in df.iterrows():
#     unpacked = pd.concat([unpacked, unpack(row)])

#%% replication: use spectral clustering from sklearn

#%% experiment: use GNN

#%% comparison: use k-means clustering from sklearn

#%% quantitative evaluation: diversity, cohesion, 

#%% qualitative evaluation
