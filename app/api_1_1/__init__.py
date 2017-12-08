from flask import Blueprint,abort,current_app
from flask_restful import Api
# from .errors import ServerException
api_1_1 = Blueprint('apiv1_1',__name__)

# 让FLASK-RESTFUL来处理404
api_v1_1 = Api(api_1_1,catch_all_404s=True)

from .apply import *
from .login_verify import *
from .applystatus import GetApplyStatus
from .demand import *
from .admindash import *
from .adminsystem import *
from .wxpublic import  *
from .wallet import *
from .project import *
from .work_resume import *


# wx verify info
api_v1_1.add_resource(WxVerify,'/wx_verify')

api_v1_1.add_resource(WxVerify_Client,'/wx_verfify_client')


api_v1_1.add_resource(LogOut,'/logout')
api_v1_1.add_resource(GetApplyStatus,'/apply/status')



api_v1_1.add_resource(GetDemandCenter,'/demandcenter')

# api_v1_1.add_resource(PostApply,'/apply/form')
api_v1_1.add_resource(NewPostApply,'/apply/form_new')

# api_v1_1.add_resource(CompanyPostApply,'/apply/companyform')
api_v1_1.add_resource(NewCompanyPostApply,'/apply/companyform_new')



api_v1_1.add_resource(GetAllWork,'/allwork')

api_v1_1.add_resource(GetResumeInfo,'/resumeinfo')

api_v1_1.add_resource(DemandDeatil,'/demanddetail')
api_v1_1.add_resource(ReplyDemand,'/replydemand')
#临时用
# 设计师报价
api_v1_1.add_resource(TMPReplyDemand,'/replydemand_tmp')
api_v1_1.add_resource(TokenVerify,'/token/authenticated')

api_v1_1.add_resource(ClientTokenVerify,'/wxfwh/token/clientauthenticated')

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


# 服务号配置
api_v1_1.add_resource(WxTest,'/wxpublic')

api_v1_1.add_resource(WxUserinfo,'/wx_getuid')

# 根据CODE返回微信用户的基本信息
api_v1_1.add_resource(WxGetUserinfo,'/wx_getuserinfo')
api_v1_1.add_resource(WX_Userinfo,'/designerdash/wx_userinfo')



# 服务号接口
api_v1_1.add_resource(QRBind,'/qrbind')

# api_v1_1.add_resource(TTTest,'/tttest')


api_v1_1.add_resource(IsBind,'/isbind')

api_v1_1.add_resource(DelBind,'/delbind')


# api_v1_1.add_resource(ApplySuccess,'/test')
api_v1_1.add_resource(GetCity,'/getcity')

# 获取微信JSSDK的TICKET
api_v1_1.add_resource(GetJsTicket,'/getjsticket')
# 获取ACCESS_TOKEN
api_v1_1.add_resource(TokenForTest,'/testtoken')

api_v1_1.add_resource(PushDemand,'/adminsystem/demand/pushdemand')


# 钱包
api_v1_1.add_resource(WalletInfo,'/designer/walletinfo')
api_v1_1.add_resource(GetCashFlow,'/designer/getcashflow')

api_v1_1.add_resource(VerifySend,'/designer/verifysend')


api_v1_1.add_resource(BindAlipay,'/designer/bindalipay')
api_v1_1.add_resource(WithdrawApply,'/designer/withdrawapply')
api_v1_1.add_resource(WithdrawApply_WX,'/designer/withdrawapply_wx')


#客户需求意向
api_v1_1.add_resource(ClientPostDemand,'/client/postdemand')


# 查看所有资金流动
api_v1_1.add_resource(GetAllCashFlow,'/adminsystem/getallcashflow')

api_v1_1.add_resource(ConfirmPay,'/adminsystem/confirmpay')

api_v1_1.add_resource(CancelPay,'/adminsystem/cancelpay')

api_v1_1.add_resource(PayToDesigner,'/adminsystem/paytodesigner')


api_v1_1.add_resource(FeedBack,'/designer/feedback')

api_v1_1.add_resource(ShowUserInfo,'/adminsystem/showuserinfo')


# 客户确定设计师人选后，经纪人新建项目
# 经纪人绑定设计师／需求

api_v1_1.add_resource(CreateProject,'/adminsystem/createproject')
# 经纪人关闭项目
api_v1_1.add_resource(EndProject,'/adminsystem/changeprojectstatus')

# 经纪人查看所有项目
api_v1_1.add_resource(SeeAllProjects,'/adminsystem/seeallprojects')
# 获取项目列表
api_v1_1.add_resource(Cli_ProjectList,'/wxfwh/projectlist')
api_v1_1.add_resource(De_ProjectList,'/designer/projectlist')
# 项目进度
api_v1_1.add_resource(ProjectPage,'/wxfwh/projectpage')
# 客户获取项目进度
api_v1_1.add_resource(ClientProjectPage,'/wxfwh/client/projectpage')
# 客户查看流水
api_v1_1.add_resource(PayRecord,'/wxfwh/payrecord')


# 设计师发起收款
api_v1_1.add_resource(ChargeApply,'/chargeapply')

# 客户获取待支付账单
api_v1_1.add_resource(GetClientRecord,'/getclientrecord')

#  经纪人代设计师发起收款
api_v1_1.add_resource(AdminChargeApply,'/adminsystem/adminchargeapply')


# api_v1_1.add_resource(TestPay,'/testpay')


# 发起PING++支付请求，唤起支付宝APP
api_v1_1.add_resource(GetAlipayCharge,'/getalipaycharge')
# ping++ 支付成功的回调
# http://www.houxiaopang.com/api/v1.1/pingxx/webhooks
api_v1_1.add_resource(GetPayHooks,'/pingxx/webhooks')


# 发送短信
# api_v1_1.add_resource(SendSms,'/tmp/sendsms')

# 管理后台
# 客户已经线下付款
# http://www.houxiaopang.com/api/v1.1/offline/payhooks
api_v1_1.add_resource(OfflinePayHooks,'/adminsystem/offline/payhooks')
