webpackJsonp([1],{23:function(e,n,t){function i(e){t(39)}var a=t(0)(t(31),t(42),i,"data-v-39fbe2ce",null);e.exports=a.exports},26:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});t(1);n.default={props:["pageInfo"],computed:{page:function(){return Math.ceil(this.pageInfo.total/this.pageInfo.pagenum)},setList:function(){var e=this.page,n=[],t=[],i=Math.floor(this.pageInfo.pagegroup/2),a=this.pageInfo.current;if(e<=this.pageInfo.pagegroup){for(;e--;)n.push({text:this.page-e,val:this.page-e});return n}for(;e--;)n.push(this.page-e);var o=n.indexOf(a);o<i&&(a=a+i-o),this.pageInfo.current>this.page-i&&(a=this.page-i),n=n.splice(a-i-1,this.pageInfo.pagegroup);do{var r=n.shift();t.push({text:r,val:r})}while(n.length);return this.page>this.pageInfo.pagegroup&&(this.pageInfo.current>i+1&&t.unshift({text:"...",val:t[0].val-1}),this.pageInfo.current<this.page-i&&t.push({text:"...",val:t[t.length-1].val+1})),t}},methods:{clickCurrent:function(e){this.pageInfo.current!=e&&e>0&&e<this.page+1&&(this.pageInfo.current=e,this.$emit("change",this.pageInfo.current))}}}},27:function(e,n,t){n=e.exports=t(21)(!0),n.push([e.i,".pages-wrap[data-v-18355922]{text-align:center}.pagination[data-v-18355922]{display:inline-block;padding-left:0;margin:20px 0;border-radius:4px}.pagination>li[data-v-18355922]{display:inline}.pagination>.active>a[data-v-18355922],.pagination>.active>a[data-v-18355922]:hover,.pagination>.active>span[data-v-18355922],.pagination>.active>span[data-v-18355922]:hover{z-index:3;color:#fff;cursor:default;background-color:#337ab7;border-color:#337ab7}.pagination>.disabled>a[data-v-18355922],.pagination>.disabled>a[data-v-18355922]:hover,.pagination>.disabled>span[data-v-18355922],.pagination>.disabled>span[data-v-18355922]:hover{color:#777;cursor:not-allowed;background-color:#fff;border-color:#ddd}.pagination>li>a[data-v-18355922]:hover,.pagination>li>span[data-v-18355922]:hover{z-index:2;color:#fff;background-color:#d01667;border-color:#d01667}.pagination>li>a[data-v-18355922],.pagination>li>span[data-v-18355922]{position:relative;float:left;padding:6px 12px;margin-left:-1px;line-height:1.42857143;color:#000;text-decoration:none;background-color:#fff;border:1px solid #ddd}","",{version:3,sources:["C:/vue/projectInfo/src/components/Pagination.vue"],names:[],mappings:"AACA,6BACE,iBAAmB,CACpB,AACD,6BACE,qBAAsB,AACtB,eAAgB,AAChB,cAAe,AACf,iBAAmB,CACpB,AACD,gCACE,cAAgB,CACjB,AACD,8KACE,UAAW,AACX,WAAY,AACZ,eAAgB,AAChB,yBAA0B,AAC1B,oBAAsB,CACvB,AACD,sLACE,WAAY,AACZ,mBAAoB,AACpB,sBAAuB,AACvB,iBAAmB,CACpB,AACD,mFACE,UAAW,AACX,WAAY,AACZ,yBAA0B,AAC1B,oBAAsB,CACvB,AACD,uEACE,kBAAmB,AACnB,WAAY,AACZ,iBAAkB,AAClB,iBAAkB,AAClB,uBAAwB,AACxB,WAAY,AACZ,qBAAsB,AACtB,sBAAuB,AACvB,qBAAuB,CACxB",file:"Pagination.vue",sourcesContent:["\n.pages-wrap[data-v-18355922] {\n  text-align: center;\n}\n.pagination[data-v-18355922] {\n  display: inline-block;\n  padding-left: 0;\n  margin: 20px 0;\n  border-radius: 4px;\n}\n.pagination > li[data-v-18355922] {\n  display: inline;\n}\n.pagination > .active > a[data-v-18355922], .pagination > .active > a[data-v-18355922]:hover, .pagination > .active > span[data-v-18355922], .pagination > .active > span[data-v-18355922]:hover {\n  z-index: 3;\n  color: #fff;\n  cursor: default;\n  background-color: #337ab7;\n  border-color: #337ab7;\n}\n.pagination > .disabled > a[data-v-18355922], .pagination > .disabled > a[data-v-18355922]:hover, .pagination > .disabled > span[data-v-18355922], .pagination > .disabled > span[data-v-18355922]:hover {\n  color: #777;\n  cursor: not-allowed;\n  background-color: #fff;\n  border-color: #ddd;\n}\n.pagination > li > a[data-v-18355922]:hover, .pagination > li > span[data-v-18355922]:hover {\n  z-index: 2;\n  color: #FFF;\n  background-color: #d01667;\n  border-color: #d01667;\n}\n.pagination > li > a[data-v-18355922], .pagination > li > span[data-v-18355922] {\n  position: relative;\n  float: left;\n  padding: 6px 12px;\n  margin-left: -1px;\n  line-height: 1.42857143;\n  color: #000;\n  text-decoration: none;\n  background-color: #fff;\n  border: 1px solid #ddd;\n}\n"],sourceRoot:""}])},28:function(e,n,t){var i=t(27);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);t(22)("271531d7",i,!0)},29:function(e,n,t){function i(e){t(28)}var a=t(0)(t(26),t(30),i,"data-v-18355922",null);e.exports=a.exports},30:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{directives:[{name:"show",rawName:"v-show",value:e.pageInfo.total>e.pageInfo.pagenum,expression:"pageInfo.total>pageInfo.pagenum"}],staticClass:"pages-wrap"},[t("ul",{staticClass:"pagination clearfix"},[t("li",{class:{disabled:1==e.pageInfo.current}},[t("a",{attrs:{href:"javascript:;"},on:{click:function(n){e.clickCurrent(1)}}},[e._v(" 首页 ")])]),e._v(" "),t("li",{class:{disabled:1==e.pageInfo.current}},[t("a",{attrs:{href:"javascript:;"},on:{click:function(n){e.clickCurrent(e.pageInfo.current-1)}}},[e._v(" 上一页 ")])]),e._v(" "),e._l(e.setList,function(n){return t("li",{class:{active:e.pageInfo.current==n.val}},[e.pageInfo.current==n.val?t("a",{style:{backgroundColor:e.pageInfo.skin,borderColor:e.pageInfo.skin},attrs:{href:"javascript:;"},on:{click:function(t){e.clickCurrent(n.val)}}},[e._v(" "+e._s(n.text)+" ")]):t("a",{attrs:{href:"javascript:;"},on:{click:function(t){e.clickCurrent(n.val)}}},[e._v(" "+e._s(n.text)+" ")])])}),e._v(" "),t("li",{class:{disabled:e.pageInfo.current==e.page}},[t("a",{attrs:{href:"javascript:;"},on:{click:function(n){e.clickCurrent(e.pageInfo.current+1)}}},[e._v("\n      下一页")])]),e._v(" "),t("li",{class:{disabled:e.pageInfo.current==e.page}},[t("a",{attrs:{href:"javascript:;"},on:{click:function(n){e.clickCurrent(e.page)}}},[e._v(" 尾页 ")])])],2)])},staticRenderFns:[]}},31:function(e,n,t){"use strict";function i(e){return Date.parse(e.replace(/-/gi,"/"))}function a(e){var n=(new Date).getTime(),t=n-e,i=t/2592e6,a=t/6048e5,o=t/864e5,r=t/36e5,A=t/6e4,p="刚刚";return i>=1?p=parseInt(i)+"个月前":a>=1?p=parseInt(a)+"周前":o>=1?p=parseInt(o)+"天前":r>=1?p=parseInt(r)+"小时前":A>=1&&(p=parseInt(A)+"分钟前"),p}Object.defineProperty(n,"__esModule",{value:!0});var o=t(29),r=t.n(o);n.default={data:function(){return{userinfo:{project_text:[],worktime:[]},albums:[],userid:this.$route.params.id,pageinfo:{total:0,pagenum:20,current:1,pagegroup:5,skin:"#d01667"},categroy:"-1",more:!1}},created:function(){this.getuserinfo(this.$route.params.id),this.getuserworks(this.$route.params.id,this.categroy,this.pageinfo.current,1)},mounted:function(){this.chooseCategory()},components:{pagination:r.a},methods:{setexp:function(e){var n=(new Date).getFullYear();return e>=n?"学生":n-e+"年工作经验"},showmore:function(){this.more=!this.more,this.more?($("#project_text").css("height","auto"),$(".userinfo .more i").eq(0).html("&#xe8fa;"),$(".userinfo .more span").eq(0).html("收起")):($("#project_text").css("height","62px"),$(".userinfo .more i").eq(0).html("&#xe8f8;"),$(".userinfo .more span").eq(0).html("展开"),window.scrollTo(0,600))},jump:function(e){var n=e.id;"project"===e.name?window.open("http://houxiaopang.com/workdetail/#/album/"+n):"wechat"===e.name&&window.open("http://houxiaopang.com/workdetail/#/user/"+n)},pagechange:function(e){this.getuserworks(this.userid,this.categroy,e)},chooseCategory:function(){for(var e=this,n=document.getElementById("category").children,t=0,i=n.length;t<i;t++)n[t].index=t,n[t].onclick=function(){$("#category").find("li").each(function(){$(this).removeClass("active")}),$(this).addClass("active"),0==this.index&&(this.index=-1),e.pageinfo.current=1,e.categroy=this.index,e.getuserworks(e.userid,e.categroy,e.pageinfo.current)}},getuserinfo:function(e){var n=this;$.ajax({type:"get",url:"http://www.houxiaopang.com/api/v1.1/resumeinfo",data:{designer_id:e},success:function(e){0===e.code?(""==e.data.worktime&&(e.data.worktime=[]),n.userinfo=e.data):alert("网络拥挤，请稍后再试···")},error:function(){alert("网络拥挤，请稍后再试···")}})},getuserworks:function(e,n,t,i){var a=this;$.ajax({type:"get",url:"http://www.houxiaopang.com/api/v1.1/allwork",data:{category:n,designer_id:e,page:t},success:function(e){if(0===e.code){i||window.scrollTo(0,document.getElementById("category").offsetTop),a.albums=[];var n=e.data.album;a.pageinfo.total=e.data.total;for(var t=0,o=n.length;t<o;t++){var r=n[t].category;1===r?r="PPT":2===r?r="UI":3===r?r="文本画册":4===r?r="海报展板":5===r?r="LOGO":6===r?r="企业形象设计（VI）":0===r&&(r="测试品类"),n[t].category=r,a.albums.push(n[t])}}else alert("网络拥挤，请稍后再试···")},error:function(){alert("网络拥挤，请稍后再试···")}})},formatWorktime:function(e){var n="";return"1"==e?n="周一至周五白天":"2"==e?n="周一至周五晚间":"3"==e?n="周末":"4"==e?n="可全职服务":"5"==e&&(n="另议"),n},myfilter:function(e){return a(i(e))}}}},36:function(e,n,t){n=e.exports=t(21)(!0),n.push([e.i,'.info[data-v-39fbe2ce]{background:url("http://image.houxiaopang.com/workdetail/bg.png") no-repeat;background-size:cover;height:340px}.fg[data-v-39fbe2ce]{background:rgba(0,0,0,.6);width:100%;left:0;top:0;height:100%}ul[data-v-39fbe2ce]{list-style:none}.userinfo[data-v-39fbe2ce]{width:600px;margin:0 auto;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box;color:#727272;line-height:40px;padding:15px 60px 50px}.userinfo>.head_div[data-v-39fbe2ce]{margin:-70px auto 0;width:110px;height:110px;background:#fff;border-radius:50%}.userinfo>.head_div>img[data-v-39fbe2ce]{display:inline-block;width:100px;height:100px;margin-left:5px;margin-top:5px;border-radius:50%}.userinfo>p[data-v-39fbe2ce]:first-of-type{font-size:30px;text-align:center;height:50px;line-height:50px;color:#313131}.userinfo>p[data-v-39fbe2ce]:nth-of-type(2){text-align:center;color:#999;height:30px;line-height:30px;font-size:16px;position:relative}.userinfo>p:nth-of-type(2)>span[data-v-39fbe2ce]:nth-child(2){padding-right:15px;padding-left:20px}.userinfo>p:nth-of-type(2)>span[data-v-39fbe2ce]:nth-child(3){padding-left:15px}.userinfo>p>i[data-v-39fbe2ce]{background:url("http://image.houxiaopang.com/workdetail/dingwei.png") no-repeat;display:inline-block;width:12px;height:17px;background-size:cover;position:absolute;top:6px}.main[data-v-39fbe2ce]{background:#f5f5f5}.sc[data-v-39fbe2ce]{overflow:hidden;margin-top:20px}.userinfo>.sc li[data-v-39fbe2ce]{float:left;padding:0 25px;border-radius:25px;text-align:center;height:30px;line-height:28px;margin-right:20px;margin-bottom:10px;background:#eee;color:#828282}.userinfo>.more[data-v-39fbe2ce]{width:60px;margin:0 auto;color:#c0bebe;cursor:pointer}.userinfo>.more[data-v-39fbe2ce]:hover{color:#d01667}.userinfo>.more>span[data-v-39fbe2ce]{padding-left:5px;font-size:14px}.content[data-v-39fbe2ce]{-webkit-box-sizing:border-box;box-sizing:border-box;width:1100px;margin:20px auto 0;height:100%}.content>ul[data-v-39fbe2ce]{list-style:none}.content>ul>li[data-v-39fbe2ce],.content>ul[data-v-39fbe2ce]{overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}.content>ul>li[data-v-39fbe2ce]{width:260px;height:295px;float:left;margin-right:19px;margin-bottom:25px;background:#fff}.content>ul>li[data-v-39fbe2ce]:nth-child(4n){margin-right:0}.content>ul>li[data-v-39fbe2ce]:hover{-webkit-box-shadow:3px 3px 5px 0 #d8d5d5;box-shadow:3px 3px 5px 0 #d8d5d5}.content>ul>li .img[data-v-39fbe2ce]{width:240px;height:180px;cursor:pointer;margin:10px 10px 0}.content>ul>li>p[data-v-39fbe2ce]{color:#313131;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 10px}.content>ul>li>p[data-v-39fbe2ce]:first-of-type{font-size:14px;color:#333;margin-top:1px}.content>ul>li>p[data-v-39fbe2ce]:nth-of-type(2){font-size:12px;color:#666;margin-top:12px}.content>ul>li>p[data-v-39fbe2ce]:nth-of-type(3){overflow:hidden;height:42px;padding:0 12px;background:#f9f9f9;margin:12px 0 0;line-height:42px}.content>ul>li>p>img[data-v-39fbe2ce]{display:inline-block;width:24px;border-radius:50%;cursor:pointer;vertical-align:-8px}.content>ul>li>p>span[data-v-39fbe2ce]:first-of-type{cursor:pointer}.content>ul>li>p>span[data-v-39fbe2ce]{vertical-align:top;font-size:14px}.category[data-v-39fbe2ce]{padding-top:25px;width:1000px;margin:0 auto}.category li[data-v-39fbe2ce]:hover{border-bottom:2px solid #d01667;cursor:pointer}.category li[data-v-39fbe2ce]{display:inline-block;margin-right:30px;font-size:16px;padding:4px 5px}.category li a[data-v-39fbe2ce]{color:#6c7279}.active[data-v-39fbe2ce]{border-bottom:2px solid #d01667}#project_text>li:last-child>p[data-v-39fbe2ce]:last-child{margin-bottom:0!important}',"",{version:3,sources:["C:/vue/projectInfo/src/components/WeChat.vue"],names:[],mappings:"AACA,uBACE,2EAA4E,AAC5E,sBAAuB,AACvB,YAAc,CACf,AACD,qBACE,0BAA+B,AAC/B,WAAY,AACZ,OAAQ,AACR,MAAO,AACP,WAAa,CACd,AACD,oBACE,eAAiB,CAClB,AACD,2BACE,YAAa,AACb,cAAe,AACf,WAAY,AACZ,8BAA+B,AACvB,sBAAuB,AAC/B,cAAe,AACf,iBAAkB,AAClB,sBAAwB,CACzB,AACD,qCACE,oBAA0B,AAC1B,YAAa,AACb,aAAc,AACd,gBAAiB,AACjB,iBAAmB,CACpB,AACD,yCACE,qBAAsB,AACtB,YAAa,AACb,aAAc,AACd,gBAAiB,AACjB,eAAgB,AAChB,iBAAmB,CACpB,AACD,2CACE,eAAgB,AAChB,kBAAmB,AACnB,YAAa,AACb,iBAAkB,AAClB,aAAe,CAChB,AACD,4CACE,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,eAAgB,AAChB,iBAAmB,CACpB,AACD,8DACE,mBAAoB,AACpB,iBAAmB,CACpB,AACD,8DACE,iBAAmB,CACpB,AACD,+BACE,gFAAiF,AACjF,qBAAsB,AACtB,WAAY,AACZ,YAAa,AACb,sBAAuB,AACvB,kBAAmB,AACnB,OAAS,CACV,AACD,uBACE,kBAAoB,CACrB,AACD,qBACE,gBAAiB,AACjB,eAAiB,CAClB,AACD,kCACE,WAAY,AACZ,eAAgB,AAChB,mBAAoB,AACpB,kBAAmB,AACnB,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,mBAAoB,AACpB,gBAAiB,AACjB,aAAe,CAChB,AACD,iCACE,WAAY,AACZ,cAAe,AACf,cAAe,AACf,cAAgB,CACjB,AACD,uCACE,aAAe,CAChB,AACD,sCACE,iBAAkB,AAClB,cAAgB,CACjB,AACD,0BACE,8BAA+B,AACvB,sBAAuB,AAC/B,aAAc,AACd,mBAAoB,AACpB,WAAa,CACd,AACD,6BAIE,eAAiB,CAClB,AACD,6DALE,gBAAiB,AACjB,8BAA+B,AACvB,qBAAuB,CAahC,AAVD,gCACE,YAAa,AACb,aAAc,AACd,WAAY,AAGZ,kBAAmB,AACnB,mBAAoB,AAEpB,eAAiB,CAClB,AACD,8CACE,cAAgB,CACjB,AACD,sCACE,yCAA0C,AAClC,gCAAkC,CAC3C,AACD,qCACE,YAAa,AACb,aAAc,AACd,eAAgB,AAChB,kBAAoB,CACrB,AACD,kCACE,cAAe,AACf,8BAA+B,AACvB,sBAAuB,AAC/B,cAAgB,CACjB,AACD,gDACE,eAAgB,AAChB,WAAY,AACZ,cAAgB,CACjB,AACD,iDACE,eAAgB,AAChB,WAAY,AACZ,eAAiB,CAClB,AACD,iDACE,gBAAiB,AACjB,YAAa,AACb,eAAgB,AAChB,mBAAoB,AACpB,gBAAiB,AACjB,gBAAkB,CACnB,AACD,sCACE,qBAAsB,AACtB,WAAY,AACZ,kBAAmB,AACnB,eAAgB,AAChB,mBAAqB,CACtB,AACD,qDACE,cAAgB,CACjB,AACD,uCACE,mBAAoB,AACpB,cAAgB,CACjB,AACD,2BACE,iBAAkB,AAClB,aAAc,AACd,aAAe,CAChB,AACD,oCACE,gCAAiC,AACjC,cAAgB,CACjB,AACD,8BACE,qBAAsB,AACtB,kBAAmB,AACnB,eAAgB,AAChB,eAAiB,CAClB,AACD,gCACE,aAAe,CAChB,AACD,yBACE,+BAAiC,CAClC,AACD,0DACE,yBAA4B,CAC7B",file:"WeChat.vue",sourcesContent:["\n.info[data-v-39fbe2ce] {\n  background: url('http://image.houxiaopang.com/workdetail/bg.png') no-repeat;\n  background-size: cover;\n  height: 340px;\n}\n.fg[data-v-39fbe2ce] {\n  background: rgba(0, 0, 0, 0.6);\n  width: 100%;\n  left: 0;\n  top: 0;\n  height: 100%;\n}\nul[data-v-39fbe2ce] {\n  list-style: none;\n}\n.userinfo[data-v-39fbe2ce] {\n  width: 600px;\n  margin: 0 auto;\n  z-index: 10;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #727272;\n  line-height: 40px;\n  padding: 15px 60px 50px;\n}\n.userinfo > .head_div[data-v-39fbe2ce] {\n  margin: -70px auto 0 auto;\n  width: 110px;\n  height: 110px;\n  background: #fff;\n  border-radius: 50%;\n}\n.userinfo > .head_div > img[data-v-39fbe2ce] {\n  display: inline-block;\n  width: 100px;\n  height: 100px;\n  margin-left: 5px;\n  margin-top: 5px;\n  border-radius: 50%;\n}\n.userinfo > p[data-v-39fbe2ce]:nth-of-type(1) {\n  font-size: 30px;\n  text-align: center;\n  height: 50px;\n  line-height: 50px;\n  color: #313131;\n}\n.userinfo > p[data-v-39fbe2ce]:nth-of-type(2) {\n  text-align: center;\n  color: #999;\n  height: 30px;\n  line-height: 30px;\n  font-size: 16px;\n  position: relative;\n}\n.userinfo > p:nth-of-type(2) > span[data-v-39fbe2ce]:nth-child(2) {\n  padding-right: 15px;\n  padding-left: 20px;\n}\n.userinfo > p:nth-of-type(2) > span[data-v-39fbe2ce]:nth-child(3) {\n  padding-left: 15px;\n}\n.userinfo > p > i[data-v-39fbe2ce] {\n  background: url('http://image.houxiaopang.com/workdetail/dingwei.png') no-repeat;\n  display: inline-block;\n  width: 12px;\n  height: 17px;\n  background-size: cover;\n  position: absolute;\n  top: 6px;\n}\n.main[data-v-39fbe2ce] {\n  background: #F5F5F5;\n}\n.sc[data-v-39fbe2ce] {\n  overflow: hidden;\n  margin-top: 20px;\n}\n.userinfo > .sc li[data-v-39fbe2ce] {\n  float: left;\n  padding: 0 25px;\n  border-radius: 25px;\n  text-align: center;\n  height: 30px;\n  line-height: 28px;\n  margin-right: 20px;\n  margin-bottom: 10px;\n  background: #eee;\n  color: #828282;\n}\n.userinfo > .more[data-v-39fbe2ce] {\n  width: 60px;\n  margin: 0 auto;\n  color: #c0bebe;\n  cursor: pointer;\n}\n.userinfo > .more[data-v-39fbe2ce]:hover {\n  color: #d01667;\n}\n.userinfo > .more > span[data-v-39fbe2ce] {\n  padding-left: 5px;\n  font-size: 14px;\n}\n.content[data-v-39fbe2ce] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 1100px;\n  margin: 20px auto 0;\n  height: 100%;\n}\n.content > ul[data-v-39fbe2ce] {\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  list-style: none;\n}\n.content > ul > li[data-v-39fbe2ce] {\n  width: 260px;\n  height: 295px;\n  float: left;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin-right: 19px;\n  margin-bottom: 25px;\n  overflow: hidden;\n  background: #fff;\n}\n.content > ul > li[data-v-39fbe2ce]:nth-child(4n) {\n  margin-right: 0;\n}\n.content > ul > li[data-v-39fbe2ce]:hover {\n  -webkit-box-shadow: 3px 3px 5px 0 #d8d5d5;\n          box-shadow: 3px 3px 5px 0 #d8d5d5;\n}\n.content > ul > li .img[data-v-39fbe2ce] {\n  width: 240px;\n  height: 180px;\n  cursor: pointer;\n  margin: 10px 10px 0;\n}\n.content > ul > li > p[data-v-39fbe2ce] {\n  color: #313131;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0 10px;\n}\n.content > ul > li > p[data-v-39fbe2ce]:nth-of-type(1) {\n  font-size: 14px;\n  color: #333;\n  margin-top: 1px;\n}\n.content > ul > li > p[data-v-39fbe2ce]:nth-of-type(2) {\n  font-size: 12px;\n  color: #666;\n  margin-top: 12px;\n}\n.content > ul > li > p[data-v-39fbe2ce]:nth-of-type(3) {\n  overflow: hidden;\n  height: 42px;\n  padding: 0 12px;\n  background: #f9f9f9;\n  margin: 12px 0 0;\n  line-height: 42px;\n}\n.content > ul > li > p > img[data-v-39fbe2ce] {\n  display: inline-block;\n  width: 24px;\n  border-radius: 50%;\n  cursor: pointer;\n  vertical-align: -8px;\n}\n.content > ul > li > p > span[data-v-39fbe2ce]:nth-of-type(1) {\n  cursor: pointer;\n}\n.content > ul > li > p > span[data-v-39fbe2ce] {\n  vertical-align: top;\n  font-size: 14px;\n}\n.category[data-v-39fbe2ce] {\n  padding-top: 25px;\n  width: 1000px;\n  margin: 0 auto;\n}\n.category li[data-v-39fbe2ce]:hover {\n  border-bottom: 2px solid #d01667;\n  cursor: pointer;\n}\n.category li[data-v-39fbe2ce] {\n  display: inline-block;\n  margin-right: 30px;\n  font-size: 16px;\n  padding: 4px 5px;\n}\n.category li a[data-v-39fbe2ce] {\n  color: #6c7279;\n}\n.active[data-v-39fbe2ce] {\n  border-bottom: 2px solid #d01667;\n}\n#project_text > li:last-child > p[data-v-39fbe2ce]:last-child {\n  margin-bottom: 0 !important;\n}\n"],sourceRoot:""}])},39:function(e,n,t){var i=t(36);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);t(22)("41fb952f",i,!0)},42:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[e._m(0),e._v(" "),t("div",{staticClass:"userinfo"},[t("div",{staticClass:"head_div"},[t("img",{attrs:{src:e.userinfo.headimg}})]),e._v(" "),t("p",{domProps:{innerHTML:e._s(e.userinfo.nickname)}}),e._v(" "),t("p",[t("i"),t("span",{domProps:{innerHTML:e._s(e.userinfo.city)}}),e._v("|"),t("span",{domProps:{innerHTML:e._s(e.setexp(e.userinfo.exp))}})]),e._v(" "),t("div",{staticClass:"sc"},[t("span",{staticStyle:{float:"left"}},[e._v("擅长领域：")]),e._v(" "),t("ul",{staticStyle:{float:"right",width:"313px","padding-top":"10px"}},e._l(e.userinfo.filed,function(n){return t("li",{domProps:{innerHTML:e._s(n)}})}))]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.userinfo.worktime.length>0,expression:"userinfo.worktime.length>0"}],staticClass:"worktime",staticStyle:{overflow:"hidden"}},[t("span",[e._v("可工作时间：")]),e._v(" "),t("ul",{staticStyle:{float:"right",width:"313px",color:"#313131","line-height":"28px","margin-top":"6px"}},e._l(e.userinfo.worktime,function(n){return t("li",{domProps:{innerHTML:e._s(e.formatWorktime(n))}})}))]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.userinfo.project_text.length>0,expression:"userinfo.project_text.length>0"}],staticStyle:{overflow:"hidden","margin-top":"20px"}},[t("span",{staticStyle:{float:"left"}},[e._v("项目经历：")]),e._v(" "),t("ul",{staticStyle:{float:"right",width:"313px","line-height":"20px","margin-top":"10px",height:"62px",overflow:"hidden"},attrs:{id:"project_text"}},e._l(e.userinfo.project_text,function(n){return t("li",[t("p",{staticStyle:{"font-weight":"600"},domProps:{innerHTML:e._s(n.title)}}),e._v(" "),t("p",{staticStyle:{"margin-bottom":"40px"},domProps:{innerHTML:e._s(n.desc)}})])}))]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.userinfo.project_text.length>0,expression:"userinfo.project_text.length>0"}],staticClass:"more",on:{click:e.showmore}},[t("i",{staticClass:"iconfont"},[e._v("")]),t("span",[e._v("展开")])])]),e._v(" "),t("div",{staticClass:"main"},[e._m(1),e._v(" "),t("div",{staticClass:"content"},[t("ul",{staticStyle:{overflow:"hidden"}},e._l(e.albums,function(n){return t("li",[t("img",{staticClass:"img",attrs:{src:n.cover},on:{click:function(t){e.jump({name:"project",id:n.work_id})}}}),e._v(" "),t("p",[t("span",{staticStyle:{"padding-left":"0px",cursor:"pointer","white-space":"nowrap",display:"inline-block",width:"100%",overflow:"hidden","text-overflow":"ellipsis"},attrs:{title:n.title},domProps:{innerHTML:e._s(n.title)},on:{click:function(t){e.jump({name:"project",id:n.work_id})}}})]),e._v(" "),t("p",{domProps:{innerHTML:e._s(e.myfilter(n.up_time))}}),e._v(" "),t("p",[t("img",{attrs:{src:n.headimg},on:{click:function(t){e.jump({name:"wechat",id:n.user_id})}}}),e._v(" "),t("span",{domProps:{innerHTML:e._s(n.username)},on:{click:function(t){e.jump({name:"wechat",id:n.user_id})}}}),e._v(" "),t("span",{staticStyle:{"font-size":"14px",float:"right","margin-right":"10px"},domProps:{innerHTML:e._s(n.category)}})])])})),e._v(" "),t("pagination",{attrs:{pageInfo:e.pageinfo},on:{change:e.pagechange}})],1)])])},staticRenderFns:[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"info"},[t("div",{staticClass:"fg"})])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticStyle:{height:"80px",background:"#fff","border-top":"1px solid #dedede"}},[t("ul",{staticClass:"category",attrs:{id:"category"}},[t("li",{staticClass:"active"},[t("a",[e._v("全部")])]),e._v(" "),t("li",[t("a",[e._v("PPT定制")])]),e._v(" "),t("li",[t("a",[e._v("UI设计")])]),e._v(" "),t("li",[t("a",[e._v("企业画册")])]),e._v(" "),t("li",[t("a",[e._v("海报展板")])]),e._v(" "),t("li",[t("a",[e._v("LOGO")])]),e._v(" "),t("li",[t("a",[e._v("企业形象设计VI")])])])])}]}}});
//# sourceMappingURL=1.e797e64dc51e701e6ee2.js.map