webpackJsonp([2],{25:function(t,n,o){function e(t){o(37)}var i=o(0)(o(33),o(40),e,"data-v-12d62c8f",null);t.exports=i.exports},33:function(t,n,o){"use strict";function e(){document.body.onmouseup=function(t){var n=document.getElementById("banbox");2===t.button&&"loadlazy"===t.target.className?(document.oncontextmenu=function(){return!1},n.style.top=t.pageY+"px",n.style.left=t.pageX+"px",n.style.display="block"):(n.style.display="none",document.oncontextmenu=function(){return!0})}}function i(t){var t=t;return 1==t?t="PPT":2==t?t="UI":3==t?t="文本画册":4==t?t="海报展览":5==t?t="LOGO":6==t?t="企业形象设计（VI）":0==t&&(t="测试品类"),t}Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"project",data:function(){return{projectinfo:{},modelshow:!1}},created:function(){this.getingf(this.$route.params.id)},components:{},mounted:function(){},methods:{getingf:function(t){var n=this;$.ajax({type:"GET",url:"http://www.houxiaopang.com/api/v1.1/albumdetail",data:{album_id:t},success:function(t){0===t.code?(n.projectinfo=t.data,t.data.not_saved||e(),n.projectinfo.category=i(n.projectinfo.category),n.$nextTick(function(){$("img.loadlazy").lazyload({effect:"fadeIn"})})):location.href="http://houxiaopang.com/404"}})}}}},34:function(t,n,o){n=t.exports=o(21)(!0),n.push([t.i,".top[data-v-12d62c8f]{width:1000px;margin:0 auto;position:relative}a[data-v-12d62c8f]{text-decoration:none;color:#313131}.top>.head[data-v-12d62c8f]{position:absolute;top:33%;right:0;cursor:pointer}.top>.head img[data-v-12d62c8f]{display:inline-block;width:50px;height:50px;border-radius:50%}.top>.head span[data-v-12d62c8f]{vertical-align:top;line-height:50px;color:#313131;font-size:16px;margin-right:10px}.title[data-v-12d62c8f]{font-size:32px;font-weight:700;line-height:130px}.desc[data-v-12d62c8f]{color:#313131;font-size:20px;line-height:30px;clear:both;text-align:left;margin:18px 0 45px}.time[data-v-12d62c8f]{font-size:15px;color:#969899;line-height:30px;float:right}.category[data-v-12d62c8f],.otherMsg[data-v-12d62c8f]{float:left}.category[data-v-12d62c8f],.otherMsg>ul[data-v-12d62c8f]{list-style:none;overflow:hidden}.category>ul>li[data-v-12d62c8f]{padding:0 20px;border-radius:25px;border:1px solid #dcdee0;margin-right:25px}.category>ul>li[data-v-12d62c8f],.otherMsg>ul>li[data-v-12d62c8f]{width:auto;text-align:center;height:30px;line-height:30px;float:left;color:#969899}.otherMsg>ul>li[data-v-12d62c8f]{padding:0 5px}.otherMsg>ul>li[data-v-12d62c8f]:first-child{margin-right:25px}.work[data-v-12d62c8f]{width:100%;background:#fff;overflow:hidden;margin-top:120px;border-top:1px solid #bbb;padding:0 0 150px}.worklist[data-v-12d62c8f]{width:1000px;margin:0 auto;text-align:center;background:#fff}.loadlazy[data-v-12d62c8f]{cursor:pointer;max-width:1000px;display:block;margin:10px auto}.ban_box[data-v-12d62c8f]{position:absolute;background:#222;display:none;font-size:12px;color:#fff;border-radius:5px;padding:10px 15px}","",{version:3,sources:["C:/vue/projectInfo/src/components/projectinfo.vue"],names:[],mappings:"AACA,sBACI,aAAc,AACd,cAAe,AACf,iBAAmB,CACtB,AACD,mBACC,qBAAqB,AACrB,aAAe,CACf,AACD,4BACI,kBAAmB,AACnB,QAAS,AACT,QAAS,AACT,cAAgB,CACnB,AACD,gCACI,qBAAsB,AACtB,WAAY,AACZ,YAAa,AACb,iBAAmB,CACtB,AACD,iCACI,mBAAoB,AACpB,iBAAkB,AAClB,cAAe,AACf,eAAgB,AAChB,iBAAmB,CACtB,AACD,wBACI,eAAgB,AAChB,gBAAiB,AACjB,iBAAmB,CACtB,AACD,uBACI,cAAe,AACf,eAAgB,AAChB,iBAAkB,AAClB,WAAY,AACZ,gBAAiB,AACjB,kBAAoB,CACvB,AACD,uBACI,eAAgB,AAChB,cAAe,AACf,iBAAkB,AAClB,WAAa,CAChB,AACD,sDACI,UAAY,CACf,AACD,yDACI,gBAAiB,AACjB,eAAiB,CACpB,AACD,iCAEI,eAAgB,AAIhB,mBAAoB,AAEpB,yBAA0B,AAC1B,iBAAmB,CAEtB,AACD,kEAXI,WAAY,AAEZ,kBAAmB,AACnB,YAAa,AACb,iBAAkB,AAElB,WAAY,AAGZ,aAAe,CAUlB,AARD,iCAEI,aAAe,CAMlB,AACD,6CAEI,iBAAmB,CACtB,AACD,uBACI,WAAY,AACZ,gBAAoB,AACpB,gBAAiB,AACjB,iBAAkB,AAClB,0BAA2B,AAC3B,iBAAmB,CACtB,AACD,2BACI,aAAc,AACd,cAAe,AACf,kBAAmB,AACnB,eAAiB,CACpB,AAeD,2BACI,eAAgB,AAChB,iBAAkB,AAClB,cAAe,AACf,gBAAkB,CACrB,AACD,0BACI,kBAAkB,AAClB,gBAAiB,AACjB,aAAc,AACd,eAAgB,AAChB,WAAe,AACf,kBAAmB,AACnB,iBAAmB,CACtB",file:"projectinfo.vue",sourcesContent:["\n.top[data-v-12d62c8f] {\n    width: 1000px;\n    margin: 0 auto;\n    position: relative;\n}\na[data-v-12d62c8f]{\n\ttext-decoration:none;\n\tcolor: #313131;\n}\n.top > .head[data-v-12d62c8f] {\n    position: absolute;\n    top: 33%;\n    right: 0;\n    cursor: pointer;\n}\n.top > .head img[data-v-12d62c8f] {\n    display: inline-block;\n    width: 50px;\n    height: 50px;\n    border-radius: 50%;\n}\n.top > .head span[data-v-12d62c8f] {\n    vertical-align: top;\n    line-height: 50px;\n    color: #313131;\n    font-size: 16px;\n    margin-right: 10px;\n}\n.title[data-v-12d62c8f] {\n    font-size: 32px;\n    font-weight: 700;\n    line-height: 130px;\n}\n.desc[data-v-12d62c8f] {\n    color: #313131;\n    font-size: 20px;\n    line-height: 30px;\n    clear: both;\n    text-align: left;\n    margin: 18px 0 45px;\n}\n.time[data-v-12d62c8f] {\n    font-size: 15px;\n    color: #969899;\n    line-height: 30px;\n    float: right;\n}\n.category[data-v-12d62c8f],.otherMsg[data-v-12d62c8f] {\n    float: left;\n}\n.category[data-v-12d62c8f],.otherMsg > ul[data-v-12d62c8f] {\n    list-style: none;\n    overflow: hidden;\n}\n.category > ul > li[data-v-12d62c8f] {\n    width: auto;\n    padding: 0 20px;\n    text-align: center;\n    height: 30px;\n    line-height: 30px;\n    border-radius: 25px;\n    float: left;\n    border: 1px solid #dcdee0;;\n    margin-right: 25px;\n    color: #969899;\n}\n.otherMsg >ul >li[data-v-12d62c8f]{\n    width: auto;\n    padding: 0 5px;\n    text-align: center;\n    height: 30px;\n    line-height: 30px;\n    float: left;\n    color: #969899;\n}\n.otherMsg >ul >li[data-v-12d62c8f]:first-child{\n\n    margin-right: 25px;\n}\n.work[data-v-12d62c8f] {\n    width: 100%;\n    background: #ffffff;\n    overflow: hidden;\n    margin-top: 120px;\n    border-top: 1px solid #bbb;\n    padding: 0 0 150px;\n}\n.worklist[data-v-12d62c8f] {\n    width: 1000px;\n    margin: 0 auto;\n    text-align: center;\n    background: #fff;\n}\n\n  /*.worklist > ul {\n    list-style: none;\n    column-count: 2;\n  }\n\n  .worklist ul li {\n    float: left;\n    width: 450px;\n    margin-bottom: 50px;\n    margin-right: 25px;\n    cursor: pointer;\n    box-shadow: 1px 1px 5px 0 #8e8a8a;\n  }*/\n.loadlazy[data-v-12d62c8f] {\n    cursor: pointer;\n    max-width: 1000px;\n    display: block;\n    margin: 10px auto;\n}\n.ban_box[data-v-12d62c8f]{\n    position:absolute;\n    background: #222;\n    display: none;\n    font-size: 12px;\n    color: #ffffff;\n    border-radius: 5px;\n    padding: 10px 15px;\n}\n"],sourceRoot:""}])},37:function(t,n,o){var e=o(34);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);o(22)("766986f7",e,!0)},40:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",[o("div",{staticClass:"top"},[o("div",{staticClass:"head"},[o("a",{attrs:{href:"http://houxiaopang.com/workdetail/user/"+t.projectinfo.belong_id,target:"_blank"}},[o("img",{attrs:{src:t.projectinfo.belong_head}}),t._v(" "),o("span",[t._v("　"+t._s(t.projectinfo.belong_nick))])])]),t._v(" "),o("div",{staticClass:"title"},[t._v(t._s(t.projectinfo.title))]),t._v(" "),o("div",{staticClass:"category"},[o("ul",[o("li",[t._v(t._s(t.projectinfo.category))])])]),t._v(" "),o("div",{staticClass:"otherMsg"},[o("ul",["无"!==t.projectinfo.price&&t.projectinfo.price?o("li",[t._v("参考价格："+t._s(t.projectinfo.price))]):t._e(),t._v(" "),t.projectinfo.not_business?o("li",[t._v("禁止商用;")]):t._e(),t._v(" "),t.projectinfo.not_anonymous?o("li",[t._v("禁止转载;")]):t._e(),t._v(" "),t.projectinfo.not_single?o("li",[t._v("禁止个人使用")]):t._e()])]),t._v(" "),o("div",{staticClass:"time"},[t._v(t._s(t.projectinfo.up_time))])]),t._v(" "),o("div",{staticClass:"work"},[o("div",{staticClass:"worklist"},[o("div",{staticClass:"desc",domProps:{innerHTML:t._s(t.projectinfo.description)}}),t._v(" "),t._m(0),t._v(" "),t._l(t.projectinfo.works,function(t){return o("img",{staticClass:"loadlazy",attrs:{"data-original":t,alt:"",ondragstart:"return false;"}})})],2)])])},staticRenderFns:[function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"ban_box",attrs:{id:"banbox"}},[o("span",[t._v("作者设置了隐私保护，禁止保存到本地")])])}]}}});
//# sourceMappingURL=2.82df7a0bdb1a114daa23.js.map