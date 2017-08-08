from  flask import  session,jsonify,request,url_for
import  random
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp,get_access_token,get_user_info,get_wx_head
import json
from app.model import User,db,Demand
from config import APPLYSTATUS,SEX

class DemandDeatil(Resource):
    def get(self):
        demand_id = request.values.get("demand_id")
        dm = Demand.query.filter_by(id=demand_id).first()
        if not dm:
            return jsonify({'code':-1})

        return jsonify({
            'code':0,
            'data':{
                'title':dm.title,
                'description':dm.description,
                'desc_img':json.loads(dm.desc_img)
                ,
                'howlong':dm.howlong,
                'howmuch':dm.howmuch,
                'category':dm.category,
                'up_time':dm.up_time.strftime("%Y-%m-%d %H:%M:%S")
            }
        })

    def post(self):
        dm = Demand.from_request(request)
        db.session.add(dm)
        try:
            db.session.commit()
        except:
            db.session.rollback()
            return jsonify({'code': -1,'data':{'msg':'保存失败'}})
        return jsonify({'code':0})