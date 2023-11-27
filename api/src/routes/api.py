from app import app, db
from db.models import Note
from constants import client_origins
from flask import jsonify, request, Blueprint
from error.custom_errors import CustomException
from flask_security import auth_required, current_user

api_blueprint = Blueprint('api_blueprint', __name__)

@api_blueprint.errorhandler(Exception)
def handle_exception(error):
    is_custom_error = isinstance(error, CustomException)
    
    app.logger.error(f"An error occurred: {error}")

    if is_custom_error:
        app.logger.error(f"Context: {error.log}")
    
    status_code = error.code if (hasattr(error, 'code') and isinstance(error.code, int)) else 500
    error_message = str(error) if is_custom_error else "Server error"

    response = jsonify({"error": error_message})
    response.status_code = status_code

    response.headers.add('Access-Control-Allow-Origin', client_origins[1])

    return response

# TODO: Create a decorator to ensure you only get notes for a specific User
@api_blueprint.route('/notes', methods=['GET'])
@auth_required()
def notes():
    if request.method == "GET":
        user_id = current_user.id
        all_notes = Note.query.where(Note.user_id == user_id).all()

        return jsonify({"notes": all_notes})
    elif request.method == "POST":
        new_note = request.get_json()

        try:
            title = new_note["title"]
            content = new_note["content"]
            db.session.add(Note(title=title, content=content))
            db.session.commit()

            response = jsonify({"success": True})
            response.status_code = 201
            
            return response
        except Exception as e:
            original_error_message = str(e)
            raise CustomException('Error adding the note', 400, original_error_message)
        
@api_blueprint.route('/note', methods=["GET", "POST"])
@auth_required()
def note():
    if request.method == "POST":
        user_id = current_user.id
        new_note = request.get_json()

        try:
            title = new_note["title"]
            content = new_note["content"]
            db.session.add(Note(title=title, content=content, user_id=user_id))
            db.session.commit()

            response = jsonify({"success": True})
            response.status_code = 201
            
            return response
        except Exception as e:
            original_error_message = str(e)
            raise CustomException('Error adding the note', 400, original_error_message)
    elif request.method == "GET":
        # TODO: How to get the param? (ex. /note/25)
        return 500