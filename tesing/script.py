
# -*- coding: utf-8 -*-
'''
Created on 2012-7-3

@author: lihao
'''
import top.api


'''
这边可以设置一个默认的appkey和secret，当然也可以不设置
注意：默认的只需要设置一次就可以了

'''
# top.setDefaultAppInfo("24592121", "e4af5ea5f3c1687320650f1678db4a7a")

'''
使用自定义的域名和端口（测试沙箱环境使用）
a = top.api.UserGetRequest("gw.api.tbsandbox.com",80)

使用自定义的域名（测试沙箱环境使用）
a = top.api.UserGetRequest("gw.api.tbsandbox.com")

使用默认的配置（调用线上环境）
a = top.api.UserGetRequest()

'''
# a = top.api.UserGetRequest('http://gw.api.taobao.com/router/rest')


'''
可以在运行期替换掉默认的appkey和secret的设置
a.set_app_info(top.appinfo("appkey","*******"))
'''

# a.fields="nick"

# req=top.api.OpenimUsersAddRequest()
# # req.set_app_info(top.appinfo(appkey,secret))
#
# req.userinfos= [
#     {'nick': 'ding', 'userid': 1, 'password': '123456'},
#     {'nick': 'robin', 'userid': 2, 'password': '123456'}
# ]

#
# try:
#     f= req.getResponse()
#     print("ok")
#     print(f)
# except Exception as e:
#     print(e)


#
# Userinfo = [
#     {'nick': 'ding', 'userid': 1, 'password': '123456'},
#     {'nick': 'robin', 'userid': 2, 'password': '123456'}
#
# ]


req=top.api.OpenimUsersAddRequest('taobao.openim.users.add',80)
req.set_app_info(top.appinfo("24592121", "e4af5ea5f3c1687320650f1678db4a7a"))

req.userinfos="ding"
try:
    resp= req.getResponse()
    print(resp)
except Exception as e:
    print(e)

