from flask import request,jsonify
from flask_restful import Resource
from app.common import send_mail_in_text
from config import ADMIN_EMAIL
class FeedBack(Resource):
    def post(self):
        content = request.values.get("content")
        tel = request.values.get("tel")
        send_mail_in_text(ADMIN_EMAIL,'意见反馈'+tel,content)
        return jsonify({'code':0})