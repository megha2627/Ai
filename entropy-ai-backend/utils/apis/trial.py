from flask import Blueprint, request, jsonify
from utils.apis.helper import Helper
from utils.schema.models import CompanyDetails

trial = Blueprint('trial', __name__)

@trial.route('/free-trial', methods=['POST'])
def create_trial():
    helper = Helper(CompanyDetails)
    data = helper.responseObject(request)
    if isinstance(data, tuple):
        return data

    required_fields = ['domain_name', 'tone', 'company_description', 'chatbot_expectations']
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({'message': f'Missing fields: {missing}'}), 400

    # ✅ Check if domain already exists
    existing = helper.getRecordBy(domain_name=data['domain_name'])
    if existing:
        return jsonify({'message': 'A trial for this domain already exists.'}), 409

    # Optional field default
    data.setdefault('custom_tone', '')

    # Add record
    _ = helper.addRecordToDb(data)
    created_record = helper.getRecordBy(domain_name=data['domain_name'])

    if not created_record:
        return jsonify({'message': 'Company created but not found'}), 500

    return jsonify({
        "message": "Trial created",
        "company_id": str(created_record.id)
    }), 201
