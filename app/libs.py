import requests
import base64
import hmac
from hashlib import sha1
import urllib.parse
import time
import uuid

class Aliyuncs(object):
    def __init__(self):
        self.access_id = 'LTAIyz5K3aJnB5Hy'
        self.access_secret = 'mGYxH1YQLB3ZYpk2rsc7lwdtDGecNs'
        self.url = 'http://dm.aliyuncs.com'

    def sign(self, accessKeySecret, parameter):
        sortedParameters = sorted(parameter.items(),
                                  key=lambda parameter: parameter[0])
        canonicalizedQueryString = ''

        for (k, v) in sortedParameters:
            canonicalizedQueryString += '&' + self.percent_encode(k) + \
                                        '=' + self.percent_encode(v)

        stringToSign = 'GET&%2F&' + self.percent_encode(
            canonicalizedQueryString[1:])

        h = hmac.new(bytes((accessKeySecret + "&").encode("utf-8")),
                     stringToSign.encode('utf-8'), sha1)
        signature = base64.encodestring(h.digest()).strip()
        return signature

    def percent_encode(self, encodeStr):
        encodeStr = str(encodeStr)
        res = urllib.parse.quote(encodeStr.encode('utf-8'), '')
        res = res.replace('+', '%20')
        res = res.replace('*', '%2A')
        res = res.replace('%7E', '~')
        return res

    def make_url(self, params):
        timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        parameters = {
            'Format': 'JSON',
            'Version': '2015-11-23',
            'AccessKeyId': self.access_id,
            'SignatureVersion': '1.0',
            'SignatureMethod': 'HMAC-SHA1',
            'SignatureNonce': str(uuid.uuid1()),
            'Timestamp': timestamp,
        }
        for key in params.keys():
            parameters[key] = params[key]
        signature = self.sign(self.access_secret, parameters)
        parameters['Signature'] = signature
        url = self.url + "/?" + urllib.parse.urlencode(parameters)
        return url


def send_mail_in_text(to,Subject,TextBody):
    aliyun = Aliyuncs()
    data = {
        'Action': 'SingleSendMail',
        'AccountName': 'notice@devmail.houxiaopang.com',
        'ReplyToAddress': True,
        'AddressType': 1,
        'ToAddress': to,
        'FromAlias': '猴小胖设计服务专家',
        'Subject':Subject,
        'TextBody': TextBody
    }
    url = aliyun.make_url(data)
    response = requests.get(url)
    return response

def send_mail_in_html(to,Subject,HtmlBody):
    aliyun = Aliyuncs()
    data = {
        'Action': 'SingleSendMail',
        'AccountName': 'notice@devmail.houxiaopang.com',
        'ReplyToAddress': True,
        'AddressType': 1,
        'ToAddress': to,
        'FromAlias': '猴小胖设计服务专家',
        'Subject':Subject,
        'HtmlBody': HtmlBody
    }
    url = aliyun.make_url(data)
    response = requests.get(url)
    return response
