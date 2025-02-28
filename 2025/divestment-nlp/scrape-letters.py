#%% import

import requests
import pandas as pd
from bs4 import BeautifulSoup as bs
from requests_html import HTMLSession
from io import BytesIO
import pytesseract
from PIL import Image
from datetime import date
import re

#%% load data

# initial run
# df = pd.read_csv('data.csv')
# df['Text']=''

# rerun
df = pd.read_excel('scrape-2025-02-18233423173226.xlsx')

#%% functions

# otherwise pytesseract doesn't work
pytesseract.pytesseract.tesseract_cmd = r'C:\Users\notka\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'

def main():
    for i,site in enumerate(df['Link']):
        # had to run several times to fill in all rows
        if not isinstance(df.at[i,'Text'],float) and len(df.at[i,'Text'])>2:
            continue
        if isinstance(df.at[i,'Link'],float) or ('uchicagogate' in df.at[i,'Link']) or ('http' not in df.at[i,'Link']):
            continue

        # if i<45:
        #     continue

        print(f"Scraping: {site}--------------------------------------")
        if 'campub' in site: # for archive pieces, read text from images
            # https://stackoverflow.com/questions/8049520/how-can-i-scrape-a-page-with-dynamic-content-created-by-javascript-in-python
            # https://stackoverflow.com/questions/78023508/python-request-html-is-not-downloading-chromium
            session = HTMLSession()
            r = session.get(site) # bs can't get js content
            # https://stackoverflow.com/questions/59665773/why-render-requests-html-doesnt-scrape-dynamic-content
            r.html.render(sleep=10)
            soup = bs(r.html.html, "html.parser")
            highlights = soup.find_all('div', class_='BookReaderSearchHilite')
            session.close()

            if not len(highlights):
                print(len(soup))
            else:
                try:
                    # print(soup)
                    # print(soup.find('div', id_='BookReader'))
                    # https://stackoverflow.com/questions/71296581/python-beautifulsoup-get-texts-before-a-certain-tag
                    for highlight in highlights:
                        print(highlight)
                        page = highlight.previous_sibling
                        # https://stackoverflow.com/questions/37158246/how-to-download-images-from-beautifulsoup
                        print(page['src'])
                        img = requests.get(page['src'])
                        # https://stackoverflow.com/questions/44057140/loading-image-from-webpage-link-directly-into-numpy-array-python
                        # https://stackoverflow.com/questions/43403086/opening-image-file-from-url-with-pil-for-text-recognition-with-pytesseract
                        image = Image.open(BytesIO(img.content))
                        # print(image)
                        text = pytesseract.image_to_string(image)
                        # print('\n'.join(text.split('\n')[:5]))
                        print(len(text))
                        df.loc[i,'Text']=str(df.loc[i,'Text'])+text
                except Exception as e:
                    print(e)

        else: # for modern pieces, they mostly follow the same format
            r = requests.get(site)
            soup = bs(r.content, 'html.parser')
            try:
                story = soup.select('.sno-story-container')[0]
            except IndexError as e:
                print(f"Using fallback for story {site}: {e}")
                story = soup.select('#sno-main-content')[0]
            df.loc[i,'Text']=story.get_text()

    today = re.sub('[^0-9\\-]','',str(date.today()))
    print('Done scraping!')
    try:
        df.to_excel(f'scrape-{today}.xlsx',index=False)
    except Exception as e:
        with open(f'log-{today}.txt', 'w', encoding='utf-8') as f:
            f.write('\n\n\n'.join(df['Text'].values))
        print(e)

#%% main

if __name__=="__main__":
    main()
