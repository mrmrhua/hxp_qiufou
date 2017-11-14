import requests
from .common import wxpublic_get_access_token,wx_get_common_access_token
from app.models import PushMessage,Demand
from flask_restful import Resource
from flask import request,jsonify,current_app
import json
from datetime import datetime
import re
# 审核结果推送
# 通过
def ApplySuccess(id):
    pm = PushMessage.query.filter_by(user_id=id).first()
    if not pm:
        return -1
    openid = pm.openid
    dt = datetime.now()

    ACCESS_TOKEN = wx_get_common_access_token()
    url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='+ACCESS_TOKEN
    values = {
        "touser": openid,
        "template_id": "V0TBjJ9dZbWoxcX_DNxGB3ou2ZkfG5jh9vK8kwatI0U",
        "data": {
            "first": {
                "value": "恭喜您通过猴小胖的入驻审核！",
                "color": "#173177"
            },
            "keyword1": {
                "value": "入驻申请",
                "color": "#173177"
            },
            "keyword2": {
                "value": "设计师ID:%s" % id,
                "color": "#173177"
            },
            "keyword3": {
                "value": str(dt.strftime('%Y-%m-%d')),
                "color": "#173177"
            },
            "remark": {
                "value": "相关通知信息已发至您的邮箱.您也可以扫码登录网站houxiaopang.com上传个人作品集。接下来如果有适合您的项目，我们会通过该服务号向您推送。",
                "color": "#173177"
            }
        }
    }
    r = requests.post(url, data=json.dumps(values))
    return r


def ApplyFail(id):
    pm = PushMessage.query.filter_by(user_id=id).first()
    if not pm:
        return -1
    openid = pm.openid
    dt = datetime.now()

    ACCESS_TOKEN = wx_get_common_access_token()
    url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='+ACCESS_TOKEN
    values = {
        "touser": openid,
        "template_id": "V0TBjJ9dZbWoxcX_DNxGB3ou2ZkfG5jh9vK8kwatI0U",
        "data": {
            "first": {
                "value": "遗憾的通知您，未通过猴小胖的入驻审核！",
                "color": "#173177"
            },
            "keyword1": {
                "value": "入驻申请",
                "color": "#173177"
            },
            "keyword2": {
                "value": "设计师ID:%s" % id,
                "color": "#173177"
            },
            "keyword3": {
                "value": str(dt.strftime('%Y-%m-%d')),
                "color": "#173177"
            },
            "remark": {
                "value": "建议您重新提交入驻申请，并上传更多能体现您水准的设计作品。",
                "color": "#173177"
            }
        }
    }
    r = requests.post(url, data=json.dumps(values))
    return r

def re_html(html):
    re_h = re.compile('</?\w+[^>]*>')
    s = re_h.sub('', html)
    return s[0:10]

# 需求推送
class PushDemand(Resource):
    def post(self):
        demand_id = request.values.get("demand_id")
        pm = PushMessage.query.all()
        dt = str(datetime.now().strftime('%Y-%m-%d'))
        d = Demand.query.filter_by(id=demand_id).first()
        if not d:
            return None

        ACCESS_TOKEN = wx_get_common_access_token()
        url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + ACCESS_TOKEN
        # current_app.logger.info("ac %r" %ACCESS_TOKEN)
        for i in pm:
            values = {
                "touser": i.openid,
                "template_id": "ZEbJMAmzmU56cqqRru61r139vP_jEJSDvmzV0jEc5ac",
                "url": 'http://m.houxiaopang.com/demand/#/detail/'+demand_id,
                "data": {
                    "first": {
                        "value": "您收到一个设计项目邀约",
                        "color": "#173177"
                    },
                    "keyword1": {
                        "value": d.title,
                        "color": "#173177"
                    },
                    "keyword2": {
                        "value": re_html(d.description),
                        "color": "#173177"
                    },
                    "keyword3": {
                        "value": '',
                        "color": "#173177"
                    },
                    "keyword4": {
                        "value": '',
                        "color": "#173177"
                    },
                    "keyword5": {
                        "value": dt,
                        "color": "#173177"
                    },
                    "remark": {
                        "value": "点击此处进入报价。",
                        "color": "#173177"
                    }
                }
            }
            r = requests.post(url, data=json.dumps(values))
            print(r.content)
            return jsonify({"code":0})

#
# class TTTest(Resource):
#     def get(self):
#         ACCESS_TOKEN = wx_get_common_access_token()
#         url = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token='+ACCESS_TOKEN
#         values = {
#   "button": [
#     {
#       "name": "设计",
#       "type": "view",
#       "url": "http://houxiaopang.com"
#     },
#       {
#           "name": "客户",
#           "type": "view",
#           "url": "http://houxiaopang.com"
#       }
#
#   ]
# }
#         r= requests.post(url,data=values)
#         print(r.content)
#
#         return jsonify({"code": 0})