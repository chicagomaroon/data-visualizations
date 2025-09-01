"""
Use SEC API to download all UChicago SEC filings since 1994
"""

#%% imports

import os
import re
from datetime import datetime

import polars as pl
from polars import String, Int64, Date, ShapeError, ComputeError
from plotnine import (
    ggplot,
    geom_line,
    geom_point,
    aes,
    xlab,
    ylab,
    ggtitle,
    theme,
    element_text,
    scale_x_date,
    theme_minimal,
)

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
        print(f"Filing has no HTML, parsing text: {i}")
        data = investment.markdown()
        date = datetime.strptime(investment.report_date, "%Y-%m-%d").date()

        schema = [
            ("Issuer", String),
            ("Class", String),
            ("Cusip", String),
            ("Value", Int64),
            ("SharesPrnAmount", String),
            ("Type", String),
            ("PutCall", String),
            ("InvestmentDiscretion", String),
            ("SoleVoting", Int64),
            ("SharedVoting", Int64),
            ("NonVoting", Int64),
            ("Ticker", String),
            ("Date", Date),
        ]

        if len(data) < 2000:
            print(f"WARNING: Filing has truncated data: {date}")
            continue

        if "($1000)" in data:  # eg sep 2007
            print(f"Using $1000: {date}")
            schema = [
                ("Issuer", String),
                ("Class", String),
                ("Cusip", String),
                ("Value", Int64),
                ("SharesPrnAmount", String),
                ("Type", String),
                ("InvestmentDiscretion", String),
                ("Ticker", String),
                ("SoleVoting", Int64),
                ("SharedVoting", Int64),
                ("NonVoting", Int64),
            ]
            # remove header and footer
            lines = (
                data.split("SHARED NONE")[-1].split("Other Managers")[0].splitlines()
            )
            # remove line numbers
            lines = [re.sub("^\\d+ *", "", row) for row in lines]
            rows = []
            for line in lines:
                if len(line.strip()):
                    line = re.sub(r"\s+", " ", line)
                    cell = []

                    # split line into cells from right to left
                    patterns = [
                        "(\\d{1,6})",
                        "(\\d{1,6})",
                        "(\\d{1,6})",
                        "(\\d{1,2})",
                        "([OtherSoleOTHERSOLE]{4,6})",
                        "([SH]{2})",
                        "(\\d{2,7})",
                        "(\\d{1,7})",
                        "([A-Z\\d]{8,9})",
                    ]

                    for pattern in patterns:
                        split = line.rsplit(" ", 1)
                        if re.search(pattern, split[-1]):
                            cell.append(split[-1])
                            line = split[0]
                        else:
                            cell.append(None)
                    try:
                        cls = re.search(
                            "(NLGO 03|CV C|Non Cum Perp|Ishares Mid Val (FD)?|SUB Vtg|(Cl |CL )?(A )?(B )?(Com|COM|BEN|ADR|CAP|PFD|PLC|RTS|REIT|INT)( Biosurgery| Molec Onc)?( EXCH)?|A|B)$",
                            line.strip(),
                        ).group()
                    except Exception as e:
                        print(f"Error parsing class: {line} - {e}")
                        cls = None
                    cell.append(cls)
                    cell.append(line.strip(cls).strip())  # rest of the line is issuer
                    rows.append(cell[::-1])
        elif "----" in data:  # eg 1999
            print(f"Using --------- : {date}")

            schema = [
                ("Issuer", String),
                ("Class", String),
                ("Cusip", String),
                ("Value", Int64),
                ("SharesPrnAmount", String),
                ("Type", String),
                ("InvestmentDiscretion", String),
                ("Ticker", String),
                ("SoleVoting", Int64),
                ("SharedVoting", Int64),
                ("NonVoting", Int64),
            ]
            lines = re.split("-+\\s*\\n", data)[-1].splitlines()
            lines = [re.sub("^\\d+ *", "", row) for row in lines]
            # cite: copilot
            if len(lines[2].rsplit(" ", 10)) < 10:
                rows = [cells[i] + cells[i + 1] for i in range(0, len(cells), 2)]
            cells = []
            for line in lines:
                if len(line.strip()) and "TABLE" not in line:
                    line = re.sub(r"\s+", " ", line)
                    cell = line.rsplit(" ", 10)
                    cells.append(cell)
            rows = rows[:-1]  # remove last row since it is a summary row
        else:  # eg sep 2008
            print(f"Using missing case: {date}")
            lines = data.split("SHARED NONE")[-1].splitlines()
            lines = [re.sub("^\\d+ *", "", row) for row in lines]
            cells = [
                re.split(" +", line.strip("</pre>"))
                for line in lines
                if len(line.strip()) and not re.search("</.+>", line)
            ]
            # cite: copilot
            rows = rows[:-3]  # remove last rows

        try:
            print(rows[0])
            df = pl.DataFrame(rows, schema=schema)
        except ShapeError as e:
            # print(data[:1000])
            print(rows)
            print(schema)
            print([(i, len(row)) for i, row in enumerate(rows)])
            print(f"{i} {date} filing has shape error: {e}")
            raise e
        except ComputeError as e:
            print(rows)
            print(f"{i} {date} filing has row mismatch: {e}")
            raise e

    # if 2021 or later, divide value by 1000 (we will report all data in thousands)
    # cover pages state that reports past this date are reported in dollars instead of thousands
    # note that official SEC documentation lists data format change date as 1/3/2023 but I do not see this reflected in the data https://www.sec.gov/files/form_13f_readme.pdf
    # https://www.sec.gov/Archives/edgar/data/314957/000110465924034451/xslForm13F_X02/primary_doc.xml
    if date >= datetime(2020, 12, 1).date():
        df = df.with_columns((pl.col("Value") / 1000).cast(Int64).alias("Value"))

    # add date column
    df = df.with_columns(pl.lit(date).alias("Date"))

    # print(df)

    sec = pl.concat([sec, df], how="diagonal")

sec.write_csv("13F-HR.csv")

#%% explore total holdings over time

sec = pl.read_csv("13F-HR.csv")

# value means market value in $1000s
amounts = sec.groupby("Date").agg({"Value": lambda x: sum(x) / 1000}).reset_index()
amounts["Date"] = pd.to_datetime(amounts["Date"])

amounts.to_csv("annual-totals.csv")

(
    ggplot(amounts)
    + geom_point(aes(x="Date", y="Value"), alpha=1)
    + geom_line(aes(x="Date", y="Value"), alpha=1)
    + scale_x_date(date_labels="%Y-%m", date_breaks="1 year")
    + ggtitle("UChicago 13F-HR filings")
    + xlab("Date")
    + ylab("Value in millions of dollars")
    + theme_minimal()
    + theme(axis_text_x=element_text(rotation=90, hjust=1))
)

# %% visualize by company

top10 = (
    sec.groupby("Issuer")
    .agg({"Value": lambda x: sum(x) / 1000})
    .sort_values("Value", descending=True)
    .head(5)
)


(
    ggplot(sec.filter(pl.col("Issuer").is_in(top10["Issuer"])))
    + geom_point(aes(x="Date", y="Value", color="Issuer"), alpha=1)
    + geom_line(aes(x="Date", y="Value", color="Issuer"), alpha=1)
    + ggtitle("UChicago 13F-HR filings")
    + xlab("Date")
    + ylab("Value in thousands of dollars")
    + scale_x_date(date_labels="%Y-%m", date_breaks="1 year")
    + theme_minimal()
    + theme(axis_text_x=element_text(rotation=90, hjust=1))
)



#%%

for file in os.listdir("statements"):
        
    tables = camelot.read_pdf(os.path.join("statements",file))
    print(tables)
    # tables.export('foo.csv', f='csv', compress=True) 

# %%

fs = pd.read_csv("../endowment-breakdown/financial-statements.csv")

# categorize types into broader categories
type_dict = {
    "Domestic": "Public equity",
    "International": "Public equity",
    "Stocks": "Public equity",
    "Global public equities": "Public equity",
    "High yield": "Bonds",
    "Cash equivalent": "Bonds",
    "Absolute return": "Hedge funds",
    "Fixed income": "Bonds",
    "Equity oriented": "Private equity",
    "Diversifying": "Private equity",
    "Hedge funds": "Private equity",
    "Assets held by trustee": "Funds in trust",
}


for k, v in type_dict.items():
    fs.loc[fs["type"].str.contains(k, na=False), "type"] = v

fs["type"].unique()

fs = fs.groupby(["year", "type"]).agg({"amount": "sum"}).reset_index()

# %% scrape holdings of index funds
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
    for i in range(pages):
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
                    ticker_i = re.search('^[A-Z\\.\\d]+',i)[0]
                    tickers.append(ticker_i)
                except Exception as e:
                    print(f"Error parsing ticker: {i} - {e}")
                    break
                
                percents.append(re.search('(\\d+\\.\\d+) %',i)[0].strip(' %'))

                try:
                    companies.append(re.search(' [A-Z][A-Za-z &\\.\\(\\)\'/]+(\\d|—)',i.strip().strip(ticker_i + '—'))[0][1:-2].strip())
                except Exception as e:
                    print(f"Error parsing company: {i} - {e}")
                    break                

    df = pd.DataFrame({
        'ticker':tickers,
        'percent':percents,
        'company':companies
    })
    uc_investment = sec.loc[(sec['Ticker']==ticker) & (sec['Date']=='2025-03-31'),'Value'].values[0] * 1000
    df['amt'] = df['percent'].astype(float) /100 * uc_investment
    df.to_csv(f"holdings-{ticker}.csv", index=False)

    driver.quit()

get_holdings(site = "https://investor.vanguard.com/investment-products/etfs/profile/voo#portfolio-composition",ticker='VOO')
get_holdings(site = "https://investor.vanguard.com/investment-products/etfs/profile/vt#portfolio-composition",ticker='VT')


# %%

def clean_names(x):
    x = str(x)
    x = x.replace(' Inc.','')
    x = x.replace(' Co.','')
    x = x.replace(' Corp.','')
    x = x.replace(' Ltd.','')
    return x

voo = pd.read_csv("holdings-VOO.csv")
vt = pd.read_csv("holdings-VT.csv")
sipri = pd.read_excel('SIPRI-Top-100-2002-2023.xlsx', sheet_name='2023', skiprows=3)
voo['company'] = voo['company'].apply(clean_names)
vt['company'] = vt['company'].apply(clean_names)    
sipri['Company (c) '] = sipri['Company (c) '].apply(clean_names)

voo_sipri = voo.merge(sipri,how='left',left_on='company',right_on='Company (c) ')
voo_sipri = voo_sipri.loc[~voo_sipri['Country (d)'].isna()]
vt_sipri = vt.merge(sipri,how='left',left_on='company',right_on='Company (c) ')
vt_sipri = vt_sipri.loc[~vt_sipri['Country (d)'].isna()]
voo_sipri.amt.sum() + vt_sipri.amt.sum()

# %%
