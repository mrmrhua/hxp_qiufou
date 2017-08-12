from flask_login import UserMixin
from sqlalchemy.dialects.mysql import INTEGER
from sqlalchemy.ext.orderinglist import ordering_list
from app import lm,db
from flask import request,json,current_app
from config import APPLYSTATUS
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer,BadSignature,SignatureExpired
from . import Category
class User(UserMixin,db.Model):
    __tablename__ = 'users'
    id = db.Column(INTEGER(unsigned=True),primary_key=True)
    nickname = db.Column(db.String(64))
    unionid = db.Column(db.String(64),unique=True)
    applystatus = db.Column(db.Integer,default=APPLYSTATUS['APPLYING'])
    sex =  db.Column(db.Integer)
    headimg = db.Column(db.String(255))
    usertype=db.Column(db.Integer)   #0:个人,1:公司
    # 可用Designwork.designer来访问
    # designworks = db.relationship('Designwork', backref='designer')
    # 可用Album.designer来访问
    albums = db.relationship('Album', backref='designer')
    # 可用Applyform.apply来访问
    applyform = db.relationship("Applyform",backref="user")
    # 可用Designer.user来访问  // 一对一关系
    info = db.relationship("DesignerInfo",uselist=False,backref="user")
    # 找类目
    # category = db.relationship('Category_User', backref='user')
    experiences = db.relationship("Exp",backref="user",cascade="delete,delete-orphan")
    def __repr__(self):
        return '<User %r>' % self.nickname

    def from_admin(self,basic_obj):
        self.nickname = basic_obj.get("nickname")
        self.headimg =basic_obj.get("headimg")
        self.sex = basic_obj.get("sex")
        # return self


    def get_categories_str(self):
        cats = self.categories.all()
        strs = []
        for i in cats:
            strs.append(i.category_name)
        return strs

    def get_tags_str(self):
        tags = self.tags.all()
        strs = []
        for i in tags:
            strs.append(i.tag_name)
        return strs

    def get_exps_str(self):
        exps = self.experiences.all()
        strs = []
        for i in exps:
            strs.append({'title':i.title,'desc':i.content})
        return strs


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
