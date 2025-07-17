from flask import Blueprint, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from flask_marshmallow import Marshmallow
from datetime import datetime, timezone
from sqlalchemy import func
import uuid
from marshmallow import Schema, fields

db = SQLAlchemy()
ma = Marshmallow()
models = Blueprint('models', __name__)


class TimeStamp(object):
    created_at = db.Column(
        db.DateTime(timezone=True), 
        default=datetime.now(timezone.utc), 
        server_default=func.now()
    )
    updated_at = db.Column(
        db.DateTime(timezone=True), 
        default=datetime.now(timezone.utc), 
        onupdate=datetime.now(timezone.utc), 
        server_default=func.now()
    )
    created_by = db.Column(db.String(200))
    created_by_id = db.Column(UUID(as_uuid=True))
    updated_by = db.Column(db.String(200))
    updated_by_id = db.Column(UUID(as_uuid=True))


class TokenBlackList(db.Model, TimeStamp):
	__tablename__ = 'blacklist'
	id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
	jti = db.Column(db.String(36), nullable=True, index=True)
	token_type = db.Column(db.String, nullable=True)
	user_identity = db.Column(db.String, nullable=True)
	revoked = db.Column(db.Boolean)
	expires = db.Column(db.DateTime)
	epoch_expires = db.Column(db.Integer)
        
class DimDate(db.Model):
    __tablename__ = 'dim_date'
    date_id = db.Column(db.Integer, primary_key=True, nullable=False)
    date_actual = db.Column(db.Date, nullable=False)
    epoch = db.Column(db.BigInteger, nullable=False)
    day_suffix = db.Column(db.String(4), nullable=False)
    day_name = db.Column(db.String(9), nullable=False)
    day_of_week = db.Column(db.Integer, nullable=False)
    day_of_month = db.Column(db.Integer, nullable=False)
    day_of_quarter = db.Column(db.Integer, nullable=False)
    day_of_year = db.Column(db.Integer, nullable=False)
    week_of_month = db.Column(db.Integer, nullable=False)
    week_of_year = db.Column(db.Integer, nullable=False)
    week_of_year_iso = db.Column(db.String(10), nullable=False)
    month_actual = db.Column(db.Integer, nullable=False)
    month_name = db.Column(db.String(9), nullable=False)
    month_name_abbreviated = db.Column(db.String(3), nullable=False)
    quarter_actual = db.Column(db.Integer, nullable=False)
    quarter_name = db.Column(db.String(9), nullable=False)
    year_actual = db.Column(db.Integer, nullable=False)
    first_day_of_week = db.Column(db.Date, nullable=False)
    last_day_of_week = db.Column(db.Date, nullable=False)
    first_day_of_month = db.Column(db.Date, nullable=False)
    last_day_of_month = db.Column(db.Date, nullable=False)
    first_day_of_quarter = db.Column(db.Date, nullable=False)
    last_day_of_quarter = db.Column(db.Date, nullable=False)
    first_day_of_year = db.Column(db.Date, nullable=False)
    last_day_of_year = db.Column(db.Date, nullable=False)
    mmyyyy = db.Column(db.String(6), nullable=False)
    mmddyyyy = db.Column(db.String(10), nullable=False)
    weekend_indr = db.Column(db.Boolean, nullable=False)
 


class User(db.Model, TimeStamp):
    __tablename__ = 'users'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=True)
    role = db.Column(db.String, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    is_archived = db.Column(db.Boolean, default=False)


class CompanyDetails(db.Model):
    __tablename__ = 'company_details'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    domain_name = db.Column(db.Text, nullable=False)
    tone = db.Column(db.Text, nullable=False)
    custom_tone = db.Column(db.Text, nullable=True)
    company_description = db.Column(db.Text, nullable=False)
    chatbot_expectations = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(timezone.utc), server_default=func.now())



class CompanyFiles(db.Model):
    __tablename__ = 'company_files'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    company_id = db.Column(UUID(as_uuid=True), nullable=False)
    file_name = db.Column(db.Text, nullable=False)
    file_type = db.Column(db.Text, nullable=False)  # e.g., 'pdf', 'url'
    file_url = db.Column(db.Text, nullable=False)
    uploaded_at = db.Column(db.DateTime(timezone=True), default=datetime.now(timezone.utc), server_default=func.now())
