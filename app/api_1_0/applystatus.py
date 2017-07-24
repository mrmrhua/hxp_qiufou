from  flask import  request,jsonify,current_app
from flask_restful import Resource
from flask_login import current_user

class GetApplyStatus(Resource):
    def get(self):
        return jsonify({'applystatus':current_user.applystatus})
