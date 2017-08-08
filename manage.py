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
    manager.add_command("runserver", Server(use_debugger=True))


# @manager.command
# def test():
#     import unittest
#     tests = unittest.TestLoader().discover('test')
#     unittest.TextTestRunner(verbosity=2).run(tests)




if __name__ == '__main__':
    manager.run()


