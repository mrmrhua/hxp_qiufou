from  flask import  session,jsonify,request,url_for,g
from flask_restful import Resource
from app.models import Tag,Img_Tag,Demand,Color
from app import db
import json
class GetTags(Resource):
    def get(self):
        tags = [ {'id':i.id,'tag':i.tag_name}for i in Tag.query.all()]
        return jsonify({'code':0,'data':{'tags':tags}})


class GetImg(Resource):
    def get(self):
        tag = request.values.get("tag")
        cat = request.values.get("cat")
        screen = request.values.get("screen")
        imgs = [ i.url for i in Img_Tag.query.filter_by(tag_id=tag,cat_id=cat,screen=screen).all() ]
        return jsonify({'code': 0, 'data': {'imgs':imgs}})

class GetColor(Resource):
    def get(self):
        tags = json.loads(request.values.get("tag"))
        if not tags:
           return jsonify({'code':-1})
        # 都可以
        t = Tag.query.filter_by(id=1).first()
        if '小清新' in tags:
            t = Tag.query.filter_by(id=8).first()
        if '欧美' in tags:
            t = Tag.query.filter_by(id=9).first()
        if '简约' in tags:
            t = Tag.query.filter_by(id=2).first()
        if '中国风' in tags:
            t = Tag.query.filter_by(id=5).first()
        if '商务' in tags:
            t= Tag.query.filter_by(id=1).first()
        colors = [{'val': i.color_val, 'desc': i.color_desc, 'name': i.color_name} for i in t.colors]
        all = [{'val': i.color_val, 'desc': i.color_desc, 'name': i.color_name} for i in Color.query.all()]

        return jsonify({'code': 0, 'data': {'colors':colors,'all':all}})

def demand2dict(d):
    return {
        'cat': d.cat.cat_name,
        'screen':d.screen,
        'imglist':json.loads(d.imglist),
        'color':json.loads(d.color),
        'page':d.page,
        'desc':d.desc,
        'scale':d.scale,
    }


class MyDemand(Resource):
    def post(self):
        d = Demand.from_request(request)
        db.session.add(d)
        db.session.commit()
        return  jsonify({'code': 0,'data':{'id':d.id}})
    def get(self):
        id = request.values.get("id")
        d = Demand.query.filter_by(id=id).first()
        return jsonify({'code':0,'data':{'demand':json.dumps(d,default=demand2dict)}})