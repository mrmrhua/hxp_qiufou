from  flask import  session,jsonify
import  random
from flask_restful import Resource
from flask_session import Session
# from flask.ext.httpauth import HTTPTokenAuth

# SESSION_TYPE='redis'

# 生成TOKEN(随机数)并存到session
def generate_csrf_token():
    # session.clear()
    if '_csrf_token' not in session:
        session['_csrf_token'] = str(random.randint(0,199))
    return session['_csrf_token']


#
# auth = HTTPTokenAuth()
# @auth.verify_token
# def verify_token(token):
#     print("hello")
#     return True
#

# token,re_url api
class RandomToken(Resource):
    # decorators = [auth.login_required]
    def get(self):
        return  jsonify({'state':generate_csrf_token()})
    def post(self):
        return jsonify({'state':generate_csrf_token()})

