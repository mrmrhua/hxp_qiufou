from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
from app.models import User,db,Notice,Subscribtion,DesignerInfo,Category
import json

class AllDesignerManage(Resource):
    def get(self):
        cats = json.loads(request.values.get("category"))
        page = int(request.values.get("page"))
        PER_PAGE=20
        count=DesignerInfo.query.count()
        if len(cats)==1 and cats[0]=='-1':
        # get all
            count = DesignerInfo.query.count()
            ds = DesignerInfo.query.paginate(page,PER_PAGE,False).items
            designer = [ {'id':i.user.id,'headimg': i.user.headimg, 'nickname':  i.user.nickname, 'expyear': i.startyear} for i in ds]
        else:
            us = User.query.filter_by(applystatus = 2).all()
            designer = []
            count =0
            for i in us:
                if i.categories.filter(Category.id.in_(cats)).count() > 0:
                    count = count+1
                    designer.append({'id':i.id,'headimg': i.headimg, 'nickname': i.nickname, 'expyear': i.info.startyear})
        return jsonify({'code':0,'data':{'designer':designer,'count':count}})