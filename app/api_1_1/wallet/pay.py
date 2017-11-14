from  flask import jsonify,request,g,session
from flask_restful import Resource
from app.models import *
from app.common import auth,single_send,clientauth,getdesignername
import random
import time
import datetime
from config import ADMIN_TEL
from decimal import Decimal

# HTTP
# https://m.houxiaopang.com/api/v1.1/wxfwh/payrecord
# Get
# 支付记录
class PayRecord(Resource):
    @clientauth.login_required
    def get(self):
        project_id = request.values.get("project_id")
        cfs = CashFlow.query.filter_by(related_client = g.client.id,project_id=project_id).order_by(CashFlow.up_time.desc()).all()
        cashflow = [ {"remark":i.remark,
           "up_time":i.up_time.strf.strftime("%Y-%m-%d %H:%M:%S"),
           "status":i.status,
           "money":i.change_money,
           'detail':i.detail
           }  for i in cfs]
        return jsonify({"code":0,"data":{"cashflow":cashflow}})


# HTTP
# https://m.houxiaopang.com/api/v1.1/chargeapply
# POST
# 设计师发起收款

class ChargeApply(Resource):
    @auth.login_required
    def post(self):
        project_id = request.values.get("project_id")
        feetype = request.values.get("feetype")
        money = request.values.get("money")
        desc = request.values.get("desc")
        # 生成CASHFLOW数据
        when = datetime.datetime.now()
        cf = CashFlow(change_money=money,remark=feetype,related_user=g.user.id,status='申请中',project_id=project_id,when=when,detail=desc)
        db.session.add(cf)
        db.session.commit()
        return jsonify({"code":0})

# HTTP
# https://m.houxiaopang.com/api/v1.1/wxfwh/payinfo
# GET
# 获取支付账单

class GetClientRecord(Resource):
    @clientauth.login_required
    def get(self):
        project_id = request.values.get("project_id")
        cashflow_id  = request.values.get("cashflow_id")
        pro = Project.query.get(project_id)
        cf = CashFlow.query.get(cashflow_id)
        data = {"title":pro.title,
        "designer":getdesignername(pro.user_id),
        "feetype":cf.remark,
         "desc":cf.desc,
         "money":cf.change_money,
         "designer_id":pro.user_id
         }
        return jsonify({"code": 0,"data":data})


