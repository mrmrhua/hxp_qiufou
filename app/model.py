from flask_login import UserMixin
from app import lm,db
from flask import request,json,current_app,session,g
from flask_login import current_user
from config import APPLYSTATUS
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer,BadSignature,SignatureExpired
from datetime import datetime

class User(UserMixin,db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer,primary_key=True)
    nickname = db.Column(db.String(64))
    unionid = db.Column(db.String(64))
    applystatus = db.Column(db.Integer,default=APPLYSTATUS['APPLYING'])
    sex =  db.Column(db.Integer)
    headimg = db.Column(db.String(255))
    usertype=db.Column(db.Integer)   #0:个人,1:公司
    # 可用Designwork.designer来访问
    # designworks = db.relationship('Designwork', backref='designer')
    # 可用Album.designer来访问
    # albums = db.relationship('Album', backref='designer')
    # 可用Applyform.apply来访问
    applyform = db.relationship("Applyform",backref="user")
    def __repr__(self):
        return '<User %r>' % self.nickname

    # def set_applied(self):

    # # 生成一个会过期的token,默认200分钟
    def generate_auth_token(self, expiration=12000):
        s = Serializer(current_app.config['SECRET_KEY'],
                       expires_in=expiration)
        t = s.dumps({'id': self.id})
        return t

    #验证token
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


@lm.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@lm.request_loader
def load_user_from_request(request):
    # first, try to login using the unionid url arg
    unionid = request.args.get('unionid')
    if unionid:
        user = User.query.filter_by(unionid=unionid).first()
        if user:
            return user
    return  None


class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(6))
    description = db.Column(db.String(255))
    milestone_num = db.Column(db.Integer)
    # 可用Milestone.project来访问
    milestones = db.relationship('Milestone',backref='project')

    def __repr__(self):
        return '<Project %r>' % self.description

class Milestone(db.Model):
    __tablename__ = 'milestones'
    id = db.Column(db.Integer, primary_key=True)
    due_time = db.Column(db.DateTime)
    de_status = db.Column(db.Integer,default=0)
    cl_status = db.Column(db.Integer,default=0)
    pro_id = db.Column(db.Integer,db.ForeignKey('projects.id'))
    ordinpro = db.Column(db.Integer)
    due_time_cli = db.Column(db.DateTime)
    # 可用Historywork.milestone来访问
    historywork = db.relationship('Historywork',backref='milestone')

    def __repr__(self):
        return '<Milestone %r>' % self.due_time

class Historywork(db.Model):
    __tablename__ = 'historywork'
    id = db.Column(db.Integer, primary_key=True)
    work_url = db.Column(db.String(255))
    up_time = db.Column(db.DateTime)
    milestone_id = db.Column(db.Integer, db.ForeignKey('milestones.id'))

    def __repr__(self):
        return '<Historywork %r>' % self.work_url


class Applyform(db.Model):
    __tablename__ = 'applyforms'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16),nullable=True)
    city = db.Column(db.String(20))
    tel = db.Column(db.String(11), nullable=True)
    email = db.Column(db.String(64), nullable=True)
    qq = db.Column(db.String(16), nullable=True)
    wx = db.Column(db.String(64), nullable=True)
    project_text = db.Column(db.Text, nullable=True)
    blog_url = db.Column(db.String(255), nullable=True)
    unionid = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)

    # 个人设计师
    sex = db.Column(db.Integer,nullable=True)
    born = db.Column(db.String(16),nullable=True)
    school = db.Column(db.String(64),nullable=True)
    major = db.Column(db.String(64),nullable=True)
    graduate = db.Column(db.Integer,nullable=True)
    worktime = db.Column(db.String(16), nullable=True)
    identity = db.Column(db.Integer,nullable=True)

    # 设计公司/独立工作室
    role = db.Column(db.String(16),nullable=True)
    company_name = db.Column(db.String(16),nullable=True)
    company_web = db.Column(db.String(255), nullable=True)
    company_size = db.Column(db.Integer, nullable=True)
    ticket = db.Column(db.Integer, nullable=True)
    ticket_num = db.Column(db.Integer,nullable=True)


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
        unionid = g.user.unionid
        # if session:
        #     unionid = session['unionid']

        return  Applyform(name=name,sex=0,born='2017',tel=int(tel),city=city,email=email,qq=qq,wx=wx,school=school,major=major,graduate=int(graduate),project_text=project_text,blog_url=blog_url,identity=identity,worktime=worktime,unionid=unionid)

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
        # ticket = request.form.get('ticket')
        # ticket_num = request.form.get('ticket_num')

        # may be none
        project_text = request.form.get('project_text')
        blog_url = request.form.get('blog_url')
        unionid = g.user.unionid

        return Applyform(name=name, tel=tel, city=city, email=email, qq=qq, wx=wx,
                         project_text=project_text,company_name = company_name, company_web=company_web,
                         company_size=company_size ,role=role,
                         blog_url=blog_url,  unionid=unionid)

    def __repr__(self):
        return '<Applyform %r>' % self.name



class Applywork(db.Model):
    __tablename__ = 'applyworks'
    id = db.Column(db.Integer,primary_key=True)
    work_url = db.Column(db.String(255))
    apply_id = db.Column(db.Integer,db.ForeignKey('applyforms.id'))

    def __repr__(self):
        return '<Applywork %r>' % self.work_url

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(64))
    apply_id = db.Column(db.Integer, db.ForeignKey('applyforms.id'))

    def __repr__(self):
        return '<Category of %r>' % self.apply_id

class Designwork(db.Model):
    __tablename__ = 'designworks'
    id = db.Column(db.Integer, primary_key=True)
    work_url = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    category = db.Column(db.Integer,default=0)
    up_time = db.Column(db.DateTime)
    album_id = db.Column(db.Integer,db.ForeignKey('albums.id'))

    def __repr__(self):
        return '<Designwork of %r:%r>' % (self.user_id,self.work_url)


class Album(db.Model):
    __tablename__ = 'albums'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    description = db.Column(db.Text,nullable=True)
    category = db.Column(db.Integer)
    up_time = db.Column(db.DateTime)
    cover = db.Column(db.String(255))
    # 可用Designwork.album来访问
    designworks = db.relationship('Designwork',backref='album')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

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
