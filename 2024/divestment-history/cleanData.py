import pandas as pd
from datetime import datetime
import re

#%% load data

df = pd.read_csv('data.csv')
df = df.loc[df['Include']==1]

#%% date formatting

df['Date of Event'] = [datetime.strptime(x.split('-')[0],'%m/%d/%Y').date() for x in df['Date of Event']] 
df['Year'] = [x.year for x in df['Date of Event']]
df['Day'] = [x.replace(year=2024) if x.month>8 else x.replace(year=2025) for x in df['Date of Event']]

# df['Date of Event'] = [str(x) for x in df['Date of Event2']]

#%% wrap link text?

df['Source'] = [re.sub(' . Chicago Maroon','',x) for x in df['Source']]
df['Source'] = df['Source'].str.wrap(20)

#%% create jitter amount

# df['Jitter'] = 

#%% export as json

df.to_json('data.json',orient='records')
