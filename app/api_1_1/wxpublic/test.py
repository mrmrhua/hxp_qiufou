from  flask import jsonify,request,Response
from flask_restful import Resource
import hashlib
import json
import urllib
class WxTest(Resource):
    def get(self):
        if len(request.values)==0:
            return -1
        signature = request.values.get("signature")
        timestamp = request.values.get("timestamp")
        nonce = request.values.get("nonce")
        echostr = request.values.get("echostr")
        token = "houxiaopang"  # 请按照公众平台官网\基本配置中信息填写
        try:
            list = [token, timestamp, nonce]
            list.sort()
            sha1 = hashlib.sha1()
            m = list[0]+list[1]+list[2]
            sha1.update(m.encode("utf-8"))
            hashcode = sha1.hexdigest()
            if hashcode == signature:
                return  Response(echostr, mimetype='text')
            else:
                return -1
        except Exception:
            return -1

class WxUserinfo(Resource):
    def get(self):
        code = request.values.get("code")
        if not code:
            return jsonify({'code': -1, 'data': {"message": "code mistake"}})
        result = wxpublic_get_access_token(code)
        if result is None:  # 验证失败,
            return jsonify({'code': -1, 'data': {'message': 'code mistake'}})
        userinfo = wxpublic_get_user_info(result.get('access_token'), result.get('openid'))
        unionid = userinfo['unionid']
        isApplyed = True
        return jsonify({'code':0,'data':{'uid':unionid,'isApplyed':isApplyed}})




def wxpublic_get_user_info(access_token,openid):
    url = 'https://api.weixin.qq.com/sns/userinfo?access_token={a}&openid={b}&lang=zh_CN'.format(a=access_token, b=openid)
    userinfo = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))
    return userinfo

# 获取access_token
def wxpublic_get_access_token(code):
    appid = "wx35c4ce958bc7eb68"
    secret = "4cde0db3bb0df9597bebcad3352d503d"
    # url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+"&secret="+secret
    #
    # # get acess_token
    # result = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))
    #
    # if('errcode' in result.keys()):
    #     return  None
    #
    # access_token = result['access_token']


    url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+appid+'&secret='+secret+'&code=' \
          + code + '&grant_type=authorization_code'

    # get acess_token
    result = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))

    if ('errcode' in result.keys()):
        return None

    access_token = result['access_token']
    openid = result['openid']

    return {'access_token': access_token, 'openid': openid}
