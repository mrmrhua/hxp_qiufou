from flask import render_template,request,session,redirect,url_for,flash,current_app
from . import main
from app.common import get_access_token,get_user_info,get_wx_head
from app.model import User,db
from functools import wraps
from config import APPLYSTATUS,SEX
from flask_login import login_user,login_required,current_user
from app import lm
from qiniu import Auth,urlsafe_base64_encode
import requests
from app.common import send_designer_email,send_admin_email

lm.login_view = 'main.qrlogin'


# @main.route('/login')
# def login():
#     # 出二维码
#     # state = request.args.get('state')
#     # print(state)
#     # if state is None:
#     #     redirect('main/index.html')
#
#     if not current_user.is_authenticated:  #未登录,去扫个码
#         if current_app.config['ENVFLAG'] == 'dev':     #开发环境: 直接登录本人账号
#             #callback_url = 'http://127.0.0.1%3a5000/auth'
#             user = User.query.filter_by(unionid='ovS1y1X5otcOS9j3ZFbKt00e8IMA').first()
#             login_user(user)
#             return redirect(url_for('.apply'))
#         elif current_app.config['ENVFLAG'] == 'production' or 'testing':  #生产环境: 进入入驻详情页
#             return render_template('/designer_login/designer_login.html')
#             #  callback_url = 'http%3a%2f%2fhouxiaopang.com%2fauth'
#        # re_url = 'https://open.weixin.qq.com/connect/qrconnect?appid=wxbfacdb1b99885182&redirect_uri=' + callback_url + '&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect'
#        # return redirect(re_url)  #扫完码会跳转到/auth
#         #return redirect(url_for('designerLogin'))
#
#     if current_user.applystatus == APPLYSTATUS['PASS']:  #已登录,并且审核通过了,直接去个人中心
#         return  redirect(url_for('.admin'))
#
#     return redirect(url_for('.apply'))  #已登录,但是没填完表或审核未通过,去填表

@main.route('/auth')
def auth():
    if 'code' not in request.args:
        # return render_template('tem.html')
        return "error"

    code = request.args.get('code')
    # if (request.args.get('state') != session['_csrf_token']):  # csrf
    #     return 'error'
    #     # 此处应该禁止操作 ?????????????????????????????????????????????

    result = get_access_token(code)

    if  result is None:   #return 404
        return "error"

    # 验证身份成功

    userinfo = get_user_info(result.get('access_token'),result.get('openid'))

    nickname = userinfo['nickname']
    unionid = userinfo['unionid']
    sex = userinfo['sex']
    headimg = userinfo['headimgurl']

    # 用户更换头像会导致微信的头像URL失效,因此要先存七牛
    r = get_wx_head(headimg,unionid)
    if(r==0):  #抓取不成功
        return redirect(url_for('main.index'))
    headimg = 'http://userhead.houxiaopang.com/'+unionid+'.jpg'
    #存头像结束


    session['unionid'] = unionid

    # 根据unionid是否在库,决定是去填表还是去个人中心
    user = User.query.filter_by(unionid=unionid).first()
    if user is None:  # 第一次登陆
        applystatus = APPLYSTATUS['APPLYING']
        user = User(nickname=nickname, unionid=unionid, sex=sex, headimg=headimg, applystatus=applystatus)
        db.session.add(user)
        try:
            db.session.commit()
        except:
            db.session.rollback()()


    login_user(user, remember=True)
    session['applystatus'] = user.applystatus
    if user.applystatus==APPLYSTATUS['PASS']:  #已审核
        # 更新一下个人资料
        return url_for('.admin')   #去个人中心

    if user.applystatus == APPLYSTATUS['NOTPASS']:
        return redirect(url_for('.reapply'))

    #在提交过程中/或已提交在审核中
        #留前端处理

    return redirect(url_for('.apply'))

# 如果在申请状态,跳到applyform,
# 如果申请通过,跳到个人中心
# def is_applying():
#     if current_user.is_authenticated():
#         if current_user.applystatus == APPLYSTATUS['PASS']:
#             return   url_for('.admin')
#         return url_for('.apply')
#     return url_for('/login')

#
# # 只有在申请状态才能进入表单
# def is_applying(func):
#     @wraps(func)
#     def decorated_function(*args, **kwargs):
#         #     查看申请状态
#         #
#         if current_user.is_authenticated()==True:
#             if current_user.applystatus == APPLYSTATUS['PASS']:
#                 return func(*args, **kwargs)
#             return redirect(url_for('.apply'))
#         return redirect(url_for('/login'))
#     # return func(*args, **kwargs)
#
#     return decorated_function



#
# @main.route('/apply')
# @login_required  #补充:只有在审核的才能进
# def apply():
#     return render_template('main/baseform.html',applystatus=current_user.applystatus)


# def is_applying(func):
#     @wraps(func)
#     def decorated_function(*args, **kwargs):
#         if current_user.applystatus == APPLYSTATUS['PASS']:
#             return func(*args, **kwargs)
#
#     return decorated_function

@main.route('/admin')
@login_required
# @is_applying
def admin():  #补充:只有审核完成的才能进
    return "hello designers"


@main.route('/applyfail')
@login_required
def reapply():
    flash('抱歉,您的申请未通过审核.请填写完善信息后重新提交.')
    # 提示未通过
    current_user.applystatus = APPLYSTATUS['APPLYING']
    session['applystatus'] = current_user.applystatus
    db.session.add(current_user)
    try:
        db.session.commit()
    except:
        db.session.rollback()()
    # 状态转为申请中
    return  redirect(url_for('.apply'))
    # 自动跳转申请页


@main.route('/help/<string:to>')
def help(to):
    if(to == 'customer'):
        return render_template('help/customer.html')
    if (to == 'designer'):
        return render_template('help/designer.html')
    if (to == 'faq'):
        return render_template('help/faq.html')
    if (to == 'contact'):
        return render_template('help/contact.html')
    if (to == 'aboutus'):
        return render_template('help/aboutus.html')


# @main.route('/workgallery')
# def gallery():
#     return  render_template('main/workgallery.html')


@main.route('/test')
def test():
    return render_template('main/baseform.html')

# @main.route('/designerlogin')
# def designerLogin():
#     return render_template('/designer_login/designer_login.html')

# @main.route('/agreement')
# def agreetext():
#     return render_template('baseform/agreement.html')






## 新一批路由  更新于2017.7.20

@main.route('/')
def index():
    return  render_template('main/index.html')

@main.route('/index')
def toindex():
        return redirect(url_for('main.index'))

#设计师入驻的详情页
@main.route('/qrlogin')
def qrlogin():
    return render_template('designer_login/qrlogin.html')



@main.route('/apply')
# 需要禁止没有通过扫码的用户进入该页面(重定向到扫码界面)
# 用户要持有一个OPENID和TOKEN作为验证
# @login_required
def apply():
    if 'unionid' not in session:
        return redirect(url_for('main.index'))
    # return render_template('designers/baseform.html')
    return render_template('main/apply.html')

@main.route('/workgallery')
def gallery():
    #return  render_template('main/')
    return redirect(url_for('main.stilldoing'))

# @main.route("/still-doing")
# def stilldoing():
#     return render_template('main/404_todo.html')
#
# @main.route("/404")
# def NOTFOUND():
#     return render_template('main/404.html')
