webpackJsonp([6],{BATS:function(t,e,i){var n=i("J90U");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("8bSs")("892ca3be",n,!0)},J90U:function(t,e,i){e=t.exports=i("BkJT")(!0),e.push([t.i,".warp[data-v-61d68967]{height:100%;position:relative;background:#fff;overflow:hidden}.active[data-v-61d68967]{color:#fe6549;border-bottom:1px solid #fe6549!important}.head[data-v-61d68967]{position:absolute;top:0;left:0;height:40px;width:100%;overflow-x:auto}.category[data-v-61d68967]{position:relative;height:40px;display:inline-block;white-space:nowrap}.category>span[data-v-61d68967]{display:inline-block;width:70px;height:40px;text-align:center;line-height:40px;border-bottom:1px solid transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:all .5s;transition:all .5s}.worklist[data-v-61d68967]{width:100%;position:absolute;top:40px;bottom:0;left:0;overflow-x:hidden;overflow-y:auto}.center[data-v-61d68967]{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.center[data-v-61d68967],.itemwarp[data-v-61d68967]{display:-webkit-box;display:-ms-flexbox;display:flex}.itemwarp[data-v-61d68967]{width:100%;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding:10px 5px;-ms-flex-flow:wrap;flex-flow:wrap}.item[data-v-61d68967]{width:49%;margin-bottom:10px;-webkit-box-shadow:1px 1px 5px #bbb;box-shadow:1px 1px 5px #bbb}.worklist>ul>li[data-v-61d68967]:nth-child(2n){float:right}.albuminfo[data-v-61d68967]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:3px 5px}","",{version:3,sources:["C:/vue/designer/src/components/Worklist.vue"],names:[],mappings:"AACA,uBACE,YAAa,AACb,kBAAmB,AACnB,gBAAiB,AACjB,eAAiB,CAClB,AACD,yBACE,cAAe,AACf,yCAA4C,CAC7C,AACD,uBACE,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,YAAa,AACb,WAAY,AACZ,eAAiB,CAClB,AACD,2BACE,kBAAmB,AACnB,YAAa,AACb,qBAAsB,AACtB,kBAAoB,CACrB,AACD,gCACE,qBAAsB,AACtB,WAAY,AACZ,YAAa,AACb,kBAAmB,AACnB,iBAAkB,AAClB,oCAAqC,AACrC,8BAA+B,AACvB,sBAAuB,AAC/B,2BAA4B,AAC5B,kBAAoB,CACrB,AACD,2BACE,WAAY,AACZ,kBAAmB,AACnB,SAAU,AACV,SAAU,AACV,OAAQ,AACR,kBAAmB,AACnB,eAAiB,CAClB,AACD,yBAIE,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,4BAA6B,AAC7B,6BAA8B,AAC1B,0BAA2B,AACvB,qBAAuB,CAChC,AACD,oDAdE,oBAAqB,AACrB,oBAAqB,AACrB,YAAc,CAuBf,AAXD,2BACE,WAAY,AAIZ,yBAA0B,AACtB,sBAAuB,AACnB,8BAA+B,AACvC,iBAAkB,AAClB,mBAAoB,AAChB,cAAgB,CACrB,AACD,uBACE,UAAW,AACX,mBAAoB,AACpB,oCAAqC,AAC7B,2BAA6B,CACtC,AACD,+CACE,WAAa,CACd,AACD,4BACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,4BAA6B,AAC7B,6BAA8B,AAC1B,0BAA2B,AACvB,sBAAuB,AAC/B,eAAiB,CAClB",file:"Worklist.vue",sourcesContent:["\n.warp[data-v-61d68967] {\n  height: 100%;\n  position: relative;\n  background: #fff;\n  overflow: hidden;\n}\n.active[data-v-61d68967] {\n  color: #fe6549;\n  border-bottom: 1px solid #fe6549 !important;\n}\n.head[data-v-61d68967] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 40px;\n  width: 100%;\n  overflow-x: auto;\n}\n.category[data-v-61d68967] {\n  position: relative;\n  height: 40px;\n  display: inline-block;\n  white-space: nowrap;\n}\n.category > span[data-v-61d68967] {\n  display: inline-block;\n  width: 70px;\n  height: 40px;\n  text-align: center;\n  line-height: 40px;\n  border-bottom: 1px solid transparent;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-transition: all .5s;\n  transition: all .5s;\n}\n.worklist[data-v-61d68967] {\n  width: 100%;\n  position: absolute;\n  top: 40px;\n  bottom: 0;\n  left: 0;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.center[data-v-61d68967] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.itemwarp[data-v-61d68967] {\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 10px 5px;\n  -ms-flex-flow: wrap;\n      flex-flow: wrap;\n}\n.item[data-v-61d68967] {\n  width: 49%;\n  margin-bottom: 10px;\n  -webkit-box-shadow: 1px 1px 5px #bbb;\n          box-shadow: 1px 1px 5px #bbb;\n}\n.worklist > ul > li[data-v-61d68967]:nth-child(2n) {\n  float: right;\n}\n.albuminfo[data-v-61d68967] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 3px 5px;\n}\n"],sourceRoot:""}])},bjtj:function(t,e,i){"use strict";function n(t){i("BATS")}Object.defineProperty(e,"__esModule",{value:!0});var A=i("h2rZ"),a=i("y229"),o=i("46Yf"),l=n,s=o(A.a,a.a,!1,l,"data-v-61d68967",null);e.default=s.exports},h2rZ:function(t,e,i){"use strict";e.a={data:function(){return{catelist:[{val:"全部",active:"active"},{val:"PPT",active:""},{val:"UI",active:""},{val:"文本画册",active:""},{val:"海报展板",active:""},{val:"LOGO",active:""},{val:"企业形象（VI）",active:""}],albumlist:[],category:-1}},created:function(){this.getworklist(-1)},methods:{setimg:function(t){return t+"?imageView2/2/w/375"},choosecate:function(t){var e=this;this.catelist.forEach(function(i,n){i.active="",t===n&&(i.active="active",e.category=0===t?-1:t,e.getworklist(e.category))})},next:function(t){this.$router.push({name:"workinfo",params:{id:t}})},setcate:function(t){var t=t;return 1===t?t="PPT":2===t?t="UI":3===t?t="文本画册":4===t?t="海报展览":5===t?t="LOGO":6===t?t="企业形象设计（VI）":0===t&&(t="测试品类"),t},getworklist:function(t){showload("加载中···");var e=this;ajax({url:"https://www.houxiaopang.com/api/v1.1/designerdash/collection",token:!0,data:{category:t},success:function(t){0===t.code&&(e.albumlist=t.data),hideload()},error:function(){hideload(),showModal("网络拥挤，请稍后再试。")}})}}}},y229:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"warp"},[i("div",{staticClass:"head"},[i("div",{staticClass:"category"},t._l(t.catelist,function(e,n){return i("span",{class:e.active,on:{click:function(e){t.choosecate(n)}}},[t._v(t._s(e.val))])}))]),t._v(" "),t.albumlist.length>0?i("div",{staticClass:"worklist",attrs:{id:"worklist"}},[i("div",{staticClass:"itemwarp"},t._l(t.albumlist,function(e,n){return i("div",{key:n,staticClass:"item",attrs:{id:"container"},on:{click:function(i){t.next(e.album_id)}}},[i("img",{directives:[{name:"lazyload",rawName:"v-lazyload",value:t.setimg(e.cover_url),expression:"setimg(item.cover_url)"}],staticStyle:{width:"100%",display:"block"}}),t._v(" "),i("div",{staticClass:"albuminfo"},[i("p",{staticStyle:{padding:"2px 0"}},[t._v(t._s(e.title))]),t._v(" "),i("span",{staticStyle:{padding:"2px 0",color:"#999","font-size":"12px"}},[t._v(t._s(t.setcate(e.category)))])])])}))]):t._e(),t._v(" "),0===t.albumlist.length?i("div",{staticClass:"worklist center"},[i("img",{attrs:{src:"http://image.houxiaopang.com/wx/web/none.png",alt:""}}),t._v(" "),i("p",{staticStyle:{color:"#999","margin-top":"10px"}},[t._v("没有任何作品")])]):t._e()])},A=[],a={render:n,staticRenderFns:A};e.a=a}});
//# sourceMappingURL=6.f0c6a0cf89090afd4a5d.js.map