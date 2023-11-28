from models import Note
from flask_sqlalchemy import SQLAlchemy
from error.unauthorized import Unauthorized

class NoteAPI():
    def __init__(self, db: SQLAlchemy, user_id: str):
        if not db:
            raise Exception("DB not provided")
        elif not user_id:
            raise Unauthorized("No User ID provided", 401)
        
        self.db = db
        self.user_id = user_id

    def get(self, id: str) -> Note:
        if not id:
            raise Exception("Missing note ID")
                
        try:
            note = Note.query.get(id)
        except:
            raise Exception("Error fetching note")

        if not note:
            raise Exception(f"Note not found with given ID: {id}")
        elif note.user_id != self.user_id:
            raise Unauthorized("Note does not belong to user")
        
        return note

    def add(self, title: str, content: str):
        if not title or not content:
            raise Exception("Missing title or content")

        try:
            self.db.session.add(Note(title=title, content=content, user_id=self.user_id))
            self.db.session.commit()
        except:
            raise Exception("Error adding note to the database")
        
    def update(self, note: Note, title: str, content: str):
        if not note or not title or not content:
            raise Exception("Missing arguments")
        elif not self.authorized(note):
            raise Unauthorized("User ID does not match")
        
        note.title = title
        note.content = content

        try:
            self.db.session.commit()
        except:
            raise Exception("Error updating note")

    def delete(self, note: Note):
        if not note:
            raise Exception("Missing note")
        elif not self.authorized(note):
            raise Unauthorized("User ID does not match")
        
        try:
            self.db.session.delete(note)
            self.db.session.commit()
        except:
            raise Exception("Error deleting note from the database")
        
    def get_all_user_notes(self):
        try:
            notes = Note.query.where(Note.user_id == self.user_id).all()
            return notes
        except:
            raise Exception("Error retrieving notes for user")
        
    def authorized(self, note: Note):
        if note.user_id != self.user_id:
            return False
        
        return True
