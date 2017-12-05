from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
from app.models import User,db,Demand_User,Demand_Recom,Demand,Project
import json
from app.common import adminauth,getcatname,getclientname,getdesignername
import datetime
# houxiaopang.com/api/v1.1/adminsystem/recommend_tmp
# 后台：管理员：项目推荐设计师
class DesignerRecom(Resource):
    @adminauth.login_required
    def post(self):
        demand_id = request.values.get("demand_id")
        designers = json.loads(request.values.get("designer"))
        for i in designers:
            if  Demand_Recom.query.filter_by(deapply_id = i.get("apply_id")).first():
                return jsonify({'code': -1})
            worklist = json.dumps(i.get("worklist"))
            dr = Demand_Recom(deapply_id = i.get("apply_id"), \
                howmuch = i.get("howmuch"), ideas = i.get("ideas"), \
                howlong = i.get("howlong"),worklist=worklist,\
                nickname = i.get("nickname"),demand_id=demand_id)
            db.session.add(dr)
        db.session.commit()
        return jsonify({'code':0})


# houxiaopang.com/api/v1.1/adminsystem/demand/all
#GET
#后台：查看所有需求
class AllDemand(Resource):
    @adminauth.login_required
    def get(self):
        ds = Demand.query.order_by(Demand.id.desc()).all()
        demand = [{
                'title':i.title,
                'description': i.description,
                'demand_id':i.id,
                'howlong':i.howlong,
                'howmuch':i.howmuch,
                'category':i.category,
                'up_time':i.up_time
            }for i in ds]
        return jsonify({'code':0,'data':demand})



#GET
#后台：查看某需求所有报价的设计师
class DemandApply(Resource):
    @adminauth.login_required
    def get(self):
        demand_id= request.values.get("demand_id")
        dus = Demand_User.query.filter_by(demand_id=demand_id).all()
        designer = [{ 'howmuch':i.howmuch,'howlong':i.howlong,'tel':i.tel,
                      'worklist': json.loads(i.worklist),
                     'ideas':i.ideas,'nickname':i.nickname,
                      'id':i.id} for i in dus]
        return jsonify({'code': 0, 'data': designer})


# GET
# 后台：获取报价信息,进行修改
class GetDemandApplyInfo(Resource):
    @adminauth.login_required
    def get(self):
        apply_id=request.values.get("apply_id")
        du = Demand_User.query.filter_by(id=apply_id).first()
        if not du:
            return jsonify({'code':-1})
        return jsonify({'code':0,'data':{
            'howmuch':du.howmuch,
            'howlong':du.howlong,
            'ideas':du.ideas,
            'worklist':json.loads(du.worklist),
            'nickname':du.nickname
        }})


# http://houxiaopang.com/api/v1.1/adminsystem/pricelist_tmp
# 经纪人查看已推荐设计师
class RecomList(Resource):
    def get(self):
        demand_id = request.values.get("demand_id")
        drs = Demand_Recom.query.filter_by(demand_id=demand_id).all()
        designer = [ {'recom_id':i.id,'ideas':i.ideas,'nickname':i.nickname,'howmuch':i.howmuch,'howlong':i.howlong,'worklist':json.loads(i.worklist),'tel':i.apply.tel} for i in drs ]
        return jsonify({'code':0,'data':designer})



    # http: // houxiaopang.com / api / v1.1 / adminsystem / pricelist / remove
    # POST
    # （临时）后台：经纪人删除推荐设计师
class DelRecom(Resource):
    @adminauth.login_required
    def post(self):
        recom_id=request.values.get("recom_id")
        dr = Demand_Recom.query.filter_by(id=recom_id).first()
        if not dr:
            return jsonify({'code': -1})
        db.session.delete(dr)
        db.session.commit()
        return jsonify({'code':0})

def getdemandtitle(id):
    d = Demand.query.get(id)
    return d.title

    # http: // houxiaopang.com / api / v1.1 /adminsystem/createproject
    # POST
    # 经纪人绑定项目
class CreateProject(Resource):
    @adminauth.login_required
    def post(self):
        demand_id =request.values.get("demand_id")
        demand = Demand.query.filter_by(id=demand_id).first()
        designer = request.values.get("designer")
        st = datetime.datetime.now()
        title = getdemandtitle(demand_id)
        pro = Project(status=0,demand_id=demand_id,user_id=designer,cat_id=demand.category,starttime=st,title=title,up_time=st)
        db.session.add(pro)
        db.session.commit()
        return jsonify({'code':0,'data':{"project_id":pro.id}})


  # http: // houxiaopang.com / api / v1.1 /adminsystem/changeprojectstatus
    # POST
    # 经纪人关闭项目
class EndProject(Resource):
    @adminauth.login_required
    def post(self):
        pro_id = request.values.get("project_id")
        status = request.values.get("status")
        pro = Project.query.get(pro_id)
        pro.status =status
        db.session.add(pro)
        db.session.commit()
        return jsonify({'code':0})

def gettime(time):
    if not time:
        return ''
    else:
        return time.strftime("%Y-%m-%d %H:%M:%S")

  # http: // houxiaopang.com / api / v1.1 /adminsystem/seeallprojects
    # GET
    # 查看所有项目
class SeeAllProjects(Resource):
    @adminauth.login_required
    def get(self):
        pros = Project.query.all()
        projects = [{
            "id":i.id,
            "cat":getcatname(i.cat_id),
            "client":getclientname(i.client_id),
            'client_id':i.client_id,
            'designer':getdesignername(i.user_id),
            'designer_id':i.user_id,
            'isNew':i.isnew,
            'status':i.get_status(),
            'up_time':gettime(i.up_time),
            'title':i.title,
            'starttime':i.starttime.strftime("%Y-%m-%d %H:%M:%S")
        } for i in pros ]
        return jsonify({'code':0,"data":{"project":projects}})
