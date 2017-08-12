from app import db
from sqlalchemy.dialects.mysql import INTEGER
import datetime
from flask import g
import json
class DesignerInfo(db.Model):
    __tablename__ = 'designers'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    user_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'))
    city = db.Column(db.String(20))
    tel = db.Column(db.String(11))
    email = db.Column(db.String(64))
    qq = db.Column(db.String(16),nullable=True)
    wx = db.Column(db.String(64),nullable=True)
    project_text = db.Column(db.Text,nullable=True)
    blog_url = db.Column(db.String(255),nullable=True)
    startyear = db.Column(db.Integer,nullable=True)

    # 个人设计师
    school = db.Column(db.String(64),nullable=True)
    # graduate = db.Column(db.Integer,nullable=True)
    worktime = db.Column(db.String(16), nullable=True)
    identity = db.Column(db.Integer,nullable=True)

    # 设计公司/独立工作室
    company_name = db.Column(db.String(16),nullable=True)
    company_web = db.Column(db.String(255), nullable=True)
    company_size = db.Column(db.Integer, nullable=True)

    #是否只允许甲方查看
    privacy = db.Column(db.Integer, nullable=True)
    # 开票情况
    ticket = db.Column(db.Integer, nullable=True)
    ticket_num = db.Column(db.Integer, nullable=True)

    @staticmethod
    def from_apply(af):
        return DesignerInfo(user_id = af.user.id,tel=af.tel, city=af.city, email=af.email, qq=af.qq, wx=af.wx, school=af.school,
                     startyear=af.graduate, project_text=af.project_text, blog_url=af.blog_url,
                     identity=af.identity, worktime=af.worktime,company_name=af.company_name,company_web=af.company_web,company_size=af.company_size)

    def from_admin(self,basic_obj,worksetting_obj):
        if basic_obj:
            #TODO(DING):需要同时更新  USER表/DESIGNER表/TAG表/EXP表/category表,此处只需更新DESIGNER
            self.school= basic_obj.get("school")
            self.city = basic_obj.get("city")
            self.tel = basic_obj.get("tel")
            self.email = basic_obj.get("email")
            self.startyear = basic_obj.get("startyear")
        if worksetting_obj:
            self.worktime = str(worksetting_obj.get("worktime"))
            self.privacy = worksetting_obj.get("privacy")
            self.ticket = worksetting_obj.get("ticket")

        # return self






    def __repr__(self):
        return '<Designer %r>' % self.id

Category_User = db.Table('categories_users',
                    db.Column('user_id', INTEGER(unsigned=True), db.ForeignKey('users.id')),
                    db.Column('cat_id', INTEGER(unsigned=True), db.ForeignKey('categories.id'))
                    )


#     @staticmethod
#     def from_apply(af):
#         cat = af.category
#         cus = []
#         for i in cat:
#             cus.append(Category_User(category_name=i.category_name,user_id=af.user.id))
#
#         return cus

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    category_name = db.Column(db.String(64))
    # apply_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('applyforms.id'))
    users = db.relationship('User',
                            secondary=Category_User,
                            backref=db.backref('categories', lazy='dynamic'),
                            lazy='dynamic')  # lazy = 'dynamic' :关系两侧返回的查询都可接受额外的过滤器
    # def __init__(self,cat):
    #     self.category_name = cat

    def __repr__(self):
        return '<Category of %r>' % self.id


#
# class Category_User(db.Model):
#     __tablename__ = 'categories_users'
#     id = db.Column(INTEGER(unsigned=True), primary_key=True)
#     user_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'))
#     category_name =  db.Column(db.String(20))
#
#     def __repr__(self):
#         return '<Category_User % r>' % self.id
#
#     @staticmethod
#     def from_apply(af):
#         cat = af.category
#         cus = []
#         for i in cat:
#             cus.append(Category_User(category_name=i.category_name,user_id=af.user.id))
#
#         return cus




class Designwork(db.Model):
    __tablename__ = 'designworks'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    work_url = db.Column(db.String(255))
    user_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'))
    category = db.Column(db.Integer,default=0)
    up_time = db.Column(db.DateTime)
    album_id = db.Column(INTEGER(unsigned=True),db.ForeignKey('albums.id'))

    def __repr__(self):
        return '<Designwork of %r:%r>' % (self.user_id,self.work_url)


class Album(db.Model):
    __tablename__ = 'albums'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    title = db.Column(db.String(50))
    description = db.Column(db.Text,nullable=True)
    category = db.Column(db.Integer)
    up_time = db.Column(db.DateTime)
    cover = db.Column(db.String(255))
    # 可用Designwork.album来访问
    designworks = db.relationship('Designwork',backref='album',lazy='dynamic')
    user_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'))

    def __repr__(self):
        return '<Album: %r at %r>' % (self.title,self.up_time)

    @staticmethod
    def from_request(request):
        title = request.values.get("title")
        cover = request.values.get("cover")
        description= request.values.get("description")
        category = request.values.get("category")
        up_time = datetime.now()

        return Album(title=title,cover=cover,description=description,category=category,up_time=up_time,user_id=g.user.id)



# TAG 系统-多对多
tag_user = db.Table('tags_users',
                    db.Column('user_id', INTEGER(unsigned=True), db.ForeignKey('users.id')),
                    db.Column('tag_id', INTEGER(unsigned=True), db.ForeignKey('tags.id'))
                    )


class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    tag_name =  db.Column(db.String(20),unique=True)
    # 多对多关系: 把secondary参数设为关联表
    users = db.relationship('User',
                           secondary=tag_user,
                           backref=db.backref('tags',lazy='dynamic'),
                            lazy = 'dynamic')  # lazy = 'dynamic' :关系两侧返回的查询都可接受额外的过滤器

    #  多对多关系
    #  新建关系
    #  tag.users.append(xxx)
    #  db.session.add(tag)

    # 列出tag的所有user:  tag.users.all()
    # 列出user的所有tgas: user.tags.all()
    # 删除关系 tag.users.remove(user)

    def __repr__(self):
        return '<Tag: %r>' % (self.tag_name)

#
# exp_user = db.Table('exp_user',
#                     db.Column('user_id', INTEGER(unsigned=True), db.ForeignKey('users.id')),
#                     db.Column('exp_id', INTEGER(unsigned=True), db.ForeignKey('experiences.id'))
#                     )


class Exp(db.Model):
    __tablename__ = 'experiences'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    title =  db.Column(db.String(20))
    content = db.Column(db.Text)
    # 多对多关系: 把secondary参数设为关联表
    #  users = db.relationship('User',
    #                        secondary=exp_user,
    #                        backref=db.backref('experiences',lazy='dynamic'),
    #                         lazy = 'dynamic')  # lazy = 'dynamic' :关系两侧返回的查询都可接受额外的过滤器
    user_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'))

    def __repr__(self):
        return '<Experience: %r>' % (self.title)




