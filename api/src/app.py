from flask import Flask
from sqlalchemy.orm import DeclarativeBase
from flask_sqlalchemy import SQLAlchemy

class Base(DeclarativeBase):
  pass

# Initialize the app and DB
app = Flask(__name__)
db = SQLAlchemy(model_class=Base)
