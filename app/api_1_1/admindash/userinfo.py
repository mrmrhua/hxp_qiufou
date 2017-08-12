from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
import json
from app.models import User,db
from app.models import Tag,Category,Exp


class Userinfo(Resource):
    # TODO(DYH)
    # @auth.login_required
    def get(self):
        #TODO
        g.user = User.query.filter_by(id=27).first()

        u = g.user
        info = u.info
        return jsonify({
            'code':0,
            'data':{'usertype':u.usertype,
                'basic':{
                    'nickname':u.nickname,
                    'headimg' :u.headimg,
                    'sex':u.sex,
                    'startyear':info.startyear,
                    'school':info.school,
                    'city':info.city,
                    'tel':info.tel,
                    'email':info.email,
                },
                'worksetting':{
                    'worktime':info.worktime,
                    'category':u.get_categories_str(),
                    'tag':u.get_tags_str(),
                    'exp':u.get_exps_str(),
                    'privacy':info.privacy,
                    'ticket':info.ticket,
                },

            }
        })


    # TODO(DYH)
    def post(self):
    # @auth.login_required
        # TODO
        g.user = User.query.filter_by(id=27).first()

        u = g.user
        info = u.info

        basic_obj = None

        worksetting_obj = None
        tmp  = request.values.get("basic")
        if tmp:
            basic_obj = json.loads(tmp)
            # 处理昵称\头像\性别
            u.from_admin(basic_obj)

        tmp = request.values.get("worksetting")
        if tmp:
            worksetting_obj = json.loads(tmp)
            # 处理TAG
            tags = worksetting_obj.get("tag")
            add_tags(tags)  # 处理DESIGENRINFO信息

            # 处理Category
            cats = worksetting_obj.get("category")
            add_categories(cats)

            # 处理EXPS
            exps = worksetting_obj.get("exp")
            add_exps(exps)

        info.from_admin(basic_obj,worksetting_obj)


        return {'code':0}



def add_tags(tags):
    # list_t = []
    # for i in tags:
    #     # if exist
    #     t = Tag.query.filter_by(tag_name=i).first()
    #     if not t:
    #         t = Tag(tag_name=i)  # a new tag
    #         db.session.add(t)
    #     list_t.append(t)
    list_t = [  (Tag.query.filter_by(tag_name=i).first() or Tag(tag_name=i)) for i in tags   ]
    g.user.tags=list_t
    db.session.bulk_save_objects(list_t)
    db.session.commit()





def add_categories(cats):
    list_c = [ (Category.query.filter_by(category_name=i).first())  for i  in cats ]
    # for i in cats:
    #     c = Category.query.filter_by(category_name=i).first()
    #     list_c.append(c)
    g.user.categories = list_c
    db.session.bulk_save_objects(list_c)
    db.session.commit()

def add_exps(exps):
    list_e = [ Exp(title=i.get("title"),content=i.get("desc"))  for i in exps ]
    g.user.experiences = list_e
    db.session.bulk_save_objects(list_e)
    db.session.commit()

