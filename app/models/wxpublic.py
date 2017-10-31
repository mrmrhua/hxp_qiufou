from app import db
from sqlalchemy.dialects.mysql import INTEGER

class PushMessage(db.Model):
    __tablename__ = 'pushmessages'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    user_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'))
    openid = db.Column(db.String(64),unique=True)

    def __repr__(self):
        return '<PushMessage %r>' % self.id
