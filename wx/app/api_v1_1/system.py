from  flask import  session,jsonify,request,url_for,g,current_app,send_file
from flask_restful import Resource
from app.wxmodels import *
from app import db
import json
from datetime import datetime
from app.common import *
import qrcode
from io import BytesIO
import string,random

class Claim(Resource):
    def post(self):
        uid = request.json.get("uid")
        cat_id = request.json.get("cat_id")
        demand_id= request.json.get("demand_id")
        u = User.query.filter_by(uid=uid).first()
        if not u:
            return jsonify({'code': -1})
        pro = Project.query.filter_by(uid=uid,demand_id=demand_id).first()
        if not pro:
            pro = Project(uid=uid,cat_id=cat_id,demand_id=demand_id,designer=u.nickname)
            db.session.add(pro)
            db.session.commit()
        return jsonify({'code':0,'project_id':pro.id})


def getlastimg(pro):
    if pro.posts and pro.posts[0].works:
        return pro.posts[0].works[0].work_url
    else:
        return None


class Projectlist(Resource):
    @auth.login_required
    def get(self):
        uid = request.values.get("uid")

        pros = Project.query.filter_by(uid=g.user.uid).all()


        project = [{'cat':i.demand.cat_id,
                        'up_time':datetime.strftime(i.demand.up_time, "%Y-%m-%d %H:%M"),
                        'id': i.id,'client':i.demand.name,'designer':i.designer,
                        'lastimg':getlastimg(i)
                    } for i  in pros]
        return jsonify({'code':0,'data':{'project':project}})


class Projectlist_WX(Resource):
    def get(self):
        uid = request.values.get("uid")
        pros = Project.query.filter_by(uid=uid).all()

        project = [{'cat': i.demand.cat_id,
                    'up_time': datetime.strftime(i.demand.up_time, "%Y-%m-%d %H:%M"),
                    'id': i.id, 'client': i.demand.name, 'designer': i.designer,
                    'lastimg': getlastimg(i)
                    } for i in pros]
        return jsonify({'code': 0, 'data': {'project': project}})



class Timeline(Resource):
    def get(self):
        # TODO
        id= request.values.get("id")
        uid = request.values.get("uid")
        pro = Project.query.filter_by(id=id).first()
        if not pro:
            return jsonify({'code': -1})
        cat = pro.cat_id
        demand_id=pro.demand_id
        designer = pro.designer
        client = pro.demand.name
        identity=2
        # 设计师身份
        if uid == pro.uid:
            identity = 1
        singlepost = [ {'postid':i.id,'desc':i.desc, 'up_time':datetime.strftime( i.up_time, "%Y-%m-%d %H:%M"),
        'imglist': [ n.work_url for n in i.works ],'imgnum':len(i.works)     }  for i in pro.posts ]


        return jsonify({'code': 0,'data':{
            'cat':cat,
            'demand_id':demand_id,
            'designer':designer,
            'client':client,
            'identity':identity,
            'singlepost':singlepost




        }})

class Postdetail(Resource):
    def get(self):
        post_id = request.values.get("postid")
        p = Post.query.filter_by(id=post_id).first()
        if not p:
            return jsonify({'code': -1})
        imglist = [i.work_url for i in p.works]
        return jsonify({'code': 0,'imglist':imglist})


class Systemlogin(Resource):
    def get(self):
        ran_str = request.values.get("code")
        if not ran_str:
            return jsonify({"code":-1})
        # ran_str = ''.join(random.sample(string.ascii_letters + string.digits, 16))
        qr = qrcode.QRCode(
            version=4,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=1
        )
        qr.add_data('http://m.houxiaopang.com/error?code='+ran_str)
        img = qr.make_image()
        # change COLOR
        img = img.convert("RGBA")
        datas = img.getdata()
        newData = []
        for item in datas:
            if item[0] == 0 and item[1] == 0 and item[2] == 0:
                newData.append((251,96,75, item[3]))
            else:
                newData.append(item)
        img.putdata(newData)

        # CHANGE COLOR
        byte_io = BytesIO()
        img.save(byte_io, 'PNG')
        byte_io.seek(0)
        return  send_file(byte_io,mimetype='image/png')
        # return jsonify({'code': 123})

class WX_qrlogin(Resource):
    def post(self):
        uid = request.json.get("uid")
        code = request.json.get("code")
        # # 存数据库
        u = User.query.filter_by(uid=uid).first()
        u.login_code = code
        db.session.add(u)
        db.session.commit()
        return jsonify({'code': 0})

class Polling(Resource):
    def get(self):
        code = request.values.get("code")
        #  验证
        u = User.query.filter_by(login_code=code).first()
        if u:
            token =  u.generate_auth_token().decode()
            return jsonify({'code':0,'data':{'token':token,'nickname':u.nickname,'headimg':u.headimg}})
        else:
            return jsonify({'code':-1})



class TokenVerify(Resource):
    @auth.login_required
    def get(self):
        return jsonify({'code':0})

class Postlist(Resource):
    @auth.login_required
    def post(self):
        imglist = json.loads(request.values.get("imglist"))
        desc = request.values.get("desc")
        project_id= request.values.get("project_id")
        up_time = datetime.now()

        p = Post(up_time=up_time,desc=desc,project_id=project_id)
        # if g.user.uid!=p.uid:
        #     return  jsonify({'code': -1})
        db.session.add(p)
        db.session.flush()
        for i in imglist:
            d = Designwork(work_url=i)
            p.works.append(d)
        db.session.commit()
        return jsonify({'code': 0})

    def get(self):
        project_id= request.values.get("project_id")
        pro = Project.query.filter_by(id=project_id).first()
        if not pro:
            return jsonify({'code': -1})

        post = [ {'id':i.id,'desc':i.desc, 'up_time':datetime.strftime( i.up_time, "%Y-%m-%d %H:%M"),
        'imglist': [ n.work_url for n in i.works ]
           }  for i in pro.posts ]

        return jsonify({'code': 0,'data':{'post':post}})



class DelProject(Resource):
    def post(self):
        id = request.json.get("id")
        pro = Project.query.filter_by(id=id).first()
        if not pro:
            return jsonify({'code': -1})
        pro.uid = ''
        db.session.add(pro)
        db.session.commit()
        return jsonify({'code':0})