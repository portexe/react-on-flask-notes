class Unauthorized(Exception):
    def __init__(self, message, code = 403):
        super().__init__(message)
        self.code = code
