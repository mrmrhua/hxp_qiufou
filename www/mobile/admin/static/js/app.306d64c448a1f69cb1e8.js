webpackJsonp([19],{DICR:function(t,n,e){"use strict";n.a={name:"app",created:function(){code?this.getuid():token?this.authenticated():this.wxlogin()},methods:{wxlogin:function(){location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx35c4ce958bc7eb68&redirect_uri=https%3A%2F%2Fm.houxiaopang.com%2Fadmin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"},authenticated:function(){var t=this;ajax({url:"https://www.houxiaopang.com/api/v1.1/token/authenticated",token:!0,timeout:5e3,success:function(n){0===n.code&&(window.localStorage.applystatus=n.data.applystatus,applystatus=n.data.applystatus,"/"===t.$route.path&&(2===n.data.applystatus?t.$router.push("/main"):t.$router.push("/alert")))},error:function(n){401===n.status?t.wxlogin():(hideload(),showModal("网络拥挤，请稍后再试。"))}})},getuid:function(){ajax({url:"https://www.houxiaopang.com/api/v1.1/wx_getuid",data:{code:code},timeout:5e3,success:function(t){0===t.code?(window.localStorage.token=t.data.token,window.localStorage.applystatus=t.data.applystatus,location.href="https://m.houxiaopang.com/admin"):showModal("登录失败，请重试。"),hideload()},error:function(){hideload(),showModal("登录失败，请重试。")}})}}}},M93x:function(t,n,e){"use strict";function a(t){e("e696")}var o=e("DICR"),i=e("yIhr"),c=e("46Yf"),r=a,u=c(o.a,i.a,!1,r,null,null);n.a=u.exports},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("MVSX"),o=e("M93x"),i=e("YaEn"),c=e("ihwo");a.a.use(c.a),a.a.config.productionTip=!1,new a.a({el:"#app",router:i.a,template:"<App/>",components:{App:o.a}})},YaEn:function(t,n,e){"use strict";var a=e("MVSX"),o=e("zO6J"),i=function(t){return e.e(14).then(function(){var n=[e("9xHA")];t.apply(null,n)}.bind(this)).catch(e.oe)},c=function(t){return e.e(9).then(function(){var n=[e("bjtj")];t.apply(null,n)}.bind(this)).catch(e.oe)},r=function(t){return e.e(4).then(function(){var n=[e("y8p6")];t.apply(null,n)}.bind(this)).catch(e.oe)},u=function(t){return e.e(13).then(function(){var n=[e("42Hy")];t.apply(null,n)}.bind(this)).catch(e.oe)},l=function(t){return e.e(1).then(function(){var n=[e("/GRZ")];t.apply(null,n)}.bind(this)).catch(e.oe)},p=function(t){return e.e(5).then(function(){var n=[e("s6+2")];t.apply(null,n)}.bind(this)).catch(e.oe)},h=function(t){return e.e(12).then(function(){var n=[e("PjrG")];t.apply(null,n)}.bind(this)).catch(e.oe)},s=function(t){return e.e(17).then(function(){var n=[e("yL53")];t.apply(null,n)}.bind(this)).catch(e.oe)},d=function(t){return e.e(2).then(function(){var n=[e("hdVd")];t.apply(null,n)}.bind(this)).catch(e.oe)},f=function(t){return e.e(16).then(function(){var n=[e("uK6g")];t.apply(null,n)}.bind(this)).catch(e.oe)},m=function(t){return e.e(11).then(function(){var n=[e("XAt8")];t.apply(null,n)}.bind(this)).catch(e.oe)},w=function(t){return e.e(10).then(function(){var n=[e("u2zr")];t.apply(null,n)}.bind(this)).catch(e.oe)},v=function(t){return e.e(15).then(function(){var n=[e("JBQC")];t.apply(null,n)}.bind(this)).catch(e.oe)},y=function(t){return e.e(7).then(function(){var n=[e("axvM")];t.apply(null,n)}.bind(this)).catch(e.oe)},g=function(t){return e.e(8).then(function(){var n=[e("ipVl")];t.apply(null,n)}.bind(this)).catch(e.oe)},b=function(t){return e.e(3).then(function(){var n=[e("GYip")];t.apply(null,n)}.bind(this)).catch(e.oe)},x=function(t){return e.e(0).then(function(){var n=[e("Uwzy")];t.apply(null,n)}.bind(this)).catch(e.oe)},k=function(t){return e.e(6).then(function(){var n=[e("rTDK")];t.apply(null,n)}.bind(this)).catch(e.oe)};a.a.use(o.a);var E=new o.a({routes:[{path:"/",name:"index",component:u,meta:{title:"猴小胖设计服务专家"}},{path:"/feedback",name:"feedback",component:g,meta:{title:"意见反馈"}},{path:"/project",name:"project",component:b,meta:{title:"项目管理"}},{path:"/schedule",name:"schedule",component:x,meta:{title:"项目详情"}},{path:"/collect",name:"collect",component:k,meta:{title:"收款申请"}},{path:"/main",name:"main",component:p,meta:{title:"个人中心"}},{path:"/balance",name:"balance",component:d,meta:{title:"账户余额"}},{path:"/balanceinfo",name:"balanceinfo",component:v,meta:{title:"余额明细"}},{path:"/account",name:"account",component:f,meta:{title:"账户管理"}},{path:"/accountedit",name:"accountedit",component:y,meta:{title:"账户管理"}},{path:"/withdraw",name:"withdraw",component:m,meta:{title:"余额提现"}},{path:"/withdrawinfo",name:"withdrawinfo",component:w,meta:{title:"余额提现"}},{path:"/designerInfo",name:"designerInfo",component:i,meta:{title:"我的资料"}},{path:"/worklist",name:"worklist",component:c,meta:{title:"我的作品"}},{path:"/msg",name:"msg",component:r,meta:{title:"我的消息"}},{path:"/msginfo/:idx",name:"msginfo",component:h,meta:{title:"我的消息"}},{path:"/workinfo/:id",name:"workinfo",component:l,meta:{title:"我的作品"}},{path:"/alert",name:"alert",component:s,meta:{title:"猴小胖设计服务专家"}},{path:"/*",redirect:"/"}]});E.beforeEach(function(t,n,e){t.meta.title?document.title=t.meta.title:document.title="猴小胖设计服务专家",e()}),n.a=E},e696:function(t,n){},ihwo:function(t,n,e){"use strict";n.a=function(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1];Array.prototype.remove||(Array.prototype.remove=function(t){if(this.length){var n=this.indexOf(t);return n>-1?(this.splice(n,1),this):void 0}});var n={lazyLoad:!1,default:"http://image.houxiaopang.com/wx/web/load.gif"},e=[],a=[],o=function(t){return a.indexOf(t)>-1},i=function(t,n){var o=t.ele,i=t.src,c=o.parentElement.offsetTop;if("warp"===n.getAttribute("id")&&(c=n.scrollTop),o.offsetTop-c<n.offsetHeight){var r=new Image;return r.src=i,r.onload=function(){o.src=i,a.push(i),e.remove(t)},!0}return!1},c=function(){var t=document.getElementById("worklist")||document.getElementById("warp");t.addEventListener("scroll",function(){for(var n=e.length,a=0;a<n;a++)i(e[a],t)})},r=function(t,a){var r=a.value;if(o(r))return t.src=r,!1;var u={ele:t,src:r};t.src=n.default;var l=document.getElementById("worklist")||document.getElementById("warp");i(u,l)||(e.push(u),c())};t.directive("lazyload",{inserted:r,updated:r})}},yIhr:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},o=[],i={render:a,staticRenderFns:o};n.a=i}},["NHnr"]);
//# sourceMappingURL=app.306d64c448a1f69cb1e8.js.map