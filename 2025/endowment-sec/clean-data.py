"""
Use SEC API to download all UChicago SEC filings since 1994
"""

#%% imports

import os
import re
from datetime import datetime

import polars as pl
from polars import String, Int64, Date, ShapeError, ComputeError
from plotnine import ggplot, geom_line, geom_point, aes, xlab, ylab, ggtitle, theme, element_text, scale_x_date, theme_minimal

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
    # if i<40:
    #     continue
    # print(i)
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
            # remove line numbers
            lines = [re.sub('^\\d+ *', '', row) for row in lines]
            rows = []
            for line in lines:
                if len(line.strip()):
                    line = re.sub(r'\s+', ' ', line)
                    cell = []

                    # split line into cells from right to left
                    patterns = [
                        '(\\d{1,6})',
                        '(\\d{1,6})',
                        '(\\d{1,6})',
                        '(\\d{1,2})',
                        '([OtherSole]{4,6})',
                        '([SH]{2})',
                        '(\\d{2,7})',
                        '(\\d{3,7})',
                        '([A-Z\\d]{8,9})',
                        '((A)|([AB]* *[COM|BEN|ADR]+))',
                    ]

                    for pattern in patterns:
                        split = line.rsplit(' ', 1)
                        if re.search(pattern, split[-1]):
                            cell.append(split[-1])
                            line = split[0]
                        else:
                            cell.append(None)
                    cell.append(line.strip()) # rest of the line is issuer
                    rows.append(cell[::-1])
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
            lines = [re.sub('^\\d+ *', '', row) for row in lines]
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
            lines = [re.sub('^\\d+ *', '', row) for row in lines]
            cells = [re.split(' +',line.strip('</pre>')) for line in lines if len(line.strip()) and not re.search('</.+>',line)]
            # cite: copilot
            rows = rows[:-3]  # remove last rows

        try:
            
            print(rows[0])
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
        
    # if 2021 or later, divide value by 1000
    # cover pages state that reports past this date are reported in dollars instead of thousands 
    # https://www.sec.gov/Archives/edgar/data/314957/000110465924034451/xslForm13F_X02/primary_doc.xml
    if date >= datetime(2020, 12, 1).date():
        df = df.with_columns(
            (pl.col('Value') / 1000).cast(Int64).alias('Value')
        )

    # add date column
    df = df.with_columns(
        pl.lit(date).alias("Date")
    )

    # print(df)

    sec = pl.concat([sec, df],how="diagonal")

sec.write_csv("13F-HR.csv")

#%% explore total holdings over time

sec = pl.read_csv("13F-HR.csv")

# value means market value in $1000s
amounts = sec.group_by('Date').agg(pl.col('Value').sum()/1000)

(ggplot(amounts) +
    geom_point(aes(x="Date", y="Value"), alpha=1) +
    geom_line(aes(x="Date", y="Value"), alpha=1) +
    ggtitle("UChicago 13F-HR filings") +
    xlab("Date") + ylab("Value in millions of dollars") +
    scale_x_date(date_labels="%Y-%m", date_breaks="1 year") +
    theme_minimal() +
    theme(
        axis_text_x=element_text(rotation=90, hjust=1)
    )
)

#%% explore which stocks are held



#%%

for file in os.listdir("statements"):
        
    tables = camelot.read_pdf(os.path.join("statements",file))
    print(tables)
    # tables.export('foo.csv', f='csv', compress=True) 

# %%
import requests
# from requests_html import HTMLSession
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup as bs
from selenium.webdriver.support.ui import Select
import time
import re

# session = HTMLSession()
# r = session.get(site)

def get_holdings(site, ticker=None):
    driver = webdriver.Firefox()

    driver.get(site)
    elem = driver.find_element(By.XPATH, "//*[text()='Portfolio composition']")
    elem.send_keys(Keys.RETURN)
    driver.execute_script("document.body.style.zoom='15%'")
    driver.maximize_window()

    data = []
    for i in range(51):
        time.sleep(1)  # wait for the page to load
        try:
            turn_page = driver.find_element(By.TAG_NAME, 'select')
            

            # Select the nth option (e.g., 3rd option, index starts at 0)
            Select(turn_page).select_by_index(i)  # 2 for the 3rd option

            # Find the first <h5> with text "Holding details"
            h5_elem = driver.find_element(By.XPATH, "//h5[contains(text(), 'Holding details')]")

            # Find the first <div> following this <h5>
            div_elem = h5_elem.find_element(By.XPATH, "following-sibling::div[1]")

            table = div_elem.find_elements(By.TAG_NAME, 'table')
            data.append(table[0].text.split('\n'))
        except Exception as e:
            print(f"Error: {e}")
            continue

    tickers = []
    percents = []
    companies = []
    for d in data:
        for i in d:
            if 'Ticker' not in i:
                try:
                    ticker = re.search('^[A-Z]+',i)[0]
                    tickers.append(ticker)
                    percents.append(re.search('(\\d+\\.\\d+) %',i)[0].strip(' %'))
                    companies.append(re.search(' [A-Z][a-z &\\.]+ \\d',i.strip(ticker))[0][1:-2])
                except Exception as e:
                    print(f"Error parsing line: {i} - {e}")
                    continue

    df = pd.DataFrame({
        'ticker':tickers,
        'percent':percents,
    })
    df['amt'] = df['percent'].astype(float) /100 * sec.loc[(sec['Ticker']==ticker) & (sec['Date']=='2025-03-31'),'Value'].values[0] * 1000
    df.to_csv(f"holdings-{ticker}.csv", index=False)

# get_holdings(site = "https://investor.vanguard.com/investment-products/etfs/profile/voo#portfolio-composition",ticker='VOO')
get_holdings(site = "https://investor.vanguard.com/investment-products/etfs/profile/vt#portfolio-composition",ticker='VT')


# %%
