from app import db
from sqlalchemy.dialects.mysql import INTEGER
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
    ticket = db.Column(db.Integer,nullable=True)
    ticket_num = db.Column(db.Integer,nullable=True)

    # 个人设计师
    school = db.Column(db.String(64),nullable=True)
    graduate = db.Column(db.Integer,nullable=True)
    worktime = db.Column(db.String(16), nullable=True)
    identity = db.Column(db.Integer,nullable=True)

    # 设计公司/独立工作室
    company_name = db.Column(db.String(16),nullable=True)
    company_web = db.Column(db.String(255), nullable=True)
    company_size = db.Column(db.Integer, nullable=True)


    @staticmethod
    def from_apply(af):
        return DesignerInfo(user_id = af.user.id,tel=af.tel, city=af.city, email=af.email, qq=af.qq, wx=af.wx, school=af.school,
                     graduate=af.graduate, project_text=af.project_text, blog_url=af.blog_url,
                     identity=af.identity, worktime=af.worktime,company_name=af.company_name,company_web=af.company_web,company_size=af.company_size)

    def __repr__(self):
        return '<Designer %r>' % self.id

class Category_User(db.Model):
    __tablename__ = 'categories_users'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    user_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'))
    category_name =  db.Column(db.String(20))

    def __repr__(self):
        return '<Category_User % r>' % self.id

    @staticmethod
    def from_apply(af):
        cat = af.category
        cus = []
        for i in cat:
            cus.append(Category_User(category_name=i.category_name,user_id=af.user.id))

        return cus

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
    designworks = db.relationship('Designwork',backref='album')
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