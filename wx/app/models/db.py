from app import db
from sqlalchemy.dialects.mysql import INTEGER
from flask import g
import json


class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    tag_name = db.Column(db.String(8), unique=True)

    def __repr__(self):
        return '<Tag: %r>' % (self.tag_name)

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    cat_name = db.Column(db.String(6), unique=True)
    def __repr__(self):
        return '<Cat: %r>' % (self.cat_name)

class Img_Tag(db.Model):
    __tablename__ = 'imgs_tags'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    url = db.Column(db.String(255))
    tag_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('tags.id'))
    cat_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('categories.id'))
    screen =  db.Column(db.String(10))
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


class Demand(db.Model):
    __tablename__ = 'demands'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    cat_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('categories.id'))
    screen = db.Column(db.String(10))
    imglist = db.Column(db.Text)
    color = db.Column(db.String(8))
    page = db.Column(db.String(8))
    desc = db.Column(db.Text)
    scale = db.Column(db.String(8))

    @staticmethod
    def from_request(request):
        cat_id = request.json.get("cat")
        screen = request.json.get("screen")
        imglist =  request.json.get("imglist")
        color = request.json.get("color")
        page = request.json.get("page")
        desc = request.json.get("desc")
        scale = request.json.get("scale")

        return  Demand(cat_id=cat_id,screen=screen,imglist=imglist,color=color,page=page,desc=desc,scale=scale)


    def __repr__(self):
        return '<Demand: %r>' % (self.id)