from flask import jsonify

class Response():
    def __init__(self, body, code: int):
        self.body = body
        self.code = code

    def response(self):
        json_response = jsonify(self.body)
        json_response.status_code = self.code
        return json_response
    
class UnauthorizedResponse(Response):
    def __init__(self):
        super().__init__({"error": "Unauthorized", "success": False}, 403)
