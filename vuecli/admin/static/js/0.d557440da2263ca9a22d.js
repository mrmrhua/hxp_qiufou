webpackJsonp([0],[,,,,,,,,,,,,,,,function(t,n,i){function e(t){i(24)}var o=i(3)(i(31),i(28),e,null,null);t.exports=o.exports},,,function(t,n,i){n=t.exports=i(12)(!0),n.push([t.i,'.up-section{width:200px;height:150px;display:inline-block;margin-right:15px;vertical-align:top;position:relative;margin-bottom:15px;overflow:hidden;-webkit-box-shadow:0 0 1px 0;box-shadow:0 0 1px 0}.up-section .close-upimg{position:absolute;top:6px;right:8px;display:none;z-index:10;cursor:pointer}.up-section .up-span{display:block;width:100%;height:100%;visibility:hidden;position:absolute;top:0;left:0;z-index:9;background:rgba(0,0,0,.5)}.up-section:hover .close-upimg{display:block}.up-section:hover .up-span{visibility:visible}.loading{border:1px solid #d1d1d1;background:url("http://image.houxiaopang.com/baseform/loading.gif") no-repeat 50%}.up-opcity{opacity:0}.upimg-div .up-section{width:160px;height:120px;overflow:hidden}',"",{version:3,sources:["C:/vue/adminv1.0/src/components/Imgthumb.vue"],names:[],mappings:"AACA,YACE,YAAa,AACb,aAAc,AACd,qBAAsB,AACtB,kBAAmB,AACnB,mBAAoB,AACpB,kBAAmB,AACnB,mBAAoB,AACpB,gBAAiB,AACjB,6BAA8B,AACtB,oBAAsB,CAC/B,AACD,yBACE,kBAAmB,AACnB,QAAS,AACT,UAAW,AACX,aAAc,AACd,WAAY,AACZ,cAAgB,CACjB,AACD,qBACE,cAAe,AACf,WAAY,AACZ,YAAa,AACb,kBAAmB,AACnB,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,UAAW,AACX,yBAA8B,CAC/B,AACD,+BACE,aAAe,CAChB,AACD,2BACE,kBAAoB,CACrB,AACD,SACE,yBAA0B,AAC1B,iFAAsF,CACvF,AACD,WACE,SAAW,CACZ,AACD,uBACE,YAAa,AACb,aAAc,AACd,eAAiB,CAClB",file:"Imgthumb.vue",sourcesContent:["\n.up-section {\n  width: 200px;\n  height: 150px;\n  display: inline-block;\n  margin-right: 15px;\n  vertical-align: top;\n  position: relative;\n  margin-bottom: 15px;\n  overflow: hidden;\n  -webkit-box-shadow: 0 0 1px 0;\n          box-shadow: 0 0 1px 0;\n}\n.up-section .close-upimg {\n  position: absolute;\n  top: 6px;\n  right: 8px;\n  display: none;\n  z-index: 10;\n  cursor: pointer;\n}\n.up-section .up-span {\n  display: block;\n  width: 100%;\n  height: 100%;\n  visibility: hidden;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 9;\n  background: rgba(0, 0, 0, .5);\n}\n.up-section:hover .close-upimg {\n  display: block;\n}\n.up-section:hover .up-span {\n  visibility: visible;\n}\n.loading {\n  border: 1px solid #D1D1D1;\n  background: url('http://image.houxiaopang.com/baseform/loading.gif') no-repeat center;\n}\n.up-opcity {\n  opacity: 0;\n}\n.upimg-div .up-section {\n  width: 160px;\n  height: 120px;\n  overflow: hidden;\n}\n\n\n"],sourceRoot:""}])},,function(t,n,i){n=t.exports=i(12)(!0),n.push([t.i,".conbody{margin:0 auto;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;height:100%;position:relative}.conbody>p{line-height:40px;height:40px;background-color:#f7fafa;padding-left:15px}.conbody>.content{background:#fff;position:absolute;top:40px;width:100%}.content_form{width:1000px;margin:0 auto;padding:15px 0;-webkit-box-sizing:border-box;box-sizing:border-box}.content>.content_form>.context{overflow:hidden;line-height:30px;margin-bottom:40px;position:relative}.context>label{width:20%;float:left;text-align:right;padding-right:20px}.context>input,.context>label{display:block;-webkit-box-sizing:border-box;box-sizing:border-box}.context>input{width:80%;outline:none;padding-left:10px;height:30px;border:1px solid #cbd5dd;border-radius:2px;font-size:14px}.context>input:focus{border-color:#545ca6}.context>textarea{width:80%;outline:none;padding-left:10px;padding-top:10px;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;height:100px;border:1px solid #cbd5dd;border-radius:2px;font-size:14px;font-family:\\\\5FAE\\8F6F\\96C5\\9ED1,serif}.context>textarea:focus{border-color:#545ca6}.context>select{width:80%;outline:none;padding-left:10px;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;height:30px;border:1px solid #cbd5dd;border-radius:2px;font-size:14px}.context>select:focus{border-color:#545ca6}.upfile{border:2px dashed #e0e4e8;padding:30px 15px 30px 30px;float:left}.addbtn{width:200px;height:150px;display:inline-block;margin-right:12px;position:relative;cursor:pointer}.addbtn .file{opacity:0;position:absolute;top:0;left:0;z-index:100;cursor:pointer}.add-img,.addbtn .add-img,.addbtn .file{width:100%;height:100%}.add-img{display:block}.err{color:red;left:75px}.err,.zhezhao{display:none;position:absolute;top:0}.zhezhao{left:0;width:100%;height:100%;background:silver;text-align:center;line-height:150px}.btn_image{width:150px;height:39px;margin:60px 0 80px 200px;cursor:pointer;border-radius:25px;text-align:center;line-height:39px;color:#788188;background-color:#fff;border:1px solid #dbe2e7;border-bottom-color:#d5dde3;-webkit-box-shadow:0 1px 1px rgba(90,90,90,.1);box-shadow:0 1px 1px rgba(90,90,90,.1)}.btn_image:hover{border:1px solid #adadad;color:#333;background-color:#ebebeb}.mymodal{position:fixed;top:0;left:0;bottom:0;right:0;background:rgba(0,0,0,.6);z-index:20}.mymodal>.conte{width:600px;margin:30px auto;overflow:hidden;background:#fff;border-radius:5px;padding:15px}#img-container{width:400px;height:400px;float:left}#img-preview{width:160px;height:120px;overflow:hidden}.mymodal>.conte>.div_btns{width:100%;height:50px;float:left;line-height:50px}.mymodal>.conte>.div_btns>button{border-radius:25px;width:70px;height:30px;outline:none;cursor:pointer;text-align:center;color:#788188;background-color:#fff;border:1px solid #dbe2e7;border-bottom-color:#d5dde3;-webkit-box-shadow:0 1px 1px rgba(90,90,90,.1);box-shadow:0 1px 1px rgba(90,90,90,.1)}.mymodal>.conte>.div_btns>button:hover{border:1px solid #adadad;color:#333;background-color:#ebebeb}.mymodal>.conte>.div_btns>i{display:inline-block;width:50px;text-align:center;vertical-align:top;cursor:pointer}","",{version:3,sources:["C:/vue/adminv1.0/src/components/Newalbum.vue"],names:[],mappings:"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",file:"Newalbum.vue",sourcesContent:["\n.conbody {\n  margin: 0 auto;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.conbody > p {\n  line-height: 40px;\n  height: 40px;\n  background-color: #f7fafa;\n  padding-left: 15px;\n}\n.conbody > .content {\n  background: #fff;\n  position: absolute;\n  top: 40px;\n  width: 100%;\n}\n.content_form {\n  width: 1000px;\n  margin: 0 auto;\n  padding: 15px 0;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.content > .content_form > .context {\n  overflow: hidden;\n  line-height: 30px;\n  margin-bottom: 40px;\n  position: relative;\n}\n.context > label {\n  width: 20%;\n  float: left;\n  display: block;\n  text-align: right;\n  padding-right: 20px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.context > input {\n  width: 80%;\n  outline: none;\n  padding-left: 10px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: block;\n  height: 30px;\n  border: 1px solid #cbd5dd;\n  border-radius: 2px;\n  font-size: 14px;\n}\n.context > input:focus {\n  border-color: #545ca6;\n}\n.context > textarea {\n  width: 80%;\n  outline: none;\n  padding-left: 10px;\n  padding-top: 10px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: block;\n  height: 100px;\n  border: 1px solid #cbd5dd;\n  border-radius: 2px;\n  font-size: 14px;\n  font-family: '微软雅黑', serif;\n}\n.context > textarea:focus {\n  border-color: #545ca6;\n}\n.context > select {\n  width: 80%;\n  outline: none;\n  padding-left: 10px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: block;\n  height: 30px;\n  border: 1px solid #cbd5dd;\n  border-radius: 2px;\n  font-size: 14px;\n}\n.context > select:focus {\n  border-color: #545ca6;\n}\n.upfile {\n  border: 2px dashed #e0e4e8;\n  padding: 30px 15px 30px 30px;\n  float: left;\n}\n.addbtn {\n  width: 200px;\n  height: 150px;\n  display: inline-block;\n  margin-right: 12px;\n  position: relative;\n  cursor: pointer;\n}\n.addbtn .file {\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 100;\n  cursor: pointer;\n}\n.addbtn .add-img {\n  width: 100%;\n  height: 100%;\n}\n.add-img {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.err {\n  display: none;\n  color: #f00;\n  position: absolute;\n  top: 0;\n  left: 75px;\n}\n.zhezhao {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: silver;\n  text-align: center;\n  line-height: 150px;\n  display: none;\n}\n.btn_image {\n  width: 150px;\n  height: 39px;\n  margin: 60px 0 80px 200px;\n  cursor: pointer;\n  border-radius: 25px;\n  text-align: center;\n  line-height: 39px;\n  color: #788188;\n  background-color: #fff;\n  border: 1px solid #dbe2e7;\n  border-bottom-color: #d5dde3;\n  -webkit-box-shadow: 0 1px 1px rgba(90, 90, 90, 0.1);\n          box-shadow: 0 1px 1px rgba(90, 90, 90, 0.1);\n}\n.btn_image:hover {\n  border: 1px solid #adadad;\n  color: #333;\n  background-color: #ebebeb;\n}\n.mymodal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.6);\n  z-index: 20;\n}\n.mymodal > .conte {\n  width: 600px;\n  margin: 30px auto;\n  overflow: hidden;\n  background: #FFF;\n  border-radius: 5px;\n  padding: 15px;\n}\n#img-container {\n  width: 400px;\n  height: 400px;\n  float: left\n}\n#img-preview {\n  width: 160px;\n  height: 120px;\n  overflow: hidden;\n}\n.mymodal > .conte > .div_btns {\n  width: 100%;\n  height: 50px;\n  float: left;\n  line-height: 50px;\n}\n.mymodal > .conte > .div_btns > button {\n  border-radius: 25px;\n  width: 70px;\n  height: 30px;\n  outline: none;\n  cursor: pointer;\n  text-align: center;\n  color: #788188;\n  background-color: #fff;\n  border: 1px solid #dbe2e7;\n  border-bottom-color: #d5dde3;\n  -webkit-box-shadow: 0 1px 1px rgba(90, 90, 90, 0.1);\n          box-shadow: 0 1px 1px rgba(90, 90, 90, 0.1);\n}\n.mymodal > .conte > .div_btns > button:hover {\n  border: 1px solid #adadad;\n  color: #333;\n  background-color: #ebebeb;\n}\n.mymodal > .conte > .div_btns > i {\n  display: inline-block;\n  width: 50px;\n  text-align: center;\n  vertical-align: top;\n  cursor: pointer;\n}\n"],sourceRoot:""}])},,function(t,n,i){var e=i(18);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);i(13)("2f774e7e",e,!0)},,function(t,n,i){var e=i(20);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);i(13)("c229fb98",e,!0)},,function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("section",{staticClass:"up-section loading"},[i("span",{staticClass:"up-span"}),t._v(" "),i("img",{staticClass:"close-upimg",attrs:{src:"http://image.houxiaopang.com/baseform/a7.png"},on:{click:t.delconfirm}}),t._v(" "),i("img",{staticClass:"up-img up-opcity",attrs:{src:t.getfileurl}})])},staticRenderFns:[]}},,function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"conbody"},[i("p",{staticClass:"head"},[t._v("上传作品")]),t._v(" "),i("div",{staticClass:"content"},[i("form",{staticClass:"content_form"},[i("div",{staticClass:"context"},[i("span",{staticClass:"err"},[t._v("*必填")]),t._v(" "),i("label",[t._v("标　　题")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],attrs:{type:"text",placeholder:"请输入作品名称"},domProps:{value:t.title},on:{input:function(n){n.target.composing||(t.title=n.target.value)}}})]),t._v(" "),i("div",{staticClass:"context"},[i("span",{staticClass:"err",staticStyle:{left:"50px"}},[t._v("*限200字")]),t._v(" "),t._m(0),t._v(" "),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.desc,expression:"desc"}],attrs:{rows:"4",placeholder:"请输入作品说明（限200字）"},domProps:{value:t.desc},on:{input:function(n){n.target.composing||(t.desc=n.target.value)}}})]),t._v(" "),t._m(1),t._v(" "),i("div",{staticClass:"context"},[i("span",{staticClass:"err"},[t._v("*必填")]),t._v(" "),i("label",[t._v("上传作品")]),t._v(" "),i("div",{staticStyle:{float:"left","max-width":"70%"}},[i("div",{staticClass:"upfile"},[i("div",{staticClass:"upwrapper"},[i("section",{staticClass:"addbtn"},[i("img",{staticClass:"add-img",attrs:{src:"http://image.houxiaopang.com/baseform/721/addpic.jpg"}}),t._v(" "),i("input",{staticClass:"file",attrs:{type:"file",name:"file",value:"",id:"file",accept:"image/jpg,image/jpeg,image/png,image/bmp",multiple:""},on:{change:t.appendImg}})]),t._v(" "),t._l(t.fileList,function(n,e){return i("imgthumb",{key:n.id,attrs:{index:e,each_file:n},on:{filelist:function(n){t.rm(e)}}})}),t._v(" "),i("div",{staticClass:"btn",staticStyle:{display:"none"},attrs:{id:"tt"}})],2)])])]),t._v(" "),i("div",{staticClass:"context"},[i("span",{staticClass:"err"},[t._v("*必填")]),t._v(" "),i("label",[t._v("上传封面")]),t._v(" "),i("div",{staticStyle:{float:"left"}},[i("div",{staticClass:"upfile"},[i("div",{staticClass:"upwrapper"},[i("section",{staticClass:"addbtn",attrs:{id:"album_cover"}},[i("img",{staticClass:"add-img",attrs:{id:"cropedimg",src:"http://image.houxiaopang.com/baseform/721/addpic.jpg"},on:{click:t.show_upload_album}}),t._v(" "),t._m(2)])])])])]),t._v(" "),i("div",{staticClass:"btn_image",on:{click:t.submit}},[t._v("提交材料")])])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.modelshow,expression:"modelshow"}],staticClass:"mymodal"},[i("div",{staticClass:"conte"},[i("div",{staticStyle:{width:"100%","line-height":"30px",height:"39px"}},[i("span",[t._v("上传封面")]),i("span",{staticStyle:{float:"right",cursor:"pointer"},on:{click:function(n){t.modelshow=!1}}},[i("i",{staticClass:"iconfontyyy"},[t._v("")])])]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),i("div",{staticClass:"div_btns"},[i("i",{staticClass:"iconfontyyy",attrs:{"data-method":"zoom","data-option":"0.1",title:"放大"}},[t._v("")]),t._v(" "),i("i",{staticClass:"iconfontyyy",attrs:{"data-method":"zoom","data-option":"-0.1",type:"button",title:"缩小"}},[t._v("")]),t._v(" "),i("i",{staticClass:"iconfontyyy",attrs:{"data-method":"rotate","data-option":"-45",type:"button",title:"左旋"}},[t._v("")]),t._v(" "),i("i",{staticClass:"iconfontyyy",attrs:{"data-method":"rotate","data-option":"45",type:"button",title:"右旋"}},[t._v("")]),t._v(" "),i("button",{staticStyle:{width:"120px"},on:{click:t.changeImg}},[t._v("选择文件\n          "),i("input",{staticStyle:{display:"none"},attrs:{id:"inputImage",name:"file",type:"file",accept:"image/*"}})]),t._v(" "),i("button",{staticStyle:{float:"right",width:"100px","margin-top":"10px"},attrs:{"data-method":"getCroppedCanvas",type:"button"}},[t._v("\n          确定\n        ")])])])])])},staticRenderFns:[function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("label",[t._v("简　　介"),i("span",{staticStyle:{position:"absolute",left:"143px",top:"30px",color:"#999"}},[t._v("(选填)")])])},function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"context"},[i("label",[t._v("所属品类")]),t._v(" "),i("select",{staticStyle:{width:"261px"},attrs:{name:"category"}},[i("option",{attrs:{value:"1"}},[t._v("PPT")]),t._v(" "),i("option",{attrs:{value:"2"}},[t._v("UI")]),t._v(" "),i("option",{attrs:{value:"3"}},[t._v("文本画册")]),t._v(" "),i("option",{attrs:{value:"4"}},[t._v("海报展板")]),t._v(" "),i("option",{attrs:{value:"5"}},[t._v("LOGO")]),t._v(" "),t._v('"">企业形象设计（VI）')])])},function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"zhezhao"},[i("img",{attrs:{src:"http://image.houxiaopang.com/baseform/loading.gif"}})])},function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{attrs:{id:"img-container"}},[i("img",{attrs:{src:"http://image.houxiaopang.com/admindash/cover_default.png"}})])},function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticStyle:{float:"left","margin-left":"40px"}},[i("div",{attrs:{id:"img-preview"}})])}]}},function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={props:["each_file","index"],computed:{getfileurl:function(){return window.URL.createObjectURL(this.each_file)}},mounted:function(){uploader.addFile(this.each_file)},methods:{delconfirm:function(){this.$emit("filelist",this.index)}}}},,function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=i(33),o=i.n(e),A=i(4),a=i(36),r=i.n(a);n.default={data:function(){return{title:"",desc:"",fileList:[],img_url:[],ablumfile:"",modelshow:!1}},mounted:function(){registerup(this),cropper(this)},components:{imgthumb:r.a},methods:{changeImg:function(){document.getElementById("inputImage").click()},rm:function(t){this.fileList.splice(t,1),this.img_url.splice(this.index,1)},submit:function(){null===this.title||""===this.title.trim()?$(".err").eq(0).css("display","block"):$(".err").eq(0).css("display","none"),this.desc.length>200?$(".err").eq(1).css("display","block"):$(".err").eq(1).css("display","none"),this.img_url.length<=0?$(".err").eq(2).css("display","block"):$(".err").eq(2).css("display","none"),""===this.ablumfile?$(".err").eq(3).css("display","block"):$(".err").eq(3).css("display","none");for(var t=0;t<3;t++)if("block"===$(".err").eq(t).css("display"))return;var n=this;$.ajax({headers:{Authorization:"Token "+A.a},url:"http://houxiaopang.com/api/v1.1/newalbum",type:"POST",data:{title:this.title.trim(),work_list:o()(this.img_url),cover:this.ablumfile,description:this.desc.trim(),category:$("[name='category']").val()},success:function(t){"0"==t.code?n.$router.push({path:"/"}):alert("提交失败")},error:function(){alert("提交失败")}})},addFile:function(t){this.fileList.push(t)},appendImg:function(){for(var t=document.getElementById("file"),n=0,i=t.files.length;n<i;n++)this.addFile(t.files[n])},show_upload_album:function(){this.modelshow=!0}}}},,function(t,n,i){t.exports={default:i(34),__esModule:!0}},function(t,n,i){var e=i(35),o=e.JSON||(e.JSON={stringify:JSON.stringify});t.exports=function(t){return o.stringify.apply(o,arguments)}},function(t,n){var i=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=i)},function(t,n,i){function e(t){i(22)}var o=i(3)(i(29),i(26),e,null,null);t.exports=o.exports}]);
//# sourceMappingURL=0.d557440da2263ca9a22d.js.map