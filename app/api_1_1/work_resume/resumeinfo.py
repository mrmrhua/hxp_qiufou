from  flask import  session,jsonify,g,request
from flask_restful import Resource
from app.models import Album,Designwork,Applyform,User,Category,Applywork
from app.common import auth


#获取简历页的个人信息
class GetResumeInfo(Resource):
    # @auth.login_required
    def get(self):
        designer_id = request.values.get("designer_id")
        if not designer_id:
            return jsonify({'code':-1})
        user = User.query.filter_by(id=designer_id).first()
        if not user:
            return jsonify({'code': -1, 'data': {'msg': '该用户不存在'}})
        # if user.info.privacy==1:
        #     return jsonify({'code':-2,'data':{'msg':'无权限查看'}})
        di = user.info
        if not di:
            return jsonify({'code': -1, 'data': {'msg': '尚未通过审核'}})

        if user.usertype==0:
            de_name = user.nickname
            de_worktime = di.worktime or []
        else:
            de_name= di.company_name
            de_worktime = ''

        field = [(i.category_name) for i in user.categories ]
        # for i in user.category:
        #     field.append(i.category_name)

        t=  [{'title':i.title,'desc':i.content} for i in user.experiences]
        # print(di.startyear)
        return jsonify({
            'code':0,
            'data':{
                'nickname':de_name,
                'headimg':user.headimg,
                'city': di.city,
                'exp':di.startyear,
                'filed':field,
                'worktime':de_worktime,
                'project_text':t,
                'intro':di.intro
            }
        })