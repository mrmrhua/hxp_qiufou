from app import db
from sqlalchemy.dialects.mysql import INTEGER
from flask import g
import json
from datetime import datetime
from sqlalchemy.ext.orderinglist import ordering_list
class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    demand_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('demands.id'))
    cat_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('categories.id'))
    uid = db.Column(db.String(64),nullable=True)
    designer = db.Column(db.String(64),nullable=True)
    posts = db.relationship('Post', backref='project',order_by='Post.up_time.desc()')
    def __repr__(self):
        return '<Project: %r>' % (self.demand_id)

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    project_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('projects.id'))
    up_time = db.Column(db.DateTime)
    desc = db.Column(db.Text)
    works = db.relationship("Designwork",backref="post",order_by='Designwork.id.desc()')

    def __repr__(self):
        return '<Post: %r>' % (self.id)

class Designwork(db.Model):
    __tablename__ = 'designworks'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    work_url = db.Column(db.String(255))
    post_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('posts.id'))

    def __repr__(self):
        return '<Designwork of %r>' % (self.work_url)
