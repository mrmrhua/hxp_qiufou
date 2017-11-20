from  flask import jsonify,request,g,session,Response
from flask_restful import Resource
from app.models import *
from app.common import auth,single_send,clientauth,getdesignername,decimal_default
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
        cashflow_id  = request.values.get("cashflow")
        pro = Project.query.get(project_id)
        cf = CashFlow.query.get(cashflow_id)
        data = {"title":pro.title,
        "designer":getdesignername(pro.user_id),
        "feetype":cf.remark,
         "desc":cf.detail,
         "money":decimal_default(cf.change_money),
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
    @clientauth.login_required
    def post(self):
        client_id = g.client.id
        dt = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        order_no = dt+str(100000+int(client_id))
        money = float(request.values.get("money"))
        # 单位：分
        amount = int(money * 100)
        # alipay_pc_direct  // alipay
        channel = request.values.get("channel")
        ip = request.remote_addr
        subject = request.values.get("subject")
        body = request.values.get("body")
        try:
            pingpp.api_key = live_key
            if current_app.debug:
                pingpp.private_key_path = '/Users/ding/dev/hxp/pingxxprivate.pem'
            else:
                pingpp.private_key_path = '/home/hxp/pingxxprivate.pem'
            charge = pingpp.Charge.create(
                order_no=order_no,  # 推荐使用 8-20 位，要求数字或字母，不允许其他字符 HXP100000+id
                amount=amount,  # 订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
                app=dict(id=pingxx_app_id),
                channel=channel,  # https://www.pingxx.com/api#支付渠道属性值
                currency='cny',
                client_ip=ip,  # 发起支付请求客户端的 IP 地址，格式为 IPV4，如: 127.0.0.1
                subject=subject,
                body=body,
                extra=dict(
                    # 必须，支付成功的回调地址，在本地测试不要写 localhost ，请写 127.0.0.1。URL 后面不要加自定义参数。
                    success_url='https://m.houxiaopang.com/demand/#/paysuccess',
                    # 可选，支付取消的回调地址， app_pay 为true时，该字段无效，在本地测试不要写 localhost ，请写 127.0.0.1。URL 后面不要加自定义参数。
                    # cancel_url='http://example.com/cancel',
                    # 可选，2016 年 6 月 16 日之前登录 Ping++ 管理平台填写支付宝手机网站的渠道参数的旧接口商户，需要更新接口时设置此参数值为true，6月16号后接入的新接口商户不需要设置该参数。
                    # new_version=True,
                    # 可选，是否使用支付宝客户端支付，该参数为true时，调用客户端支付。
                    app_pay=True,
                )
            )
            return jsonify({"code": 0,"data":{"charge":charge}})
        except Exception as e:
            return jsonify({"code": -1})





# http://www.houxiaopang.com/api/v1.1/pingxx/webhooks
# Post
# 接受PING++支付成功的回调
# 接收到 Webhooks 后需要返回服务器状态码 2xx 表示接收成功，否则请返回状态码 500

# 收到POST的JSON请求例子：
'''
{
    "id":"evt_qwertyuioplkjhgfdsazxcvb",
    "created":1440407617,
    "livemode":true,
    "type":"order.succeeded",
    "data":{
        "object":{
            "id":"2011609180000014351",
            "object":"order",
            "created":1474181699,
            "livemode":true,
            "paid":true,
            "refunded":true,
            "status":"refunded",
            "app":"app_LibTW1n1xxxxxxxx",
            "uid":"uid@pingxx.com",
            "merchant_order_no":"AO1474181696078",
            "type":"purchase",
            "amount":10,
            "coupon_amount":0,
            "balance_amount":0,
            "charge_amount":10,
            "amount_refunded":10,
            "currency":"cny",
            "subject":"商品简介",
            "body":"详细描述",
            "client_ip":"206.3.161.110",
            "time_paid":1474181751,
            "time_expire":1474182006,
            "refunds":{
                "object":"list",
                "url":"/v1/orders/2011609180000014351/refunds",
                "has_more":false,
                "data":[
                    {
                        "id":"2111609180000002442",
                        "object":"order_refund",
                        "order":"2011609180000014351",
                        "app":"app_LibTW1n1xxxxxxxx",
                        "uid":"uid@pingxx.com",
                        "merchant_order_no":"AO1474181696078",
                        "amount":10,
                        "coupon_amount":0,
                        "balance_amount":0,
                        "charge_amount":10,
                        "coupon":null,
                        "balance_transaction":null,
                        "charge_refund":"re_nHifjPKyvPOGafzTXXXXXXXX",
                        "status":"succeeded",
                        "created":1474181823,
                        "time_succeed":1474181822,
                        "description":"订单的退款",
                        "metadata":{
                            "userStr":"KTs/YDg3ZFUFONZUC10SuA=="
                        },
                        "extra":{
                        }
                    }
                ]
            },
            "charge":"ch_CKe9COm58SK0SKy1qD9mfXDG",
            "balance_transaction":null,
            "coupon":null,
            "description":"商品详情",
            "metadata":{
                "userStr":"KTs/YDg3ZFUFONZUC10SuA=="
            },
            "charge_essentials":{
                "channel":"alipay_qr",
                "transaction_no":"2016091821001004850xxxxxxxxx",
                "credential":{
                    "object":"credential",
                    "alipay_qr":"https://qr.alipay.com/xxxxxxxxxx"
                },
                "extra":{
                    "buyer_account":"user@qq.com"
                }
            }
        }
    },
    "object":"event",
    "request":"iar_TqvPiDH8SGeHm5GaTKbLuDW",
    "pending_webhooks":8
}
'''

# 支付成功后后台收到webhooks
# 更改状态为已支付，并通知管理员
# todo
class GetPayHooks(Resource):
    def post(self):
        try:
            type = request.json.get("type")
            if type== "order.succeeded":
                pass
            return Response(status=200)
        except:
            return Response(status=500)
