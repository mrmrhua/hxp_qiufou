from fabric.api import run,env,cd,prefix

env.hosts =['123.206.188.234']
env.user = 'root'
env.password='qclouding123'
env.activate = 'source venv/bin/activate'

def go():
    with cd('/home/wwwroot/houxiaopang.com'):
        with prefix(env.activate):
            run('gunicorn manage:app -p manage.pid -b 127.0.0.1:8000 -D')


def stop():
    with cd('/home/wwwroot/houxiaopang.com'):
        run('kill `cat manage.pid`')