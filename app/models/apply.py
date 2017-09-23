from app import db
from sqlalchemy.dialects.mysql import INTEGER
from flask import g
from . import Category_User,Category
import json

Apply_Category = db.Table('applies_categories',
                          db.Column('apply_id', INTEGER(unsigned=True), db.ForeignKey('applyforms.id')),
                          db.Column('cat_id', INTEGER(unsigned=True), db.ForeignKey('categories.id'))
                          )

class Applyform(db.Model):
    __tablename__ = 'applyforms'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    name = db.Column(db.String(16),nullable=True)
    city = db.Column(db.String(20))
    tel = db.Column(db.String(11), nullable=True)
    email = db.Column(db.String(64), nullable=True)
    qq = db.Column(db.String(16), nullable=True)
    wx = db.Column(db.String(64), nullable=True)
    project_text = db.Column(db.Text, nullable=True)
    blog_url = db.Column(db.String(255), nullable=True)
    # unionid = db.Column(db.String(64), db.ForeignKey('users.unionid'))
    user_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'))

    # 个人设计师
    # sex = db.Column(db.Integer,nullable=True)
    born = db.Column(db.String(16),nullable=True)
    school = db.Column(db.String(64),nullable=True)
    major = db.Column(db.String(64),nullable=True)
    graduate = db.Column(db.Integer,nullable=True)
    worktime = db.Column(db.String(30), nullable=True)
    identity = db.Column(db.Integer,nullable=True)

    # 设计公司/独立工作室
    role = db.Column(db.String(16),nullable=True)
    company_name = db.Column(db.String(16),nullable=True)
    company_web = db.Column(db.String(255), nullable=True)
    company_size = db.Column(db.Integer, nullable=True)
    ticket = db.Column(db.Integer, nullable=True)
    ticket_num = db.Column(db.Integer,nullable=True)

    # 找类目
    # category = db.relationship('Category', backref='category')
    categories = db.relationship('Category',
                            secondary=Apply_Category,
                            backref=db.backref('applys', lazy='dynamic'),
                            lazy='dynamic')  # lazy = 'dynamic' :关系两侧返回的查询都可接受额外的过滤器

    applyworks = db.relationship('Applywork', backref='applyform',cascade='delete')
    @staticmethod
    def  personal_from_request(request):
        name = request.form.get('name')
        tel = request.form.get('tel')
        city = request.form.get('city')
        email = request.form.get('email')
        # may be none
        qq = request.form.get('qq')
        wx = request.form.get('wx')
        school = request.form.get('school')
        major = request.form.get('major')
        graduate = request.form.get('graduate')
        # 保留JSON字符串包装的数组形式
        worktime = request.form.get('worktime')
        identity = request.form.get('identity')
        # may be none
        project_text = request.form.get('project_text')
        blog_url = request.form.get('blog_url')
        user_id = g.user.id


        return  Applyform(name=name,tel=tel,city=city,email=email,qq=qq,wx=wx,school=school,major=major,graduate=int(graduate),project_text=project_text,blog_url=blog_url,identity=identity,worktime=worktime,user_id=user_id)

    @staticmethod
    def company_from_request(request):
        name = request.form.get('name')
        tel = request.form.get('tel')
        city = request.form.get('city')
        email = request.form.get('email')
        # may be none
        qq = request.form.get('qq')
        wx = request.form.get('wx')
        role = request.form.get('role')
        company_name = request.form.get('company_name')
        company_web = request.form.get('company_web')
        company_size = request.form.get('company_size')

        # may be none
        project_text = request.form.get('project_text')
        blog_url = request.form.get('blog_url')
        user_id = g.user_id
        return Applyform(name=name, tel=tel, city=city, email=email, qq=qq, wx=wx,
                         project_text=project_text,company_name = company_name, company_web=company_web,
                         company_size=company_size ,role=role,
                         blog_url=blog_url, user_id=user_id)

    @staticmethod
    def personal_from_request_new(request):
        name = request.form.get('name')
        tel = request.form.get('tel')
        city = request.form.get('city')
        email = request.form.get('email')
        graduate = request.form.get('graduate')
        # may be none
        qq = request.form.get('qq')
        wx = request.form.get('wx')
        blog_url = request.form.get('blog_url')
        user_id = g.user.id

        return Applyform(name=name, tel=tel, city=city, email=email, qq=qq, wx=wx,
                         graduate=int(graduate), blog_url=blog_url, user_id=user_id)
    def __repr__(self):
        return '<Applyform %r>' % self.name

    def add_categories(self,cat):
        c = Category.query.filter_by(category_name=cat).first()
        self.categories.append(c)



class Applywork(db.Model):
    __tablename__ = 'applyworks'
    id = db.Column(INTEGER(unsigned=True),primary_key=True)
    work_url = db.Column(db.String(255))
    apply_id = db.Column(INTEGER(unsigned=True),db.ForeignKey('applyforms.id'))

    def __repr__(self):
        return '<Applywork %r>' % self.work_url




# class Category(db.Model):
#     __tablename__ = 'categories'
#     id = db.Column(INTEGER(unsigned=True), primary_key=True)
#     category_name = db.Column(db.String(64))
#     apply_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('applyforms.id'))
#
#     def __repr__(self):
#         return '<Category of %r>' % self.apply_id
