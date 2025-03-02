# DO NOT RUN IN IPYTHON KERNEL OR ELSE THE SCRAPE WILL NOT WORK
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

    def __init__(self, input_data):
        self.input_data = input_data
        self.input_data['Processed'] = False
        self.links = []
        self.chunks = []

    def process_site(self, site):
        r = requests.get(site)
        soup = bs(r.content, 'html.parser')
        try:
            story = soup.select('.sno-story-container')[0]
        except IndexError as e:
            print(f"Using fallback for story {site}: {e}")
            story = soup.select('#sno-main-content')[0]
        tags = story.find_all()
        return story.get_text(), tags

    def process_archive(self, site):
        """

        Sources:
        https://stackoverflow.com/questions/8049520/how-can-i-scrape-a-page-with-dynamic-content-created-by-javascript-in-python
        https://stackoverflow.com/questions/78023508/python-request-html-is-not-downloading-chromium
        https://stackoverflow.com/questions/59665773/why-render-requests-html-doesnt-scrape-dynamic-content
        https://stackoverflow.com/questions/71296581/python-beautifulsoup-get-texts-before-a-certain-tag
        https://stackoverflow.com/questions/37158246/how-to-download-images-from-beautifulsoup
        https://stackoverflow.com/questions/44057140/loading-image-from-webpage-link-directly-into-numpy-array-python
        https://stackoverflow.com/questions/43403086/opening-image-file-from-url-with-pil-for-text-recognition-with-pytesseract
        """

        session = HTMLSession()
        r = session.get(site)  # bs can't get js content
        try:
            r.html.render(sleep=10)
        except RuntimeError as e:
            print(
                f"Did you forget to run this from the command line? Need more sleep for {site}: {e}",
            )
            return
        soup = bs(r.html.html, 'html.parser')
        highlights = soup.find_all('div', class_='BookReaderSearchHilite')
        session.close()

        if not len(highlights):
            print(len(soup))
        else:
            try:
                output = ''
                # print(soup)
                # print(soup.find('div', id_='BookReader'))
                for highlight in highlights:
                    print(highlight)
                    page = highlight.previous_sibling
                    print(page['src'])
                    img = requests.get(page['src'])
                    image = Image.open(BytesIO(img.content))
                    # print(image)
                    text = pytesseract.image_to_string(image)
                    # print('\n'.join(text.split('\n')[:5]))
                    print(f"Length of highlight: {len(text)}")
                    output += text
                return output
            except Exception as e:
                print(e)

    def get_bboxes(self, img):
        """

        Sources: https://stackoverflow.com/questions/21104664/extract-all-bounding-boxes-using-opencv-python
        """

        im = cv2.imread(img)
        gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
        contours, hierarchy = cv2.findContours(
            gray, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE,
        )[-2:]

    def process_all(self):
        for i, row in self.df.iterrows():
            if row['Processed']:
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
                chunks = self.process_archive(site)

            else:  # for modern pieces, they mostly follow the same format
                chunks = self.process_site(site)

            # mark as done if processed successfully
            self.chunks.append(chunks)
            row['Processed'] = True

        today = re.sub('[^0-9\\-]', '', str(date.today()))
        print('Done scraping!')
        try:
            self.df.to_excel(f'scrape-{today}.xlsx', index=False)
        except Exception as e:
            with open(f'log-{today}.txt', 'w', encoding='utf-8') as f:
                f.write('\n\n\n'.join(self.df['Text'].values))
            print(e)


def main():

    if sys.argv[0] == 'rerun':
        scraper = Scraper(
            input_data=pd.read_excel('scrape-2025-02-27.xlsx', index_col=None),
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

        scraper = Scraper(input_data=data.reset_index())
    else:
        return 'Invalid input, try again'

    scraper.process_all()

# %% main


if __name__ == '__main__':
    main()
