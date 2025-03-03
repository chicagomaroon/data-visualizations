# DO NOT RUN IN IPYTHON KERNEL OR ELSE THE SCRAPE WILL NOT WORK
from __future__ import annotations

import re
import sys

import pandas as pd
from scraper import Scraper


def main():

    if sys.argv[0] == 'rerun':
        data = pd.read_excel('scrape-2025-02-27.xlsx', index_col=None)
        scraper = Scraper(
            input_data=data,
            chunks=True,
        )
    elif len(sys.argv) == 1:
        data = pd.read_csv('data.csv')

        # get only rows of interest
        letter_action = [
            bool(re.match('Letter Writing', x)) if isinstance(
                x, str,
            ) else False for x in data['Type of Action']
        ]
        public_response = [
            bool(re.match('Letter Writing|Debate|Interview', x)) if isinstance(
                x, str,
            ) else False for x in data['Admin Response']
        ]
        data = data[letter_action or public_response]
        data = data.reset_index()

        scraper = Scraper(
            input_data=data,
            chunks=True,
        )
    else:
        print('Invalid input, try again')
        return

    print(f"Initialized scraper with data\n{data}")
    scraper.process_all()

# %% main


if __name__ == '__main__':
    main()
