# coding: utf-8
from sqlalchemy import BigInteger, Column, DateTime, ForeignKey, Integer, Numeric, String, Table, Text, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata

class TbBargain(Base):
    __tablename__ = 'tb_bargain'

    id = Column(BigInteger, primary_key=True)
    demand_id = Column(BigInteger, nullable=False, index=True)
    user_id = Column(ForeignKey('tb_user.id'), nullable=False, index=True)
    date = Column(DateTime, nullable=False)
    money = Column(Numeric(10, 2), nullable=False)

    user = relationship('TbUser')


class TbDemand(Base):
    __tablename__ = 'tb_demand'

    id = Column(BigInteger, primary_key=True)
    demand_id = Column(BigInteger, nullable=False)
    start_money = Column(Numeric(10, 2), nullable=False)
    end_money = Column(Numeric(10, 2), nullable=False)
    aims_money = Column(Numeric(10, 2), nullable=False)
    nickname = Column(String(64), nullable=False)


class TbUser(Base):
    __tablename__ = 'tb_user'

    id = Column(BigInteger, primary_key=True)
    uid = Column(String(128), nullable=False)
    name = Column(String(64), nullable=False)
    head_img = Column(String(256), nullable=False)


t_vw_bargain = Table(
    'vw_bargain', metadata,
    Column('id', BigInteger),
    Column('nickname', String(64)),
    Column('start_money', Numeric(10, 2)),
    Column('end_money', Numeric(10, 2)),
    Column('aims_money', Numeric(10, 2)),
    Column('NAME', String(64)),
    Column('head_img', String(256)),
    Column('DATE', DateTime),
    Column('money', Numeric(10, 2))
)


class TbCase(Base):
    __tablename__ = 'tb_case'

    id = Column(BigInteger, primary_key=True)
    cover = Column(String(512), nullable=False)
    title = Column(String(128), nullable=False)
    description = Column(String(1024), nullable=False)
    date = Column(DateTime, nullable=False)
    content = Column(Text, nullable=False)


class TbDesign(Base):
    __tablename__ = 'tb_design'

    id = Column(BigInteger, primary_key=True)
    title = Column(String(128), nullable=False)
    date = Column(DateTime, nullable=False)
    content = Column(Text, nullable=False)
    description = Column(String(1024), nullable=False)
    cover = Column(String(512), nullable=False)
