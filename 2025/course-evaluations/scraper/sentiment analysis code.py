import fitz  # PyMuPDF
import re
from textblob import TextBlob

def extract_comments_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    full_text = "\n".join(page.get_text() for page in doc)

    # Try to grab everything under "Comments" or "Advice" sections
    matches = re.findall(r"(Comments|Please share any advice.*?)\n(.+?)(?=\n[A-Z][^\n]+:|\Z)", full_text, re.DOTALL)
    comments = " ".join([m[1].strip() for m in matches])

    return comments.strip()

def analyze_sentiment(text):
    if not text.strip():
        return 0.0  # neutral sentiment if no comments
    blob = TextBlob(text)
    return round(blob.sentiment.polarity, 3)

if __name__ == "__main__":
    pdf_path = "_642efd00-3f1c-4057-8251-9750ca7247c8en-US.pdf"  # change to your filename
    comments = extract_comments_from_pdf(pdf_path)
    sentiment_score = analyze_sentiment(comments)
    
    print(f"Sentiment score: {sentiment_score}")
