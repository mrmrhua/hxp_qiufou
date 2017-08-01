from app import create_app
from flask_script import Manager,Shell,Server
from werkzeug.contrib.fixers import ProxyFix


# app = create_app('dev')
app = create_app()
app.wsgi_app = ProxyFix(app.wsgi_app)

def make_shell_context():
    return dict(app=app)

manager = Manager(app)

manager.add_command('shell',Shell(make_context=make_shell_context))
if app.config['ENVFLAG']=='dev' or 'testing':
    # DEBUG
    manager.add_command("runserver", Server(use_debugger=True))

@manager.command
def test():
    import unittest
    tests = unittest.TestLoader().discover('test')
    unittest.TextTestRunner(verbosity=2).run(tests)




if __name__ == '__main__':
    # app.run(host='0.0.0.0')
    manager.run()


