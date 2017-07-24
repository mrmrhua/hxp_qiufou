from flask import jsonify,current_app
from . import api_bp
from app.common import send_admin_email
from app.exceptions import ValidationError
from smtplib import SMTPAuthenticationError

def badrequest(message):
        response = jsonify({'error':'forbidden','message':message})
        response.status_code = 400
        return response

def internalerror():
        response = jsonify({'error': 'internal server error', 'message': 'internal server error'})
        response.status_code = 500
        return response

# @api_bp.errorhandler(ValueError)
# def value_error(e):
#         return badrequest("error")


@api_bp.errorhandler(Exception)
def internal_server_error(e):
        current_app.logger.exception('error 500: %s', e)
        send_admin_email('mrmrhua@126.com', '应用内部错误', '')
        return internalerror()
