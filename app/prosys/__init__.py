from flask import Blueprint
from flask_restful import Api
from .upwork import UpWork
from .getwork import GetWork
from .getdetail import GetDetail
from .admin_project import AddProject
from .milestone import GetMilestone

api_sys = Blueprint('api',__name__)
api = Api(api_sys)

api.add_resource(AddProject,'/admin/project')

api.add_resource(GetMilestone,'/project/milestone')


api.add_resource(UpWork,'/project/add_history_work')

api.add_resource(GetWork,'/project/milestone/work')


api.add_resource(GetDetail,'/project/workdetail/<int:id>')