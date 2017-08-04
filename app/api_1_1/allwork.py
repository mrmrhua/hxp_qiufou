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



class GetAllWork(Resource):
    def get(self):

        # 类目
        cat = request.values.get("category")
        if not cat:
            return jsonify({'code':-1})

        designer_id = request.values.get("designer_id")
        if not designer_id:  #没有ID, 返回全部的
            pass

        # 第几页
        page = request.values.get("page")
        if not page:
            pass

        # 每页数量
        num = request.values.get("num")
        if not num:
            num = 20



        # 去数据库中取这个品类\PAGE

        # 根据category取album,按up_time排序
        if cat=='-1':
        # 根据album的USERID去USER表取nickname,headimg
            return jsonify({
            'code':0,
            'data':{
                'album':[
                    {'cover':'http://work.houxiaopang.com/FljvySgtb1zs45jg5wrUxZ78UL1V',
                    'title':'猴小胖页面设计', 'username':'ding','headimg':'http://userhead.houxiaopang.com/ovS1y1QNqRbuMENMA4Jbxj45SJHs.jpg',
                     'up_time':'2017-08-01 17:17:53','user_id':22,'category':2,'work_id':1},
                    {'cover': 'http://work.houxiaopang.com/FljvySgtb1zs45jg5wrUxZ78UL1V',
                     'title': '猴小胖页面设计', 'username': 'ding',
                     'headimg': 'http://userhead.houxiaopang.com/ovS1y1QNqRbuMENMA4Jbxj45SJHs.jpg',
                     'up_time': '2017-08-01 17:17:53', 'user_id': 22, 'category': 1,'work_id':1},
                    {'cover': 'http://work.houxiaopang.com/FljvySgtb1zs45jg5wrUxZ78UL1V',
                     'title': '猴小胖页面设计', 'username': 'ding',
                     'headimg': 'http://userhead.houxiaopang.com/ovS1y1QNqRbuMENMA4Jbxj45SJHs.jpg',
                     'up_time': '2017-08-01 17:17:53', 'user_id': 22, 'category': 4,'work_id':1},
                    {'cover': 'http://work.houxiaopang.com/FljvySgtb1zs45jg5wrUxZ78UL1V',
                     'title': '猴小胖页面设计', 'username': 'ding',
                     'headimg': 'http://userhead.houxiaopang.com/ovS1y1QNqRbuMENMA4Jbxj45SJHs.jpg',
                     'up_time': '2017-08-01 17:17:53', 'user_id': 22, 'category': 2,'work_id':1},
                    {'cover': 'http://work.houxiaopang.com/FljvySgtb1zs45jg5wrUxZ78UL1V',
                     'title': '猴小胖页面设计', 'username': 'ding',
                     'headimg': 'http://userhead.houxiaopang.com/ovS1y1QNqRbuMENMA4Jbxj45SJHs.jpg',
                     'up_time': '2017-08-01 17:17:53', 'user_id': 22, 'category': 1,'work_id':1},
                    {'cover': 'http://work.houxiaopang.com/FljvySgtb1zs45jg5wrUxZ78UL1V',
                     'title': '猴小胖页面设计', 'username': 'ding',
                     'headimg': 'http://userhead.houxiaopang.com/ovS1y1QNqRbuMENMA4Jbxj45SJHs.jpg',
                     'up_time': '2017-08-01 17:17:53', 'user_id': 22, 'category': 5,'work_id':1}

                ]
            }
        })
        elif cat=='1':
            return jsonify({
                'code': 0,
                'data': {
                    'album': [
                        {'cover': 'http://work.houxiaopang.com/Fp2CeTKS2COElLXk1Rj1graAr6ZV',
                         'title': 'PPT项目', 'username': 'ding',
                         'headimg': 'http://userhead.houxiaopang.com/ovS1y1X5otcOS9j3ZFbKt00e8IMA.jpg',
                         'up_time': '2017-07-01 17:17:53', 'user_id': 22, 'category': 1, 'work_id': 1},
                        {'cover': 'http://work.houxiaopang.com/Fp2CeTKS2COElLXk1Rj1graAr6ZV',
                         'title': 'PPT项目', 'username': 'ding',
                         'headimg': 'http://userhead.houxiaopang.com/ovS1y1X5otcOS9j3ZFbKt00e8IMA.jpg',
                         'up_time': '2017-07-01 17:17:53', 'user_id': 22, 'category': 1, 'work_id': 1},
                        {'cover': 'http://work.houxiaopang.com/Fp2CeTKS2COElLXk1Rj1graAr6ZV',
                         'title': 'PPT项目', 'username': 'ding',
                         'headimg': 'http://userhead.houxiaopang.com/ovS1y1X5otcOS9j3ZFbKt00e8IMA.jpg',
                         'up_time': '2017-07-01 17:17:53', 'user_id': 22, 'category': 1, 'work_id': 1},
                        {'cover': 'http://work.houxiaopang.com/Fp2CeTKS2COElLXk1Rj1graAr6ZV',
                         'title': 'PPT项目', 'username': 'ding',
                         'headimg': 'http://userhead.houxiaopang.com/ovS1y1X5otcOS9j3ZFbKt00e8IMA.jpg',
                         'up_time': '2017-07-01 17:17:53', 'user_id': 22, 'category': 1, 'work_id': 1},
                        {'cover': 'http://work.houxiaopang.com/Fp2CeTKS2COElLXk1Rj1graAr6ZV',
                         'title': 'PPT项目', 'username': 'ding',
                         'headimg': 'http://userhead.houxiaopang.com/ovS1y1X5otcOS9j3ZFbKt00e8IMA.jpg',
                         'up_time': '2017-07-01 17:17:53', 'user_id': 22, 'category': 1, 'work_id': 1},
                        {'cover': 'http://work.houxiaopang.com/Fp2CeTKS2COElLXk1Rj1graAr6ZV',
                         'title': 'PPT项目', 'username': 'ding',
                         'headimg': 'http://userhead.houxiaopang.com/ovS1y1X5otcOS9j3ZFbKt00e8IMA.jpg',
                         'up_time': '2017-07-01 17:17:53', 'user_id': 22, 'category': 1, 'work_id': 1},{'cover': 'http://work.houxiaopang.com/Fp2CeTKS2COElLXk1Rj1graAr6ZV',
                         'title': 'PPT项目', 'username': 'ding',
                         'headimg': 'http://userhead.houxiaopang.com/ovS1y1X5otcOS9j3ZFbKt00e8IMA.jpg',
                         'up_time': '2017-07-01 17:17:53', 'user_id': 22, 'category': 1, 'work_id': 1}
                    ]
                }
            })
        else:
            return jsonify({
                'code': 0,
                'data': {
                    'album': [
                        {'cover': 'http://work.houxiaopang.com/FjHkT8-cmDW-aOJmgzHeiyxw-WpJ',
                         'title': 'UI设计', 'username': 'WU',
                         'headimg': 'http://userhead.houxiaopang.com/ovS1y1eqGJuYTLmesIuyEY5d4Ttg.jpg',
                         'up_time': '2017-05-01 17:17:53', 'user_id': 22, 'category': 2, 'work_id': 1},
                        {'cover': 'http://work.houxiaopang.com/FjHkT8-cmDW-aOJmgzHeiyxw-WpJ',
                         'title': 'UI设计', 'username': 'WU',
                         'headimg': 'http://userhead.houxiaopang.com/ovS1y1eqGJuYTLmesIuyEY5d4Ttg.jpg',
                         'up_time': '2017-05-01 17:17:53', 'user_id': 22, 'category': 2, 'work_id': 1},
                        {'cover': 'http://work.houxiaopang.com/FjHkT8-cmDW-aOJmgzHeiyxw-WpJ',
                         'title': 'UI设计', 'username': 'WU',
                         'headimg': 'http://userhead.houxiaopang.com/ovS1y1eqGJuYTLmesIuyEY5d4Ttg.jpg',
                         'up_time': '2017-05-01 17:17:53', 'user_id': 22, 'category': 2, 'work_id': 1},

                    ]
                }
            })
