webpackJsonp([1],{"++YV":function(t,n,e){"use strict";function i(t){e("mKqf")}Object.defineProperty(n,"__esModule",{value:!0});var o=e("3jsk"),a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"conbody"},[e("p",{staticStyle:{"font-size":"16px"}},[t._v("上传作品集")]),t._v(" "),e("div",{staticClass:"content"},[e("form",{staticClass:"content_form"},[e("div",{staticClass:"context"},[e("span",{staticClass:"err"},[t._v("*必填")]),t._v(" "),e("label",[t._v("标　　题")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],attrs:{type:"text",placeholder:"请输入作品名称"},domProps:{value:t.title},on:{input:function(n){n.target.composing||(t.title=n.target.value)}}})]),t._v(" "),e("div",{staticClass:"context"},[t._m(0,!1,!1),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.desc,expression:"desc"}],attrs:{id:"editor",placeholder:"Balabala"},domProps:{value:t.desc},on:{input:function(n){n.target.composing||(t.desc=n.target.value)}}})]),t._v(" "),e("div",{staticClass:"context"},[e("label",[t._v("所属品类")]),t._v(" "),e("select",{directives:[{name:"model",rawName:"v-model",value:t.category,expression:"category"}],staticStyle:{width:"261px"},attrs:{name:"category"},on:{change:function(n){var e=Array.prototype.filter.call(n.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.category=n.target.multiple?e:e[0]}}},[e("option",{attrs:{value:"1"}},[t._v("PPT")]),t._v(" "),e("option",{attrs:{value:"2"}},[t._v("UI")]),t._v(" "),e("option",{attrs:{value:"3"}},[t._v("文本画册")]),t._v(" "),e("option",{attrs:{value:"4"}},[t._v("海报展板")]),t._v(" "),e("option",{attrs:{value:"5"}},[t._v("LOGO")]),t._v(" "),e("option",{attrs:{value:"6"}},[t._v("企业形象设计（VI）")])])]),t._v(" "),e("div",{staticClass:"context"},[e("label",[t._v("作品价格区间")]),t._v(" "),e("select",{directives:[{name:"model",rawName:"v-model",value:t.price,expression:"price"}],staticStyle:{width:"261px"},attrs:{name:"price"},on:{change:function(n){var e=Array.prototype.filter.call(n.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.price=n.target.multiple?e:e[0]}}},[e("option",{attrs:{value:"无"}},[t._v("无")]),t._v(" "),e("option",{attrs:{value:"0-2000元"}},[t._v("0-2000元")]),t._v(" "),e("option",{attrs:{value:"2000-4000元"}},[t._v("2000-4000元")]),t._v(" "),e("option",{attrs:{value:"4000-6000元"}},[t._v("4000-6000元")]),t._v(" "),e("option",{attrs:{value:"6000-8000元"}},[t._v("6000-8000元")]),t._v(" "),e("option",{attrs:{value:"8000元以上"}},[t._v("8000元以上")])])]),t._v(" "),t._m(1,!1,!1),t._v(" "),t._m(2,!1,!1),t._v(" "),e("div",{staticClass:"context"},[e("span",{staticClass:"err"},[t._v("*必填")]),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:t.img_url.length>1,expression:"img_url.length > 1"}],staticClass:"btn_span iconfontyyy",on:{click:t.sort}},[t._v(" 排序")]),t._v(" "),e("label",[t._v("上传作品")]),t._v(" "),e("div",{staticStyle:{float:"left","max-width":"60%"}},[e("div",{staticClass:"upfile",staticStyle:{"padding-top":"45px"}},[e("div",{staticClass:"upwrapper"},[e("ul",[e("li",[e("section",{staticClass:"addbtn"},[e("img",{staticClass:"add-img",attrs:{src:"http://image.houxiaopang.com/baseform/721/addpic.jpg"}}),t._v(" "),e("input",{staticClass:"file",attrs:{type:"file",name:"file",value:"",id:"file",accept:"image/jpg,image/jpeg,image/png,image/gif",multiple:""},on:{change:t.appendImg}})])]),t._v(" "),t._l(t.img_url,function(n,i){return e("imgthumb",{key:i,attrs:{index:i,each_file:n},on:{img_url:t.rm}})})],2),t._v(" "),e("div",{staticClass:"btn",staticStyle:{display:"none"},attrs:{id:"tt"}})])])])]),t._v(" "),e("div",{staticClass:"context"},[e("span",{staticClass:"err"},[t._v("*必填")]),t._v(" "),e("label",[t._v("上传封面")]),t._v(" "),e("div",{staticStyle:{float:"left"}},[e("div",{staticClass:"upfile",staticStyle:{"padding-right":"30px"}},[e("div",{staticClass:"upwrapper",staticStyle:{height:"150px"}},[e("section",{staticClass:"addbtn",attrs:{id:"album_cover"}},[e("img",{staticClass:"add-img",attrs:{id:"cropedimg",src:t.ablumfile},on:{click:t.show_upload_album}}),t._v(" "),t._m(3,!1,!1)])])])])]),t._v(" "),e("div",{staticClass:"btn_image",on:{click:t.submit}},[t._v("提交材料")])])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.sortmodelshow,expression:"sortmodelshow"}],staticClass:"mymodal"},[e("div",{staticClass:"conte",staticStyle:{width:"700px",height:"585px",overflow:"hidden",padding:"0"}},[e("div",{staticStyle:{width:"100%",height:"50px","padding-left":"28px","padding-right":"15px","padding-top":"15px"}},[e("span",[t._v("排序")]),e("span",{staticStyle:{float:"right",cursor:"pointer"},on:{click:function(n){t.sortmodelshow=!1}}},[e("i",{staticClass:"iconfontyyy"},[t._v("")])])]),t._v(" "),t._m(4,!1,!1),t._v(" "),e("div",{staticStyle:{height:"30px"}},[e("span",{staticClass:"btn_image",staticStyle:{margin:"0 50px 0 0",height:"30px","line-height":"30px",width:"100px",float:"right"},on:{click:t.sortover}},[t._v("确定")])])])]),t._v(" "),e("prompt",{attrs:{prompt:"success",promptshow:t.promptshow}}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.modelshow,expression:"modelshow"}],staticClass:"mymodal"},[e("div",{staticClass:"conte"},[e("div",{staticStyle:{width:"100%","line-height":"30px",height:"39px"}},[e("span",[t._v("上传封面")]),e("span",{staticStyle:{float:"right",cursor:"pointer"},on:{click:t.close}},[e("i",{staticClass:"iconfontyyy"},[t._v("")])])]),t._v(" "),t._m(5,!1,!1),t._v(" "),t._m(6,!1,!1),t._v(" "),e("div",{staticClass:"div_btns"},[e("i",{staticClass:"iconfontyyy",attrs:{"data-method":"zoom","data-option":"0.1",title:"放大"}},[t._v("")]),t._v(" "),e("i",{staticClass:"iconfontyyy",attrs:{"data-method":"zoom","data-option":"-0.1",type:"button",title:"缩小"}},[t._v("")]),t._v(" "),e("i",{staticClass:"iconfontyyy",attrs:{"data-method":"rotate","data-option":"-45",type:"button",title:"左旋"}},[t._v("")]),t._v(" "),e("i",{staticClass:"iconfontyyy",attrs:{"data-method":"rotate","data-option":"45",type:"button",title:"右旋"}},[t._v("")]),t._v(" "),e("button",{staticStyle:{width:"120px"},on:{click:t.changeImg}},[t._v("选择文件\n          "),e("input",{staticStyle:{display:"none"},attrs:{id:"inputImage",name:"file",type:"file",accept:"image/jpg,image/jpeg,image/png"}})]),t._v(" "),e("button",{staticStyle:{float:"right",width:"100px","margin-top":"10px"},attrs:{"data-method":"getCroppedCanvas",type:"button"}},[t._v("\n          确定\n        ")])])])])],1)},s=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("label",[t._v("简　　介"),e("span",{staticStyle:{position:"absolute",left:"96px",top:"25px",color:"#999"}},[t._v("(选填)")])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"context"},[e("label",[t._v("作品转载权限")]),t._v(" "),e("ul",[e("li",[e("input",{attrs:{type:"checkbox",value:"1",name:"power"}}),e("span",{staticClass:"checkbox_span"},[t._v("禁止商用")])]),t._v(" "),e("li",{staticStyle:{"margin-left":"160px"}},[e("input",{attrs:{type:"checkbox",value:"2",name:"power"}}),e("span",{staticClass:"checkbox_span"},[t._v("禁止匿名转载")])]),t._v(" "),e("li",{staticStyle:{"margin-left":"160px"}},[e("input",{attrs:{type:"checkbox",value:"3",name:"power"}}),e("span",{staticClass:"checkbox_span"},[t._v("禁止个人使用")])])])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"context"},[e("span",{staticClass:"err"},[t._v("*必填")]),t._v(" "),e("label",[t._v("禁止右键保存")]),t._v(" "),e("div",[e("input",{attrs:{type:"radio",value:"true",name:"ban"}}),e("span",{staticStyle:{"margin-right":"20px","margin-left":"10px"}},[t._v("是")]),t._v(" "),e("input",{attrs:{type:"radio",value:"false",name:"ban"}}),e("span",{staticStyle:{"margin-right":"20px","margin-left":"10px"}},[t._v("否")])])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"zhezhao"},[e("img",{attrs:{src:"http://image.houxiaopang.com/baseform/loading.gif"}})])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticStyle:{height:"495px","overflow-y":"auto"}},[e("ul",{staticStyle:{margin:"0 auto",width:"645px"},attrs:{id:"sort"}})])},function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{attrs:{id:"img-container"}},[i("img",{attrs:{id:"new_img",crossorigin:"anonymous",src:e("m7yz")}})])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticStyle:{float:"left","margin-left":"10px"}},[e("div",{attrs:{id:"img-preview"}})])}],r={render:a,staticRenderFns:s},l=r,p=e("/Xao"),c=i,d=p(o.a,l,!1,c,null,null);n.default=d.exports},"0RUm":function(t,n,e){n=t.exports=e("BkJT")(!0),n.push([t.i,'\n.content_form {\n    width: 800px;\n    margin: 0 auto;\n    padding: 40px 0;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n.content > .content_form > .context {\n    overflow: hidden;\n    line-height: 30px;\n    margin-bottom: 40px;\n    position: relative;\n}\n.context > label {\n    width: 20%;\n    float: left;\n    display: block;\n    text-align: right;\n    padding-right: 20px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n.context > input {\n    width: 80%;\n    outline: none;\n    padding-left: 10px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    display: block;\n    height: 30px;\n    border: 1px solid #cbd5dd;\n    border-radius: 2px;\n    font-size: 14px;\n}\n.context > input:focus {\n    border-color: #545ca6;\n}\n\n  /*  .context > .desc {\n    width: 80%;\n    outline: none;\n    padding-left: 10px;\n    padding-top: 10px;\n    box-sizing: border-box;\n    display: block;\n    height: 100px;\n    border: 1px solid #cbd5dd;\n    border-radius: 2px;\n    font-size: 14px;\n    resize: none;\n    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "HeitiSC", "WenQuanYi Micro Hei", sans-serif;\n  }\n\n  .context > .desc:focus {\n    border-color: #545ca6;\n  }*/\n.context > select {\n    width: 80%;\n    outline: none;\n    padding-left: 10px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    display: block;\n    height: 30px;\n    border: 1px solid #cbd5dd;\n    border-radius: 2px;\n    font-size: 14px;\n}\n.context > select:focus {\n    border-color: #545ca6;\n}\n.upfile {\n    border: 2px dashed #e0e4e8;\n    padding: 30px 15px 30px 30px;\n    float: left;\n}\n.addbtn {\n    width: 200px;\n    height: 150px;\n    display: inline-block;\n    position: relative;\n    cursor: pointer;\n}\n.addbtn .file {\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 10;\n    cursor: pointer;\n}\n.addbtn .add-img {\n    width: 100%;\n    height: 100%;\n}\n.add-img {\n    display: block;\n    width: 100%;\n    height: 100%;\n}\n.addbtn > .zhezhao {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: silver;\n    text-align: center;\n    line-height: 150px;\n    display: none;\n}\n.btn_span {\n    position: absolute;\n    top: 10px;\n    left: 553px;\n    color: #bbb;\n    display: inline-block;\n    cursor: pointer;\n    font-size: 14px;\n}\n.btn_span:hover {\n    color: #d01667 !important;\n}\n#sort {\n    list-style: none;\n    overflow: hidden;\n}\n#sort > li {\n    float: left;\n    width: 200px;\n    height: 150px;\n    margin-right: 15px;\n    margin-bottom: 15px;\n}\n#sort > li > .item {\n    width: 200px;\n    height: 150px;\n}\n.upwrapper > ul {\n}\n.upwrapper > ul > li {\n    float: left;\n    width: 200px;\n    height: 150px;\n    margin-right: 15px;\n    margin-bottom: 15px;\n}\n.checkbox_span {\n    margin-left: 20px;\n}\n',"",{version:3,sources:["F:/tttt/admin/src/components/Newalbum.vue"],names:[],mappings:";AACA;IACI,aAAa;IACb,eAAe;IACf,gBAAgB;IAChB,+BAA+B;YACvB,uBAAuB;CAClC;AACD;IACI,iBAAiB;IACjB,kBAAkB;IAClB,oBAAoB;IACpB,mBAAmB;CACtB;AACD;IACI,WAAW;IACX,YAAY;IACZ,eAAe;IACf,kBAAkB;IAClB,oBAAoB;IACpB,+BAA+B;YACvB,uBAAuB;CAClC;AACD;IACI,WAAW;IACX,cAAc;IACd,mBAAmB;IACnB,+BAA+B;YACvB,uBAAuB;IAC/B,eAAe;IACf,aAAa;IACb,0BAA0B;IAC1B,mBAAmB;IACnB,gBAAgB;CACnB;AACD;IACI,sBAAsB;CACzB;;EAEC;;;;;;;;;;;;;;;;;KAiBG;AACL;IACI,WAAW;IACX,cAAc;IACd,mBAAmB;IACnB,+BAA+B;YACvB,uBAAuB;IAC/B,eAAe;IACf,aAAa;IACb,0BAA0B;IAC1B,mBAAmB;IACnB,gBAAgB;CACnB;AACD;IACI,sBAAsB;CACzB;AACD;IACI,2BAA2B;IAC3B,6BAA6B;IAC7B,YAAY;CACf;AACD;IACI,aAAa;IACb,cAAc;IACd,sBAAsB;IACtB,mBAAmB;IACnB,gBAAgB;CACnB;AACD;IACI,YAAY;IACZ,aAAa;IACb,WAAW;IACX,mBAAmB;IACnB,OAAO;IACP,QAAQ;IACR,YAAY;IACZ,gBAAgB;CACnB;AACD;IACI,YAAY;IACZ,aAAa;CAChB;AACD;IACI,eAAe;IACf,YAAY;IACZ,aAAa;CAChB;AACD;IACI,mBAAmB;IACnB,OAAO;IACP,QAAQ;IACR,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,mBAAmB;IACnB,mBAAmB;IACnB,cAAc;CACjB;AACD;IACI,mBAAmB;IACnB,UAAU;IACV,YAAY;IACZ,YAAY;IACZ,sBAAsB;IACtB,gBAAgB;IAChB,gBAAgB;CACnB;AACD;IACI,0BAA0B;CAC7B;AACD;IACI,iBAAiB;IACjB,iBAAiB;CACpB;AACD;IACI,YAAY;IACZ,aAAa;IACb,cAAc;IACd,mBAAmB;IACnB,oBAAoB;CACvB;AACD;IACI,aAAa;IACb,cAAc;CACjB;AACD;CACC;AACD;IACI,YAAY;IACZ,aAAa;IACb,cAAc;IACd,mBAAmB;IACnB,oBAAoB;CACvB;AACD;IACI,kBAAkB;CACrB",file:"Newalbum.vue",sourcesContent:['\n.content_form {\n    width: 800px;\n    margin: 0 auto;\n    padding: 40px 0;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n.content > .content_form > .context {\n    overflow: hidden;\n    line-height: 30px;\n    margin-bottom: 40px;\n    position: relative;\n}\n.context > label {\n    width: 20%;\n    float: left;\n    display: block;\n    text-align: right;\n    padding-right: 20px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n.context > input {\n    width: 80%;\n    outline: none;\n    padding-left: 10px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    display: block;\n    height: 30px;\n    border: 1px solid #cbd5dd;\n    border-radius: 2px;\n    font-size: 14px;\n}\n.context > input:focus {\n    border-color: #545ca6;\n}\n\n  /*  .context > .desc {\n    width: 80%;\n    outline: none;\n    padding-left: 10px;\n    padding-top: 10px;\n    box-sizing: border-box;\n    display: block;\n    height: 100px;\n    border: 1px solid #cbd5dd;\n    border-radius: 2px;\n    font-size: 14px;\n    resize: none;\n    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "HeitiSC", "WenQuanYi Micro Hei", sans-serif;\n  }\n\n  .context > .desc:focus {\n    border-color: #545ca6;\n  }*/\n.context > select {\n    width: 80%;\n    outline: none;\n    padding-left: 10px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    display: block;\n    height: 30px;\n    border: 1px solid #cbd5dd;\n    border-radius: 2px;\n    font-size: 14px;\n}\n.context > select:focus {\n    border-color: #545ca6;\n}\n.upfile {\n    border: 2px dashed #e0e4e8;\n    padding: 30px 15px 30px 30px;\n    float: left;\n}\n.addbtn {\n    width: 200px;\n    height: 150px;\n    display: inline-block;\n    position: relative;\n    cursor: pointer;\n}\n.addbtn .file {\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 10;\n    cursor: pointer;\n}\n.addbtn .add-img {\n    width: 100%;\n    height: 100%;\n}\n.add-img {\n    display: block;\n    width: 100%;\n    height: 100%;\n}\n.addbtn > .zhezhao {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: silver;\n    text-align: center;\n    line-height: 150px;\n    display: none;\n}\n.btn_span {\n    position: absolute;\n    top: 10px;\n    left: 553px;\n    color: #bbb;\n    display: inline-block;\n    cursor: pointer;\n    font-size: 14px;\n}\n.btn_span:hover {\n    color: #d01667 !important;\n}\n#sort {\n    list-style: none;\n    overflow: hidden;\n}\n#sort > li {\n    float: left;\n    width: 200px;\n    height: 150px;\n    margin-right: 15px;\n    margin-bottom: 15px;\n}\n#sort > li > .item {\n    width: 200px;\n    height: 150px;\n}\n.upwrapper > ul {\n}\n.upwrapper > ul > li {\n    float: left;\n    width: 200px;\n    height: 150px;\n    margin-right: 15px;\n    margin-bottom: 15px;\n}\n.checkbox_span {\n    margin-left: 20px;\n}\n'],sourceRoot:""}])},"3jsk":function(module,__webpack_exports__,__webpack_require__){"use strict";function Pointer(t,n){this.x=t,this.y=n}function Position(t,n){this.left=t,this.top=n}var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__=__webpack_require__("3cXf"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__),__WEBPACK_IMPORTED_MODULE_1__components_Imgthumb__=__webpack_require__("S7Iv"),__WEBPACK_IMPORTED_MODULE_2__components_Prompt__=__webpack_require__("d8WY");__webpack_exports__.a={data:function(){return{flag:!0,promptshow:!1,title:"",desc:"",img_url:[],ablumfile:"http://image.houxiaopang.com/baseform/721/addpic.jpg",category:1,sortmodelshow:!1,modelshow:!1,img_index:0,album_id:null,imgupload:!1,editor:null,price:null,not_business:!1,not_anonymous:!1,not_single:!1,not_saved:null,toolbar:["bold","italic","underline","strikethrough","color","|","ol","ul","|","link","|","indent","outdent"]}},mounted:function(){this.editor=new Simditor({textarea:$("#editor"),placeholder:"",params:{},upload:!1,tabIndent:!0,toolbar:this.toolbar,toolbarFloat:!0,toolbarFloatOffset:0,toolbarHidden:!1,pasteImage:!1,cleanPaste:!1}),registerup(this),cropper(this.uploadImg,{img:"#new_img",preview:"#img-preview",aspectRatio:4/3,inputImage:"#inputImage"}),$("input[type='checkbox']").iCheck({checkboxClass:"icheckbox_square-red",radioClass:"iradio_square-red",increaseArea:"20%"}),$("input[type='radio']").iCheck({radioClass:"iradio_square-red"})},components:{imgthumb:__WEBPACK_IMPORTED_MODULE_1__components_Imgthumb__.a,prompt:__WEBPACK_IMPORTED_MODULE_2__components_Prompt__.a},methods:{initPhoto:function(){$("#sort .item").each(function(t){this.init=function(){this.box=$(this).parent(),$(this).attr("index",t).css({position:"absolute",left:this.box.offset().left,top:this.box.offset().top}).appendTo("#sort"),this.drag()},this.move=function(t){$(this).stop(!0).animate({left:this.box.offset().left,top:this.box.offset().top},500,function(){t&&t.call(this)})},this.collisionCheck=function(){var t=this,n=null;$(this).siblings(".item").each(function(){t.pointer.x>this.box.offset().left&&t.pointer.y>this.box.offset().top&&t.pointer.x<this.box.offset().left+this.box.width()&&t.pointer.y<this.box.offset().top+this.box.height()&&(n=t.box.offset().top<this.box.offset().top?"down":t.box.offset().top>this.box.offset().top?"up":"normal",this.swap(t,n))})},this.swap=function(t,n){({normal:function(){var n=this.box;this.box=t.box,t.box=n,this.move(),$(this).attr("index",this.box.index()),$(t).attr("index",t.box.index())},down:function(){for(var n=this.box,e=this,i=t.box.index(),o=e.box.index(),a=o;a>i;a--){var s=$("#sort .item[index="+(a-1)+"]")[0];e.box=s.box,$(e).attr("index",e.box.index()),e.move(),e=s}t.box=n,$(t).attr("index",n.index())},up:function(){for(var n=this.box,e=this,i=e.box.index(),o=t.box.index(),a=i;a<o;a++){var s=$("#sort .item[index="+(a+1)+"]")[0];e.box=s.box,$(e).attr("index",e.box.index()),e.move(),e=s}t.box=n,$(t).attr("index",n.index())}})[n].call(this)},this.drag=function(){var t=new Position,n=new Pointer,e=!1,i=null;$(this).mousedown(function(o){o.preventDefault(),t.left=$(this).position().left,t.top=$(this).position().top,n.x=o.clientX,n.y=o.clientY,e=!0,i=this}),$(document).mousemove(function(o){var a=new Pointer(o.clientX,o.clientY);if(!e)return!1;$(i).css({opacity:"0.8","z-index":999});var s=a.x-n.x+t.left,r=a.y-n.y+t.top;$(i).css({left:s,top:r}),i.pointer=a,i.collisionCheck()}),$(document).mouseup(function(){if(!e)return!1;e=!1,i.move(function(){$(this).css({opacity:"1","z-index":0})})})},this.init()})},sort:function(){window.scrollTo(0,0),document.body.style.overflow="hidden",this.sortmodelshow=!0,this.$nextTick(function(){var t=document.getElementById("sort");t.innerHTML="",[].forEach.call(this.img_url,function(n){n+="?imageView2/1/w/200/h/150";var e="<li><div class='item' style='width: 200px;height: 150px;overflow: hidden'><img src='"+n+"' width='200'></div></li>";t.innerHTML+=e}),this.initPhoto()})},close:function(){document.body.style.overflow="auto",this.modelshow=!1},sortover:function(){var t=[];$("#sort .item").each(function(){t.push($(this).attr("index"))});var n=[],e=this;[].forEach.call(this.img_url,function(i,o){n[t[o]]=e.img_url[o]}),this.img_url=n,this.$nextTick(function(){document.body.style.overflow="auto",this.sortmodelshow=!1})},uploadImg:function uploadImg(result){var cropedimg=document.getElementById("cropedimg");cropedimg.nextElementSibling.style.display="block",this.modelshow=!1;var pic=result.toDataURL(),uploadpic=pic.split(",")[1],that=this;$.ajax({type:"GET",url:"http://www.houxiaopang.com/api/v1.0/apply/uptoken",success:function success(data){var url="http://upload.qiniu.com/putb64/-1",xhr=new XMLHttpRequest;xhr.onreadystatechange=function(){if(4==xhr.readyState){var data=eval("("+xhr.responseText+")");that.ablumfile="http://work.houxiaopang.com/"+data.key,cropedimg.nextElementSibling.style.display="none"}},xhr.open("POST",url,!0),xhr.setRequestHeader("Content-Type","application/octet-stream"),xhr.setRequestHeader("Authorization","UpToken "+data.uptoken),xhr.send(uploadpic)}})},changeImg:function(){document.getElementById("inputImage").click()},rm:function(t){this.img_url.splice(t,1),this.img_index--},submit:function(){this.desc=this.editor.getValue();var t=$("input[type='radio'][name='ban']:checked");t[0]&&("true"===t[0].value?this.not_saved=!0:"false"===t[0].value&&(this.not_saved=!1)),null===this.title||""===this.title.trim()?$(".err").eq(0).css("display","block"):$(".err").eq(0).css("display","none"),null===this.not_saved?$(".err").eq(1).css("display","block"):$(".err").eq(1).css("display","none"),this.img_url.length<=0?$(".err").eq(2).css("display","block"):$(".err").eq(2).css("display","none"),"http://image.houxiaopang.com/baseform/721/addpic.jpg"==this.ablumfile?$(".err").eq(3).css("display","block"):$(".err").eq(3).css("display","none");for(var n=0;n<4;n++)if("block"==$(".err").eq(n).css("display"))return;this.not_business=!1,this.not_anonymous=!1,this.not_single=!1;var e=$("input[type='checkbox'][name='power']:checked");if(0!=e.length)for(var i=0;i<e.length;i++)"1"===e[i].value?this.not_business=!0:"2"===e[i].value?this.not_anonymous=!0:this.not_single=!0;if(this.imgupload)return void alert("请等待图片上传完成。");if(this.flag){this.flag=!1,_czc.push(["_trackEvent","上传作品集-提交","点击"]);var o=this;$.ajax({headers:{Authorization:"Token "+token},url:"http://www.houxiaopang.com/api/v1.1/newalbum",type:"POST",data:{title:o.title.trim(),work_list:__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(o.img_url),cover:o.ablumfile,description:o.desc.trim(),category:o.category,album_id:o.album_id,price:o.price,not_business:o.not_business,not_anonymous:o.not_anonymous,not_single:o.not_single,not_saved:o.not_saved},success:function(t){o.flag=!0,0===t.code?(o.promptshow=!0,setTimeout(function(){o.promptshow=!1,o.$router.push({path:"/"})},1e3)):alert("网络拥挤，请稍后再试···")},error:function(t){o.flag=!0,401===t.status?location.href="http://houxiaopang.com/qrlogin":alert("网络拥挤，请稍后再试···")}})}},appendImg:function(){this.imgupload=!0;for(var t=document.getElementById("file"),n=0,e=t.files.length;n<e;n++)this.img_url.splice(this.img_url.length+n,0,0);this.$nextTick(function(){for(var n=0,e=t.files.length;n<e;n++)uploader.addFile(t.files[n])})},show_upload_album:function(){this.modelshow=!0}},created:function(){if(_czc.push(["_trackEvent","上传作品集-进入","点击"]),this.album_id=this.$route.query.album_id,this.album_id){var t=this;$.ajax({type:"get",url:"http://www.houxiaopang.com/api/v1.1/newalbum",headers:{Authorization:"Token "+token},data:{album_id:t.album_id},success:function(n){if(0===n.code){var e=n.data;t.title=e.title,t.desc=e.description,t.editor.setValue(t.desc),t.img_url=e.worklist,t.ablumfile=e.cover,t.img_index=e.worklist.length,t.category=e.category,t.price=e.price,t.not_business=e.not_business,t.not_anonymous=e.not_anonymous,t.not_single=e.not_single,t.not_saved=e.not_saved,t.not_business&&$("input[type='checkbox'][name='power'][value='1']").iCheck("check"),t.not_anonymous&&$("input[type='checkbox'][name='power'][value='2']").iCheck("check"),t.not_single&&$("input[type='checkbox'][name='power'][value='3']").iCheck("check"),t.not_saved?$("input[type='radio'][name='ban'][value='true']").iCheck("check"):$("input[type='radio'][name='ban'][value='false']").iCheck("check"),t.$nextTick(function(){$(".up-section").removeClass("loading"),$(".up-img").removeClass("up-opcity")})}else alert("网络拥挤，请稍后再试···")},error:function(){alert("网络拥挤，请稍后再试···")}})}},watch:{$route:function(){this.title="",this.desc="",this.img_url=[],this.ablumfile="http://image.houxiaopang.com/baseform/721/addpic.jpg",this.category=1,this.sortmodelshow=!1,this.modelshow=!1,this.img_index=0,this.album_id=null,this.price="0-2000元",this.not_business=!1,this.not_anonymous=!1,this.not_single=!1,this.not_saved=!1}}}},"4/BS":function(t,n,e){n=t.exports=e("BkJT")(!0),n.push([t.i,"\n.up-section {\n  vertical-align: top;\n  position: relative;\n  overflow: hidden;\n  -webkit-box-shadow: 0 0 1px 0;\n          box-shadow: 0 0 1px 0;\n  text-align: center;\n  line-height: 150px;\n}\n.up-section .close-upimg {\n  position: absolute;\n  top: 6px;\n  right: 8px;\n  display: none;\n  z-index: 10;\n  cursor: pointer;\n}\n.up-section .up-span {\n  display: block;\n  width: 100%;\n  height: 100%;\n  visibility: hidden;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 9;\n  background: rgba(0, 0, 0, .5);\n}\n.up-section:hover .close-upimg {\n  display: block;\n}\n.up-section:hover .up-span {\n  visibility: visible;\n}\n.loading {\n  border: 1px solid #D1D1D1;\n  background: url('http://image.houxiaopang.com/baseform/loading.gif') no-repeat center;\n}\n.up-opcity {\n  opacity: 0;\n}\n.upimg-div .up-section {\n  width: 160px;\n  height: 120px;\n  overflow: hidden;\n}\n.up-img {\n  width: 100%;\n}\n\n","",{version:3,sources:["F:/tttt/admin/src/components/Imgthumb.vue"],names:[],mappings:";AACA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,iBAAiB;EACjB,8BAA8B;UACtB,sBAAsB;EAC9B,mBAAmB;EACnB,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,SAAS;EACT,WAAW;EACX,cAAc;EACd,YAAY;EACZ,gBAAgB;CACjB;AACD;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,OAAO;EACP,QAAQ;EACR,WAAW;EACX,8BAA8B;CAC/B;AACD;EACE,eAAe;CAChB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,0BAA0B;EAC1B,sFAAsF;CACvF;AACD;EACE,WAAW;CACZ;AACD;EACE,aAAa;EACb,cAAc;EACd,iBAAiB;CAClB;AACD;EACE,YAAY;CACb",file:"Imgthumb.vue",sourcesContent:["\n.up-section {\n  vertical-align: top;\n  position: relative;\n  overflow: hidden;\n  -webkit-box-shadow: 0 0 1px 0;\n          box-shadow: 0 0 1px 0;\n  text-align: center;\n  line-height: 150px;\n}\n.up-section .close-upimg {\n  position: absolute;\n  top: 6px;\n  right: 8px;\n  display: none;\n  z-index: 10;\n  cursor: pointer;\n}\n.up-section .up-span {\n  display: block;\n  width: 100%;\n  height: 100%;\n  visibility: hidden;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 9;\n  background: rgba(0, 0, 0, .5);\n}\n.up-section:hover .close-upimg {\n  display: block;\n}\n.up-section:hover .up-span {\n  visibility: visible;\n}\n.loading {\n  border: 1px solid #D1D1D1;\n  background: url('http://image.houxiaopang.com/baseform/loading.gif') no-repeat center;\n}\n.up-opcity {\n  opacity: 0;\n}\n.upimg-div .up-section {\n  width: 160px;\n  height: 120px;\n  overflow: hidden;\n}\n.up-img {\n  width: 100%;\n}\n\n"],sourceRoot:""}])},S7Iv:function(t,n,e){"use strict";function i(t){e("mlyl")}var o={props:["each_file","index","demand"],data:function(){return{width:"200px",height:"150px"}},created:function(){this.demand&&(this.width="240px",this.height="180px")},methods:{delconfirm:function(){this.$emit("img_url",this.index)}}},a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("li",[e("section",{staticClass:"up-section loading",style:{width:t.width,height:t.height}},[e("span",{staticClass:"up-span"}),t._v(" "),e("img",{staticClass:"close-upimg",attrs:{src:"http://image.houxiaopang.com/baseform/a7.png"},on:{click:t.delconfirm}}),t._v(" "),e("img",{staticClass:"up-img up-opcity",attrs:{src:t.each_file+"?imageView2/1/w/200/h/150"}})])])},s=[],r={render:a,staticRenderFns:s},l=r,p=e("/Xao"),c=i,d=p(o,l,!1,c,null,null);n.a=d.exports},m7yz:function(t,n){t.exports="data:image/png;base64,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"},mKqf:function(t,n,e){var i=e("0RUm");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("8bSs")("127f4740",i,!0)},mlyl:function(t,n,e){var i=e("4/BS");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("8bSs")("6b4e7494",i,!0)}});
//# sourceMappingURL=1.bc1eed207daaa54b780d.js.map