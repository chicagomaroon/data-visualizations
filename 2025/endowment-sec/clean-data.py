"""
Use SEC API to download all UChicago SEC filings since 1994
"""

# %% imports

import os
import re
from datetime import datetime
import xmltodict
import yfinance as yf

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
    theme,
    element_text,
    scale_x_date,
    theme_minimal,
    coord_flip,
)

# import camelot
from edgar import *

# %% 990T filings from IRS via ProPublica API

# unused because data is not very detailed
# response=requests.get('https://projects.propublica.org/nonprofits/api/v2/organizations/362177139.json')

# %% SEC filings
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

# %% save filings

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

# %% explore total holdings over time

sec = pd.read_csv("13F-HR.csv")
# sec[pd.to_datetime(sec['Date'])>datetime(2025,2,1)]
sec["Date"] = pd.to_datetime(sec["Date"])

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
    .agg({"SharesPrnAmount": "max", "Ticker": "first"})
    .sort_values("SharesPrnAmount", ascending=False)
    .head(5)
    .reset_index()
    # .rename(columns={"Value": "Total in Millions"})
)

# TODO: for summarizing things like shares over time, wouldn't sum not make sense because some of the shares are held continually over time? therefore do a lagged difference and then sum?
# TODO: visualize by industry
# TODO: combine with private data? how?
# TODO: verify via SharesPrnAmt that shares is correlated with value, ie UChicago is genuinely investing more
(
    ggplot(sec.loc[[x in top10["Issuer"].unique() for x in sec["Issuer"]]])
    + geom_point(aes(x="Date", y="SharesPrnAmount", color="Issuer"), alpha=1)
    + geom_line(aes(x="Date", y="SharesPrnAmount", color="Issuer"), alpha=1)
    + ggtitle("UChicago 13F-HR filings")
    + xlab("Date")
    + ylab("Shares")
    + scale_x_date(date_labels="%Y-%m", date_breaks="1 year")
    + theme_minimal()
    + theme(axis_text_x=element_text(rotation=90, hjust=1))
)


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
    "Domestic": "Public equities",
    "International": "Public equities",
    "Stocks": "Public equities",  # TODO: actually this comprises public and private so maybe exclude pre 2000
    "Global public equities": "Public equities",
    "High yield": "Bonds",
    "Cash equivalent": "Bonds",
    "Fixed income": "Bonds",
    "Absolute return": "Private equities",  # hedge funds may be public or private
    "Equity oriented": "Private equities",  # hedge funds may be public or private
    "Diversifying": "Private equities",  # hedge funds may be public or private
    "Private equity": "Private equities",
    # "Assets held by trustee": "Funds in trust",
    # for now, to simplify graph, class most as other
    "Assets held by trustee": "Other",
    "Funds in trust": "Other",
    "Natural resources": "Other",
    "Private debt": "Other",
    "Real assets": "Other",
    "Real estate": "Other",
}


for k, v in type_dict.items():
    fs.loc[fs["type"].str.contains(k, na=False), "type"] = v

# consolidate regrouped groups
fs = fs.groupby(["year", "type"]).agg({"percent": "sum"}).reset_index()
fs.to_csv("types.csv", index=False)

(
    ggplot(fs, aes(x="year", y="percent"))
    + geom_line(aes(color="type", line_type="type"))
)

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


# note: this is JUST 1 quarter in 2025, for now
def get_holdings(company="vanguard", ticker=None, pages=51):
    sites = {
        "vanguard": f"https://investor.vanguard.com/investment-products/etfs/profile/{ticker.lower()}#portfolio-composition",
        "ishares": f"https://www.ishares.com/us/products/239726/{ticker.lower()}",
    }
    tabs = {
        "vanguard": "Portfolio composition",
        "ishares": "Holdings",
    }
    headings = {
        "vanguard": "Holding detailss",
        "ishares": "Holdings",
    }
    headingtypes = {
        "vanguard": "h5",
        "ishares": "h2",
    }
    percents = {
        "vanguard": "(\\d+\\.\\d+) %",
        "ishares": "\\d+\\.\\d\\d",
    }
    companies = {
        "vanguard": " [A-Z][A-Za-z &\\.\\(\\)'/]+(\\d|—)",
        "ishares": "^ [A-Z][A-Za-z &\\.\\(\\)'/]+ (\\$)",
    }

    driver = webdriver.Firefox()

    driver.get(sites[company])
    driver.execute_script("document.body.style.zoom='15%'")
    driver.maximize_window()
    elem = driver.find_element(By.XPATH, f"//*[text()='{tabs[company]}']")
    elem.send_keys(Keys.RETURN)
    driver.execute_script("document.body.style.zoom='15%'")

    data = []
    for i in range(pages):
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

    tickers = []
    percents = []
    companies = []
    for d in data:
        for i in d:
            if "Ticker" not in i:
                try:
                    ticker_i = re.search("^[A-Z\\.\\d]+", i)[0]
                    tickers.append(ticker_i)
                except Exception as e:
                    print(f"Error parsing ticker: {i} - {e}")
                    break

                percents.append(re.search(percents[company], i)[0].strip(" %"))

                try:
                    companies.append(
                        re.search(
                            companies[company],
                            i.strip().strip("—").strip(ticker_i).strip(" $"),
                        )[0][1:-2].strip()
                    )
                except Exception as e:
                    print(f"Error parsing company: {i} - {e}")
                    break

    df = pd.DataFrame({"ticker": tickers, "percent": percents, "company": companies})
    uc_investment = (
        sec.sort_values("Date", ascending=False)
        .loc[(sec["Ticker"] == ticker), "Value"]
        .values[0]
        * 1000
    )
    df["amt"] = df["percent"].astype(float) / 100 * uc_investment
    df.to_csv(f"holdings-{ticker}.csv", index=False)

    driver.quit()


# vanguard
# get_holdings(
#     ticker="VOO",
# )
# get_holdings(
#     ticker="VT",
# )
# get_holdings(
#     ticker="VCLT",
# )
# get_holdings(
#     ticker="BND",
# )

# ishares
get_holdings(
    ticker="IVV",
)
get_holdings(
    ticker="IEFA",
)
get_holdings(
    ticker="IEMG",
)

# individual stocks, not portfolios
# get_holdings(
#     ticker="NLY",
# )
# get_holdings(
#     ticker="LQD",
# )
# get_holdings(
#     ticker="NKGN",
# )
# gulf canada no longer exists, was oil
# AMR corp no longer exists, was airlines

# TODO: switch to yfinance for top holdings (it's nice to see all holdings but not practical for all funds)
yf.Ticker("VT").funds_data.top_holdings


# %%


def clean_names(x):
    x = str(x)
    x = x.replace(" Inc.", "")
    x = x.replace(" Co.", "")
    x = x.replace(" Corp.", "")
    x = x.replace(" Ltd.", "")
    return x


voo = pd.read_csv("holdings-VOO.csv")
voo["source"] = "VOO"
vt = pd.read_csv("holdings-VT.csv")
vt["source"] = "VT"
all_holdings = pd.concat([voo, vt])

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
sec_2025 = pd.concat(
    [
        sec[
            (~sec["Ticker"].isin(["VOO", "VT"]))
            # take the most recent filing, idk how to aggregate over time as idk if new or total holdings
            & (sec["Date"] == datetime(2025, 3, 31))
        ],
        all_holdings.rename(
            columns={
                "percent": "Thousands",
                # "source": "Ticker",
                "company": "Issuer",
                "ticker": "Ticker",
            }
        ),
    ]
)
sec_2025["Issuer"] = sec_2025["Issuer"].str.upper()
# there are overlapping stocks across funds
sec_2025 = (
    sec_2025.groupby(["Issuer"])
    .agg({"Thousands": "sum", "Ticker": "first"})
    .reset_index()
)[["Issuer", "Ticker", "Thousands"]]

sec_2025["Summary"] = None

for ticker in sorted(list(set(sec_2025["Ticker"].unique()) - set([None]))):
    print(ticker)
    # if sec_2025.loc[sec_2025["Ticker"] == ticker, "Industry"].isna().values[0]:
    #     sec_2025.loc[sec_2025["Ticker"] == ticker, "Industry"] = yf.Ticker(
    #         ticker
    #     ).info.get("industry", None)
    sec_2025.loc[sec_2025["Ticker"] == ticker, "Summary"] = yf.Ticker(ticker).info.get(
        "longBusinessSummary", None
    )

sec_2025.to_csv("sec-industries-2025-4.csv", index=False)

plot_df = (
    sec_2025[~sec_2025["Industry"].isna()]
    .groupby("Industry")
    .agg({"Thousands": "sum"})
    .reset_index()
    .sort_values("Thousands", ascending=False)
)

(
    ggplot(
        plot_df[plot_df["Thousands"] > 0.1],
        aes("reorder(Industry, Thousands)", "Thousands"),
    )
    + geom_col()
    + coord_flip()
)

# %% parse 990 data

foreignInvestments = []
administrativeExpenses = []
bonds = []
conflictsOfInterest = []
for file in os.listdir("990"):
    # if file.endswith(".pdf"):
    #     tables = camelot.read_pdf(os.path.join("990", file), pages="all")
    #     print(tables)
    # tables.export('foo.csv', f='csv', compress=True)
    if file.endswith(".xml"):
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
