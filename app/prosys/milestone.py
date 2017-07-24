
from  flask import  request,jsonify
from flask_restful import Resource
from app.model import Project,Milestone
from app import db
from datetime import datetime



class GetMilestone(Resource):
    def get(self):
        pro_id = request.args.get('id')
        project = Project.query.filter_by(id=pro_id).first()
        description = project.description
        milestone_num = project.milestone_num
        # print(project)
        # print(description)
        # print(milestone_num)

        m = Milestone.query.filter_by(pro_id = pro_id).all()
        milestone = list()
        for each_m in m:
            # datetime.strptime(t, "%Y/%m/%d %H:%M")
            milestone_list = { 'due_time' : datetime.strftime(each_m.due_time,"%Y-%m-%d %H:%M"),'de_status':  each_m.de_status, 'cl_status': each_m.cl_status,'ordinpro':each_m.ordinpro}
            # print(" milestone_list: %s"  %  milestone_list)
            milestone.append(milestone_list)

            # [{'cl_status': 0, 'due_time': datetime.datetime(2017, 4, 14, 18, 0), 'de_status': 0},
            #  {'cl_status': 0, 'due_time': datetime.datetime(2017, 4, 14, 19, 0), 'de_status': 0}]
        # 传回前端,读取并显示

        return jsonify({'description':description,'milestone_num':milestone_num,'milestone':milestone})
