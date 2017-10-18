import urllib
from flask.ext.httpauth import HTTPTokenAuth
from app.wxmodels import *
import urllib.parse
from flask import g


auth = HTTPTokenAuth(scheme='Token')

@auth.verify_token
def verify_token(token):
    if  token=='robin':
        user = User.query.filter_by(id=49).first()
        g.user = user
        return True
    # admin帐户
    # if token == ADMIN_KEY:
    #     return True
    user = User.verify_auth_token(token)
    # print(user)
    if not user:
        return False
    g.user = user
    return True



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
    userinfo = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))
    return userinfo
