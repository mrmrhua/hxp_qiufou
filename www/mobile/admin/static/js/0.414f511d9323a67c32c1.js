webpackJsonp([0],{"2S3X":function(t,e,i){"use strict";e.a={props:{imgArr:{type:Array},showImageView:{type:Boolean},imageIndex:{type:Number,default:0}},data:function(){return{viewWith:800,viewHeight:800,imageView:null,indexLeft:10,showIndex:0,point:{startX:0,changeX:0},ulStyleObj:{width:"800px",transition:"0.5s",transform:"scaleZ(1.01) translate3d(0, 0, 0)"},startTimeStap:null,endTimeStap:null,pEvent:{TOUCHSTART:"touchstart",TOUCHMOVE:"touchmove",TOUCHEND:"touchend"},flag:!1,browser:"phone",dragConfig:{distance:50,timeStap:200}}},methods:{initLayout:function(){this.ulStyleObj.width=this.imgArr.length*this.viewWith+"px";var t=-this.showIndex*this.viewWith;this.ulStyleObj.transform="scaleZ(1.01) translate3d("+(t+this.point.changeX)+"px, 0, 0)",this.eventHandle()},eventHandle:function(){var t=this,e=this;this.imageView&&(this.imageView.addEventListener(e.pEvent.TOUCHSTART,function(i){return e.flag=!0,"pc"===t.browser?e.point.StartX=i.clientX:e.point.StartX=i.changedTouches[0].pageX,e.startTimeStap=new Date,!1}),this.imageView.addEventListener(e.pEvent.TOUCHMOVE,function(i){if(e.flag){e.ulStyleObj.transition="","pc"===t.browser?e.point.changeX=i.clientX-e.point.StartX:e.point.changeX=i.changedTouches[0].pageX-e.point.StartX;var n=-e.showIndex*e.viewWith;e.ulStyleObj.transform="scaleZ(1.01) translate3d("+(n+e.point.changeX)+"px, 0, 0)"}}),this.imageView.addEventListener(e.pEvent.TOUCHEND,function(i){e.flag=!1,e.ulStyleObj.transition="0.5s","pc"===t.browser?e.point.changeX=i.clientX-e.point.StartX:e.point.changeX=i.changedTouches[0].pageX-e.point.StartX,e.endTimeStap=new Date;var n=e.endTimeStap-e.startTimeStap,A=Math.abs(e.point.changeX);(A>=e.dragConfig.distance||n<e.dragConfig.timeStap&&A>30)&&(e.point.changeX>0?--e.showIndex<=0&&(e.showIndex=0):++e.showIndex>=e.imgArr.length-1&&(e.showIndex=e.imgArr.length-1));var a=-e.showIndex*e.viewWith;return e.ulStyleObj.transform="scaleZ(1.01) translate3d("+a+"px, 0, 0)",A<5&&e.$emit("hideImage"),!1}))},browserRedirect:function(){for(var t=navigator.userAgent,e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod","Mobile"],i=!0,n=0;n<e.length;n++)if(t.indexOf(e[n])>0){i=!1;break}return i?"pc":"phone"}},mounted:function(){var t=window.innerWidth,e=window.innerHeight;this.showIndex=this.imageIndex,this.$nextTick(function(){switch(this.imageView=document.querySelector("#imageView"),this.viewWith=t,this.viewHeight=e,this.browser=this.browserRedirect(),this.browser){case"pc":this.pEvent.TOUCHSTART="mousedown",this.pEvent.TOUCHMOVE="mousemove",this.pEvent.TOUCHEND="mouseup",this.dragConfig.timeStap=200,this.dragConfig.distance=parseInt(this.viewWith/2)<400?parseInt(this.viewWith/2):400;break;case"phone":default:this.pEvent.TOUCHSTART="touchstart",this.pEvent.TOUCHMOVE="touchmove",this.pEvent.TOUCHEND="touchend",this.dragConfig.timeStap=150,this.dragConfig.distance=parseInt(this.viewWith/2)}this.initLayout()})}}},"Dc/J":function(t,e,i){"use strict";function n(t){i("uWyd")}var A=i("2S3X"),a=i("m10B"),o=i("46Yf"),s=n,l=o(A.a,a.a,!1,s,"data-v-1fcefa18",null);e.a=l.exports},I5S9:function(t,e,i){var n=i("jk9f");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("8bSs")("e2f2fb9e",n,!0)},Uwzy:function(t,e,i){"use strict";function n(t){i("I5S9")}Object.defineProperty(e,"__esModule",{value:!0});var A=i("dazi"),a=i("v6dc"),o=i("46Yf"),s=n,l=o(A.a,a.a,!1,s,"data-v-55b81805",null);e.default=l.exports},Wbv7:function(t,e,i){e=t.exports=i("BkJT")(!0),e.push([t.i,"li[data-v-1fcefa18],ul[data-v-1fcefa18]{margin:0;padding:0}#imageView[data-v-1fcefa18]{position:fixed;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,.8);z-index:9999;overflow:hidden}#imageView>div[data-v-1fcefa18]{width:100%;height:100%}.imageBox[data-v-1fcefa18]{height:100%}.imageBox li[data-v-1fcefa18]{list-style:none;height:100%;float:left;overflow:hidden;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.imageBox li img[data-v-1fcefa18]{max-width:100%}","",{version:3,sources:["C:/vue/designer/src/components/ImageView.vue"],names:[],mappings:"AACA,wCACE,SAAU,AACV,SAAW,CACZ,AACD,4BACE,eAAgB,AAChB,WAAY,AACZ,YAAa,AACb,OAAQ,AACR,MAAO,AACP,0BAA+B,AAC/B,aAAc,AACd,eAAiB,CAClB,AACD,gCACE,WAAY,AACZ,WAAa,CACd,AACD,2BACE,WAAa,CACd,AACD,8BACE,gBAAiB,AACjB,YAAa,AACb,WAAY,AACZ,gBAAiB,AACjB,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,kBAAoB,CAC7B,AACD,kCACE,cAAgB,CACjB",file:"ImageView.vue",sourcesContent:["\nul[data-v-1fcefa18], li[data-v-1fcefa18] {\n  margin: 0;\n  padding: 0;\n}\n#imageView[data-v-1fcefa18] {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background: rgba(0, 0, 0, 0.8);\n  z-index: 9999;\n  overflow: hidden;\n}\n#imageView > div[data-v-1fcefa18] {\n  width: 100%;\n  height: 100%;\n}\n.imageBox[data-v-1fcefa18] {\n  height: 100%;\n}\n.imageBox li[data-v-1fcefa18] {\n  list-style: none;\n  height: 100%;\n  float: left;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.imageBox li img[data-v-1fcefa18] {\n  max-width: 100%;\n}\n"],sourceRoot:""}])},dazi:function(t,e,i){"use strict";var n=i("Dc/J");e.a={data:function(){return{tabbar:[{name:"项目进度",active:!0},{name:"支付记录",active:!1},{name:"项目详情",active:!1}],left:0,project_id:null,post:{postlist:[]},cashflow:[],works:[],show:!1,demanddetail:{desc_img:[]},imageIndex:0}},components:{"image-view":n.a},created:function(){this.project_id=this.$route.query.id,this.project_id?(showload("加载中"),this.getinfo(this.project_id)):this.$router.push("/project")},methods:{showimgview:function(t,e){this.imageIndex=e,this.works=t,this.show=!0},collect:function(){this.$router.push({path:"/collect",query:{id:this.project_id,title:this.post.title,name:this.post.client}})},getdemanddetail:function(){var t=this,e=this.post.demand_id;ajax({url:"https://www.houxiaopang.com/api/v1.1/demanddetail",data:{demand_id:e},success:function(e){t.demanddetail=e.data,hideload()},error:function(){hideload(),showModal("网络拥挤，请稍候再试")}})},choose:function(t){this.tabbar.forEach(function(e,i){e.active=!1,t===i&&(e.active=!0)}),0===t?this.left=0:1===t?(0===this.cashflow.length&&(showload(),this.getpayinfo(this.project_id)),this.left="-100%"):2===t&&(this.demanddetail.title||(showload(),this.getdemanddetail()),this.left="-200%")},setMoney:function(t){return t>0?"+"+t.toFixed(2):"-"+t.toFixed(2)},getpayinfo:function(t){var e=this;ajax({url:"https://www.houxiaopang.com/api/v1.1/designer/getcashflow",token:!0,data:{project_id:t},success:function(t){e.cashflow=t.data.cashflow,hideload()},error:function(){hideload(),showModal("网络拥挤，请稍候再试")}})},getinfo:function(t){var e=this;ajax({url:"https://www.houxiaopang.com/api/v1.1/wxfwh/projectpage",data:{project_id:t},token:!0,success:function(t){0===t.code?e.post=t.data:showModal("网络拥挤，请稍候再试"),hideload()},error:function(){hideload(),showModal("网络拥挤，请稍候再试")}})}}}},jk9f:function(t,e,i){e=t.exports=i("BkJT")(!0),e.push([t.i,".warp[data-v-55b81805]{height:100%;background:#f4f4f4;position:relative;overflow:hidden}.topbar[data-v-55b81805]{height:40px;line-height:40px;padding:0 15px;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:#fff}.topbar>span[data-v-55b81805]{width:80px;text-align:center;border-bottom:2px solid transparent;font-size:14px;height:40px;-webkit-transition:all .5s;transition:all .5s}.active[data-v-55b81805]{border-bottom:2px solid #ed5fa0!important}.content[data-v-55b81805]{background:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;border-left:1px solid #ed5fa0;width:100%;float:right}.zz[data-v-55b81805]{position:absolute;left:-5px;top:0;height:10px;width:10px;background:#fff}.icon[data-v-55b81805]{width:20px;height:20px;display:inline-block;vertical-align:-2px}.logo[data-v-55b81805]{width:128px;height:128px;display:block}.head[data-v-55b81805]{padding:10px 15px;background:-webkit-gradient(linear,left top,right top,from(#fe6549),to(#d01667));background:linear-gradient(90deg,#fe6549,#d01667);width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;height:80px;color:#fff;opacity:.8}.sc_title[data-v-55b81805]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.none[data-v-55b81805]{position:absolute;top:104px;left:0;width:100%;bottom:0;-ms-flex-pack:distribute;justify-content:space-around}.none-img[data-v-55b81805],.none[data-v-55b81805]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-flow:column;flex-flow:column}.none-img[data-v-55b81805]{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.btn_sm[data-v-55b81805]{-ms-flex-negative:0;flex-shrink:0;font-size:14px;text-align:center;width:100px;height:35px;line-height:35px;background:#ff697a;margin-top:20px}.btn_sm[data-v-55b81805]:active,.share[data-v-55b81805]:active{opacity:.6}.time_item[data-v-55b81805]{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.time_item[data-v-55b81805],.time_left[data-v-55b81805]{display:-webkit-box;display:-ms-flexbox;display:flex;height:30px;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.time_left[data-v-55b81805]{line-height:30px;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 10px 0 0;color:#ed5fa0}.dian[data-v-55b81805]{background:#ed5fa0;width:14px;height:14px;border-radius:50%;margin-left:-7px;z-index:10}.time_right[data-v-55b81805]{font-size:12px;color:#999;margin-right:20px}.detail[data-v-55b81805]{background:#fff}.context[data-v-55b81805]{padding:0 17px 5px}.imglist[data-v-55b81805]{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding:0 10px;-ms-flex-wrap:wrap;flex-wrap:wrap}.imglist[data-v-55b81805],.imgwarp[data-v-55b81805]{overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex}.imgwarp[data-v-55b81805]{width:49%;height:120px;margin-bottom:7px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.imglist>.imgwarp[data-v-55b81805]:nth-child(2n){margin-right:0}.schedule[data-v-55b81805]{position:absolute;top:120px;overflow:hidden;width:100%;left:0;bottom:0;background:#fff;margin-top:8px}.share[data-v-55b81805]{position:absolute;bottom:0;height:40px;width:100%;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:#fe6549;color:#fff}.cont_warp[data-v-55b81805],.share[data-v-55b81805]{display:-webkit-box;display:-ms-flexbox;display:flex}.cont_warp[data-v-55b81805]{width:300%;left:0;-webkit-transition:left .5s;transition:left .5s;position:relative;height:100%;overflow:hidden}.jindu[data-v-55b81805]{width:33.33%;padding-left:10px;height:100%;overflow-y:auto}.jilu[data-v-55b81805]{width:33.33%;background:#f4f4f4;height:100%;overflow-y:auto}.xiangqing[data-v-55b81805]{width:33.33%;background:#fff;height:100%;overflow-y:auto}.jilu_item[data-v-55b81805]{height:60px;padding:5px 15px;background:#fff;border-bottom:1px solid #d9d9d9;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.jilu_l[data-v-55b81805],.jilu_r[data-v-55b81805]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:distribute;justify-content:space-around}.jilu_r[data-v-55b81805]{-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end;color:#fe6549}.total[data-v-55b81805]{margin-top:-7px;height:40px;z-index:2;color:#999;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}button[data-v-55b81805]:after{content:none}","",{version:3,sources:["C:/vue/designer/src/components/project/Schedule.vue"],names:[],mappings:"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",file:"Schedule.vue",sourcesContent:["\n.warp[data-v-55b81805] {\n  height: 100%;\n  background: #f4f4f4;\n  position: relative;\n  overflow: hidden;\n}\n.topbar[data-v-55b81805] {\n  height: 40px;\n  line-height: 40px;\n  padding: 0 15px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background: #fff;\n}\n.topbar > span[data-v-55b81805] {\n  width: 80px;\n  text-align: center;\n  border-bottom: 2px solid transparent;\n  font-size: 14px;\n  height: 40px;\n  -webkit-transition: all .5s;\n  transition: all .5s;\n}\n.active[data-v-55b81805] {\n  border-bottom: 2px solid #ed5fa0 !important;\n}\n.content[data-v-55b81805] {\n  background: #fff;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  border-left: 1px solid #ed5fa0;\n  width: 100%;\n  float: right;\n}\n.zz[data-v-55b81805] {\n  position: absolute;\n  left: -5px;\n  top: 0;\n  height: 10px;\n  width: 10px;\n  background: #fff;\n}\n.icon[data-v-55b81805] {\n  width: 20px;\n  height: 20px;\n  display: inline-block;\n  vertical-align: -2px;\n}\n.logo[data-v-55b81805] {\n  width: 128px;\n  height: 128px;\n  display: block;\n}\n.head[data-v-55b81805] {\n  padding: 10px 15px;\n  background: -webkit-gradient(linear, left top, right top, from(#fe6549), to(#d01667));\n  background: linear-gradient(to right, #fe6549, #d01667);\n  width: 100%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  height: 80px;\n  color: #fff;\n  opacity: 0.8;\n}\n.sc_title[data-v-55b81805] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.none[data-v-55b81805] {\n  position: absolute;\n  top: 104px;\n  left: 0;\n  width: 100%;\n  bottom: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: column;\n          flex-flow: column;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.none-img[data-v-55b81805] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: column;\n          flex-flow: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.btn_sm[data-v-55b81805] {\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  font-size: 14px;\n  text-align: center;\n  width: 100px;\n  height: 35px;\n  line-height: 35px;\n  background: #FF697A;\n  margin-top: 20px;\n}\n.btn_sm[data-v-55b81805]:active {\n  opacity: 0.6;\n}\n.share[data-v-55b81805]:active {\n  opacity: 0.6;\n}\n.time_item[data-v-55b81805] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 30px;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.time_left[data-v-55b81805] {\n  height: 30px;\n  line-height: 30px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 0 10px 0 0;\n  color: #ed5fa0;\n}\n.dian[data-v-55b81805] {\n  background: #ed5fa0;\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  margin-left: -7px;\n  z-index: 10;\n}\n.time_right[data-v-55b81805] {\n  font-size: 12px;\n  color: #999;\n  margin-right: 20px;\n  /*height: 50px;\n  line-height: 50px;*/\n}\n.detail[data-v-55b81805] {\n  background: #fff;\n}\n.context[data-v-55b81805] {\n  padding: 0 17px 5px;\n}\n.imglist[data-v-55b81805] {\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 0 10px;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.imgwarp[data-v-55b81805] {\n  width: 49%;\n  height: 120px;\n  margin-bottom: 7px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.imglist > .imgwarp[data-v-55b81805]:nth-child(2n) {\n  margin-right: 0;\n}\n.schedule[data-v-55b81805] {\n  position: absolute;\n  top: 120px;\n  overflow: hidden;\n  width: 100%;\n  left: 0;\n  bottom: 0;\n  background: #fff;\n  margin-top: 8px;\n}\n.share[data-v-55b81805] {\n  position: absolute;\n  bottom: 0;\n  height: 40px;\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background: #fe6549;\n  color: #fff;\n}\n.cont_warp[data-v-55b81805] {\n  width: 300%;\n  left: 0;\n  -webkit-transition: left 0.5s;\n  transition: left 0.5s;\n  position: relative;\n  height: 100%;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.jindu[data-v-55b81805] {\n  width: 33.33%;\n  padding-left: 10px;\n  height: 100%;\n  overflow-y: auto;\n}\n.jilu[data-v-55b81805] {\n  width: 33.33%;\n  background: #f4f4f4;\n  height: 100%;\n  overflow-y: auto;\n}\n.xiangqing[data-v-55b81805] {\n  width: 33.33%;\n  background: #fff;\n  height: 100%;\n  overflow-y: auto;\n}\n.jilu_item[data-v-55b81805] {\n  height: 60px;\n  padding: 5px 15px;\n  background: #fff;\n  border-bottom: 1px solid #d9d9d9;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.jilu_l[data-v-55b81805] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.jilu_r[data-v-55b81805] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  -webkit-box-align: end;\n      -ms-flex-align: end;\n          align-items: flex-end;\n  color: #fe6549;\n}\n.total[data-v-55b81805] {\n  margin-top: -7px;\n  height: 40px;\n  z-index: 2;\n  color: #999;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n/*.text {\n  border-radius: 0;\n  color: #ed5fa0;\n  background: transparent;\n  margin: 0 0;\n  padding: 0 0;\n  font-size: 16px;\n  width: 50%;\n  border-right: 1rpx solid #d9d9d9;\n  box-sizing: border-box;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}*/\nbutton[data-v-55b81805]::after {\n  content: none;\n}\n\n"],sourceRoot:""}])},m10B:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"show",rawName:"v-show",value:t.showImageView,expression:"showImageView"}],style:{width:t.viewWith+"px",height:t.viewHeight+"px"},attrs:{id:"imageView"}},[i("div",[i("ul",{staticClass:"imageBox",style:t.ulStyleObj},t._l(t.imgArr,function(e){return i("li",{style:{width:t.viewWith+"px"}},[i("img",{attrs:{src:e}})])}))])])},A=[],a={render:n,staticRenderFns:A};e.a=a},uWyd:function(t,e,i){var n=i("Wbv7");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("8bSs")("4032bc3a",n,!0)},v6dc:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"warp"},[i("div",{staticClass:"head"},[i("div",{staticClass:"sc_title"},[i("span",{staticStyle:{"flex-shrink":"1",width:"100%","white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis"}},[i("span",{staticStyle:{"font-size":"20px"}},[t._v(t._s(t.post.title))]),t._v(" "),i("div",{staticStyle:{"margin-top":"5px"}},[t._v("客户："+t._s(t.post.client))])]),t._v(" "),i("div",{staticClass:"btn_sm",on:{click:t.collect}},[t._v("发起收款")])])]),t._v(" "),i("div",{staticClass:"topbar"},t._l(t.tabbar,function(e,n){return i("span",{class:{active:e.active},on:{click:function(e){t.choose(n)}}},[t._v(t._s(e.name))])})),t._v(" "),i("div",{staticClass:"schedule"},[i("div",{staticClass:"cont_warp",style:{left:t.left}},[i("div",{staticClass:"jindu"},[t._m(0),t._v(" "),t._l(t.post.postlist,function(e){return i("div",{staticClass:"content"},[i("div",{staticClass:"time_item"},[i("div",{staticClass:"time_left"},[i("div",{staticClass:"dian"}),t._v(" "),i("div",{staticStyle:{"margin-left":"10px","box-sizing":"border-box","padding-top":"2px"}},[t._v(t._s(e.up_time))])]),t._v(" "),i("div",{staticClass:"time_right"},[t._v("共"+t._s(e.imglist.length)+"张图片")])]),t._v(" "),i("div",{staticClass:"detail",on:{click:function(i){t.showimgview(e.imglist,0)}}},[i("div",{staticClass:"context"},[t._v(t._s(e.desc))]),t._v(" "),i("div",{staticClass:"imglist"},t._l(e.imglist,function(e,n){return n<2?i("div",{staticClass:"imgwarp"},[i("img",{attrs:{src:e+"?imageView2/1/w/200/h/150"}})]):t._e()})),t._v(" "),i("div",{staticClass:"total"},[t._v("点击查看")])])])})],2),t._v(" "),i("div",{staticClass:"jilu"},t._l(t.cashflow,function(e){return i("div",{staticClass:"jilu_item"},[i("div",{staticClass:"jilu_l"},[i("p",[t._v(t._s(e.remark))]),t._v(" "),i("p",{staticStyle:{"font-size":"12px"}},[t._v(t._s(e.when))])]),t._v(" "),i("div",{staticClass:"jilu_r"},[i("p",{staticStyle:{"font-size":"18px"}},[t._v(t._s(t.setMoney(e.change_money)))]),t._v(" "),i("p",{staticStyle:{"font-size":"12px"}},[t._v(t._s(e.status))])])])})),t._v(" "),i("div",{staticClass:"xiangqing"},[i("div",{staticStyle:{padding:"10px 15px"}},[i("p",{staticStyle:{"font-size":"18px"}},[t._v(t._s(t.demanddetail.title))]),t._v(" "),i("div",{staticStyle:{"font-size":"14px","margin-top":"10px","line-height":"30px"},domProps:{innerHTML:t._s(t.demanddetail.description)}}),t._v(" "),i("div",{staticStyle:{"margin-top":"10px"}},[i("p",{staticStyle:{"font-size":"18px"}},[t._v("参考图片")]),t._v(" "),i("ul",{staticStyle:{width:"100%",display:"flex","justify-content":"space-between","flex-flow":"wrap","margin-top":"5px"}},t._l(t.demanddetail.desc_img,function(e,n){return i("li",{staticStyle:{overflow:"hidden",width:"49%",height:"100px",background:"#000","margin-bottom":"5px"},on:{click:function(e){t.showimgview(t.demanddetail.desc_img,n)}}},[i("img",{staticStyle:{width:"100%"},attrs:{src:e+"?imageView2/1/w/200/h/150",alt:""}})])}))])])])])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0===t.post.postlist.length&&t.tabbar[0].active,expression:"post.postlist.length === 0&&tabbar[0].active"}],staticClass:"none"},[t._m(1)]),t._v(" "),i("transition",{staticClass:"fadeView",attrs:{name:"slide-fade"}},[t.show?i("div",[i("image-view",{attrs:{imgArr:t.works,showImageView:!0,imageIndex:t.imageIndex},on:{hideImage:function(e){t.show=!1}}})],1):t._e()])],1)},A=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{position:"relative"}},[i("div",{staticClass:"zz"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"none-img"},[i("span",{staticStyle:{color:"#999"}},[t._v("还没有上传过进度稿哦")])])}],a={render:n,staticRenderFns:A};e.a=a}});
//# sourceMappingURL=0.414f511d9323a67c32c1.js.map