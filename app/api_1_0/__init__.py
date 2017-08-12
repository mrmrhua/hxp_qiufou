from flask import Blueprint
from flask_restful import Api

api_bp = Blueprint('api',__name__)
api = Api(api_bp)

# Import apis in the package
from .randomtoken import RandomToken
# from  .qiniu_uptoken import GetUpToken

from .applyuptoken import GetApplyUptoken
# from app.api_1_1.applyform import   Applyinfo
from .applystatus import GetApplyStatus
from .workgallery.getwork import GetGalleryWork

from .designerdash.getrecent import GetRecent
from .mobile.get_designer_recom import GetDesignerRecom

# add apis to specific uris
api.add_resource(RandomToken,'/randomtoken')
# 设计协作系统上传图片用,现已废弃
# api.add_resource(GetUpToken,'/file/uptoken')

#客户端上传图片用
api.add_resource(GetApplyUptoken,'/apply/uptoken')

# api.add_resource(Applyinfo,'/apply/form')

# 已废弃
api.add_resource(GetApplyStatus,'/apply/status')

# 废弃
api.add_resource(GetGalleryWork,'/workgallery')


#获取最近上传的图片
# api.add_resource(GetRecent,'/designerdash/index/recent')

# 废弃
api.add_resource(GetDesignerRecom,'/DesignerRecommend')