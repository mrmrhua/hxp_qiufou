'''
Created by auto_sdk on 2015.10.10
'''
from top.api.base import RestApi
class OpenimTribeInviteRequest(RestApi):
	def __init__(self,domain='gw.api.taobao.com',port=80):
		RestApi.__init__(self,domain, port)
		self.members = None
		self.tribe_id = None
		self.user = None

	def getapiname(self):
		return 'taobao.openim.tribe.invite'
