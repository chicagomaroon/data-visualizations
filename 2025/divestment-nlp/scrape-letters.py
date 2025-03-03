# DO NOT RUN IN IPYTHON KERNEL OR ELSE THE SCRAPE WILL NOT WORK
# Purpose: Scrape text from Maroon archives hosted at UChicago Libraries
from __future__ import annotations

import re
import sys
from datetime import date
from io import BytesIO

import cv2
import pandas as pd
import pytesseract
import requests
from bs4 import BeautifulSoup as bs
from PIL import Image
from requests_html import HTMLSession

# otherwise pytesseract doesn't work
pytesseract.pytesseract.tesseract_cmd = r'C:\Users\notka\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'


class Scraper:

    def __init__(self, input_data, chunks=False):
        """
        Create a Scraper object and decide if we are outputting just the full text or chunks
        Chunks are useful for further text analysis within documents
        """

        if not input_data['Link']:
            print(
                f"Please ensure your input file has a column named Link. None found in {input_data.columns}",
            )
            raise Exception

        self.input_data = input_data
        self.input_data['Text'] = None
        if chunks:
            self.output_format = 'chunks'
        else:
            self.output_format = 'full_text'

    def process_site(self, site):
        """
        Extract the main content of a vanilla Maroon page, which currently runs on SNO Sites
        """

        r = requests.get(site)
        soup = bs(r.content, 'html.parser')
        try:
            story = soup.select('.sno-story-container')[0]
        except IndexError as e:
            print(f"Using fallback for story {site}: {e}")
            story = soup.select('#sno-main-content')[0]
        tags = story.find_all()
        return story.get_text(), tags

    def cook_soup(self, site):
        """
        beautifulsoup can't get rendered JS content, so we use HTMLSession to render for us

        Sources:
        https://stackoverflow.com/questions/8049520/how-can-i-scrape-a-page-with-dynamic-content-created-by-javascript-in-python
        https://stackoverflow.com/questions/78023508/python-request-html-is-not-downloading-chromium
        https://stackoverflow.com/questions/59665773/why-render-requests-html-doesnt-scrape-dynamic-content
        """

        session = HTMLSession()
        r = session.get(site)
        try:
            r.html.render(sleep=10)
        except RuntimeError as e:
            print(f"Did you forget to run this from the command line?\n{e}")
            raise e
        soup = bs(r.html.html, 'html.parser')
        session.close()
        return soup

    def process_archive(self, site):
        """
        Process an archive page, which uses BookReader to display scanned images of archival issues:
        https://openlibrary.org/dev/docs/bookreader

        TODO: ask librarians if there are easier ways to access text than scraping

        Params:
            site: (str) URL to a webpage to scrape
        Output:
            output: (list) Always in a list, even if containing only one item, to keep data types consistent while supporting the chunks output format

        Sources:
        https://stackoverflow.com/questions/71296581/python-beautifulsoup-get-texts-before-a-certain-tag
        https://stackoverflow.com/questions/37158246/how-to-download-images-from-beautifulsoup
        https://stackoverflow.com/questions/44057140/loading-image-from-webpage-link-directly-into-numpy-array-python
        """

        soup = self.cook_soup(site)
        highlights = soup.find_all('div', class_='BookReaderSearchHilite')

        if not len(highlights):
            print(
                f"No highlights found on page. The length of the soup is {len(soup)}",
            )
            return

        try:

            output = []

            # print(soup)
            # print(soup.find('div', id_='BookReader'))
            for highlight in highlights:
                print(highlight)
                page = highlight.previous_sibling
                print(f"Found image: {page['src']}")
                img_bytes = requests.get(page['src'])
                img = Image.open(BytesIO(img_bytes.content))
                # print(img)

                if self.output_format == 'chunks':
                    output += self.get_bboxes(img)
                else:
                    output += [self.get_all_text(img)]

            return output
        except Exception as e:
            print(e)

    def get_all_text(self, img):
        """
        OCR all text from the image of the page using PyTesseract

        Sources:
        https://stackoverflow.com/questions/43403086/opening-image-file-from-url-with-pil-for-text-recognition-with-pytesseract
        """

        text = pytesseract.image_to_string(img)
        # print('\n'.join(text.split('\n')[:5]))
        print(f"Length of extracted text: {len(text)}")
        return text

    def get_bboxes(self, img):
        """
        Chunks image using bounding boxes (a computer vision technique)
        Get text within each chunk by calling get_all_text()

        Sources:
        https://stackoverflow.com/questions/21104664/extract-all-bounding-boxes-using-opencv-python
        """

        cv2_img = cv2.imread(img)
        gray = cv2.cvtColor(cv2_img, cv2.COLOR_BGR2GRAY)
        contours, _ = cv2.findContours(
            gray, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE,
        )[-2:]

        chunks = []
        for i, contour in enumerate(contours):
            x, y, w, h = cv2.boundingRect(contour)
            chunk = cv2_img[y:y+h, x:x+w]
            chunks.append(self.get_all_text(chunk))

        # cv2.waitKey(0)
        return chunks

    def export_results(self):
        """
        Export final results to an Excel and uses log file as fallback (in case of mismatched row numbers or bad characters)
        """

        # expand the column of lists so that there is 1 row per chunk
        self.df = self.df.explode('Text')

        try:
            self.df.to_excel(f'scrape-{str(date.today())}.xlsx', index=False)
        except Exception as e:
            with open(f'log-{str(date.today())}.txt', 'w', encoding='utf-8') as f:
                f.write('\n\n\n'.join(self.df['Text'].values))
            print(e)

    def process_all(self):
        """
        Loop through all the URLs listed in the input file
        """

        for i, row in self.df.iterrows():
            if row['Text']:
                # skip if there is information in the row already (if rerun)
                continue
            site = row['Link']
            if isinstance(site, float) or ('uchicagogate' in site) or ('http' not in site):
                # skip if invalid link
                continue

            # if i<45:
            #     continue

            print(
                f"Scraping: {site} ({i}/{len(self.df)})----------------------",
            )
            if 'campub' in site:  # for archive pieces, read text from images
                row['Text'] = self.process_archive(site)

            else:  # for modern pieces, they mostly follow the same format
                row['Text'] = self.process_site(site)

        print('Done scraping!')
        self.export_results()


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
