from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp,get_access_token,get_user_info,get_wx_head
import json
from app.models import User,db
from config import APPLYSTATUS,SEX
from app.common import auth
from app.models import Album,Designwork,Exp
from datetime import datetime

class AddExp(Resource):
    @auth.login_required
    def post(self):
        title = request.values.get("title")
        desc = request.values.get("desc")
        e = Exp(title=title,desc=desc,user_id=g.user.id)
        db.session.add(e)
        try:
            db.session.commit()
            return jsonify({'code':0,'data':{'exp_id':e.id}})
        except:
            db.session.rollback()
            return jsonify({'code': -1})



class DelExp(Resource):
    @auth.login_required
    def post(self):
        exp_id= request.values.get("exp_id")
        if not exp_id:
            return jsonify({'code':-1})
        e = Exp.query.filter_by(id=exp_id).first()
        if e:
            db.session.delete(e)
            db.session.commit()
            return jsonify({'code': 0})
        else:
            return jsonify({'code': -1,})
