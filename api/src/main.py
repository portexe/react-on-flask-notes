from app import db, app
from config import configure_app
from flask_cors import CORS
from routes.api import api_blueprint
from constants import client_origins
from dotenv import load_dotenv
from flask_wtf.csrf import CSRFProtect
from flask_security import Security, SQLAlchemyUserDatastore, hash_password
from flask_security.models import fsqla_v3 as fsqla
from flask_mailman import Mail
from flask_migrate import Migrate

# Loads .env into os.environ
load_dotenv()

# Sets all the app.configs
configure_app()

migrate = Migrate(app, db)

mail = Mail(app)

# Explicitly require CSRF protection
CSRFProtect(app)

# Define Flask Security models
fsqla.FsModels.set_db_info(db)

class Role(db.Model, fsqla.FsRoleMixin):
    pass

class User(db.Model, fsqla.FsUserMixin):
    pass
    
# Initialize SQLAlchemy User and Role models
user_datastore = SQLAlchemyUserDatastore(db, User, Role)

# Initialize Flask-Security
app.security = Security(app, user_datastore)

# Register routes
app.register_blueprint(api_blueprint)

# Cross origin settings for DEV ONLY
CORS(app, origins=client_origins, supports_credentials=True)

# Initialize DB
db.init_app(app)

# Create database in context if doesn't exist already
with app.app_context():
    db.create_all()
    if not app.security.datastore.find_user(email="test@me.com"):
        app.security.datastore.create_user(email="test@me.com", password=hash_password("password"))
    db.session.commit()

# Init
if __name__ == '__main__':
    app.run()
