from flask import Blueprint
from flask_restful import Api

api_1_1 = Blueprint('apiv1_1',__name__)
api_v1_1 = Api(api_1_1)


from .login_verify.wxverify import WxVerify
from .applystatus import GetApplyStatus
from .apply.applyinfo import GetApplyinfo
from .demand.demandcenter import GetDemandCenter
from .apply.applyform import PostApply
from .apply.companyapply import CompanyPostApply
from .work_resume.allwork import GetAllWork
from .work_resume.resumeinfo import GetResumeInfo
from .apply.agreeapply import AgreeApply
from .demand.demanddetail import DemandDeatil
from .demand.replydemand import ReplyDemand
from .login_verify.tokenverify import TokenVerify

# wx verify info
api_v1_1.add_resource(WxVerify,'/wx_verify')
api_v1_1.add_resource(GetApplyStatus,'/apply/status')

api_v1_1.add_resource(GetApplyinfo,'/apply/info')

api_v1_1.add_resource(GetDemandCenter,'/demandcenter')

api_v1_1.add_resource(PostApply,'/apply/form')
api_v1_1.add_resource(CompanyPostApply,'/apply/companyform')
api_v1_1.add_resource(GetAllWork,'/allwork')
api_v1_1.add_resource(GetResumeInfo,'/resumeinfo')

api_v1_1.add_resource(AgreeApply,'/agreeapply')
api_v1_1.add_resource(DemandDeatil,'/demanddetail')
api_v1_1.add_resource(ReplyDemand,'/replydemand')
api_v1_1.add_resource(TokenVerify,'/token/authenticated')