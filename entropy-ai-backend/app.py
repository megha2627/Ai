from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from datetime import timedelta
from utils.schema.models import db, models, ma
from utils.authentication.auth_helper import jwt
from flask_migrate import Migrate


load_dotenv()
app = Flask(__name__)

CORS(app, resources={r"*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('POSTGRES')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPOGATE_EXCEPTIONS'] = True

#JWT configuration
app.config['JWT_PRIVATE_KEY'] = open('private.pem', 'r').read()
app.config['JWT_PUBLIC_KEY'] = open('public.pem', 'r').read()
app.config['JWT_ALGORITHM'] = 'RS256'
app.config['BLACKLIST_ENABLED'] = True
app.config['BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
app.config['JWT_CSRF_PROTECT_ENABLED'] = True

#JWT Expires configuration
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)


migrate = Migrate(app, db)

#Initalize the database
db.init_app(app)
ma.init_app(app)
jwt.init_app(app)

from utils.schema.models import models
app.register_blueprint(models)

from utils.apis.auth import auth
app.register_blueprint(auth)
from utils.apis.trial import trial
app.register_blueprint(trial)

from utils.apis.registration import registration
app.register_blueprint(registration)

from utils.apis.file_upload import file_upload
app.register_blueprint(file_upload)



@app.route('/')
def index():
    return jsonify({"message": "Welcome to the entropy ai world API"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)