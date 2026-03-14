import fitz  
import pytesseract
from PIL import Image
import io
import re
from textblob import TextBlob

# 2.5, 7.5, 12.5, 17.5, 22.5, 27.5, 32.5 (corresponds to <5, 5-10, 10-15, 15-20, 20-25, 25-30, >30 hours)
HOUR_BIN_MIDPOINTS = {
    "<5 hours": 2.5,
    "5-10 hours": 7.5,
    "10-15 hours": 12.5,
    "15-20 hours": 17.5,
    "20-25 hours": 22.5,
    "25-30 hours": 27.5,
    ">30 hours": 32.5,
}

# bins
BIN_PATTERN = re.compile(r"(.{0,20}hours)\s*[\(\n]\s*(\d+)")

# define images
def normalize_label(label):
    label = label.lower().replace("–", "-").replace(" ", "").strip()
    label = label.replace("<shours", "<5hours")
    label = label.replace("<shour", "<5hours")
    label = label.replace("<s", "<5")
    label = label.replace("s-", "5-")

    if "<5hours" in label or label.startswith("<5"):
        return "<5 hours"
    elif "5-10hours" in label:
        return "5-10 hours"
    elif "10-15hours" in label:
        return "10-15 hours"
    elif "15-20hours" in label:
        return "15-20 hours"
    elif "20-25hours" in label:
        return "20-25 hours"
    elif "25-30hours" in label:
        return "25-30 hours"
    elif ">30hours" in label or label.startswith(">30"):
        return ">30 hours"
    else:
        return None

def extract_images_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    images = []
    for page_number in range(len(doc)):
        for img_index, img in enumerate(doc[page_number].get_images(full=True)):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image = Image.open(io.BytesIO(image_bytes))
            images.append(image)
    return images

def extract_bins_from_ocr(images):
    bins = {}
    for img in images:
        ocr_text = pytesseract.image_to_string(img)
        matches = BIN_PATTERN.findall(ocr_text)
        for raw_label, count in matches:
            label = normalize_label(raw_label)
            if label:
                bins[label] = bins.get(label, 0) + int(count)
    return bins

def calculate_weighted_average(bins):
    total_weighted = 0
    total_responses = 0
    for label, count in bins.items():
        midpoint = HOUR_BIN_MIDPOINTS.get(label)
        if midpoint:
            total_weighted += midpoint * count
            total_responses += count
    if total_responses == 0:
        return None
    return round(total_weighted / total_responses, 2)

def extract_course_metadata(pdf_path):
    doc = fitz.open(pdf_path)
    text = doc[0].get_text()
    lines = text.splitlines()

    course_code = None
    instructor = None
    enrolled = None
    responses = None

    for i, line in enumerate(lines):
        if re.search(r"[A-Z]{4}\s?\d{5}", line):
            course_code = re.search(r"[A-Z]{4}\s?\d{5}", line).group()
        if "Instructor" in line:
            instructor = line.split("Instructor")[-1].replace(":", "").replace("-", "").strip()

    for i, line in enumerate(lines):
        if "College Course Feedback" in line and i + 2 < len(lines):
            if lines[i + 1].strip().isdigit():
                enrolled = lines[i + 1].strip()
            if lines[i + 2].strip().isdigit():
                responses = lines[i + 2].strip()
            break

    return {
        "Course Code": course_code if course_code else "N/A",
        "Instructor": instructor if instructor else "N/A",
        "Enrolled": enrolled if enrolled else "N/A",
        "Responses": responses if responses else "N/A"
    }

# sentiment analysis w wordcloud 
def extract_comments_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    full_text = "\n".join(page.get_text() for page in doc)
    matches = re.findall(r"(Comments|Please share any advice.*?)\n(.+?)(?=\n[A-Z][^\n]+:|\Z)", full_text, re.DOTALL)
    comments = " ".join([m[1].strip() for m in matches])
    return comments.strip()

def analyze_sentiment(text):
    if not text.strip():
        return 0.0
    blob = TextBlob(text)
    return round(blob.sentiment.polarity, 3)

if __name__ == "__main__":
    pdf_path = "_31f44721-c396-47bb-ab96-87bafd8daa9een-US.pdf"

    metadata = extract_course_metadata(pdf_path)
    print(f"Course Code: {metadata['Course Code']}")
    print(f"Instructor: {metadata['Instructor']}")
    print(f"Enrolled: {metadata['Enrolled']}")
    print(f"Responses: {metadata['Responses']}")

    images = extract_images_from_pdf(pdf_path)
    bins = extract_bins_from_ocr(images)
    if bins:
        avg = calculate_weighted_average(bins)
        print(f"Weighted average study hours: {avg} hours/week")
    else:
        print("No valid time bins found.")

    # comment S here
    comments = extract_comments_from_pdf(pdf_path)
    sentiment_score = analyze_sentiment(comments)
    print(f"Sentiment score: {sentiment_score}")


import os
import csv

PDF_FOLDER = "/Users/savannaleung/Downloads/Maroon/data/course eval piece/lang/"

# put into excel 
output_file = "lang_course_results.csv"

import csv
with open(output_file, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["Course Code", "Instructor", "Enrolled", "Responses", "Avg Hours", "Sentiment Score"])

    for filename in os.listdir(PDF_FOLDER):
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(PDF_FOLDER, filename)

            metadata = extract_course_metadata(pdf_path)

            images = extract_images_from_pdf(pdf_path)
            bins = extract_bins_from_ocr(images)
            avg_hours = calculate_weighted_average(bins) if bins else None

            comments = extract_comments_from_pdf(pdf_path)
            sentiment = analyze_sentiment(comments)
            
            print(f"Processed: {filename}")
            writer.writerow([
                metadata["Course Code"],
                metadata["Instructor"],
                metadata["Enrolled"],
                metadata["Responses"],
                avg_hours if avg_hours is not None else "N/A",
                sentiment
            ])