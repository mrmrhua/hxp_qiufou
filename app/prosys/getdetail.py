from  flask import  request,jsonify
from flask_restful import Resource
from app.model import Project,Milestone,Historywork
from app import db
from datetime import datetime

# 8. 点击查看图片详情，及评论等. 图片id为i
# get /project/workdetail/<int：i>
# return{
# 	work_url: xxxxx
# }


class GetDetail(Resource):
    def get(self,id):
        h = Historywork.query.filter_by(id=id).first()
        return jsonify({'work_url':h.work_url})
