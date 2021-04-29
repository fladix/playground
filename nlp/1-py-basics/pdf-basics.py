import PyPDF2

print('\n=============')
print('Reading PDFs')
print('=============\n')

f = open('US_Declaration.pdf', 'rb')
pdf_reader = PyPDF2.PdfFileReader(f)
print(f'# Opening the Declarion of Independence of the USA\nNumber of pages: {pdf_reader.numPages}')

page_one = pdf_reader.getPage(0)
page_one_text = page_one.extractText()

print('# This is the full text from the first page of the PDF file:')
print(f'{page_one_text!r}')
f.close()

print('\n===========================')
print('Creating and adding to PDFs')
print('===========================\n')

f = open('US_Declaration.pdf', 'rb')
pdf_reader = PyPDF2.PdfFileReader(f)
first_page = pdf_reader.getPage(0)
pdf_writer = PyPDF2.PdfFileWriter()
pdf_writer.addPage(first_page)
pdf_output = open('US_Declaration_Excerpt.pdf', 'wb')
pdf_writer.write(pdf_output)
pdf_output.close()
f.close()

f = open('US_Declaration_Excerpt.pdf', 'rb')
pdf_reader = PyPDF2.PdfFileReader(f)
print(f'The generated PDF file has:\n{pdf_reader.numPages} page(s)')
f.close()

print('\n===========================')
print('End to end simple example')
print('===========================\n')

f = open('US_Declaration.pdf', 'rb')
pdf_reader = PyPDF2.PdfFileReader(f)

pdf_text = [0]

for p in range(pdf_reader.numPages):
    page = pdf_reader.getPage(p)
    pdf_text.append(page.extractText())
f.close()
print(f'{pdf_text!r}')