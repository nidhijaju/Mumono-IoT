import sys

class Error(Exception):
    pass

class SensorError(Error):
    def __init__(self, expression, message):
        self.expression = expression
        self.message = message

class SetupError(SensorError):
    def __init__(self, expression, message):
        self.expression = expression
        self.message = message

class PollError(SensorError):
    def __init__(self, expression, message):
        self.expression = expression
        self.message = message

class RestartSensor(SensorError):
    def __init__(self, expression, message):
        self.expression = expression
        self.message = message
class CommunicationError(Error):
    def __init__(self, message):
        self.message = message

class ConnectionError(Error):
    def __init__(self, message):
        self.message = message

class TransmitError(CommunicationError):
    def __init__(self, message):
        self.message = message

class FileError(Error):
    def __init__(self, message):
        self.message = message