# Purpose: clean output from scraper before feeding to graph ML pipeline
from __future__ import annotations

import re

import pandas as pd

df = pd.read_excel('scrape.xlsx')
print(df['Text'].head())
df['Index'] = None

# 
df['Source'] = [x.strip(' – Chicago Maroon') if isinstance(x,str) else x for x in df['Source']]

# Replace bad characters in df['Text']
# cite: Github Copilot
df['Text'] = df['Text'].str.replace('’', "'")
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

# drop duplicates to reduce computation
df = df.drop_duplicates('Text')
df.reset_index(drop=True, inplace=True)

# split by paragraph
for i,row in df.iterrows():
    # cite: Copilot
    lines = row['Text']
    # print(lines[:200])
    if 'campub' in row['Link']:
        lines = re.sub(r'\n([^\n])', ' \\1',lines)
    lines = re.split(r'\n[\n\s]*',lines)
    lines = [x for x in lines if len(re.sub(r'[^A-Za-z]', '', x)) > 80]
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

# drop duplicates again after we split out paragraphs
df = df.drop_duplicates('Text')
df.reset_index(drop=True, inplace=True)

# remove stopwords (I'm not interested in clustering on specific causes)
stopwords = [
    'UCAN',
    'SFCC',
    'SJP',
    'SOUL',
    'STAND',
    'Wilson',
    'Hanna',
    "Holborn",
    'Gray',
    'Zimmer',
    'Alivisatos',
    'Sudan',
    'Darfur',
    '[Cc]limate change',
    '[Oo]il',
    '[Cc]oal',
    '[Rr]enewable energy',
    '[Ff]ossil fuels',
    'Palestin[eian]{,3}',
    'Israeli*',
    'Gazan*',
    'West Bank',
    'South African*',
    'African*',
    'Afrikaan(er)*',
    'Uyghur',
    'SRIC',
    'Hei',
]
regex = r'\b|\b'.join(stopwords)
df['Text'] = [re.sub(regex, '', x) for x in df['Text']]

df['Text'] = df['Text'].str.replace(r'(a-z)-[\n ]+(a-z)', '\\1\\2', regex=True) # replace weird line breaks
df['Text'] = df['Text'].str.replace(r'- ', '', regex=True) # replace weird line breaks

print(df['Text'].head())
print(df.shape)
print(df['Text'].sample(10).values)

df.to_excel('scrape-clean.xlsx', index=None)
