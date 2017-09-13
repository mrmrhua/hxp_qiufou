from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
from app.models import User,db,Notice,Subscribtion,DesignerInfo,Category,Demand_Recom
import json

# http://houxiaopang.com/api/v1.1/client/pricelist
# 客户：查看报价单
class DesignerRecom(Resource):
    def get(self):
        demand_id = request.values.get("demand_id")
        drs = Demand_Recom.query.filter_by(demand_id=demand_id).all()

        # [ {'id':i.user_id,'headimg':i.headimg,'expyear':i.info.startyear,'ideas':dr} for i in dr.candidates ]
        #
        #


# class Demand_Recom(db.Model):
#     __tablename__ = 'demands_recom'
#     id = db.Column(INTEGER(unsigned=True), primary_key=True)
#     demand_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('demands.id'))
#     user_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'))
#     # howlong = db.Column(db.String(20), nullable=True)
#     howmuch = db.Column(db.String(20), nullable=True)
#     ideas = db.Column(db.String(255), nullable=True)
#     album_ids = db.Column(db.String(20), nullable=True)
#
#     # 建立和user的RELATION