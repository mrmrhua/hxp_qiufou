from flask import request,jsonify,g
from flask_restful import Resource
from app.common import clientauth,auth,getcatname,getclientname,getdesignername,send_admin_email,send_mail_in_html
from app.models import Project,Client,User,Post,db,Projectwork,Category
import datetime
import json
from config import ADMIN_EMAIL

# https://m.houxiaopang.com/api/v1.1/wxfwh/projectlist
# GET
# 获取项目列表
class Cli_ProjectList(Resource):
    @clientauth.login_required
    def get(self):
        pros = Project.query.filter_by(client_id=g.client.id).order_by(Project.up_time.desc()).all()
        projects =  [ {"title":i.title,
           "status":i.status,
            'client': getclientname(i.client_id),
            'designer': getdesignername(i.user_id),
           "isnew":i.isnew,
           "up_time":i.up_time.strftime("%Y-%m-%d %H:%M:%S"),
           "project_id":i.id }  for i in pros ]
        return jsonify({"code":0,"data":{"projects":projects}})

def getlastimg(pro):
    if pro.posts and pro.posts[0].works:
        return pro.posts[0].works[0].work_url
    else:
        return None
# https://m.houxiaopang.com/api/v1.1/designer/projectlist
# GET
# 获取项目列表
class De_ProjectList(Resource):
    @auth.login_required
    def get(self):
        pros = Project.query.filter_by(user_id=g.user.id).order_by(Project.up_time.desc()).all()
        projects =  [ {"title":i.title,
           "status":i.status,
           "isnew":i.isnew,
           "up_time":i.up_time.strftime("%Y-%m-%d %H:%M:%S"),
           "project_id":i.id,
          'lastimg': getlastimg(i),
           'client':getclientname(i.client_id),
           'designer': getdesignername(i.user_id),
                       }  for i in pros ]
        print(projects)
        return jsonify({"code":0,"data":{"projects":projects}})



# https://m.houxiaopang.com/api/v1.1/wxfwh/projectpage
# GET
# 项目进度
class ProjectPage(Resource):
    @auth.login_required
    def get(self):
        project_id = request.values.get("project_id")
        pro = Project.query.filter_by(id=project_id,user_id=g.user.id).order_by(Project.up_time.desc()).first()
        if not pro:
            return jsonify({"code": -1, "msg": "项目不存在"})
        posts = pro.posts
        postlist =  [ {"up_time":i.up_time.strftime("%Y-%m-%d %H:%M:%S"),
                       "imglist":[ n.work_url for n in i.works ],
                       "post_id":i.id,
                       "desc":i.desc
                       } for i in posts]

        data = {"title": pro.title,
         "client":getclientname(pro.client_id),
         "desigenr":getdesignername(pro.user_id),
         "postlist":  postlist,
                'starttime':pro.starttime.strftime("%Y-%m-%d %H:%M:%S"),
                'demand_id': pro.demand_id}
        return jsonify({"code":0,"data":data})

    # https://m.houxiaopang.com/api/v1.1/wxfwh/projectpage
    # POST
    # 提交项目进度
    @auth.login_required
    def post(self):
        if not request.values.get("imglist"):
            return jsonify({'code': -1})
        imglist = json.loads(request.values.get("imglist"))
        if imglist == []:
            return jsonify({'code': -1})
        desc = request.values.get("desc")
        project_id = request.values.get("project_id")
        up_time = datetime.datetime.now()
        pro = Project.query.get(project_id)
        pro.isnew = True
        pro.up_time = up_time
        p = Post(up_time=up_time, desc=desc, project_id=project_id)
        db.session.add(pro)
        db.session.add(p)
        db.session.flush()
        for i in imglist:
            d = Projectwork(work_url=i)
            p.works.append(d)
        db.session.commit()
        title = '%r项目设计师上传了进度'  % pro.title
        text = '进度图：%r' % imglist
        send_admin_email(ADMIN_EMAIL, title, text)
        return jsonify({'code': 0})


        # https://m.houxiaopang.com/api/v1.1/wxfwh/client/projectpage
        # GET
        # 项目进度
class ClientProjectPage(Resource):
    @clientauth.login_required
    def get(self):
        project_id = request.values.get("project_id")
        pro = Project.query.filter_by(id=project_id, client_id=g.client.id).order_by(Project.up_time.desc()).first()
        pro.isnew=False
        db.session.add(pro)
        db.session.commit()
        posts = pro.posts
        postlist = [{"up_time": i.up_time.strftime("%Y-%m-%d %H:%M:%S"),
                     "imglist": [n.work_url for n in i.works],
                     "post_id": i.id,
                     "desc": i.desc
                     } for i in posts]

        data = {"title": pro.title,
                "client": getclientname(pro.client_id),
                "designer": getdesignername(pro.user_id),
                "postlist": postlist,
                'starttime': pro.starttime.strftime("%Y-%m-%d %H:%M:%S"),
                'demand_id': pro.demand_id}
        return jsonify({"code": 0, "data": data})



