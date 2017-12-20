from  flask import  session,jsonify,g,request,Response
import  random
from flask_restful import Resource
from app.models import *
from app.common import adminauth
import requests
import urllib
from .common import wx_get_common_access_token,wxpublic_get_jsapi_ticket
from app.common import Conn_db
import hashlib
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
                    'worktime':info.worktime or [],
                    'category':u.get_categories_str(),
                    'tag':u.get_tags_str(),
                    'exp':u.get_exps_str(),
                    'privacy':info.privacy,
                    'ticket':info.ticket,
                },

            }
        })



# 测试环境该接口不能使用
class QRBind(Resource):
    def get(self):
        token = request.values.get("token")
        if not token:
            return -1
        if current_app.debug:
            # appid = "wx35c4ce958bc7eb68"
            # secret = "4cde0db3bb0df9597bebcad3352d503d"
            # url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+"&secret="+secret
            # # get acess_token
            # result = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))
            # if('errcode' in result.keys()):
            #     return  None
            # access_token = result['access_token']
            return -1
            # todo
            # 测试环境该接口不能使用
        else:
            access_token = wx_get_common_access_token()
        url = 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token='+access_token
        user = User.verify_auth_token(token)
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


def GetTicket(noncestr,timestamp,url):
    # conn = Conn_db()
    # ticket = conn.get("jsapi_ticket")
    # print(ticket)
    # if not ticket or ticket=="None": #expired
    #     if current_app.debug:
    #         token= '5_s2Zyho-CJ8kDXC50c1jfSet8ZZmR48ZhmGwW8jVYDZMpzRIh2nDCN9NKZrAKm11RD6WGZ-Ltx06GrGXx0-40no8CFzA1VrFohzNnTiE573t2bYg1W7q_MhlwcZHJN6fvFJIDR0DCvBpGEHMKEBNjABAWTF'
    #     else:
    #         token = wx_get_common_access_token()
    #         print("3:%r" % token)
    #     ticket = wxpublic_get_jsapi_ticket(token)
    #     print("4:%r" % ticket)
    #     conn.set("jsapi_ticket",ticket,6900)

    token = '5_s2Zyho-CJ8kDXC50c1jfSet8ZZmR48ZhmGwW8jVYDZMpzRIh2nDCN9NKZrAKm11RD6WGZ-Ltx06GrGXx0-40no8CFzA1VrFohzNnTiE573t2bYg1W7q_MhlwcZHJN6fvFJIDR0DCvBpGEHMKEBNjABAWTF'
    ticket = wxpublic_get_jsapi_ticket(token)
    print(ticket)
    s = 'jsapi_ticket='+ ticket + '&noncestr='+ noncestr+'&timestamp='+timestamp+'&url='+url
    print(s)
    # r = hashlib.sha1(s).hexdigest()
    h = hashlib.sha1()
    h.update(s.encode('utf-8'))
    r = h.hexdigest()
    print(r)
    return r


class GetJsTicket(Resource):
    def get(self):
        noncestr=request.values.get("nonceStr")
        timestamp = request.values.get("timestamp")
        url=request.values.get("url")
        r= GetTicket(noncestr,timestamp,url)
        # # token = wx_get_common_access_token
        # token = 'eCos4KDKU8eisorJaRtqnHofCWnivQFK1N07IeQqzD7Tj6IvnqTDZBUzwAU0okN7EMtdSpy630yTlVM-VwvAtg4GHfWsS7lpzyS3cbaf5yEWvrZSqxDTHE_oSUbffi_lGOEcAIALTJ'
        # r = wxpublic_get_jsapi_ticket(token)
        # obj = json.loads(r.text)
        # ticket = obj.get("ticket")
        return r

