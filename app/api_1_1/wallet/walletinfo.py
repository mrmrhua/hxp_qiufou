from  flask import jsonify,request,g
from flask_restful import Resource
from app.models import Album,Wallet,CashFlow
from app.common import auth
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

