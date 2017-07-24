from  flask import  request,jsonify,current_app
from flask_restful import Resource
from app.model import Designwork,User
from app import db

class GetGalleryWork(Resource):
    def get(self):
        cat = int(request.args.get('cat'))
        page = int(request.args.get('page'))
        PER_PAGE = 50
        work_list = Designwork.query.filter_by(category=cat).paginate(page,PER_PAGE,False).items
        work = list()
        for w in work_list:
            d = w.designer
            w_designer = dict()
            w_designer['nickname'] = d.nickname
            w_designer['headimg'] =d.headimg
            w_designer['designer_id'] = d.id
            work.append(dict(work_url='//'+w.work_url,designer=w_designer))

        return   jsonify(work)