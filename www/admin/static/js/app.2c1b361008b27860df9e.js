webpackJsonp([4],[,,function(t,o,n){"use strict";var i=n(1),e=n(18),a=function(t){return n.e(0).then(function(){var o=[n(24)];t.apply(null,o)}.bind(this)).catch(n.oe)},s=function(t){return n.e(2).then(function(){var o=[n(25)];t.apply(null,o)}.bind(this)).catch(n.oe)},c=function(t){return n.e(1).then(function(){var o=[n(26)];t.apply(null,o)}.bind(this)).catch(n.oe)},r=function(t){return n.e(3).then(function(){var o=[n(23)];t.apply(null,o)}.bind(this)).catch(n.oe)};i.a.use(e.a),o.a=new e.a({routes:[{path:"/",name:"project",component:s},{path:"/newalbum",name:"newalbum",component:a},{path:"/designer",name:"designer",component:c},{path:"/Msg",name:"Msg",component:r}]})},function(t,o,n){function i(t){n(11)}var e=n(0)(n(5),n(16),i,null,null);t.exports=e.exports},,function(t,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var i=n(14),e=n.n(i),a=n(13),s=n.n(a);o.default={components:{myNav:e.a,foot:s.a},data:function(){return{nickname:"",headimg:null,city:"",show_option:!1,shownotice:!1,showcategory:!1}},mounted:function(){var t=this;document.onclick=function(){t.shownotice&&(t.shownotice=!1),t.show_option&&(t.show_option=!1),t.showcategory&&(t.showcategory=!1)}},methods:{userinfo:function(t){this.nickname=t.nickname,this.headimg=t.headimg,this.city=t.city},showoptionMethod:function(){this.shownotice&&(this.shownotice=!1),this.showcategory&&(this.showcategory=!1),this.show_option=!this.show_option},shownoticeMethod:function(){this.show_option&&(this.show_option=!1),this.showcategory&&(this.showcategory=!1),this.shownotice=!this.shownotice},showcategoryMethod:function(){this.show_option&&(this.show_option=!1),this.shownotice&&(this.shownotice=!1),this.showcategory=!this.showcategory}}}},function(t,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var i=n(4),e=n.n(i);o.default={props:["show_option","shownotice"],data:function(){return{nickname:"",headimg:"",city:"",userid:-1,noticenum:0,notice:[]}},watch:{$route:function(){this.getnoticenum()}},mounted:function(){0===this.noticenum&&this.getMsg()},methods:{exit:function(){$.ajax({type:"post",headers:{Authorization:"Token "+token},url:"http://houxiaopang.com/api/v1.1/logout",success:function(t){}}),window.localStorage.token="",window.localStorage.applystatus="",window.localStorage.houxiaiopanguser="",location.href="http://houxiaopang.com"},jump:function(){open("http://houxiaopang.com/workdetail/#/user/"+this.userid)},showoptionMethod:function(){this.$emit("showoption")},shownoticeMethod:function(){this.$emit("shownotice"),this.$nextTick(function(){if(this.noticenum>0){var t=this;$.ajax({url:"http://houxiaopang.com/api/v1.1/designerdash/notice/clearall",type:"POST",headers:{Authorization:"Token "+token},success:function(o){0===o.code&&(t.noticenum=0,t.$router.push("/Msg"))}})}else this.$router.push("/Msg")})},settime:function(t){return getDateDiff(getDateTimeStamp(t))},getMsg:function(){var t=this;$.ajax({url:"http://houxiaopang.com/api/v1.1/designerdash/notice/recent",type:"GET",headers:{Authorization:"Token "+token},success:function(o){if(t.notice=[],0===o.code)for(var n=0,i=o.data.notice.length;n<i;n++)t.notice.push(o.data.notice[n])}})},getnoticenum:function(){var t=this;$.ajax({url:"http://houxiaopang.com/api/v1.1/designerdash/notice/unreadnum",type:"GET",headers:{Authorization:"Token "+token},success:function(o){0===o.code&&(t.noticenum=o.data.num,t.noticenum>0&&t.getMsg())}})}},created:function(){var t=this;token&&$.ajax({type:"get",url:"http://houxiaopang.com/api/v1.1/token/authenticated",headers:{Authorization:"Token "+token},success:function(o){0===o.code&&(login=!0,window.localStorage.applystatus=o.data.applystatus,$.ajax({url:"http://houxiaopang.com/api/v1.1/designerdash/header",type:"GET",headers:{Authorization:"Token "+token},success:function(o){0===o.code&&(t.nickname=o.data.nickname,t.headimg=o.data.headimg,t.city=o.data.city,t.userid=o.data.userid,t.$emit("userinfo",{nickname:t.nickname,headimg:t.headimg,city:t.city}),window.localStorage.houxiaiopanguser=e()(o.data))}}))},error:function(){location.href="http://houxiaopang.com/qrlogin"}})}}},function(t,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var i=n(1),e=n(3),a=n.n(e),s=n(2);i.a.config.productionTip=!1,new i.a({el:"#app",router:s.a,template:"<App/>",components:{App:a.a}})},,,function(t,o){},function(t,o){},function(t,o){},function(t,o,n){function i(t){n(10)}var e=n(0)(null,n(15),i,"data-v-42f6f016",null);t.exports=e.exports},function(t,o,n){function i(t){n(12)}var e=n(0)(n(6),n(17),i,"data-v-a5801090",null);t.exports=e.exports},function(t,o){t.exports={render:function(){var t=this,o=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("footer",[n("div",{staticClass:"con"},[n("div",{staticClass:"left"},[n("div",{staticClass:"logo",staticStyle:{float:"none"}}),t._v(" "),n("p",{staticStyle:{"margin-top":"20px","line-height":"40px"}},[t._v("杭州求否科技有限公司旗下平台")])]),t._v(" "),n("ul",{staticClass:"center"},[n("li",[n("span",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com/help/#/';"}},[t._v("客户指南")])]),t._v(" "),n("li",[n("span",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com/help/#/aboutus';"}},[t._v("关于猴小胖")])]),t._v(" "),n("li",[n("span",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com/help/#/designer';"}},[t._v("设计师指南")])]),t._v(" "),n("li",[n("span",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com/help/#/contact';"}},[t._v("联系我们")])]),t._v(" "),n("li",[n("span",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com/help/#/faq';"}},[t._v("常见问题")])]),t._v(" "),n("li",[n("span",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com/help/#/contact';"}},[t._v("意见反馈")])])]),t._v(" "),n("div",{staticClass:"right"},[n("p",[t._v("@2017 杭州求否科技有限公司")]),t._v(" "),n("p",[t._v("浙ICP备17006185号")])])])])}]}},function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"warp",attrs:{id:"box"}},[n("myNav",{attrs:{show_option:t.show_option,shownotice:t.shownotice},on:{userinfo:t.userinfo,shownotice:t.shownoticeMethod,showoption:t.showoptionMethod}}),t._v(" "),n("div",{staticClass:"main"},[n("div",{staticClass:"content_home"},[n("div",{staticClass:"left"},[n("div",{staticClass:"top"},[n("p",[n("img",{staticStyle:{width:"70px","border-radius":"50%"},attrs:{src:t.headimg,alt:""}})]),t._v(" "),n("p",{staticStyle:{color:"#313131"},domProps:{textContent:t._s(t.nickname)}}),t._v(" "),n("p",{staticStyle:{color:"#828282"},domProps:{textContent:t._s(t.city)}})]),t._v(" "),n("div",{staticClass:"bottom"},[n("ul",[n("router-link",{attrs:{tag:"li",to:"/"}},[t._v("我的作品")]),t._v(" "),n("router-link",{attrs:{tag:"li",to:"/designer"}},[t._v("我的资料")])],1)])]),t._v(" "),n("div",{staticClass:"right"},[n("router-view",{attrs:{showcategory:t.showcategory},on:{showcategory:t.showcategoryMethod}})],1)])]),t._v(" "),n("foot")],1)},staticRenderFns:[]}},function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"nav"},[n("div",{staticClass:"logo",attrs:{onclick:"javascript:location.href='http://houxiaopang.com';"}}),t._v(" "),t._m(0),t._v(" "),n("ul",{staticClass:"userInfo"},[n("li",{staticClass:"msg",staticStyle:{position:"relative"},on:{click:function(o){o.stopPropagation(),t.shownoticeMethod(o)}}},[n("i",{staticClass:"iconfontyyy",staticStyle:{"font-size":"24px",color:"#545a5f"}},[t._v("")]),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.noticenum>0,expression:"noticenum > 0"}],staticClass:"noticenum",domProps:{innerHTML:t._s(t.noticenum)}})]),t._v(" "),n("router-link",{attrs:{tag:"li",to:"/newalbum"}},[n("i",{staticClass:"iconfontyyy",staticStyle:{"font-size":"25px",color:"#545a5f"}},[t._v("")])]),t._v(" "),n("li",{on:{click:function(o){o.stopPropagation(),t.showoptionMethod(o)}}},[n("img",{staticStyle:{width:"40px",height:"40px","border-radius":"50%",display:"block"},attrs:{src:t.headimg,alt:""}}),t._v(" "),n("ul",{directives:[{name:"show",rawName:"v-show",value:t.show_option,expression:"show_option"}],staticClass:"useroption"},[n("router-link",{attrs:{tag:"li",to:"/"}},[t._v("我的作品")]),t._v(" "),n("router-link",{attrs:{tag:"li",to:"/designer"}},[t._v("我的资料")]),t._v(" "),n("li",{on:{click:t.jump}},[t._v("我的简历")]),t._v(" "),n("li",{on:{click:t.exit}},[t._v("退出")])],1)])],1)])},staticRenderFns:[function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("ul",{staticClass:"navinfo"},[n("li",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com';"}},[t._v("首页")]),t._v(" "),n("li",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com/workdetail';"}},[t._v("作品精选")])])}]}}],[7]);
//# sourceMappingURL=app.2c1b361008b27860df9e.js.map