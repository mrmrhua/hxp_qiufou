webpackJsonp([4],{27:function(i,t,e){function n(i){e(74)}var o=e(0)(e(47),e(91),n,null,null);i.exports=o.exports},40:function(i,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["each_file","index","demand"],data:function(){return{width:"200px",height:"150px"}},created:function(){this.demand&&(this.width="240px",this.height="180px")},methods:{delconfirm:function(){this.$emit("img_url",this.index)}}}},41:function(i,t,e){t=i.exports=e(21)(!0),t.push([i.i,'.up-section{vertical-align:top;position:relative;overflow:hidden;-webkit-box-shadow:0 0 1px 0;box-shadow:0 0 1px 0;text-align:center;line-height:150px}.up-section .close-upimg{position:absolute;top:6px;right:8px;display:none;z-index:10;cursor:pointer}.up-section .up-span{display:block;width:100%;height:100%;visibility:hidden;position:absolute;top:0;left:0;z-index:9;background:rgba(0,0,0,.5)}.up-section:hover .close-upimg{display:block}.up-section:hover .up-span{visibility:visible}.loading{border:1px solid #d1d1d1;background:url("http://image.houxiaopang.com/baseform/loading.gif") no-repeat 50%}.up-opcity{opacity:0}.upimg-div .up-section{width:160px;height:120px;overflow:hidden}.up-img{width:100%}',"",{version:3,sources:["C:/vue/admin_v1.1/src/components/Imgthumb.vue"],names:[],mappings:"AACA,YACE,mBAAoB,AACpB,kBAAmB,AACnB,gBAAiB,AACjB,6BAA8B,AACtB,qBAAsB,AAC9B,kBAAmB,AACnB,iBAAmB,CACpB,AACD,yBACE,kBAAmB,AACnB,QAAS,AACT,UAAW,AACX,aAAc,AACd,WAAY,AACZ,cAAgB,CACjB,AACD,qBACE,cAAe,AACf,WAAY,AACZ,YAAa,AACb,kBAAmB,AACnB,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,UAAW,AACX,yBAA8B,CAC/B,AACD,+BACE,aAAe,CAChB,AACD,2BACE,kBAAoB,CACrB,AACD,SACE,yBAA0B,AAC1B,iFAAsF,CACvF,AACD,WACE,SAAW,CACZ,AACD,uBACE,YAAa,AACb,aAAc,AACd,eAAiB,CAClB,AACD,QACE,UAAY,CACb",file:"Imgthumb.vue",sourcesContent:["\n.up-section {\n  vertical-align: top;\n  position: relative;\n  overflow: hidden;\n  -webkit-box-shadow: 0 0 1px 0;\n          box-shadow: 0 0 1px 0;\n  text-align: center;\n  line-height: 150px;\n}\n.up-section .close-upimg {\n  position: absolute;\n  top: 6px;\n  right: 8px;\n  display: none;\n  z-index: 10;\n  cursor: pointer;\n}\n.up-section .up-span {\n  display: block;\n  width: 100%;\n  height: 100%;\n  visibility: hidden;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 9;\n  background: rgba(0, 0, 0, .5);\n}\n.up-section:hover .close-upimg {\n  display: block;\n}\n.up-section:hover .up-span {\n  visibility: visible;\n}\n.loading {\n  border: 1px solid #D1D1D1;\n  background: url('http://image.houxiaopang.com/baseform/loading.gif') no-repeat center;\n}\n.up-opcity {\n  opacity: 0;\n}\n.upimg-div .up-section {\n  width: 160px;\n  height: 120px;\n  overflow: hidden;\n}\n.up-img {\n  width: 100%;\n}\n\n"],sourceRoot:""}])},42:function(i,t,e){var n=e(41);"string"==typeof n&&(n=[[i.i,n,""]]),n.locals&&(i.exports=n.locals);e(22)("4de2a4e8",n,!0)},43:function(i,t,e){function n(i){e(42)}var o=e(0)(e(40),e(44),n,null,null);i.exports=o.exports},44:function(i,t){i.exports={render:function(){var i=this,t=i.$createElement,e=i._self._c||t;return e("li",[e("section",{staticClass:"up-section loading",style:{width:i.width,height:i.height}},[e("span",{staticClass:"up-span"}),i._v(" "),e("img",{staticClass:"close-upimg",attrs:{src:"http://image.houxiaopang.com/baseform/a7.png"},on:{click:i.delconfirm}}),i._v(" "),e("img",{staticClass:"up-img up-opcity",attrs:{src:i.each_file+"?imageView2/1/w/200/h/150"}})])])},staticRenderFns:[]}},47:function(i,t,e){"use strict";function n(i,t){this.x=i,this.y=t}function o(i,t){this.left=i,this.top=t}Object.defineProperty(t,"__esModule",{value:!0});var A=e(4),s=e.n(A),a=e(43),d=e.n(a);t.default={data:function(){return{type:[{name:"项目进度",selected:!0},{name:"项目详情",selected:!1},{name:"收款记录",selected:!1}],sortmodelshow:!1,post:{postlist:[]},img_url:[],img_index:0,shoukuang:!1,moneyType:[{name:"定金",selected:!0},{name:"额外收费",selected:!1},{name:"尾款",selected:!1}],successmoney:!1,cashflow:[],demanddetail:{desc_img:[]},desc:"",project_id:null,money:null,description:"",imgupload:!1}},components:{imgthumb:d.a},created:function(){this.project_id=this.$route.query.id,this.project_id?this.getinfo(this.project_id):this.$router.push("/demand")},mounted:function(){registerup(this)},methods:{setmoney:function(i){return i>0?"+"+i.toFixed(2):i.toFixed(2)},open:function(i){location.href="http://www.houxiaopang.com/correct?post="+i+"&url=demand/demandinfo/12"},getdemanddetail:function(){var i=this,t=this.post.demand_id;$.ajax({url:"http://www.houxiaopang.com/api/v1.1/demanddetail",data:{demand_id:t},success:function(t){0===t.code?i.demanddetail=t.data:alert("网络拥挤，请稍后再试。")},error:function(){alert("网络拥挤，请稍后再试。")}})},getinfo:function(i){var t=this;$.ajax({url:"http://www.houxiaopang.com/api/v1.1/wxfwh/projectpage",data:{project_id:i},headers:{Authorization:"Token "+token},success:function(i){0===i.code?t.post=i.data:alert("网络拥挤，请稍候再试")},error:function(){alert("网络拥挤，请稍候再试")}})},getpayinfo:function(i){var t=this;$.ajax({url:"http://www.houxiaopang.com/api/v1.1/designer/getcashflow",headers:{Authorization:"Token "+token},data:{project_id:i},success:function(i){0===i.code&&(t.cashflow=i.data.cashflow)},error:function(){alert("网络拥挤，请稍候再试")}})},submitpage:function(){if(this.img_url.length<=0)return void alert("请上传图片。");if(this.imgupload)return void alert("请等待图片上传完成。");var i=this;$.ajax({type:"POST",url:"http://www.houxiaopang.com/api/v1.1/wxfwh/projectpage",headers:{Authorization:"Token "+token},data:{project_id:i.project_id,desc:i.desc,imglist:s()(i.img_url)},success:function(t){0===t.code?(i.post.postlist.unshift({desc:i.desc,imglist:i.img_url}),i.img_url=[],i.desc="",i.img_index=0):alert("网络拥挤，请稍候再试。")},error:function(){alert("网络拥挤，请稍候再试。")}})},submitpay:function(){if(null===this.money||""===this.money.trim())return void alert("请输入费用");if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.money))return void alert("费用格式不正确");var i=null;this.moneyType.forEach(function(t){!0===t.selected&&(i=t.name)});var t=this;$.ajax({type:"POST",url:"http://www.houxiaopang.com/api/v1.1/chargeapply",headers:{Authorization:"Token "+token},data:{project_id:t.project_id,feetype:i,money:t.money,desc:t.description.trim()},success:function(i){0===i.code?t.successmoney=!0:alert("网络拥挤，请稍候再试。")},error:function(){alert("网络拥挤，请稍候再试。")}})},wangchengmoney:function(){this.choosemoneytype(0),this.money=null,this.description="",this.successmoney=!1},initPhoto:function(){$("#sort .item").each(function(i){this.init=function(){this.box=$(this).parent(),$(this).attr("index",i).css({position:"absolute",left:this.box.offset().left,top:this.box.offset().top}).appendTo("#sort"),this.drag()},this.move=function(i){$(this).stop(!0).animate({left:this.box.offset().left,top:this.box.offset().top},500,function(){i&&i.call(this)})},this.collisionCheck=function(){var i=this,t=null;$(this).siblings(".item").each(function(){i.pointer.x>this.box.offset().left&&i.pointer.y>this.box.offset().top&&i.pointer.x<this.box.offset().left+this.box.width()&&i.pointer.y<this.box.offset().top+this.box.height()&&(t=i.box.offset().top<this.box.offset().top?"down":i.box.offset().top>this.box.offset().top?"up":"normal",this.swap(i,t))})},this.swap=function(i,t){({normal:function(){var t=this.box;this.box=i.box,i.box=t,this.move(),$(this).attr("index",this.box.index()),$(i).attr("index",i.box.index())},down:function(){for(var t=this.box,e=this,n=i.box.index(),o=e.box.index(),A=o;A>n;A--){var s=$("#sort .item[index="+(A-1)+"]")[0];e.box=s.box,$(e).attr("index",e.box.index()),e.move(),e=s}i.box=t,$(i).attr("index",t.index())},up:function(){for(var t=this.box,e=this,n=e.box.index(),o=i.box.index(),A=n;A<o;A++){var s=$("#sort .item[index="+(A+1)+"]")[0];e.box=s.box,$(e).attr("index",e.box.index()),e.move(),e=s}i.box=t,$(i).attr("index",t.index())}})[t].call(this)},this.drag=function(){var i=new o,t=new n,e=!1,A=null;$(this).mousedown(function(n){n.preventDefault(),i.left=$(this).position().left,i.top=$(this).position().top,t.x=n.clientX,t.y=n.clientY,e=!0,A=this}),$(document).mousemove(function(o){var s=new n(o.clientX,o.clientY);if(!e)return!1;$(A).css({opacity:"0.8","z-index":999});var a=s.x-t.x+i.left,d=s.y-t.y+i.top;$(A).css({left:a,top:d}),A.pointer=s,A.collisionCheck()}),$(document).mouseup(function(){if(!e)return!1;e=!1,A.move(function(){$(this).css({opacity:"1","z-index":0})})})},this.init()})},sort:function(){window.scrollTo(0,0),document.body.style.overflow="hidden",this.sortmodelshow=!0,this.$nextTick(function(){var i=document.getElementById("sort");i.innerHTML="",[].forEach.call(this.img_url,function(t){t+="?imageView2/1/w/200/h/150";var e="<li><div class='item' style='width: 200px;height: 150px;overflow: hidden'><img src='"+t+"' width='200'></div></li>";i.innerHTML+=e}),this.initPhoto()})},close:function(){document.body.style.overflow="auto",this.sortmodelshow=!1},sortover:function(){var i=[];$("#sort .item").each(function(){i.push($(this).attr("index"))});var t=[],e=this;[].forEach.call(this.img_url,function(n,o){t[i[o]]=e.img_url[o]}),this.img_url=t,this.$nextTick(function(){document.body.style.overflow="auto",this.sortmodelshow=!1})},appendImg:function(){this.imgupload=!0;for(var i=document.getElementById("file"),t=0,e=i.files.length;t<e;t++)this.img_url.splice(this.img_url.length+t,0,0);this.$nextTick(function(){for(var t=0,e=i.files.length;t<e;t++)uploader.addFile(i.files[t])})},rm:function(i){this.img_url.splice(i,1),this.img_index--},choose:function(i){if(!this.type[i].selected){var t=this;this.type.forEach(function(t,e){t.selected=!1,i===e&&(t.selected=!0)}),0===i?t.getinfo(t.project_id):1===i?t.getdemanddetail():2===i&&t.getpayinfo(t.project_id)}},choosemoneytype:function(i){this.moneyType.forEach(function(t,e){t.selected=!1,i===e&&(t.selected=!0)})}}}},64:function(i,t,e){t=i.exports=e(21)(!0),t.push([i.i,'.di_top{width:100%;height:100px;background:#ffd5cd;overflow:hidden;position:relative}.di_top>.di_title{font-size:24px;color:#333;margin-top:23px;margin-left:10px}.di_success_money{width:345px;height:193px;background:#f5f5f5;border-radius:4px;position:absolute;top:50%;left:50%;margin-left:-173px;margin-top:-96px}.di_desc{margin-top:15px;margin-left:10px;font-size:14px;color:#333}.di_btn{width:120px;height:50px;background:#fe6549;border-radius:4px;font-size:18px;line-height:50px;text-align:center;color:#fff;position:absolute;top:25px;right:35px;cursor:pointer}.conbody>.labelpage{width:100%;height:50px;margin-top:10px}.di_moneytype{display:inline-block;height:100%;border:1px solid #ddd;margin-right:15px;padding:0 20px;cursor:pointer}.di_moneytype_active{border:1px solid #348dff;color:#348dff}.labelpage>ul{width:100%;height:100%}.labelpage>ul>li{float:left;padding:0 3px;font-size:16px;line-height:30px;margin-left:10px;margin-right:25px;margin-top:9px;background:#fff;cursor:pointer}.di_input_money{height:30px;width:100px;font-size:16px;padding-left:10px;border:1px solid #ddd;outline:none}.di_input_money:focus{border-color:#545ca6}.labelpage>ul>.labelpage_active,.labelpage>ul>li:hover{border-bottom:2px solid #d01667}.di_info{border:2px dashed #dedede;padding:15px 0 15px 20px;margin-top:9px}.di_content{margin-top:15px;font-size:16px;line-height:30px}.di_content,.di_imgwarp{padding:0 20px}.di_imgwarp>p{font-size:18px;height:60px;line-height:60px}.di_imgwarp>ul{overflow:hidden}.di_imgwarp>ul>li{float:left;width:240px;height:180px;margin-right:20px;margin-bottom:20px;overflow:hidden}.di_imgwarp>ul>li:nth-child(3n){margin-right:0}.di_btn:active{opacity:.6}.table{width:750px;border:1px solid #dedede;margin:25px auto 0}th{height:50px;font-size:16px;background:#ddd}th,tr{width:25%}tr{height:40px;font-size:14px;text-align:center;background:#fff;color:#333}tbody>tr:nth-child(2n){background:#edf5ff;color:#313131}textarea{width:100%;outline:none;padding-left:10px;padding-top:10px;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;height:100px;border:1px solid #cbd5dd;border-radius:2px;font-size:14px;margin-top:10px;resize:none;font-family:Helvetica\\\\A0Neue,Helvetica,Arial,Microsoft\\\\A0Yahei,"Hiragino\\A0Sans\\A0GB",HeitiSC,"WenQuanYi\\A0Micro\\A0Hei",sans-serif}textarea:focus{border-color:#545ca6}.di_upfile{border:2px dashed #e0e4e8;padding:0 15px 10px;float:left;width:800px;position:relative}.di_addbtn{width:240px;height:180px;display:inline-block;position:relative;cursor:pointer}.di_addbtn .file{width:100%;height:100%;opacity:0;top:0;left:0;z-index:10}.di_addbtn .file,.di_btn_span{position:absolute;cursor:pointer}.di_btn_span{top:10px;right:10px;color:#bbb;display:inline-block;font-size:14px}.di_btn_span:hover{color:#d01667!important}.add-img,.di_addbtn .add-img{width:100%;height:100%}.add-img{display:block}.di_addbtn>.zhezhao{position:absolute;top:0;left:0;width:100%;height:100%;background:silver;text-align:center;line-height:150px;display:none}.di_list{width:800px;padding:10px 0 10px 20px;margin-left:10px;border-left:1px solid #fe6549}.di_list>ul{list-style:none;overflow:hidden}.di_list>ul>li{float:left;width:240px;height:180px;margin-right:24px;overflow:hidden;text-align:center;line-height:180px}.di_list>ul>li:nth-child(3n){margin-right:0}.di_list>ul>li>img{width:240px}.desc{padding:10px 0;font-size:16px}#sort{list-style:none;overflow:hidden}#sort>li{float:left;margin-right:15px;margin-bottom:15px}#sort>li,#sort>li>.item{width:200px;height:150px}.di_upwrapper>ul{overflow:hidden}.di_upwrapper>ul>li{float:left;width:240px;height:180px;margin-right:23px;margin-bottom:15px}.di_upwrapper>ul>li:nth-child(3n){margin-right:0}',"",{version:3,sources:["C:/vue/admin_v1.1/src/components/Demandinfo.vue"],names:[],mappings:"AACA,QACE,WAAY,AACZ,aAAc,AACd,mBAAmC,AACnC,gBAAiB,AACjB,iBAAmB,CACpB,AACD,kBACE,eAAgB,AAChB,WAAe,AACf,gBAAiB,AACjB,gBAAkB,CACnB,AACD,kBACE,YAAa,AACb,aAAc,AACd,mBAAmC,AACnC,kBAAmB,AACnB,kBAAmB,AACnB,QAAS,AACT,SAAU,AACV,mBAAoB,AACpB,gBAAkB,CACnB,AACD,SACE,gBAAiB,AACjB,iBAAkB,AAClB,eAAgB,AAChB,UAAe,CAChB,AACD,QACE,YAAa,AACb,YAAa,AACb,mBAAkC,AAClC,kBAAmB,AACnB,eAAgB,AAChB,iBAAkB,AAClB,kBAAmB,AACnB,WAAY,AACZ,kBAAmB,AACnB,SAAU,AACV,WAAY,AACZ,cAAgB,CACjB,AACD,oBACE,WAAY,AACZ,YAAa,AACb,eAAiB,CAClB,AACD,cACE,qBAAsB,AACtB,YAAa,AACb,sBAAuB,AACvB,kBAAmB,AACnB,eAAgB,AAChB,cAAgB,CACjB,AACD,qBACE,yBAA0B,AAC1B,aAAe,CAChB,AACD,cACE,WAAY,AACZ,WAAa,CACd,AACD,iBACE,WAAY,AACZ,cAAe,AACf,eAAgB,AAChB,iBAAkB,AAClB,iBAAkB,AAClB,kBAAmB,AACnB,eAAgB,AAChB,gBAAiB,AACjB,cAAgB,CACjB,AACD,gBACE,YAAa,AACb,YAAa,AACb,eAAgB,AAChB,kBAAmB,AACnB,sBAAuB,AACvB,YAAc,CACf,AACD,sBACE,oBAAsB,CACvB,AAID,uDACE,+BAAiC,CAClC,AACD,SACE,0BAA2B,AAC3B,yBAA0B,AAC1B,cAAgB,CACjB,AACD,YAEE,gBAAiB,AACjB,eAAgB,AAChB,gBAAkB,CACnB,AACD,wBALE,cAAgB,CAOjB,AACD,cACE,eAAgB,AAChB,YAAa,AACb,gBAAkB,CACnB,AACD,eACE,eAAiB,CAClB,AACD,kBACE,WAAY,AACZ,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,mBAAoB,AACpB,eAAiB,CAClB,AACD,gCACE,cAAgB,CACjB,AACD,eACE,UAAa,CACd,AACD,OACE,YAAa,AACb,yBAA0B,AAC1B,kBAAoB,CACrB,AACD,GACE,YAAa,AAEb,eAAgB,AAChB,eAAiB,CAClB,AACD,MAJE,SAAW,CAWZ,AAPD,GACE,YAAa,AAEb,eAAgB,AAChB,kBAAmB,AACnB,gBAAiB,AACjB,UAAY,CACb,AACD,uBACE,mBAAoB,AACpB,aAAe,CAChB,AACD,SACE,WAAY,AACZ,aAAc,AACd,kBAAmB,AACnB,iBAAkB,AAClB,8BAA+B,AACvB,sBAAuB,AAC/B,cAAe,AACf,aAAc,AACd,yBAA0B,AAC1B,kBAAmB,AACnB,eAAgB,AAChB,gBAAiB,AACjB,YAAa,AACb,oIAAqI,CACtI,AACD,eACE,oBAAsB,CACvB,AACD,WACE,0BAA2B,AAC3B,oBAAqB,AACrB,WAAY,AACZ,YAAa,AACb,iBAAmB,CACpB,AACD,WACE,YAAa,AACb,aAAc,AACd,qBAAsB,AACtB,kBAAmB,AACnB,cAAgB,CACjB,AACD,iBACE,WAAY,AACZ,YAAa,AACb,UAAW,AAEX,MAAO,AACP,OAAQ,AACR,UAAY,CAEb,AACD,8BANE,kBAAmB,AAInB,cAAgB,CAUjB,AARD,aAEE,SAAU,AACV,WAAY,AACZ,WAAY,AACZ,qBAAsB,AAEtB,cAAgB,CACjB,AACD,mBACE,uBAA0B,CAC3B,AAKD,6BAHE,WAAY,AACZ,WAAa,CAMd,AAJD,SACE,aAAe,CAGhB,AACD,oBACE,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,WAAY,AACZ,YAAa,AACb,kBAAmB,AACnB,kBAAmB,AACnB,kBAAmB,AACnB,YAAc,CACf,AACD,SACE,YAAa,AACb,yBAA0B,AAC1B,iBAAkB,AAClB,6BAA+B,CAChC,AACD,YACE,gBAAiB,AACjB,eAAiB,CAClB,AACD,eACE,WAAY,AACZ,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,gBAAiB,AACjB,kBAAmB,AACnB,iBAAmB,CACpB,AACD,6BACE,cAAgB,CACjB,AACD,mBACE,WAAa,CACd,AACD,MACE,eAAgB,AAChB,cAAgB,CACjB,AACD,MACE,gBAAiB,AACjB,eAAiB,CAClB,AACD,SACE,WAAY,AAGZ,kBAAmB,AACnB,kBAAoB,CACrB,AACD,wBALE,YAAa,AACb,YAAc,CAOf,AACD,iBACE,eAAiB,CAClB,AACD,oBACE,WAAY,AACZ,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,kBAAoB,CACrB,AACD,kCACE,cAAgB,CACjB",file:"Demandinfo.vue",sourcesContent:['\n.di_top {\n  width: 100%;\n  height: 100px;\n  background: rgba(255, 213, 205, 1);\n  overflow: hidden;\n  position: relative;\n}\n.di_top > .di_title {\n  font-size: 24px;\n  color: #333333;\n  margin-top: 23px;\n  margin-left: 10px;\n}\n.di_success_money {\n  width: 345px;\n  height: 193px;\n  background: rgba(245, 245, 245, 1);\n  border-radius: 4px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin-left: -173px;\n  margin-top: -96px;\n}\n.di_desc {\n  margin-top: 15px;\n  margin-left: 10px;\n  font-size: 14px;\n  color: #333333;\n}\n.di_btn {\n  width: 120px;\n  height: 50px;\n  background: rgba(254, 101, 73, 1);\n  border-radius: 4px;\n  font-size: 18px;\n  line-height: 50px;\n  text-align: center;\n  color: #FFF;\n  position: absolute;\n  top: 25px;\n  right: 35px;\n  cursor: pointer;\n}\n.conbody > .labelpage {\n  width: 100%;\n  height: 50px;\n  margin-top: 10px;\n}\n.di_moneytype {\n  display: inline-block;\n  height: 100%;\n  border: 1px solid #ddd;\n  margin-right: 15px;\n  padding: 0 20px;\n  cursor: pointer;\n}\n.di_moneytype_active {\n  border: 1px solid #348DFF;\n  color: #348DFF;\n}\n.labelpage > ul {\n  width: 100%;\n  height: 100%;\n}\n.labelpage > ul > li {\n  float: left;\n  padding: 0 3px;\n  font-size: 16px;\n  line-height: 30px;\n  margin-left: 10px;\n  margin-right: 25px;\n  margin-top: 9px;\n  background: #fff;\n  cursor: pointer;\n}\n.di_input_money {\n  height: 30px;\n  width: 100px;\n  font-size: 16px;\n  padding-left: 10px;\n  border: 1px solid #ddd;\n  outline: none;\n}\n.di_input_money:focus {\n  border-color: #545ca6;\n}\n.labelpage > ul > li:hover {\n  border-bottom: 2px solid #d01667;\n}\n.labelpage > ul > .labelpage_active {\n  border-bottom: 2px solid #d01667;\n}\n.di_info {\n  border: 2px dashed #DEDEDE;\n  padding: 15px 0 15px 20px;\n  margin-top: 9px;\n}\n.di_content {\n  padding: 0 20px;\n  margin-top: 15px;\n  font-size: 16px;\n  line-height: 30px;\n}\n.di_imgwarp {\n  padding: 0 20px;\n}\n.di_imgwarp > p {\n  font-size: 18px;\n  height: 60px;\n  line-height: 60px;\n}\n.di_imgwarp > ul {\n  overflow: hidden;\n}\n.di_imgwarp > ul > li {\n  float: left;\n  width: 240px;\n  height: 180px;\n  margin-right: 20px;\n  margin-bottom: 20px;\n  overflow: hidden;\n}\n.di_imgwarp > ul > li:nth-child(3n) {\n  margin-right: 0;\n}\n.di_btn:active {\n  opacity: 0.6;\n}\n.table {\n  width: 750px;\n  border: 1px solid #dedede;\n  margin: 25px auto 0;\n}\nth {\n  height: 50px;\n  width: 25%;\n  font-size: 16px;\n  background: #ddd;\n}\ntr {\n  height: 40px;\n  width: 25%;\n  font-size: 14px;\n  text-align: center;\n  background: #fff;\n  color: #333;\n}\ntbody > tr:nth-child(2n) {\n  background: #edf5ff;\n  color: #313131;\n}\ntextarea {\n  width: 100%;\n  outline: none;\n  padding-left: 10px;\n  padding-top: 10px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: block;\n  height: 100px;\n  border: 1px solid #cbd5dd;\n  border-radius: 2px;\n  font-size: 14px;\n  margin-top: 10px;\n  resize: none;\n  font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "HeitiSC", "WenQuanYi Micro Hei", sans-serif;\n}\ntextarea:focus {\n  border-color: #545ca6;\n}\n.di_upfile {\n  border: 2px dashed #e0e4e8;\n  padding: 0 15px 10px;\n  float: left;\n  width: 800px;\n  position: relative;\n}\n.di_addbtn {\n  width: 240px;\n  height: 180px;\n  display: inline-block;\n  position: relative;\n  cursor: pointer;\n}\n.di_addbtn .file {\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 10;\n  cursor: pointer;\n}\n.di_btn_span {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  color: #bbb;\n  display: inline-block;\n  cursor: pointer;\n  font-size: 14px;\n}\n.di_btn_span:hover {\n  color: #d01667 !important;\n}\n.di_addbtn .add-img {\n  width: 100%;\n  height: 100%;\n}\n.add-img {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.di_addbtn > .zhezhao {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: silver;\n  text-align: center;\n  line-height: 150px;\n  display: none;\n}\n.di_list {\n  width: 800px;\n  padding: 10px 0 10px 20px;\n  margin-left: 10px;\n  border-left: 1px solid #fe6549;\n}\n.di_list > ul {\n  list-style: none;\n  overflow: hidden;\n}\n.di_list > ul > li {\n  float: left;\n  width: 240px;\n  height: 180px;\n  margin-right: 24px;\n  overflow: hidden;\n  text-align: center;\n  line-height: 180px;\n}\n.di_list > ul > li:nth-child(3n) {\n  margin-right: 0;\n}\n.di_list > ul > li > img {\n  width: 240px;\n}\n.desc {\n  padding: 10px 0;\n  font-size: 16px;\n}\n#sort {\n  list-style: none;\n  overflow: hidden;\n}\n#sort > li {\n  float: left;\n  width: 200px;\n  height: 150px;\n  margin-right: 15px;\n  margin-bottom: 15px;\n}\n#sort > li > .item {\n  width: 200px;\n  height: 150px;\n}\n.di_upwrapper > ul {\n  overflow: hidden;\n}\n.di_upwrapper > ul > li {\n  float: left;\n  width: 240px;\n  height: 180px;\n  margin-right: 23px;\n  margin-bottom: 15px;\n}\n.di_upwrapper > ul > li:nth-child(3n) {\n  margin-right: 0;\n}\n'],sourceRoot:""}])},74:function(i,t,e){var n=e(64);"string"==typeof n&&(n=[[i.i,n,""]]),n.locals&&(i.exports=n.locals);e(22)("213dcfe4",n,!0)},91:function(i,t){i.exports={render:function(){var i=this,t=i.$createElement,e=i._self._c||t;return e("div",{staticClass:"conbody"},[e("div",{staticClass:"di_top"},[e("p",{staticClass:"di_title"},[i._v(i._s(i.post.title))]),i._v(" "),e("p",{staticClass:"di_desc"},[e("span",[i._v("客户："+i._s(i.post.client))]),e("span",{staticStyle:{"margin-left":"54px"}},[i._v("接单日期："+i._s(i.post.starttime))])]),i._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!i.shoukuang,expression:"!shoukuang"}],staticClass:"di_btn",on:{click:function(t){i.shoukuang=!0}}},[i._v("发起收款")]),i._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:i.shoukuang,expression:"shoukuang"}],staticClass:"di_btn",on:{click:function(t){i.shoukuang=!1}}},[i._v("返回")])]),i._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!i.shoukuang,expression:"!shoukuang"}],staticClass:"labelpage"},[e("ul",i._l(i.type,function(t,n){return e("li",{class:{labelpage_active:t.selected},on:{click:function(t){i.choose(n)}}},[i._v(i._s(t.name))])}))]),i._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:i.type[2].selected&&!i.shoukuang,expression:"type[2].selected&&!shoukuang"}],staticClass:"di_info"},[e("div",{staticStyle:{"font-size":"18px"}},[i._v("该项目支付记录")]),i._v(" "),e("table",{staticClass:"table",attrs:{cellspacing:"0",border:"0"}},[i._m(0),i._v(" "),e("tbody",i._l(i.cashflow,function(t){return e("tr",[e("td",[i._v(i._s(t.when))]),i._v(" "),e("td",[i._v(i._s(t.remark))]),i._v(" "),e("td",[i._v(i._s(i.setmoney(t.change_money)))]),i._v(" "),e("td",[e("span",[i._v(i._s(t.status))]),i._v(" "),e("i",{staticClass:"iconfontyyy",staticStyle:{"vertical-align":"-2px","font-size":"20px",color:"#f00",cursor:"pointer"},attrs:{title:t.detail}},[i._v("")])])])}))])]),i._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:i.type[0].selected&&!i.shoukuang,expression:"type[0].selected&&!shoukuang"}],staticStyle:{width:"800px",overflow:"hidden","margin-top":"9px","margin-bottom":"30px"}},[e("div",{staticClass:"di_upfile"},[e("div",{staticStyle:{"font-size":"16px","line-height":"50px"}},[i._v("上传最新作品")]),i._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:i.img_url.length>1,expression:"img_url.length >1"}],staticClass:"di_btn_span iconfontyyy",on:{click:i.sort}},[i._v(" 排序")]),i._v(" "),e("div",{staticClass:"di_upwrapper"},[e("ul",[e("li",[e("section",{staticClass:"di_addbtn"},[e("img",{staticClass:"add-img",attrs:{src:"http://image.houxiaopang.com/baseform/721/addpic.jpg"}}),i._v(" "),e("input",{staticClass:"file",attrs:{type:"file",name:"file",value:"",id:"file",accept:"image/jpg,image/jpeg,image/png,image/gif",multiple:""},on:{change:i.appendImg}})])]),i._v(" "),i._l(i.img_url,function(t,n){return e("imgthumb",{key:n,attrs:{index:n,each_file:t,demand:"1"},on:{img_url:i.rm}})})],2),i._v(" "),e("div",{staticClass:"btn",staticStyle:{display:"none"},attrs:{id:"tt"}}),i._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:i.desc,expression:"desc"}],attrs:{rows:"4",placeholder:"请输入注释"},domProps:{value:i.desc},on:{input:function(t){t.target.composing||(i.desc=t.target.value)}}}),i._v(" "),e("p",{staticClass:"di_btn",staticStyle:{"margin-bottom":"10px",position:"relative",left:"0",top:"0","margin-top":"17px"},on:{click:i.submitpage}},[i._v("提交")])])])]),i._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:i.type[0].selected&&!i.shoukuang&&i.post.postlist.length>0,expression:"type[0].selected&&!shoukuang&&post.postlist.length>0"}],staticStyle:{position:"relative"}},[e("div",{staticStyle:{width:"5px",height:"8px",position:"absolute",background:"#fff",top:"0",left:"8px","z-index":"10"}}),i._v(" "),i._l(i.post.postlist,function(t,n){return e("div",[e("div",{staticStyle:{padding:"10px 0 10px 20px","margin-left":"10px","border-left":"1px solid #fe6549",position:"relative"}},[i._v("\n        "+i._s(t.up_time)+"\n        "),e("i",{directives:[{name:"show",rawName:"v-show",value:0==n,expression:"index == 0"}],staticStyle:{display:"block",position:"absolute",width:"20px",height:"20px",background:"#fe6549",top:"8px",left:"-10px","border-radius":"50%",border:"4px solid #ffaa9a"}}),i._v(" "),e("i",{directives:[{name:"show",rawName:"v-show",value:0!=n,expression:"index != 0"}],staticStyle:{display:"block",position:"absolute",width:"14px",height:"14px",background:"#fe6549",top:"10px",left:"-7px","border-radius":"50%"}})]),i._v(" "),e("div",{staticClass:"di_list"},[e("ul",i._l(t.imglist,function(n){return e("li",{on:{click:function(e){i.open(t.post_id)}}},[e("img",{staticStyle:{cursor:"pointer"},attrs:{src:n+"?imageView2/1/w/200/h/150",alt:""}})])})),i._v(" "),e("div",{staticClass:"desc"},[i._v(i._s(t.desc))])])])})],2),i._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:i.type[1].selected&&!i.shoukuang,expression:"type[1].selected&&!shoukuang"}],staticClass:"di_info"},[e("div",{staticStyle:{"font-size":"18px"}},[i._v(i._s(i.demanddetail.title))]),i._v(" "),e("div",{staticClass:"di_content",domProps:{innerHTML:i._s(i.demanddetail.description)}})]),i._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:i.type[1].selected&&!i.shoukuang&&i.demanddetail.desc_img.length>0,expression:"type[1].selected&&!shoukuang&&demanddetail.desc_img.length>0"}],staticClass:"di_imgwarp"},[e("p",[i._v("参考图片")]),i._v(" "),e("ul",i._l(i.demanddetail.desc_img,function(i){return e("li",[e("img",{staticStyle:{width:"100%"},attrs:{src:i+"?imageView2/1/w/200/h/150",alt:""}})])}))]),i._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:i.shoukuang,expression:"shoukuang"}],staticClass:"di_info",staticStyle:{"margin-top":"40px",position:"relative"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:i.successmoney,expression:"successmoney"}],staticClass:"di_success_money"},[e("p",{staticStyle:{"text-align":"center","font-size":"20px",color:"rgba(51,51,51,1)","margin-top":"50px"}},[i._v("提交成功！")]),i._v(" "),e("p",{staticStyle:{"margin-top":"20px","text-align":"center"}},[i._v("系统将立即通知客户付款")]),i._v(" "),e("div",{staticStyle:{cursor:"pointer","text-align":"center","line-height":"35px",width:"127px",height:"35px",margin:"20px auto 0",border:"1px solid #333",color:"#333","font-size":"18px"},on:{click:i.wangchengmoney}},[i._v("\n        完成\n      ")])]),i._v(" "),e("div",{staticClass:"di_content"},[e("p",[e("span",[i._v("项目名称：")]),i._v(" "),e("span",{staticStyle:{"margin-left":"20px"}},[i._v(i._s(i.post.title))])])]),i._v(" "),e("div",{staticClass:"di_content"},[e("p",[e("span",[i._v("客　　户：")]),i._v(" "),e("span",{staticStyle:{"margin-left":"20px"}},[i._v(i._s(i.post.client))])])]),i._v(" "),e("div",{staticClass:"di_content"},[e("p",[e("span",[i._v("费用类型：")]),i._v(" "),e("span",{staticStyle:{"margin-left":"20px"}},i._l(i.moneyType,function(t,n){return e("span",{staticClass:"di_moneytype",class:{di_moneytype_active:t.selected},on:{click:function(t){i.choosemoneytype(n)}}},[i._v(i._s(t.name))])}))])]),i._v(" "),e("div",{staticClass:"di_content"},[e("p",[e("span",[i._v("费　　用：")]),i._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:i.money,expression:"money"}],staticClass:"di_input_money",staticStyle:{"margin-left":"20px"},attrs:{type:"number"},domProps:{value:i.money},on:{input:function(t){t.target.composing||(i.money=t.target.value)}}}),i._v(" "),e("span",{staticStyle:{"margin-left":"10px"}},[i._v("元")])])]),i._v(" "),i._m(1),i._v(" "),e("div",{staticClass:"di_content"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:i.description,expression:"description"}],attrs:{rows:"4",placeholder:"请输入备注，如对此次收款的补充说明。"},domProps:{value:i.description},on:{input:function(t){t.target.composing||(i.description=t.target.value)}}})]),i._v(" "),e("p",{staticClass:"di_btn",staticStyle:{"margin-bottom":"10px",position:"relative",left:"0",top:"0","margin-top":"17px","margin-left":"20px"},on:{click:i.submitpay}},[i._v("提交申请")])]),i._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:i.sortmodelshow,expression:"sortmodelshow"}],staticClass:"mymodal"},[e("div",{staticClass:"conte",staticStyle:{width:"700px",height:"585px",overflow:"hidden",padding:"0"}},[e("div",{staticStyle:{width:"100%",height:"50px","padding-left":"28px","padding-right":"15px","padding-top":"15px"}},[e("span",[i._v("排序")]),e("span",{staticStyle:{float:"right",cursor:"pointer"},on:{click:i.close}},[e("i",{staticClass:"iconfontyyy"},[i._v("")])])]),i._v(" "),i._m(2),i._v(" "),e("div",{staticStyle:{height:"30px"}},[e("span",{staticClass:"btn_image",staticStyle:{margin:"0 50px 0 0",height:"30px","line-height":"30px",width:"100px",float:"right"},on:{click:i.sortover}},[i._v("确定")])])])])])},staticRenderFns:[function(){var i=this,t=i.$createElement,e=i._self._c||t;return e("thead",[e("tr",[e("th",[i._v("日期")]),i._v(" "),e("th",[i._v("项目")]),i._v(" "),e("th",[i._v("金额（元）")]),i._v(" "),e("th",[i._v("状态")])])])},function(){var i=this,t=i.$createElement,e=i._self._c||t;return e("div",{staticClass:"di_content"},[e("p",[e("span",[i._v("备　　注：")])])])},function(){var i=this,t=i.$createElement,e=i._self._c||t;return e("div",{staticStyle:{height:"495px","overflow-y":"auto"}},[e("ul",{staticStyle:{margin:"0 auto",width:"645px"},attrs:{id:"sort"}})])}]}}});
//# sourceMappingURL=4.4799b06ca3b1a0dfa2da.js.map