from app.models import *
a = Applyform.query.filter_by(id=30).first()
cats = ['PPT','海报','网站']
a.add_categories(cats)
