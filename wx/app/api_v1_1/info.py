from  flask import session, jsonify, request, url_for, g,current_app
from flask_restful import Resource
from app.wxmodels import *
from app import db
import json
import urllib.parse
import random
from app.common import *
from datetime import datetime


class GetUID(Resource):
    def get(self):
        code = request.values.get("code")
        encryptedData = request.values.get("encryptedData")
        iv = request.values.get("iv")
        url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxdfb82dad3e5a5d2f&secret=00aae3c9d4335121e944761b0ab95a57&js_code=' \
              + code + '&grant_type=authorization_code'
        # get acess_token
        try:
            result = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))
        except Exception:
            return jsonify({'code': 1})
        res_unionid = result.get("unionid")
        if not res_unionid:
            try:
                decrypt_val = Decrypt(encryptedData, iv, result.get("session_key"))
            except Exception:
                return jsonify({'code': 1})

            res_unionid = decrypt_val.get("unionId")
            nickname = decrypt_val.get("nickName")
            headimg = decrypt_val.get("avatarUrl")
        u = User.query.filter_by(uid=res_unionid).first()

        # 用户不存在
        if not u:
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
            headimg = 'http://userhead.houxiaopang.com/' + res_unionid + '.jpg'
            # 存头像结束
            u = User(uid=res_unionid, nickname=nickname,headimg=headimg)
            db.session.add(u)
            # 认领demo项目
            pro = Project(uid=u.uid,designer=u.nickname,demand_id=DEMO_ID,cat_id=7)
            db.session.add(pro)
            db.session.flush()

            desc = '做了两款草图，您看一下偏好哪个。我这边今晚在这个基础上细化就可以了'
            up_time = datetime.now()
            p1 = Post(up_time=up_time, desc=desc)
            pro.posts.append(p1)
            db.session.flush()
            print(p1)
            work = Designwork(work_url='http://work.houxiaopang.com/o_1bt6lpd8jdo41c813nu12l21v8u9.png')
            p1.works.append(work)
            work = Designwork(work_url='http://work.houxiaopang.com/o_1bt6lpd8digk1bcs2pd1bsb59s7.png')
            p1.works.append(work)
            print(p1.works)
            db.session.flush()

            desc = '根据反馈意见调整了：1.大红包人更可爱点;2.改成了“红包入侵”四个字;3.	地球上的小红包改成用拟人的大红包;4.地球和地球上的建筑再重新画了一下，更加饱满'
            up_time = datetime.now()
            p = Post(up_time=up_time, desc=desc)
            pro.posts.append(p)
            db.session.flush()
            work = Designwork(work_url='http://work.houxiaopang.com/o_1bt6lukuvs25kg870h1d8snri7.png')
            p.works.append(work)
            print(p.works)

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
            d.user_id = None
            db.session.add(d)
            db.session.commit()
            return jsonify({'code': 0})
        else:
            return jsonify({'code': -1})


class GetHot(Resource):
    def get(self):
        s = [
            'http://img.zcool.cn/community/0183465744329b0000008eae582b15.jpg@340w_1l_2o_100sh.png',
            'http://img.zcool.cn/community/01b69259a77a94a801211d258b1afd.jpg@340w_1l_2o_100sh.png',
            'http://img.zcool.cn/community/01f7ae5974734ca8012193a3ad0bba.jpg@340w_1l_2o_100sh.png',
            'http://work.houxiaopang.com/ppt/cpfbh/bp/thumb_650_2213_big_2016081204331642418659%5B1%5D.jpg?imageView2/2/w/340',
            'http://img.hb.aicdn.com/eac1f7a134557cbcc47f77068cd87ed78ca9f7a854bac-SbbhbD_fw658',
            'http://img.hb.aicdn.com/8a943270d91edf7c7686243c9fe6e6d94e136f13117b33-ajdm0e_fw658',
            'http://img.hb.aicdn.com/ab88b803b38089ef3ba203bc7dd717ce3b13b2aa362a5-n6k5Ix_fw658',
            'http://img.hb.aicdn.com/8323584df3e9fb68f80c718367277633dc4193199f99-G7VCPU_fw658',
            'http://img.hb.aicdn.com/b7300cc034d9dc9ee60b94bd9ca05047e71ecba3202f4-YeaUWe_fw658',
            'http://img.hb.aicdn.com/572e66250ad86a697e4d1a4b75a8551228bde601ed69e-h24QSb_fw658',
            'http://img.hb.aicdn.com/d7ce922b0098f1876ddfdfd53603805691986f21220b6-eLqyWe_fw658',
            'http://img.hb.aicdn.com/5397cea1ea202ddd1b65ca1560bc9cd034b41c35f2d0-12kelg_fw658',
        ]
        imgs = random.sample(s,4)
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


class GetReceived(Resource):
    def get(self):
        uid = request.values.get("uid")
        u = User.query.filter_by(uid=uid).first()
        if not u:
            return jsonify({'code': -1})
        if u.lastvisited is None:
            demands=[]
        else:
            demands = [{'demand_id': i.id, 'demand_title': i.cat.cat_name,
                    'up_time': datetime.strftime(i.up_time, "%Y-%m-%d %H:%M"), 'cat': i.cat_id} for i in u.lastvisited]
        return jsonify({'code': 0, 'data': {'demands': demands}})


class DelReceived(Resource):
    def post(self):
        demand_id = request.json.get("demand_id")
        uid = request.json.get("uid")
        u = User.query.filter_by(uid=uid).first()
        d = Demand.query.filter_by(id=demand_id).first()
        if d and u:
            u.lastvisited.remove(d)
            return jsonify({'code': 0})
        else:
            return jsonify({'code': -1})

class VisitiDemand(Resource):
    def post(self):
        demand_id = request.json.get("demand_id")
        uid = request.json.get("uid")
        u = User.query.filter_by(uid=uid).first()
        d = Demand.query.filter_by(id=demand_id).first()
        if d and u:
            if d not in u.lastvisited:
                u.lastvisited.append(d)
                return jsonify({'code': 0})

        return jsonify({'code': -1})