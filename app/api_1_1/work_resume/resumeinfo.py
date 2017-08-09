from  flask import  session,jsonify,g,request
from flask_restful import Resource
from app.models import Album,Designwork,Applyform,User,Category,Applywork



#获取简历页的个人信息
class GetResumeInfo(Resource):
    def get(self):
        designer_id = request.values.get("designer_id")
        if not designer_id:
            return jsonify({'code':-1})
        user = User.query.filter_by(id=designer_id).first()
        di = (user.info)[0]

        if user.usertype==0:
            de_name = user.nickname
            de_worktime = di.worktime
        else:
            de_name= di.company_name
            de_worktime = ''

        field = []
        for i in user.category:
            field.append(i.category_name)

        return jsonify({
            'code':0,
            'data':{
                'nickname':de_name,
                'headimg':user.headimg,
                'city': di.city,
                'exp':'',
                'filed':field,
                'worktime':de_worktime,
                'project_text':di.project_text
            }
        })