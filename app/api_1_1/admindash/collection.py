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


class GetCollection(Resource):
    @auth.login_required
    def get(self):
        category = request.args.get("category")
        # print(category)
        if not category:
            return jsonify({'code': -1, 'data': {'msg':"未得到品类"}})

        page = request.values.get("page")
        if page and page != 'undefined':
            page = int(page)
        else:
            page = 1
        # 每页数量
        num = request.values.get("num")
        if not num:
            num = 12
        PER_PAGE = num



        if(category=="-1"):  #取全部作品
            count =  Album.query.filter_by(user_id=g.user.id).count()
            a = Album.query.filter_by(user_id=g.user.id).order_by(Album.up_time.desc()).paginate(page,PER_PAGE,False).items
        else:
            count = Album.query.filter_by(user_id=g.user.id,category=category).count()
            a = Album.query.filter_by(user_id=g.user.id,category=category).order_by(Album.up_time.desc()).paginate(page,PER_PAGE,False).items
        album = []
        for each_al in a:
            cover_url = each_al.cover
            title = each_al.title
            album_id = each_al.id
            category = each_al.category
            each_album = {'cover_url': cover_url, 'title': title, 'album_id': album_id,'category':category}
            album.append(each_album)
        return jsonify({'code': 0, 'data': album,'total':count})
