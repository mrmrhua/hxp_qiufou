webpackJsonp([14],{131:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{login:!1}},created:function(){showload("加载中");var t=getQueryString("code");t?this.getuid(t):token?this.authenticated():this.wxlogin()},methods:{wxlogin:function(){location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx35c4ce958bc7eb68&redirect_uri=https%3A%2F%2Fm.houxiaopang.com%2Fdemand%2F%23%2Fworkproject&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"},authenticated:function(){var t=this;ajax({url:"https://www.houxiaopang.com/api/v1.1/wxfwh/token/clientauthenticated",token:!0,timeout:5e3,success:function(e){0===e.code&&(t.login=!0,"/workproject"!=t.$route.path&&"/workproject/"!=t.$route.path||t.$router.push("/workproject/demand"))},error:function(e){hideload(),t.login=!0,401===e.status?t.wxlogin():showModal("网络拥挤，请稍后再试。")}})},getuid:function(t){ajax({url:"https://www.houxiaopang.com/api/v1.1/wx_verfify_client",data:{code:t},timeout:5e3,success:function(t){0===t.code?(window.localStorage.token=t.data.token,token=t.data.token,location.href="https://m.houxiaopang.com/demand/#/workproject"):showModal("登录失败，请重试。"),hideload()},error:function(){hideload(),showModal("登录失败，请重试。")}})}}}},14:function(t,e,o){var n=o(4)(o(131),o(258),null,null);t.exports=n.exports},258:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("router-view",{attrs:{login:t.login}})},staticRenderFns:[]}}});
//# sourceMappingURL=14.5b80d6d13c70166e1aa2.js.map