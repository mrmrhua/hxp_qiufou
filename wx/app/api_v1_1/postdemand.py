from  flask import  session,jsonify,request,url_for,g,current_app
from flask_restful import Resource
from app.wxmodels import *
from app import db
import json
from datetime import datetime


class GetTags(Resource):
    def get(self):
        screen = request.values.get("screen")
        cat = request.values.get("cat")
        if not cat:
            return jsonify({'code': -1})
        elif screen:
            s = Screen.query.filter_by(Screen_name=screen).first()
            tags = [{'id': i.id, 'tag': i.tag_name} for i in s.tags]
        else:
            tags = [{'id': i.id, 'tag': i.tag_name} for i in Tag.query.filter_by(cat_id=cat).all()]
        current_app.logger.info('返回TAG:%r' % tags)
        return jsonify({'code':0,'data':{'tags':tags}})


class GetImg(Resource):
    def get(self):
        tag = request.values.get("tag")
        cat = request.values.get("cat")
        screen_id = request.values.get("screen_id")
        imgs = [ i.url for i in Img_Tag.query.filter_by(tag_id=tag,cat_id=cat,screen_id=screen_id).all() ]
        return jsonify({'code': 0, 'data': {'imgs':imgs}})

class GetColor(Resource):
    def get(self):
        cat =request.values.get("cat")
        tags = json.loads(request.values.get("tag"))
        if not tags:
           return jsonify({'code':-1})
        if cat=='3':#名片
            t = Tag.query.filter_by(id=1).first()
            colors = [{'val': i.color_val, 'desc': i.color_desc, 'name': i.color_name} for i in t.colors]
            all = [{'val': i.color_val, 'desc': i.color_desc, 'name': i.color_name} for i in Color.query.limit(12)]
            return jsonify({'code': 0, 'data': {'colors': colors, 'all': all}})
        elif cat=='1':# PPT
            pass
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
        all = [{'val': i.color_val, 'desc': i.color_desc, 'name': i.color_name} for i in Color.query.limit(12)]

        return jsonify({'code': 0, 'data': {'colors':colors,'all':all}})

def demand2dict_ppt(d):
    return {
        'cat': d.cat.cat_name,
        'screen':d.screen,
        'imglist':json.loads(d.imglist),
        'color':json.loads(d.color),
        'page':d.page,
        'desc':d.desc,
        'scale':d.scale,
        'tel':d.tel,
        'name':d.name,
        'up_time': datetime.strftime(d.up_time, "%Y-%m-%d %H:%M"),
        'howmuch':d.howmuch,
        'howlong':d.howlong
    }

def demand2dict_card(d):
    return {
        'cat': d.cat.cat_name,
        'imglist':json.loads(d.imglist),
        'color':json.loads(d.color),
        'tel':d.tel,
        'name':d.name,
        'business_desc':d.business_desc,
        'industry':d.industry,
        'tech':d.tech,
        'up_time':datetime.strftime(d.up_time,"%Y-%m-%d %H:%M"),
        'QRcode':d.qrcode,
        'howmuch': d.howmuch,
        'howlong': d.howlong
    }


class MyDemand(Resource):
    def post(self):
        d = Demand.from_request_ppt(request)
        # 新建一个用户，并关联这张表
        uid = request.json.get("uid")
        if not uid:
            return jsonify({'code': -1})
        u = User.query.filter_by(uid=uid).first()
        if not u:
            u = User(uid=uid)
            db.session.add(u)
            db.session.flush()
        u.demands.append(d)
        db.session.commit()
        return  jsonify({'code': 0,'data':{'id':d.id}})

    def get(self):
        id = request.values.get("id")
        d = Demand.query.filter_by(id=id).first()
        current_app.logger.info('返回PPT需求:%r' % json.dumps(d, default=demand2dict_card))
        return jsonify({'code':0,'data':{'demand':json.dumps(d,default=demand2dict_ppt)}})


class CardDemand(Resource):
    def post(self):
        d = Demand.from_request_card(request)
        uid = request.json.get("uid")
        if not uid:
            return jsonify({'code': -1})
        u = User.query.filter_by(uid=uid).first()
        if not u:
            u = User(uid=uid)
            db.session.add(u)
            db.session.flush()
        u.demands.append(d)
        db.session.commit()
        return jsonify({'code': 0, 'data': {'id': d.id}})
    def get(self):
        id = request.values.get("id")
        d = Demand.query.filter_by(id=id).first()
        if not d:
            return jsonify({'code': -1})
        current_app.logger.info('返回名片需求:%r' % json.dumps(d, default=demand2dict_card))
        return jsonify({'code': 0, 'data': {'demand': json.dumps(d, default=demand2dict_card)}})


class UIDemand(Resource):
    def post(self):
        d = Demand.from_request_ui(request)
        uid = request.json.get("uid")
        if not uid:
            return jsonify({'code': -1})
        u = User.query.filter_by(uid=uid).first()
        if not u:
            u = User(uid=uid)
            db.session.add(u)
            db.session.flush()
        u.demands.append(d)
        db.session.commit()
        return jsonify({'code': 0, 'data': {'id': d.id}})
    def get(self):
        id = request.values.get("id")
        d = Demand.query.filter_by(id=id).first()
        if not d:
            return jsonify({'code': -1})
        return jsonify({'code': 0, 'data': {'demand': d.detailtext}})


class HBDemand(Resource):
    def post(self):
        d = Demand.from_request_hb(request)
        uid = request.json.get("uid")
        if not uid:
            return jsonify({'code': -1})
        u = User.query.filter_by(uid=uid).first()
        if not u:
            u = User(uid=uid)
            db.session.add(u)
            db.session.flush()
        u.demands.append(d)
        db.session.commit()
        return jsonify({'code': 0, 'data': {'id': d.id}})
    def get(self):
        id = request.values.get("id")
        d = Demand.query.filter_by(id=id).first()
        if not d:
            return jsonify({'code': -1})
        return jsonify({'code': 0, 'data': {'demand': d.detailtext}})



class LOGODemand(Resource):
    def post(self):
        d = Demand.from_request_logo(request)
        uid = request.json.get("uid")
        if not uid:
            return jsonify({'code': -1})
        u = User.query.filter_by(uid=uid).first()
        if not u:
            u = User(uid=uid)
            db.session.add(u)
            db.session.flush()
        u.demands.append(d)
        db.session.commit()
        return jsonify({'code': 0, 'data': {'id': d.id}})
    def get(self):
        id = request.values.get("id")
        d = Demand.query.filter_by(id=id).first()
        if not d:
            return jsonify({'code': -1})
        return jsonify({'code': 0, 'data': {'demand': d.detailtext}})