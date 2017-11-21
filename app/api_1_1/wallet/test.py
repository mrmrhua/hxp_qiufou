from  flask import jsonify,request,g,session
from flask_restful import Resource
import pingpp
from config import live_key,test_key,pingxx_app_id
def getch():
    pingpp.api_key = test_key
    pingpp.private_key_path = '/Users/ding/dev/hxp/pingxxprivate.pem'
    try:
        charge = pingpp.Charge.create(
            order_no='1234567890',  # 推荐使用 8-20 位，要求数字或字母，不允许其他字符 HXP100000+id
            amount=100,  # 订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
            app=dict(id=pingxx_app_id),
            channel='alipay_pc_direct',  # https://www.pingxx.com/api#支付渠道属性值
            currency='cny',
            client_ip='127.0.0.1',  # 发起支付请求客户端的 IP 地址，格式为 IPV4，如: 127.0.0.1
            subject='Your Subject',
            body='Your Body',
            extra=dict(
                success_url='127.0.0.1',
                # 必须，支付成功的回调地址，在本地测试不要写 localhost ，请写 127.0.0.1。URL 后面不要加自定义参数。
                # enable_anti_phishing_key=False,  # 可选，是否开启防钓鱼网站的验证参数（如果已申请开通防钓鱼时间戳验证，则此字段必填）。
                # exter_invoke_ip='8.8.8.8'  # 可选，客户端 IP ，用户在创建交易时，该用户当前所使用机器的IP（如果商户申请后台开通防钓鱼IP地址检查选项，此字段必填，校验用）。
            )
        )
        return charge
    except Exception as e:
        print(e.http_body)
        return None

class TestPay(Resource):
    def get(self):
        ch = getch()
        if not ch:
            return -1
        else:
            return ch

