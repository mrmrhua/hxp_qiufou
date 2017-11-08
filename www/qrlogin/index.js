function getQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]);
	    return null;
}
try{
	window.localStorage.test = "ok";
	init();
}catch(e){
	alert("请勿使用safari的无痕浏览模式。")
}

function init(){
	var code = getQueryString("code");
    if (!code) {
        var obj = new WxLogin({
            id: "wxqrcode",
            appid: "wxbfacdb1b99885182",
            scope: "snsapi_login",
            redirect_uri: "http%3a%2f%2fhouxiaopang.com%2fqrlogin",
            state: "",
            style: "",
            href: ""
        });
    } else {
		_czc.push(["_trackEvent",'扫码登录','扫码']);
		$.ajax({
			url: 'http://www.houxiaopang.com/api/v1.1/wx_verify',
			type: "GET",
			data:{
				'code':code
			},
			success: function(result) {
				if(result.code=='0'){
	           		window.localStorage.token = result.data.token;
					window.localStorage.applystatus = result.data.applystatus
					if(result.data.applystatus === 0){
						_czc.push(["_trackEvent",'新客登录','扫码']);
					}else{
						_czc.push(["_trackEvent",'老客登录','扫码']);
					}
	            	location.href = result.data.url;
	            }else{
	            	alert("微信授权失败，请重试");
	           		location.href= "http://houxiaopang.com/qrlogin";
	            }
			},
			error: function() {
				alert("网络拥挤，请稍后再试");
				location.href= "http://houxiaopang.com/qrlogin";
			}
		});
	}
}
	