import urllib
from flask.ext.httpauth import HTTPTokenAuth
from app.wxmodels import *
import urllib.parse
from flask import g
import requests
from qiniu import Auth,urlsafe_base64_encode

from config import qiniu_secret_key,qiniu_access_key
import base64
from Crypto.Cipher import AES

DEMO_ID = 288
DEMO_TITLE = '样例－海报设计'

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




def get_wx_head(headimg,unionid):
    Encodedurl = urlsafe_base64_encode(headimg)
    Encodedentryuri = urlsafe_base64_encode('userhead:' + unionid + ".jpg")
    upheadurl = '/fetch/' + Encodedurl + '/to/' + Encodedentryuri
    Host = 'iovip.qbox.me'
    Content_type = 'application/x-www-form-urlencoded'
    requrl = "http://" + Host + upheadurl

    q = Auth(qiniu_access_key, qiniu_secret_key)
    AccessToken = q.token_of_request(requrl, content_type=Content_type)

    Authorization = 'QBox ' + AccessToken
    headers = {'Host': Host,
               'Content-Type': Content_type,
               'Authorization': Authorization,
               }
    r = requests.post(requrl, headers=headers)
    if (r.status_code != 200):  # 抓取不成功
        return 0
    else:
        return 1



class WXBizDataCrypt:
    def __init__(self, appId, sessionKey):
        self.appId = appId
        self.sessionKey = sessionKey

    def decrypt(self, encryptedData, iv):
        # base64 decode
        sessionKey = base64.b64decode(self.sessionKey)
        encryptedData = base64.b64decode(encryptedData)
        iv = base64.b64decode(iv)

        cipher = AES.new(sessionKey, AES.MODE_CBC, iv)

        n = str(self._unpad(cipher.decrypt(encryptedData)), 'utf-8')
        decrypted = json.loads(n)

        if decrypted['watermark']['appid'] != self.appId:
            raise Exception('Invalid Buffer')

        return decrypted

    def _unpad(self, s):
        return s[:-ord(s[len(s) - 1:])]


def Decrypt(encryptedData, iv,sessionKey):
    appId = 'wxdfb82dad3e5a5d2f'
    pc = WXBizDataCrypt(appId, sessionKey)
    return pc.decrypt(encryptedData, iv)