webpackJsonp([14],{"7dgN":function(t,o){},NHnr:function(t,o,n){"use strict";function e(t){n("7dgN")}function i(t){n("vSgZ")}function a(t){n("n/LM")}Object.defineProperty(o,"__esModule",{value:!0});var s=n("0tSy"),c=n("3cXf"),r=n.n(c),h={props:["show_option","shownotice"],data:function(){return{nickname:"",headimg:"",city:"",userid:-1,noticenum:0,notice:[]}},watch:{$route:function(){this.getnoticenum()}},mounted:function(){0===this.noticenum&&this.getMsg()},methods:{exit:function(){$.ajax({type:"post",headers:{Authorization:"Token "+token},url:"http://www.houxiaopang.com/api/v1.1/logout",success:function(t){}}),window.localStorage.token="",window.localStorage.applystatus="",window.localStorage.houxiaiopanguser="",location.href="http://houxiaopang.com"},jump:function(){open("http://houxiaopang.com/workdetail/#/user/"+this.userid)},showoptionMethod:function(){this.$emit("showoption")},shownoticeMethod:function(){this.$emit("shownotice"),this.$nextTick(function(){if(this.noticenum>0){var t=this;$.ajax({url:"http://www.houxiaopang.com/api/v1.1/designerdash/notice/clearall",type:"POST",headers:{Authorization:"Token "+token},success:function(o){0===o.code&&(t.noticenum=0,t.$router.push("/Msg"))}})}else this.$router.push("/Msg")})},settime:function(t){return getDateDiff(getDateTimeStamp(t))},getMsg:function(){var t=this;$.ajax({url:"http://www.houxiaopang.com/api/v1.1/designerdash/notice/recent",type:"GET",headers:{Authorization:"Token "+token},success:function(o){if(t.notice=[],0===o.code)for(var n=0,e=o.data.notice.length;n<e;n++)t.notice.push(o.data.notice[n])}})},getnoticenum:function(){var t=this;$.ajax({url:"http://www.houxiaopang.com/api/v1.1/designerdash/notice/unreadnum",type:"GET",headers:{Authorization:"Token "+token},success:function(o){0===o.code&&(t.noticenum=o.data.num,t.noticenum>0&&t.getMsg())}})}},created:function(){var t=this;token&&$.ajax({type:"get",url:"http://www.houxiaopang.com/api/v1.1/token/authenticated",headers:{Authorization:"Token "+token},success:function(o){if(0===o.code){if(window.localStorage.applystatus=o.data.applystatus,2!==o.data.applystatus)return void(location.href="http://www.houxiaopang.com/apply");login=!0,$.ajax({url:"http://www.houxiaopang.com/api/v1.1/designerdash/header",type:"GET",headers:{Authorization:"Token "+token},success:function(o){0===o.code&&(t.nickname=o.data.nickname,t.headimg=o.data.headimg,t.city=o.data.city,t.userid=o.data.userid,t.$emit("userinfo",{nickname:t.nickname,headimg:t.headimg,city:t.city}),window.localStorage.houxiaiopanguser=r()(o.data))}})}},error:function(){location.href="http://houxiaopang.com/qrlogin"}})}},u=function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"nav"},[n("div",{staticClass:"logo",attrs:{onclick:"javascript:location.href='http://houxiaopang.com';"}}),t._v(" "),t._m(0,!1,!1),t._v(" "),n("ul",{staticClass:"userInfo"},[n("li",{staticClass:"msg",staticStyle:{position:"relative"},on:{click:function(o){o.stopPropagation(),t.shownoticeMethod(o)}}},[n("i",{staticClass:"iconfontyyy",staticStyle:{"font-size":"24px",color:"#545a5f"}},[t._v("")]),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.noticenum>0,expression:"noticenum > 0"}],staticClass:"noticenum",domProps:{innerHTML:t._s(t.noticenum)}})]),t._v(" "),n("router-link",{attrs:{tag:"li",to:"/newalbum"}},[n("i",{staticClass:"iconfontyyy",staticStyle:{"font-size":"25px",color:"#545a5f"}},[t._v("")])]),t._v(" "),n("li",{on:{click:function(o){o.stopPropagation(),t.showoptionMethod(o)}}},[n("img",{staticStyle:{width:"40px",height:"40px","border-radius":"50%",display:"block"},attrs:{src:t.headimg,alt:""}}),t._v(" "),n("ul",{directives:[{name:"show",rawName:"v-show",value:t.show_option,expression:"show_option"}],staticClass:"useroption"},[n("router-link",{attrs:{tag:"li",to:"/"}},[t._v("我的作品")]),t._v(" "),n("router-link",{attrs:{tag:"li",to:"/designer"}},[t._v("我的资料")]),t._v(" "),n("li",{on:{click:t.jump}},[t._v("我的简历")]),t._v(" "),n("li",{on:{click:t.exit}},[t._v("退出")])],1)])],1)])},l=[function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("ul",{staticClass:"navinfo"},[n("li",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com';"}},[t._v("首页")]),t._v(" "),n("li",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com/workdetail';"}},[t._v("作品精选")])])}],p={render:u,staticRenderFns:l},d=p,m=n("/Xao"),v=e,w=m(h,d,!1,v,"data-v-070e686c",null),f=w.exports,g=function(){var t=this,o=t.$createElement;t._self._c;return t._m(0,!1,!1)},_=[function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("footer",[n("div",{staticClass:"con"},[n("div",{staticClass:"left"},[n("div",{staticClass:"logo",staticStyle:{float:"none"}}),t._v(" "),n("p",{staticStyle:{"margin-top":"10px","line-height":"40px"}},[t._v("一站式设计服务解决方案")])]),t._v(" "),n("ul",{staticClass:"center"},[n("li",[n("a",{attrs:{href:"http://houxiaopang.com/help/"}},[t._v("客户指南")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://houxiaopang.com/help/aboutus"}},[t._v("关于猴小胖")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://houxiaopang.com/help/designer"}},[t._v("设计师指南")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://houxiaopang.com/help/contact"}},[t._v("联系我们")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://houxiaopang.com/help/faq"}},[t._v("常见问题")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://houxiaopang.com/help/contact"}},[t._v("意见反馈")])])]),t._v(" "),n("div",{staticClass:"right"},[n("p",[t._v("@2017 杭州求否科技有限公司")]),t._v(" "),n("p",[t._v("浙ICP备17006185号")]),t._v(" "),n("p",[n("a",{attrs:{href:"http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602008608"}},[n("img",{staticStyle:{"margin-top":"5px"},attrs:{src:"http://image.houxiaopang.com/beian.png",alt:""}}),n("span",{staticStyle:{color:"#727272","vertical-align":"top"}},[t._v("浙公网安备 33010602008608号")])])])])])])}],y={render:g,staticRenderFns:_},x=y,k=n("/Xao"),b=i,C=k(null,x,!1,b,"data-v-78e1df92",null),M=C.exports,S={components:{myNav:f,foot:M},data:function(){return{nickname:"",headimg:null,city:"",show_option:!1,shownotice:!1,showcategory:!1,show_share:!1}},mounted:function(){var t=this;document.onclick=function(){t.shownotice&&(t.shownotice=!1),t.show_option&&(t.show_option=!1),t.showcategory&&(t.showcategory=!1),t.show_share&&(t.show_share=!1)}},methods:{setcity:function(t){var o=t.split(" ");return o[0]===o[1]?o[0]:o.join("·")},userinfo:function(t){this.nickname=t.nickname,this.headimg=t.headimg,this.city=t.city},showoptionMethod:function(){this.shownotice&&(this.shownotice=!1),this.showcategory&&(this.showcategory=!1),this.show_option=!this.show_option},shownoticeMethod:function(){this.show_option&&(this.show_option=!1),this.showcategory&&(this.showcategory=!1),this.shownotice=!this.shownotice},showcategoryMethod:function(){this.show_option&&(this.show_option=!1),this.shownotice&&(this.shownotice=!1),this.showcategory=!this.showcategory},showShareMethod:function(){this.show_share||(this.show_share=!this.show_share)}}},j=function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"warp",attrs:{id:"box"}},[n("myNav",{attrs:{show_option:t.show_option,shownotice:t.shownotice},on:{userinfo:t.userinfo,shownotice:t.shownoticeMethod,showoption:t.showoptionMethod}}),t._v(" "),n("div",{staticClass:"main"},[n("div",{staticClass:"content_home"},[n("div",{staticClass:"left"},[n("div",{staticClass:"top"},[n("p",[n("img",{staticStyle:{width:"70px","border-radius":"50%"},attrs:{src:t.headimg,alt:""}})]),t._v(" "),n("p",{staticStyle:{color:"#313131"},domProps:{textContent:t._s(t.nickname)}}),t._v(" "),n("p",{staticStyle:{color:"#828282"},domProps:{textContent:t._s(t.setcity(t.city))}})]),t._v(" "),n("div",{staticClass:"bottom"},[n("ul",[n("router-link",{attrs:{tag:"li",to:"/project"}},[t._v("我的作品")]),t._v(" "),n("router-link",{attrs:{tag:"li",to:"/designer"}},[t._v("我的资料")]),t._v(" "),n("router-link",{attrs:{tag:"li",to:"/wxbind"}},[t._v("服务号绑定")]),t._v(" "),n("router-link",{attrs:{tag:"li",to:"/account"}},[t._v("我的账户")]),t._v(" "),n("router-link",{attrs:{tag:"li",to:"/demand"}},[t._v("我的项目")]),t._v(" "),n("router-link",{attrs:{tag:"li",to:"/authentication"}},[t._v("实名认证")])],1)])]),t._v(" "),n("div",{staticClass:"right"},[n("router-view",{attrs:{showcategory:t.showcategory,show_share:t.show_share},on:{showcategory:t.showcategoryMethod,showshare:t.showShareMethod}})],1)])]),t._v(" "),n("foot")],1)},P=[],T={render:j,staticRenderFns:P},z=T,A=n("/Xao"),E=a,N=A(S,z,!1,E,null,null),H=N.exports,I=n("zO6J"),X=function(t){return Promise.all([n.e(0),n.e(1)]).then(function(){var o=[n("++YV")];t.apply(null,o)}.bind(this)).catch(n.oe)},D=function(t){return Promise.all([n.e(0),n.e(8)]).then(function(){var o=[n("wa3q")];t.apply(null,o)}.bind(this)).catch(n.oe)},q=function(t){return Promise.all([n.e(0),n.e(3)]).then(function(){var o=[n("WmDM")];t.apply(null,o)}.bind(this)).catch(n.oe)},F=function(t){return Promise.all([n.e(0),n.e(9)]).then(function(){var o=[n("y8p6")];t.apply(null,o)}.bind(this)).catch(n.oe)},G=function(t){return n.e(6).then(function(){var o=[n("CIaQ")];t.apply(null,o)}.bind(this)).catch(n.oe)},L=function(t){return n.e(12).then(function(){var o=[n("Hy6H")];t.apply(null,o)}.bind(this)).catch(n.oe)},O=function(t){return n.e(4).then(function(){var o=[n("uK6g")];t.apply(null,o)}.bind(this)).catch(n.oe)},R=function(t){return n.e(7).then(function(){var o=[n("XAt8")];t.apply(null,o)}.bind(this)).catch(n.oe)},J=function(t){return n.e(10).then(function(){var o=[n("rt9P")];t.apply(null,o)}.bind(this)).catch(n.oe)},Q=function(t){return Promise.all([n.e(0),n.e(2)]).then(function(){var o=[n("UIg8")];t.apply(null,o)}.bind(this)).catch(n.oe)},V=function(t){return n.e(11).then(function(){var o=[n("+5VY")];t.apply(null,o)}.bind(this)).catch(n.oe)},W=function(t){return n.e(5).then(function(){var o=[n("QWz0")];t.apply(null,o)}.bind(this)).catch(n.oe)};s.a.use(I.a);var Y=new I.a({routes:[{path:"/",redirect:"/project"},{path:"/project",name:"project",component:D},{path:"/wxbind",name:"wxbind",component:G},{path:"/newalbum",name:"newalbum",component:X},{path:"/designer",name:"designer",component:q},{path:"/Msg",name:"Msg",component:F},{path:"/account",component:L,children:[{path:"/",component:O},{path:"withdraw",component:R}]},{path:"/demand",component:V,children:[{path:"/",component:J},{path:"demandinfo",component:Q}]},{path:"/authentication",name:"authentication",component:W},{path:"/*",redirect:"/"}]});s.a.config.productionTip=!1,new s.a({el:"#app",router:Y,template:"<App/>",components:{App:H}})},"n/LM":function(t,o){},vSgZ:function(t,o){}},["NHnr"]);
//# sourceMappingURL=app.10877875d6476509a0c2.js.map