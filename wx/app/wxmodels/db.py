from app import db
from sqlalchemy.dialects.mysql import INTEGER
from flask import g
import json
from datetime import datetime


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


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    # UID = OPENID
    uid = db.Column(db.String(64),unique=True,nullable=True)
    unionid = db.Column(db.String(64), unique=True,nullable=True)
    demands = db.relationship("Demand", backref="user",order_by='desc(Demand.up_time)')
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
    name = db.Column(db.String(10),server_default='未填写')
    business_desc =  db.Column(db.String(32),server_default='未填写')
    qrcode = db.Column(db.Boolean)
    tech = db.Column(db.String(8))

    user_id =  db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'))

    detailtext = db.Column(db.Text)


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
        tel = request.json.get("tel")
        name = request.json.get("name")
        return  Demand(cat_id=cat_id,screen=screen,imglist=imglist,color=color,page=page,desc=desc,scale=scale,up_time=up_time,tel=tel,\
                       name=name)

    @staticmethod
    def from_request_card(request):
        cat_id = 3
        industry = request.json.get("industry")
        # imglist='[{"tag":"文艺质感","url":"http://work.houxiaopang.com/mp/wyzg/10.jpg"},{"tag":"文艺质感","url":"http://work.houxiaopang.com/mp/wyzg/2.jpg"}]'
        imglist=request.json.get("imglist")
        color = request.json.get("color")
        tel = request.json.get("tel")
        name = request.json.get("name")
        up_time = datetime.now()
        business_desc= request.json.get("business_desc")
        qrcode = request.json.get("QRcode")
        tech=request.json.get("tech")
        return Demand(cat_id=cat_id,industry=industry,imglist=imglist,color=color,tel=tel,name=name\
                      ,up_time=up_time,business_desc=business_desc,qrcode=qrcode,tech=tech)

    @staticmethod
    def from_request_ui(request):
        cat_id = request.json.get("cat_id")
        detailtext = request.json.get("detail")
        up_time = datetime.now()
        return Demand(cat_id=cat_id,up_time=up_time,detailtext=detailtext)

    @staticmethod
    def from_request_hb(request):
        cat_id = request.json.get("cat_id")
        detailtext = request.json.get("detail")
        up_time = datetime.now()
        return Demand(cat_id=cat_id, up_time=up_time, detailtext=detailtext)


    def __repr__(self):
        return '<Demand: %r>' % (self.id)

