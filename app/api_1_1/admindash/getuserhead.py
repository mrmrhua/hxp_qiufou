import json
from functools import wraps
from flask import redirect, request, current_app,jsonify,session,g
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp
# from flask_cors import cross_origin
from flask_login import login_required
from app.common import auth
from app import cache
def getcity(info):
    if not info:
        return ''
    else:
        return info.city
def getveristatus(info):
    if not info:
        return ''
    else:
        return info.verify_status
class GetUserHead(Resource):
    @auth.login_required
    # @cache.cached(timeout=30)
    def get(self):
        r = jsonify({
          'code':0,
            'data': {'headimg': g.user.headimg
                          ,'nickname':g.user.nickname,
                     'userid':g.user.id,
                     'city':getcity(g.user.info),
                    'verify_status':getveristatus(g.user.info)}
        })
        return r