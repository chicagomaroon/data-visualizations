# Purpose: clean output from scraper before feeding to graph ML pipeline

import pandas as pd
import re

df = pd.read_excel('scrape.xlsx')
print(df['Text'].head())
df = df.loc[[not (isinstance(x,float) or len(re.sub('[^A-Za-z]','',x))<80) for x in df['Text']]]

# get bbox out
df['BBOX'] = [re.split(' !BBOX! ',x)[0] if 'BBOX' in x else '' for x in df['Text']]
df['Text'] = [re.split(' !BBOX! ',x)[1] if 'BBOX' in x else x for x in df['Text']]

df.to_excel('scrape.xlsx',index=None)

# def unpack(row):
#     # cite: Copilot
#     if 'campub' in row['Link']:
#         lines = re.sub(row['Text'], '\n\n+', '')
#     else:
#         lines = re.split(row['Text'], '\n')
#     lines = [x for x in lines if len(re.sub('[^A-Za-z ]', '', x)) > 5]
#     temp['Text'] = lines
#     return temp

# unpacked = pd.DataFrame()
# for i, row in df.iterrows():
#     unpacked = pd.concat([unpacked, unpack(row)])
