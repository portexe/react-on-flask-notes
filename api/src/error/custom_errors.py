class CustomException(Exception):
    def __init__(self, message, code, log = None):
        super().__init__(message)
        self.code = code
        self.log = log
