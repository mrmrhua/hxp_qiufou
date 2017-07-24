from  flask import  session,jsonify,request,url_for
import  random
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp,get_access_token,get_user_info,get_wx_head
import json
from app.model import User,db
from config import APPLYSTATUS,SEX


class GetApplyStatus(Resource):
    def get(self):
        applystatus = 0;
        applystatus = current_user.applystatus
        return jsonify({'code':0,'data':{'applystatus':applystatus}})