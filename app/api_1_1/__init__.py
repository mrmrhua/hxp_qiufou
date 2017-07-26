from flask import Blueprint
from flask_restful import Api

api_1_1 = Blueprint('apiv1_1',__name__)
api_v1_1 = Api(api_1_1)

from .wxverify import WxVerify
from .applystatus import GetApplyStatus
from .newalbum import NewAlbum

# wx verify info
api_v1_1.add_resource(WxVerify,'/wx_verify')
api_v1_1.add_resource(GetApplyStatus,'/apply/status')
api_v1_1.add_resource(NewAlbum,'/newalbum')