from  flask import  session,jsonify,request,url_for
import  random
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp,get_access_token,get_user_info,get_wx_head
import json
from app.model import User,db,Demand
import datetime
from config import APPLYSTATUS,SEX

class GetDemandCenter(Resource):
    def get(self):
        ask_category = int(request.values.get("category"))
        page = int(request.values.get("page"))
        PER_PAGE = 15
        if ask_category == -1:
            dm = Demand.query.paginate(page, PER_PAGE, False).items
        else:
            dm = Demand.query.filter_by(category=ask_category).paginate(page,PER_PAGE,False).items
        demand= []
        for i in dm:
            each_d = {
                'category':i.category,
                'description':i.description,
                'up_time':i.up_time.strftime("%Y-%m-%d %H:%M:%S"),
                'title':i.title,
                'demand_id' :i.id
            }
            demand.append(each_d)
        return jsonify({'code': 0,'data':{'demand':demand}})
