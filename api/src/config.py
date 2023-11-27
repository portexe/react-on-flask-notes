import os
from app import app

def configure_app():
    # SQL Configuration
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"

    # Set password crypto keys from .env
    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")
    app.config['SECURITY_PASSWORD_SALT'] = os.environ.get("SECURITY_PASSWORD_SALT")

    # Cookie samesite strict
    app.config["REMEMBER_COOKIE_SAMESITE"] = "strict"
    app.config["SESSION_COOKIE_SAMESITE"] = "strict"

    # TODO: Figure out what these settings are. They were part of the quickstart guide.
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
        "pool_pre_ping": True,
    }
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Disable pre-request CSRF
    app.config['WTF_CSRF_CHECK_DEFAULT'] = False

    # No expiration for CSRF. Expires with session.
    app.config["WTF_CSRF_TIME_LIMIT"] = None

    # Standard token name used by common http libraries
    app.config["SECURITY_CSRF_COOKIE_NAME"] = "XSRF-TOKEN"

    # No reason to have CSRF on the /login route
    app.config['SECURITY_CSRF_IGNORE_UNAUTH_ENDPOINTS'] = True

    # Enable registration
    app.config['SECURITY_REGISTERABLE'] = True
