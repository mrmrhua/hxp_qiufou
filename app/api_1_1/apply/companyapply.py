
from  flask import  request,jsonify,current_app,session,g
from flask_restful import Resource
from app.models import Applyform,Category,Applywork
from app import db,mail
from app.common import send_admin_email,send_designer_email,send_apply_email_to_admin,single_send
import json
from flask_login import current_user
from config import APPLYSTATUS,ADMIN_TEL
from app.common import  support_jsonp,auth
from flask_login import current_user

class NewCompanyPostApply(Resource):
    @auth.login_required
    def post(self):
        #记录申请
        current_app.logger.info('新收到入驻申请:%s' % request)
        af = Applyform.company_from_request_new(request)
        db.session.add(af)
        # try:
        #     db.session.commit()
        # except Exception as e:
        #     db.session.rollback()
        #     return jsonify({'code': -1})
        db.session.flush()

        # 修改状态
        session['applystatus'] = APPLYSTATUS['CHECKING']
        g.user.applystatus = APPLYSTATUS['CHECKING']
        g.user.usertype = 1  # 申请类型:公司
        db.session.add(g.user)
        #数据库中改动applyform
        # try:
        #     db.session.commit()
        # except Exception as e:
        #     db.session.rollback()
        #     return jsonify({'code': -1})
        db.session.flush()
        imgurl = json.loads(request.form.get('img_url'))
        for w in imgurl:
            aw = Applywork(work_url=w,apply_id=af.id)
            db.session.add(aw)
        # try:
        #     db.session.commit()
        # except:
        #     db.session.rollback()
        #     return jsonify({'code': -1})
        db.session.commit()
        current_app.logger.info('新入驻设计师:%s' % af.name)
        # 通知
        name = request.form.get('name')
        send_apply_email_to_admin(name=name)
        send_designer_email(request.form.get('email'), '我们已收到了您的入驻申请')
        # 通知管理员
        text = '【猴小胖】有设计师%s申请入驻，请尽快处理' % name
        single_send(ADMIN_TEL, text)
        return jsonify({'code':0})
