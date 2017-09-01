from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
from app.models import User,db,Notice,Subscribtion,DesignerInfo,Category,Demand_Recom
import json
# houxiaopang.com/api/v1.1/adminsystem/recommend
# 后台：管理员：项目推荐设计师
class DesignerRecom(Resource):
    def post(self):
        demand_id = request.values.get("demand_id")
        designers = json.loads(request.values.get("designer"))
        for i in designers:
            # TODO 格式
            dr = Demand_Recom(demand_id=demand_id,user_id=i.get("designer_id"),howmuch=i.get("howmuch"),ideas=i.get("ideas"),album_ids=i.get("album_ids"))
            db.session.add(dr)
        db.session.commit()
        return jsonify({'code':0})