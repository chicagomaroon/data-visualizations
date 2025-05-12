"""
Use SEC API to download all UChicago SEC filings since 1994
"""

#%% imports

import os
import re
from datetime import datetime

import polars as pl
from polars import String, Int64, Date, ShapeError, ComputeError
from plotnine import ggplot, geom_line, geom_point, aes, xlab, ylab, ggtitle

import camelot
from edgar import *

#%% SEC filings
# cite: https://pypi.org/project/edgartools/

# 2. Tell the SEC who you are (required by SEC regulations)
set_identity("karenyi@uchicago.edu")

# 3. Find University of Chicago by its CIK number
company = Company("0000314957")

# 4. Get company filings
filings = company.get_filings() 

# 5. Filter by form 13F-HR
# https://www.sec.gov/data-research/sec-markets-data/form-13f-data-sets
investments = filings.filter(form="13F-HR")

#%% save filings

sec = pl.DataFrame()

for i,investment in enumerate(investments):
    print(i)
    data = investment.obj()

    try:
        df = pl.DataFrame(data.infotable)
        date = datetime.strptime(data.report_period, "%Y-%m-%d").date()
    except AttributeError as e:
        print(f"Filing has no HTML")
        data = investment.markdown()
        date = datetime.strptime(investment.report_date, "%Y-%m-%d").date()

        schema = [
            ('Issuer', String),
            ('Class', String),
            ('Cusip', String),
            ('Value', Int64),
            ('SharesPrnAmount', String),
            ('Type', String),
            ('PutCall', String),
            ('InvestmentDiscretion', String),
            ('SoleVoting', Int64),
            ('SharedVoting', Int64),
            ('NonVoting', Int64),
            ('Ticker', String),
            ('Date', Date),
        ]

        if len(data)<2000:
            print(f"WARNING: Filing has truncated data: {date}")
            continue

        if '($1000)' in data: # eg sep 2007
            print(f"Using $1000: {date}")
            schema = [
                ('Issuer', String),
                ('Class', String),
                ('Cusip', String),
                ('Value', Int64),
                ('SharesPrnAmount', String),
                ('Type', String),
                ('InvestmentDiscretion', String),
                ('Ticker', String),
                ('SoleVoting', Int64),
                ('SharedVoting', Int64),
                ('NonVoting', Int64),
            ]
            lines = data.split('SHARED NONE')[-1].split('Other Managers')[0].splitlines()
            lines = [re.sub('^\\d+', '', row) for row in lines]
            cells = []
            for line in lines:
                if len(line.strip()):
                    line = re.sub(r'\s+', ' ', line)
                    cell = line.rsplit(' ',10)
                    if not re.search('^\\d',cell[2]):
                        cell = (line + ' 0').rsplit(' ',10)
                    cells.append(cell)
            rows = cells
        elif '----' in data: # eg 1999
            print(f"Using --------- : {date}")
            
            schema = [
                ('Issuer', String),
                ('Class', String),
                ('Cusip', String),
                ('Value', Int64),
                ('SharesPrnAmount', String),
                ('Type', String),
                ('InvestmentDiscretion', String),
                ('Ticker', String),
                ('SoleVoting', Int64),
                ('SharedVoting', Int64),
                ('NonVoting', Int64),
            ]
            lines = re.split('-+\\s*\\n',data)[-1].splitlines()
            lines = [re.sub('^\\d+', '', row) for row in lines]
            # cite: copilot
            if len(lines[2].rsplit(' ',10))<10:
                rows = [cells[i] + cells[i + 1] for i in range(0, len(cells), 2)]
            cells = []
            for line in lines:
                if len(line.strip()) and 'TABLE' not in line:
                    line = re.sub(r'\s+', ' ', line)
                    cell = line.rsplit(' ',10)
                    cells.append(cell)
            rows = rows[:-1]  # remove last row since it is a summary row
        else: # eg sep 2008
            print(f"Using missing case: {date}")
            lines = data.split('SHARED NONE')[-1].splitlines()
            lines = [re.sub('^\\d+ ', '', row) for row in lines]
            cells = [re.split(' +',line.strip('</pre>')) for line in lines if len(line.strip()) and not re.search('</.+>',line)]
            # cite: copilot
            rows = rows[:-3]  # remove last rows
        try:
            
            df = pl.DataFrame(
                rows,
                schema=schema
            )
        except ShapeError as e:
            # print(data[:1000])
            print(rows)
            print(schema)
            print([(i,len(row)) for i,row in enumerate(rows)])
            print(f"{i} {date} filing has shape error: {e}")
            raise e
        except ComputeError as e:
            print(rows)
            print(f"{i} {date} filing has row mismatch: {e}")
            raise e

    # add date column
    df = df.with_columns(
        pl.lit(date).alias("Date")
    )

    sec = pl.concat([sec, df],how="diagonal")

sec.write_csv("13F-HR.csv")

#%% explore data

# value means market value in $1000s
amounts = sec.group_by('Date').agg(pl.col('Value').sum() * 1000)

ggplot(amounts) + \
    geom_line(aes(x="Date", y="Value"), alpha=1) + \
    geom_point(aes(x="Date", y="Value"), alpha=1) + \
    ggtitle("UChicago 13F-HR filings") + \
    xlab("Date") + ylab("Value")

#%%

for file in os.listdir("statements"):
        
    tables = camelot.read_pdf(os.path.join("statements",file))
    print(tables)
    # tables.export('foo.csv', f='csv', compress=True) 

# %%
