"""
- Use SEC API to download all UChicago SEC filings since 1994
- Use Yahoo Finance as well as company-specific sites to - identify holdings and sector information for each holding
Compile financial statements
"""

# %% imports

# import requests
# from requests_html import HTMLSession
from nltk.corpus import stopwords
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import pytesseract
from pdf2image import (
    convert_from_path,
)  # chose this because it is OCR-based and handles individual pages

# import json
from tqdm import tqdm

# from bs4 import BeautifulSoup as bs
from selenium.webdriver.support.ui import Select
import time
import re
import os
from datetime import datetime
import xmltodict
import yfinance as yf
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import pandas as pd
import polars as pl
from polars import String, Int64, Date, ShapeError, ComputeError
from plotnine import (
    ggplot,
    geom_line,
    geom_point,
    geom_col,
    aes,
    xlab,
    ylab,
    ggtitle,
    # theme,
    # element_text,
    # scale_x_date,
    theme_minimal,
    coord_flip,
)

# import camelot
from edgar import *

# %% 990T filings from IRS via ProPublica API

# unused because data is not very detailed
# response=requests.get('https://projects.propublica.org/nonprofits/api/v2/organizations/362177139.json')

# %% get sec filings
# cite: https://pypi.org/project/edgartools/
# alternative: https://github.com/zpetan/sec-13f-portfolio-python

# 2. Tell the SEC who you are (required by SEC regulations)
set_identity("karenyi@uchicago.edu")

# 3. Find University of Chicago by its CIK number
company = Company("0000314957")

# 4. Get company filings
filings = company.get_filings()

# 5. Filter by form 13F-HR
# https://www.sec.gov/data-research/sec-markets-data/form-13f-data-sets
# https://www.sec.gov/files/form13f.pdf
investments = filings.filter(form="13F-HR")

# %% save sec filings

sec = pl.DataFrame()

for i, investment in enumerate(investments):
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
    df["Thousands"] = df["Value"]
    df["Issuer"] = df["Issuer"].str.upper()

    # print(df)

    sec = pl.concat([sec, df], how="diagonal")

# sec.write_csv("13F-HR.csv")
# %% read in downloaded sec data

sec = pd.read_csv("13F-HR.csv")
# sec[pd.to_datetime(sec['Date'])>datetime(2025,2,1)]
sec["Date"] = pd.to_datetime(sec["Date"])
sec["Year"] = sec["Date"].dt.year
sec["ValueThousands"] = sec["Value"]
sec["Issuer"] = sec["Issuer"].str.title()

# TODO: why is this 10,000K more than later subset?
print(sec.loc[sec.Year == 2025].ValueThousands.sum())

# use both info of shares (purchases) and values (market value)

# initialize a dummy first date for everyone at value 0
unique_companies = sec.drop_duplicates("Ticker").sort_values("Ticker")
sec = pd.concat(
    [
        sec,
        pd.DataFrame(
            {
                "Issuer": unique_companies["Issuer"],
                "Ticker": unique_companies["Ticker"],
                "Date": [datetime(1950, 1, 1)] * len(unique_companies),
                "SharesPrnAmount": [0] * len(unique_companies),
                "ValueThousands": [0] * len(unique_companies),
            }
        ),
    ]
).reset_index(drop=True)

# use lag to get differences over time
sec["LaggedShares"] = (
    sec.sort_values("Date").groupby("Issuer")["SharesPrnAmount"].shift(1)
)
sec["LaggedShares"] = sec["LaggedShares"].fillna(0)
sec["SharesDiff"] = sec["SharesPrnAmount"] - sec["LaggedShares"]
sec["ShareValue"] = sec["ValueThousands"] / sec["SharesPrnAmount"]
# TODO: very interesting that there are overall more sells than purchases. how is this possible to sell more shares than you have?
sec["SharePurchases"] = [x if x > 0 else np.nan for x in sec["SharesDiff"]]
sec["SharePurchaseValueThousands"] = round(sec["SharePurchases"] * sec["ShareValue"], 2)

# inspect share value to ensure reasonable values
print(round(sec["ShareValue"].describe(), 5) * 1000)
# does the max value stock make sense?
print(sec.iloc[sec["ShareValue"].idxmax()])

# remove dummy rows
sec = sec[sec["Date"] > datetime(1950, 1, 1)]

sec.sort_values(["Issuer", "Date"])[
    [
        "Issuer",
        "Ticker",
        "Date",
        "ShareValue",
        "SharesDiff",
        "SharesPrnAmount",
        "LaggedShares",
    ]
]

# %% explore total holdings over time

# value means market value in $1000s
amounts = (
    sec.dropna(subset="ShareValueDiffThousands")
    .groupby("Year")
    .agg({"ShareValueDiffThousands": lambda x: sum(x) / 1000})
    .reset_index()
    .rename(columns={"ShareValueDiffThousands": "PurchasesMillions"})
)
# amounts["Year"] = pd.to_datetime(amounts["Year"])

amounts.to_csv("annual-totals.csv")

(
    ggplot(amounts)
    + geom_point(aes(x="Year", y="PurchasesMillions"), alpha=1)
    + geom_line(aes(x="Year", y="PurchasesMillions"), alpha=1)
    # + scale_x_date(date_labels="%Y", date_breaks="1 year")
    + ggtitle("UChicago 13F-HR filings")
    + xlab("PurchasesMillions")
    + ylab("Value in millions of dollars")
    + theme_minimal()
    # + theme(axis_text_x=element_text(rotation=90, hjust=1))
)


# %% visualize by company

# top 10 by total shares actively purchased over time (not subtracting sold holdings)
top10 = (
    sec.groupby("Issuer")
    .agg({"SharePurchases": "sum", "Ticker": "first"})
    .sort_values("SharePurchases", ascending=False)
    .head(10)
    .reset_index()
    # .rename(columns={"Value": "Total in Millions"})
)

top10table = (
    sec.loc[[(x in top10["Issuer"].unique()) for x in sec["Issuer"]]]
    .dropna(subset=["SharePurchaseValueThousands"])
    .groupby(["Issuer"])
    .agg(
        {
            "Ticker": "first",
            "SharePurchaseValueThousands": lambda x: round(sum(x), 2),
            "Date": lambda x: list(x.dt.strftime("%Y-%m")),
        }
    )
    .sort_values("SharePurchaseValueThousands", ascending=False)
    .reset_index()
)
display(top10table)

# TODO: visualize by industry
# TODO: combine with private data? how?

# %% scrape holdings of index funds


# session = HTMLSession()
# r = session.get(site)


# note: this is JUST 1 quarter in 2025, for now
def get_holdings(company, ticker, pages=51):
    # TODO: cleanup and document this code
    sites = {
        "vanguard": f"https://investor.vanguard.com/investment-products/etfs/profile/{ticker.lower()}#portfolio-composition",
        "ishares": f"https://www.ishares.com/us/products/239726/{ticker.lower()}",
    }
    tabs = {
        "vanguard": "Portfolio composition",
        "ishares": "Holdings",
    }
    headings = {
        "vanguard": "Holding details",
        "ishares": "Holdings",
    }
    headingtypes = {
        "vanguard": "h5",
        "ishares": "h2",
    }

    driver = webdriver.Firefox()

    driver.get(sites[company])
    driver.execute_script("document.body.style.zoom='15%'")
    driver.maximize_window()
    elem = driver.find_element(By.XPATH, f"//*[text()='{tabs[company]}']")
    elem.send_keys(Keys.RETURN)
    driver.execute_script("document.body.style.zoom='15%'")

    data = []
    for i in tqdm(range(pages)):
        time.sleep(1)  # wait for the page to load
        try:
            turn_page = driver.find_element(By.TAG_NAME, "select")

            # Select the nth option (e.g., 3rd option, index starts at 0)
            Select(turn_page).select_by_index(i)  # 2 for the 3rd option

            # Find the first <h5> with text "Holding details"
            h5_elem = driver.find_element(
                By.XPATH,
                f"//{headingtypes[company]}[contains(text(), '{headings[company]}')]",
            )

            # Find the first <div> following this <h5>
            div_elem = h5_elem.find_element(By.XPATH, "following-sibling::div[1]")

            table = div_elem.find_elements(By.TAG_NAME, "table")
            if len(table[0].text):
                t = 0
            else:
                t = 3
            data.append(table[t].text.split("\n"))
        except Exception as e:
            print(f"Error: {e}")
            continue

    driver.quit()

    return data


def process_holdings(data, company, ticker):
    percents_col = {
        "vanguard": r"(\d+\.\d+) %",
        "ishares": r"\d+\.\d\d",
    }

    tickers = []
    percents = []
    companies = []
    for row in data:
        for cell in row:
            if "Ticker" not in cell:
                try:
                    ticker_i = re.search(r"^[A-Z\.\d]+", cell.strip("— "))[0]
                    tickers.append(ticker_i)
                except Exception as e:
                    print(f"Error parsing ticker: {cell} - {e}")
                    continue

                percents.append(re.search(percents_col[company], cell)[0].strip(" %"))

                try:
                    companies.append(
                        re.sub(r"\d{5,}.*", "", cell).strip(ticker_i).strip()
                    )
                except Exception as e:
                    print(f"Error parsing company: {cell} - {e}")
                    continue

    df = pd.DataFrame({"ticker": tickers, "percent": percents, "company": companies})
    uc_invested_dollars = (
        sec.sort_values("Date", ascending=False)
        .loc[(sec["Ticker"] == ticker), "Value"]
        .values[0]
        * 1000
    )

    df["amt"] = df["percent"].astype(float) / 100 * uc_invested_dollars
    df.to_csv(f"third-party/holdings-{ticker}.csv", index=False)


# TODO: deal with companies that had errors processing

for hold in [
    # "VT",
    # "VOO",
    # "VCLT"
    # "BND"
]:
    data = get_holdings(
        company="vanguard",
        ticker=hold,
    )
    process_holdings(data, company="vanguard", ticker=hold)

# ishares
for hold in [
    # "IVV",
    # "IEFA"
    # "IEMG"
]:
    data = get_holdings(
        company="ishares",
        ticker=hold,
    )
    process_holdings(data, company="ishares", ticker=hold)

# individual stocks, not portfolios

for hold in [
    # "NLY",
    # "LQD"
    # "NKGN"
]:
    data = get_holdings(
        company="",
        ticker=hold,
    )
    process_holdings(data, company="", ticker=hold)
# gulf canada no longer exists, was oil
# AMR corp no longer exists, was airlines

# TODO: switch to yfinance for top holdings (it's nice to see all holdings but not practical for all funds)
# yf.Ticker("VT").funds_data.top_holdings

# %% read in third party sources holdings data


def clean_names(x):
    x = str(x)
    x = x.replace(" Inc.", "")
    x = x.replace(" Co.", "")
    x = x.replace(" Corp.", "")
    x = x.replace(" Ltd.", "")
    return x


voo = pd.read_csv("third-party/holdings-VOO.csv")
voo["source"] = "VOO"
vt = pd.read_csv("third-party/holdings-VT.csv")
vt["source"] = "VT"
all_holdings = (
    pd.concat([voo, vt])
    .rename(
        columns={
            "amt": "ValueThousands",
            # "source": "Ticker",
            "company": "Issuer",
            "ticker": "Ticker",
        }
    )
    .drop_duplicates()
    .reset_index(drop=True)
)
all_holdings["ValueThousands"] = all_holdings["ValueThousands"] / 1000

# %% sipri weapons manufacturing analysis

sipri = pd.read_excel("SIPRI-Top-100-2002-2023.xlsx", sheet_name="2023", skiprows=3)
voo["company"] = voo["company"].apply(clean_names)
vt["company"] = vt["company"].apply(clean_names)
sipri["Company (c) "] = sipri["Company (c) "].apply(clean_names)

voo_sipri = voo.merge(sipri, how="left", left_on="company", right_on="Company (c) ")
voo_sipri = voo_sipri.loc[~voo_sipri["Country (d)"].isna()]
vt_sipri = vt.merge(sipri, how="left", left_on="company", right_on="Company (c) ")
vt_sipri = vt_sipri.loc[~vt_sipri["Country (d)"].isna()]
voo_sipri.amt.sum() + vt_sipri.amt.sum()


# %% merge stocks with 500 industry info

# TODO: need to match rough percentage of each industry to portfolios
# then group by year and report percentage of each industry per year
# but I only have makeup of holdings for 2 funds for 1 year, so can't compare over time

# all holdings including generic index funds
sec_2025 = sec[
    # take the most recent filing, idk how to aggregate over time as idk if new or total holdings
    sec["Year"] == 2025
]
print(len(sec_2025))

sec_2025 = pd.concat(
    [
        # excluding generic index funds VOO/VT
        sec_2025[~sec_2025["Ticker"].isin(["VOO", "VT"])],
        # add in specific holdings for VOO/VT funds
        all_holdings,
    ],
    axis=0,
    ignore_index=True,
)
sec_2025["Issuer"] = sec_2025["Issuer"].str.replace(" Inc.", "")

# there are overlapping stocks across funds
sec_2025 = (
    sec_2025.groupby(["Ticker"])
    .agg(
        {
            # not using lagged purchase value because this is a snapshot
            "ValueThousands": "sum",
            "Issuer": "first",
            # "Ticker": "first",
            # "Industry": "first",
            # "Summary": "first",
        }
    )
    .reset_index()
)[["Issuer", "Ticker", "ValueThousands"]]
print(len(sec_2025))
# print(sec_2025.Industry.isna().sum())

# %% read additional data if needed

prior_fp = "sec-industries-2025-41.csv"
fp = "sec-industries-2025-5.csv"
if os.path.exists(fp):
    sec_2025 = pd.read_csv(fp)
    prior = pd.read_csv(prior_fp)

    sec_2025 = pd.concat(
        [
            sec_2025[~sec_2025.Ticker.isin(prior.loc[prior.Industry.notna()].Ticker)],
            prior,
        ]
    )
print(len(sec_2025))
print(sec_2025.columns)
print(sec_2025.Industry.isna().sum())
display(sec_2025)

if "Industry" not in sec_2025.columns:
    sec_2025["Industry"] = None
if "Sector" not in sec_2025.columns:
    sec_2025["Sector"] = None
if "Summary" not in sec_2025.columns:
    sec_2025["Summary"] = None

tickers = sec_2025["Ticker"]
for ticker in sorted(list(set(tickers.unique()) - set([None, np.nan]))):
    # note that we use the NA string to indicate missing data so that we don't try to re-fetch

    if sec_2025.loc[tickers == ticker, "Industry"].notna().values[0]:
        print("Skipping", ticker, "existing info")
        continue

    if len(yf.Ticker(ticker).info.keys()) < 2:
        sec_2025.loc[tickers == ticker, "Industry"] = "missing"
        sec_2025.loc[tickers == ticker, "Sector"] = "missing"
        sec_2025.loc[tickers == ticker, "Summary"] = "missing"
        continue

    print("Getting info for", ticker)
    sec_2025.loc[tickers == ticker, "Industry"] = yf.Ticker(ticker).info.get(
        "industry", "missing"
    )
    sec_2025.loc[tickers == ticker, "Sector"] = yf.Ticker(ticker).info.get(
        "sector", "missing"
    )
    sec_2025.loc[tickers == ticker, "Summary"] = yf.Ticker(ticker).info.get(
        "longBusinessSummary", "missing"
    )


sec_2025.to_csv(fp, index=False)

# %% analyze by sector

sec_2025["Industry"] = sec_2025["Industry"].replace("missing", None)
sec_2025["Sector"] = sec_2025["Sector"].replace("missing", None)
sec_2025["Summary"] = sec_2025["Summary"].replace("missing", None)
# duplicate column for individual company info
sec_2025["ValueDollars"] = sec_2025["ValueThousands"] * 1000
sec_2025["Issuer"] = sec_2025["Issuer"].str.title()
sec_2025["Summary"] = sec_2025["Summary"].fillna("").str.replace("\\d+", "", regex=True)

print(
    round(
        sec_2025.loc[sec_2025.Sector.isna()].ValueThousands.sum()
        / sec_2025.ValueThousands.sum()
        * 100
    ),
    "% of holdings (in terms of dollar amount) have no sector info",
)

plot_df = (
    sec_2025[sec_2025.Summary.str.len() > 5]
    .dropna(how="any")
    # make sure that the biggest companies get listed first
    .sort_values("ValueThousands", ascending=False)
    .groupby("Sector")
    .agg(
        {
            "ValueThousands": "sum",
            # round to the nearest thousand dollars (to indicate uncertainty)
            "ValueDollars": lambda x: [f"${round(i):,}" for i in x[:5]],
            "Summary": lambda x: ",".join(x),
            "Issuer": lambda x: list(x)[:5],
        }
    )
    .reset_index()
    .sort_values("ValueThousands", ascending=False)
)
display(plot_df)

# import nltk
# nltk.download("stopwords")
eng_stops = stopwords.words("english")
# issuer_names = [i.lower() for x in plot_df["Issuer"] for i in x]
# issuer_names = [i for x in issuer_names for i in x.split(" ")]
# I cleaned this list manually for words that are not proper nouns
with open("company-names.txt", "r", encoding="utf-8") as f:
    proper_nouns = f.read().splitlines()


# when finding words to describe each sector's companies, exclude proper nouns
my_stops = (
    eng_stops
    + [
        "company",
        "segment",
        "segments",
        "parts",
        "offers",
        "services",
        "provides",
        "operates",
        "test",
        "founded",
        "sells",
        "specialty",
        "com",
        "million",
        "approximately",
        "including",
        "also",
        "well",
        "based",
        "headquartered",
        "products",
        "commercial",
        "maintenance",
        "components",
        "solution",
        "solutions",
        "management",
        "control",
        "systems",
        "united",
        "states",
    ]
    + list(set(proper_nouns))
)

# Cite: Copilot
tfidf = TfidfVectorizer(stop_words=my_stops, max_features=1000, ngram_range=(1, 3))
tfidf_matrix = tfidf.fit_transform(plot_df["Summary"])
# Get feature names (words)
feature_names = tfidf.get_feature_names_out()

# Extract top words for each summary
top_words = []
for row in tfidf_matrix:
    # Get indices of top words sorted by TF-IDF score
    sorted_indices = row.toarray().flatten().argsort()[::-1]
    top_word_indices = sorted_indices[:10]
    top_words.append([feature_names[i] for i in top_word_indices])
print(top_words)

# Add top words to the DataFrame
plot_df["TopWords"] = top_words
plot_df["TopWords"] = [", ".join(x) for x in plot_df["TopWords"]]

plot_df["Top5"] = [
    list(zip(row["Issuer"], row["ValueDollars"])) for _, row in plot_df.iterrows()
]
plot_df["Top5"] = [[f"    {i[0]}: {i[1]}    " for i in x] for x in plot_df["Top5"]]
plot_df["Top5"] = ["<br>".join(x) for x in plot_df["Top5"]]
# plot_df["Top5"] = [f"{row['Sector']}<br>{row['Top5']}" for _, row in plot_df.iterrows()]
plot_df["y"] = 100

plot_df[["Sector", "ValueThousands", "Top5", "TopWords", "y"]].rename(
    columns={
        "Sector": "sector",
        "Top5": "hoverinfo",
        "ValueThousands": "amount_thousands",
        "TopWords": "keywords",
    }
).to_json("../endowment-breakdown/data/sec-sectors-2025.json", orient="records")

# of each of these top sectors, what are the individual companies and keywords


(
    ggplot(
        plot_df[plot_df["ValueThousands"] > 1],
        aes("reorder(Sector, ValueThousands)", "ValueThousands"),
    )
    + geom_col()
    + coord_flip()
)

print(plot_df["TopWords"])
print(plot_df["TopWords"][7])

# %% explore which stocks are held


# %% get all statements

# unused because manual copying was easier than camelot parsing
# alternative: https://tabula-py.readthedocs.io/en/latest/
# statements_dir = "../endowment-breakdown/financial-statements"
# for file in os.listdir(statements_dir):
#     tables = camelot.read_pdf(os.path.join(statements_dir, file))
#     print(tables)
#     # tables.export('foo.csv', f='csv', compress=True)

# %% get parsed financial statements

fs = pd.read_csv("../endowment-breakdown/financial-statements.csv")

# categorize types into broader categories
type_dict = {
    "Domestic": "Public equities (stocks)",
    "International": "Public equities (stocks)",
    "Stocks": "Public equities (stocks)",  # TODO: actually this comprises public and private so maybe exclude pre 2000
    "Global public equities": "Public equities (stocks)",
    "High yield": "Bonds",
    "Cash equivalent": "Bonds",
    "Fixed income": "Bonds",
    "Absolute return": "Hedge funds",  # hedge funds may be public or private
    "Equity oriented": "Hedge funds",  # hedge funds may be public or private
    "Diversifying": "Hedge funds",  # hedge funds may be public or private
    "Private equity": "Private equities (stocks)",
    # "Assets held by trustee": "Funds in trust",
    # for now, to simplify graph, class most as other
    "Assets held by trustee": "Other",
    "Funds in trust": "Other",
    "Natural resources": "Other",
    "Private debt": "Other",
    "Real assets": "Other",
    "Real estate": "Other",
}

fs["fund_type"] = fs["type"]
fs["recategorized"] = fs["fund_type"].replace(type_dict)
fs["percent"] = fs["amount_thousands"] / fs["total_thousands"]
fs["label"] = [
    f"{x['fund_type']} ({round(x['percent'] * 100)}%)" for _, x in fs.iterrows()
]
data2023 = fs[fs["year"] == 2023].sort_values("percent", ascending=True)
# data2023["width"] = data2023["percent"]
# data2023["x"] = np.cumsum(data2023["width"]).round(2)
data2023["y"] = 100

data2023[
    [
        # "x",
        "y",
        "fund_type",
        # "width",
        "recategorized",
        "amount_thousands",
        # "hoverinfo",
    ]
].to_json(
    "../endowment-breakdown/data/financial-statement-2023.json",
    orient="records",
    lines=False,
)

# consolidate regrouped groups
# fs = fs.groupby(["year", "type"]).agg({"percent": "sum"}).reset_index()
# fs.to_csv("types.csv", index=False)

(
    ggplot(fs, aes(x="year", y="percent"))
    + geom_line(aes(color="type", line_type="type"))
)


# %% parse 990 data

foreignInvestments = []
administrativeExpenses = []
bonds = []
conflictsOfInterest = []
# TODO: still dont have pre 2013 non xml data
# TODO: 2010 is partly missing: schedule L is required as missing but data cuts off at schedule I

schedule_l = {}
for file in os.listdir("990"):
    # TODO: remove test filter
    if file.endswith("2009.pdf") and (
        "T" not in file
    ):  # pre 2013 format for 990s, not 990-Ts
        pages = convert_from_path(os.path.join("990", file))
        for i in tqdm(range(len(pages))):
            # skip first 50 pages as schedule L unlikely to be here
            if i < 55:
                continue

            schedule_l["file"] = file
            schedule_l["pages"] = []
            schedule_l["text"] = []

            text = pytesseract.image_to_string(pages[i])

            matches = 0
            # if a partial match detected, expand window of search to 2 pages in case of overflow
            if ("schedule l" in text.lower()) or ("schedule o" in text.lower()):
                text = pytesseract.image_to_string(
                    pages[i]
                ) + pytesseract.image_to_string(pages[i + 1])
                text = text.replace("SCHEDULE 0", "SCHEDULE O")  # fix parsing typo

                # both schedule L and O are mentioned on each relevant page because they are reliant on each other
                if ("schedule l" in text.lower()) and ("schedule o" in text.lower()):
                    schedule_l["pages"].append(f"{i}-{i + 1}")
                    schedule_l["text"].append(text)
                    print("Relevant page identified and parsed")
                    matches += 1
            # once we find both the schedule L page and the schedule O page we break
            if matches > 1:
                break

    # tables.export('foo.csv', f='csv', compress=True)
    if file.endswith(".xml"):  # post 2013 format
        with open(os.path.join("990", file), "r", encoding="utf-8") as f:
            my_xml = f.read()

        # Use xmltodict to parse and convert
        # the XML document
        data = xmltodict.parse(my_xml)["Return"]
        ret = data["ReturnData"]
        year = data["ReturnHeader"].get("TaxPeriodEndDt") or data["ReturnHeader"].get(
            "TaxPeriodEndDate"
        )
        print(year)

        F = ret.get("IRS990ScheduleF", None)
        F = F.get(
            "AcctsActvsOutUSTable",
            F.get("AccountActivitiesOutsideUSGrp", {}),
        )
        F = [
            x
            for x in F
            if x.get(
                "TypeOfActivity",
                x.get(
                    "TypeOfActivitiesConducted",
                    x.get("TypeOfActivitiesConductedTxt", {}),
                ),
            )
            in ["INVESTMENTS", "Investments"]
        ]
        for x in F:
            x["Year"] = year
        foreignInvestments += F

        D = ret.get("IRS990ScheduleD", None)
        D = D.get("CurrentYear", D.get("CYEndwmtFundGrp", {}))
        administrativeExpenses.append(
            {
                "Year": year,
                "AdministrativeExpenses": D.get(
                    "AdministrativeExpenses", D.get("AdministrativeExpensesAmt", {})
                ),
            }
        )

        for key in [
            "TaxExemptBondsIssuesGrp",
            "Form990ScheduleKPartI",
            "Form990ScheduleKPartII",
            "Form990ScheduleKPartIII",
        ]:
            K = (
                ret.get("IRS990ScheduleK", [])
                + ret.get("IRS990ScheduleK1", [])
                + ret.get("IRS990ScheduleK2", [])
                + ret.get("IRS990ScheduleK3", [])
            )
            K = [x.get(key) for x in K if x.get(key)]
            # Unnest so K_flat is always a flat list of dicts
            K_flat = []
            for x in K:
                if isinstance(x, dict):
                    x["Year"] = year
                    K_flat.append(x)
                elif isinstance(x, list):
                    for i in x:
                        if isinstance(i, dict):
                            i["Year"] = year
                            K_flat.append(i)
            bonds += K_flat

        # this is just to get confirmation of involved parties. we can get the actual amounts from the preqin dataset
        # may need to match on Part V text (split by sentence or other indicator)
        # filter these to any that mention "university's investment"
        L = ret.get("IRS990ScheduleL", None)
        L = L.get("BusTrInvolveInterestedPrsnGrp", L.get("", {}))
        for x in L:
            x["Year"] = year
            x["NameOfInterested"] = x["NameOfInterested"].get("BusinessName") or x[
                "NameOfInterested"
            ].get("PersonNm")
            if isinstance(x["NameOfInterested"], dict):
                x["NameOfInterested"] = x["NameOfInterested"].get(
                    "BusinessNameLine1"
                ) or x["NameOfInterested"].get("BusinessNameLine1Txt")

        conflictsOfInterest += L


# %% save 990 data
def rename_keys(d, rename_map):
    return {rename_map.get(k, k): v for k, v in d.items()}


pd.DataFrame(conflictsOfInterest).to_csv("conflicts-of-interest.csv", index=False)

rename_bonds = {
    "CUSIPNum": "CUSIPNumber",
    "IssuePrice": "IssuePriceAmt",
    "OnBehalfOfIssuerInd": "OnBehalfOfIssuer",
    "PoolFinancingInd": "PoolFinancing",
    "BondIssuedDt": "DateIssued",
    "DefeasedInd": "Defeased",
    "IssuerEIN": "BondIssuerEIN",
    "PurposeDesc": "DescriptionOfPurpose",
    # "PercentageOfPrvtBusinessReUBI": "BondIssuerEIN",
}
pd.DataFrame([rename_keys(x, rename_bonds) for x in bonds]).to_csv(
    "bonds.csv", index=False
)

pd.DataFrame(administrativeExpenses).to_csv("administrative-expenses.csv", index=False)

rename_fi = {
    "TypeOfActivitiesConductedTxt": "TypeOfActivity",
    "TypeOfActivitiesConducted": "TypeOfActivity",
    "RegionTxt": "Region",
    "RegionTotalExpendituresAmt": "TotalExpenditures",
    # "PercentageOfPrvtBusinessReUBI": "BondIssuerEIN",
}
pd.DataFrame([rename_keys(x, rename_fi) for x in foreignInvestments]).to_csv(
    "foreign-investments.csv", index=False
)

# pd.DataFrame().to_csv("990-schedules.csv", index=False)
