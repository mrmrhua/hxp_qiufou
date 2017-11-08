from flask import Blueprint
from flask_restful import Api

api_1_1 = Blueprint('apiv1_1',__name__)
api_v1_1 = Api(api_1_1)

from .postdemand import *
from .info import *
from .system import *
api_v1_1.add_resource(GetTags,'/get_tag')


api_v1_1.add_resource(GetImg,'/get_img')

api_v1_1.add_resource(GetColor,'/get_color')


api_v1_1.add_resource(MyDemand,'/mydemand/ppt')
api_v1_1.add_resource(GetUID,'/wx_login')

api_v1_1.add_resource(GetDemand,'/get_mydemand')

api_v1_1.add_resource(DelDemand,'/del_mydemand')
api_v1_1.add_resource(DelProject,'/del_project')

api_v1_1.add_resource(CardDemand,'/mydemand/card')


api_v1_1.add_resource(GetHot,'/get_hot')

api_v1_1.add_resource(UIDemand,'/mydemand/ui')

api_v1_1.add_resource(HBDemand,'/mydemand/hb')
api_v1_1.add_resource(LOGODemand,'/mydemand/logo')

api_v1_1.add_resource(FeedBack,'/feedback')
api_v1_1.add_resource(GetReceived,'/get_received')
api_v1_1.add_resource(DelReceived,'/del_received')
api_v1_1.add_resource(VisitiDemand,'/visit_demand')
api_v1_1.add_resource(Claim,'/claim')

api_v1_1.add_resource(Projectlist,'/projectlist')
api_v1_1.add_resource(Projectlist_WX,'/projectlist_wx')
api_v1_1.add_resource(Timeline,'/timeline')

api_v1_1.add_resource(Systemlogin,'/system_login')
api_v1_1.add_resource(WX_qrlogin,'/wx_qrlogin')
api_v1_1.add_resource(Polling,'/polling')



api_v1_1.add_resource(TokenVerify,'/tokenverify')


api_v1_1.add_resource(Postlist,'/postlist')

api_v1_1.add_resource(Postdetail,'/postdetail')