# Purpose: Scrape text from Maroon archives hosted at UChicago Libraries
# Author: Karen Yi
# Date: 03-02-2025
from __future__ import annotations

from datetime import date
from io import BytesIO

import cv2
import numpy as np
import pytesseract
import requests
from bs4 import BeautifulSoup as bs
from PIL import Image
from tesserocr import PyTessBaseAPI, RIL, iterate_level, PSM
from requests_html import HTMLSession

# otherwise pytesseract doesn't work
pytesseract.pytesseract.tesseract_cmd = r'C:\Users\notka\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'


class ScraperError(Exception):
    """
    In cases that will affect all rows, stop the script

    Sources:
    https://stackoverflow.com/questions/1319615/proper-way-to-declare-custom-exceptions-in-modern-python
    """
    pass


class Scraper:

    def __init__(self, input_data, chunks=False, test_archive=False):
        """
        Create a Scraper object and decide if we are outputting just the full text or chunks
        Chunks are useful for further text analysis within documents
        """

        if 'Link' not in input_data.columns:
            print(
                f"Please ensure your input file has a column named Link. None found in {input_data.columns}",
            )
            raise Exception

        self.input_data = input_data
        self.input_data['Text'] = None
        self.test_archive = test_archive
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
        tags = story.find_all('p')

        if self.output_format == 'chunks':
            return [tag.get_text() for tag in tags]
        else:
            return story.get_text()

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
            print(f"No highlights found on page. Length of soup {len(soup)}")
            return

        output = []

        # print(soup)
        # print(soup.find('div', id_='BookReader'))
        for highlight in highlights:
            try:
                print(highlight)
                page = highlight.previous_sibling
                print(f"Found image: {page['src']}")
            except KeyError as e:
                print(f"Previous sibling is also highlight: {page}\n{e}")
                continue
            
            img = requests.get(page['src']).content
            img_bytes = BytesIO(img)
            jpg = Image.open(img_bytes)
            # jpg = Image.open('test.jpg')

            # print(img)

            if self.output_format == 'chunks':
                output += self.get_bboxes(jpg)
            else:
                output += [self.get_all_text(jpg)]

        print(f"Output created with size: {len(output)}")

        return [x for x in output if len(x)>10]

    def get_all_text(self, jpg):
        """
        OCR all text from the image of the page using PyTesseract

        Sources:
        https://stackoverflow.com/questions/43403086/opening-image-file-from-url-with-pil-for-text-recognition-with-pytesseract
        """

        try:
            text = pytesseract.image_to_string(jpg)
        except Exception as e:
            raise ScraperError(e)
        # print('\n'.join(text.split('\n')[:5]))
        if len(text)<50:
            return ''
        print(f"Length of extracted text: {len(text)}")
        return text

    def crop_image(image, bbox):
        """
        Crop the image to the specified bounding box.

        Parameters:
        image (PIL.Image): The image to crop.
        bbox (list): The bounding box coordinates [(x1, y1), (x2, y2), (x3, y3), (x4, y4)].

        Returns:
        PIL.Image: The cropped image.

        Source: GitHub Copilot
        """
        # Convert bounding box coordinates to integers
        bbox = [(int(x), int(y)) for x, y in bbox]

        # Determine the minimum and maximum x and y coordinates
        min_x = min(x for x, _ in bbox)
        max_x = max(x for x, _ in bbox)
        min_y = min(y for _, y in bbox)
        max_y = max(y for _, y in bbox)

        # Crop the image using the bounding box coordinates
        cropped_image = image.crop((min_x, min_y, max_x, max_y))

        return cropped_image

    def find_centroid(self, bbox):
        """
        Find the centroid of the bounding box.

        Parameters:
        bbox (list): The bounding box coordinates [(x1, y1), (x2, y2), (x3, y3), (x4, y4)].

        Returns:
        tuple: The centroid coordinates (cx, cy).

        Source: GitHub Copilot
        """
        x_coords = [x for x, _ in bbox]
        y_coords = [y for _, y in bbox]
        cx = sum(x_coords) / len(x_coords)
        cy = sum(y_coords) / len(y_coords)
        return (cx, cy)

    def get_bboxes(self, jpg):
        """
        Chunks image using bounding boxes from tesseract OCR
        Get text within each chunk by calling get_all_text()

        Sources:
        https://stackoverflow.com/questions/28591117/how-do-i-segment-a-document-using-tesseract-then-output-the-resulting-bounding-b
        """

        chunks = []
        try:
            with PyTessBaseAPI(path='C:/Program Files (x86)/Tesseract-OCR/tessdata') as api:
                api.SetImage(jpg)
                api.SetPageSegMode(PSM.AUTO_ONLY)
                iterator = api.AnalyseLayout()
                for w in iterate_level(iterator, RIL.BLOCK):
                    if w is not None and w.BlockType:
                        bbox = w.BlockPolygon()
                        text = self.get_all_text(
                                self.crop_image(jpg, bbox),
                                )
                        chunks.append(
                            str(self.find_centroid(bbox)) + text,
                        )
        except Exception as e:
            print(f"Could not decode image with data {jpg}")
            raise ScraperError(e)

        return chunks

    def export_results(self):
        """
        Export final results to an Excel and uses log file as fallback (in case of mismatched row numbers or bad characters)
        """

        # expand the column of lists so that there is 1 row per chunk
        self.input_data = self.input_data.explode('Text')

        try:
            self.input_data.to_excel(
                f'scrape-{str(date.today())}.xlsx', index=False,
            )
        except Exception as e:
            with open(f'log-{str(date.today())}.txt', 'w', encoding='utf-8') as f:
                f.write('\n\n\n'.join(self.input_data['Text'].apply(str).values))
            print(e)

    def process_all(self):
        """
        Loop through all the URLs listed in the input file
        """

        for i, row in self.input_data.iterrows():
            site = row['Link']

            if row['Text']:
                # skip if there is information in the row already (if rerun)
                continue
            if isinstance(site, float) or ('uchicagogate' in site) or ('http' not in site):
                # skip if invalid link
                continue
            if self.test_archive and (not 'campub' in site or self.input_data['Text'].apply(str).nunique()>1):
                continue

            print(f"Scraping site ({i}/{len(self.input_data)}): {site} -----")
            if 'campub' in site:  # for archive pieces, read text from images
                try:
                    self.input_data.at[i,'Text'] = self.process_archive(site)
                except ScraperError as e:
                    self.export_results()
                    raise e
                except Exception as e:
                    print(e)
                    continue

            else:  # for modern pieces, they mostly follow the same format
                try:
                    self.input_data.at[i,'Text'] = self.process_site(site)
                except ScraperError as e:
                    self.export_results()
                    raise e
                except Exception as e:
                    print(e)
                    continue

            if self.input_data.at[i,'Text'] is not None:
                print(f"This row now has content of length: {len(self.input_data.at[i,'Text'])}")

        print('Done scraping!')
        self.export_results()
