from  flask import  session,jsonify,request,url_for
import  random
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp,get_access_token,get_user_info,get_wx_head
import json
from app.model import User,db
from config import APPLYSTATUS,SEX

class GetDemandCenter(Resource):
    def get(self):
        ask_category = request.values.get("category")
        return jsonify({'code':0,
                        'demand':[
                            { 'category':0,'description':"无1",'up_time':"2017-7-30 18:00:00",'title':'title1'},
                            {'category': 0, 'description': "无2", 'up_time': "2017-7-30 18:20:00",'title':'title2'}
                        ]
                        })