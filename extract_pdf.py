import PyPDF2
import io

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page_num in range(len(reader.pages)):
            text += reader.pages[page_num].extract_text()
    return text

if __name__ == '__main__':
    pdf_text = extract_text_from_pdf('public/lightos-businesspitch.docx.pdf')
    with io.open("pdf_output.txt", "w", encoding="utf-8") as f:
        f.write(pdf_text)
