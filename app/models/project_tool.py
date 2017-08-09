from app import db
from sqlalchemy.dialects.mysql import INTEGER
class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(INTEGER(unsigned=True),primary_key=True)
    password = db.Column(db.String(6))
    description = db.Column(db.String(255))
    milestone_num = db.Column(db.Integer)
    # 可用Milestone.project来访问
    milestones = db.relationship('Milestone',backref='project')

    def __repr__(self):
        return '<Project %r>' % self.description

class Milestone(db.Model):
    __tablename__ = 'milestones'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    due_time = db.Column(db.DateTime)
    de_status = db.Column(db.Integer,default=0)
    cl_status = db.Column(db.Integer,default=0)
    pro_id = db.Column(INTEGER(unsigned=True),db.ForeignKey('projects.id'))
    ordinpro = db.Column(db.Integer)
    due_time_cli = db.Column(db.DateTime)
    # 可用Historywork.milestone来访问
    historywork = db.relationship('Historywork',backref='milestone')

    def __repr__(self):
        return '<Milestone %r>' % self.due_time

class Historywork(db.Model):
    __tablename__ = 'historywork'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    work_url = db.Column(db.String(255))
    up_time = db.Column(db.DateTime)
    milestone_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('milestones.id'))

    def __repr__(self):
        return '<Historywork %r>' % self.work_url