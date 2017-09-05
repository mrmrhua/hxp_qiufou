from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
from app.models import User,db,Notice,Subscribtion

class AdminLogin(Resource):
    def post(self):
        pw = request.values.get("pw")
        # 32位小写加密
        # 密码houxiaopang666
        if pw == 'f19bc2c2408bab706d37707cf183b414':
            return jsonify({'code':0,'data':{'token':'boosprivelidge'}})
        else:
            return jsonify({'code': -1})


