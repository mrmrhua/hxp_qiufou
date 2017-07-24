
from  flask import  jsonify,request
from flask_restful import Resource
from qiniu import Auth, put_file, etag, urlsafe_base64_encode
import qiniu.config
import os
from  config import qiniu_access_key,qiniu_secret_key
import  json
from app import db
from app.model import Historywork,Milestone
from datetime import datetime

class UpWork(Resource):
    def post(self):
        # 多张图片怎么办???发送多个请求?
        work_url  = request.form.get('work_url')
        print(work_url)
        pro_id = int(request.form.get('pro_id'))
        now_is = int(request.form.get('now_is'))
        up_time =  datetime.now()
        # 通过pro_id和now_is两个参数,找到对应的milstone行,取其ID
        m = Milestone.query.filter_by(pro_id = pro_id , ordinpro = now_is).first()
        # 插库
        hiswork = Historywork(work_url=work_url,up_time=up_time, milestone_id=m.id)
        db.session.add(hiswork)
        db.session.commit()

        return jsonify({"code":0})