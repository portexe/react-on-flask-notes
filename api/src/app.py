from os import environ
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from algoliasearch.search_client import SearchClient

# Initialize the app and DB
app = Flask(__name__)
db = SQLAlchemy()

algolia_client = SearchClient.create(environ.get('ALGOLIA_APP_ID'), environ.get('ALGOLIA_API_KEY'))
algolia_index = algolia_client.init_index('dev_NOTES')
