from app import db
from algolia import Algolia
from note_api import NoteAPI
from app import algolia_index
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

@handle_errors
@api_blueprint.route('/notes', methods=['GET'])
@auth_required()
def notes():
    note_api = NoteAPI(db, current_user.id)

    all_notes = note_api.get_all_user_notes()

    return Response({"notes": all_notes}, 200).response()

@handle_errors
@api_blueprint.route('/note', methods=["POST"])
@api_blueprint.route('/note/<slug>', methods=["GET", "PUT", "DELETE"])
@auth_required()
def note(slug = None):
    note_api = NoteAPI(db, current_user.id)
    algolia = Algolia(current_user.id, algolia_index)

    if request.method == "POST":
        new_note = request.get_json()

        title, content = new_note.values()

        new_note = note_api.add(title, content)

        algolia.add(new_note)

        return Response({"success": True}, 201).response()
    elif request.method == "GET":
        note = note_api.get(slug)

        return Response({"success": True, "note": note}, 200).response()
    elif request.method == "PUT":
        title, content = request.get_json().values()

        stored_note = note_api.get(slug)

        updated_note = note_api.update(stored_note, title, content)

        algolia.update(updated_note)

        return Response({"success": True}, 200).response()
    elif request.method == "DELETE":
        note = note_api.get(slug)

        note_api.delete(note)

        algolia.delete(note)

        return Response({"success": True}, 200).response()

@handle_errors
@api_blueprint.route('/search', methods=["POST"])
@auth_required()
def search():
    algolia = Algolia(current_user.id, algolia_index)

    term = request.get_json()["term"]

    notes = algolia.search(term)

    return Response({"success": True, "notes": notes}, 200).response()
