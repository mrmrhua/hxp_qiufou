
import redis  # redis数据库链接
import json
import urllib
import time
import requests
class Conn_db():
    def __init__(self):
        # 创建对本机数据库的连接对象
        self.conn = redis.StrictRedis(host='127.0.0.1', port=6379, db=0)

    # 存储
    def set(self, key_, value_):
        # 将数据存储到数据库
        print(value_)
        self.conn.set(key_, value_)

    # 读取
    def get(self, key_):
        # 从数据库根据键（key）获取值
        print(key_)
        value_ = self.conn.get(key_)
        return value_


def wx_get_common_access_token():
    appid = "wx35c4ce958bc7eb68"
    secret = "4cde0db3bb0df9597bebcad3352d503d"
    url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+"&secret="+secret

    # get acess_token
    # result = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))
    result= json.loads(requests.get(url).content.decode())
    if('errcode' in result):
        return  None

    access_token = result.get("access_token")
    return access_token




def update_access_token_intime():
    global conn
    token = wx_get_common_access_token()
    conn.set('access_token',token)


conn = Conn_db()

if __name__ == '__main__':
    while True:
        update_access_token_intime()
        time.sleep(6900)


