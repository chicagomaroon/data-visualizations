"""
- Use SEC API to download all UChicago SEC filings since 1994
- Use Yahoo Finance as well as company-specific sites to - identify holdings and sector information for each holding
Compile financial statements
"""

# %% imports

from edgar import set_identity, Company
import pytesseract
from pdf2image import (
    convert_from_path,
)  # chose this because it is OCR-based and handles individual pages
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import json
from tqdm import tqdm
from selenium.webdriver.support.ui import Select
import time
import re
import os
from datetime import datetime
import xmltodict
import yfinance as yf
import numpy as np
import pandas as pd
import polars as pl
from polars import String, Int64, Date, ShapeError, ComputeError

# NOTE: did not use 990T filings from IRS via ProPublica API because data is not very detailed projects.propublica.org/nonprofits/api/v2

# %% functions


def get_sec(email="YOUR_EMAIL@uchicago.edu"):
    """
    Docstring for get_sec

    cite: https://pypi.org/project/edgartools/
    alternative: https://github.com/zpetan/sec-13f-portfolio-python

    :param email: Description
    """
    # Tell the SEC who you are (required by SEC regulations)
    set_identity(email)

    # Find University of Chicago by its CIK number
    company = Company("0000314957")

    # Get company filings
    filings = company.get_filings()

    # Filter by form 13F-HR
    # https://www.sec.gov/data-research/sec-markets-data/form-13f-data-sets
    # https://www.sec.gov/files/form13f.pdf
    investments = filings.filter(form="13F-HR")

    return investments


schemas = {
    "1999": [
        ("Issuer", String),
        ("Class", String),
        ("Cusip", String),
        ("Value", Int64),
        ("SharesPrnAmount", String),
        ("Type", String),
        ("InvestmentDiscretion", String),
        ("Ticker", String),  # actually managers, no ticker at this time
        ("SoleVoting", Int64),
        ("SharedVoting", Int64),
        ("NonVoting", Int64),
    ],
    "2007": [
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
    ],
    "2008": [
        ("Issuer", String),
        ("Class", String),
        ("Cusip", String),
        ("Value", Int64),
        ("SharesPrnAmount", String),
        ("Type", String),
        ("InvestmentDiscretion", String),
        ("SoleVoting", Int64),
        ("SharedVoting", Int64),
        ("NonVoting", Int64),
    ],
}

split_line_patterns = {
    "Cusip": "(\\d[\\dA-Z]{0,8})",
    "Value": "(\\d{2,7})",
    "SharesPrnAmount": "(\\d{2,7})",
    "Type": "([SH]{2})",
    "InvestmentDiscretion": "([OtherSoleOTHERSOLE]{4,6})",
    "Ticker": "(\\d{1,2})",
    "SoleVoting": "(\\d{1,2})",
    "SharedVoting": "(\\d{1,6})",
    "NonVoting": "(\\d{1,6})",
}


def split_from_right(line, cells=10):
    parts = re.split(r"\s+", line.strip())

    if len(parts) <= cells:
        return parts

    left = " ".join(parts[: -cells + 1])
    right = parts[-cells + 1 :]

    return [left] + right


def split_with_patterns(
    line,
    schema,
    cls_pattern="(NLGO 03|CV C|Non Cum Perp|Ishares Mid Val (FD)?|SUB Vtg|(Cl |CL )?(A )?(B )?(Com|COM|BEN|ADR|CAP|PFD|PLC|RTS|REIT|INT)( Biosurgery| Molec Onc)?( EXCH)?|A|B)$",
):
    orig_line = line

    # remove redundant whitespace
    line = re.sub(r"\s+", " ", line)
    row = []

    # split line into cells from right to left
    patterns = [split_line_patterns[k] for k, v in schema if k in split_line_patterns]
    # reverse the order of the patterns to use it backwards
    for pattern in patterns[::-1]:
        split = line.rsplit(" ", 1)
        if re.search(pattern, split[-1]):
            row.append(split[-1])
            line = split[0]
        else:
            row.append(None)

    # try to split remainder of line into issuer and class
    try:
        cls = re.search(
            cls_pattern,
            line.strip(),
        ).group()
    except Exception as e:
        print(
            f"Error parsing class: {line} from {orig_line} - {e}",
            f"\nUsing row of length {len(row) + 2}",  # including the placeholder None and the as-yet to be assigned date
        )
        cls = None
    row.append(cls)

    # rest of the line is issuer
    row.append(line.strip(cls).strip())

    # add the backwards row in forwards order
    return row[::-1]


def sec_parse_1999(filing):
    """
    Use line of dashes ----- to indicate where headers end and data starts

    Cite: Copilot

    :param table: Description
    """

    table = re.split("------+\\s*\\n", filing)[-1]

    lines = table.splitlines()
    # remove line numbers
    lines = [re.sub("^\\d+ *", "", row) for row in lines]

    # if rows were split onto multiple lines, combine every x lines until length of next line is long enough
    clean_lines = []
    for i in range(len(lines)):
        if len(lines[i].strip()) >= 50:
            clean_line = lines[i]
        elif len(lines[i].strip()) == 1:
            clean_line += lines[i]  # no space if it's just 1 letter
        else:
            clean_line += " " + lines[i]  # space if it's more than 1 cell
        if (i == len(lines) - 1) or (len(lines[i + 1].strip()) >= 50):
            clean_lines.append(clean_line)

    rows = []
    for line in clean_lines:
        if len(line.strip()):
            row = re.split("  +", line.strip())
            # in case any used single spaces after the first split, split again
            row = [row[0]] + [token for x in row[1:] for token in re.split(" ", x)]

            if (len(row) == 9) and (
                row[-1] == "SOLE"
            ):  # exception for 06/30/1999 I think it's a bug
                row[-1] = None

            rows.append(row + [None] * (11 - len(row)))

    rows = rows[:-1]  # remove last row since it is a summary row

    return rows


def sec_parse_2007(filing):
    """
    Use header string "SHARED NONE" to indicate end of headers and beginning of data
    No fixed length or separator for data

    :param table: Raw 13-HR file
    """

    # remove header and footer
    table = filing.split("SHARED NONE")[-1].split("Other Managers")[0]

    lines = table.splitlines()
    # remove line numbers
    lines = [re.sub("^\\d+ *", "", line) for line in lines]

    rows = []
    for line in lines:
        if len(line.strip()) > 50:
            # exception for bug in which both sole and other used
            line = re.sub("Sole Other", "SoleOther", line)

            # exception for bug in which different manager numbers listed
            line = re.sub("0(\\d) 0\\d", "0\\1", line)

            row = split_with_patterns(line, schemas["2007"])

            rows.append(row)

    return rows


def sec_parse_2008(filing):
    """
    Use the header string "SHARED NONE" to locate end of headers and beginning of data
    Fixed length of 10 characters per cell

    Cite: Copilot

    :param table: Raw 13-HR file
    """

    # table is everything after the SHARED NONE header indicators
    table = filing.split("SHARED NONE")[-1]

    lines = table.splitlines()
    # remove row numbers
    lines = [re.sub("^\\d+ *", "", row) for row in lines]

    # split by spaces
    rows = []
    for line in lines:
        if len(line.strip()):
            rows.append(split_from_right(line))

    rows = rows[:-5]  # remove last rows
    return rows


def parse_sec(investment):
    """
    Docstring for parse_sec

    Cite: Copilot for some of the more complex logic

    :param investment: Description
    :param sec: Description

    :example: parse_sec(investments[74])
    """

    try:  # files after 2008 are stored as HTML and machine readable
        filing = investment.obj()
        df = pl.DataFrame(filing.infotable)
        date = datetime.strptime(filing.report_period, "%Y-%m-%d").date()
    except AttributeError:  # files before 2008 are not machine readable
        filing = investment.full_text_submission()
        date = datetime.strptime(investment.report_date, "%Y-%m-%d").date()

        if "($1000)" in filing:  # eg sep 2007
            print(f"Using 2007 style parsing for filing {i} at {date}")
            schema = schemas["2007"]
            rows = sec_parse_2007(filing)
        elif "------" in filing:  # eg 1999
            print(f"Using 1999 style parsing for filing {i} at {date}")
            schema = schemas["1999"]
            rows = sec_parse_1999(filing)
        else:  # eg sep 2008
            print(f"Using 2008 style parsing for filing {i} at {date}")
            schema = schemas["2008"]
            rows = sec_parse_2008(filing)

        try:
            print(
                "    Result:",
                len(rows),
                "rows and",
                len(rows[0]),
                "columns for",
                len(schema),
                "length schema.",
                "\n    First parsed row: ",
                [f"{head[0]}: {cell}" for head, cell in list(zip(schema, rows[0]))],
                "\n    Second parsed row: ",
                [f"{head[0]}: {cell}" for head, cell in list(zip(schema, rows[1]))],
            )
            df = pl.DataFrame(rows, schema=schema)
        except ShapeError as e:
            # print(table[:1000])
            print(f"{date} filing number {i} has shape error: {e}")
            print([(i, row) for i, row in enumerate(rows) if len(row) != len(schema)])
            raise e
        except ComputeError as e:
            print(f"{date} filing number {i} has row mismatch: {e}")
            print([(i, row) for i, row in enumerate(rows) if len(row) != len(schema)])

            raise e

    # if 2021 or later, 2003-2005, 2000, or 1999, divide value by 1000 (we will report all data in thousands)
    # cover pages state that reports past this date are reported in dollars instead of thousands
    # note that official SEC documentation lists data format change date as 1/3/2023 but I do not see this reflected in the data https://www.sec.gov/files/form_13f_readme.pdf
    # https://www.sec.gov/Archives/edgar/data/314957/000110465924034451/xslForm13F_X02/primary_doc.xml
    if (
        (date >= datetime(2020, 12, 1).date())
        or (
            date <= datetime(2005, 6, 1).date() and date >= datetime(2003, 12, 1).date()
        )
        or (
            date <= datetime(2000, 12, 1).date() and date >= datetime(2000, 8, 1).date()
        )
        or (date <= datetime(1999, 4, 1).date())
    ):
        df = df.with_columns((pl.col("Value") / 1000).cast(Int64).alias("Value"))

    # add date column
    df = df.with_columns(pl.lit(date).alias("Date"))
    df = df.rename({"Value": "ValueThousands"})

    # check that sum is in billions
    print(
        "Total for date",
        date,
        ": ",
        df["ValueThousands"].sum() / 1000000,
        "B",
    )
    if (df["ValueThousands"].sum() < 1000) or (df["ValueThousands"].sum() > 1000000):
        raise ValueError("ERROR AMOUNT IS WRONG")

    return df


parse_sec(investments[75])


def get_holdings(company, ticker, pages=51):
    """
    Docstring for get_holdings

    :param company: Description
    :param ticker: Description
    :param pages: Description
    """
    # TODO: cleanup and document this code
    # # note: this is JUST 1 quarter in 2025, for now

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


def clean_names(x):
    x = str(x)
    x = x.replace(" Inc.", "")
    x = x.replace(" Co.", "")
    x = x.replace(" Corp.", "")
    x = x.replace(" Ltd.", "")
    return x


def get_schedule_l(ret):
    """
    this is just to get confirmation of involved parties. we can get the actual amounts from the preqin dataset
    may need to match on Part V text (split by sentence or other indicator)
    filter these to any that mention "university's investment"
    """

    L = ret.get("IRS990ScheduleL", None)

    partv = L.get("SupplementalInformationDetail", L.get("Form990ScheduleLPartV", {}))
    if isinstance(partv, list):
        partv = partv[1]
    partv = partv.get("ExplanationTxt", partv.get("Explanation", {})).upper()

    # split on periods following 3 or more letters or numbers
    partv = re.split(r"((?<=[A-Z0-9]{3})\. )|(\.(?=[A-Z]))|( \. )", partv)
    partv = [i for i in partv if (i is not None) and (len(i) > 5)]

    # get all business transactions that involves interested persons or groups
    L = L.get("BusTrInvolveInterestedPrsnGrp", L.get("", {}))
    for x in L:
        x["Year"] = year
        if isinstance(x["NameOfInterested"], dict):
            x["NameOfInterested"] = x["NameOfInterested"].get("BusinessName") or x[
                "NameOfInterested"
            ].get("PersonNm")
        if isinstance(x["NameOfInterested"], dict):
            x["NameOfInterested"] = x["NameOfInterested"].get("BusinessNameLine1") or x[
                "NameOfInterested"
            ].get("BusinessNameLine1Txt")
        # get all sentences matching first 10 letters of company
        x["RelationshipDescriptionTxt"] = ". ".join(
            [i for i in partv if x["NameOfInterested"].upper()[:10] in i]
        )
        x["Endowment"] = (
            "university's investment" in x["RelationshipDescriptionTxt"].lower()
        )

    return L


# %% get and parse sec filings

investments = get_sec("YOUR_EMAIL@uchicago.edu")

sec = pl.DataFrame()

for i, investment in enumerate(investments):
    df = parse_sec(investment)
    if len(df):
        sec = pl.concat(
            [sec, df],
            how="diagonal",
        )

print("DONE!")
sec.write_csv("13F-HR.csv")

# %% read in downloaded sec data

sec = pd.read_csv("13F-HR.csv")

# clean data after reading using pandas
sec["Date"] = pd.to_datetime(sec["Date"])
sec["Year"] = sec["Date"].dt.year
sec["Issuer"] = sec["Issuer"].str.title()

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

# %% scrape holdings of index funds

# TODO: deal with companies that had errors processing

for hold in ["VT", "VOO", "VCLTBND"]:
    data = get_holdings(
        company="vanguard",
        ticker=hold,
    )
    process_holdings(data, company="vanguard", ticker=hold)

# ishares
for hold in ["IVV", "IEFAIEMG"]:
    data = get_holdings(
        company="ishares",
        ticker=hold,
    )
    process_holdings(data, company="ishares", ticker=hold)

# NOT USED: individual stocks, not portfolios
# gulf canada no longer exists, was oil
# AMR corp no longer exists, was airlines
for hold in ["NLY", "LQDNKGN"]:
    data = get_holdings(
        company="",
        ticker=hold,
    )
    process_holdings(data, company="", ticker=hold)

# TODO: switch to yfinance for top holdings (it's nice to see all holdings but not practical for all funds)
# yf.Ticker("VT").funds_data.top_holdings

# %% read in third party sources holdings data


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
        }
    )
    .reset_index()
)[["Issuer", "Ticker", "ValueThousands"]]
print(len(sec_2025))

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

# %% analyze by sector


def format_amount(value):
    """
    Format a numeric value as K, M, or B depending on its magnitude.
    """
    if value >= 1_000_000_000:
        return f"{value / 1_000_000_000:.1f}B"
    elif value >= 1_000_000:
        return f"{value / 1_000_000:.1f}M"
    elif value >= 1_000:
        return f"{value / 1_000:.0f}K"
    else:
        return f"{value:.0f}"


sec_2025["Industry"] = sec_2025["Industry"].replace("missing", None)
sec_2025["Sector"] = sec_2025["Sector"].replace("missing", None)
sec_2025["Summary"] = sec_2025["Summary"].replace("missing", None)
# duplicate column for individual company info
sec_2025["ValueDollars"] = sec_2025["ValueThousands"] * 1000
sec_2025["ValueDollars"] = sec_2025["ValueDollars"].apply(format_amount)
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
            "ValueThousands": lambda x: round(sum(x)),
            # round to the nearest thousand dollars (to indicate uncertainty)
            "ValueDollars": lambda x: [f"${i}" for i in x[:5]],
            "Summary": lambda x: ",".join(x),
            "Issuer": lambda x: list(x)[:5],
        }
    )
    .reset_index()
    .sort_values("ValueThousands", ascending=False)
)

# add top 5 companies per sector for hover info
plot_df["AmountLabels"] = (plot_df["ValueThousands"] * 1000).apply(format_amount)
plot_df["Top5"] = [
    list(zip(row["Issuer"], row["ValueDollars"])) for _, row in plot_df.iterrows()
]
plot_df["Top5"] = [[f"    {i[0]}: {i[1]}    " for i in x] for x in plot_df["Top5"]]
plot_df["Top5"] = ["<br>".join(x) for x in plot_df["Top5"]]

plot_df[["Sector", "ValueThousands", "Top5", "TopWords", "y", "AmountLabels"]].rename(
    columns={
        "Sector": "sector",
        "Top5": "hoverinfo",
        "ValueThousands": "amount_thousands",
        "TopWords": "keywords",
        "AmountLabels": "amount_display",
    }
).to_json("../endowment-breakdown/data/sec-sectors-2025.json", orient="records")

# %% get all statements: manual copying was easier than camelot parsing

# %% get parsed financial statements

fs = pd.read_csv("../endowment-breakdown/financial-statements.csv")

fs.groupby("year")["amount_thousands"].sum().to_json(
    "../endowment-breakdown/data/uchicago-endowment-by-year.json", orient="records"
)

# categorize types into broader categories
type_dict = {
    "Domestic": "Public equities (stocks)",
    "International": "Public equities (stocks)",
    "Stocks": "Public equities (stocks)",  # TODO: actually this comprises public and private so maybe exclude pre 2000
    "Global public equities": "Public equities (stocks)",
    "International public equities": "Public equities (stocks)",
    "Domestic public equities": "Public equities (stocks)",
    "High yield": "Bonds",
    "High yield bonds": "Bonds",
    "Cash equivalent": "Bonds",
    "Cash equivalents": "Bonds",
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
    "Receivable for investments sold": "Other",  # TODO: how to categorize
}

fs["fund_type"] = fs["type"]
fs["recategorized"] = fs["fund_type"].replace(type_dict)
fs["percent"] = fs["amount_thousands"] / fs["total_thousands"]
fs["label"] = [
    f"{x['fund_type']} ({round(x['percent'] * 100)}%)" for _, x in fs.iterrows()
]
data2025 = fs[fs["year"] == 2025].sort_values("percent", ascending=True)
data2025["y"] = 100

data2025[
    [
        "fund_type",
        "recategorized",
        "amount_thousands",
    ]
].to_json(
    "../endowment-breakdown/data/financial-statement-2025.json",
    orient="records",
    lines=False,
)

# consolidate recategorized groups
fs = (
    fs.groupby(["year", "recategorized"])
    .agg({"percent": "sum", "fund_type": "first", "amount_thousands": "sum"})
    .reset_index()
)
fs["percent"] = round(fs["percent"] * 100)
fs["cumulative"] = (
    fs.sort_values(["year", "recategorized"])  # Ensure data is sorted by year and type
    .groupby("year")["percent"]  # Group by year
    .cumsum()  # Calculate cumulative sum of percent
) / 100


fs[fs["year"] >= 2000][
    [
        # "x",
        "year",
        "fund_type",
        "percent",
        "cumulative",
        # "width",
        "recategorized",
        "amount_thousands",
        # "hoverinfo",
    ]
].sort_values("recategorized").to_json(
    "../endowment-breakdown/data/types-over-time.json",
    orient="records",
    lines=False,
)


# %% parse 990 data

foreignInvestments = []
administrativeExpenses = []
bonds = []
conflictsOfInterest = []
# TODO: still dont have pre 2013 non xml data
# TODO: 2010 is partly missing: schedule L is required as missing but data cuts off at schedule I
# TODO: when did schedule L get invented - I don't see any data before 2009 or in 2010


schedule_l = {}
for file in os.listdir("990"):
    if file.endswith(".pdf") and (
        "T" not in file
    ):  # pre 2013 format for 990s, not 990-Ts
        pages = convert_from_path(os.path.join("990", file))

        schedule_l["file"] = file
        schedule_l["pages"] = []
        schedule_l["text"] = []

        for i in tqdm(range(len(pages))):
            # skip first 50 pages as schedule L unlikely to be here
            if i < 55:
                continue

            text = pytesseract.image_to_string(pages[i])

            matches = 0
            # if a partial match detected, expand window of search to 2 pages in case of overflow
            if ("schedule l" in text.lower()) or ("schedule o" in text.lower()):
                text = pytesseract.image_to_string(
                    pages[i]
                ) + pytesseract.image_to_string(pages[i + 1])
                text = text.replace("SCHEDULE 0", "SCHEDULE O")  # fix parsing typo
                text = text.replace("ScheduleO", "SCHEDULE O")  # fix parsing typo

                # both schedule L and O are mentioned on each relevant page because they are reliant on each other
                if ("schedule l" in text.lower()) and ("schedule o" in text.lower()):
                    schedule_l["pages"].append(f"{i}-{i + 1}")
                    schedule_l["text"].append(text)
                    print("Relevant page identified and parsed")
                    matches += 1
            # once we find both the schedule L page and the schedule O page we break
            if matches > 1:
                break

        with open(f"pdf990_{file}.json", "w") as f:
            json.dump(schedule_l, f)

    elif file.endswith(".xml"):  # post 2013 format
        with open(os.path.join("990", file), "r", encoding="utf-8") as f:
            my_xml = f.read()

        # Use xmltodict to parse and convert the XML document
        data = xmltodict.parse(my_xml)["Return"]
        ret = data["ReturnData"]
        year = data["ReturnHeader"].get("TaxPeriodEndDt") or data["ReturnHeader"].get(
            "TaxPeriodEndDate"
        )
        print(year)

        L = get_schedule_l(ret)
        if len(L):
            conflictsOfInterest += L


# %% save 990 data
def rename_keys(d, rename_map):
    return {rename_map.get(k, k): v for k, v in d.items()}


coi = pd.DataFrame(conflictsOfInterest)
coi.loc[coi["NameOfInterested"] == "LAKE CAPITAL", "NameOfInterested"] = (
    "LAKE CAPITAL PARTNERS"
)
coi["NameOfInterested"] = coi["NameOfInterested"].str.replace("THE ", "")
coi["TransactionAmt"] = coi["TransactionAmt"].fillna(0).astype(int)
coi["Year"] = pd.to_datetime(coi["Year"]).dt.year
coi = coi[coi["Endowment"] == True]
coi = (
    coi.groupby(["NameOfInterested", "Year"])
    .agg(
        {
            "TransactionAmt": "sum",
            "NameOfInterested": "first",
            "Year": "first",
            "RelationshipDescriptionTxt": "first",
        }
    )
    .reset_index(drop=True)
)

# NOTE: trian fund management no longer exists, may be accessible via LSEG
preqin = pd.read_excel("Preqin UChicago.xlsx")
preqin["firm_name"] = preqin["firm_name"].str.upper().str.replace("THE ", "")
# idk how to handle overlapping industries so let's just take the first of each
preqin["industry"] = preqin["industry"].str.split(";")

# get 5 largest funds per firm
top5 = (
    preqin.sort_values(["firm_id", "final_size_usd"], ascending=False)
    .groupby("firm_id")
    .head(5)
)
top5["most_recent_size_millions"] = top5[
    "final_size_usd"
]  # cite: provided data dictionary
# cannot fill in portfolio companies from pitchbook because private equity does not report portfolio
# TODO: some of their own websites do provide specific information: check usage guidelines
coi24 = coi[coi["Year"] == 2024].merge(
    top5,
    left_on="NameOfInterested",
    right_on="firm_name",
)
coi24["region"] = [
    row["fund_focus"] if not isinstance(row["region"], str) else row["region"]
    for _, row in coi24.iterrows()
]
coi24["industry"] = [", ".join(x) for x in coi24["industry"]]
coi24["region"] = coi24["region"].str.replace(";", ", ")
coi.to_csv("conflicts-of-interest.csv", index=False)

coi24[
    [
        "firm_name",
        "fund_name",
        "industry",
        "region",
    ]
].to_json(
    "../endowment-breakdown/data/conflicts-of-interest-2024.json", orient="records"
)
