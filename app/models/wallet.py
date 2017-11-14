from app import db
from sqlalchemy.dialects.mysql import INTEGER

class Wallet(db.Model):
    __tablename__ = 'wallets'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    user_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'))
    alipay = db.Column(db.String(64))
    tel = db.Column(db.String(11))
    money = db.Column(db.DECIMAL(10,2))
    frozen_money = db.Column(db.DECIMAL(10,2))
    name =  db.Column(db.String(8))

    def __repr__(self):
        return '<Wallet %r>' % self.user_id

    @staticmethod
    def init_wallet(user):
        wa  = Wallet(money=0,frozen_money=0,user_id=user.id)
        db.session.add(wa)
        try:
            db.session.commit()
        except:
            db.session.rollback()

class CashFlow(db.Model):
    __tablename__ = 'cashflow'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    change_money=  db.Column(db.DECIMAL(10,2))
    after_money = db.Column(db.DECIMAL(10,2))
    remark = db.Column(db.String(16))
    when = db.Column(db.DateTime)
    from_who =  db.Column(db.String(5))
    to_who = db.Column(db.String(5))
    related_user = db.Column(INTEGER(unsigned=True), db.ForeignKey('users.id'))
    related_client = db.Column(INTEGER(unsigned=True), db.ForeignKey('clients.id'))
    status = db.Column(db.String(6))
    detail = db.Column(db.String(64))
    project_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('projects.id'))

    def __repr__(self):
        return '<CashFlow %r>' % self.id


