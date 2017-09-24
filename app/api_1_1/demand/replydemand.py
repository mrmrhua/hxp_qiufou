from  flask import  session,jsonify,request,url_for
import  random
from flask_restful import Resource
from flask_login import current_user
from app.common import auth,send_mail_in_html,send_mail_in_text
import json
from app.models import User,db,Demand_User
from config import APPLYSTATUS,SEX,ADMIN_EMAIL

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



# 临时用
class TMPReplyDemand(Resource):
    def post(self):
        du = Demand_User.from_request_tmp(request)
        db.session.add(du)
        try:
            db.session.commit()
        except:
            db.session.rollback()
            return jsonify({'code': -1, 'data': {'msg': '保存失败'}})

        # 成功报价,发送通知邮件
        id = request.values.get("demand_id")
        text = '%r号需求收到报价' % id
        send_mail_in_text(ADMIN_EMAIL,'收到新的报价了',text)
        return jsonify({'code': 0})