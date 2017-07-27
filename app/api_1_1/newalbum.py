from  flask import  session,jsonify,request,url_for
from flask_restful import Resource
import json
from app.model import User,db
from config import APPLYSTATUS,SEX
from app.common import auth
from app.model import Album,Designwork
from datetime import datetime


class NewAlbum(Resource):
    @auth.login_required
    def post(self):
        #添加album
       al = Album.from_request(request)
       db.session.add(al)
       # 数据库中改动album
       try:
           db.session.commit()
       except:
           db.session.rollback()
           return jsonify({'code': -1})
       wl =  json.loads(request.values.get("work_list"))  #插入作品
       for i in wl:
           dw = Designwork(work_url=i,up_time=datetime.now(),album_id=al.id,user_id=al.user_id,category=al.category)
           db.session.add(dw)
       try:
           db.session.commit()
       except Exception as e:
           print(e)
           db.session.rollback()
           return jsonify({'code': -1})
       return jsonify({'code':0})
