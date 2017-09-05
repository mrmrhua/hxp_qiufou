from  flask import  session,jsonify,request,url_for,g
from flask_restful import Resource
import json
from app.models import User,db
from config import APPLYSTATUS,SEX
from app.common import auth
from app.models import Album,Designwork
from datetime import datetime


class NewAlbum(Resource):
    # 添加album
    @auth.login_required
    def post(self):
        album_id = request.values.get("album_id")
        # not exit--new album
        if not album_id:
            al = Album.from_request(request)
            db.session.add(al)
            # get album id
            db.session.flush()
        else:  # exist: update old one
            al = Album.query.filter_by(id=album_id).first()
            if not al or al.user_id!=g.user.id:
                return jsonify({'code': -1})
            al.update_from_request(request)
            db.session.add(al)

        wl =  json.loads(request.values.get("work_list"))  #插入作品
        list_dw = [(Designwork(work_url=i,up_time= datetime.now(),category=al.category,album_id=al.id)) for i in wl]
        al.designworks = list_dw
        # db.session.bulk_save_objects(list_dw)  # 这句需要去掉,否则重复添加(cascade:save-upadte)
        # for i in wl:
        #     dw = Designwork(work_url=i,up_time=datetime.now(),album_id=al.id,user_id=al.user_id,category=al.category)
        #     db.session.add(dw)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({'code': -1})
        return jsonify({'code':0})


    # 上传界面,获取album信息渲染
    @auth.login_required
    def get(self):
        album_id = request.values.get("album_id")
        al = Album.query.filter_by(id=album_id).first()
        if not al:
            return jsonify({'code': -1})
        # other's
        if al.user_id!=g.user.id:
            return jsonify({'code': -1})
        worklist = [ (i.work_url) for i in al.designworks.all()]
        return jsonify({'code': 0,'data':{
            'title':al.title,
            'description':al.description,
            'category':al.category,
            'cover':al.cover,
            'worklist':worklist
        }})
