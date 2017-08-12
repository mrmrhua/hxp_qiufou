
from  flask import  request,jsonify,current_app,session,g
from flask_restful import Resource
from app.models import Applyform,Category,Applywork,User
from app import db,mail
from app.common import send_admin_email,send_designer_email,send_apply_email_to_admin
import json
from flask_login import current_user
from config import APPLYSTATUS
from app.common import  support_jsonp,auth
from flask_login import current_user

class PostApply(Resource):
    @auth.login_required
    def post(self):
        current_app.logger.info('新收到入驻申请:%s' % request)
        af = Applyform.personal_from_request(request)
        db.session.add(af)
        # 修改状态
        session['applystatus'] = APPLYSTATUS['CHECKING']
        g.user.applystatus = APPLYSTATUS['CHECKING']
        g.user.usertype = 0  #申请类型:个人
        db.session.add(g.user)
        #数据库中改动applyform
        try:
            db.session.commit()
        except:
            db.session.rollback()
            return jsonify({'code': -1})

        # 插入品类
        cats = json.loads(request.form.get('category'))
        for i in cats:
            af.add_categories(i)
            db.session.add(af)
        db.session.commit()
        imgurl = json.loads(request.form.get('img_url'))

        for w in imgurl:
            aw = Applywork(work_url=w,apply_id=af.id)
            db.session.add(aw)
        try:
            db.session.commit()
        except:
            db.session.rollback()
            return jsonify({'code': -1})
        current_app.logger.info('新入驻设计师:%s' % af.name)
        # 通知
        name = request.form.get('name')
        send_apply_email_to_admin(name=name)
        send_designer_email(request.form.get('email'), '我们已收到了您的入驻申请')
        return jsonify({'code':0})
