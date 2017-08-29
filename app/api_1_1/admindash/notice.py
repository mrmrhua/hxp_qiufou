from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
import json
from app.models import User,db,Tag,Category,Exp,Notice,Subscribtion
from app.common import auth
from datetime import datetime

class UnreadNum(Resource):
    @auth.login_required
    def get(self):
        count = Subscribtion.query.filter_by(user_id = g.user.id,isread=0).count()
        return jsonify({'code':0,'data':{'num':count}})


class NoticeRecent(Resource):
    @auth.login_required
    def get(self):
        count = Subscribtion.query.filter_by(user_id=g.user.id, isread=0).count()
        if count>0:
            res = Subscribtion.query.filter_by(user_id=g.user.id, isread=0).all()
            notice = [{'content':i.notice.content,'title':i.notice.title,'up_time':datetime.strftime(i.notice.up_time, "%Y-%m-%d")} for i in res]
        else:
            notice = []
        return jsonify({'code':0,'data':{'notice': notice }})


# 清空所有未读消息
class ClearAll(Resource):
    @auth.login_required
    def post(self):
        res = Subscribtion.query.filter_by(user_id=g.user.id, isread=0).all()
        for i in res:
            i.isread=1
            db.session.add(i)
        db.session.commit()
        return jsonify({'code':0})


# 获取所有消息
class AllNotice(Resource):
    @auth.login_required
    def get(self):
        res = g.user.notice.all()
        notice = [{'content': i.notice.content,'title':i.notice.title, 'up_time':datetime.strftime(i.notice.up_time, "%Y-%m-%d")} for i in res]
        return jsonify({'code': 0, 'data': {'notice': notice}})

# 获取所有消息
# 删除所有该用户ID的消息
class RemoveAll(Resource):
    @auth.login_required
    def post(self):
        ns = g.user.notice.all()
        for i in ns:
            g.user.notice.remove(i)
        db.session.add(g.user)
        try:
            db.session.commit()
            return jsonify({'code': 0})
        except:
            db.session.rollback()
            return jsonify({'code': -1})
