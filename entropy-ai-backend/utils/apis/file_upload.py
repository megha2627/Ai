from flask import Blueprint, request, jsonify
from utils.schema.models import CompanyFiles, CompanyDetails, db
from werkzeug.utils import secure_filename
from uuid import UUID as UUID_check
import os

file_upload = Blueprint('upload_file', __name__)

@file_upload.route("/upload-file", methods=["POST"])
def upload_file():
    company_id = request.form.get("company_id")
    file = request.files.get("file")

    if not company_id or not file:
        return jsonify({"error": "company_id and file are required"}), 400

    # Validate UUID format
    try:
        uuid_obj = UUID_check(company_id)
    except ValueError:
        return jsonify({"error": "Invalid UUID format"}), 400

    company = CompanyDetails.query.get(uuid_obj)
    if not company:
        return jsonify({"error": "Invalid company ID"}), 400

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    filename = secure_filename(file.filename)
    file_type = filename.split(".")[-1]
    upload_folder = "uploads/"

    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, filename)
    file.save(file_path)

    # Optional: make this a public URL
    file_url = f"/uploads/{filename}"

    file_entry = CompanyFiles(
        company_id=company.id,
        file_name=filename,
        file_type=file_type,
        file_url=file_url
    )

    db.session.add(file_entry)
    db.session.commit()

    return jsonify({
        "message": "File uploaded successfully",
        "file_id": str(file_entry.id),
        "file_url": file_url
    }), 200
