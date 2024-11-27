import pandas as pd
import plotly.express as px
from datetime import date
from datetime import datetime

df = pd.read_csv('./data.csv')

df['Date of Event'] = [datetime.strptime(x.split('-')[0],'%m/%d/%Y').date() for x in df['Date of Event']] 
df['Source'] = df['Source'].str.wrap(20)

# df = df.sort('Date of Event')

fig = px.scatter(
    df,
    x='Movement', 
    y='Date of Event',
    width=500,
    height=850,
    labels={
        "Movement": "Movement",  
        "Date of Event": "Date"
    },
    custom_data=['Link','Source'],
    color=df['Movement'],
    template="simple_white"
)

fig.update_traces(
    hovertemplate =
        '<a target="_blank" href="%{customdata[0]}">' + 
        '%{customdata[1]}</a>',
    marker={
        'size':15,
        'symbol':'square',
        'line':{'color':'white','width':.5}
    },
)

fig.update_yaxes(
    range=[date(1966,1,1), date(2024,1,1)],
    dtick=5
)

fig.update_layout(
    xaxis={
        'showgrid':False,
        'showline':False,
        'showticklabels':False,
        'title':'',
        'tickcolor':"rgb(255,255,255)"
    },
    yaxis={
        'title':'',
    },
    legend={
        'font_size':10,
    },
    hovermode='closest',
    hoverlabel={
        'bgcolor':'white'
    }
)

fig.show()

fig.write_html("index.html")