webpackJsonp([0],{24:function(n,t,a){function o(n){a(38)}var i=a(0)(a(32),a(41),o,"data-v-1395fcd0",null);n.exports=i.exports},26:function(n,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a(1);t.default={props:["pageInfo"],computed:{page:function(){return Math.ceil(this.pageInfo.total/this.pageInfo.pagenum)},setList:function(){var n=this.page,t=[],a=[],o=Math.floor(this.pageInfo.pagegroup/2),i=this.pageInfo.current;if(n<=this.pageInfo.pagegroup){for(;n--;)t.push({text:this.page-n,val:this.page-n});return t}for(;n--;)t.push(this.page-n);var e=t.indexOf(i);e<o&&(i=i+o-e),this.pageInfo.current>this.page-o&&(i=this.page-o),t=t.splice(i-o-1,this.pageInfo.pagegroup);do{var r=t.shift();a.push({text:r,val:r})}while(t.length);return this.page>this.pageInfo.pagegroup&&(this.pageInfo.current>o+1&&a.unshift({text:"...",val:a[0].val-1}),this.pageInfo.current<this.page-o&&a.push({text:"...",val:a[a.length-1].val+1})),a}},methods:{clickCurrent:function(n){this.pageInfo.current!=n&&n>0&&n<this.page+1&&(this.pageInfo.current=n,this.$emit("change",this.pageInfo.current))}}}},27:function(n,t,a){t=n.exports=a(21)(!0),t.push([n.i,".pages-wrap[data-v-18355922]{text-align:center}.pagination[data-v-18355922]{display:inline-block;padding-left:0;margin:20px 0;border-radius:4px}.pagination>li[data-v-18355922]{display:inline}.pagination>.active>a[data-v-18355922],.pagination>.active>a[data-v-18355922]:hover,.pagination>.active>span[data-v-18355922],.pagination>.active>span[data-v-18355922]:hover{z-index:3;color:#fff;cursor:default;background-color:#337ab7;border-color:#337ab7}.pagination>.disabled>a[data-v-18355922],.pagination>.disabled>a[data-v-18355922]:hover,.pagination>.disabled>span[data-v-18355922],.pagination>.disabled>span[data-v-18355922]:hover{color:#777;cursor:not-allowed;background-color:#fff;border-color:#ddd}.pagination>li>a[data-v-18355922]:hover,.pagination>li>span[data-v-18355922]:hover{z-index:2;color:#fff;background-color:#d01667;border-color:#d01667}.pagination>li>a[data-v-18355922],.pagination>li>span[data-v-18355922]{position:relative;float:left;padding:6px 12px;margin-left:-1px;line-height:1.42857143;color:#000;text-decoration:none;background-color:#fff;border:1px solid #ddd}","",{version:3,sources:["C:/vue/projectInfo/src/components/Pagination.vue"],names:[],mappings:"AACA,6BACE,iBAAmB,CACpB,AACD,6BACE,qBAAsB,AACtB,eAAgB,AAChB,cAAe,AACf,iBAAmB,CACpB,AACD,gCACE,cAAgB,CACjB,AACD,8KACE,UAAW,AACX,WAAY,AACZ,eAAgB,AAChB,yBAA0B,AAC1B,oBAAsB,CACvB,AACD,sLACE,WAAY,AACZ,mBAAoB,AACpB,sBAAuB,AACvB,iBAAmB,CACpB,AACD,mFACE,UAAW,AACX,WAAY,AACZ,yBAA0B,AAC1B,oBAAsB,CACvB,AACD,uEACE,kBAAmB,AACnB,WAAY,AACZ,iBAAkB,AAClB,iBAAkB,AAClB,uBAAwB,AACxB,WAAY,AACZ,qBAAsB,AACtB,sBAAuB,AACvB,qBAAuB,CACxB",file:"Pagination.vue",sourcesContent:["\n.pages-wrap[data-v-18355922] {\n  text-align: center;\n}\n.pagination[data-v-18355922] {\n  display: inline-block;\n  padding-left: 0;\n  margin: 20px 0;\n  border-radius: 4px;\n}\n.pagination > li[data-v-18355922] {\n  display: inline;\n}\n.pagination > .active > a[data-v-18355922], .pagination > .active > a[data-v-18355922]:hover, .pagination > .active > span[data-v-18355922], .pagination > .active > span[data-v-18355922]:hover {\n  z-index: 3;\n  color: #fff;\n  cursor: default;\n  background-color: #337ab7;\n  border-color: #337ab7;\n}\n.pagination > .disabled > a[data-v-18355922], .pagination > .disabled > a[data-v-18355922]:hover, .pagination > .disabled > span[data-v-18355922], .pagination > .disabled > span[data-v-18355922]:hover {\n  color: #777;\n  cursor: not-allowed;\n  background-color: #fff;\n  border-color: #ddd;\n}\n.pagination > li > a[data-v-18355922]:hover, .pagination > li > span[data-v-18355922]:hover {\n  z-index: 2;\n  color: #FFF;\n  background-color: #d01667;\n  border-color: #d01667;\n}\n.pagination > li > a[data-v-18355922], .pagination > li > span[data-v-18355922] {\n  position: relative;\n  float: left;\n  padding: 6px 12px;\n  margin-left: -1px;\n  line-height: 1.42857143;\n  color: #000;\n  text-decoration: none;\n  background-color: #fff;\n  border: 1px solid #ddd;\n}\n"],sourceRoot:""}])},28:function(n,t,a){var o=a(27);"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);a(22)("271531d7",o,!0)},29:function(n,t,a){function o(n){a(28)}var i=a(0)(a(26),a(30),o,"data-v-18355922",null);n.exports=i.exports},30:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("section",{directives:[{name:"show",rawName:"v-show",value:n.pageInfo.total>n.pageInfo.pagenum,expression:"pageInfo.total>pageInfo.pagenum"}],staticClass:"pages-wrap"},[a("ul",{staticClass:"pagination clearfix"},[a("li",{class:{disabled:1==n.pageInfo.current}},[a("a",{attrs:{href:"javascript:;"},on:{click:function(t){n.clickCurrent(1)}}},[n._v(" 首页 ")])]),n._v(" "),a("li",{class:{disabled:1==n.pageInfo.current}},[a("a",{attrs:{href:"javascript:;"},on:{click:function(t){n.clickCurrent(n.pageInfo.current-1)}}},[n._v(" 上一页 ")])]),n._v(" "),n._l(n.setList,function(t){return a("li",{class:{active:n.pageInfo.current==t.val}},[n.pageInfo.current==t.val?a("a",{style:{backgroundColor:n.pageInfo.skin,borderColor:n.pageInfo.skin},attrs:{href:"javascript:;"},on:{click:function(a){n.clickCurrent(t.val)}}},[n._v(" "+n._s(t.text)+" ")]):a("a",{attrs:{href:"javascript:;"},on:{click:function(a){n.clickCurrent(t.val)}}},[n._v(" "+n._s(t.text)+" ")])])}),n._v(" "),a("li",{class:{disabled:n.pageInfo.current==n.page}},[a("a",{attrs:{href:"javascript:;"},on:{click:function(t){n.clickCurrent(n.pageInfo.current+1)}}},[n._v("\n      下一页")])]),n._v(" "),a("li",{class:{disabled:n.pageInfo.current==n.page}},[a("a",{attrs:{href:"javascript:;"},on:{click:function(t){n.clickCurrent(n.page)}}},[n._v(" 尾页 ")])])],2)])},staticRenderFns:[]}},32:function(n,t,a){"use strict";function o(n){return Date.parse(n.replace(/-/gi,"/"))}function i(n){var t=(new Date).getTime(),a=t-n,o=a/2592e6,i=a/6048e5,e=a/864e5,r=a/36e5,A=a/6e4,c="刚刚";return o>=1?c=parseInt(o)+"个月前":i>=1?c=parseInt(i)+"周前":e>=1?c=parseInt(e)+"天前":r>=1?c=parseInt(r)+"小时前":A>=1&&(c=parseInt(A)+"分钟前"),c}Object.defineProperty(t,"__esModule",{value:!0});var e=a(29),r=a.n(e);t.default={data:function(){return{albums:[],categroy:"-1",pageinfo:{total:0,pagenum:20,current:1,pagegroup:5,skin:"#d01667"}}},mounted:function(){this.chooseCategory()},components:{pagination:r.a},methods:{jump:function(n){var t=n.id;"project"===n.name?(_czc.push(["_trackEvent","查看作品详情","点击",t]),window.open("http://houxiaopang.com/workdetail/#/album/"+t)):"wechat"===n.name&&(_czc.push(["_trackEvent","查看简历","点击",t]),window.open("http://houxiaopang.com/workdetail/#/user/"+t))},pagechange:function(n){this.getdata(this.categroy,n)},chooseCategory:function(){for(var n=this,t=document.getElementById("category").children,a=0,o=t.length;a<o;a++)t[a].index=a,t[a].onclick=function(){$("#category").find("li").each(function(){$(this).removeClass("active")}),$(this).addClass("active"),0==this.index&&(this.index=-1),n.pageinfo.current=1,n.categroy=this.index,_czc.push(["_trackEvent","查看设计品类","点击",n.categroy]),n.getdata(n.categroy,n.pageinfo.current)}},myfilter:function(n){return i(o(n))},getdata:function(n,t){var a=this;$.ajax({type:"get",url:"http://www.houxiaopang.com/api/v1.1/allwork",data:{category:n,page:t},success:function(n){if(0===n.code){window.scrollTo(0,0),a.albums=[],a.pageinfo.total=n.data.total;for(var t=n.data.album,o=0,i=t.length;o<i;o++){var e=t[o].category;1==e?e="PPT":2==e?e="UI":3==e?e="文本画册":4==e?e="海报展板":5==e?e="LOGO":6==e?e="企业形象设计（VI）":0==e&&(e="测试品类"),t[o].category=e,a.albums.push(t[o])}}else alert("网络拥挤，请稍后再试···")},error:function(){alert("网络拥挤，请稍后再试···")}})}},created:function(){this.getdata(this.categroy,this.pageinfo.current)}}},35:function(n,t,a){t=n.exports=a(21)(!0),t.push([n.i,"ul[data-v-1395fcd0]{list-style:none}.main[data-v-1395fcd0]{background:#f5f5f5}.content[data-v-1395fcd0]{-webkit-box-sizing:border-box;box-sizing:border-box;width:1100px;margin:20px auto 0;height:100%}.content>ul[data-v-1395fcd0]{list-style:none}.content>ul>li[data-v-1395fcd0],.content>ul[data-v-1395fcd0]{overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}.content>ul>li[data-v-1395fcd0]{width:260px;height:295px;float:left;margin-right:19px;margin-bottom:25px;background:#fff}.content>ul>li[data-v-1395fcd0]:nth-child(4n){margin-right:0}.content>ul>li[data-v-1395fcd0]:hover{-webkit-box-shadow:3px 3px 5px 0 #d8d5d5;box-shadow:3px 3px 5px 0 #d8d5d5}.content>ul>li .img[data-v-1395fcd0]{width:240px;height:180px;cursor:pointer;margin:10px 10px 0}.content>ul>li>p[data-v-1395fcd0]{color:#313131;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 10px}.content>ul>li>p[data-v-1395fcd0]:first-of-type{font-size:14px;color:#333;margin-top:1px}.content>ul>li>p[data-v-1395fcd0]:nth-of-type(2){font-size:12px;color:#666;margin-top:12px}.content>ul>li>p[data-v-1395fcd0]:nth-of-type(3){overflow:hidden;height:42px;padding:0 12px;background:#f9f9f9;margin:12px 0 0;line-height:42px}.content>ul>li>p>img[data-v-1395fcd0]{display:inline-block;width:24px;border-radius:50%;cursor:pointer;vertical-align:-8px}.content>ul>li>p>span[data-v-1395fcd0]:first-of-type{cursor:pointer}.content>ul>li>p>span[data-v-1395fcd0]{vertical-align:top;font-size:14px}.category[data-v-1395fcd0]{padding-top:25px;width:1000px;margin:0 auto}.category li[data-v-1395fcd0]:hover{border-bottom:2px solid #d01667;cursor:pointer}.category li[data-v-1395fcd0]{display:inline-block;margin-right:30px;font-size:16px;padding:4px 5px}.category li a[data-v-1395fcd0]{color:#313131}.active[data-v-1395fcd0]{border-bottom:2px solid #d01667}.active>a[data-v-1395fcd0]{color:#d01667!important}","",{version:3,sources:["C:/vue/projectInfo/src/components/Workall.vue"],names:[],mappings:"AACA,oBACE,eAAiB,CAClB,AACD,uBACE,kBAAoB,CACrB,AACD,0BACE,8BAA+B,AACvB,sBAAuB,AAC/B,aAAc,AACd,mBAAoB,AACpB,WAAa,CACd,AACD,6BAIE,eAAiB,CAClB,AACD,6DALE,gBAAiB,AACjB,8BAA+B,AACvB,qBAAuB,CAahC,AAVD,gCACE,YAAa,AACb,aAAc,AACd,WAAY,AAGZ,kBAAmB,AACnB,mBAAoB,AAEpB,eAAiB,CAClB,AACD,8CACE,cAAgB,CACjB,AACD,sCACE,yCAA0C,AAClC,gCAAkC,CAC3C,AACD,qCACE,YAAa,AACb,aAAc,AACd,eAAgB,AAChB,kBAAoB,CACrB,AACD,kCACE,cAAe,AACf,8BAA+B,AACvB,sBAAuB,AAC/B,cAAgB,CACjB,AACD,gDACE,eAAgB,AAChB,WAAY,AACZ,cAAgB,CACjB,AACD,iDACE,eAAgB,AAChB,WAAY,AACZ,eAAiB,CAClB,AACD,iDACE,gBAAiB,AACjB,YAAa,AACb,eAAgB,AAChB,mBAAoB,AACpB,gBAAiB,AACjB,gBAAkB,CACnB,AACD,sCACE,qBAAsB,AACtB,WAAY,AACZ,kBAAmB,AACnB,eAAgB,AAChB,mBAAqB,CACtB,AACD,qDACE,cAAgB,CACjB,AACD,uCACE,mBAAoB,AACpB,cAAgB,CACjB,AACD,2BACE,iBAAkB,AAClB,aAAc,AACd,aAAe,CAChB,AACD,oCACE,gCAAiC,AACjC,cAAgB,CACjB,AACD,8BACE,qBAAsB,AACtB,kBAAmB,AACnB,eAAgB,AAChB,eAAiB,CAClB,AACD,gCACE,aAAe,CAChB,AACD,yBACE,+BAAiC,CAClC,AACD,2BACE,uBAA0B,CAC3B",file:"Workall.vue",sourcesContent:["\nul[data-v-1395fcd0] {\n  list-style: none;\n}\n.main[data-v-1395fcd0] {\n  background: #F5F5F5;\n}\n.content[data-v-1395fcd0] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 1100px;\n  margin: 20px auto 0;\n  height: 100%;\n}\n.content > ul[data-v-1395fcd0] {\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  list-style: none;\n}\n.content > ul > li[data-v-1395fcd0] {\n  width: 260px;\n  height: 295px;\n  float: left;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin-right: 19px;\n  margin-bottom: 25px;\n  overflow: hidden;\n  background: #fff;\n}\n.content > ul > li[data-v-1395fcd0]:nth-child(4n) {\n  margin-right: 0;\n}\n.content > ul > li[data-v-1395fcd0]:hover {\n  -webkit-box-shadow: 3px 3px 5px 0 #d8d5d5;\n          box-shadow: 3px 3px 5px 0 #d8d5d5;\n}\n.content > ul > li .img[data-v-1395fcd0] {\n  width: 240px;\n  height: 180px;\n  cursor: pointer;\n  margin: 10px 10px 0;\n}\n.content > ul > li > p[data-v-1395fcd0] {\n  color: #313131;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0 10px;\n}\n.content > ul > li > p[data-v-1395fcd0]:nth-of-type(1) {\n  font-size: 14px;\n  color: #333;\n  margin-top: 1px;\n}\n.content > ul > li > p[data-v-1395fcd0]:nth-of-type(2) {\n  font-size: 12px;\n  color: #666;\n  margin-top: 12px;\n}\n.content > ul > li > p[data-v-1395fcd0]:nth-of-type(3) {\n  overflow: hidden;\n  height: 42px;\n  padding: 0 12px;\n  background: #f9f9f9;\n  margin: 12px 0 0;\n  line-height: 42px;\n}\n.content > ul > li > p > img[data-v-1395fcd0] {\n  display: inline-block;\n  width: 24px;\n  border-radius: 50%;\n  cursor: pointer;\n  vertical-align: -8px;\n}\n.content > ul > li > p > span[data-v-1395fcd0]:nth-of-type(1) {\n  cursor: pointer;\n}\n.content > ul > li > p > span[data-v-1395fcd0] {\n  vertical-align: top;\n  font-size: 14px;\n}\n.category[data-v-1395fcd0] {\n  padding-top: 25px;\n  width: 1000px;\n  margin: 0 auto;\n}\n.category li[data-v-1395fcd0]:hover {\n  border-bottom: 2px solid #d01667;\n  cursor: pointer;\n}\n.category li[data-v-1395fcd0] {\n  display: inline-block;\n  margin-right: 30px;\n  font-size: 16px;\n  padding: 4px 5px;\n}\n.category li a[data-v-1395fcd0] {\n  color: #313131;\n}\n.active[data-v-1395fcd0] {\n  border-bottom: 2px solid #d01667;\n}\n.active > a[data-v-1395fcd0] {\n  color: #d01667 !important;\n}\n"],sourceRoot:""}])},38:function(n,t,a){var o=a(35);"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);a(22)("5a0dd78e",o,!0)},41:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("div",[a("div",{staticClass:"main"},[n._m(0),n._v(" "),a("div",{staticClass:"content"},[a("ul",{staticStyle:{overflow:"hidden"},attrs:{id:"albumsList"}},n._l(n.albums,function(t){return a("li",[a("img",{staticClass:"img",attrs:{src:t.cover},on:{click:function(a){n.jump({name:"project",id:t.work_id})}}}),n._v(" "),a("p",[a("span",{staticStyle:{"padding-left":"0px",cursor:"pointer","white-space":"nowrap",display:"inline-block",width:"100%",overflow:"hidden","text-overflow":"ellipsis"},attrs:{title:t.title},domProps:{innerHTML:n._s(t.title)},on:{click:function(a){n.jump({name:"project",id:t.work_id})}}})]),n._v(" "),a("p",{domProps:{innerHTML:n._s(n.myfilter(t.up_time))}}),n._v(" "),a("p",[a("img",{attrs:{src:t.headimg},on:{click:function(a){n.jump({name:"wechat",id:t.user_id})}}}),n._v(" "),a("span",{staticStyle:{color:"#666"},domProps:{innerHTML:n._s(t.username)},on:{click:function(a){n.jump({name:"wechat",id:t.user_id})}}}),n._v(" "),a("span",{staticStyle:{"font-size":"14px",float:"right",color:"#000"},domProps:{innerHTML:n._s(t.category)}})])])})),n._v(" "),a("pagination",{attrs:{pageInfo:n.pageinfo},on:{change:n.pagechange}})],1)])])},staticRenderFns:[function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("div",{staticStyle:{height:"80px",background:"#fff","border-top":"1px solid #dedede"}},[a("ul",{staticClass:"category",attrs:{id:"category"}},[a("li",{staticClass:"active"},[a("a",[n._v("全部")])]),n._v(" "),a("li",[a("a",[n._v("PPT定制")])]),n._v(" "),a("li",[a("a",[n._v("UI设计")])]),n._v(" "),a("li",[a("a",[n._v("企业画册")])]),n._v(" "),a("li",[a("a",[n._v("海报展板")])]),n._v(" "),a("li",[a("a",[n._v("LOGO")])]),n._v(" "),a("li",[a("a",[n._v("企业形象设计VI")])])])])}]}}});
//# sourceMappingURL=0.05e3e40400632edaed82.js.map