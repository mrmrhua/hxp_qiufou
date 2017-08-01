from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp,get_access_token,get_user_info,get_wx_head
import json
from app.model import User,db
from config import APPLYSTATUS,SEX
from app.common import auth
from app.model import Album,Designwork
from datetime import datetime


#获取最近的album
class GetCollection(Resource):
    @auth.login_required
    def get(self):
        category = request.args.get("category")
        print(category)
        if not category:
            return jsonify({'code': -1, 'data': {'msg':"未得到品类"}})
        if(category=="-1"):  #取全部作品
            a = Album.query.filter_by(user_id=g.user.id).order_by(Album.up_time.desc()).all()
        else:
            a = Album.query.filter_by(user_id=g.user.id,category=category).order_by(Album.up_time.desc()).all()
        album = []
        for each_al in a:
            cover_url = each_al.cover
            title = each_al.title
            album_id = each_al.id
            category = each_al.category
            each_album = {'cover_url': cover_url, 'title': title, 'album_id': album_id,'category':category}
            album.append(each_album)
        return jsonify({'code': 0, 'data': album})
