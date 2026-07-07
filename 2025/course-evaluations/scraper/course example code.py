import os
import csv

# all math course pdf
PDF_FOLDER = "/Users/savannaleung/Downloads/Maroon/data/course eval piece/maths/"

# csv 
output_file = "math_course_results.csv"

import csv
with open(output_file, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["Course Code", "Instructor", "Enrolled", "Responses", "Avg Hours", "Sentiment Score"])

    # each PDF
    for filename in os.listdir(PDF_FOLDER):
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(PDF_FOLDER, filename)

            # get data
            metadata = extract_course_metadata(pdf_path)

            # use OCR 
            images = extract_images_from_pdf(pdf_path)
            bins = extract_bins_from_ocr(images)
            avg_hours = calculate_weighted_average(bins) if bins else None

            # sentiment w program 
            comments = extract_comments_from_pdf(pdf_path)
            sentiment = analyze_sentiment(comments)

            # work?
            print(f"Processed: {filename}")
            writer.writerow([
                metadata["Course Code"],
                metadata["Instructor"],
                metadata["Enrolled"],
                metadata["Responses"],
                avg_hours if avg_hours is not None else "N/A",
                sentiment
            ])
