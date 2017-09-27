from app import create_app
from flask_script import Manager,Shell,Server
from werkzeug.contrib.fixers import ProxyFix
from flask_migrate import MigrateCommand

# app = create_app('dev')
app = create_app()
app.wsgi_app = ProxyFix(app.wsgi_app)

def make_shell_context():
    return dict(app=app)

manager = Manager(app)

# 命令行工具
manager.add_command('shell',Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)
# 测试环境使用debugger工具
if app.config['ENVFLAG']=='dev' or 'testing':
    # DEBUG
    #  服务器会在代码变化的时候自动加载并且出错的时候会伴随着一个堆栈跟踪和一个交互式控制台。
    # TODO(DYH)
    pass
    # manager.add_command("runserver", Server(use_debugger=True))


if __name__ == '__main__':
    manager.run()