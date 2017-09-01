from  flask import  session,jsonify,request,url_for,g
import  random
from flask_restful import Resource
from app.common import auth

class TokenVerify(Resource):
    @auth.login_required
    def get(self):
        if (g.user.applystatus == 0) or (g.user.applystatus==-1):
            return jsonify({'code':-1})
        else:
            return jsonify({'code':0,'data':{'applystatus':g.user.applystatus}})