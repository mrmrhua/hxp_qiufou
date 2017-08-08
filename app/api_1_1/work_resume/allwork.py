from  flask import jsonify,request
from flask_restful import Resource
from app.model import Album


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
        page = request.values.get("page")
        if page:
            page = int(page)

        # 每页数量
        num = request.values.get("num")
        if not num:
            num = 20

        # 去数据库中取这个品类\PAGE

        # 根据品类挑选
        # if cat == '-1':   #全部都要
        # Album.query.filter_by(category = cat)
        PER_PAGE = num

        if not designer_id:
            if cat == '-1':  # 全部都要
                al = Album.query.order_by(Album.up_time.desc()).paginate(page,PER_PAGE,False).items
            else:
                al = Album.query.filter_by(category=cat).order_by(Album.up_time.desc()).paginate(page,PER_PAGE,False).items
        else:
            if cat == '-1':  # 全部都要
                al = Album.query.filter_by(user_id=designer_id).order_by(Album.up_time.desc()).paginate(page,PER_PAGE,False).items
            else:
                al = Album.query.filter_by(user_id=designer_id,category=cat).order_by(Album.up_time.desc()).paginate(page,PER_PAGE,False).items

        count = len(al)
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
            }
            album.append(each_album)

        return jsonify({'code':0,'data':{'album':album,'total':count}})
