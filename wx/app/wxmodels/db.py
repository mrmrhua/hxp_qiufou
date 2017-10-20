from app import db
from sqlalchemy.dialects.mysql import INTEGER
from flask import g
import json
from datetime import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer,BadSignature,SignatureExpired
from flask import request,current_app,session

import random
Tag_Screen  = db.Table('tags_screens',
                      db.Column('screen_id',INTEGER(unsigned=True), db.ForeignKey('screens.id')),
                      db.Column('tag_id',INTEGER(unsigned=True), db.ForeignKey('tags.id'))
                      )
class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    tag_name = db.Column(db.String(8))
    cat_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('categories.id'))
    screens = db.relationship('Screen',
                            secondary=Tag_Screen,
                            backref=db.backref('tags', lazy='dynamic'),
                            lazy='dynamic')  # lazy = 'dynamic' :关系两侧返回的查询都可接受额外的过滤器

    def __repr__(self):
        return '<Tag: %r>' % (self.tag_name)


class Screen(db.Model):
    __tablename__ = 'screens'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    Screen_name = db.Column(db.String(10))


class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    cat_name = db.Column(db.String(6), unique=True)
    demands = db.relationship('Demand', backref='cat')

    def __repr__(self):
        return '<Cat: %r>' % (self.cat_name)

class Img_Tag(db.Model):
    __tablename__ = 'imgs_tags'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    url = db.Column(db.String(255))
    tag_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('tags.id'))
    cat_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('categories.id'))
    screen_id =   db.Column(INTEGER(unsigned=True), db.ForeignKey('screens.id'))
    def __repr__(self):
        return '<img_tag: %r>' % (self.url)


Color_Tag  = db.Table('colors_tags',
                      db.Column('color_id',INTEGER(unsigned=True), db.ForeignKey('colors.id')),
                      db.Column('tag_id',INTEGER(unsigned=True), db.ForeignKey('tags.id'))
                      )
class Color(db.Model):
    __tablename__ = 'colors'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    color_val=db.Column(db.String(8))
    color_name=db.Column(db.String(4))
    color_desc = db.Column(db.String(64))
    # 多对多关系: 把secondary参数设为关联表
    tags = db.relationship('Tag',
                            secondary=Color_Tag,
                            backref=db.backref('colors', lazy='dynamic'),
                            lazy='dynamic')  # lazy = 'dynamic' :关系两侧返回的查询都可接受额外的过滤器


    def __repr__(self):
        return '<Color: %r>' % (self.color_name)


LastVisited = db.Table('lastvisited',
                    db.Column('user_id', INTEGER(unsigned=True), db.ForeignKey('users.id')),
                    db.Column('demand_id', INTEGER(unsigned=True), db.ForeignKey('demands.id'))
                    )



class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    uid = db.Column(db.String(64),unique=True,nullable=True)
    # 弃用unionid
    unionid = db.Column(db.String(64), unique=True,nullable=True)
    nickname = db.Column(db.String(64))
    login_code = db.Column(db.String(32))
    headimg = db.Column(db.String(255))
    demands = db.relationship("Demand", backref="user",order_by='desc(Demand.up_time)')

    # lastvisited
    lastvisited = db.relationship('Demand',
                            secondary=LastVisited,
                            lazy='dynamic')  # lazy = 'dynamic' :关系两侧返回的查询都可接受额外的过滤器

    # # 生成一个会过期的token,默认200分钟
    def generate_auth_token(self, expiration=12000):
        s = Serializer(current_app.config['SECRET_KEY'],
                       expires_in=expiration)
        # 生成一个随机数,存进token里. session里也存一个
        nonce = random.randint(1, 100)
        session['lognonce'] = nonce
        t = s.dumps({'id': self.id, 'nonce': nonce})
        return t

    # 验证token
    @staticmethod
    def verify_auth_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None  # valid token, but expired
        except BadSignature:
            return None  # invalid token

        return User.query.get(data['id'])

    def __repr__(self):
        return '<User: %r>' % (self.id)

class Demand(db.Model):
    __tablename__ = 'demands'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    cat_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('categories.id'))
    screen = db.Column(db.String(10))
    imglist = db.Column(db.Text)
    color = db.Column(db.String(64))
    page = db.Column(db.String(8))
    desc = db.Column(db.Text)
    scale = db.Column(db.String(8))
    up_time = db.Column(db.DateTime)

    industry = db.Column(db.String(8))
    tel = db.Column(db.String(11),server_default='未填写')
    wx_num = db.Column(db.String(64),server_default='未填写')
    name = db.Column(db.String(10),server_default='未填写')
    business_desc =  db.Column(db.String(32),server_default='未填写')
    qrcode = db.Column(db.Boolean)
    tech = db.Column(db.String(8))
    howmuch = db.Column(db.String(32))
    howlong = db.Column(db.String(32))


    user_id =  db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'))

    detailtext = db.Column(db.Text)
    projects = db.relationship("Project",backref='demand')

    @staticmethod
    def from_request_ppt(request):
        cat_id = 1
        screen = request.json.get("screen")
        imglist =  request.json.get("imglist")
        color = request.json.get("color")
        page = request.json.get("page")
        desc = request.json.get("desc")
        scale = request.json.get("scale")
        up_time = datetime.now()
        # 微信：参数名为tel
        wx = request.json.get("tel")
        name = request.json.get("name")
        howmuch=request.json.get("howmuch")
        howlong = request.json.get("howlong")
        return  Demand(cat_id=cat_id,screen=screen,imglist=imglist,color=color,page=page,desc=desc,scale=scale,up_time=up_time,wx_num=wx,\
                       name=name,howmuch=howmuch,howlong=howlong)

    @staticmethod
    def from_request_card(request):
        cat_id = 3
        industry = request.json.get("industry")
        # imglist='[{"tag":"文艺质感","url":"http://work.houxiaopang.com/mp/wyzg/10.jpg"},{"tag":"文艺质感","url":"http://work.houxiaopang.com/mp/wyzg/2.jpg"}]'
        imglist=request.json.get("imglist")
        color = request.json.get("color")
        # 微信：参数名为tel
        wx = request.json.get("tel")
        name = request.json.get("name")
        up_time = datetime.now()
        business_desc= request.json.get("business_desc")
        qrcode = request.json.get("QRcode")
        tech=request.json.get("tech")
        howmuch=request.json.get("howmuch")
        howlong = request.json.get("howlong")

        return Demand(cat_id=cat_id,industry=industry,imglist=imglist,color=color,wx_num=wx,name=name\
                      ,up_time=up_time,business_desc=business_desc,qrcode=qrcode,tech=tech,howmuch=howmuch,howlong=howlong)

    @staticmethod
    def from_request_ui(request):
        cat_id = request.json.get("cat_id")
        detailtext = request.json.get("detail")
        up_time = datetime.now()
        detail = json.loads(detailtext)
        # 微信：参数名为tel
        wx = detail.get("tel")
        name = detail.get("nickname")
        howmuch = detail.get("howmuch")
        howlong = detail.get("howlong")
        return Demand(cat_id=cat_id,up_time=up_time,wx_num=wx,name=name,detailtext=detailtext,howmuch=howmuch,howlong=howlong)

    @staticmethod
    def from_request_hb(request):
        cat_id = request.json.get("cat_id")
        detailtext = request.json.get("detail")
        up_time = datetime.now()
        detail = json.loads(detailtext)
        # 微信：参数名为tel
        wx = detail.get("tel")
        name = detail.get("name")
        howmuch = detail.get("howmuch")
        howlong = detail.get("howlong")
        return Demand(cat_id=cat_id, up_time=up_time, wx_num=wx,name=name,detailtext=detailtext,howmuch=howmuch,howlong=howlong)

    @staticmethod
    def from_request_logo(request):
        cat_id = request.json.get("cat_id")
        detailtext = request.json.get("detail")
        up_time = datetime.now()
        detail = json.loads(detailtext)
        # 微信：参数名为tel
        wx = detail.get("tel")
        name = detail.get("name")
        howmuch = detail.get("howmuch")
        howlong = detail.get("howlong")
        return Demand(cat_id=cat_id, up_time=up_time, wx_num=wx,name=name,detailtext=detailtext,howmuch=howmuch,howlong=howlong)


    def __repr__(self):
        return '<Demand: %r>' % (self.id)

class Feedback(db.Model):
    __tablename__ = 'feedbacks'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    uid = db.Column(db.String(64))
    tel = db.Column(db.String(11))
    content = db.Column(db.Text)

    def __repr__(self):
        return '<Feedback: %r>' % (self.content)

