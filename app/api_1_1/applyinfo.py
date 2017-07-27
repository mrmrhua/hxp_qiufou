from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp,get_access_token,get_user_info,get_wx_head
import json
from app.model import User,db
from config import APPLYSTATUS,SEX
from app.common import auth
from app.model import Album,Designwork,Applyform,User
from datetime import datetime


#获取最近的album
class GetApplyinfo(Resource):
    def get(self):
        m = User.query.filter_by(applystatus=1).join(Applyform,User.unionid==Applyform.unionid).add_columns(Applyform.name,Applyform.tel,Applyform.email,Applyform.qq,Applyform.wx,Applyform.school,Applyform.major,Applyform.graduate,Applyform.project_text,Applyform.blog_url,Applyform.identity,Applyform.city,Applyform.worktime,Applyform.identity).all()
        for item in m:
            designer={
                'nickname':item.User.nickname,
                'id':item.User.id,
                'name':item.name,
                'tel':item.tel,
                'email':item.email,
                'qq':item.qq,
                'wx':item.wx,
                'city':item.city,
                'school':item.school,
                'major':item.major,
                'graduate':item.graduate,
                'project_text':item.project_text,
                'blog_url':item.blog_url,
                'worktime':item.worktime,
                'identity':item.identity,

            }

        print(designer)
        return jsonify({'code':0})