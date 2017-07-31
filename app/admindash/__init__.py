from flask import Blueprint
from flask_restful import Api

api_dash_bp = Blueprint('api_dash_bp',__name__)
api_dash = Api(api_dash_bp)

from .newalbum import NewAlbum
from .recentalbum import GetAlbum
from .collection import GetCollection

from .getuserhead import GetUserHead
from .albumdetail import GetAlbumDetail

api_dash.add_resource(NewAlbum,'/newalbum')
api_dash.add_resource(GetAlbum,'/designerdash/index/recent')
api_dash.add_resource(GetCollection,'/designerdash/collection')

# dashboard用
# 获取设计师的昵称和头像
api_dash.add_resource(GetUserHead,'/designerdash/header')
api_dash.add_resource(GetAlbumDetail,'/albumdetail')
