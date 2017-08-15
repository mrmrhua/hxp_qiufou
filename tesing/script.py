from app.models import *
import requests
import urllib.parse
import urllib.request

def agree():
    url = 'http://houxiaopang.com/api/v1.1/agreeapply'

    # apply_id

    us = User.query.filter_by(applystatus = 2).all()

    for i in us:
        af = i.applyform
        if af == []:
            continue
        else:
            af = i.applyform[-1]
        print(af)
        postdata = {'apply_id' : af.id}

        data = urllib.parse.urlencode(postdata)
        # that params output from urlencode is encoded to bytes before it is sent to urlopen as data
        data = data.encode('utf-8')
        req = urllib.request.Request(url, data)
        response = urllib.request.urlopen(req)

        html = response.read()
        print(html.decode('utf-8'))
