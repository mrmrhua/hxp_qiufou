from flask import Blueprint
from flask_restful import Api

api_1_1 = Blueprint('apiv1_1',__name__)
api_v1_1 = Api(api_1_1)

from .apply import PostApply,CompanyPostApply
from .login_verify import WxVerify,TokenVerify,LogOut
from .applystatus import GetApplyStatus
from .demand import GetDemandCenter,DemandDeatil,ReplyDemand,TMPReplyDemand
from .work_resume import GetAllWork,GetResumeInfo
from .admindash import NewAlbum,GetAlbum,GetCollection,GetUserHead,GetAlbumDetail,\
    Userinfo,DeleteAlbum,AddExp,DelExp,NoticeRecent,UnreadNum,AllNotice,\
    ClearAll,RemoveAll
from .adminsystem import SendNotice,AllDesignerManage,DesignerRecom,AgreeApply,DisAgreeApply, \
    AdminLogin,GetApplyinfo,ListNews,AllDemand,DemandApply,GetDemandApplyInfo,RecomList, \
    DelRecom


# wx verify info
api_v1_1.add_resource(WxVerify,'/wx_verify')
api_v1_1.add_resource(LogOut,'/logout')
api_v1_1.add_resource(GetApplyStatus,'/apply/status')



api_v1_1.add_resource(GetDemandCenter,'/demandcenter')

api_v1_1.add_resource(PostApply,'/apply/form')
api_v1_1.add_resource(CompanyPostApply,'/apply/companyform')
api_v1_1.add_resource(GetAllWork,'/allwork')
api_v1_1.add_resource(GetResumeInfo,'/resumeinfo')

api_v1_1.add_resource(DemandDeatil,'/demanddetail')
api_v1_1.add_resource(ReplyDemand,'/replydemand')
#临时用
api_v1_1.add_resource(TMPReplyDemand,'/replydemand_tmp')
api_v1_1.add_resource(TokenVerify,'/token/authenticated')



api_v1_1.add_resource(NewAlbum,'/newalbum')
api_v1_1.add_resource(GetAlbum,'/designerdash/index/recent')
api_v1_1.add_resource(GetCollection,'/designerdash/collection')

# dashboard用
# 获取设计师的昵称和头像
api_v1_1.add_resource(GetUserHead,'/designerdash/header')
api_v1_1.add_resource(GetAlbumDetail,'/albumdetail')

api_v1_1.add_resource(Userinfo,'/designerdash/userinfo')
api_v1_1.add_resource(DeleteAlbum,'/designerdash/deletealbum')
# api_v1_1.add_resource(AddExp,'/desigenrdash/userinfo/addexp')
api_v1_1.add_resource(DelExp,'/designerdash/userinfo/deletexp')

api_v1_1.add_resource(UnreadNum,'/designerdash/notice/unreadnum')

api_v1_1.add_resource(NoticeRecent,'/designerdash/notice/recent')

api_v1_1.add_resource(AllNotice,'/designerdash/notice/all')

# api_v1_1.add_resource(SendNotice,'/admin/sendnotice')

api_v1_1.add_resource(ClearAll,'/designerdash/notice/clearall')
api_v1_1.add_resource(RemoveAll,'/designerdash/notice/removeall')



# 管理后台
api_v1_1.add_resource(AllDesignerManage,'/adminsystem/alldesigner')

api_v1_1.add_resource(DesignerRecom,'/adminsystem/recommend_tmp')

api_v1_1.add_resource(GetApplyinfo,'/adminsystem/applyinfo')


api_v1_1.add_resource(AgreeApply,'/adminsystem/agreeapply')

api_v1_1.add_resource(DisAgreeApply,'/adminsystem/disagreeapply')


api_v1_1.add_resource(AdminLogin,'/adminsystem/login')

api_v1_1.add_resource(SendNotice,'/adminsystem/notice/sendnotice')
api_v1_1.add_resource(ListNews,'/adminsystem/notice/allnotice')

api_v1_1.add_resource(AllDemand,'/adminsystem/demand/all')

api_v1_1.add_resource(DemandApply,'/adminsystem/demand/apply_tmp')

api_v1_1.add_resource(GetDemandApplyInfo,'/adminsystem/demand/getapplyinfo')


api_v1_1.add_resource(RecomList,'/adminsystem/pricelist_tmp')

api_v1_1.add_resource(DelRecom,'/adminsystem/pricelist/remove')