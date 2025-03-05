# Purpose: clean output from scraper before feeding to graph ML pipeline
from __future__ import annotations

import re

import pandas as pd

df = pd.read_excel('scrape.xlsx')
print(df['Text'].head())
df['Index'] = None

# Replace bad characters in df['Text']
# cite: Github Copilot
df['Text'] = df['Text'].str.replace(r'[^A-Za-z0-9\s.,!?\'"-]', '', regex=True)

# filter out empty or short rows
# 80 is 80% the length of the average sentence
df = df.loc[[
    not (
        isinstance(x, float) or len(
            re.sub('[^A-Za-z]', '', x),
        ) < 80
    ) for x in df['Text']
]]

df = df.drop_duplicates('Text')

# split by paragraph
for i,row in df.iterrows():
    # cite: Copilot
    lines = row['Text']
    # print(lines[:200])
    if 'campub' in row['Link']:
        lines = re.sub('\n([^\n])', '\\1',lines)
    lines = re.split('\n[\n\s]*',lines)
    lines = [x for x in lines if len(re.sub('[^A-Za-z]', '', x)) > 80]
    # print(lines[:200])
    df.at[i,'Text'] = lines
    df.at[i,'Index'] = list(range(len(lines)))

df = df.explode(['Index','Text'])

# # get bbox out
# df['BBOX'] = [
#     re.split(' !BBOX! ', x)[0]
#     if 'BBOX' in x else '' for x in df['Text']
# ]
# df['Text'] = [
#     re.split(' !BBOX! ', x)[1]
#     if 'BBOX' in x else x for x in df['Text']
# ]

df.to_excel('scrape-clean.xlsx', index=None)
