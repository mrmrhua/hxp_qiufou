from  flask import  session,jsonify,request,url_for
import  random
from flask_restful import Resource
from app.models import User,db,Demand
from config import ADMIN_TEL,ADMIN_EMAIL
from app.common import send_admin_email,single_send
import datetime
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



# 客户提交了咨询意向表单
class ClientPostDemand(Resource):
    def post(self):
        cat = request.values.get("cat")
        name = request.values.get("name")
        wxnum = request.values.get("wxnum")
        now = (datetime.datetime.now()).strftime("%Y-%m-%d %H:%M:%S")
        # 给管理员发短信
        text = '【猴小胖】有客户发布了新的设计需求。类型:%s，客户称呼：%s，微信号：%s，发布时间：%s' %(cat,name,wxnum,now)
        r = single_send(mobile=ADMIN_TEL,text=text)
        # send_admin_email(ADMIN_EMAIL,'有新需求',text)
        return jsonify({"code":0})

