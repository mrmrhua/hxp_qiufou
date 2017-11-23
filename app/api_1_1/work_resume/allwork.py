from  flask import jsonify,request
from flask_restful import Resource
from app.models import Album
from random import shuffle

class GetAllWork(Resource):
    def get(self):

        # 类目
        cat = request.values.get("category")
        if not cat:
            return jsonify({'code':-1})

        designer_id = request.values.get("designer_id")
        if not designer_id:  #没有ID, 返回全部的
            pass

        # 第几页
        # TODO(DYH)
        page = request.values.get("page")
        if page and page!='undefined':
            page = int(page)
        else:
            page=1
        # 每页数量
        num = request.values.get("num")
        if not num:
            num = 20

        # 去数据库中取这个品类\PAGE

        # 根据品类挑选
        # if cat == '-1':   #全部都要
        # Album.query.filter_by(category = cat)
        PER_PAGE = num

        # 作品详情页面
        if not designer_id:
            if cat == '-1':  # 全部都要
                count = Album.query.filter(Album.privacy != 1).count()
                al = Album.query.filter(Album.privacy!=1).order_by(Album.up_time.desc()).paginate(page,PER_PAGE,False).items
            else:
                count = Album.query.filter_by(category=cat).filter(Album.privacy != 1).count()
                al = Album.query.filter(Album.privacy!=1).filter_by(category=cat).order_by(Album.up_time.desc()).paginate(page,PER_PAGE,False).items
        # 个人简历页面的查看部分
        else:
            if cat == '-1':  # 全部都要
                count = Album.query.filter_by(user_id=designer_id).count()
                al = Album.query.filter_by(user_id=designer_id).order_by(Album.up_time.desc()).paginate(page,PER_PAGE,False).items
            else:
                count = Album.query.filter_by(user_id=designer_id,category=cat).count()
                al = Album.query.filter_by(user_id=designer_id,category=cat).order_by(Album.up_time.desc()).paginate(page,PER_PAGE,False).items

        album = []
        for i in al:
            each_album={
             'work_id':i.id,
             'category':i.category,
             'cover':i.cover,
             'title':i.title,
             'up_time':i.up_time,
             'category':i.category,
             'username':i.designer.nickname,
             'headimg' :  i.designer.headimg,
             'user_id' : i.designer.id,
            'desc':i.description
            }
            album.append(each_album)
        shuffle(album)
        return jsonify({'code':0,'data':{'album':album,'total':count}})
