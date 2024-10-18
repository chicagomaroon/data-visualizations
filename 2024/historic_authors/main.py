import os
import pypdf
import pdfplumber
import re

def extract_authors(pdf_path, preceding_words):
    authors = []
    
    # Extract text from first page using PyPDF2
    with open(pdf_path, 'rb') as file:
        reader = pypdf.PdfReader(file)
        first_page = reader.pages[0]
        text = first_page.extract_text()
    
    # If PyPDF2 fails, try pdfplumber
    if not text:
        with pdfplumber.open(pdf_path) as pdf:
            first_page = pdf.pages[0]
            text = first_page.extract_text()
    
    # Create a regex pattern based on the fixed preceding words
    pattern = re.escape(preceding_words) + r'\s*(\w+(?:\s+\w+){0,2})'
    matches = re.findall(pattern, text)
    authors.extend(matches)
    
    return authors

# Directory containing PDF files
pdf_directory = "path/to/pdf/directory"

# The words that consistently precede the author's name
preceding_phrase = "written by"

# Process all PDF files in the directory
for filename in os.listdir(pdf_directory):
    if filename.endswith(".pdf"):
        pdf_path = os.path.join(pdf_directory, filename)
        extracted_authors = extract_authors(pdf_path, preceding_phrase)
        print(f"Authors in {filename}: {extracted_authors}")