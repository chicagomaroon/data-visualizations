#%% import

import pandas as pd
from datetime import datetime
import re
import numpy as np

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

#%% analysis

np.sum(df['Type of Action']=='Letter Writing') / len(df)

df['Type of Action'].value_counts(normalize=True,dropna=False)

# re map/simplify admin response values
response_dict = {
    np.nan:None,
    'General Transparency':'SRIC',
    'Labor Rights':'Labor rights',
    'Uyghur Rights':'Uyghur rights',
    'Palestine':'Palestine',
    'Fossil fuels':'Fossil fuels',
    'Sudan':'Sudan',
    'South Africa':'South Africa',
}

df['Movement']=[response_dict[x] for x in df['Movement']]

# re map/simplify admin response values
response_dict = {
    np.nan:None,
    'Interview/forum':'Information dissemination',
    'Interview/forum, Meeting/negotiation':'Negotiation',
    'Meeting/negotiation':'Negotiation',
    'Disciplinary action':'Disciplinary action',
    'Ignore/refuse':None,
    'Arrest':'Arrest',
    'Non-divestment support':'Non-divestment support',
    'Letter Writing':'Letter writing',
    'Police dispersal':None
}

df['Admin Response']=[response_dict[x] for x in df['Admin Response']]

df['Admin Response'].value_counts(normalize=True,dropna=False)

protest = df[df['Type of Action']=='Protest']

# what % of protests resulted in arrest?
protest['Admin Response'].value_counts(normalize=True,dropna=False)

# what % of arrests occurred during the Alivisatos administration?
arrest = df[df['Admin Response']=='Arrest/punish']

arrest['Year'].value_counts(normalize=True,dropna=False)

#%% create jitter amount

# df['Jitter'] = 

#%% export as json

df.to_json('data.json',orient='records')
