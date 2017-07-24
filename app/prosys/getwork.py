from  flask import  request,jsonify
from flask_restful import Resource
from app.model import Project,Milestone,Historywork
from app import db
from datetime import datetime

#  已知pro_id和ordinpro，取该节点图片
# get   /project/milstone/work?pro=1&&orinpro=2
# return
# {
#   "work": [
#     {
#       "uptime": "Wed, 19 Apr 2017 00:46:14 GMT",
#       "work_url": "http://oogj672bg.bkt.clouddn.com/o_1be0va4eop6q1tvn131cphe16nt7.png"
#     },
#     {
#       "uptime": "Wed, 19 Apr 2017 00:47:33 GMT",
#       "work_url": "http://oogj672bg.bkt.clouddn.com/o_1be0vci17d3pnda1v5o1n4dnp7.png"
#     },
#   ]
# }

class GetWork(Resource):
    def get(self):
        pro_id = int(request.args.get('pro'))
        ordinpro = int(request.args.get('ordinpro'))
        m = Milestone.query.filter_by(pro_id=pro_id,ordinpro=ordinpro).first()
        h = Historywork.query.filter_by(milestone_id = m.id).all()
        work = list()
        for each_h in h:
            work.append({'id':each_h.id,'work_url':each_h.work_url,'uptime':each_h.up_time})
        return jsonify({'work':work})