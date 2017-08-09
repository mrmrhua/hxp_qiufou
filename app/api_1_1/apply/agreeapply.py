from  flask import  session,jsonify,request,url_for
import  random
from flask_restful import Resource
from flask_login import current_user,login_user
from app.common import  support_jsonp,get_access_token,get_user_info,get_wx_head
import json
from app.models import User,db,Applyform,DesignerInfo,Category_User
from config import APPLYSTATUS,SEX
from app.common import auth

# 这个接口需要做好安全防范
# 最好加密码


# 把APPLYSTATUS设为2
# 复制到表designer
class AgreeApply(Resource):
    def post(self):
        apply_id = request.values.get("apply_id")
        af = Applyform.query.filter_by(id=apply_id).first()
        UserExist = DesignerInfo.query.filter_by(user_id=af.user.id).first()
        if UserExist:
            return jsonify({'code': -1,'data':{'msg':"已存在"}})
        u = af.user
        u.applystatus = APPLYSTATUS['PASS']
        di = DesignerInfo.from_apply(af)
        cus = Category_User.from_apply(af)
        db.session.add(u)
        db.session.add(di)
        for i in cus:
            db.session.add(i)
        db.session.commit()
        return jsonify({'code':0})



