import json
from functools import wraps
from flask import redirect, request, current_app,jsonify
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp



class GetUserHead(Resource):
    @support_jsonp
    def get(self):
        return jsonify({'headimg': current_user.headimg
                          ,'nickname':current_user.nickname})
