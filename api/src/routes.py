from app import db
from note_api import NoteAPI
from flask import request, Blueprint
from error.unauthorized import Unauthorized
from error.custom_exception import CustomException
from response import Response, UnauthorizedResponse
from flask_security import auth_required, current_user

api_blueprint = Blueprint('api_blueprint', __name__)

def handle_errors(cb):
    def wrapper(*args, **kwargs):
        try:
            return cb(*args, **kwargs)
        except Unauthorized:
            return UnauthorizedResponse().response()
        except Exception as e:
            raise CustomException('Database error', 400, str(e))
        
    return wrapper

@auth_required()
@api_blueprint.route('/notes', methods=['GET'])
def notes():
    note_api = NoteAPI(db, current_user.id)

    all_notes = note_api.get_all_user_notes()

    return Response({"notes": all_notes}, 200).response()
        
@handle_errors
@auth_required()
@api_blueprint.route('/note', methods=["POST"])
@api_blueprint.route('/note/<slug>', methods=["GET", "PUT", "DELETE"])
def note(slug = None):
    note_api = NoteAPI(db, current_user.id)

    if request.method == "POST":
        new_note = request.get_json()

        title, content = new_note.values()

        note_api.add(title, content)

        return Response({"success": True}, 201).response()
    elif request.method == "GET":
        note = note_api.get(slug)

        return Response({"success": True, "note": note}, 200).response()
    elif request.method == "PUT":
        title, content = request.get_json().values()

        stored_note = note_api.get(slug)

        note_api.update(stored_note, title, content)

        return Response({"success": True}, 200).response()
    elif request.method == "DELETE":
        note = note_api.get(slug)

        note_api.delete(note)

        return Response({"success": True}, 200).response()
