from  flask import session, jsonify, request, url_for, g,current_app
from flask_restful import Resource
from app.wxmodels import *
from app import db
import json
import urllib.parse
import random
import base64
from Crypto.Cipher import AES
from app.common import get_wx_head

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



class GetUID(Resource):
    def get(self):
        code = request.values.get("code")
        encryptedData = request.values.get("encryptedData")
        iv = request.values.get("iv")
        url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxdfb82dad3e5a5d2f&secret=00aae3c9d4335121e944761b0ab95a57&js_code=' \
              + code + '&grant_type=authorization_code'
        # get acess_token
        result = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))
        res_unionid = result.get("unionid")

        u = User.query.filter_by(uid=res_unionid).first()
        if u:
            if u.unionid and u.nickname:
                pass
            else:   # todo 待删除
                  # 兼容早期用户，缺unionid或nickname
                try:
                    decrypt_val = Decrypt(encryptedData, iv, result.get("session_key"))
                except UnicodeDecodeError:
                    return jsonify({'code': 1})
                res_unionid = decrypt_val.get("unionId")
                nickname = decrypt_val.get("nickName")
                headimg = decrypt_val.get("avatarUrl")
                # 头像转存七牛
                r = get_wx_head(headimg, res_unionid)
                headimg = 'http://userhead.houxiaopang.com/wxhead/' + res_unionid + '.jpg'
                # 存头像结束

                if not u.uid:  # 如果unionid木有
                    u.uid = res_unionid
                    db.session.add(u)
                    db.session.commit()
                if not u.nickname:  # 如果昵称木有
                    u.nickname = nickname
                    db.session.add(u)
                    db.session.commit()
                if not u.headimg:
                    u.headimg = headimg
                    db.session.add(u)
                    db.session.commit()
            return jsonify({'code': 0, 'data': {'uid': u.uid}})

        # 用户不存在
        else:
            # 手动解密
            try:
                decrypt_val = Decrypt(encryptedData, iv, result.get("session_key"))
            except UnicodeDecodeError:
                return jsonify({'code': 1})
            res_unionid = decrypt_val.get("unionId")
            nickname = decrypt_val.get("nickName")
            headimg = decrypt_val.get("avatarUrl")
            # TODO
            # 头像转存七牛
            # 用户更换头像会导致微信的头像URL失效,因此要先存七牛
            r = get_wx_head(headimg, res_unionid)
            headimg = 'http://userhead.houxiaopang.com/wxhead/' + res_unionid + '.jpg'
            # 存头像结束

            u = User(uid=res_unionid, nickname=nickname,headimg=headimg)
            db.session.add(u)
            db.session.commit()

        return jsonify({'code':0,'data':{'uid':u.uid}})

class GetDemand(Resource):
    def get(self):
        uid = request.values.get("uid")
        u = User.query.filter_by(uid=uid).first()
        if not u:
            return jsonify({'code': -1,})
        if u.demands is None:
            demands=[]
        else:
            demands = [{'demand_id': i.id,'demand_title':i.cat.cat_name,'up_time':datetime.strftime(i.up_time,"%Y-%m-%d %H:%M"),'cat':i.cat_id} for i in u.demands]
        return jsonify({'code': 0, 'data': {'demands':demands}})


class DelDemand(Resource):
    def post(self):
        demand_id = request.json.get("demand_id")
        uid = request.json.get("uid")
        d = Demand.query.filter_by(id=demand_id).first()
        if not d:
            return  jsonify({'code': -1})
        elif d.user.uid == uid:
            db.session.delete(d)
            db.session.commit()
            return jsonify({'code': 0})
        else:
            return jsonify({'code': -1})


class GetHot(Resource):
    def get(self):
        a = []
        s ='http://img.zcool.cn/community/0183465744329b0000008eae582b15.jpg@340w_1l_2o_100sh.png'
        a.append(s)
        s ='http://img.zcool.cn/community/01b69259a77a94a801211d258b1afd.jpg@340w_1l_2o_100sh.png'
        a.append(s)
        s ='http://img.zcool.cn/community/01f7ae5974734ca8012193a3ad0bba.jpg@340w_1l_2o_100sh.png'
        a.append(s)
        s ='http://work.houxiaopang.com/ppt/cpfbh/bp/thumb_650_2213_big_2016081204331642418659%5B1%5D.jpg?imageView2/2/w/340'
        a.append(s)
        s = 'http://img.hb.aicdn.com/eac1f7a134557cbcc47f77068cd87ed78ca9f7a854bac-SbbhbD_fw658'
        a.append(s)
        s= 'http://img.hb.aicdn.com/8a943270d91edf7c7686243c9fe6e6d94e136f13117b33-ajdm0e_fw658'
        a.append(s)
        imgs = random.sample(a,4)
        return jsonify({'code': 0, 'data': {'imglist':imgs}})


class FeedBack(Resource):
    def post(self):
        uid = request.json.get("uid")
        content = request.json.get("content")
        tel = request.json.get("tel")
        fb = Feedback(uid=uid,content=content,tel=tel)
        db.session.add(fb)
        db.session.commit()
        #  TODO
        # 发邮件给管理员
        return jsonify({'code':0})


