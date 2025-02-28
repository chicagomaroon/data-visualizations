import re
import pandas as pd

# with open('log-021825.txt',encoding='utf-8') as f:
#     txt = f.read()

df = pd.read_excel('scrape.xlsx',index_col=None)



def unpack(row):
    # cite: Copilot
    if 'campub' in row['Link']:
        lines = re.split(row['Text'],'\n\n+')
    else:
        lines = re.split(row['Text'],'\n')
    lines = [x for x in lines if len(re.sub('[^A-Za-z ]','',x))>5]
    temp = pd.DataFrame([row] * len(lines), index=range(len(lines)))
    temp['Text'] = lines
    return temp

unpacked = pd.DataFrame()
for i,row in df.iterrows():
    unpacked = pd.concat([unpacked, unpack(row)])
