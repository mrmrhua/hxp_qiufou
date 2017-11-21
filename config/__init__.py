import os

#  环境变量APP_CONFIG_FILE为环境的配置文件
# Global variables
SEX = {
    'MALE' : 1,
    'FEMALE' : 2,
    'UNKNOW' : 0
}

#apply status
APPLYSTATUS = {
    'APPLYING':0,
    'CHECKING': 1,
    'NOTPASS': -1,
    'PASS': 2
}

qiniu_access_key = os.environ.get('QINIU_access_key')
qiniu_secret_key = os.environ.get('QINIU_secret_key')

ADMIN_KEY = 'boosprivelidge'


AGREE_EMAIL_HTML= """\
<html>
    <head></head>
    <body>
   <p>亲爱的设计师</p>

    <p>您好！</p>

<p>首先，请让我们对您愿意选择入驻猴小胖设计服务专家表示由衷的感谢。经过我们的综合评估，很开心地告诉您，恭喜您成为猴小胖设计服务专家的签约设计师！</p>

<p>我们深知设计行业中，作为乙方的设计师在项目合作中所遭受的各种困难。我们也致力于为您这样的优秀的个人设计师解决这一问题。希望未来在我们的努力和服务下，您可以接触更多的优质客户，实现个人品牌塑造。我们也希望在您的优秀发挥之下，猴小胖这个品牌可以发光发热，为我们、为您带来更高的评价！</p>

<p>为提高客户匹配效率，您可以通过我们的网站上传个人设计作品集，帮助甲方更直观的感受您的设计风采。进入<a href='http://houxiaopang.com'>houxiaopang.com</a>扫码登陆后即可在个人中心中完成作品上传。</p>

<p>接下来，如果有合作的机会，我们会通过您入驻时留下的联系方式第一时间联系您。我们的客户经理也会在近日主动接触您，为您答疑解惑。同时也欢迎您关注我们的公众号［ 猴小胖爱设计 ］，并推荐您身边的设计师们也加入我们猴小胖大家庭。</p>

<p>期待与您的合作！</p>
 <br>
<p>------</p>
<p>猴小胖设计服务专家</p>
    </body>
<html>
"""

DISAGREE_EMAIL_HTML = """\
<html>
    <head></head>
    <body>
   <p>亲爱的设计师</p>

    <p>您好！</p>

<p>首先，请让我们对您愿意选择入驻猴小胖设计服务专家表示由衷的感谢。</p>

<p>然而很遗憾的是，您此次的申请未通过猴小胖的审核。这可能是因为您没有正确填写含有您作品的主页地址，或没有上传符合我们要求的作品。您可以在我们的网站上重新提交申请。</p>

<p>由于业务繁忙，我们的工作也可能出现纰漏，您可以通过QQ：2910759538联系我们的客服人员进行处理。</p>

<p>再次感谢您对猴小胖的关注与支持！期待日后有机会与您合作！</p>

 <br>
<p>------</p>
<p>猴小胖设计服务专家</p>
    </body>
<html>
"""



ADMIN_EMAIL = 'mrmrhua@126.com'

ADMIN_TEL='15700079780'


# ping++支付参数
live_key  = 'sk_live_9O4GKSq5CCSKHunHyHyfLmbH'
test_key = 'sk_test_fXLC88nXD4y1ePK4mTH0uP0K'
pingxx_app_id = 'app_rnjXr9fDuTSSfHmn'
