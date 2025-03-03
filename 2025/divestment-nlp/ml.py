# Purpose: Replicate S2 Chunking methodology and compare with using GNN and traditional methods
# Author: Karen Yi
# Date: 03-02-2025

#%% imports

from __future__ import annotations

import re
from transformers import BertTokenizer, BertModel
import pandas as pd
import sklearn

# with open('log-021825.txt',encoding='utf-8') as f:
#     txt = f.read()

#%% read data
# Each row is a chunk

df = pd.read_excel('scrape.xlsx', index_col=None)

#%% get BERT embeddings
# These will be used as the node features in the graph

# Load BERT tokenizer and model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Tokenize and encode text using batch_encode_plus
# The function returns a dictionary containing the token IDs and attention masks
encoding = tokenizer.batch_encode_plus( [text],# List of input texts
    padding=True,              # Pad to the maximum sequence length
    truncation=True,           # Truncate to the maximum sequence length if necessary
    return_tensors='pt',      # Return PyTorch tensors
    add_special_tokens=True    # Add special tokens CLS and SEP
)

#%% calculate embedding cosine weights 
# Cosine similarity of BERT embeddings is used as edge weights


#%% calculate bbox weights

# find centroid for each box
# centroid = (x+w/2,y+h/2)

#%% calculate combined weights

# 

#%% create graph

#%% replication: use spectral clustering from sklearn

#%% experiment: use GNN

# PyG package which enables use of message passing, normalization, etc.
# also refer to https://www.geeksforgeeks.org/graph-neural-networks-with-pytorch/

#%% comparison: use k-means clustering from sklearn

#%% quantitative evaluation: diversity, cohesion, 

#%% qualitative evaluation

# visualize with t-SNE https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html
