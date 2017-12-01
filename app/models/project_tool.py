# from app import db
# from sqlalchemy.dialects.mysql import INTEGER
# class Project(db.Model):
#     __tablename__ = 'projects'
#     id = db.Column(INTEGER(unsigned=True),primary_key=True)
#     password = db.Column(db.String(6))
#     description = db.Column(db.String(255))
#     milestone_
#
#     num = db.Column(db.Integer)
#     # 可用Milestone.project来访问
#     milestones = db.relationship('Milestone',backref='project')
#
#     def __repr__(self):
#         return '<Project %r>' % self.description
#
# class Milestone(db.Model):
#     __tablename__ = 'milestones'
#     id = db.Column(INTEGER(unsigned=True), primary_key=True)
#     due_time = db.Column(db.DateTime)
#     de_status = db.Column(db.Integer,default=0)
#     cl_status = db.Column(db.Integer,default=0)
#     pro_id = db.Column(INTEGER(unsigned=True),db.ForeignKey('projects.id'))
#     ordinpro = db.Column(db.Integer)
#     due_time_cli = db.Column(db.DateTime)
#     # 可用Historywork.milestone来访问
#     historywork = db.relationship('Historywork',backref='milestone')
#
#     def __repr__(self):
#         return '<Milestone %r>' % self.due_time
#
# class Historywork(db.Model):
#     __tablename__ = 'historywork'
#     id = db.Column(INTEGER(unsigned=True), primary_key=True)
#     work_url = db.Column(db.String(255))
#     up_time = db.Column(db.DateTime)
#     milestone_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('milestones.id'))
#
#     def __repr__(self):
#         return '<Historywork %r>' % self.work_url



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
    # 设计师是谁
    user_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'))
    #   客户是谁
    client_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('clients.id'),nullable=True)
    # 完成状况:  0: 进行中， 1： 已结束， 2: 已关闭
    status = db.Column(INTEGER(unsigned=True))
    # 是否有新更新
    isnew = db.Column(db.Boolean)
    title = db.Column(db.String(50))
    up_time = db.Column(db.DateTime)
    posts = db.relationship('Post', backref='project',order_by='Post.up_time.desc()')
    starttime = db.Column(db.DateTime)
    def __repr__(self):
        return '<Project: %r>' % (self.demand_id)
    def get_status(self):
        if self.status == 0:
            return '进行中'
        elif self.status == 1:
            return '已结束'
        elif self.status == 2:
            return '以中止'
        else:
            return ''

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    project_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('projects.id'))
    up_time = db.Column(db.DateTime)
    desc = db.Column(db.Text)
    works = db.relationship("Projectwork",backref="post")

    def __repr__(self):
        return '<Post: %r>' % (self.id)

class Projectwork(db.Model):
    __tablename__ = 'projectworks'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    work_url = db.Column(db.String(255))
    post_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('posts.id'))

    def __repr__(self):
        return '<Designwork of %r>' % (self.work_url)



class Comments(db.Model):
    __tablename__ = 'comments'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    image_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('projectworks.id'))
    user_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'))
    comment_index = db.Column(INTEGER(unsigned=True))
    content = db.Column(db.Text)
    description = db.Column(db.Text)
    up_time = db.Column(db.DateTime)


    def __repr__(self):
        return '<Comments of %r>' % (self.id)
