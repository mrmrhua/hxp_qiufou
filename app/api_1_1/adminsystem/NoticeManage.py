from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
from app.models import User,db,Notice,Subscribtion


# 管理员发送消息
class SendNotice(Resource):
    def post(self):
        # 密码正确
        if request.values.get("pw") == 'houxiaopang666':
            title = request.values.get("title")
            content = request.values.get("content")
            n = Notice.NewNotice(title,content)
            db.session.add(n)
            db.session.flush()
            r_id = request.values.get("receiver_id")
            if r_id: #指定发送
                u = User.query.filter_by(id=r_id).first()
                sub = Subscribtion(isread=0)
                n.receiver.append(sub)
                u.notice.append(sub)
                db.session.add(sub)
                db.session.commit()
            else: #群发
                us = User.query.filter_by(applystatus=2).all()
                for i in us:
                    sub = Subscribtion(isread=0)
                    n.receiver.append(sub)
                    i.notice.append(sub)
                    db.session.add(sub)
                db.session.commit()
            return jsonify({'code': 0})
        return jsonify({'code': -1})


class ListNews(Resource):
    pass