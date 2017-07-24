from . import admindash
from flask import render_template,request, current_app, jsonify
from functools import wraps

@admindash.route('/admin/dash')
def dash():
    return render_template('admindash/index.html')
