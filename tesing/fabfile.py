from fabric.api import run,env,cd,prefix

env.hosts =['115.159.115.96']
env.user = 'root'
env.password='qclouding123'
env.activate = 'source venv/bin/activate'

# def go():
#     with cd('/home/hxp'):
#         with prefix(env.activate):
#             run('')
def go():
    run('systemctl start hxp')

def stop():
    run('systemctl stop hxp')

def status():
    run('systemctl status hxp -l')

def restart():
    run('systemctl restart hxp')

def updb():
    with cd("/home/hxp"):
        with prefix(env.activate):
            run("python manage.py db migrate -m 'upgrade'")
            run('python manage.py db upgrade')