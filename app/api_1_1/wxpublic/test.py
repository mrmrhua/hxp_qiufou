from  flask import jsonify,request,Response,make_response
from flask_restful import Resource
import hashlib
import json
import urllib
import sys
from app.models import *
from app.common import *
import xml.etree.ElementTree as ET
from .common import wxpublic_get_access_token,ReturnText
def UnScribe(openid):
    pm = PushMessage.query.filter_by(openid=openid).first()
    if not pm:
        return -1
    else:
        db.session.delete(pm)
        db.session.commit()
        return 0


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
    def post(self):

        # 扫码关注
        xml = request.data.decode()
        root = ET.fromstring(xml)
        openid=None
        event=None
        msgtype=None
        content=None
        user_id=None
        dever = None

        # 查找元素
        for child in root.iter(tag='FromUserName'):
            openid = child.text
        # print("openid %r" % openid)
        for child in root.iter(tag='Event'):
            event = child.text
        # print("event %r" % event)
        for child in root.iter(tag='ToUserName'):
            dever = child.text
        if not event:
            # print("no event")
            for child in root.iter(tag='MsgType'):
                msgtype = child.text
            # print("msgtype %r" % msgtype)
            if msgtype=='text':
                for child in root.iter(tag='Content'):
                    content = child.text
                # print("Content %r" % content)
                if content=='T' or content=='解绑':
                    UnScribe(openid)
                    return ReturnText(openid,dever,'成功解绑')

        if event == 'TEMPLATESENDJOBFINISH':
            return ''
        if event =='subscribe' or event=='SCAN':

            for child in root.iter(tag='FromUserName'):
                openid = child.text
            for child in root.iter(tag='EventKey'):
                user_id = child.text
            #     搜索关注的
            if not user_id:
                return Response('', mimetype='text')
            if event=='subscribe':
                user_id= user_id.split("_")[1]
            # print("user_id %r"%user_id)
            u = User.query.filter_by(id=user_id).first()
            if not u:
                return Response('', mimetype='text')
            # 排重处理
            # todo

            # 该微信号是否已经有绑定了
            pm = PushMessage.query.filter_by(openid=openid,user_id=user_id).first()
            # print("pm %r" % pm)
            if pm:
                # 不返回消息
                return Response('', mimetype='text')
            pm = PushMessage.query.filter_by(user_id=user_id).first()
            if pm:
                # 您的账户已被他人绑定
                return ReturnText(openid, dever, '该账户已被他人绑定')
            pm = PushMessage.query.filter_by(openid=openid).first()
            if pm:
                # 您的账户已绑定其他账户
                return ReturnText(openid, dever, '您的微信已绑定其他账号')

            pm = PushMessage(user_id=user_id,openid=openid)
            db.session.add(pm)
            db.session.commit()
            # print("xml")
            return ReturnText(openid, dever, '绑定成功')
        else:
            return Response('', mimetype='text')


#
#
# class TTTTest(Resource):
#     def get(self):
#         xml = ('<xml><ToUserName><![CDATA[{a}]]></ToUserName><FromUserName><![CDATA[{b}]]></FromUserName><CreateTime>{c}</CreateTime><MsgType><![CDATA[{d}]]></MsgType><Content><![CDATA[{e}]]></Content></xml>')\
#                 .format(a='123', b='ding', c='12345678', d='text', e='绑定成功')
#
#         # help: http://kb.cnblogs.com/page/549886/
#
#         # root = ET.fromstring(xml)
#         # # 查找元素
#         # # for child in root.iter(tag='FromUserName')
#         # # 构建XML
#         # a = ET.Element('elem')
#         # c = ET.SubElement(a, 'child1')
#         # c.text = "some text"
#         r = make_response(xml)
#         r.content_type= 'applicaiton/xml'
#         return r







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


        user = User.query.filter_by(unionid=unionid).first()
        if user is None:  # 第一次登陆
            applystatus = APPLYSTATUS['APPLYING']
            nickname = userinfo['nickname']
            sex = userinfo['sex']
            headimg = userinfo['headimgurl']

            # 用户更换头像会导致微信的头像URL失效,因此要先存七牛
            r = get_wx_head(headimg, unionid)
            # if (r == 0):  # 抓取不成功
            #    return redirect(url_for('main.index'))
            headimg = 'http://userhead.houxiaopang.com/' + unionid + '.jpg'
            # 存头像结束

            #创建该用户实例
            user = User(nickname=nickname, unionid=unionid, sex=sex, headimg=headimg, applystatus=applystatus)
            db.session.add(user)
            try:
                db.session.commit()
            except:
                db.session.rollback()()

        token = user.generate_auth_token().decode()
        applystatus = user.applystatus
        return jsonify({'code': 0, 'data': {'token':token,'applystatus':applystatus}})




def wxpublic_get_user_info(access_token,openid):
    url = 'https://api.weixin.qq.com/sns/userinfo?access_token={a}&openid={b}&lang=zh_CN'.format(a=access_token, b=openid)
    userinfo = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))
    return userinfo





