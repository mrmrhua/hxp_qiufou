webpackJsonp([2],{14:function(i,n,t){function A(i){t(30)}var o=t(3)(t(18),t(35),A,null,null);i.exports=o.exports},18:function(i,n,t){"use strict";function A(i){$.ajax({url:"http://houxiaopang.com/api/v1.1/designerdash/index/recent",type:"GET",headers:{Authorization:"Token "+o.a},success:function(n){if(0!=n.code)alert("最近上传列表获取失败！");else for(var t=0,A=n.data.length;t<A;t++){var o=n.data[t],e=o.category;1==e?e="PPT":2==e?e="UI":3==e?e="文本画册":4==e?e="海报展览":5==e?e="LOGO":6==e?e="企业形象设计（VI）":0==e&&(e="测试品类");var s={url:o.cover_url,title:o.title,id:o.album_id,type:e};i.push(s)}},error:function(){console.log(o.a)}})}Object.defineProperty(n,"__esModule",{value:!0});var o=t(4);n.default={data:function(){return{recentalbum:[]}},created:function(){A(this.recentalbum)},methods:{jump:function(i){location.href="http://houxiaopang.com/workdetail/#/"+i}}}},26:function(i,n,t){n=i.exports=t(12)(!0),n.push([i.i,".conbody{margin:0 auto;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;height:100%;position:relative}.conbody>p{line-height:40px;height:40px;background-color:#f7fafa;padding-left:15px}.conbody>.content{background:#fff;position:absolute;top:40px;width:100%}.zjsc_list{padding:15px 0;width:1000px;margin:0 auto;height:100%}.zjsc_list,.zjsc_list>ul{-webkit-box-sizing:border-box;box-sizing:border-box}.zjsc_list>ul{overflow:hidden;list-style:none}.zjsc_list>ul>li{width:240px;height:230px;float:left;-webkit-box-sizing:border-box;box-sizing:border-box;margin-right:10px;margin-bottom:25px;cursor:pointer}.zjsc_list>ul>li .img{width:100%;height:180px}.zjsc_list>ul>li>p:nth-child(2){height:30px;line-height:30px;font-size:16px}.zjsc_list>ul>li>p:nth-child(3){height:20px;line-height:20px;font-size:14px}","",{version:3,sources:["c:/vue/adminv1.0/src/components/Main.vue"],names:[],mappings:"AACA,SACE,cAAe,AACf,8BAA+B,AACvB,sBAAuB,AAC/B,WAAY,AACZ,YAAa,AACb,iBAAmB,CACpB,AACD,WACE,iBAAkB,AAClB,YAAa,AACb,yBAA0B,AAC1B,iBAAmB,CACpB,AACD,kBACE,gBAAiB,AACjB,kBAAmB,AACnB,SAAU,AACV,UAAY,CACb,AACD,WACE,eAAgB,AAGhB,aAAc,AACd,cAAe,AACf,WAAa,CACd,AACD,yBANE,8BAA+B,AACvB,qBAAuB,CAUhC,AALD,cACE,gBAAiB,AAGjB,eAAiB,CAClB,AACD,iBACE,YAAa,AACb,aAAc,AACd,WAAY,AACZ,8BAA+B,AACvB,sBAAuB,AAC/B,kBAAmB,AACnB,mBAAoB,AACpB,cAAgB,CACjB,AACD,sBACE,WAAY,AACZ,YAAc,CACf,AACD,gCACE,YAAa,AACb,iBAAkB,AAClB,cAAgB,CACjB,AACD,gCACE,YAAa,AACb,iBAAkB,AAClB,cAAgB,CACjB",file:"Main.vue",sourcesContent:["\n.conbody {\n  margin: 0 auto;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.conbody > p {\n  line-height: 40px;\n  height: 40px;\n  background-color: #f7fafa;\n  padding-left: 15px;\n}\n.conbody > .content {\n  background: #fff;\n  position: absolute;\n  top: 40px;\n  width: 100%;\n}\n.zjsc_list {\n  padding: 15px 0;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 1000px;\n  margin: 0 auto;\n  height: 100%;\n}\n.zjsc_list > ul {\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  list-style: none;\n}\n.zjsc_list > ul > li {\n  width: 240px;\n  height: 230px;\n  float: left;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin-right: 10px;\n  margin-bottom: 25px;\n  cursor: pointer;\n}\n.zjsc_list > ul > li .img {\n  width: 100%;\n  height: 180px;\n}\n.zjsc_list > ul > li > p:nth-child(2) {\n  height: 30px;\n  line-height: 30px;\n  font-size: 16px;\n}\n.zjsc_list > ul > li > p:nth-child(3) {\n  height: 20px;\n  line-height: 20px;\n  font-size: 14px;\n}\n"],sourceRoot:""}])},30:function(i,n,t){var A=t(26);"string"==typeof A&&(A=[[i.i,A,""]]),A.locals&&(i.exports=A.locals);t(13)("8e5d9744",A,!0)},35:function(i,n){i.exports={render:function(){var i=this,n=i.$createElement,t=i._self._c||n;return t("div",{staticClass:"conbody"},[t("p",[i._v("最近上传")]),i._v(" "),t("div",{staticClass:"content"},[t("div",{staticClass:"zjsc_list"},[t("ul",{staticStyle:{overflow:"hidden"}},i._l(i.recentalbum,function(n){return t("li",{on:{click:function(t){i.jump(n.id)}}},[t("img",{staticClass:"img",attrs:{width:"240",src:n.url}}),i._v(" "),t("p",{domProps:{innerHTML:i._s(n.title)}}),i._v(" "),t("p",{domProps:{innerHTML:i._s(n.type)}})])}))])])])},staticRenderFns:[]}}});
//# sourceMappingURL=2.3a71c9039f03fa9402ee.js.map