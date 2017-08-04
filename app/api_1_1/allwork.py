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


#获取最近的album
class GetAllWork(Resource):
    def get(self):
        cat = request.values.get("category")
        if not cat:
            return jsonify({'code':-1})
        # 根据category取album,按up_time排序

        # 根据album的USERID去USER表取nickname,headimg
        return jsonify({
            'code':0,
            'data':{
                'album':[
                    {'cover':'http://work.houxiaopang.com/FljvySgtb1zs45jg5wrUxZ78UL1V',
                    'title':'猴小胖页面设计', 'username':'ding','headimg':'http://userhead.houxiaopang.com/ovS1y1QNqRbuMENMA4Jbxj45SJHs.jpg',
                     'up_time':'2017-08-01 17:17:53','user_id':22,'category':1,'work_id':1},
                    {'cover': 'http://work.houxiaopang.com/FljvySgtb1zs45jg5wrUxZ78UL1V',
                     'title': '猴小胖页面设计', 'username': 'ding',
                     'headimg': 'http://userhead.houxiaopang.com/ovS1y1QNqRbuMENMA4Jbxj45SJHs.jpg',
                     'up_time': '2017-08-01 17:17:53', 'user_id': 22, 'category': 1,'work_id':1},
                    {'cover': 'http://work.houxiaopang.com/FljvySgtb1zs45jg5wrUxZ78UL1V',
                     'title': '猴小胖页面设计', 'username': 'ding',
                     'headimg': 'http://userhead.houxiaopang.com/ovS1y1QNqRbuMENMA4Jbxj45SJHs.jpg',
                     'up_time': '2017-08-01 17:17:53', 'user_id': 22, 'category': 1,'work_id':1},
                    {'cover': 'http://work.houxiaopang.com/FljvySgtb1zs45jg5wrUxZ78UL1V',
                     'title': '猴小胖页面设计', 'username': 'ding',
                     'headimg': 'http://userhead.houxiaopang.com/ovS1y1QNqRbuMENMA4Jbxj45SJHs.jpg',
                     'up_time': '2017-08-01 17:17:53', 'user_id': 22, 'category': 1,'work_id':1},
                    {'cover': 'http://work.houxiaopang.com/FljvySgtb1zs45jg5wrUxZ78UL1V',
                     'title': '猴小胖页面设计', 'username': 'ding',
                     'headimg': 'http://userhead.houxiaopang.com/ovS1y1QNqRbuMENMA4Jbxj45SJHs.jpg',
                     'up_time': '2017-08-01 17:17:53', 'user_id': 22, 'category': 1,'work_id':1},
                    {'cover': 'http://work.houxiaopang.com/FljvySgtb1zs45jg5wrUxZ78UL1V',
                     'title': '猴小胖页面设计', 'username': 'ding',
                     'headimg': 'http://userhead.houxiaopang.com/ovS1y1QNqRbuMENMA4Jbxj45SJHs.jpg',
                     'up_time': '2017-08-01 17:17:53', 'user_id': 22, 'category': 1,'work_id':1}

                ]
            }
        })
