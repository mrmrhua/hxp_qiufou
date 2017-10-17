function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
var code = getQueryString("code");
if (!code) {
    var obj = new WxLogin({
        id: "wxqrcode",
        appid: "wxbfacdb1b99885182",
        scope: "snsapi_login",
        redirect_uri: "http%3a%2f%2fhouxiaopang.com/s",
        state: "",
        style: "",
        href: ""
    });
} else {
    //todo change for url
    $.ajax({
        url: 'https://m.houxiaopang.com/api/v1.1/system_login',
        type: "GET",
        data: {
            'code': code
        },
        success: function (result) {
            if (result.code === 0) {
                window.localStorage.token = result.data.token;
            } else {
                alert("微信授权失败，请重试");
                //location.href = "http://houxiaopang.com/s";
            }
        },
        error: function () {
            alert("网络拥挤，请稍后再试");
            //location.href = "http://houxiaopang.com/s";
        }
    });
}