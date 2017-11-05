from  flask import  session,jsonify,request,url_for
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
        cf = CashFlow.query.filter_by(id=cf_id).all()
        cf.status = '已完成'
        db.session.add(cf)
        db.session.commit()
        return  jsonify({"code":0})



