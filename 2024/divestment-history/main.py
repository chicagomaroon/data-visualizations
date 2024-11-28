import pandas as pd
import plotly.express as px
import re
from datetime import date, datetime, timedelta

df = pd.read_csv('./data.csv')
df = df.loc[df['Include']==1]

df['Date of Event'] = [datetime.strptime(x.split('-')[0],'%m/%d/%Y').date() for x in df['Date of Event']] 
df['Year'] = [x.year for x in df['Date of Event']]
df['Day'] = [x.replace(year=2024) if x.month>8 else x.replace(year=2025) for x in df['Date of Event']]

df['Source'] = [re.sub(' . Chicago Maroon','',x) for x in df['Source']]
df['Source'] = df['Source'].str.wrap(20)

# df = df.sort('Date of Event')

fig = px.scatter(
    df,
    x='Day', 
    y='Year',
    width=700,
    height=850,
    # opacity=.5,
    labels={
        "Movement": "Movement",  
        "Year": "Date"
    },
    custom_data=['Link','Source'],
    color=df['Movement'],
    symbol=df['Movement'],
    template="simple_white",
    color_discrete_sequence = [
        '#800000',
        '#FFA319',
        '#C16622',
        '#8F3931',
        '#8A9045',
        '#58593F',
        '#155F83',
        '#350E20',
        '#47B5FF',
        '#FF3399'
    ]
)

fig.update_traces(
    hovertemplate =
        '<a target="_blank" href="%{customdata[0]}">' + 
        '%{customdata[1]}</a>',
    marker={
        'size':8,
        # 'symbol':'square',
        'line':{'color':'white','width':.5}
    }
)

fig.update_xaxes(
    range=[date(2024,9,21),date(2025,6,7)],
    tickformat='%b',
    dtick='M1',
    # ticklabelstep=2
)

fig.update_yaxes(
    range=[date(1966,1,1).year, date(2026,1,1).year],
    tickformat='%Y',
    # https://community.plotly.com/t/date-tick-formatting/11081/5
    dtick='M12',
    ticklabelstep=4
)

fig.update_layout(
    xaxis={
        'showgrid':False,
        'showline':False,
        # 'showticklabels':False,
        'title':'',
        'tickcolor':"#CCCCCC"
    },
    yaxis={
        'title':'',
        # 'showline':False,
        'showgrid':True,
        'tickcolor':"#CCCCCC"
    },
    legend={
        'font_size':10,
    },
    hovermode='closest',
    hoverlabel={
        'bgcolor':'white'
    }
)

for dates in [('1966-1-1','1986-1-1')]:
    fig.add_hrect(
        y0=dates[0], y1=dates[1],
        fillcolor="lightpink", opacity=0.5,
        layer="below", line_width=0,
    )

fig.add_vrect(
    x0="2024-12-15", x1="2025-1-7",
    fillcolor="#EEEEEE", opacity=0.5,
    layer="below", line_width=0,
)

fig.add_vrect(
    x0="2025-3-15", x1="2025-3-21",
    fillcolor="#EEEEEE", opacity=0.5,
    layer="below", line_width=0,
)

fig.show()

fig.write_html("index.html")
