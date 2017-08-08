
from flask import Flask
from flask_debugtoolbar import DebugToolbarExtension
from flask_login import LoginManager
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from .exceptions import ValidationError
from flask_assets import Bundle,Environment
from .assets import bundle
import os
from flask_session import Session
from flask_cors import CORS,cross_origin
from flask_migrate import Migrate

db = SQLAlchemy()
lm = LoginManager()
mail = Mail()
toolbar = DebugToolbarExtension()
assets = Environment()
sess = Session()
cors = CORS()
# alembic = Alembic()
migrate = Migrate()

def create_app():
    app = Flask(__name__,instance_relative_config=True,static_url_path='/static')
    # app.config.from_object(config[config_name])
    app.config.from_object('config.default')
    # config[config_name].init_app(app)
    app.config.from_pyfile('config.py') # 从instance文件夹中加载配置
    app.config.from_envvar('APP_CONFIG_FILE')  # 从环境变量中加载配置文xxx.py

    db.init_app(app)
    lm.init_app(app)
    mail.init_app(app)
    if app.debug:
        toolbar.init_app(app)
        import logging
        logging.getLogger('flask_cors').level = logging.DEBUG

    assets.init_app(app)
    sess.init_app(app)
    cors.init_app(app,resources={r"/api/*":{"origins":"*"}})
    # alembic.init_app(app)
    migrate.init_app(app,db)

    assets.register(bundle)

    from .api_1_0 import api_bp as api_1_0_blueprint
    app.register_blueprint(api_1_0_blueprint,url_prefix='/api/v1.0')

    from  .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    #项目管理系统-经纪人添加项目
    from .add_project import add_project as add_project_bp
    app.register_blueprint(add_project_bp)

    from .designers import designers as designers_bp
    app.register_blueprint(designers_bp)

    #个人中心
    from .admindash import api_dash_bp as admindash_bp
    app.register_blueprint(admindash_bp,url_prefix='/api/v1.1')

    #API_1_1
    from .api_1_1 import api_1_1 as a_1_1
    app.register_blueprint(a_1_1,url_prefix='/api/v1.1')

    # 系统: 先不上线
    # from .prosys import api_sys as api_sys_1_0_blueprint
    # app.register_blueprint(api_sys_1_0_blueprint,url_prefix='/api/v1.0')


    # send email if error
    if not app.debug:
        import logging
        from logging.handlers import RotatingFileHandler
        handler = RotatingFileHandler('flask.log', maxBytes=1024 * 1024 * 100, backupCount=20)
        # 设置日志记录最低级别为DEBUG，低于DEBUG级别的日志记录会被忽略，不设置setLevel()则默认为NOTSET级别。
        handler.setLevel(logging.DEBUG)
        # 控制日志记录格式
        logging_format = logging.Formatter(
            '%(asctime)s - %(levelname)s - %(filename)s - %(funcName)s - %(lineno)s - %(message)s')
        handler.setFormatter(logging_format)
        # 将此handler加入到此app中
        app.logger.addHandler(handler)

    return app

