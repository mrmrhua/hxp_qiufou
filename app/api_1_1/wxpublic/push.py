import requests
from .common import wxpublic_get_access_token,wx_get_common_access_token
from app.models import PushMessage,Demand
from flask_restful import Resource
from flask import request,jsonify
import json
from datetime import datetime

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

# 需求推送
def PushDemand(demand_id):
    pm = PushMessage.query.all()
    dt = str(datetime.now().strftime('%Y-%m-%d'))
    d = Demand.query.filter_by(id=demand_id).first()
    if not d:
        return None

    ACCESS_TOKEN = wx_get_common_access_token()
    url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + ACCESS_TOKEN

    for i in pm:
        values = {
            "touser": i.openid,
            "template_id": "ZEbJMAmzmU56cqqRru61r139vP_jEJSDvmzV0jEc5ac",
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
                    "value": '',
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
        return r


# 回复T取消项目推送
# 调用解绑


# todo
# class


# def RemovePush()



class TTTest(Resource):
    def get(self):
        r= PushDemand(17)
        print(r)
        return jsonify({"code": 0})