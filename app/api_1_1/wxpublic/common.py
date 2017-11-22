import json
import urllib
import requests
import redis
# 获取access_token
from flask import jsonify, request, current_app, make_response
from flask_restful import Resource


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


def wxpublic_get_jsapi_ticket(access_token):
    url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket'
    data = {"access_token":access_token,"type":'jsapi'}
    r= requests.get(url,data)
    d = json.loads(r.text)
    return d.get("ticket")



class Conn_db():
    def __init__(self):
        # 创建对本机数据库的连接对象
        self.conn = redis.StrictRedis(host='127.0.0.1', port=6379, db=0)

    # 读取
    def get(self, key_):
        # 从数据库根据键（key）获取值
        value_ = self.conn.get(key_)
        if not value_:
            return None
        return value_.decode()


def wx_get_common_access_token():
    if  current_app.debug:
    #     调试模式
        return ''
    conn = Conn_db()
    access_token = conn.get("access_token")
    # TODO
    # 如果没取到咋办
    # if not access_token:
    #     appid = "wx35c4ce958bc7eb68"
    #     secret = "4cde0db3bb0df9597bebcad3352d503d"
    #     url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+"&secret="+secret
    #
    #     # get acess_token
    #     result = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))
    #     if('errcode' in result.keys()):
    #         return  None
    #
    #     access_token = result['access_token']

    return access_token

# 本地测试用的access_token
class TokenForTest(Resource):
    def get(self):
        # pw='123'
        # 本地环境下是取不到的
        if current_app.debug:
            return -1
        pw = request.values.get("pw")
        if pw =='123':
            # conn = Conn_db()
            # access_token = conn.get("access_token")
            access_token = wx_get_common_access_token()
            return jsonify({"ac":access_token})
        else:
            return 0


# 返回文本消息
# nakexml = ('''
#                     <xml>
#                     <ToUserName>
#                         <![CDATA[{a}]]>
#                     </ToUserName>
#                     <FromUserName>
#                         <![CDATA[{b}]]>
#                     </FromUserName>
#                     <CreateTime>{c}</CreateTime>
#                     <MsgType>
#                         <![CDATA[{d}]]>
#                     </MsgType>
#                     <Content>
#                         <![CDATA[{e}]]>
#                     </Content>
#                     </xml>
#                             ''')
#
# xml = nakexml.format(a=openid, b=dever, c='12345678', d='text', e='绑定成功')
#                 r = make_response(xml)
#                 r.content_type = 'applicaiton/xml'
def ReturnText(openid,dever,text):
    nakexml = ('''
                        <xml>
                        <ToUserName>
                            <![CDATA[{a}]]>
                        </ToUserName>
                        <FromUserName>
                            <![CDATA[{b}]]>
                        </FromUserName>
                        <CreateTime>{c}</CreateTime>
                        <MsgType>
                            <![CDATA[{d}]]>
                        </MsgType>
                        <Content>
                            <![CDATA[{e}]]>
                        </Content>
                        </xml>
                                ''')

    xml = nakexml.format(a=openid, b=dever, c='12345678', d='text', e=text)
    r = make_response(xml)
    r.content_type = 'applicaiton/xml'
    return r

