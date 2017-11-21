import urllib
import  json
from qiniu import Auth,urlsafe_base64_encode
import requests
from config import qiniu_secret_key,qiniu_access_key
from functools import wraps
from flask import request, current_app,g
from flask.ext.httpauth import HTTPTokenAuth
from app.models import *
import base64
import hmac
from hashlib import sha1
import urllib.parse
import time
import uuid
import redis
from decimal import Decimal

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

class Aliyuncs(object):
    def __init__(self):
        self.access_id = 'LTAIyz5K3aJnB5Hy'
        self.access_secret = 'mGYxH1YQLB3ZYpk2rsc7lwdtDGecNs'
        self.url = 'http://dm.aliyuncs.com'

    def sign(self, accessKeySecret, parameter):
        sortedParameters = sorted(parameter.items(),
                                  key=lambda parameter: parameter[0])
        canonicalizedQueryString = ''

        for (k, v) in sortedParameters:
            canonicalizedQueryString += '&' + self.percent_encode(k) + \
                                        '=' + self.percent_encode(v)

        stringToSign = 'GET&%2F&' + self.percent_encode(
            canonicalizedQueryString[1:])

        h = hmac.new(bytes((accessKeySecret + "&").encode("utf-8")),
                     stringToSign.encode('utf-8'), sha1)
        signature = base64.encodestring(h.digest()).strip()
        return signature

    def percent_encode(self, encodeStr):
        encodeStr = str(encodeStr)
        res = urllib.parse.quote(encodeStr.encode('utf-8'), '')
        res = res.replace('+', '%20')
        res = res.replace('*', '%2A')
        res = res.replace('%7E', '~')
        return res

    def make_url(self, params):
        timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        parameters = {
            'Format': 'JSON',
            'Version': '2015-11-23',
            'AccessKeyId': self.access_id,
            'SignatureVersion': '1.0',
            'SignatureMethod': 'HMAC-SHA1',
            'SignatureNonce': str(uuid.uuid1()),
            'Timestamp': timestamp,
        }
        for key in params.keys():
            parameters[key] = params[key]
        signature = self.sign(self.access_secret, parameters)
        parameters['Signature'] = signature
        url = self.url + "/?" + urllib.parse.urlencode(parameters)
        return url


def send_mail_in_text(to,Subject,TextBody):
    aliyun = Aliyuncs()
    data = {
        'Action': 'SingleSendMail',
        'AccountName': 'notice@devmail.houxiaopang.com',
        'ReplyToAddress': True,
        'AddressType': 1,
        'ToAddress': to,
        'FromAlias': '猴小胖设计服务专家',
        'Subject':Subject,
        'TextBody': TextBody
    }
    url = aliyun.make_url(data)
    response = requests.get(url)
    return response

def send_mail_in_html(to,Subject,HtmlBody):
    aliyun = Aliyuncs()
    data = {
        'Action': 'SingleSendMail',
        'AccountName': 'notice@devmail.houxiaopang.com',
        'ReplyToAddress': True,
        'AddressType': 1,
        'ToAddress': to,
        'FromAlias': '猴小胖设计服务专家',
        'Subject':Subject,
        'HtmlBody': HtmlBody
    }
    url = aliyun.make_url(data)
    response = requests.get(url)
    return response


def send_admin_email(to,subject,body):
    send_mail_in_text(to,'猴小胖网站通知:' + subject, body)

def send_apply_email_to_admin(name):
    response = send_mail_in_text('mrmrhua@126.com','新的入驻申请',"申请人:"+name)
    statusCode = response.status_code
    current_app.logger.info('发送入驻邮件给管理员 :%s (状态:%s-statusCode:%s)  ' % (name,response,statusCode))



# 给申请入驻的设计师发送邮件
def send_designer_email(to,subject):
    htmlbody= """\
<html>
    <head></head>
    <body>
    <p>
        <span>亲爱的设计师</span>
    </p>
    <p>
        <span>&nbsp;</span>
    </p>
    <p>
        <span>您好！</span>
    </p>
    <p>
        <span>您的入驻申请我们已收到，我们会尽快审核，请您耐心等待。</span>
    </p>
    <p>
        <span>感谢您对猴小胖的支持！</span>
    </p>
    <p>
        <span>&nbsp;</span>
    </p>
    <p>
        <span>&nbsp;</span>
    </p>
    <p>
        <span>--------</span>
    </p>
    <p>
        <span>猴小胖设计服务专家</span>
    </p>
    <p>
        <br/>
    </p>
    </body>
<html>
"""
    send_mail_in_html(to,subject,htmlbody)




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


# def alicloud():
#     url = "dm.aliyuncs.com",methods:post



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
    # todo
    if current_app.debug:
        if  token=='robin':
            user = User.query.filter_by(id=32).first()
            g.user = user
            return True
    # admin帐户
    # if token == ADMIN_KEY:
    #     return True
    user = User.verify_auth_token(token)
    if not user:
        return False
    g.user = user
    return True

clientauth = HTTPTokenAuth(scheme='Token')

@clientauth.verify_token
def verify_token(token):
    client = Client.verify_auth_token(token)
    if current_app.debug:
        if token=='robin':
            client =Client.query.get(2)
    if not client:
        return False
    g.client = client
    return True


adminauth = HTTPTokenAuth(scheme='Token')

@adminauth.verify_token
def verify_token(token):
    if  token=='robin':
        return True
    else:
        return False




def single_send(mobile,text):

    # 30s内不得再发
    url='https://sms.yunpian.com/v2/sms/single_send.json'
    values = {
        "apikey":'4688548c7cde0f62b5a8a76a2d8c58c6',
        'mobile':mobile,
        'text':text
    }
    res =json.loads(requests.post(url,data=values).text)
    # res : {'msg': '发送成功', 'unit': 'RMB', 'count': 1, 'fee': 0.05, 'sid': 18693055958, 'mobile': '13250805157', 'code': 0}
    # 发送成功
    if res.get("code")==0:
        return 0
    else:
        return -1




def getcatname(id):
    return Category.query.get(id).category_name

def getclientname(id):
    if not id:
        return '等待确认中...'
    return Client.query.get(id).nickname
def getdesignername(id):
    return User.query.get(id).nickname



def decimal_default(obj):
    if not obj:
        return None
    if isinstance(obj, Decimal):
        return float(obj)
    else:
        raise TypeError
