from  flask import jsonify,request,g,session
from flask_restful import Resource
from app.models import *
from app.common import auth,single_send
import random
import time
import datetime
from config import ADMIN_TEL



# 查看钱包信息
class WalletInfo(Resource):
    @auth.login_required
    def get(self):
        wa = Wallet.query.filter_by(user_id=g.user.id).first()
        if not wa:
            return jsonify({"code":-1,"msg":"钱包无法访问"})
        return jsonify({"code":0,"data":{
            "money":wa.money,
            'frozen_money':wa.frozen_money,
            "hasAlipay":  (wa.alipay!=None),
            'alipay':wa.alipay,

            'tel':wa.tel,
            'name':wa.name
        }})


# 查看流水
class GetCashFlow(Resource):
    @auth.login_required
    def get(self):
        cf = CashFlow.query.filter_by(related_user=g.user.id).order_by(CashFlow.when.desc()).all()
        cashflow = [{
            "change_money": i.change_money,
            "remark": i.remark,
            "when": i.when.strftime("%Y-%m-%d %H:%M:%S"),
            "status": i.status
        } for i in cf]

        if not cf:
            return jsonify({"code":-1,"msg":"钱包无法访问"})
        return jsonify({"code":0,"data":{
           "cashflow":cashflow
        }})



# 发送手机验证码
class VerifySend(Resource):
    @auth.login_required
    def get(self):
        tel = request.values.get("tel")

        # 生成4位随机数字
        code  =str(random.randint(1000,9999))
        print(code)
        # 存session
        session["phoneVerifyCode"] = {"time":datetime.datetime.now(), "code":code}
        # 发验证码
        # todo
        text = '【猴小胖】您的验证码是%s。如非本人操作，请忽略本短信' % code
        # r = single_send(mobile=tel,text=text)
        r= 0
        if r==0:
          return jsonify({"code":0})
        else:
            return jsonify({"code":-1})


# 验证手机验证码
def VerifyCode(tel,code):
        tel = request.values.get("tel")
        code = request.values.get("code")
        if (not code) or(not tel):
            return -2
        now = datetime.datetime.now()
        if 'phoneVerifyCode' not in session:
            return -2
        if session["phoneVerifyCode"].get("code") == code:
            if now - session["phoneVerifyCode"].get("time") <=datetime.timedelta(minutes=+5):
                # 清空session
                session.pop('phoneVerifyCode')
                return 0
                # return jsonify({"code":0})
            else:
                # return jsonify({"code":-1,'msg':'验证码超时，请重试'})
                return -1
        else:
            # return jsonify({"code": -1, 'msg': '验证码错误，请重试'})
            return -2



# 绑定支付宝
class BindAlipay(Resource):
    @auth.login_required
    def post(self):
        tel = request.values.get("tel")
        alipay  = request.values.get("alipay")
        code = request.values.get("code")
        name = request.values.get("name")
        if (not tel) or(not alipay)or(not name):
            return jsonify({"code": -1})
        r = VerifyCode(tel, code)
        if r==-1:
            return jsonify({"code": -1, 'msg': '验证码超时，请重试'})
        elif r==-2:
            return jsonify({"code": -1, 'msg': '验证码错误，请重试'})
        wa = g.user.wallet
        if not wa:
            return jsonify({"code": -1})
        wa.alipay = alipay
        wa.tel = tel
        wa.name = name
        db.session.add(wa)
        db.session.commit()
        return jsonify({"code": 0})


# 提现申请
class WithdrawApply(Resource):
    @auth.login_required
    def post(self):
        money = request.values.get("money")
        tel = request.values.get("tel")
        code = request.values.get("code")
        r = VerifyCode(tel, code)
        if r == -1:
            return jsonify({"code": -1, 'msg': '验证码超时，请重试'})
        elif r == -2:
            return jsonify({"code": -1, 'msg': '验证码错误，请重试'})
        elif r !=0:
            return jsonify({"code":-1})
        if (g.user.wallet.money < float(money)) or (float(money)==0)  or (g.user.wallet.money==0) :
            return jsonify({"code":-1,"msg":"余额不足"})
        # 发条短信通知管理员
        username= g.user.nickname
        tel = g.user.wallet.tel
        alipay = g.user.wallet.alipay
        text = '【猴小胖】有用户%s申请提现%s元，对方联系电话是%s，提现账号是%s，请尽快处理' % (username,money,tel,alipay)
        # todo
        # single_send(mobile=ADMIN_TEL, text=text)
        after_money= g.user.wallet.money-float(money)
        cf = CashFlow(change_money=money,after_money=after_money,remark='提现',from_who='设计师钱包'\
                 ,to_who='设计师个人',related_user=g.user.id,status='审核中',when=datetime.datetime.now())
        db.session.add(cf)
        # 钱包余额应该变少，审核如果没通过就加回来
        g.user.wallet.money = after_money
        db.session.add(g.user.wallet)
        db.session.commit()
        return  jsonify({"code":0})




