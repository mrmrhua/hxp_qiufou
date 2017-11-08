from flask import Flask
from flask_assets import Environment
from flask_cors import CORS
from flask_debugtoolbar import DebugToolbarExtension
from flask_login import LoginManager
from flask_mail import Mail
from flask_migrate import Migrate
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
# from flask_socketio import SocketIO,emit,send

db = SQLAlchemy()
lm = LoginManager()
mail = Mail()
toolbar = DebugToolbarExtension()
assets = Environment()
sess = Session()
cors = CORS()
# alembic = Alembic()
migrate = Migrate()
# socketio = SocketIO()

def create_app():
    app = Flask(__name__,instance_relative_config=True,static_url_path='/static')
    app.config.from_object('config.default')
    app.config.from_pyfile('config.py') # 从instance文件夹中加载配置
    app.config.from_envvar('WX_APP_CONFIG_FILE')  # 从环境变量中加载配置文xxx.py

    db.init_app(app)
    lm.init_app(app)
    mail.init_app(app)
    # socketio.init_app(app)
    if app.debug:
        toolbar.init_app(app)
        import logging
        logging.getLogger('flask_cors').level = logging.DEBUG

    from .api_v1_1 import api_1_1 as api
    app.register_blueprint(api,url_prefix='/api/v1.1')

    sess.init_app(app)
    # todo()
    cors.init_app(app,resources={r"/api/*":{"origins":"*"}})
    # alembic.init_app(app)
    migrate.init_app(app,db)

    #
    # @socketio.on('message')
    # def handle_message(message):
    #     print('receiverd message:'+ message)
    #     send(message)


    import logging
    from logging.handlers import RotatingFileHandler
    handler = RotatingFileHandler('wx.log', maxBytes=1024 * 1024 * 100, backupCount=20)
    # 设置日志记录最低级别为DEBUG，低于DEBUG级别的日志记录会被忽略，不设置setLevel()则默认为NOTSET级别。
    handler.setLevel(logging.INFO)
    # 控制日志记录格式
    logging_format = logging.Formatter(
        '%(asctime)s - %(levelname)s - %(filename)s - %(funcName)s - %(lineno)s - %(message)s')
    handler.setFormatter(logging_format)
    # 将此handler加入到此app中
    app.logger.addHandler(handler)

    return app

