from  flask import  session,jsonify,request,url_for
import  random
from flask_restful import Resource
from flask_login import current_user,login_user
from app.common import  support_jsonp,get_access_token,get_user_info,get_wx_head
import json
from app.models import User,db,Client
from config import APPLYSTATUS
from app.api_1_1.wxpublic import wxpublic_get_access_token
import datetime
class WxVerify(Resource):
    def get(self):
        if request.args.get("code") is None:
            return jsonify({'code': -1, 'data': {"message":"code mistake"}})
        code = request.args.get("code")
        result = get_access_token(code)
        if result is None:  # 验证失败,
            return jsonify({'code': -1, 'data': {'message': 'code mistake'}})
        userinfo = get_user_info(result.get('access_token'), result.get('openid'))

        nickname = userinfo['nickname']
        unionid = userinfo['unionid']
        sex = userinfo['sex']
        headimg = userinfo['headimgurl']

        # 用户更换头像会导致微信的头像URL失效,因此要先存七牛
        r = get_wx_head(headimg, unionid)
        # if (r == 0):  # 抓取不成功
        #    return redirect(url_for('main.index'))
        headimg = 'http://userhead.houxiaopang.com/' + unionid + '.jpg'
        # 存头像结束

        session['unionid'] = unionid

        # 根据unionid是否在库,决定是去填表还是去个人中心
        user = User.query.filter_by(unionid=unionid).first()
        if user is None:  # 第一次登陆
            applystatus = APPLYSTATUS['APPLYING']
            last_login = datetime.datetime.now()
            #创建该用户实例
            user = User(last_login=last_login,nickname=nickname, unionid=unionid, sex=sex, headimg=headimg, applystatus=applystatus)
            db.session.add(user)
            try:
                db.session.commit()
            except:
                db.session.rollback()
        else:
            last_login = datetime.datetime.now()
            user.last_login = last_login
            db.session.add(user)
            try:
                db.session.commit()
            except:
                db.session.rollback()
        # 该用户登录
        login_user(user)
        session['applystatus'] = user.applystatus
        if user.applystatus == APPLYSTATUS['PASS']:  # 已审核
            # 更新一下个人资料
            # url= url_for('main.admin')  # 去个人中心
            url = "/admin"
        elif user.applystatus == APPLYSTATUS['APPLYING']:
            url = "/apply"
        else:
            if user.usertype == 0: #个人
                url = "/individual-apply"
            else:
                url = '/group-apply'

        #
        #
        # if user.applystatus == APPLYSTATUS['APPLYING']:  # 0
        #     url = "/apply"
        # else:
        #     url = "/admin"





        token = user.generate_auth_token().decode()
        applystatus = user.applystatus
        return jsonify({'code': 0, 'data': {'url': url,'token':token,'applystatus':applystatus}})




class WxVerify_Client(Resource):
    def get(self):
        if request.args.get("code") is None:
            return jsonify({'code': -1, 'data': {"message":"code mistake"}})
        code = request.args.get("code")
        # result = get_access_token(code)
        result = wxpublic_get_access_token(code)
        if result is None:  # 验证失败,
            return jsonify({'code': -1, 'data': {'message': 'code mistake'}})
        userinfo = get_user_info(result.get('access_token'), result.get('openid'))

        nickname = userinfo['nickname']
        unionid = userinfo['unionid']
        sex = userinfo['sex']
        headimg = userinfo['headimgurl']

        # 用户更换头像会导致微信的头像URL失效,因此要先存七牛
        r = get_wx_head(headimg, unionid)
        # if (r == 0):  # 抓取不成功
        #    return redirect(url_for('main.index'))
        headimg = 'http://userhead.houxiaopang.com/' + unionid + '.jpg'
        # 存头像结束

        # 根据unionid是否在库,决定是去填表还是去个人中心
        client = Client.query.filter_by(unionid=unionid).first()
        if client is None:  # 第一次登陆
            #创建该用户实例
            client = Client(nickname=nickname, unionid=unionid, sex=sex, headimg=headimg)
            db.session.add(client)
            try:
                db.session.commit()
            except:
                db.session.rollback()()

        token = client.generate_auth_token().decode()
        return jsonify({'code': 0, 'data': {"token":token}})
