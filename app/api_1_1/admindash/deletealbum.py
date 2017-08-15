from  flask import  session,jsonify,request,url_for
from flask_restful import Resource
import json
from app.models import User,db
from config import APPLYSTATUS,SEX
from app.common import auth
from app.models import Album,Designwork
from datetime import datetime


class DeleteAlbum(Resource):
    @auth.login_required
    def post(self):
        album_id = request.values.get("album_id")
        a = Album.query.filter_by(id=album_id).first()
        if a:
            db.session.delete(a)
            db.session.commit()
            return jsonify({'code':0})
        else:
            return jsonify({'code':-1})



