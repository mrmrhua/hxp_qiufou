from flask import render_template,request,session,redirect,url_for
from . import designers
import  urllib
from qiniu import Auth, put_file, etag, urlsafe_base64_encode
import qiniu.config
import os
from  config import qiniu_access_key,qiniu_secret_key

@designers.route('/designer/pm')
def designproject():
    #专属链接
    if request.args.get("id") is None:
        return 'no id'
        #     error
    pro_id = int(request.args.get("id"))

    return  render_template('designers/timeline.html',id_from_s = pro_id)