from  flask import  session,jsonify,request,url_for
import  random
from flask_restful import Resource
from flask_login import current_user
from app.common import auth
import json
from app.model import User,db,Demand_User
from config import APPLYSTATUS,SEX

class ReplyDemand(Resource):
    @auth.login_required
    def post(self):
        du = Demand_User.from_request(request)
        db.session.add(du)
        try:
            db.session.commit()
        except:
            db.session.rollback()
            return jsonify({'code': -1, 'data': {'msg': '保存失败'}})
        return jsonify({'code': 0})