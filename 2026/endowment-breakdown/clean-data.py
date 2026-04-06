"""
- Use SEC API to download all UChicago SEC filings since 1994
- Use company-specific sites to identify holdings and sector information for each holding
- Compile financial statements
- Prepare data for each chart
"""

# %% imports

import json
import os
import re
import time
from datetime import datetime

import numpy as np
import pandas as pd
import polars as pl
import pytesseract
import xmltodict
import yfinance as yf
from edgar import Company, set_identity
from pdf2image import (
    convert_from_path,
)  # chose this because it is OCR-based and handles individual pages
from polars import ComputeError, Int64, ShapeError, String
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from titlecase import titlecase
from tqdm import tqdm
from yfinance.exceptions import YFRateLimitError

# NOTE: did not use 990T filings from IRS via ProPublica API because data is not very detailed projects.propublica.org/nonprofits/api/v2

# %% functions


def get_sec(email="YOUR_EMAIL@uchicago.edu", school_id="0000314957"):
    """
    Get all SEC 13-HR filings for the University of Chicago using edgartools Python package.

    cite: https://pypi.org/project/edgartools/
    alternative: https://github.com/zpetan/sec-13f-portfolio-python

    :param email: Email used to identify user requesting the files
    """
    # Tell the SEC who you are (required by SEC regulations)
    set_identity(email)

    # Find University of Chicago by its CIK number
    company = Company(school_id)

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


def split_from_right(line, cells=10):
    """
    Splits a line of raw text from a SEC 13-HR filing using whitespace as a delimiter, from right to left. Any remaining whitespace-delimited text on the left side is stored as a single cell once all cells to the right have been filled.

    :param line: String of raw text
    :param cells: Number of cells that should be in output
    """

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
    """
    Split a non-delimited line of raw text from right to left using regex to determine where data starts and ends in a SEC 13-HR file. Contains a dict of patterns that can be used to match particular columns that exist in particular time periods.

    :param line: String of raw text
    :param schema: Column names and types expected in output
    :param cls_pattern: Regex pattern used to differentiate data associated with the CLASS column from that associated with the ISSUER column
    """

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
    Use line of dashes ----- to indicate where headers end and data starts for a SEC 13-HR filing. Uses the regex approach to detect cells from right to left.

    Cite: Copilot

    :param table: Raw 13-HR file
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
    Use header string "SHARED NONE" to indicate end of headers and beginning of data for a SEC 13-HR filing. Uses the regex approach to detect cells from right to left.

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
    Use the header string "SHARED NONE" to locate end of headers and beginning of data for a SEC 13-HR filing. Uses the regex approach to detect cells from right to left.

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
    Parse a filing from the SEC 13-HR archives. Archives may be parsed in many different ways using the edgartools Python package, including full text or, if we're lucky, a machine-readable HTML file. Otherwise, we have to detect data from the non-delimited original full text.

    Cite: Copilot for some of the more complex logic

    :param investment: A file obtained from the SEC archives

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


def get_holdings(company, ticker, pages=51):
    """
    Scrape a company's website for the holdings in a specific portfolio. Only scrapes the top 51 pages, due to practical limitations such as rate limiting.

    NOTE: this is JUST for 1 quarter in 2025, for now

    :param company: Option to select one of two pre-defined companies, Vanguard or Ishare
    :param ticker: Three-to-four letter ticker for a portfolio
    :param pages: Number of pages to scrape
    """

    # define options
    sites = {
        "vanguard": f"https://investor.vanguard.com/investment-products/etfs/profile/{ticker.lower()}#portfolio-composition",
        "ishares": f"https://www.ishares.com/us/products/239726/{ticker.lower()}",
    }
    tabs = {
        "vanguard": "Portfolio composition",
        "ishares": "Holdings",
    }
    headings = {"vanguard": "Holding details", "ishares": "Holdings"}
    headings_types = {"vanguard": "h5", "ishares": "h2"}

    # open a browser, in this case Firefox but you can change to your browser
    driver = webdriver.Firefox()

    driver.get(sites[company])

    # zoom so that we can get the relevant parts of the page in view
    driver.execute_script("document.body.style.zoom='15%'")
    driver.maximize_window()

    # skip to the relevant part of the page
    elem = driver.find_element(By.XPATH, f"//*[text()='{tabs[company]}']")
    elem.send_keys(Keys.RETURN)

    # zoom again
    driver.execute_script("document.body.style.zoom='15%'")

    data = []
    for i in tqdm(range(pages)):
        time.sleep(1)  # wait for the page to load

        # turn the page
        try:
            turn_page = driver.find_element(By.TAG_NAME, "select")

            # Select the nth option (e.g., 3rd option, index starts at 0)
            Select(turn_page).select_by_index(i)  # 2 for the 3rd option
        except Exception as e:
            turn_page = driver.find_element(By.CSS_SELECTOR, "#allHoldingsTable_next")
            turn_page.send_keys(Keys.RETURN)
            print(f"Error: {e}")

        # get the table info
        try:
            # Find the first <h*> with text "Holding details"
            h_elem = driver.find_element(
                By.XPATH,
                f"//{headings_types[company]}[contains(text(), '{headings[company]}')]",
            )

            # Find the first <div> following this <h5>
            div_elem = h_elem.find_element(By.XPATH, "following-sibling::div[1]")

            # Find the table within the div element
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
    """
    Once you have the raw data scraped from a website, process it into a data frame, similar to how SEC 13-HR data is processed.

    :param data: A list of table rows
    :param company: A company from a pre-defined list, Vanguard or Ishares
    :param ticker: A three-to-four letter ticker for a portfolio
    """

    percents_col = {
        "vanguard": r"(\d+\.\d+) %",
        "ishares": r" \d+\.\d\d ",
    }

    tickers = []
    percents = []
    companies = []
    for row in data:
        for cell in row:
            if "Ticker" not in cell:
                # extract ticker for a specific stock
                try:
                    ticker_i = re.search(r"^[A-Z\.\d]+", cell.strip("— "))[0]
                    tickers.append(ticker_i)
                except Exception as e:
                    print(f"Error parsing ticker: {cell} - {e}")
                    tickers.append(
                        cell
                    )  # add the whole thing so we can re-parse later if needed (avoid data loss)

                # extract percent makeup (of portfolio)
                percents.append(re.search(percents_col[company], cell)[0].strip(" %"))

                # TODO: some company names are being extracted incorrectly
                # extract company name
                try:
                    companies.append(
                        re.sub(r"\d{5,}.*", "", cell).strip(ticker_i).strip()
                    )
                except Exception as e:
                    print(f"Error parsing company: {cell} - {e}")
                    companies.append(
                        cell
                    )  # add the whole thing so we can re-parse later if needed (avoid data loss)

    # combine all extracted columns
    df = pd.DataFrame({"ticker": tickers, "percent": percents, "company": companies})

    # calculate how much UChicago invested in each individual holding as a function of percent of a known invested portfolio stock
    # eg, we know UChicago invested $X in VOO; if APPL is .1% of VOO, then how many dollars is UChicago invested in APPL?
    uc_invested_thousands = (
        sec.sort_values("Date", ascending=False)
        .loc[(sec["Ticker"] == ticker), "ValueThousands"]
        .values[0]
    )
    df["ValueThousands"] = df["percent"].astype(float) / 100 * uc_invested_thousands

    # save output and date of scrape
    if not os.path.exists("third-party"):
        os.mkdir("third-party")
    df.to_csv(
        f"third-party/holdings-{ticker}-{datetime.today().date()}.csv", index=False
    )


def clean_names(x):
    x = str(x)
    x = x.replace(" Inc.", "")
    x = x.replace(" Co.", "")
    x = x.replace(" Corp.", "")
    x = x.replace(" Ltd.", "")
    return x


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


# %% get and parse SEC filings

if not os.path.exists("data"):
    os.mkdir("data")

if not os.path.exists("data/13F-HR.csv"):
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

# %% read in downloaded SEC data

sec = pd.read_csv("13F-HR.csv")

# clean data after reading using pandas
sec["Date"] = pd.to_datetime(sec["Date"])
sec["Year"] = sec["Date"].dt.year
sec["Issuer"] = sec["Issuer"].str.title()

sec.groupby("Year")["ValueThousands"].sum() / 1000

# %% scrape holdings of index funds identified in 9/30/25 13-HR filing
# Invisible Institute advised that this is okay to do

# scrape Vanguard website
for hold in [
    "VT",
    "VOO",
]:
    if os.path.exists(f"third-party/holdings-{hold}.csv"):
        print("File for", hold, "already exists")
        continue

    data = get_holdings(
        company="vanguard",
        ticker=hold,
    )
    process_holdings(data, company="vanguard", ticker=hold)

# scrape Ishares website
for hold in [
    "IVV",
]:
    if os.path.exists(f"third-party/holdings-{hold}.csv"):
        print("File for", hold, "already exists")
        continue

    data = get_holdings(
        company="ishares",
        ticker=hold,
    )
    process_holdings(data, company="ishares", ticker=hold)


# %% read in scraped index funds holdings data and combine with SEC data


voo = pd.read_csv("third-party/holdings-VOO.csv")
voo["source"] = "VOO"
vt = pd.read_csv("third-party/holdings-VT.csv")
vt["source"] = "VT"
ivv = pd.read_csv("third-party/holdings-IVV.csv")
ivv["source"] = "IVV"

all_holdings = (
    pd.concat([voo, vt, ivv])
    .rename(
        columns={
            "company": "Issuer",
            "ticker": "Ticker",
        }
    )
    .drop_duplicates()
    .reset_index(drop=True)
)
print("Percent from each index fund:", all_holdings.groupby("source")["percent"].sum())

# get all holdings from most recent quarter including generic index funds
sec_0925 = sec[
    # take the most recent filing, idk how to aggregate over time as idk if new or total holdings
    sec["Date"] == datetime(2025, 9, 30)
]
print("Rows before combining:", len(sec_0925))

# bind with third-party website data
sec_0925 = pd.concat(
    [
        # excluding generic index funds VOO/VT/IVV
        sec_0925[~sec_0925["Ticker"].isin(all_holdings["source"].unique())],
        # add in specific holdings for VOO/VT funds
        all_holdings,
    ],
    axis=0,
    ignore_index=True,
)
sec_0925["Issuer"] = sec_0925["Issuer"].str.replace(" Inc.", "")

# there are overlapping stocks across funds, so group and sum
sec_0925 = (
    sec_0925.groupby(["Ticker"])
    .agg(
        {
            # not using lagged purchase value because this is a snapshot
            "ValueThousands": "sum",
            "Issuer": "first",
        }
    )
    .reset_index()
)[["Issuer", "Ticker", "ValueThousands"]]
print("Rows after combining:", len(sec_0925))

# %% read sector data from yahoo finance

# read previous results if exists to avoid having to re-scrape data
if os.path.exists("sec-industries.csv"):
    print("Using existing sectors file")
    sec_0925 = pd.read_csv("sec-industries.csv")

if "Industry" not in sec_0925.columns:
    sec_0925["Industry"] = None
if "Sector" not in sec_0925.columns:
    sec_0925["Sector"] = None
if "Summary" not in sec_0925.columns:
    sec_0925["Summary"] = None

tickers = sec_0925["Ticker"]
for ticker in sorted(list(set(tickers.unique()) - set([None, np.nan]))):
    try:
        # note that we use the NA string to indicate missing data so that we don't try to re-fetch
        if sec_0925.loc[tickers == ticker, "Industry"].notna().values[0]:
            print("Skipping", ticker, "existing info")
            continue

        if len(yf.Ticker(ticker).info.keys()) < 2:
            sec_0925.loc[tickers == ticker, "Industry"] = "missing"
            sec_0925.loc[tickers == ticker, "Sector"] = "missing"
            sec_0925.loc[tickers == ticker, "Summary"] = "missing"
            continue

        print("Getting info for", ticker)
        sec_0925.loc[tickers == ticker, "Industry"] = yf.Ticker(ticker).info.get(
            "industry", "missing"
        )
        sec_0925.loc[tickers == ticker, "Sector"] = yf.Ticker(ticker).info.get(
            "sector", "missing"
        )
        sec_0925.loc[tickers == ticker, "Summary"] = yf.Ticker(ticker).info.get(
            "longBusinessSummary", "missing"
        )
    except YFRateLimitError as e:
        print("Try again in 2 minutes: ", e)
        sec_0925.to_csv("sec-industries.csv", index=None)
        break


print("Rows:", len(sec_0925))
print("Columns:", sec_0925.columns)
print("Missing:", sec_0925.Industry.isna().sum())

sec_0925.to_csv("sec-industries.csv", index=None)

# %% circle chart: analyze by sector

sec_0925 = pd.read_csv("sec-industries.csv")
sec_0925["Sector"] = sec_0925["Sector"].str.capitalize()

# clean data
sec_0925 = sec_0925.replace("missing", None)  # recode missings
sec_0925["ValueDollars"] = (sec_0925["ValueThousands"] * 1000).apply(
    format_amount
)  # create column to be used for individual company info
sec_0925["Issuer"] = (
    sec_0925["Issuer"].fillna("").apply(titlecase).str.replace(" +", " ", regex=True)
)

# fill in some incorrectly read companies
sec_0925.loc[sec_0925["Ticker"] == "SHW", "Issuer"] = "Sherwin-Williams Co."
sec_0925.loc[sec_0925["Ticker"] == "FCX", "Issuer"] = "Freeport-McMoRan Inc."
sec_0925.loc[sec_0925["Ticker"] == "KO", "Issuer"] = "Coca-Cola Co."

# check: if this percentage is high, did you run the previous section until you reached tickers starting with Z?
print(
    round(
        sec_0925.loc[sec_0925.Sector.isna()].ValueThousands.sum()
        / sec_0925.ValueThousands.sum()
        * 100
    ),
    "% of holdings (in terms of dollar amount) have no sector info",
)

# summarize the top 5 stocks per sector
summary_df = (
    sec_0925[sec_0925["Sector"] != "Missing"]
    .dropna(how="any")
    .sort_values("ValueThousands", ascending=False)  # biggest stocks are listed first
    .groupby("Sector")
    .agg(
        {
            "ValueThousands": lambda x: round(
                sum(x)
            ),  # round to the nearest thousand dollars (to indicate uncertainty)
            "ValueDollars": lambda x: [f"${i}" for i in x[:5]],  # top 5 stocks
            "Issuer": lambda x: list(x)[:5],  # top 5 stocks
        }
    )
    .reset_index()
    .sort_values("ValueThousands", ascending=False)
)

# add top 5 companies per sector for hover info
summary_df["Top5"] = [
    list(zip(row["Issuer"], row["ValueDollars"])) for _, row in summary_df.iterrows()
]
# format as Company: $X
summary_df["Top5"] = [
    [f"    {i[1]} in {i[0]}    " for i in x] for x in summary_df["Top5"]
]
# flatten list so that each company is on its own line
summary_df["Top5"] = ["<br>".join(x) for x in summary_df["Top5"]]

# add line breaks
summary_df["Sector"] = summary_df["Sector"].str.replace(" ", "<br>")

# inspect
for _, row in summary_df.iterrows():
    print(
        row["Sector"],
        ":",
        row["ValueThousands"],
        "\n",
        row["Top5"].replace("<br>", "\n"),
    )

# save out to final export location
summary_df[["Sector", "ValueThousands", "Top5"]].rename(
    columns={
        "Sector": "sector",
        "Top5": "hoverinfo",
        "ValueThousands": "amount_thousands",
    }
).to_json("data/sec-sectors-2025.json", orient="records")

# %% get parsed financial statements
# manual copying was easier than camelot parsing

fs = pd.read_csv("financial-statements.csv")

# categorize types into broader categories for easier comprehension
type_dict = {
    "Domestic": "Public equities (stocks)",
    "International": "Public equities (stocks)",
    # "Stocks": "Public equities (stocks)",  # TODO: actually this comprises public and private so maybe exclude pre 2000
    "Global public equities": "Public equities (stocks)",
    "International public equities": "Public equities (stocks)",
    "Domestic public equities": "Public equities (stocks)",
    "High yield": "Bonds",
    "High yield bonds": "Bonds",
    "Cash equivalent": "Bonds",
    "Cash equivalents": "Other",
    "Fixed income": "Bonds",
    "Absolute return": "Hedge funds",  # hedge funds may be public or private
    "Equity oriented": "Hedge funds",  # hedge funds may be public or private
    "Diversifying": "Hedge funds",  # hedge funds may be public or private
    "Private equity": "Private equities",
    # for now, to simplify graph, class most as other
    "Assets held by trustee": "Other",
    "Funds in trust": "Other",
    "Natural resources": "Private equities",
    "Private debt": "Private equities",
    "Real assets": "Private equities",
    "Real estate": "Private equities",
    "Receivable for investments sold": "Other",  # TODO: how to categorize
}

# clean data
fs["fund_type"] = fs["type"]
fs["recategorized"] = fs["fund_type"].replace(type_dict).str.replace(" ", "<br>")
fs["percent"] = fs["amount_thousands"] / fs["total_thousands"]
fs["label"] = [
    f"{x['fund_type']} ({round(x['percent'] * 100)}%)" for _, x in fs.iterrows()
]

# %% donut chart: get 2025 data

data2025 = fs[fs["year"] == 2025].sort_values("percent", ascending=True)

data2025[
    [
        "fund_type",
        "recategorized",
        "amount_thousands",
    ]
].to_json(
    "data/financial-statement-2025.json",
    orient="records",
    lines=False,
)

# %% lollipop chart: get 2005 and 2025 data only

# consolidate recategorized groups by year
lolli = (
    fs.groupby(["year", "recategorized"])
    .agg(
        {
            "percent": lambda x: x.sum().round(3),
            "fund_type": "first",
            "amount_thousands": "sum",
        }
    )
    .reset_index()
)

lolli = lolli[lolli["year"].isin([2005, 2025])].pivot(
    index="recategorized", columns="year", values=["percent"]
)

lolli.columns = lolli.columns.droplevel(0)

lolli["difference"] = lolli[2025] - lolli[2005]

lolli.sort_values(2025, ascending=True).reset_index().to_json(
    "data/types-over-time.json",
    orient="records",
    lines=False,
)

# %% parse 990 data

conflictsOfInterest = []
# TODO: still dont have pre 2013 non xml data, which for now is only 2009 so I left it off
# TODO: 2010 is partly missing: schedule L is required but data cuts off at schedule I
# TODO: when did schedule L get invented - I don't see any data before 2009 or in 2010

schedule_l = {}
for file in os.listdir("../endowment-sec/990"):
    if file.endswith(".pdf") and (
        "T" not in file
    ):  # pre 2013 format for 990s, not 990-Ts
        pages = convert_from_path(os.path.join("../endowment-sec/990", file))
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

coi = pd.DataFrame(conflictsOfInterest)
coi.to_csv("conflicts-of-interest.csv", index=False)

# %% flowchart and facet chart: get 990 conflict of interest data

coi = pd.read_csv("conflicts-of-interest.csv")

# filter to only endowment-related conflicts
coi["Endowment"] = coi["RelationshipDescriptionTxt"].str.contains(
    "university's investment", case=False, na=False
)
coi = coi[coi["Endowment"] == True]

# clean data
coi.loc[coi["NameOfInterested"] == "LAKE CAPITAL", "NameOfInterested"] = (
    "LAKE CAPITAL PARTNERS"
)
coi["NameOfInterested"] = (
    coi["NameOfInterested"]
    .str.title()
    .str.strip()
    .str.replace("The ", "")
    .str.replace(" Plc", "")
    .str.replace("Pimco", "Pacific Investment<br>Management Company")
)

# extract transaction amount from description text
coi["TransactionDollars"] = coi["RelationshipDescriptionTxt"].str.extract(
    r"\$ ?([\d,]+)"
)
coi["TransactionDollars"] = (
    coi["TransactionDollars"].str.replace(",", "").fillna(-99).astype(int)
)

# extract trustee name from description text
coi["Person"] = coi["RelationshipDescriptionTxt"].str.extract(r"^([A-Z\. ]+),")
coi["Person"] = (
    coi["Person"].str.title().str.replace(r".\. ", "", regex=True)
)  # remove initials and format title case

# extract relationship from description text
coi["Relationship"] = coi["RelationshipDescriptionTxt"].str.extract(
    r"IS ([A-Z\-, ]+) OF [A-Z\-\. ]+, "
)
coi["Relationship"] = (
    coi["Relationship"]
    .str.replace("A ", "")
    .str.replace("THE ", "")
    .str.lower()
    .str.replace("ceo", "chief executive officer")
)
coi["Relationship"] = coi.groupby("NameOfInterested")["Relationship"].transform("last")

coi["TotalTransactionDollars"] = (
    coi.groupby("NameOfInterested")["TransactionDollars"]
    .transform("sum")
    .round(0)
    .astype(int)
)

coi.sort_values("TotalTransactionDollars")[
    ["NameOfInterested", "Year", "Person", "Relationship", "TransactionDollars"]
].to_json("data/conflicts-of-interest.json", orient="records")

coi
