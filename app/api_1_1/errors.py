from flask import jsonify,current_app

from app.common import send_mail_in_text
from app.exceptions import ValidationError
from smtplib import SMTPAuthenticationError

def badrequest(message):
        response = jsonify({'error':'forbidden','message':message})
        response.status_code = 400
        return response



# @api_bp.errorhandler(ValueError)
# def value_error(e):
#         return badrequest("error")
#
#
# @api_1_1.errorhandler(Exception)
# def internal_server_error(e):
#         current_app.logger.exception('error 500: %s', e)
#         send_mail_in_text('mrmrhua@126.com', '应用内部错误', e)
#         print("error: %r" % e)
#         return internalerror()
#
#
# def internalerror():
#     response = jsonify({'error': 'internal server error', 'message': 'internal server error'})
#     response.status_code = 500
#     return response
#
# @api_1_1.app_errorhandler(400)
# def internalerror(e):
#     print("error: %r" % e)
#     return internalerror()

class ServerException(Exception):
    status_code = 400

    def __init__(self, message, status_code=400):
        Exception.__init__(self)
        self.message = message
        self.status_code = status_code
        print("1")