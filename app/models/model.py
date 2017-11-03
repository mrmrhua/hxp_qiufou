from flask_login import UserMixin
from sqlalchemy.dialects.mysql import INTEGER
from sqlalchemy.ext.orderinglist import ordering_list
from app import lm,db
from flask import request,json,current_app,session
from config import APPLYSTATUS
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer,BadSignature,SignatureExpired
from . import Category,Subscribtion
import random
import redis
class Conn_db():
    def __init__(self):
        # 创建对本机数据库的连接对象
        self.conn = redis.StrictRedis(host='127.0.0.1', port=6379, db=0)

    # 读取
    def get(self, key_):
        # 从数据库根据键（key）获取值
        value_ = self.conn.get(key_)
        if not value_:
            return None
        else:
            return value_.decode()

    # 存储
    def set(self, key_, value_,ex_):
        # 将数据存储到数据库
        self.conn.set(key_, value_,ex=ex_)



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
    albums = db.relationship('Album', backref='designer',cascade='delete')
    # 可用Applyform.apply来访问
    applyform = db.relationship("Applyform",backref="user",cascade='delete')
    # 可用Designer.user来访问  // 一对一关系
    info = db.relationship("DesignerInfo",uselist=False,backref="user",cascade='delete')
    # 找类目
    # category = db.relationship('Category_User', backref='user')
    experiences = db.relationship("Exp",backref="user",cascade="delete,delete-orphan")
    # User.notice  //  Subscrbtion.receiver 互相访问
    notice = db.relationship('Subscribtion',foreign_keys=[Subscribtion.user_id],backref=db.backref('receiver',lazy='joined'),
                               lazy='dynamic',
                               cascade='all,delete-orphan')
    wallet = db.relationship('Wallet',backref='user',cascade="delete",uselist=False)

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
        # exps = self.experiences.all()
        exps = self.experiences
        strs = []
        for i in exps:
            strs.append({'id':i.id,'title':i.title,'desc':i.content})
        return strs


    # def set_applied(self):

    # # 生成一个会过期的token,默认200分钟
    def generate_auth_token(self, expiration=12000):
        s = Serializer(current_app.config['SECRET_KEY'],
                       expires_in=expiration)
        # 生成一个随机数,存进token里. session里也存一个
        nonce = random.randint(1,100)
        # session['lognonce'] = nonce
        # nonce存redis
        conn = Conn_db()
        conn.set('nonce'+str(self.id),nonce,12000)
        t = s.dumps({'id': self.id,'nonce':nonce})
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
        # print("id  %r" % data['id'])

        # 验证随机数是否过期
        nonce = data['nonce']
        conn = Conn_db()
        if str(nonce) != conn.get("nonce"+str(data['id'])):
            return None  # invalid token
        # if 'lognonce'  not in session or nonce != session['lognonce']:
        #     return None  # invalid token
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

class City(UserMixin,db.Model):
    __tablename__ = 'city'
    id = db.Column(INTEGER(unsigned=True),primary_key=True)
    province_id = db.Column(INTEGER(unsigned=True))
    name=db.Column(db.String(8))

class Province(UserMixin,db.Model):
    __tablename__ = 'province'
    id = db.Column(INTEGER(unsigned=True),primary_key=True)
    name=db.Column(db.String(8))
