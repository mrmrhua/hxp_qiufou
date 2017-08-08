from  flask import  session,jsonify,request,url_for
import  random
from flask_restful import Resource
from app.common import auth

class TokenVerify(Resource):
    @auth.login_required
    def get(self):
        return jsonify({'code':0})