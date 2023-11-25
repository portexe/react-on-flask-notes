from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Initialize the app and DB
app = Flask(__name__)
db = SQLAlchemy()
