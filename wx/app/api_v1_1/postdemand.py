from  flask import  session,jsonify,request,url_for,g
from flask_restful import Resource
from app.models import Tag,Img_Tag,Demand
from app import db
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
        tag = request.values.get("tag")
       # t = Tag.query.filter_by(id=tag).first()
        #if not t:
         #   return jsonify({'code':-1})
        #else:
        if True:
            colors = [{'val':'#ffffff','desc':'GAODUAN[DLJFA;H ','name':'白'},
                      {'val': '#888888', 'desc': 'GAODUAN[DLJFA;H ', 'name': '灰'},
                      {'val': '#f00', 'desc': 'GAODUAN[DLJFA;H ', 'name': '红'},]
            #colors = [ {'val':i.color_val,'desc':i.color_des,'name':'xxx'}  for i in t.colors ]
            return jsonify({'code': 0, 'data': {'colors':colors}})


class MyDemand(Resource):
    def post(self):
        d = Demand.from_request(request)
        db.session.add(d)
        db.session.commit()
        return  jsonify({'code': 0,'data':{'id':d.id}})
    def get(self):
        id = request.values.get("id")
        d = Demand.query.filter_by(id=id).first()
        return jsonify({'code':0,'data':{'demand':d}})