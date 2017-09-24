from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp,get_access_token,get_user_info,get_wx_head
import json
from app.models import User,db
from config import APPLYSTATUS,SEX
from app.common import auth,adminauth
from app.models import Album,Designwork,Applyform,User,Category,Applywork
from datetime import datetime


class GetApplyinfo(Resource):
    @adminauth.login_required
    def get(self):
        us = User.query.filter_by(applystatus=1).all()
        applyer = []
        for i in us:
            af = i.applyform[-1]
            applywork = [ t.work_url  for t in af.applyworks]
            category = [ t.category_name  for t in af.categories.all()]
            applyer.append({'apply_id':af.id,
            'name':af.name,
            'city':af.city,
            'school':af.school,
            'graduate':af.graduate,
            'project_text':af.project_text,
            'blog_url':af.blog_url,
            'identity':af.identity,
             'applywork':applywork,
             'category':category
             })
        return jsonify({'code':0,'data':applyer})