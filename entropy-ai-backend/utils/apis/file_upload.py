import os
from flask import Blueprint, request, jsonify
from utils.apis.helper import Helper
from utils.schema.models import CompanyFiles
from uuid import UUID
from werkzeug.utils import secure_filename

file_upload = Blueprint('file_upload', __name__)

@file_upload.route('/upload-file', methods=['POST'])
def upload_file_or_url():
    helper = Helper(CompanyFiles)

    # Handle URL Submission
    if request.is_json:
        data = request.get_json()
        if 'url' not in data or 'company_id' not in data:
            return jsonify({'message': 'Missing url or company_id'}), 400

        record = {
            "company_id": UUID(data['company_id']),
            "file_name": "External URL",
            "file_type": "url",
            "file_url": data['url']
        }
        return helper.addRecordToDb(record)

    # Handle File Upload
    if 'file' not in request.files or 'company_id' not in request.form:
        return jsonify({'message': 'File and company_id required'}), 400

    file = request.files['file']
    company_id = UUID(request.form['company_id'])

    if file.filename == '':
        return jsonify({'message': 'No file selected'}), 400

    filename = secure_filename(file.filename)
    file_ext = filename.rsplit('.', 1)[1].lower() if '.' in filename else 'unknown'

    # ✅ Here: Replace this with your Supabase/S3 upload logic
    # For now, saving locally in a static folder
    save_path = os.path.join("static/uploads", filename)
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    file.save(save_path)

    # Simulated public URL (in production: Supabase/S3 URL)
    file_url = f"http://localhost:5000/{save_path}"

    record = {
        "company_id": company_id,
        "file_name": filename,
        "file_type": file_ext,
        "file_url": file_url
    }

    return helper.addRecordToDb(record)
