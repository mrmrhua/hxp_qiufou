
from  flask import  request,jsonify,current_app,session
from flask_restful import Resource
from app.model import Applyform,Category,Applywork
from app import db,mail
from app.common import send_admin_email,send_designer_email,send_apply_email_to_admin
import json
from flask_login import current_user
from config import APPLYSTATUS
from app.common import  support_jsonp
from flask_login import current_user

class Applyinfo(Resource):
    def post(self):
        #记录申请
        current_app.logger.info('新收到入驻申请:%s' % request)
        af = Applyform.from_request(request)
        db.session.add(af)
        # 修改状态
        session['applystatus'] = APPLYSTATUS['CHECKING']
        current_user.applystatus = APPLYSTATUS['CHECKING']
        db.session.add(current_user)
        #数据库中改动applyform
        try:
            db.session.commit()
        except:
            db.session.rollback()

        c = json.loads(request.form.get('category'))
        imgurl = json.loads(request.form.get('img_url'))
        for t in c:
            c = Category(category_name=t,apply_id=af.id)
            db.session.add(c)
        for w in imgurl:
            aw = Applywork(work_url=w,apply_id=af.id)
            db.session.add(aw)
        try:
            db.session.commit()
        except:
            db.session.rollback()

        current_app.logger.info('新入驻设计师:%s' % af.name)
        # 通知
        name = request.form.get('name')
        send_apply_email_to_admin(name=name)
        send_designer_email(request.form.get('email'), '我们已收到了您的入驻申请')
        return jsonify({'code':0})
