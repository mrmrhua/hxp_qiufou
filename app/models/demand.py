from app import db
from sqlalchemy.dialects.mysql import INTEGER
from flask import g
import json
from datetime import datetime
class Demand(db.Model):
    __tablename__ = 'demands'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    description = db.Column(db.Text)
    desc_img = db.Column(db.Text, nullable=True)
    howlong = db.Column(db.String(20), nullable=True)
    howmuch = db.Column(db.String(20), nullable=True)
    agent_id  = db.Column(INTEGER(unsigned=True),nullable=True)
    category = db.Column(db.Integer,nullable=True)
    up_time = db.Column(db.DateTime,nullable=True)
    demandstatus = db.Column(db.Integer)   #0:招募中,1:已结束


    def __repr__(self):
        return '<Demand % r>' % self.title

    @staticmethod
    def from_request(request):
        title = request.values.get("title")
        description = request.values.get("description")
        desc_img = request.values.get("desc_img")
        howlong = request.values.get("howlong")
        howmuch = request.values.get("howmuch")
        agent_id = int(request.values.get("agent_id"))
        category = int(request.values.get("category"))
        up_time = datetime.now()
        return Demand(title=title,description=description,desc_img=desc_img,howlong=howlong,howmuch=howmuch,agent_id=agent_id,category=category,up_time=up_time)


class Demand_User(db.Model):
    __tablename__ = 'demands_users'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    demand_id = db.Column(INTEGER(unsigned=True),db.ForeignKey('demands.id'),nullable=True)
    user_id = db.Column(INTEGER(unsigned=True),db.ForeignKey('users.id'))
    howlong = db.Column(db.String(20), nullable=True)
    howmuch = db.Column(db.String(20), nullable=True)
    ideas = db.Column(db.Text, nullable=True)
    tel = db.Column(db.String(11), nullable=True)
    worklist = db.Column(db.Text, nullable=True)
    nickname = db.Column(db.String(20), nullable=True)
    recom = db.relationship('Demand_Recom',backref='apply')
    # 放选用的作品集ID号
    albumlist = db.Column(db.String(64))

    def __repr__(self):
        return '<Demand_User % r & %r>' % (self.demand_id,self.user_id)

    @staticmethod
    def from_request(request):
        demand_id = request.values.get("demand_id")
        designer_id = g.user.id
        replyform = json.loads(request.values.get("replyform"))
        ideas = replyform.get("ideas")
        howlong = replyform.get("howlong")
        howmuch = replyform.get("howmuch")
        # 封装好的字符串比如"[12,13,14]"
        albumlist = replyform.get("albumlist")
        return Demand_User(albumlist=albumlist,demand_id=demand_id,user_id=designer_id,ideas=ideas,howlong=howlong, howmuch=howmuch)

    # todo(TMP)
    @staticmethod
    def from_request_tmp(request):
        demand_id = request.values.get("demand_id")
        replyform = json.loads(request.values.get("replyform"))
        ideas = replyform.get("ideas")
        howlong = replyform.get("howlong")
        howmuch = replyform.get("howmuch")
        tel = replyform.get("tel")
        worklist = replyform.get("worklist")

        nickname=replyform.get("nickname")
        user_id = replyform.get("user_id")
        # if not user_id:
        #     return Demand_User(demand_id=demand_id,ideas=ideas, howlong=howlong, howmuch=howmuch,
        #                        worklist=worklist, tel=tel,nickname=nickname)
        # else:
        return Demand_User(demand_id=demand_id, user_id=user_id, ideas=ideas, howlong=howlong,\
            howmuch=howmuch,worklist=worklist,tel=tel,nickname=nickname)


class Demand_Recom(db.Model):
    __tablename__ = 'demands_recom'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    demand_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('demands.id'))
    user_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'),nullable=True)
    deapply_id = db.Column(INTEGER(unsigned=True),db.ForeignKey('demands_users.id'),nullable=True)
    howlong = db.Column(db.String(20), nullable=True)
    howmuch = db.Column(db.String(20), nullable=True)
    ideas = db.Column(db.String(255), nullable=True)
    # album_ids = db.Column(db.String(20), nullable=True)
    worklist = db.Column(db.Text, nullable=True)
    nickname = db.Column(db.String(20), nullable=True)
    # 放选用的作品集ID号
    albumlist = db.Column(db.String(64))
    def __repr__(self):
        return '<Demand_Recom % r  >' % (self.demand_id)