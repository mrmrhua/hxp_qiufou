from flask import render_template,request,session,redirect,url_for,flash,current_app
from . import admin

@admin.route('/webadmin')
def Login():
    return render_template('webadmin/index.html')

@admin.route('/webadmin/admin')
def Webadmin():
    if 'authed' not in session:
        return redirect('/webadmin')
    elif session['authed'] == True:
        return render_template('webadmin/index.html')
    else:
        return redirect('/webadmin')