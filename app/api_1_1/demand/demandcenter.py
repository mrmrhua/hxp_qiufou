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
       # text = '【猴小胖】有客户发布了新的设计需求。类型为%s，客户称呼为%s，请尽快查看' %(cat,name)
        text = '【猴小胖】有客户%s发布了新的设计需求。请尽快查看通知邮件。' %  name
        r = single_send(mobile=ADMIN_TEL,text=text)
        email =  '【猴小胖】有客户发布了新的设计需求。类型为%s，客户称呼为%s，微信号为%s, 发布时间为%s,请尽快查看' %(cat,name,wxnum,now)
        send_admin_email(ADMIN_EMAIL,'有新需求',email)
        return jsonify({"code":0})




class SendSms(Resource):
    def get(self):
        from app.common import single_send
        tel = '15700079780'
        text = '【猴小胖】［猴小胖设计为您匹配了一个项目］微信h5设计，时间较紧12.5日出初稿。报价请进http://www.houxiaopang.com/demand/#/detail/9。报价截止时间12.3日晚6点'
        r = single_send(tel, text=text)
        print(r)