from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
import json
from app.models import User,db,Tag,Category,Exp,Notice,Subscribtion
from app.common import auth

class UnreadNum(Resource):
    @auth.login_required
    def get(self):

        return jsonify({'code':0,'data':{'num':5}})


class NoticeRecent(Resource):
    @auth.login_required
    def get(self):
        return jsonify({'code':0,'data':{'notice':[
            {'content':'hello','up_time':'2017-08-01 18:20:00','status':0},
            {'content': 'hello', 'up_time': '2017-08-01 18:20:00', 'status': 0}
        ] }})


# 清空所有未读消息
class ClearAll(Resource):
    @auth.login_required
    def post(self):
        return jsonify({'code':0})


class SendNotice(Resource):
    def post(self):
        # 密码正确
        if request.values.get("pw") == 'houxiaopang666':
            content = request.values.get("content")
            n = Notice.NewNotice(content)
            db.session.add(n)
            db.session.flush()
            r_id = request.values.get("receiver_id")
            if r_id: #指定发送
                sub = Subscribtion(user_id=r_id, notice_id=n.id,status=0)
            else: #群发
                sub = [ (Subscribtion(user_id = i.id , notice_id=n.id) for i in User.query.filter_by(applystatus=2).all()) ]


            # TODO ...
            return jsonify({'code': 0})
        return jsonify({'code': -1})

class AllNotice(Resource):
    def get(self):
        return jsonify({'code': 0, 'data': {'notice': [
            {'content': '最近，深圳多个小区内的商品房业主与公租房租户发生冲突。有业主怒怼租户，要求物业禁止租户进入小区花园、禁止使用停车位、商品房与公租房进行隔离……在全国不少地方，只要是采取商品房配建保障房政策的小区，这种矛盾一直存在，至今没有靠谱的解决方法。', 'up_time': '2017-08-01 18:20:00', 'status': 0},
            {'content': '商品房和保障房人为隔断，是因为有一条“住房鄙视链”，住豪宅的很多人看不上住保障房的。', 'up_time': '2017-08-01 18:20:00', 'status': 0},
            {'content': '最近，深圳多个小区内的商品房业主与公租房租户发生冲突。有业主怒怼租户，要求物业禁止租户进入小区花园、禁止使用停车位、商品房与公租房进行隔离……在全国不少地方，只要是采取商品房配建保障房政策的小区，这种矛盾一直存在，至今没有靠谱的解决方法。', 'up_time': '2017-08-01 18:20:00', 'status': 0},
            {'content': 'hello', 'up_time': '2017-08-01 18:20:00', 'status': 0},
            {'content': '保障房建设应该推动不同收入群体混合居住，为了避免矛盾发生，收入差异最好不要太过于悬殊。', 'up_time': '2017-08-01 18:20:00', 'status': 0},
            {'content': '最近，深圳多个小区内的商品房业主与公租房租户发生冲突。有业主怒怼租户，要求物业禁止租户进入小区花园、禁止使用停车位、商品房与公租房进行隔离……在全国不少地方，只要是采取商品房配建保障房政策的小区，这种矛盾一直存在，至今没有靠谱的解决方法。', 'up_time': '2017-08-01 18:20:00', 'status': 0},
            {'content': 'hello', 'up_time': '2017-08-01 18:20:00', 'status': 0},
            {'content': 'hello', 'up_time': '2017-08-01 18:20:00', 'status': 0},
            {'content': '保障房建设应该推动不同收入群体混合居住，为了避免矛盾发生，收入差异最好不要太过于悬殊。', 'up_time': '2017-08-01 18:20:00', 'status': 0},
            {'content': '混居社区不该分隔管理，非要分隔的，公共设施也要分别建设，防止保障房“被平均”。', 'up_time': '2017-08-01 18:20:00', 'status': 0}
        ]}})