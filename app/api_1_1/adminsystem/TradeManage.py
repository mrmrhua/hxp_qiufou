from  flask import  session,jsonify,request,url_for,g
import  random
from flask_restful import Resource
from app.models import User,db,Demand,CashFlow
from config import ADMIN_TEL,ADMIN_EMAIL
from app.common import send_admin_email,single_send,adminauth,decimal_default
import datetime
from sqlalchemy import or_
# 查看所有资金流动
class GetAllCashFlow(Resource):
    @adminauth.login_required
    def get(self):
        status = request.values.get("status")
        if status=='审核中':
        # if status=='提现审核中' or status=='收款申请中':
            cf = CashFlow.query.filter(CashFlow.status.in_(['收款申请中','提现审核中'])).order_by(CashFlow.when.desc()).all()
        else:
            cf = CashFlow.query.order_by(CashFlow.when.desc()).all()
        res = [{
            'id':i.id,
            "change_money":decimal_default(i.change_money),
            'after_money':decimal_default(i.after_money),
            'remark':i.remark,
            'when':i.when.strftime("%Y-%m-%d %H:%M:%S"),
            'from_who':i.from_who,
            'to_who':i.to_who,
            'related_user':i.related_user,
            'status':i.status,
            'detail':i.detail
        } for i in cf]
        return jsonify({"code":0,"data":{"cashflow":res}})

# 支付给设计师后确认该资金流动
class ConfirmPay(Resource):
    @adminauth.login_required
    def post(self):
        cf_id = request.values.get("id")
        cf = CashFlow.query.filter_by(id=cf_id).first()
        if cf.status=='收款申请中':
            cf.status = '等待付款中'
        elif cf.status=='提现审核中':
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
        u = User.query.filter_by(id=cf.related_user).first()
        u.wallet.money -= cf.change_money
        db.session.add(cf)
        db.session.add(u.wallet)
        db.session.commit()
        return  jsonify({"code":0})

# 转账给设计师钱包
class PayToDesigner(Resource):
    @adminauth.login_required
    def post(self):
        user_id = request.values.get("user_id")
        money = float(request.values.get("money"))
        remark = request.values.get("remark")
        when = datetime.datetime.now()
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
        return jsonify({"code": 0})




# 转账验证
class ShowUserInfo(Resource):
    @adminauth.login_required
    def get(self):
        user_id = request.values.get("user_id")
        u = User.query.filter_by(id=user_id).first()
        if not u:
            return -1
        return jsonify({"code":0,"data":{"nickname":u.nickname,'headimg':u.headimg}})



# HTTP
# https://m.houxiaopang.com/api/v1.1/chargeapply
# POST
# 发起收款

class AdminChargeApply(Resource):
    @adminauth.login_required
    def post(self):
        project_id = request.values.get("project_id")
        feetype = request.values.get("feetype")
        money = request.values.get("money")
        desc = request.values.get("desc")

        designer_id = request.values.get("designer_id")
        # 生成CASHFLOW数据
        when = datetime.datetime.now()
        cf = CashFlow(change_money=money,remark=feetype,related_user=designer_id,status='等待付款中',project_id=project_id,when=when,detail=desc)
        db.session.add(cf)
        db.session.commit()
        return jsonify({"code":0})