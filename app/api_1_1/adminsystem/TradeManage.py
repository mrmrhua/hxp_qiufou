from  flask import  session,jsonify,request,url_for,g
import  random
from flask_restful import Resource
from app.models import User,db,Demand,CashFlow
from config import ADMIN_TEL,ADMIN_EMAIL
from app.common import send_admin_email,single_send,adminauth
import datetime

# 查看所有资金流动
class GetAllCashFlow(Resource):
    @adminauth.login_required
    def get(self):
        cf = CashFlow.query.order_by(CashFlow.when.desc()).all()
        res = [{
            'id':i.id,
            "change_money":i.change_money,
            'after_money':i.after_money,
            'remark':i.remark,
            'when':i.when.strftime("%Y-%m-%d %H:%M:%S"),
            'from_who':i.from_who,
            'to_who':i.to_who,
            'related_user':i.related_user,
            'status':i.status
        } for i in cf]
        return jsonify({"code":0,"data":{"cashflow":res}})

# 支付给设计师后确认该资金流动
# todo 自动转账
class ConfirmPay(Resource):
    @adminauth.login_required
    def post(self):
        cf_id = request.values.get("id")
        cf = CashFlow.query.filter_by(id=cf_id).first()
        cf.status = '已完成'
        db.session.add(cf)
        db.session.commit()
        return  jsonify({"code":0})


# 因为一些原因无法转账，需要取消这笔操作,填写理由detail
class CancelPay(Resource):
    @adminauth.login_required
    def post(self):
        detail = request.values.get("detail")
        cf_id = request.values.get("id")
        cf = CashFlow.query.filter_by(id=cf_id).first()
        cf.status = '失败'
        cf.detail = detail
        u = cf.user
        u.wallet.money += cf.change_money
        db.session.add(cf)
        db.session.add(u.wallet)
        db.session.commit()
        return  jsonify({"code":0})

# 转账给设计师钱包
class PayToDesigner(Resource):
    @adminauth.login_required
    def post(self):
        user_id = request.values.get("id")
        money = float(request.values.get("money"))
        remark = request.values.get("remark")
        when = datetime.datetime.nwo()
        from_who = '平台'
        to_who = '设计师钱包'
        related_user = user_id
        status = '已入账'
        u =User.query.filter_by(id=user_id).first()
        if not u:
            return -1
        after_money =u.wallet.money+money
        db.session.add(u.wallet)
        cf = CashFlow(change_money=money,after_money=after_money,remark=remark,when=when,from_who=from_who,to_who=to_who,related_user=related_user,status=status)
        db.session.add(cf)
        db.session.commit()



