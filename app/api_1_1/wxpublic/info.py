from  flask import  session,jsonify,g,request,Response
import  random
from flask_restful import Resource
from app.models import *
from app.common import adminauth
import requests
import urllib

class WX_Userinfo(Resource):
    def get(self):
        uid= request.values.get("uid")
        if not uid:
            return -1
        # 找到人，返回信息
        u = User.query.filter_by(unionid=uid).first()
        if not u:
            return -1
        g.user = u
        info = u.info
        return jsonify({
            'code':0,
            'data':{'usertype':u.usertype,
                'basic':{
                    'nickname':u.nickname,
                    'headimg' :u.headimg,
                    'sex':u.sex,
                    'startyear':info.startyear,
                    'school':info.school,
                    'city':info.city,
                    'tel':info.tel,
                    'email':info.email,
                },
                'worksetting':{
                    'worktime':info.worktime,
                    'category':u.get_categories_str(),
                    'tag':u.get_tags_str(),
                    'exp':u.get_exps_str(),
                    'privacy':info.privacy,
                    'ticket':info.ticket,
                },

            }
        })



class QRBind(Resource):
    def get(self):
        token = request.values.get("token")
        if not token:
            return -1
        appid = "wx35c4ce958bc7eb68"
        secret = "4cde0db3bb0df9597bebcad3352d503d"
        url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+"&secret="+secret
        # get acess_token
        result = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))
        if('errcode' in result.keys()):
            return  None
        access_token = result['access_token']
        url = 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token='+access_token
        user = User.verify_auth_token(token)
        # todo
        user = User.query.filter_by(id=32).first()
        if not user:
            return  -1
        # scene_id:user.id
        values = {"expire_seconds": 604800, "action_name": "QR_SCENE", "action_info": {"scene": {"scene_id":user.id}}}
        r = requests.post(url, data=json.dumps(values))
        TICKET = json.loads(r.content.decode()).get("ticket")
        url = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+TICKET
        r =requests.get(url)
        return Response(r, mimetype='image/jpg')
        # return r.text



class GetCity(Resource):
    def get(self):
        provice_id = request.values.get("id")
        citys = City.query.filter_by(province_id=provice_id).all()
        city_names = [ i.name for i in citys]
        return jsonify({"code":0,'data':{"citys":city_names}})