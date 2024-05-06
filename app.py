from flask import Flask, request
import gspread
from oauth2client.service_account import ServiceAccountCredentials

app = Flask(__name__)

@app.route('/submit-form', methods=['POST'])
def submit_form():
    name = request.form['name']
    email = request.form['email']
    phone = request.form['phone']
    address = request.form['address']
    book_title = request.form['book_title']
    book_author = request.form['book_author']
    
    # Аутентификация в Google Sheets API
    scope = ['https://spreadsheets.google.com/feeds',
            'https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
    client = gspread.authorize(creds)

    # Открытие таблицы и запись данных
    sheet = client.open('Book Orders').sheet1
    sheet.append_row([name, email, phone, address, book_title, book_author])

    return 'Form submitted successfully!'

if __name__ == '__main__':
    app.run(debug=True)