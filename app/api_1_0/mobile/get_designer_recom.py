import json
from functools import wraps
from flask import redirect, request, current_app,jsonify
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp



class GetDesignerRecom(Resource):
    def get(self):
        return jsonify({'title': '求否PPT制作'
                          ,'designers':[{
                'hedaimg':'http://userhead.houxiaopang.com/ovS1y1QNqRbuMENMA4Jbxj45SJHs.jpg',
                'nickname':'ding',
               'description':'浙大毕业',
             'work':['http://work.houxiaopang.com/lixiaoling/2.jpg',
                     'http://work.houxiaopang.com/o_1be0qqj4s1eek1m353731i1ntr37.png',
                     'http://work.houxiaopang.com/o_1be0rg985h8jn6q1pfrru51j3u9.png'],
                    'price':2000

            },{
                'hedaimg':'http://userhead.houxiaopang.com/ovS1y1QNqRbuMENMA4Jbxj45SJHs.jpg',
                'nickname':'ding',
               'description':'浙大毕业',
             'work':['http://work.houxiaopang.com/lixiaoling/2.jpg',
                     'http://work.houxiaopang.com/o_1be0qqj4s1eek1m353731i1ntr37.png',
                     'http://work.houxiaopang.com/o_1be0rg985h8jn6q1pfrru51j3u9.png'],
                    'price':2000

            }]

                        }
                       )
