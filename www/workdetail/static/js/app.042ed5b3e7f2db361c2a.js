webpackJsonp([3],[,,function(t,o,n){"use strict";var e=n(1),i=n(18),a=function(t){return n.e(2).then(function(){var o=[n(25)];t.apply(null,o)}.bind(this)).catch(n.oe)},s=function(t){return n.e(0).then(function(){var o=[n(24)];t.apply(null,o)}.bind(this)).catch(n.oe)},c=function(t){return n.e(1).then(function(){var o=[n(23)];t.apply(null,o)}.bind(this)).catch(n.oe)};e.a.use(i.a),o.a=new i.a({routes:[{path:"/",name:"workall",component:s},{path:"/album/:id",name:"project",component:a},{path:"/user/:id",name:"wechat",component:c},{path:"/*",redirect:"/"}]})},function(t,o,n){function e(t){n(10)}var i=n(0)(n(4),n(15),e,null,null);t.exports=i.exports},function(t,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=n(14),i=n.n(e),a=n(13),s=n.n(a);o.default={name:"app",data:function(){return{show_option:!1,shownotice:!1}},components:{mynav:i.a,myfooter:s.a},mounted:function(){var t=this;document.onclick=function(){t.show_option&&(t.show_option=!1),t.shownotice&&(t.shownotice=!1)}},methods:{shownoticeMethod:function(){this.show_option&&(this.show_option=!1),this.shownotice=!0},showoptionMethod:function(){this.shownotice&&(this.shownotice=!1),this.show_option=!0}}}},function(t,o,n){"use strict";function e(t){return Date.parse(t.replace(/-/gi,"/"))}function i(t){var o=(new Date).getTime(),n=o-t,e=n/2592e6,i=n/6048e5,a=n/864e5,s=n/36e5,c=n/6e4,r="刚刚";return e>=1?r=parseInt(e)+"个月前":i>=1?r=parseInt(i)+"周前":a>=1?r=parseInt(a)+"天前":s>=1?r=parseInt(s)+"小时前":c>=1&&(r=parseInt(c)+"分钟前"),r}Object.defineProperty(o,"__esModule",{value:!0});var a=n(7),s=n.n(a);o.default={props:["show_option","shownotice"],data:function(){return{nickname:"",headimg:"",city:"",userid:-1,noticenum:0,notice:[],login:!1,show:!0}},watch:{$route:function(){"/"!=this.$route.path?this.show=!1:this.show=!0,login&&this.getnoticenum()}},mounted:function(){login&&0===this.noticenum&&this.getMsg()},methods:{exit:function(){$.ajax({type:"post",headers:{Authorization:"Token "+token},url:"http://www.houxiaopang.com/api/v1.1/logout",success:function(t){}}),window.localStorage.token="",window.localStorage.applystatus="",window.localStorage.houxiaiopanguser="",location.href="http://houxiaopang.com"},jump:function(){open("http://houxiaopang.com/workdetail/#/user/"+this.userid)},showoptionMethod:function(){this.$emit("showoption")},shownoticeMethod:function(){this.$emit("shownotice"),this.$nextTick(function(){if(this.noticenum>0){var t=this;$.ajax({url:"http://www.houxiaopang.com/api/v1.1/designerdash/notice/clearall",type:"POST",headers:{Authorization:"Token "+token},success:function(o){0===o.code&&(t.noticenum=0,location.href="http://houxiaopang.com/admin/#/Msg")}})}else location.href="http://houxiaopang.com/admin/#/Msg"})},settime:function(t){return i(e(t))},getMsg:function(){var t=this;$.ajax({url:"http://www.houxiaopang.com/api/v1.1/designerdash/notice/recent",type:"GET",headers:{Authorization:"Token "+token},success:function(o){if(t.notice=[],0===o.code)for(var n=0,e=o.data.notice.length;n<e;n++)t.notice.push(o.data.notice[n])}})},getnoticenum:function(){var t=this;$.ajax({url:"http://www.houxiaopang.com/api/v1.1/designerdash/notice/unreadnum",type:"GET",headers:{Authorization:"Token "+token},success:function(o){0===o.code&&(t.noticenum=o.data.num,t.noticenum>0&&t.getMsg())}})}},created:function(){"/"!=this.$route.path?this.show=!1:this.show=!0;var t=this;token&&$.ajax({type:"get",url:"http://www.houxiaopang.com/api/v1.1/token/authenticated",headers:{Authorization:"Token "+token},success:function(o){0===o.code&&(login=!0,t.login=!0,window.localStorage.applystatus=o.data.applystatus,$.ajax({url:"http://www.houxiaopang.com/api/v1.1/designerdash/header",type:"GET",headers:{Authorization:"Token "+token},success:function(o){0===o.code&&(t.nickname=o.data.nickname,t.headimg=o.data.headimg,t.city=o.data.city,t.userid=o.data.userid,t.$emit("userinfo",{nickname:t.nickname,headimg:t.headimg,city:t.city}),window.localStorage.houxiaiopanguser=s()(o.data))}}))}})}}},function(t,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=n(1),i=n(3),a=n.n(i),s=n(2);e.a.config.productionTip=!1,new e.a({el:"#app",router:s.a,template:"<App/>",components:{App:a.a}})},,,,function(t,o){},function(t,o){},function(t,o){},function(t,o,n){function e(t){n(11)}var i=n(0)(null,n(16),e,"data-v-27fd66a3",null);t.exports=i.exports},function(t,o,n){function e(t){n(12)}var i=n(0)(n(5),n(17),e,"data-v-9882576a",null);t.exports=i.exports},function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{attrs:{id:"app"}},[n("mynav",{attrs:{show_option:t.show_option,shownotice:t.shownotice},on:{shownotice:t.shownoticeMethod,showoption:t.showoptionMethod}}),t._v(" "),n("router-view"),t._v(" "),n("myfooter")],1)},staticRenderFns:[]}},function(t,o){t.exports={render:function(){var t=this,o=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("footer",[n("div",{staticClass:"con"},[n("div",{staticClass:"left"},[n("div",{staticClass:"logo",staticStyle:{float:"none"}}),t._v(" "),n("p",{staticStyle:{"margin-top":"10px","line-height":"40px"}},[t._v("一站式设计服务解决方案")])]),t._v(" "),n("ul",{staticClass:"center"},[n("li",[n("a",{attrs:{href:"http://houxiaopang.com/help/"}},[t._v("客户指南")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://houxiaopang.com/help/aboutus"}},[t._v("关于猴小胖")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://houxiaopang.com/help/designer"}},[t._v("设计师指南")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://houxiaopang.com/help/contact"}},[t._v("联系我们")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://houxiaopang.com/help/faq"}},[t._v("常见问题")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://houxiaopang.com/help/contact"}},[t._v("意见反馈")])])]),t._v(" "),n("div",{staticClass:"right"},[n("p",[t._v("@2017 杭州求否科技有限公司")]),t._v(" "),n("p",[t._v("浙ICP备17006185号")]),t._v(" "),n("p",[n("a",{attrs:{href:"http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602008608"}},[n("img",{staticStyle:{"margin-top":"5px"},attrs:{src:"http://image.houxiaopang.com/beian.png",alt:""}}),n("span",{staticStyle:{color:"#727272","vertical-align":"top"}},[t._v("浙公网安备 33010602008608号")])])])])])])}]}},function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"nav"},[n("div",{staticClass:"logo",attrs:{onclick:"javascript:location.href='http://houxiaopang.com';"}}),t._v(" "),n("ul",{staticClass:"navinfo"},[n("li",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com';"}},[t._v("首页")]),t._v(" "),n("router-link",{class:{active:t.show},attrs:{to:"/",tag:"li"}},[t._v("作品精选")])],1),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.login,expression:"!login"}],staticClass:"desinger",attrs:{id:"desinger",onclick:"javascript:_czc.push(['_trackEvent','我是设计师','点击']);location.href='http://houxiaopang.com/qrlogin';"}},[n("p",[t._v("我是设计师")])]),t._v(" "),n("ul",{directives:[{name:"show",rawName:"v-show",value:t.login,expression:"login"}],staticClass:"userInfo"},[n("li",{staticClass:"msg",staticStyle:{position:"relative"},on:{click:function(o){o.stopPropagation(),t.shownoticeMethod(o)}}},[n("i",{staticClass:"iconfontyyy",staticStyle:{"font-size":"24px",color:"#545a5f"}},[t._v("")]),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.noticenum>0,expression:"noticenum > 0"}],staticClass:"noticenum",domProps:{innerHTML:t._s(t.noticenum)}})]),t._m(0),t._v(" "),n("li",{on:{click:function(o){o.stopPropagation(),t.showoptionMethod(o)}}},[n("img",{staticStyle:{width:"40px",height:"40px","border-radius":"50%",display:"block"},attrs:{src:t.headimg,alt:""}}),t._v(" "),n("ul",{directives:[{name:"show",rawName:"v-show",value:t.show_option,expression:"show_option"}],staticClass:"useroption"},[n("li",{attrs:{onclick:"javascript:location.href = 'http://houxiaopang.com/admin';"}},[t._v("我的作品")]),t._v(" "),n("li",{attrs:{onclick:"javascript:location.href = 'http://houxiaopang.com/admin/#/designer';"}},[t._v("我的资料")]),t._v(" "),n("li",{on:{click:t.jump}},[t._v("我的简历")]),t._v(" "),n("li",{on:{click:t.exit}},[t._v("退出")])])])])])},staticRenderFns:[function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("li",{attrs:{onclick:"javascript:location.href = 'http://houxiaopang.com/admin/#/newalbum';"}},[n("i",{staticClass:"iconfontyyy",staticStyle:{"font-size":"25px",color:"#545a5f"}},[t._v("")])])}]}}],[6]);
//# sourceMappingURL=app.042ed5b3e7f2db361c2a.js.map