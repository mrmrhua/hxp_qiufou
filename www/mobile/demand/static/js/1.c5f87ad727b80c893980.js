webpackJsonp([1],{100:function(e,t,n){var i=n(25);e.exports={CP_B2B_URL:"https://payment.chinapay.com/CTITS/service/rest/page/nref/000000000017/0/0/0/0/0",handleCharge:function(e){var t=e.credential[e.channel];i.formSubmit(this.CP_B2B_URL,"post",t)}}},101:function(e,t,n){var i=n(29),a={}.hasOwnProperty;!function(){var t={},n={};n.PADCHAR="=",n.ALPHA="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n.makeDOMException=function(){try{return new DOMException(DOMException.INVALID_CHARACTER_ERR)}catch(t){var e=new Error("DOM Exception 5");return e.code=e.number=5,e.name=e.description="INVALID_CHARACTER_ERR",e.toString=function(){return"Error: "+e.name+": "+e.message},e}},n.getbyte64=function(e,t){var i=n.ALPHA.indexOf(e.charAt(t));if(-1===i)throw n.makeDOMException();return i},n.decode=function(e){e=""+e;var t,i,a,r=n.getbyte64,o=e.length;if(0===o)return e;if(o%4!=0)throw n.makeDOMException();t=0,e.charAt(o-1)===n.PADCHAR&&(t=1,e.charAt(o-2)===n.PADCHAR&&(t=2),o-=4);var l=[];for(i=0;i<o;i+=4)a=r(e,i)<<18|r(e,i+1)<<12|r(e,i+2)<<6|r(e,i+3),l.push(String.fromCharCode(a>>16,a>>8&255,255&a));switch(t){case 1:a=r(e,i)<<18|r(e,i+1)<<12|r(e,i+2)<<6,l.push(String.fromCharCode(a>>16,a>>8&255));break;case 2:a=r(e,i)<<18|r(e,i+1)<<12,l.push(String.fromCharCode(a>>16))}return l.join("")},n.getbyte=function(e,t){var i=e.charCodeAt(t);if(i>255)throw n.makeDOMException();return i},n.encode=function(e){if(1!==arguments.length)throw new SyntaxError("Not enough arguments");var t,i,a=n.PADCHAR,r=n.ALPHA,o=n.getbyte,l=[];e=""+e;var c=e.length-e.length%3;if(0===e.length)return e;for(t=0;t<c;t+=3)i=o(e,t)<<16|o(e,t+1)<<8|o(e,t+2),l.push(r.charAt(i>>18)),l.push(r.charAt(i>>12&63)),l.push(r.charAt(i>>6&63)),l.push(r.charAt(63&i));switch(e.length-c){case 1:i=o(e,t)<<16,l.push(r.charAt(i>>18)+r.charAt(i>>12&63)+a+a);break;case 2:i=o(e,t)<<16|o(e,t+1)<<8,l.push(r.charAt(i>>18)+r.charAt(i>>12&63)+r.charAt(i>>6&63)+a)}return l.join("")},t.url="pay.htm",t.pay=function(e){var r=encodeURIComponent(n.encode(e));a.call(i,"APURL")&&(t.url=i.APURL),location.href=t.url+"?goto="+r},t.decode=function(e){return n.decode(decodeURIComponent(e))},e.exports=t}()},102:function(e,t,n){var i=n(64);e.exports={handleCharge:function(e){i.handleCharge(e)}}},103:function(e,t,n){var i=n(64);e.exports={handleCharge:function(e){i.handleCharge(e)}}},104:function(e,t,n){var i=n(64),a=n(26),r=n(25),o={}.hasOwnProperty;e.exports={handleCharge:function(e){var t=e.extra;if(!o.call(t,"pay_channel"))return void a.innerCallback("fail",a.error("invalid_charge","charge 格式不正确"));var n=t.pay_channel;return"wx"!==n||r.inWeixin()?"alipay"!==n||r.inAlipay()?void i.handleCharge(e):void a.innerCallback("fail",a.error("Not in the Alipay browser")):void a.innerCallback("fail",a.error("Not in the WeChat browser"))}}},105:function(e,t,n){var i=n(25),a={}.hasOwnProperty;e.exports={JDPAY_WAP_URL_OLD:"https://m.jdpay.com/wepay/web/pay",JDPAY_H5_URL:"https://h5pay.jd.com/jdpay/saveOrder",JDPAY_PC_URL:"https://wepay.jd.com/jdpay/saveOrder",handleCharge:function(e){var t=e.credential[e.channel],n=this.JDPAY_H5_URL;a.call(t,"channelUrl")?(n=t.channelUrl,delete t.channelUrl):a.call(t,"merchantRemark")&&(n=this.JDPAY_WAP_URL_OLD),i.formSubmit(n,"post",t)}}},106:function(e,t,n){var i=n(26),a=n(25),r=n(29),o={}.hasOwnProperty;e.exports={SRC_URL:"https://open.mobile.qq.com/sdk/qqapi.js?_bid=152",ID:"mqq_api",handleCharge:function(e){var t=e.credential[e.channel];if(!o.call(t,"token_id"))return void i.innerCallback("fail",i.error("invalid_credential","missing_token_id"));r.tokenId=t.token_id,a.loadUrlJs(this.ID,this.SRC_URL,this.callpay)},callpay:function(){if("undefined"!=typeof mqq){if(0==mqq.QQVersion)return i.innerCallback("fail",i.error("Not in the QQ client")),void delete r.tokenId;mqq.tenpay.pay({tokenId:r.tokenId},function(e){0==e.resultCode?i.innerCallback("success"):i.innerCallback("fail",i.error(e.retmsg))})}else i.innerCallback("fail",i.error("network_err"));delete r.tokenId}}},107:function(e,t,n){var i=n(25);e.exports={UPACP_PC_URL:"https://gateway.95516.com/gateway/api/frontTransReq.do",handleCharge:function(e){var t=e.credential[e.channel];i.formSubmit(this.UPACP_PC_URL,"post",t)}}},108:function(e,t,n){var i=n(25);e.exports={UPACP_WAP_URL:"https://gateway.95516.com/gateway/api/frontTransReq.do",handleCharge:function(e){var t=e.credential[e.channel];i.formSubmit(this.UPACP_WAP_URL,"post",t)}}},109:function(e,t,n){var i=n(29),a=n(26),r={}.hasOwnProperty;e.exports={handleCharge:function(e){for(var t=e.credential[e.channel],n=["appId","timeStamp","nonceStr","package","signType","paySign"],o=0;o<n.length;o++)if(!r.call(t,n[o]))return void a.innerCallback("fail",a.error("invalid_credential","missing_field_"+n[o]));i.jsApiParameters=t,this.callpay()},wxLiteEnabled:function(){return"undefined"!=typeof wx&&wx.requestPayment},callpay:function(){if(!this.wxLiteEnabled())return void console.log("请在微信小程序中打开");var e=i.jsApiParameters;delete e.appId,e.complete=function(e){"requestPayment:ok"===e.errMsg&&a.innerCallback("success"),"requestPayment:cancel"===e.errMsg&&a.innerCallback("cancel",a.error("用户取消支付")),"undefined"!==e.err_code&&"undefined"!==e.err_desc&&a.innerCallback("fail",a.error(e.err_desc,e))},wx.requestPayment(e)},runTestMode:function(e){wx.showModal({title:"提示",content:'因 "微信小程序" 限制 域名的原因 暂不支持 模拟付款 请使用 livekey 获取 charge 进行支付'})}}},110:function(e,t,n){var i=n(26),a=n(25),r=n(29),o=n(65),l={}.hasOwnProperty;e.exports={PINGPP_NOTIFY_URL_BASE:"https://notify.pingxx.com/notify",handleCharge:function(e){for(var t=e.credential[e.channel],n=["appId","timeStamp","nonceStr","package","signType","paySign"],a=0;a<n.length;a++)if(!l.call(t,n[a]))return void i.innerCallback("fail",i.error("invalid_credential","missing_field_"+n[a]));r.jsApiParameters=t,this.callpay()},callpay:function(){var e=this,t=o.getExtraModule("wx_jssdk");if(void 0!==t&&t.jssdkEnabled())t.callpay();else if("undefined"==typeof WeixinJSBridge){var n=function(){e.jsApiCall()};document.addEventListener?document.addEventListener("WeixinJSBridgeReady",n,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",n),document.attachEvent("onWeixinJSBridgeReady",n))}else this.jsApiCall()},jsApiCall:function(){l.call(r,"jsApiParameters")&&WeixinJSBridge.invoke("getBrandWCPayRequest",r.jsApiParameters,function(e){delete r.jsApiParameters,"get_brand_wcpay_request:ok"==e.err_msg?i.innerCallback("success"):"get_brand_wcpay_request:cancel"==e.err_msg?i.innerCallback("cancel"):i.innerCallback("fail",i.error("wx_result_fail",e.err_msg))})},runTestMode:function(e){if(confirm("模拟付款？")){var t="/charges/"+e.id;a.request(this.PINGPP_NOTIFY_URL_BASE+t+"?livemode=false","GET",null,function(e,t){if(t>=200&&t<400&&"success"==e)i.innerCallback("success");else{var n="http_code:"+t+";response:"+e;i.innerCallback("fail",i.error("testmode_notify_fail",n))}},function(){i.innerCallback("fail",i.error("network_err"))})}}}},111:function(e,t,n){var i=n(25),a=n(26),r={}.hasOwnProperty;e.exports={handleCharge:function(e){var t=e.credential[e.channel];"string"==typeof t?i.redirectTo(t):"object"==typeof t&&r.call(t,"url")?i.redirectTo(t.url):a.innerCallback("fail",a.error("invalid_credential","credential 格式不正确"))}}},112:function(e,t,n){var i=n(25),a=n(26),r={}.hasOwnProperty;e.exports={YEEPAY_WAP_URL:"https://ok.yeepay.com/paymobile/api/pay/request",YEEPAY_WAP_TEST_URL:"http://mobiletest.yeepay.com/paymobile/api/pay/request",handleCharge:function(e){for(var t=e.channel,n=e.credential[t],o=["merchantaccount","encryptkey","data"],l=0;l<o.length;l++)if(!r.call(n,o[l]))return void a.innerCallback("fail",a.error("invalid_credential","missing_field_"+o[l]));var c;c=r.call(n,"mode")&&"test"==n.mode?this.YEEPAY_WAP_TEST_URL:this.YEEPAY_WAP_URL,i.redirectTo(c+"?"+i.stringifyData(n,t,!0))}}},113:function(e,t,n){var i=n(29),a=n(25),r=n(81);e.exports={SRC_URL:"https://cookie.pingxx.com",init:function(){var e=this;a.documentReady(function(){try{e.initPuid()}catch(e){}})},initPuid:function(){if("undefined"!=typeof window&&"undefined"!=typeof localStorage&&null!==localStorage){var e=localStorage.getItem("pingpp_uid");if(null===e){e=a.randomString();try{localStorage.setItem("pingpp_uid",e)}catch(e){}}if(i.puid=e,!document.getElementById("p_analyse_iframe")){var t;try{t=document.createElement("iframe")}catch(e){t=document.createElement('<iframe name="ifr"></iframe>')}t.id="p_analyse_iframe",t.src=this.SRC_URL+"/?puid="+e,t.style.display="none",document.body.appendChild(t)}setTimeout(function(){r.send()},0)}}}},114:function(e,t){!function(){function t(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function n(e,t){return e<<t|e>>>32-t}function i(e,i,a,r,o,l){return t(n(t(t(i,e),t(r,l)),o),a)}function a(e,t,n,a,r,o,l){return i(t&n|~t&a,e,t,r,o,l)}function r(e,t,n,a,r,o,l){return i(t&a|n&~a,e,t,r,o,l)}function o(e,t,n,a,r,o,l){return i(t^n^a,e,t,r,o,l)}function l(e,t,n,a,r,o,l){return i(n^(t|~a),e,t,r,o,l)}function c(e,n){e[n>>5]|=128<<n%32,e[14+(n+64>>>9<<4)]=n;var i,c,s,d,p,f=1732584193,u=-271733879,A=-1732584194,h=271733878;for(i=0;i<e.length;i+=16)c=f,s=u,d=A,p=h,f=a(f,u,A,h,e[i],7,-680876936),h=a(h,f,u,A,e[i+1],12,-389564586),A=a(A,h,f,u,e[i+2],17,606105819),u=a(u,A,h,f,e[i+3],22,-1044525330),f=a(f,u,A,h,e[i+4],7,-176418897),h=a(h,f,u,A,e[i+5],12,1200080426),A=a(A,h,f,u,e[i+6],17,-1473231341),u=a(u,A,h,f,e[i+7],22,-45705983),f=a(f,u,A,h,e[i+8],7,1770035416),h=a(h,f,u,A,e[i+9],12,-1958414417),A=a(A,h,f,u,e[i+10],17,-42063),u=a(u,A,h,f,e[i+11],22,-1990404162),f=a(f,u,A,h,e[i+12],7,1804603682),h=a(h,f,u,A,e[i+13],12,-40341101),A=a(A,h,f,u,e[i+14],17,-1502002290),u=a(u,A,h,f,e[i+15],22,1236535329),f=r(f,u,A,h,e[i+1],5,-165796510),h=r(h,f,u,A,e[i+6],9,-1069501632),A=r(A,h,f,u,e[i+11],14,643717713),u=r(u,A,h,f,e[i],20,-373897302),f=r(f,u,A,h,e[i+5],5,-701558691),h=r(h,f,u,A,e[i+10],9,38016083),A=r(A,h,f,u,e[i+15],14,-660478335),u=r(u,A,h,f,e[i+4],20,-405537848),f=r(f,u,A,h,e[i+9],5,568446438),h=r(h,f,u,A,e[i+14],9,-1019803690),A=r(A,h,f,u,e[i+3],14,-187363961),u=r(u,A,h,f,e[i+8],20,1163531501),f=r(f,u,A,h,e[i+13],5,-1444681467),h=r(h,f,u,A,e[i+2],9,-51403784),A=r(A,h,f,u,e[i+7],14,1735328473),u=r(u,A,h,f,e[i+12],20,-1926607734),f=o(f,u,A,h,e[i+5],4,-378558),h=o(h,f,u,A,e[i+8],11,-2022574463),A=o(A,h,f,u,e[i+11],16,1839030562),u=o(u,A,h,f,e[i+14],23,-35309556),f=o(f,u,A,h,e[i+1],4,-1530992060),h=o(h,f,u,A,e[i+4],11,1272893353),A=o(A,h,f,u,e[i+7],16,-155497632),u=o(u,A,h,f,e[i+10],23,-1094730640),f=o(f,u,A,h,e[i+13],4,681279174),h=o(h,f,u,A,e[i],11,-358537222),A=o(A,h,f,u,e[i+3],16,-722521979),u=o(u,A,h,f,e[i+6],23,76029189),f=o(f,u,A,h,e[i+9],4,-640364487),h=o(h,f,u,A,e[i+12],11,-421815835),A=o(A,h,f,u,e[i+15],16,530742520),u=o(u,A,h,f,e[i+2],23,-995338651),f=l(f,u,A,h,e[i],6,-198630844),h=l(h,f,u,A,e[i+7],10,1126891415),A=l(A,h,f,u,e[i+14],15,-1416354905),u=l(u,A,h,f,e[i+5],21,-57434055),f=l(f,u,A,h,e[i+12],6,1700485571),h=l(h,f,u,A,e[i+3],10,-1894986606),A=l(A,h,f,u,e[i+10],15,-1051523),u=l(u,A,h,f,e[i+1],21,-2054922799),f=l(f,u,A,h,e[i+8],6,1873313359),h=l(h,f,u,A,e[i+15],10,-30611744),A=l(A,h,f,u,e[i+6],15,-1560198380),u=l(u,A,h,f,e[i+13],21,1309151649),f=l(f,u,A,h,e[i+4],6,-145523070),h=l(h,f,u,A,e[i+11],10,-1120210379),A=l(A,h,f,u,e[i+2],15,718787259),u=l(u,A,h,f,e[i+9],21,-343485551),f=t(f,c),u=t(u,s),A=t(A,d),h=t(h,p);return[f,u,A,h]}function s(e){var t,n="";for(t=0;t<32*e.length;t+=8)n+=String.fromCharCode(e[t>>5]>>>t%32&255);return n}function d(e){var t,n=[];for(n[(e.length>>2)-1]=void 0,t=0;t<n.length;t+=1)n[t]=0;for(t=0;t<8*e.length;t+=8)n[t>>5]|=(255&e.charCodeAt(t/8))<<t%32;return n}function p(e){return s(c(d(e),8*e.length))}function f(e,t){var n,i,a=d(e),r=[],o=[];for(r[15]=o[15]=void 0,a.length>16&&(a=c(a,8*e.length)),n=0;n<16;n+=1)r[n]=909522486^a[n],o[n]=1549556828^a[n];return i=c(r.concat(d(t)),512+8*t.length),s(c(o.concat(i),640))}function u(e){var t,n,i="0123456789abcdef",a="";for(n=0;n<e.length;n+=1)t=e.charCodeAt(n),a+=i.charAt(t>>>4&15)+i.charAt(15&t);return a}function A(e){return unescape(encodeURIComponent(e))}function h(e){return p(A(e))}function v(e){return u(h(e))}function y(e,t){return f(A(e),A(t))}function g(e,t){return u(y(e,t))}function C(e,t,n){return t?n?y(t,e):g(t,e):n?h(e):v(e)}e.exports=C}()},115:function(e,t,n){var i=n(117).v,a=n(116),r=n(26),o=n(65),l=n(29),c=n(81),s=n(82),d={}.hasOwnProperty,p=function(){n(113).init()};p.prototype={version:i,createPayment:function(e,t,n,i){if("function"==typeof t&&(r.userCallback=t),s.init(e),!d.call(s,"id"))return void r.innerCallback("fail",r.error("invalid_charge","no_charge_id"));if(!d.call(s,"channel"))return void r.innerCallback("fail",r.error("invalid_charge","no_channel"));d.call(s,"app")&&("string"==typeof s.app?l.app_id=s.app:"object"==typeof s.app&&"string"==typeof s.app.id&&(l.app_id=s.app.id)),c.report({type:"pure_sdk_click",channel:s.channel,ch_id:s.id});var p=s.channel;if(!d.call(s,"credential"))return void r.innerCallback("fail",r.error("invalid_charge","no_credential"));if(!s.credential)return void r.innerCallback("fail",r.error("invalid_credential","credential_is_undefined"));if(!d.call(s.credential,p))return void r.innerCallback("fail",r.error("invalid_credential","credential_is_incorrect"));if(!d.call(s,"livemode"))return void r.innerCallback("fail",r.error("invalid_charge","no_livemode_field"));var f=o.getChannelModule(p);return void 0===f?(console.error('channel module "'+p+'" is undefined'),void r.innerCallback("fail",r.error("invalid_channel",'channel module "'+p+'" is undefined'))):!1===s.livemode?void(d.call(f,"runTestMode")?f.runTestMode(s):a.runTestMode(s)):(void 0!==n&&(l.signature=n),"boolean"==typeof i&&(l.debug=i),void f.handleCharge(s))},setAPURL:function(e){l.APURL=e}},e.exports=new p},116:function(e,t,n){var i=n(25),a={}.hasOwnProperty;e.exports={PINGPP_MOCK_URL:"http://sissi.pingxx.com/mock.php",runTestMode:function(e){var t={ch_id:e.id,scheme:"http",channel:e.channel};a.call(e,"order_no")?t.order_no=e.order_no:a.call(e,"orderNo")&&(t.order_no=e.orderNo),a.call(e,"time_expire")?t.time_expire=e.time_expire:a.call(e,"timeExpire")&&(t.time_expire=e.timeExpire),a.call(e,"extra")&&(t.extra=encodeURIComponent(JSON.stringify(e.extra))),i.redirectTo(this.PINGPP_MOCK_URL+"?"+i.stringifyData(t))}}},117:function(e,t){e.exports={v:"2.1.15"}},126:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(115),a=n.n(i);t.default={data:function(){return{type:[{name:"支付宝",icon:"./static/css/alipay@2x.png",selected:!0},{name:"公对公",icon:"./static/css/card@2x.png",selected:!1}],payinfo:{money:0},project_id:null,cashflow:null}},created:function(){this.project_id=this.$route.query.project_id,this.cashflow=this.$route.query.cashflow,this.project_id&&this.cashflow?this.getpayinfo():this.$router.push("/")},methods:{setmoney:function(e){return e.toFixed(2)+" 元"},choose:function(e){this.type[e].selected||this.type.forEach(function(t,n){t.selected=!1,e===n&&(t.selected=!0)})},getpayinfo:function(){var e=this;ajax({url:"https://www.houxiaopang.com/api/v1.1/getclientrecord",data:{project_id:this.project_id,cashflow:this.cashflow},token:!0,success:function(t){0===t.code?e.payinfo=t.data:alert("网络拥挤，请稍后再试。")},error:function(){alert("网络拥挤，请稍后再试。")}})},pay:function(){var e=0;this.type[1].selected&&(e=1),0===e?this.alipay():1===e&&this.$router.push("/prompt")},alipay:function(){var e=this;ajax({url:"https://www.houxiaopang.com/api/v1.1/getalipaycharge",type:"post",data:{money:e.payinfo.money,channel:"alipay_wap",subject:e.payinfo.title,body:e.payinfo.feetype+" "+e.payinfo.desc},token:!0,success:function(e){0===e.code?a.a.createPayment(e.data.charge,function(e,t){"success"==e?console.log(t):"fail"==e?console.log(t):"cancel"==e&&console.log(t)}):alert("网络拥挤，请稍后再试。")},error:function(){alert("网络拥挤，请稍后再试。")}})}}}},14:function(e,t,n){n(206);var i=n(4)(n(126),n(244),"data-v-685f47ce",null);e.exports=i.exports},188:function(e,t,n){t=e.exports=n(23)(),t.push([e.i,".warp[data-v-685f47ce]{padding:20px 0;min-height:100%;background:#fff;position:relative;-webkit-box-align:center;-webkit-align-items:center;align-items:center;overflow-y:auto;font-size:16px}.content[data-v-685f47ce],.warp[data-v-685f47ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.content[data-v-685f47ce]{width:300px}.desc_title[data-v-685f47ce]{font-size:16px;height:40px}.cell[data-v-685f47ce],.desc_title[data-v-685f47ce]{-webkit-box-align:center;-webkit-align-items:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:flex}.cell[data-v-685f47ce]{padding:5px 0}.l[data-v-685f47ce]{width:90px;-webkit-flex-shrink:0;flex-shrink:0;font-size:16px;-webkit-align-self:flex-start;align-self:flex-start}.r[data-v-685f47ce]{width:100%;-webkit-flex-shrink:1;flex-shrink:1;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.btn[data-v-685f47ce],.r[data-v-685f47ce]{display:-webkit-box;display:-webkit-flex;display:flex;font-size:16px}.btn[data-v-685f47ce]{width:120px;height:40px;margin-top:30px;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;border-radius:25px;color:#fff;background:#ff445b}.listwarp[data-v-685f47ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.listwarp>.item[data-v-685f47ce]:first-child{margin-top:0}.item[data-v-685f47ce]{margin-top:10px;height:50px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border:1px solid #d9d9d9;padding:0 15px;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.active[data-v-685f47ce]{border:1px solid #2570ff}","",{version:3,sources:["C:/vue/mobile/src/components/Receipt.vue"],names:[],mappings:"AACA,uBACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAiB,AACjB,kBAAmB,AAQnB,yBAA0B,AAC1B,2BAA4B,AACpB,mBAAoB,AAC5B,gBAAiB,AACjB,cAAgB,CACjB,AACD,iDAbE,oBAAqB,AACrB,qBAAsB,AACtB,aAAc,AACd,4BAA6B,AAC7B,6BAA8B,AAC9B,8BAA+B,AACvB,qBAAuB,CAgBhC,AATD,0BACE,WAAa,CAQd,AACD,6BACE,eAAgB,AAChB,WAAa,CAOd,AACD,oDAPE,yBAA0B,AAC1B,2BAA4B,AACpB,mBAAoB,AAC5B,oBAAqB,AACrB,qBAAsB,AACtB,YAAc,CAUf,AARD,uBAOE,aAAe,CAChB,AACD,oBACE,WAAY,AACZ,sBAAuB,AACf,cAAe,AACvB,eAAgB,AAChB,8BAA+B,AACvB,qBAAuB,CAChC,AACD,oBACE,WAAY,AACZ,sBAAuB,AACf,cAAe,AAIvB,yBAA0B,AAC1B,sCAAuC,AAC/B,6BAA+B,CAExC,AACD,0CARE,oBAAqB,AACrB,qBAAsB,AACtB,aAAc,AAId,cAAgB,CAmBjB,AAjBD,sBAEE,YAAa,AACb,YAAa,AAIb,gBAAiB,AACjB,yBAA0B,AAC1B,2BAA4B,AACpB,mBAAoB,AAC5B,wBAAyB,AACzB,+BAAgC,AACxB,uBAAwB,AAChC,mBAAoB,AACpB,WAAY,AACZ,kBAAoB,CACrB,AACD,2BACE,oBAAqB,AACrB,qBAAsB,AACtB,aAAc,AACd,4BAA6B,AAC7B,6BAA8B,AAC9B,8BAA+B,AACvB,qBAAuB,CAChC,AACD,6CACE,YAAc,CACf,AACD,uBACE,gBAAiB,AACjB,YAAa,AACb,oBAAqB,AACrB,qBAAsB,AACtB,aAAc,AACd,yBAA0B,AAC1B,2BAA4B,AACpB,mBAAoB,AAC5B,yBAA0B,AAC1B,eAAgB,AAChB,yBAA0B,AAC1B,sCAAuC,AAC/B,6BAA+B,CACxC,AACD,yBACE,wBAA0B,CAC3B",file:"Receipt.vue",sourcesContent:["\n.warp[data-v-685f47ce] {\n  padding: 20px 0;\n  min-height: 100%;\n  background: #fff;\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  overflow-y: auto;\n  font-size: 16px;\n}\n.content[data-v-685f47ce] {\n  width: 300px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n}\n.desc_title[data-v-685f47ce] {\n  font-size: 16px;\n  height: 40px;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n}\n.cell[data-v-685f47ce] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  padding: 5px 0;\n}\n.l[data-v-685f47ce] {\n  width: 90px;\n  -webkit-flex-shrink: 0;\n          flex-shrink: 0;\n  font-size: 16px;\n  -webkit-align-self: flex-start;\n          align-self: flex-start;\n}\n.r[data-v-685f47ce] {\n  width: 100%;\n  -webkit-flex-shrink: 1;\n          flex-shrink: 1;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n  font-size: 16px;\n}\n.btn[data-v-685f47ce] {\n  font-size: 16px;\n  width: 120px;\n  height: 40px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  margin-top: 30px;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  border-radius: 25px;\n  color: #fff;\n  background: #ff445b;\n}\n.listwarp[data-v-685f47ce] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n}\n.listwarp > .item[data-v-685f47ce]:first-child {\n  margin-top: 0;\n}\n.item[data-v-685f47ce] {\n  margin-top: 10px;\n  height: 50px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  border: 1px solid #d9d9d9;\n  padding: 0 15px;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n}\n.active[data-v-685f47ce] {\n  border: 1px solid #2570ff;\n}\n"],sourceRoot:""}])},206:function(e,t,n){var i=n(188);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(24)("0e844714",i,!0)},229:function(e,t){e.exports="data:image/png;base64,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"},244:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"warp"},[i("div",{staticClass:"content"},[i("div",{staticClass:"cell"},[i("div",{staticClass:"l"},[e._v("项目名称：")]),e._v(" "),i("div",{staticClass:"r"},[e._v(e._s(e.payinfo.title))])]),e._v(" "),i("div",{staticClass:"cell"},[i("div",{staticClass:"l"},[e._v("设 计 师：")]),e._v(" "),i("div",{staticClass:"r"},[e._v(e._s(e.payinfo.designer))])]),e._v(" "),i("div",{staticClass:"cell"},[i("div",{staticClass:"l"},[e._v("费用类型：")]),e._v(" "),i("div",{staticClass:"r"},[e._v(e._s(e.payinfo.feetype))])]),e._v(" "),i("div",{staticClass:"cell"},[i("div",{staticClass:"l"},[e._v("费　　用：")]),e._v(" "),i("div",{staticClass:"r"},[e._v(e._s(e.setmoney(e.payinfo.money)))])]),e._v(" "),i("div",{staticClass:"cell"},[i("div",{staticClass:"l"},[e._v("备　　注：")]),e._v(" "),i("div",{staticClass:"r"},[e._v(e._s(e.payinfo.desc||"未填写"))])]),e._v(" "),i("div",{staticClass:"cell",staticStyle:{"justify-content":"space-between"}},[i("router-link",{staticClass:"l",staticStyle:{width:"auto",color:"#2570ff","font-size":"14px"},attrs:{to:{name:"projectdetail",params:{id:e.project_id}},tag:"div"}},[e._v("项目详情＞\n      ")]),e._v(" "),i("router-link",{staticClass:"r",staticStyle:{width:"auto",color:"#2570ff","font-size":"14px"},attrs:{to:{name:"user",query:{id:e.payinfo.designer_id}},tag:"div"}},[e._v("设计师详情＞\n      ")])],1),e._v(" "),i("div",{staticClass:"desc_title"},[e._v("支付方式：")]),e._v(" "),i("div",{staticClass:"listwarp"},e._l(e.type,function(t,a){return i("div",{staticClass:"item",class:{active:t.selected},on:{click:function(t){e.choose(a)}}},[i("div",{staticStyle:{height:"100%",display:"flex","align-items":"center"}},[i("img",{staticStyle:{width:"30px"},attrs:{src:t.icon,alt:""}}),e._v("　"+e._s(t.name)+"\n        ")]),e._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:t.selected,expression:"item.selected"}],staticStyle:{width:"22px"},attrs:{src:n(229),alt:""}})])}))]),e._v(" "),i("div",{staticClass:"btn",on:{click:e.pay}},[e._v("去支付")])])},staticRenderFns:[]}},25:function(e,t){var n={}.hasOwnProperty,i=e.exports={stringifyData:function(e,t,i){void 0===i&&(i=!1);var a=[];for(var r in e)n.call(e,r)&&"function"!=typeof e[r]&&("bfb_wap"==t&&"url"==r||"yeepay_wap"==t&&"mode"==r||"channel_url"!=r&&a.push(r+"="+(i?encodeURIComponent(e[r]):e[r])));return a.join("&")},request:function(e,t,a,r,o,l){if("undefined"==typeof XMLHttpRequest)return void console.log("Function XMLHttpRequest is undefined.");var c=new XMLHttpRequest;if(void 0!==c.timeout&&(c.timeout=6e3),t=t.toUpperCase(),"GET"===t&&"object"==typeof a&&a&&(e+="?"+i.stringifyData(a,"",!0)),c.open(t,e,!0),void 0!==l)for(var s in l)n.call(l,s)&&c.setRequestHeader(s,l[s]);"POST"===t?(c.setRequestHeader("Content-type","application/json; charset=utf-8"),c.send(JSON.stringify(a))):c.send(),void 0===r&&(r=function(){}),void 0===o&&(o=function(){}),c.onreadystatechange=function(){4==c.readyState&&r(c.responseText,c.status,c)},c.onerror=function(e){o(c,0,e)}},formSubmit:function(e,t,i){if("undefined"==typeof window)return void console.log("Not a browser, form submit url: "+e);var a=document.createElement("form");a.setAttribute("method",t),a.setAttribute("action",e);for(var r in i)if(n.call(i,r)){var o=document.createElement("input");o.setAttribute("type","hidden"),o.setAttribute("name",r),o.setAttribute("value",i[r]),a.appendChild(o)}document.body.appendChild(a),a.submit()},randomString:function(e){void 0===e&&(e=32);for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=t.length,i="",a=0;a<e;a++)i+=t.charAt(Math.floor(Math.random()*n));return i},redirectTo:function(e){if("undefined"==typeof window)return void console.log("Not a browser, redirect url: "+e);window.location.href=e},inWeixin:function(){return"undefined"!=typeof navigator&&-1!==navigator.userAgent.toLowerCase().indexOf("micromessenger")},inAlipay:function(){return"undefined"!=typeof navigator&&-1!==navigator.userAgent.toLowerCase().indexOf("alipayclient")},documentReady:function(e){if("undefined"==typeof document)return void e();"loading"!=document.readyState?e():document.addEventListener("DOMContentLoaded",e)},loadUrlJs:function(e,t,n){var i=document.getElementsByTagName("head")[0],a=null;null==document.getElementById(e)?(a=document.createElement("script"),a.setAttribute("type","text/javascript"),a.setAttribute("src",t),a.setAttribute("id",e),a.async=!0,null!=n&&(a.onload=a.onreadystatechange=function(){if(a.ready)return!1;a.readyState&&"loaded"!=a.readyState&&"complete"!=a.readyState||(a.ready=!0,n())}),i.appendChild(a)):null!=n&&n()}}},26:function(e,t,n){var i=n(82);e.exports={userCallback:void 0,innerCallback:function(e,t){"function"==typeof this.userCallback&&(void 0===t&&(t=this.error()),this.userCallback(e,t),this.userCallback=void 0,i.clear())},error:function(e,t){return e=void 0===e?"":e,t=void 0===t?"":t,{msg:e,extra:t}}}},29:function(e,t){e.exports={}},64:function(e,t,n){var i=n(25),a=n(26),r={}.hasOwnProperty;e.exports={handleCharge:function(e){var t,n=e.credential[e.channel];if("string"==typeof n)t=n;else{if(!r.call(n,"url"))return void a.innerCallback("fail",a.error("invalid_credential","credential format is incorrect"));t=n.url}i.redirectTo(t)}}},65:function(e,t,n){var i={}.hasOwnProperty,a={};e.exports=a,a.channels={alipay_pc_direct:n(95),alipay_qr:n(96),alipay_wap:n(97),bfb_wap:n(98),cmb_wallet:n(99),cp_b2b:n(100),fqlpay_qr:n(102),fqlpay_wap:n(103),isv_wap:n(104),jdpay_wap:n(105),qpay_pub:n(106),upacp_pc:n(107),upacp_wap:n(108),wx_lite:n(109),wx_pub:n(110),wx_wap:n(111),yeepay_wap:n(112)},a.extras={ap:n(101)},a.getChannelModule=function(e){if(i.call(a.channels,e))return a.channels[e]},a.getExtraModule=function(e){if(i.call(a.extras,e))return a.extras[e]}},81:function(e,t,n){var i=n(25),a=n(29),r=n(114),o={seperator:"###",limit:1,report_url:"https://statistics.pingxx.com/one_stats",timeout:100},l=function(e,t){var n=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),i=e.substr(0).match(n);return null!==i?unescape(i[2]):null},c=function(){return navigator.userAgent},s=function(){return window.location.host};o.store=function(e){if("undefined"!=typeof localStorage&&null!==localStorage){var t=this,n={};n.app_id=e.app_id||a.app_id||"app_not_defined",n.ch_id=e.ch_id||"",n.channel=e.channel||"",n.type=e.type||"",n.user_agent=c(),n.host=s(),n.time=(new Date).getTime(),n.puid=a.puid;var i="app_id="+n.app_id+"&channel="+n.channel+"&ch_id="+n.ch_id+"&host="+n.host+"&time="+n.time+"&type="+n.type+"&user_agent="+n.user_agent+"&puid="+n.puid,r=i;null!==localStorage.getItem("PPP_ONE_STATS")&&0!==localStorage.getItem("PPP_ONE_STATS").length&&(r=localStorage.getItem("PPP_ONE_STATS")+t.seperator+i);try{localStorage.setItem("PPP_ONE_STATS",r)}catch(e){}}},o.send=function(){if("undefined"!=typeof localStorage&&null!==localStorage){var e=this,t=localStorage.getItem("PPP_ONE_STATS");if(!(null===t||t.split(e.seperator).length<e.limit))try{for(var n=[],a=t.split(e.seperator),o=r(a.join("&")),c=0;c<a.length;c++)n.push({app_id:l(a[c],"app_id"),channel:l(a[c],"channel"),ch_id:l(a[c],"ch_id"),host:l(a[c],"host"),time:l(a[c],"time"),type:l(a[c],"type"),user_agent:l(a[c],"user_agent"),puid:l(a[c],"puid")});i.request(e.report_url,"POST",n,function(e,t){200==t&&localStorage.removeItem("PPP_ONE_STATS")},void 0,{"X-Pingpp-Report-Token":o})}catch(e){}}},o.report=function(e){var t=this;t.store(e),setTimeout(function(){t.send()},t.timeout)},e.exports=o},82:function(e,t,n){var i=n(26),a={}.hasOwnProperty;e.exports={id:null,or_id:null,channel:null,app:null,credential:{},extra:null,livemode:null,order_no:null,time_expire:null,init:function(e){var t;if("string"==typeof e)try{t=JSON.parse(e)}catch(e){return void i.innerCallback("fail",i.error("json_decode_fail",e))}else t=e;if(void 0===t)return void i.innerCallback("fail",i.error("json_decode_fail"));if(a.call(t,"object")&&"order"==t.object){t.or_id=t.id,t.order_no=t.merchant_order_no;var n=t.charge_essentials;if(t.channel=n.channel,t.credential=n.credential,t.extra=n.extra,a.call(t,"charge")&&null!=t.charge)t.id=t.charge;else if(a.call(n,"id")&&null!=n.id)t.id=n.id;else if(a.call(t,"charges"))for(var r=0;r<t.charges.data.length;r++)if(t.charges.data[r].channel===n.channel){t.id=t.charges.data[r].id;break}}else a.call(t,"object")&&"recharge"==t.object&&(t=t.charge);for(var o in this)a.call(t,o)&&(this[o]=t[o]);return this},clear:function(){for(var e in this)"function"!=typeof this[e]&&(this[e]=null)}}},95:function(e,t,n){var i=n(25),a={}.hasOwnProperty;e.exports={ALIPAY_PC_DIRECT_URL:"https://mapi.alipay.com/gateway.do",handleCharge:function(e){var t=e.channel,n=e.credential[t],r=this.ALIPAY_PC_DIRECT_URL;a.call(n,"channel_url")&&(r=n.channel_url),a.call(n,"_input_charset")||a.call(n,"service")&&"create_direct_pay_by_user"===n.service&&(n._input_charset="utf-8");var o=i.stringifyData(n,t,!0);i.redirectTo(r+"?"+o)}}},96:function(e,t,n){var i={}.hasOwnProperty,a=n(26);e.exports={handleCharge:function(e){var t=e.credential[e.channel];i.call(t,"transaction_no")?this.tradePay(t.transaction_no):a.innerCallback("fail",a.error("invalid_credential","missing_field_transaction_no"))},ready:function(e){window.AlipayJSBridge?e&&e():document.addEventListener("AlipayJSBridgeReady",e,!1)},tradePay:function(e){this.ready(function(){AlipayJSBridge.call("tradePay",{tradeNO:e},function(e){"9000"==e.resultCode?a.innerCallback("success"):"6001"==e.resultCode?a.innerCallback("cancel",a.error(e.result)):a.innerCallback("fail",a.error(e.result))})})}}},97:function(e,t,n){var i=n(25),a=n(65),r={}.hasOwnProperty;e.exports={ALIPAY_WAP_URL_OLD:"https://wappaygw.alipay.com/service/rest.htm",ALIPAY_WAP_URL:"https://mapi.alipay.com/gateway.do",handleCharge:function(e){var t=e.channel,n=e.credential[t],o=this.ALIPAY_WAP_URL;r.call(n,"req_data")?o=this.ALIPAY_WAP_URL_OLD:r.call(n,"channel_url")&&(o=n.channel_url),r.call(n,"_input_charset")||(r.call(n,"service")&&"alipay.wap.create.direct.pay.by.user"===n.service||r.call(n,"req_data"))&&(n._input_charset="utf-8");var l=i.stringifyData(n,t,!0),c=o+"?"+l,s=a.getExtraModule("ap");i.inWeixin()&&void 0!==s?s.pay(c):i.redirectTo(c)}}},98:function(e,t,n){var i=n(25),a=n(26),r={}.hasOwnProperty;e.exports={handleCharge:function(e){var t=e.channel,n=e.credential[t];if(!r.call(n,"url"))return void a.innerCallback("fail",a.error("invalid_credential","missing_field:url"));i.redirectTo(n.url+"?"+i.stringifyData(n,t))}}},99:function(e,t,n){var i=n(25),a={}.hasOwnProperty;e.exports={CMB_WALLET_URL:"https://netpay.cmbchina.com/netpayment/BaseHttp.dll?MB_EUserPay",handleCharge:function(e){var t=e.credential[e.channel],n=this.CMB_WALLET_URL;a.call(t,"ChannelUrl")&&(n=t.ChannelUrl,delete t.ChannelUrl),a.call(t,"channelVersion")&&delete t.channelVersion,i.formSubmit(n,"post",t)}}}});
//# sourceMappingURL=1.c5f87ad727b80c893980.js.map