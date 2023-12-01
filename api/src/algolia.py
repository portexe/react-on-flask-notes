from models import Note
from algoliasearch.search_index import SearchIndex
from error.unauthorized import Unauthorized

class Algolia():
    def __init__(self, user_id: int, algolia_index: SearchIndex):
        if not algolia_index:
            raise Exception("Index not provided")
        elif not user_id:
            raise Unauthorized("No User ID provided", 401)
        
        self.user_id = user_id
        self.algolia_index = algolia_index

    def add(self, note: Note):
        dict_version = self.note_to_dict(note)
        self.algolia_index.save_object(dict_version)

    def update(self, note: Note):
        print(f"Updating note: {note.id} -> {note.title}")
        pass

    def delete(self, note: Note):
        print(f"Deleting note: {note.id} -> {note.title}")
        pass

    def search(self, term: str):
        if not term:
            raise Exception("No search term provided")

        results = self.algolia_index.search(term, {
            'filters': f"user_id:{self.user_id}"
        })["hits"]

        return results
    
    def note_to_dict(self, note: Note):
        try:
            return {
                "objectID": note.id,
                "title": note.title,
                "content": note.content,
                "user_id": note.user_id
            }
        except:
            raise Exception("Error converting note to a dict")
    