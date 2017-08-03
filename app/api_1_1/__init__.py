from flask import Blueprint
from flask_restful import Api

api_1_1 = Blueprint('apiv1_1',__name__)
api_v1_1 = Api(api_1_1)

from .wxverify import WxVerify
from .applystatus import GetApplyStatus
from .applyinfo import GetApplyinfo

from .demandcenter import GetDemandCenter
from .applyform import PostApply
from .companyapply import CompanyPostApply


# wx verify info
api_v1_1.add_resource(WxVerify,'/wx_verify')
api_v1_1.add_resource(GetApplyStatus,'/apply/status')
# api_v1_1.add_resource(NewAlbum,'/newalbum')
# api_v1_1.add_resource(GetAlbum,'/designerdash/index/recent')
# api_v1_1.add_resource(GetCollection,'/designerdash/collection')
api_v1_1.add_resource(GetApplyinfo,'/apply/info')

api_v1_1.add_resource(GetDemandCenter,'/demandcenter')

api_v1_1.add_resource(PostApply,'/apply/form')
api_v1_1.add_resource(CompanyPostApply,'/apply/companyform')