from  flask import  session,jsonify,g,request
import  random
from flask_restful import Resource
import json
from app.models import User,db,Tag,Category,Exp
from app.common import auth

class Userinfo(Resource):
    @auth.login_required
    def get(self):
        u = g.user
        info = u.info
        if not u.info:
            return jsonify({'code':-1})
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
                    'recom_code':info.recom_code
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

    @auth.login_required
    def post(self):
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


# 已经测试过了
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
    # db.session.bulk_save_objects(list_t)
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
    #  有ID的不动.没有ID的发来
    list_e = [ Exp(title=i.get("title"),content=i.get("desc"),user_id=g.user.id)  for i in exps if 'id' not in i ]
    db.session.bulk_save_objects(list_e)
    db.session.commit()

