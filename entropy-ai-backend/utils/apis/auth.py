from flask import jsonify, Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from utils.schema.models import User
from utils.authentication.auth_helper import AccessTokens, passwordHelper
from utils.apis.helper import Helper


auth = Blueprint('auth',__name__)

@auth.route("/login",methods=['POST'])
def login():
     # creating instances
     user = Helper(User)
     password_helper = passwordHelper()
     #data from body
     data = user.responseObject(request)
     #checking data
     if not data or 'email' not in data or 'password' not in data:
        return jsonify({'message': 'Email and password are required'}), 400
     user = user.getRecordBy(email=data['email'])
     #checking user
     if not user:
        return jsonify({'message': 'Invalid credentials'}), 400
     #checking password
     if not password_helper.check_password(data['password'], user.password):
        return jsonify({'message': 'Invalid credentials'}), 400
     #generating tokens
     access_token = AccessTokens().create_access_token(user)
     refresh_token = AccessTokens().create_refresh_token(user)
     return jsonify({'access_token': access_token, 'refresh_token': refresh_token}), 200

@auth.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    AccessTokens.revoke_token(jti)
    return jsonify({'message': 'Logged out successfully'}), 200

@auth.route('/refreshtokens', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    user = Helper(User).getRecordBy(id=identity)


    # Create a new access token
    new_access_token = AccessTokens().create_access_token(user)
    
    return jsonify(access_token=new_access_token), 200
 