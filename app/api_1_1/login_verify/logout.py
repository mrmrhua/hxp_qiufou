from  flask import  jsonify
from flask_restful import Resource
from app.common import auth
from flask import g
from app.models import User

# 登出功能
# update a new token
class LogOut(Resource):
    @auth.login_required
    def post(self):
        # g.user = User.query.filter_by(id=27).first()
        # 重新生成TOKEN
        g.user.generate_auth_token()
        return jsonify({'code':0})

