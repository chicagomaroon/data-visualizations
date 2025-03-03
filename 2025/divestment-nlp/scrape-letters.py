# DO NOT RUN IN IPYTHON KERNEL OR ELSE THE SCRAPE WILL NOT WORK
from __future__ import annotations

import re
import sys

import pandas as pd
from scraper import Scraper


def main():

    if 'test_archive' in sys.argv:
        test_archive = True
    else:
        test_archive = False

    if sys.argv[0] == 'rerun':
        data = pd.read_excel('scrape-2025-03-02.xlsx', index_col=None)
        scraper = Scraper(
            input_data=data,
            chunks=True,
            test_archive=test_archive,
        )
    elif len([x for x in sys.argv if x!='test_archive'])==1:
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
            test_archive=test_archive,
        )
    else:
        print('Invalid input, try again')
        return

    print(f"Initialized scraper with data\n{data.head()}")
    scraper.process_all()

# %% main


if __name__ == '__main__':
    main()
