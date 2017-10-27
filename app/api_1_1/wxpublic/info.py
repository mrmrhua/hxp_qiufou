from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
from app.models import *
from app.common import adminauth



class WX_Userinfo(Resource):
    def get(self):
        uid= request.values.get("uid")
        if not uid:
            return -1
        # 找到人，返回信息
        u = User.query.filter_by(unionid=uid).first()
        if not u:
            return -1
        g.user = u
        info = u.info
        return jsonify({
            'code':0,
            'data':{'usertype':u.usertype,
                'basic':{
                    'nickname':u.nickname,
                    'headimg' :u.headimg,
                    'sex':u.sex,
                    'startyear':info.startyear,
                    'school':info.school,
                    'city':info.city,
                    'tel':info.tel,
                    'email':info.email,
                },
                'worksetting':{
                    'worktime':info.worktime,
                    'category':u.get_categories_str(),
                    'tag':u.get_tags_str(),
                    'exp':u.get_exps_str(),
                    'privacy':info.privacy,
                    'ticket':info.ticket,
                },

            }
        })