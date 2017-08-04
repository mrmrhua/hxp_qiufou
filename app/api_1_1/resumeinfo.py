from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp,get_access_token,get_user_info,get_wx_head
import json
from app.model import User,db
from config import APPLYSTATUS,SEX
from app.common import auth
from app.model import Album,Designwork,Applyform,User,Category,Applywork
from datetime import datetime


#获取简历页的个人信息
class GetResumeInfo(Resource):
    def get(self):
        designer_id = request.values.get("designer_id")
        if not designer_id:
            return jsonify({'code':-1})
        return jsonify({
            'code':0,
            'data':{
                'nickname':'ding',
                'headimg':'http://oq1ggqulx.bkt.clouddn.com/ovS1y1Vqw39isV1itE1fv2eBRZPo.jpg',
                'city':'河北省石家庄市长安区',
                'exp':'',
                'filed':['宣传画册','吉祥物设计','包装设计','书报刊插画'],
                'worktime':["3","5"],
                'project_text':'浙江科技浙江科技浙江科技浙江科技浙江科技浙江科技浙江科技浙江科技浙江科技浙江科技'
            }
        })