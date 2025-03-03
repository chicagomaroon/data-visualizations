# DO NOT RUN IN IPYTHON KERNEL OR ELSE THE SCRAPE WILL NOT WORK
from __future__ import annotations

import re
import sys

import pandas as pd
from scraper import Scraper


def main():

    if sys.argv[0] == 'rerun':
        scraper = Scraper(
            input_data=pd.read_excel('scrape-2025-02-27.xlsx', index_col=None),
            chunks=True,
        )
    elif not len(sys.argv):
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

        scraper = Scraper(
            input_data=data.reset_index(),
            chunks=True,
        )
    else:
        return 'Invalid input, try again'

    scraper.process_all()

# %% main


if __name__ == '__main__':
    main()
