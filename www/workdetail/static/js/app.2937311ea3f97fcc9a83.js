webpackJsonp([0],[,,function(t,e,a){function n(t){a(18)}var i=a(0)(a(6),a(30),n,"data-v-18355922",null);t.exports=i.exports},function(t,e,a){"use strict";var n=a(1),i=a(34),o=a(26),r=a.n(o),s=a(24),c=a.n(s),l=a(23),p=a.n(l);n.a.use(i.a),e.a=new i.a({routes:[{path:"/album/:id",name:"project",component:r.a},{path:"/",name:"workall",component:c.a},{path:"/user/:id",name:"wechat",component:p.a},{path:"/user",redirect:"/"},{path:"/album",redirect:"/"},{path:"/*",redirect:"/"}]})},function(t,e,a){function n(t){a(15)}var i=a(0)(a(5),a(27),n,null,null);t.exports=i.exports},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(25),i=a.n(n),o=a(22),r=a.n(o);e.default={name:"app",components:{mynav:i.a,myfooter:r.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a(1);e.default={props:["pageInfo"],computed:{page:function(){return Math.ceil(this.pageInfo.total/this.pageInfo.pagenum)},setList:function(){var t=this.page,e=[],a=[],n=Math.floor(this.pageInfo.pagegroup/2),i=this.pageInfo.current;if(t<=this.pageInfo.pagegroup){for(;t--;)e.push({text:this.page-t,val:this.page-t});return e}for(;t--;)e.push(this.page-t);var o=e.indexOf(i);o<n&&(i=i+n-o),this.pageInfo.current>this.page-n&&(i=this.page-n),e=e.splice(i-n-1,this.pageInfo.pagegroup);do{var r=e.shift();a.push({text:r,val:r})}while(e.length);return this.page>this.pageInfo.pagegroup&&(this.pageInfo.current>n+1&&a.unshift({text:"...",val:a[0].val-1}),this.pageInfo.current<this.page-n&&a.push({text:"...",val:a[a.length-1].val+1})),a}},methods:{clickCurrent:function(t){this.pageInfo.current!=t&&t>0&&t<this.page+1&&(this.pageInfo.current=t,this.$emit("change",this.pageInfo.current))}}}},function(t,e,a){"use strict";function n(t){return Date.parse(t.replace(/-/gi,"/"))}function i(t){var e=(new Date).getTime(),a=e-t,n=a/2592e6,i=a/6048e5,o=a/864e5,r=a/36e5,s=a/6e4,c="刚刚";return n>=1?c=parseInt(n)+"个月前":i>=1?c=parseInt(i)+"周前":o>=1?c=parseInt(o)+"天前":r>=1?c=parseInt(r)+"小时前":s>=1&&(c=parseInt(s)+"分钟前"),c}Object.defineProperty(e,"__esModule",{value:!0});var o=a(2),r=a.n(o);e.default={data:function(){return{userinfo:{},albums:[],userid:this.$route.params.id,pageinfo:{total:0,pagenum:20,current:1,pagegroup:5,skin:"#d01667"},categroy:"-1",more:!1}},created:function(){this.getuserinfo(this.$route.params.id),this.getuserworks(this.$route.params.id,this.categroy,this.pageinfo.current)},mounted:function(){this.chooseCategory()},components:{pagination:r.a},methods:{setexp:function(t){var e=(new Date).getFullYear();return t>=e?"学生":e-t+"年工作经验"},showmore:function(){this.more=!this.more,this.more?($("#project_text").css("height","auto"),$(".userinfo .more i").eq(0).html("&#xe8fa;"),$(".userinfo .more span").eq(0).html("收起")):($("#project_text").css("height","62px"),$(".userinfo .more i").eq(0).html("&#xe8f8;"),$(".userinfo .more span").eq(0).html("展开"),window.scrollTo(0,600))},jump:function(t){var e=t.id;"project"===t.name?window.open("http://houxiaopang.com/workdetail/#/album/"+e):"wechat"===t.name&&window.open("http://houxiaopang.com/workdetail/#/user/"+e)},pagechange:function(t){this.getuserworks(this.userid,this.categroy,t)},chooseCategory:function(){for(var t=this,e=document.getElementById("category").children,a=0,n=e.length;a<n;a++)e[a].index=a,e[a].onclick=function(){$("#category").find("li").each(function(){$(this).removeClass("active")}),$(this).addClass("active"),0==this.index&&(this.index=-1),t.pageinfo.current=1,t.categroy=this.index,t.getuserworks(t.userid,t.categroy,t.pageinfo.current)}},getuserinfo:function(t){var e=this;$.ajax({type:"get",url:"http://houxiaopang.com/api/v1.1/resumeinfo",data:{designer_id:t},success:function(t){0===t.code?e.userinfo=t.data:alert("网络拥挤，请稍后再试···")},error:function(){alert("网络拥挤，请稍后再试···")}})},getuserworks:function(t,e,a){var n=this;$.ajax({type:"get",url:"http://houxiaopang.com/api/v1.1/allwork",data:{category:e,designer_id:t,page:a},success:function(t){if(0==t.code){n.albums=[];var e=t.data.album;n.pageinfo.total=t.data.total;for(var a=0,i=e.length;a<i;a++){var o=e[a].category;1==o?o="PPT":2==o?o="UI":3==o?o="文本画册":4==o?o="海报展板":5==o?o="LOGO":6==o?o="企业形象设计（VI）":0==o&&(o="测试品类"),e[a].category=o,n.albums.push(e[a])}}else alert("网络拥挤，请稍后再试···")},error:function(){alert("网络拥挤，请稍后再试···")}})},formatWorktime:function(t){var e="";return"1"==t?e="周一至周五白天":"2"==t?e="周一至周五晚间":"3"==t?e="周末":"4"==t?e="可全职服务":"5"==t&&(e="另议"),e},myfilter:function(t){return i(n(t))}}}},function(t,e,a){"use strict";function n(t){return Date.parse(t.replace(/-/gi,"/"))}function i(t){var e=(new Date).getTime(),a=e-t,n=a/2592e6,i=a/6048e5,o=a/864e5,r=a/36e5,s=a/6e4,c="刚刚";return n>=1?c=parseInt(n)+"个月前":i>=1?c=parseInt(i)+"周前":o>=1?c=parseInt(o)+"天前":r>=1?c=parseInt(r)+"小时前":s>=1&&(c=parseInt(s)+"分钟前"),c}Object.defineProperty(e,"__esModule",{value:!0});var o=a(2),r=a.n(o);e.default={data:function(){return{albums:[],categroy:"-1",pageinfo:{total:0,pagenum:20,current:1,pagegroup:5,skin:"#d01667"}}},mounted:function(){this.chooseCategory()},components:{pagination:r.a},methods:{jump:function(t){var e=t.id;"project"===t.name?window.open("http://houxiaopang.com/workdetail/#/album/"+e):"wechat"===t.name&&window.open("http://houxiaopang.com/workdetail/#/user/"+e)},pagechange:function(t){this.getdata(this.categroy,t)},chooseCategory:function(){for(var t=this,e=document.getElementById("category").children,a=0,n=e.length;a<n;a++)e[a].index=a,e[a].onclick=function(){$("#category").find("li").each(function(){$(this).removeClass("active")}),$(this).addClass("active"),0==this.index&&(this.index=-1),t.pageinfo.current=1,t.categroy=this.index,t.getdata(t.categroy,t.pageinfo.current)}},myfilter:function(t){return i(n(t))},getdata:function(t,e){var a=this;this.albums=[],$.ajax({type:"get",url:"http://houxiaopang.com/api/v1.1/allwork",data:{category:t,page:e},success:function(t){if(0===t.code){a.pageinfo.total=t.data.total;for(var e=t.data.album,n=0,i=e.length;n<i;n++){var o=e[n].category;1==o?o="PPT":2==o?o="UI":3==o?o="文本画册":4==o?o="海报展板":5==o?o="LOGO":6==o?o="企业形象设计（VI）":0==o&&(o="测试品类"),e[n].category=o,a.albums.push(e[n])}}else alert("网络拥挤，请稍后再试···")},error:function(){alert("网络拥挤，请稍后再试···")}})}},created:function(){this.getdata(this.categroy,this.pageinfo.current)}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(12),i=a.n(n);e.default={data:function(){return{show:!0,token:window.localStorage.token,login:"false",nickname:"",headimg:""}},watch:{$route:function(){"/"!=this.$route.path?this.show=!1:this.show=!0}},created:function(){"/"!=this.$route.path?this.show=!1:this.show=!0;var t=this;this.token&&$.ajax({type:"get",url:"http://houxiaopang.com/api/v1.1/token/authenticated",headers:{Authorization:"Token "+t.token},success:function(e){0===e.code&&(t.login="true",window.localStorage.applystatus=e.data.applystatus,$.ajax({url:"http://houxiaopang.com/api/v1.1/designerdash/header",type:"GET",headers:{Authorization:"Token "+t.token},success:function(e){0===e.code&&(t.nickname=e.data.nickname,t.headimg=e.data.headimg,window.localStorage.houxiaiopanguser=i()(e.data))}}))}})}}},function(t,e,a){"use strict";function n(t){var t=t;return 1==t?t="PPT":2==t?t="UI":3==t?t="文本画册":4==t?t="海报展览":5==t?t="LOGO":6==t?t="企业形象设计（VI）":0==t&&(t="测试品类"),t}Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"project",data:function(){return{projectinfo:{},modelshow:!1}},created:function(){this.getingf(this.$route.params.id)},components:{},mounted:function(){},methods:{jump:function(){window.open("http://houxiaopang.com/workdetail/#/user/"+this.projectinfo.belong_id)},showphoto:function(t){open(t,"图片预览")},getingf:function(t){var e=this;$.ajax({type:"GET",url:"http://houxiaopang.com/api/v1.1/albumdetail",data:{album_id:t},success:function(t){0==t.code?(e.projectinfo=t.data,e.projectinfo.category=n(e.projectinfo.category),e.$nextTick(function(){$("img.loadlazy").lazyload({effect:"fadeIn"})})):location.href="http://houxiaopang.com/404"}})}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(1),i=a(4),o=a.n(i),r=a(3);n.a.config.productionTip=!1,new n.a({el:"#app",router:r.a,template:"<App/>",components:{App:o.a}})},,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,a){function n(t){a(19)}var i=a(0)(null,a(31),n,"data-v-27fd66a3",null);t.exports=i.exports},function(t,e,a){function n(t){a(20)}var i=a(0)(a(7),a(32),n,"data-v-39fbe2ce",null);t.exports=i.exports},function(t,e,a){function n(t){a(17)}var i=a(0)(a(8),a(29),n,"data-v-1395fcd0",null);t.exports=i.exports},function(t,e,a){function n(t){a(21)}var i=a(0)(a(9),a(33),n,"data-v-50863c6b",null);t.exports=i.exports},function(t,e,a){function n(t){a(16)}var i=a(0)(a(10),a(28),n,null,null);t.exports=i.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("mynav"),t._v(" "),a("router-view"),t._v(" "),a("myfooter")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"top"},[a("div",{staticClass:"head",on:{click:t.jump}},[a("span",[t._v(t._s(t.projectinfo.belong_nick))]),t._v(" "),a("img",{attrs:{src:t.projectinfo.belong_head}})]),t._v(" "),a("div",{staticClass:"title"},[t._v(t._s(t.projectinfo.title))]),t._v(" "),a("div",{staticClass:"category"},[a("ul",[a("li",[t._v(t._s(t.projectinfo.category))])])]),t._v(" "),a("div",{staticClass:"time"},[t._v(t._s(t.projectinfo.up_time))]),t._v(" "),a("div",{staticClass:"desc"},[t._v(t._s(t.projectinfo.description))])]),t._v(" "),a("div",{staticClass:"work"},[a("div",{staticClass:"worklist"},t._l(t.projectinfo.works,function(e){return a("img",{staticClass:"loadlazy",attrs:{"data-original":e,alt:""},on:{click:function(a){t.showphoto(e)}}})}))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"main"},[a("div",{staticClass:"content"},[t._m(0),t._v(" "),a("ul",{staticStyle:{overflow:"hidden"},attrs:{id:"albumsList"}},t._l(t.albums,function(e){return a("li",[a("img",{staticClass:"img",attrs:{src:e.cover},on:{click:function(a){t.jump({name:"project",id:e.work_id})}}}),t._v(" "),a("p",[a("span",{staticStyle:{"padding-left":"0px",cursor:"pointer","white-space":"nowrap",display:"inline-block",width:"100%",overflow:"hidden","text-overflow":"ellipsis"},attrs:{title:e.title},domProps:{innerHTML:t._s(e.title)},on:{click:function(a){t.jump({name:"project",id:e.work_id})}}})]),t._v(" "),a("p",{domProps:{innerHTML:t._s(e.category)}}),t._v(" "),a("p",[a("img",{attrs:{src:e.headimg},on:{click:function(a){t.jump({name:"wechat",id:e.user_id})}}}),t._v(" "),a("span",{domProps:{innerHTML:t._s(e.username)},on:{click:function(a){t.jump({name:"wechat",id:e.user_id})}}}),t._v(" "),a("span",{staticStyle:{"font-size":"14px",float:"right","margin-right":"10px"},domProps:{innerHTML:t._s(t.myfilter(e.up_time))}})])])})),t._v(" "),a("pagination",{attrs:{pageInfo:t.pageinfo},on:{change:t.pagechange}})],1)])])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{height:"80px"}},[a("ul",{staticClass:"category",attrs:{id:"category"}},[a("li",{staticClass:"active"},[a("a",[t._v("全部")])]),t._v(" "),a("li",[a("a",[t._v("PPT定制")])]),t._v(" "),a("li",[a("a",[t._v("UI设计")])]),t._v(" "),a("li",[a("a",[t._v("企业画册")])]),t._v(" "),a("li",[a("a",[t._v("海报展板")])]),t._v(" "),a("li",[a("a",[t._v("LOGO")])]),t._v(" "),a("li",[a("a",[t._v("企业形象设计VI")])])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{directives:[{name:"show",rawName:"v-show",value:t.pageInfo.total>t.pageInfo.pagenum,expression:"pageInfo.total>pageInfo.pagenum"}],staticClass:"pages-wrap"},[a("ul",{staticClass:"pagination clearfix"},[a("li",{class:{disabled:1==t.pageInfo.current}},[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){t.clickCurrent(1)}}},[t._v(" 首页 ")])]),t._v(" "),a("li",{class:{disabled:1==t.pageInfo.current}},[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){t.clickCurrent(t.pageInfo.current-1)}}},[t._v(" 上一页 ")])]),t._v(" "),t._l(t.setList,function(e){return a("li",{class:{active:t.pageInfo.current==e.val}},[t.pageInfo.current==e.val?a("a",{style:{backgroundColor:t.pageInfo.skin,borderColor:t.pageInfo.skin},attrs:{href:"javascript:;"},on:{click:function(a){t.clickCurrent(e.val)}}},[t._v(" "+t._s(e.text)+" ")]):a("a",{attrs:{href:"javascript:;"},on:{click:function(a){t.clickCurrent(e.val)}}},[t._v(" "+t._s(e.text)+" ")])])}),t._v(" "),a("li",{class:{disabled:t.pageInfo.current==t.page}},[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){t.clickCurrent(t.pageInfo.current+1)}}},[t._v("\n      下一页")])]),t._v(" "),a("li",{class:{disabled:t.pageInfo.current==t.page}},[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){t.clickCurrent(t.page)}}},[t._v(" 尾页 ")])])],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("footer",[a("div",{staticClass:"con"},[a("div",{staticClass:"left"},[a("div",{staticClass:"logo",staticStyle:{float:"none"}}),t._v(" "),a("p",{staticStyle:{"margin-top":"20px","line-height":"40px"}},[t._v("杭州求否科技有限公司旗下平台")])]),t._v(" "),a("ul",{staticClass:"center"},[a("li",[a("span",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com/help/customer';"}},[t._v("客户指南")])]),t._v(" "),a("li",[a("span",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com/help/aboutus';"}},[t._v("关于猴小胖")])]),t._v(" "),a("li",[a("span",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com/help/designer';"}},[t._v("设计师指南")])]),t._v(" "),a("li",[a("span",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com/help/contact';"}},[t._v("联系我们")])]),t._v(" "),a("li",[a("span",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com/help/faq';"}},[t._v("常见问题")])]),t._v(" "),a("li",[a("span",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com/help/customer';"}},[t._v("意见反馈")])])]),t._v(" "),a("div",{staticClass:"right"},[a("p",[t._v("@2017 杭州求否科技有限公司")]),t._v(" "),a("p",[t._v("浙ICP备17006185号")])])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._m(0),t._v(" "),a("div",{staticClass:"userinfo"},[a("div",{staticClass:"head_div"},[a("img",{attrs:{src:t.userinfo.headimg}})]),t._v(" "),a("p",{domProps:{innerHTML:t._s(t.userinfo.nickname)}}),t._v(" "),a("p",[a("i"),a("span",{domProps:{innerHTML:t._s(t.userinfo.city)}}),t._v("|"),a("span",{domProps:{innerHTML:t._s(t.setexp(t.userinfo.exp))}})]),t._v(" "),a("div",{staticClass:"sc"},[a("span",{staticStyle:{float:"left"}},[t._v("擅长领域：")]),t._v(" "),a("ul",{staticStyle:{float:"right",width:"313px","padding-top":"10px"}},t._l(t.userinfo.filed,function(e){return a("li",{domProps:{innerHTML:t._s(e)}})}))]),t._v(" "),a("div",{staticClass:"worktime",staticStyle:{overflow:"hidden"}},[a("span",[t._v("可工作时间：")]),t._v(" "),a("ul",{staticStyle:{float:"right",width:"313px",color:"#313131","line-height":"28px","margin-top":"6px"}},t._l(t.userinfo.worktime,function(e){return a("li",{domProps:{innerHTML:t._s(t.formatWorktime(e))}})}))]),t._v(" "),a("div",{staticStyle:{overflow:"hidden","margin-top":"20px"}},[a("span",{staticStyle:{float:"left"}},[t._v("项目经历：")]),t._v(" "),a("ul",{staticStyle:{float:"right",width:"313px","line-height":"20px","margin-top":"10px",height:"62px",overflow:"hidden"},attrs:{id:"project_text"}},t._l(t.userinfo.project_text,function(e){return a("li",[a("p",{staticStyle:{"font-weight":"600"},domProps:{innerHTML:t._s(e.title)}}),t._v(" "),a("p",{staticStyle:{"margin-bottom":"40px"},domProps:{innerHTML:t._s(e.desc)}})])}))]),t._v(" "),a("div",{staticClass:"more",on:{click:t.showmore}},[a("i",{staticClass:"iconfont"},[t._v("")]),a("span",[t._v("展开")])])]),t._v(" "),a("div",{staticClass:"main"},[a("div",{staticClass:"content"},[t._m(1),t._v(" "),a("ul",{staticStyle:{overflow:"hidden"}},t._l(t.albums,function(e){return a("li",[a("img",{staticClass:"img",attrs:{src:e.cover},on:{click:function(a){t.jump({name:"project",id:e.work_id})}}}),t._v(" "),a("p",[a("span",{staticStyle:{"padding-left":"0px",cursor:"pointer","white-space":"nowrap",display:"inline-block",width:"100%",overflow:"hidden","text-overflow":"ellipsis"},attrs:{title:e.title},domProps:{innerHTML:t._s(e.title)},on:{click:function(a){t.jump({name:"project",id:e.work_id})}}})]),t._v(" "),a("p",{domProps:{innerHTML:t._s(e.category)}}),t._v(" "),a("p",[a("img",{attrs:{src:e.headimg},on:{click:function(a){t.jump({name:"wechat",id:e.user_id})}}}),t._v(" "),a("span",{domProps:{innerHTML:t._s(e.username)},on:{click:function(a){t.jump({name:"wechat",id:e.user_id})}}}),t._v(" "),a("span",{staticStyle:{"font-size":"14px",float:"right","margin-right":"10px"},domProps:{innerHTML:t._s(t.myfilter(e.up_time))}})])])})),t._v(" "),a("pagination",{attrs:{pageInfo:t.pageinfo},on:{change:t.pagechange}})],1)])])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"info"},[a("div",{staticClass:"fg"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{height:"80px"}},[a("ul",{staticClass:"category",attrs:{id:"category"}},[a("li",{staticClass:"active"},[a("a",[t._v("全部")])]),t._v(" "),a("li",[a("a",[t._v("PPT定制")])]),t._v(" "),a("li",[a("a",[t._v("UI设计")])]),t._v(" "),a("li",[a("a",[t._v("企业画册")])]),t._v(" "),a("li",[a("a",[t._v("海报展板")])]),t._v(" "),a("li",[a("a",[t._v("LOGO")])]),t._v(" "),a("li",[a("a",[t._v("企业形象设计VI")])])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"nav"},[a("div",{staticClass:"logo",attrs:{onclick:"javascript:location.href='http://houxiaopang.com';"}}),t._v(" "),a("ul",[a("li",{attrs:{onclick:"javascript:location.href='http://houxiaopang.com';"}},[t._v("首页")]),t._v(" "),a("router-link",{class:{active:t.show},attrs:{to:"/",tag:"li"}},[t._v("作品精选")])],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"false"==t.login,expression:"login == 'false'"}],staticClass:"desinger",attrs:{id:"desinger",login:t.login,onclick:"javascript:location.href = 'http://houxiaopang.com/qrlogin';"}},[a("p",[t._v("我是设计师")])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"true"==t.login,expression:"login == 'true'"}],staticClass:"userInfo",attrs:{onclick:"javascript:location.href='http://houxiaopang.com/admin';"}},[a("span",{staticStyle:{"font-size":"12px","vertical-align":"top"},domProps:{innerHTML:t._s(t.nickname)}}),t._v(" "),a("img",{staticStyle:{width:"40px",height:"40px","border-radius":"50%"},attrs:{src:"http://userhead.houxiaopang.com/ovS1y1eqGJuYTLmesIuyEY5d4Ttg.jpg",alt:"",src:t.headimg}})])])},staticRenderFns:[]}}],[11]);
//# sourceMappingURL=app.2937311ea3f97fcc9a83.js.map