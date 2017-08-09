from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp,get_access_token,get_user_info,get_wx_head
import json
from app.models import User,db
from config import APPLYSTATUS,SEX
from app.common import auth
from app.models import Album,Designwork
from datetime import datetime

#获取最近的album
class GetAlbumDetail(Resource):
    def get(self):
        album_id= request.values.get("album_id")
        al = Album.query.filter_by(id=album_id).first()
        if not al:
            return jsonify({'code':-1})
        dw = Designwork.query.filter_by(album_id=album_id).all()
        works = []
        for i in dw:
            works.append(i.work_url)
        album = {
            'title':al.title,
            'description':al.description,
            'up_time':datetime.strftime(al.up_time, "%Y-%m-%d"),
            'category':al.category,
            'works':works
        }
        return jsonify({'code': 0, 'data': album})
