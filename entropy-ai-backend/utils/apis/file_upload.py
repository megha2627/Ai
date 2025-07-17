


from flask import Flask,Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Directory to save uploaded files
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Allowed extensions (optional)
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'csv'}

# Make sure uploads folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

file_upload = Blueprint('upload_file', __name__)

@file_upload.route("/upload-file", methods=["POST"])
def upload_file():
    # 1. Get company_id from form-data
    company_id = request.form.get('company_id')

    if not company_id:
        return jsonify({'error': 'Company ID is required'}), 400

    # 2. Check if file is in request
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # 3. Save file
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(save_path)

        # 4. Log and return response
        print(f"✅ File uploaded: {filename}")
        print(f"🆔 Company ID: {company_id}")

        return jsonify({
            'message': 'File uploaded successfully',
            'file_name': filename,
            'company_id': company_id
        }), 200

    else:
        return jsonify({'error': 'File type not allowed'}), 400

if __name__ == '__main__':
    app.run(debug=True)
