import urllib
import  json
from flask_mail import current_app
from app import mail
import requests
from qiniu import Auth,urlsafe_base64_encode
import requests
from config import qiniu_secret_key,qiniu_access_key
from functools import wraps
from flask import request
from datetime import timedelta
from flask import make_response, request, current_app,g
from functools import update_wrapper
from flask.ext.httpauth import HTTPTokenAuth
from app.models import User


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
    userinfo = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))

    # nickname = userinfo['nickname']
    # unionid = userinfo['unionid']
    # sex = userinfo['sex']
    # headimg = userinfo['headimgurl']

    return userinfo


def send_admin_email(to,subject,body):
    # msg = Message(subject='猴小胖网站通知:'+subject,sender='houxiaopangdeisgn@163.com',recipients=[to])
    # msg.body = body
    # mail.send(msg)

    url = "http://api.sendcloud.net/apiv2/mail/send"

    # 您需要登录SendCloud创建API_USER，使用API_USER和API_KEY才可以进行邮件的发送。
    params = {"apiUser": "hxp_devmail", \
              "apiKey": "6CEiNLCT8Q8UfSug", \
              "from": "dev@devmail.houxiaopang.com", \
              "fromName": "猴小胖邮件云", \
              "to": to, \
              "subject": "猴小胖网站通知"+subject, \
              "html": body, \
              }

    r = requests.post(url, files={}, data=params)
    # print(r)


def send_apply_email_to_admin(name):
    url = "http://api.sendcloud.net/apiv2/mail/send"



    # 您需要登录SendCloud创建API_USER，使用API_USER和API_KEY才可以进行邮件的发送。
    params = {"apiUser": "hxp_devmail", \
              "apiKey": "6CEiNLCT8Q8UfSug", \
              "from": "help@devmail.houxiaopang.com", \
              "fromName": "猴小胖", \
              "subject": '新的入驻申请', \
              "to":'mrmrhua@126.com',\
              "html":"申请人:"+name,\
              "templateInvokeName": "designer_apply", \
              "replyTo": 'dyh@houxiaopang.com', \
              }

    r = requests.post(url, files={}, data=params)
    res =  r.json().get("result")
    statusCode = r.json().get("statusCode")
    current_app.logger.info('发送入驻邮件给管理员 :%s (状态:%s-statusCode:%s)  ' % (name,res,statusCode))
    # print(r)


def send_designer_email(to,subject):
    url = "http://api.sendcloud.net/apiv2/mail/sendtemplate"

    xsmtpapi = {
        'to':[to]
    }
        # 您需要登录SendCloud创建API_USER，使用API_USER和API_KEY才可以进行邮件的发送。
    params = {"apiUser": "hxp_devmail", \
              "apiKey": "6CEiNLCT8Q8UfSug", \
              "from": "help@devmail.houxiaopang.com", \
              "fromName": "猴小胖", \
              "subject": subject, \
              "xsmtpapi": json.dumps(xsmtpapi),
              #"html":"恭喜您",\
              "templateInvokeName":"designer_apply",\
              "replyTo":'dyh@houxiaopang.com',\
              }

    r = requests.post(url, files={}, data=params)
    res = r.json().get("result")
    statusCode = r.json().get("statusCode")
    current_app.logger.info('发送邮件:%s (状态:%s-statusCode:%s)' % (to,res,statusCode ))
    # print(r)




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




def support_jsonp(func):
    """Wraps JSONified output for JSONP"""
    @wraps(func)
    def decorated_function(*args, **kwargs):
        callback = request.args.get('callback', False)
        if callback:
            data = (func(*args, **kwargs).data).decode('utf-8')
            content = str(callback) + '(' + data + ')'
            return current_app.response_class(content, mimetype='application/javascript')
        else:
            return func(*args, **kwargs)
    return decorated_function



auth = HTTPTokenAuth(scheme='Token')

@auth.verify_token
def verify_token(token):
    user = User.verify_auth_token(token)
    if not user:
        return False
    g.user = user
    return True