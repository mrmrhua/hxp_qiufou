from  flask import  session,jsonify,g,request,Response
import  random
from flask_restful import Resource
from app.models import *
from app.common import *
import requests
import urllib

# 是否绑定
class IsBind(Resource):
    @auth.login_required
    def get(self):
        pm = PushMessage.query.filter_by(user_id=g.user.id).first()
        if not pm:
            return jsonify({'code':0,'data':{'isbind':False}})
        else:
            return jsonify({'code':0,'data':{'isbind':True}})


# 解除绑定
class DelBind(Resource):
    @auth.login_required
    def post(self):
        pm = PushMessage.query.filter_by(user_id=g.user.id).first()
        if not pm:
            return jsonify({'code':-1})
        else:
            db.session.delete(pm)
            db.session.commit()
            return jsonify({'code':0})


