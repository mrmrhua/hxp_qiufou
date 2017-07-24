# post  /admin/project
# ｛
# 	password
# 	description
# 	milestone_num
#
# ｝
# 	return  :
# 		{ 'result': 0  } 成功
# 		{ 'result': 1  } 失败

from  flask import  request,jsonify
from flask_restful import Resource
from app.model import Project,Milestone
from app import db
from datetime import datetime
import json



class AddProject(Resource):
    def post(self):
        # print(request.form.get("milestone"))
        password = request.form.get("password")
        description = request.form.get("description")
        milestone_num = int(request.form.get("milestone_num"))
        m = json.loads(request.form.get("milestone"))
        # m : [obj,obj,obj...]

        # 写进数据库
        pro = Project(password=password,description=description,milestone_num=milestone_num)
        db.session.add(pro)
        db.session.commit()
        ordinpro = 0;
        for t in m:
            ordinpro =  ordinpro+1
            due_time = datetime.strptime(t.get('de_time'),"%Y/%m/%d %H:%M")
            due_time_cli = datetime.strptime(t.get('cl_time'), "%Y/%m/%d %H:%M")
            milestone_col = Milestone(due_time=due_time,pro_id = pro.id,ordinpro=ordinpro,due_time_cli=due_time_cli)
            print(milestone_col)
            db.session.add(milestone_col)
        db.session.commit()

        return jsonify({'pro_id':pro.id})

