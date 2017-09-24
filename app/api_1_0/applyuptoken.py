

from  flask import  jsonify,request
from flask_restful import Resource
from qiniu import Auth, put_file, etag, urlsafe_base64_encode
import qiniu.config
import os
from  config import qiniu_access_key,qiniu_secret_key
import  json

class GetApplyUptoken(Resource):
    def get(self):
        headimg = request.values.get("headimg")
        # 构建鉴权对象
        q = Auth(qiniu_access_key, qiniu_secret_key)
        # 回调策略
        # policy = {
        #     'callbackUrl': 'houxiaopang.com/qiniu/callback',
        #     'callbackBody': 'filename=$(fname)'
        # }
        if headimg == '1':
            upToken = q.upload_token(bucket='userhead', key=None)
        else:
            upToken = q.upload_token(bucket='designfile', key=None)
        print(q)
        print(upToken)
        return jsonify({ 'uptoken':upToken })

