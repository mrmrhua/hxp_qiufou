import urllib
import json
import redis
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


class Conn_db():
    def __init__(self):
        # 创建对本机数据库的连接对象
        self.conn = redis.StrictRedis(host='127.0.0.1', port=6379, db=0)

    # 读取
    def get(self, key_):
        # 从数据库根据键（key）获取值
        value_ = self.conn.get(key_)
        return value_.decode()


def wx_get_common_access_token():
    conn = Conn_db()
    access_token = conn.get("access_token")
    if not access_token:
        appid = "wx35c4ce958bc7eb68"
        secret = "4cde0db3bb0df9597bebcad3352d503d"
        url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+"&secret="+secret

        # get acess_token
        result = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))
        if('errcode' in result.keys()):
            return  None

        access_token = result['access_token']

    return access_token