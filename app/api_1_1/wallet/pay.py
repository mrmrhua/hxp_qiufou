from  flask import jsonify,request,g,session
from flask_restful import Resource
from app.models import *
from app.common import auth,single_send,clientauth,getdesignername
import random
import time
import datetime
from config import ADMIN_TEL,live_key,test_key,pingxx_app_id
from decimal import Decimal
import pingpp

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
        cf = CashFlow(change_money=money,remark=feetype,related_user=g.user.id,status='收款申请中',project_id=project_id,when=when,detail=desc)
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



# HTTP
# https://m.houxiaopang.com/api/v1.1/wxfwh/getalipaycharge
# Post
# 支付宝付款,返回PING＋＋的charge
# 手机端付款

#   channel: alipay	支付宝 APP 支付
#            alipay_wap	支付宝手机网页支付
class GetAlipayCharge(Resource):
    def post(self):
        order_no = request.values.get("order_no")
        money = request.values.get("money")
        # 单位：分
        amount = money * 100
        # alipay_pc_direct  // alipay
        channel = request.values.get("channel")
        ip = request.remote_addr
        subject = request.values.get("subject")
        body = request.values.get("body")
        try:
            charge = pingpp.Charge.create(
                order_no=order_no,  # 推荐使用 8-20 位，要求数字或字母，不允许其他字符 HXP100000+id
                amount=amount,  # 订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
                app=dict(id=pingxx_app_id),
                channel=channel,  # https://www.pingxx.com/api#支付渠道属性值
                currency='cny',
                client_ip=ip,  # 发起支付请求客户端的 IP 地址，格式为 IPV4，如: 127.0.0.1
                subject=subject,
                body=body,
            )
            return jsonify({"code": 0,"data":{"charge":charge}})
        except Exception as e:
            return jsonify({"code": -1})


