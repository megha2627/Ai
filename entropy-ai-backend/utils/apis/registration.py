from flask import jsonify, request, Blueprint
from utils.apis.helper import Helper
from utils.schema.models import User, db
from flask_jwt_extended import jwt_required
from sqlalchemy.exc import SQLAlchemyError


registration = Blueprint('registration', __name__)


@registration.route('/register', methods=['POST'])
def register_user():
    user_helper = Helper(User)

    # Parse request data
    response_obj = user_helper.responseObject(request)
    if isinstance(response_obj, tuple):
        return response_obj 

    # Required fields for user registration
    required_fields = ['email', 'password', 'first_name', 'last_name']
    missing_fields = [field for field in required_fields if field not in response_obj]
    if missing_fields:
        return jsonify({'message': f'Missing required fields: {", ".join(missing_fields)}'}), 400

    # Check if user already exists
    existing_user = user_helper.getRecordBy(email=response_obj['email'])
    if existing_user:
        return jsonify({
            "message": f"Email '{response_obj['email']}' already exists. Please log in instead."
        }), 409

    # Prepare user data
    user_data = {
        "email": response_obj['email'],
        "password": response_obj['password'],
        "first_name": response_obj['first_name'],
        "last_name": response_obj['last_name'],
        "role": "user"  # Default role
    }

    # Create user
    user_create_response = user_helper.addRecordToDb(user_data)

    if isinstance(user_create_response, tuple):
        return user_create_response
    elif not user_create_response:
        return jsonify({"message": "Failed to create user"}), 500

    created_user = user_helper.getRecordBy(email=user_data['email'])
    if not created_user:
        return jsonify({"message": "User created but not found"}), 500

    return jsonify({
        "message": "User registered successfully",
        "user": {
            "id": str(created_user.id),
            "email": created_user.email,
            "first_name": created_user.first_name,
            "last_name": created_user.last_name,
            "role": created_user.role
        }
    }), 201

