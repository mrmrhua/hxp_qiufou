import json
from functools import wraps
from flask import redirect, request, current_app,jsonify
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp
# from flask_cors import cross_origin
from flask_login import login_required

class GetUserHead(Resource):
    def get(self):
        # print("in")
        # return jsonify({
        #   'code':0,
        #     'data': {'headimg': 'http://userhead.houxiaopang.com/ovS1y1eqGJuYTLmesIuyEY5d4Ttg.jpg'
        #                   ,'nickname':'ding'}
        # })
        return jsonify({'headimg': current_user.headimg
                          ,'nickname':current_user.nickname})
