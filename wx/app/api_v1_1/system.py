from  flask import  session,jsonify,request,url_for,g,current_app
from flask_restful import Resource
from app.wxmodels import *
from app import db
import json
from datetime import datetime
import urllib.parse
from qiniu import Auth,urlsafe_base64_encode
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer,BadSignature,SignatureExpired
class Claim(Resource):
    def post(self):
        uid = request.json.get("uid")
        cat_id = request.json.get("cat_id")
        demand_id= request.json.get("demand_id")
        u = User.query.filter_by(uid=uid).first()
        if not u:
            return jsonify({'code': -1})
        pro = Project.query.filter_by(uid=uid,demand_id=demand_id).first()
        if not pro:
            pro = Project(uid=uid,cat_id=cat_id,demand_id=demand_id,designer=u.nickname)
            db.session.add(pro)
            db.session.commit()
        return jsonify({'code':0,'project_id':pro.id})



class Projectlist(Resource):
    def get(self):
        uid = request.values.get("uid")
        pros = Projectlist.query.filter_by(uid=uid).all()
        project = [{'cat':i.demand.cat_id,
                        'up_time':datetime.strftime(i.demand.up_time, "%Y-%m-%d %H:%M"),
                        'id': i.demand.id,'client':i.demand.name,'designer':i.designer} for i  in pros]


        # TODO
        return jsonify({'code':0})


class Timeline(Resource):
    def get(self):
        # TODO
        return jsonify({'code': 0})

class Postdetail(Resource):
    def post(self):
        # TODO
        return jsonify({'code': 0})



def get_access_token(code):
    url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxbfacdb1b99885182&secret=c4f876b16ddc8d8e4259b9c2388e5493&code='\
              + code + '&grant_type=authorization_code'

    # get acess_token
    result = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))

    if('errcode' in result.keys()):
        return  None

    access_token = result['access_token']
    openid = result['openid']

    return  {'access_token':access_token,'openid':openid}

def get_user_info(access_token,openid):
    # get user info
    url = 'https://api.weixin.qq.com/sns/userinfo?access_token={a}&openid={b}'.format(a=access_token,b=openid)
    res = urllib.request.urlopen(url).read().decode('utf-8')
    print(res)
    userinfo = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))



class Systemlogin(Resource):
    def get(self):
        if request.args.get("code") is None:
            return jsonify({'code': -1, 'data': {"message":"code mistake"}})
        code = request.args.get("code")
        result = get_access_token(code)
        if result is None:  # 验证失败,
            return jsonify({'code': -1, 'data': {'message': 'code mistake'}})
        userinfo = get_user_info(result.get('access_token'), result.get('openid'))
        nickname = userinfo['nickname']
        unionid = userinfo['unionid']
        sex = userinfo['sex']
        headimg = userinfo['headimgurl']
        u = User.query.filter_by(uid=unionid).first()
        if not u:
            return jsonify({'code': -1})
        token = u.generate_auth_token().decode()

        # TODO
        return jsonify({'code': 0,'token':token})
