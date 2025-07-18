from flask import Blueprint, request, jsonify
import os, time, fitz, openai
from werkzeug.utils import secure_filename
from collections import defaultdict
from docx import Document
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env

file_upload = Blueprint('file_upload', __name__)

# === Configuration ===
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt', 'csv'}
MAX_FILE_SIZE_MB = 5
MAX_DAILY_UPLOADS = 3

openai.api_key = os.getenv('OPENAI_API_KEY')

# Create folder if not exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
user_upload_log = defaultdict(list)


# === Helper Functions ===
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def is_file_size_allowed(file):
    file.seek(0, os.SEEK_END)
    size = file.tell()
    file.seek(0)
    return size <= MAX_FILE_SIZE_MB * 1024 * 1024

def extract_text(file_path):
    ext = file_path.rsplit('.', 1)[-1].lower()

    try:
        if ext == 'pdf':
            text = ''
            with fitz.open(file_path) as doc:
                for page in doc:
                    text += page.get_text()
            return text

        elif ext == 'docx':
            doc = Document(file_path)
            return "\n".join([para.text for para in doc.paragraphs])

        elif ext in ['txt', 'csv']:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                return f.read()

    except Exception as e:
        print(f"Error extracting text: {e}")
    
    return ''

def ask_chatbot(text):
    prompt = f"The uploaded file content is:\n\n{text[:3000]}\n\nAnswer user questions based on this."

    try:
        response = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=[
                {"role": "system", "content": "You're a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        return response['choices'][0]['message']['content']

    except Exception as e:
        print(f"\n🔴 OpenAI API error: {e}\n")  # <-- Add this
        return "Sorry, something went wrong with the chatbot."

# === File Upload Route ===
@file_upload.route("/upload-file", methods=["POST"])
def upload_file():
    company_id = request.form.get('company_id')
    if not company_id:
        return jsonify({'error': 'Company ID is required'}), 400

    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'File name is missing'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'Only PDF, DOCX, TXT, and CSV files are allowed.'}), 400

    if not is_file_size_allowed(file):
        return jsonify({'error': f'File size exceeds {MAX_FILE_SIZE_MB}MB limit'}), 400

    # Daily upload limit check
    now = time.time()
    today_uploads = [t for t in user_upload_log[company_id]
                     if time.localtime(t).tm_yday == time.localtime(now).tm_yday]

    if len(today_uploads) >= MAX_DAILY_UPLOADS:
        return jsonify({'error': 'Daily upload limit (3 files) exceeded'}), 429

    user_upload_log[company_id].append(now)

    # Save file
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    # Extract text
    extracted_text = extract_text(file_path)
    if not extracted_text:
        return jsonify({'error': 'Failed to extract text from file'}), 500

    # Get GPT response
    response_text = ask_chatbot(extracted_text)

    return jsonify({
        'message': 'File uploaded and processed successfully',
        'chatbot_response': response_text
    }), 200
