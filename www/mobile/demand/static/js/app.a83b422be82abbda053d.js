webpackJsonp([0],[,,function(t,e,i){i(23);var s=i(0)(i(13),i(32),null,null);t.exports=s.exports},,,,,function(t,e,i){i(26);var s=i(0)(i(15),i(35),null,null);t.exports=s.exports},function(t,e,i){i(22);var s=i(0)(i(16),i(31),null,null);t.exports=s.exports},function(t,e,i){i(25);var s=i(0)(i(17),i(34),"data-v-6b512ec8",null);t.exports=s.exports},function(t,e,i){i(21);var s=i(0)(i(18),i(30),"data-v-05fe5c51",null);t.exports=s.exports},function(t,e,i){i(24);var s=i(0)(i(19),i(33),"data-v-2e21b2eb",null);t.exports=s.exports},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(6),n=i(4),r=i.n(n),o=i(5),a=i(7),c=i.n(a),d=i(8),l=i.n(d),p=i(10),u=i.n(p),f=i(9),v=i.n(f),m=i(11),_=i.n(m);s.a.use(o.a);var h=[{path:"/detail/:id",component:u.a},{path:"/Toast",component:v.a},{path:"/projectdetail/:id",name:"projectdetail",component:_.a},{path:"/project/:id",component:l.a}],w=new o.a({routes:h});r.a.attach(document.body),s.a.config.productionTip=!1,new s.a({router:w,render:function(t){return t(c.a)}}).$mount("#app")},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(29),n=i.n(s),r=i(28),o=i.n(r),a=i(3),c=i.n(a);e.default={name:"previewer",computed:{imgs:function(){return this.list.map(function(t){return t.msrc||(t.msrc=t.src),void 0===t.w&&(t.w=0,t.h=0),t})}},methods:{init:function(t){var e=this,i=this.imgs[t];if(!i.w||!i.h||i.w<5||i.h<5){var s=new Image;s.onload=function(){i.w=this.width,i.h=this.height,e._init(t)},s.src=i.src}else this._init(t)},_init:function(t){var e=this,i=this,s=c()({history:!1,shareEl:!1,tapToClose:!0,index:t},this.options);this.photoswipe=new n.a(this.$el,o.a,this.imgs,s),this.photoswipe.listen("gettingData",function(t,e){if(!e.w||!e.h||e.w<1||e.h<1){var s=new Image;s.onload=function(){e.w=this.width,e.h=this.height,i.photoswipe.updateSize(!0)},s.src=e.src}}),this.photoswipe.init(),this.photoswipe.listen("close",function(){e.$emit("on-close")})},show:function(t){this.init(t)},close:function(){this.photoswipe.close()}},props:{list:{type:Array,required:!0},index:{type:Number,default:0},options:{type:Object,default:function(){return{}}}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(38),n=i.n(s),r=i(40),o=i.n(r),a=i(20);e.default={name:"x-img",mixins:[a.a],created:function(){this.$vux&&this.$vux.bus&&this.$vux.bus.$on("vux:after-view-enter",this.init)},methods:{init:function(){var t=this;this.blazy&&this.blazy.destroy(),this.blazy=new n.a({scroller:this.scroller,container:this.container,selector:"#vux-ximg-"+this.uuid,offset:t.offset,errorClass:t.errorClass,successClass:t.successClass,success:function(e){t.$emit("on-success",t.src,e)},error:function(e,i){t.$emit("on-error",t.src,e,i)}})}},mounted:function(){var t=this;this.$el.setAttribute("id","vux-ximg-"+this.uuid),this.$nextTick(function(){setTimeout(function(){t.init()},t.delay)})},computed:{currentSrc:function(){return o()()&&this.webpSrc?this.webpSrc:this.src}},props:{src:String,webpSrc:String,defaultSrc:{type:String,default:"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="},errorClass:String,successClass:String,offset:{type:Number,defaut:100},scroller:Object,container:String,delay:{type:Number,default:0}},beforeDestroy:function(){this.blazy&&this.blazy.destroy(),this.blazy=null,this.$vux&&this.$vux.bus&&this.$vux.bus.$off("vux:after-view-enter",this.init)}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(39),n=i.n(s),r=i(2),o=i.n(r),a=i(1);e.default={directives:{TransferDom:a.a},components:{XImg:n.a,Previewer:o.a},data:function(){return{info:{},demand_id:this.$route.params.id,designer:{},options:{getThumbBoundsFn:function(t){var e=document.querySelectorAll(".previewer-demo-img")[t],i=window.pageYOffset||document.documentElement.scrollTop,s=e.getBoundingClientRect();return{x:s.left,y:s.top+i,w:s.width}}}}},created:function(){this.getdemandinfo(this.demand_id),this.getpricelist(this.demand_id)},methods:{setworklist:function(t){var e=[];return t.forEach(function(t){e.push({src:t})}),e},getdemandinfo:function(t){var e=this;ajax({url:"http://www.houxiaopang.com/api/v1.1/demanddetail",type:"get",data:{demand_id:t},success:function(t){0===t.code?e.info=t.data:alert("网络拥挤，请稍后再试···")}})},setindex:function(){console.log(this.imgindex);var t=this.imgindex+1;return this.imgindex=t,t},show:function(t,e){this.$refs["previewer"+e][0].show(t)},setimg:function(t){return t+="?imageView2/1/w/400/h/300"},getpricelist:function(t){var e=this;ajax({type:"get",url:"http://www.houxiaopang.com/api/v1.1/adminsystem/pricelist_tmp",data:{demand_id:t},success:function(t){0===t.code?e.designer=t.data:alert("网络拥挤，请稍后再试···")},error:function(){alert("网络拥挤，请稍后再试···")}})}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{url:"http://houxiaopang.com/demand/#/detail/"+this.$route.query.id}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(2),n=i.n(s),r=i(1);e.default={directives:{TransferDom:r.a},data:function(){return{info:{},id:this.$route.params.id,list:[],options:{getThumbBoundsFn:function(t){var e=document.querySelectorAll(".previewer-demo-img")[t],i=window.pageYOffset||document.documentElement.scrollTop,s=e.getBoundingClientRect();return{x:s.left,y:s.top+i,w:s.width}}}}},components:{Previewer:n.a},created:function(){var t=this;ajax({url:"http://www.houxiaopang.com/api/v1.1/demanddetail",type:"get",data:{demand_id:t.id},success:function(e){if(0===e.code){t.info=e.data;for(var i=0,s=t.info.desc_img.length;i<s;i++)t.list.push({src:t.info.desc_img[i]})}else alert("网络拥挤，请稍后再试···")}})},methods:{show:function(t){this.$refs.previewer.show(t)}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(2),n=i.n(s),r=i(1);e.default={directives:{TransferDom:r.a},data:function(){return{info:{},id:this.$route.params.id,list:[],options:{getThumbBoundsFn:function(t){var e=document.querySelectorAll(".previewer-demo-img")[t],i=window.pageYOffset||document.documentElement.scrollTop,s=e.getBoundingClientRect();return{x:s.left,y:s.top+i,w:s.width}}}}},components:{Previewer:n.a},created:function(){var t=this;ajax({url:"http://www.houxiaopang.com/api/v1.1/demanddetail",type:"get",data:{demand_id:t.id},success:function(e){if(0===e.code){t.info=e.data;for(var i=0,s=t.info.desc_img.length;i<s;i++)t.list.push({src:t.info.desc_img[i]})}else alert("网络拥挤，请稍后再试···")}})},methods:{show:function(t){this.$refs.previewer.show(t)}}}},,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticStyle:{padding:"1.5rem 2rem",position:"fixed",width:"100%",top:"0",bottom:"4rem",overflow:"auto"}},[i("div",{staticClass:"worktitle",domProps:{innerHTML:t._s(t.info.title)}}),t._v(" "),i("p",{staticClass:"type"},[t._v("项目介绍")]),t._v(" "),i("div",{staticClass:"workcontent"},[i("div",{staticStyle:{"font-size":"1.6rem","line-height":"1.8rem","margin-bottom":"1rem","overflow-wrap":"break-word"},domProps:{innerHTML:t._s(t.info.description)}}),t._v(" "),i("p",{staticStyle:{"line-height":"2.4rem"}},[i("i",{staticClass:"iconfont",staticStyle:{color:"#d01667","font-size":"2.2rem"}},[t._v("")]),i("span",{staticClass:"left"},[t._v("工期:")]),i("span",{domProps:{innerHTML:t._s(t.info.howlong)}})]),t._v(" "),i("p",{staticStyle:{"line-height":"2.4rem"}},[i("i",{staticClass:"iconfont",staticStyle:{color:"#d01667"}},[t._v("")]),i("span",{staticClass:"left"},[t._v("预算:")]),i("span",{domProps:{innerHTML:t._s(t.info.howmuch)}})])]),t._v(" "),i("p",{staticClass:"type"},[t._v("参考图片")]),t._v(" "),i("div",{staticClass:"workcontent"},[i("div",{staticClass:"workimg"},t._l(t.info.desc_img,function(e,s){return i("div",{staticStyle:{width:"48%",height:"100px","margin-bottom":"1rem",border:"1px solid #e0e0e0",overflow:"hidden"},on:{click:function(e){t.show(s)}}},[i("img",{staticClass:"previewer-demo-img",attrs:{width:"100%",src:e,alt:""}})])}))]),t._v(" "),i("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[i("previewer",{ref:"previewer",attrs:{list:t.list,options:t.options}})],1)]),t._v(" "),i("router-link",{staticClass:"btn",attrs:{tag:"div",to:{path:"/Toast",query:{id:t.id}}}},[t._v("立即报价")])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"projectinfo"},[i("p",{staticStyle:{"font-size":"2rem",color:"#fff"},domProps:{innerHTML:t._s(t.info.title)}}),t._v(" "),i("router-link",{attrs:{to:{name:"projectdetail",params:t.demand_id}}},[t._v("查看详情")])],1),t._v(" "),i("div",{staticStyle:{background:"#bbb",padding:"5px 25px"}},[i("p",[t._v("猴小胖为您推荐以下 "),i("span",{staticStyle:{color:"#d01667"},domProps:{innerHTML:t._s(t.designer.length)}}),t._v(" 位设计师")])]),t._v(" "),t._l(t.designer,function(e,s){return i("div",[i("div",{staticClass:"designer"},[i("div",{staticClass:"designerInfo"},[i("div",{staticStyle:{width:"3rem",height:"3rem","text-align":"center","line-height":"3rem"}},[i("div",{staticClass:"headimg",domProps:{innerHTML:t._s(s+1)}})]),t._v(" "),i("div",{staticStyle:{width:"80%","padding-left":"15px"}},[i("p",{staticStyle:{"font-weight":"600","line-height":"20px"},domProps:{innerHTML:t._s(e.nickname)}}),t._v(" "),i("p",{staticStyle:{color:"#787878",width:"100%","line-height":"20px","word-wrap":"break-word"},domProps:{innerHTML:t._s(e.ideas)}})])]),t._v(" "),i("div",{staticClass:"designerWork"},[t._l(e.worklist,function(e,n){return i("div",{staticStyle:{width:"33%",overflow:"hidden"},on:{click:function(e){t.show(n,s)}}},[i("x-img",{staticClass:"previewer-demo-img",staticStyle:{width:"100%"},attrs:{src:t.setimg(e),alt:"",offset:50}})],1)}),t._v(" "),i("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[i("previewer",{ref:"previewer"+s,refInFor:!0,attrs:{list:t.setworklist(e.worklist),options:t.options}})],1)],2),t._v(" "),i("div",{staticClass:"workDesc"},[i("p",[t._v("工期："),i("span",{domProps:{innerHTML:t._s(e.howlong)}})]),t._v(" "),i("p",{staticStyle:{width:"20%","text-align":"center","border-left":"1px solid #bbb",color:"#d01667"}},[t._v("￥"),i("span",{domProps:{innerHTML:t._s(e.howmuch)}})])])]),t._v(" "),i("div",{staticStyle:{height:"10px",background:"#bbb"}})])})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pswp vux-previewer",attrs:{tabindex:"-1",role:"dialog","aria-hidden":"true"}},[i("div",{staticClass:"pswp__bg"}),t._v(" "),i("div",{staticClass:"pswp__scroll-wrap"},[i("div",{staticClass:"pswp__container"},[i("div",{staticClass:"pswp__item"}),t._v(" "),i("div",{staticClass:"pswp__item"}),t._v(" "),i("div",{staticClass:"pswp__item"})]),t._v(" "),i("div",{staticClass:"pswp__ui pswp__ui--hidden"},[i("div",{staticClass:"pswp__top-bar"},[i("div",{staticClass:"pswp__counter"}),t._v(" "),i("button",{staticClass:"pswp__button pswp__button--close",attrs:{title:"Close (Esc)"}}),t._v(" "),i("button",{staticClass:"pswp__button pswp__button--share",attrs:{title:"Share"}}),t._v(" "),i("button",{staticClass:"pswp__button pswp__button--fs",attrs:{title:"Toggle fullscreen"}}),t._v(" "),i("button",{staticClass:"pswp__button pswp__button--zoom",attrs:{title:"Zoom in/out"}}),t._v(" "),i("div",{staticClass:"pswp__preloader"},[i("div",{staticClass:"pswp__preloader__icn"},[i("div",{staticClass:"pswp__preloader__cut"},[i("div",{staticClass:"pswp__preloader__donut"})])])])]),t._v(" "),i("div",{staticClass:"pswp__share-modal pswp__share-modal--hidden pswp__single-tap"},[i("div",{staticClass:"pswp__share-tooltip"})]),t._v(" "),i("button",{staticClass:"pswp__button pswp__button--arrow--left",attrs:{title:"Previous (arrow left)"}}),t._v(" "),i("button",{staticClass:"pswp__button pswp__button--arrow--right",attrs:{title:"Next (arrow right)"}}),t._v(" "),i("div",{staticClass:"pswp__caption"},[i("div",{staticClass:"pswp__caption__center"})])])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticStyle:{padding:"1.5rem 2rem",position:"fixed",width:"100%",top:"0",bottom:"4rem",overflow:"auto"}},[i("div",{staticClass:"worktitle",domProps:{innerHTML:t._s(t.info.title)}}),t._v(" "),i("p",{staticClass:"type"},[t._v("项目介绍")]),t._v(" "),i("div",{staticClass:"workcontent"},[i("div",{staticStyle:{"font-size":"1.6rem","line-height":"1.8rem","margin-bottom":"1rem","overflow-wrap":"break-word"},domProps:{innerHTML:t._s(t.info.description)}}),t._v(" "),i("p",{staticStyle:{"line-height":"2.4rem"}},[i("i",{staticClass:"iconfont",staticStyle:{color:"#d01667","font-size":"2.2rem"}},[t._v("")]),i("span",{staticClass:"left"},[t._v("工期:")]),i("span",{domProps:{innerHTML:t._s(t.info.howlong)}})]),t._v(" "),i("p",{staticStyle:{"line-height":"2.4rem"}},[i("i",{staticClass:"iconfont",staticStyle:{color:"#d01667"}},[t._v("")]),i("span",{staticClass:"left"},[t._v("预算:")]),i("span",{domProps:{innerHTML:t._s(t.info.howmuch)}})])]),t._v(" "),i("p",{staticClass:"type"},[t._v("参考图片")]),t._v(" "),i("div",{staticClass:"workcontent"},[i("div",{staticClass:"workimg"},t._l(t.info.desc_img,function(e,s){return i("div",{staticStyle:{width:"48%",height:"100px","margin-bottom":"1rem",border:"1px solid #e0e0e0",overflow:"hidden"},on:{click:function(e){t.show(s)}}},[i("img",{staticClass:"previewer-demo-img",attrs:{width:"100%",src:e,alt:""}})])}))]),t._v(" "),i("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[i("previewer",{ref:"previewer",attrs:{list:t.list,options:t.options}})],1)])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"toastwarp"},[t._m(0),t._v(" "),i("p",[t._v("为了更好的使用体验")]),t._v(" "),i("p",[t._v("请您使用PC端访问该页面")]),t._v(" "),i("p",{domProps:{innerHTML:t._s(t.url)}})])},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{width:"35%","margin-bottom":"1rem"}},[i("img",{staticStyle:{display:"block"},attrs:{width:"100%",src:"http://image.houxiaopang.com/mobile/tmp/pc.png",alt:""}})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("img",{staticClass:"vux-x-img",attrs:{src:t.defaultSrc,"data-src":t.currentSrc}})},staticRenderFns:[]}},,,function(t,e,i){i(27);var s=i(0)(i(14),i(36),null,null);t.exports=s.exports}],[12]);
//# sourceMappingURL=app.a83b422be82abbda053d.js.map