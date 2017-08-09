from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp,get_access_token,get_user_info,get_wx_head
import json
from app.models import User,db
from config import APPLYSTATUS,SEX
from app.common import auth
from app.models import Album,Designwork,Applyform,User,Category,Applywork
from datetime import datetime


#获取最近的album
class GetApplyinfo(Resource):
    def get(self):
        m = db.session().query(User,Applyform).filter_by(applystatus=1).all()

        #  m = User.query.filter_by(applystatus=1).join(Applyform, User.unionid == Applyform.unionid).add_columns(
        #     Applyform.id, Applyform.name, Applyform.tel, Applyform.email, Applyform.qq, Applyform.wx, Applyform.school,
        #     Applyform.major, Applyform.graduate, Applyform.project_text, Applyform.blog_url, Applyform.identity,
        #     Applyform.city, Applyform.worktime, Applyform.identity).all()
        data = []
        # print(m)
        for item in m:
            c = Category.query.filter_by(apply_id=item.Applyform.id).all()
            category = []
            for i in c:
                category.append(i.category_name)
            applywork=[]
            a = Applywork.query.filter_by(apply_id=item.Applyform.id).all()
            for i in a:
                applywork.append(i.work_url)
            designer={
                'nickname':item.User.nickname,
                'id':item.User.id,
                'name':item.Applyform.name,
                'tel':item.Applyform.tel,
                'email':item.Applyform.email,
                'qq':item.Applyform.qq,
                'wx':item.Applyform.wx,
                'city':item.Applyform.city,
                'school':item.Applyform.school,
                'major':item.Applyform.major,
                'graduate':item.Applyform.graduate,
                'project_text':item.Applyform.project_text,
                'blog_url':item.Applyform.blog_url,
                'worktime':item.Applyform.worktime,
                'identity':item.Applyform.identity,
                'category':category,
                'applywork':applywork
            }
            data.append(designer)
        return jsonify({'code':0,'data':data})