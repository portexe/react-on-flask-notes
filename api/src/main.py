from app import db, app
from flask_cors import CORS
from routes.api import api_blueprint
from constants import client_origin

# SQL Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"

# Register routes
app.register_blueprint(api_blueprint)

# Cross origin settings for DEV ONLY
CORS(app, origins=[client_origin])

# Initialize DB
db.init_app(app)

# Create database in context if doesn't exist already
with app.app_context():
    db.create_all()

# Init
if __name__ == '__main__':
    app.run()
