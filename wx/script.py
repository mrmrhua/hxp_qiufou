from app import db
from app.models import *

t =Tag.query.filter_by(id=1).first()
screen= '汇报总结'
tags = [1,2,8,5,9,4,3]
for i in tags:
    n = Tag_Screen(tag_id=i,screen=screen)
    db.session.add(n)

screen= '商业计划书'
tags = [1,2,5,4,3]
for i in tags:
    n = Tag_Screen(tag_id=i,screen=screen)
    db.session.add(n)

screen= '商务合作／招商引资'
tags =[1,2,5,3,4]
for i in tags:
    n = Tag_Screen(tag_id=i,screen=screen)
    db.session.add(n)

screen= ''
tags =[1,2,5,3,4]
for i in tags:
    n = Tag_Screen(tag_id=i,screen=screen)
    db.session.add(n)