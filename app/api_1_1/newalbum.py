from  flask import  session,jsonify,request,url_for
import  random
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp,get_access_token,get_user_info,get_wx_head
import json
from app.model import User,db
from config import APPLYSTATUS,SEX
from app.common import auth

class NewAlbum(Resource):
    @auth.login_required
    def post(self):
       request.values.get("title")
       return jsonify({'code':0})