webpackJsonp([1],{NHnr:function(t,e,a){"use strict";function i(t){a("fAQZ")}Object.defineProperty(e,"__esModule",{value:!0});var s=a("TWX9"),o=a("3cXf"),l=a.n(o),r=a("a3Yh"),n=a.n(r),c={props:["each_file","index"],computed:{getfileurl:function(){return window.URL.createObjectURL(this.each_file)}},mounted:function(){uploader.addFile(this.each_file)},methods:{delconfirm:function(){this.$emit("removeimg",this.index)}}},m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"up-section loading fl"},[a("span",{staticClass:"up-span"}),t._v(" "),a("img",{staticClass:"close-upimg",attrs:{src:"http://image.houxiaopang.com/baseform/a7.png"},on:{click:t.delconfirm}}),t._v(" "),a("img",{staticClass:"up-img up-opcity",attrs:{src:t.getfileurl}})])},p=[],u={render:m,staticRenderFns:p},v=u,d=a("/Xao"),_=d(c,v,!1,null,null,null),f=_.exports,g={name:"app",data:function(){var t;return t={applystatus:0,name:"",tel:"",qq:"",wx:"",email:"",role:"",company_web:"",company_name:"",company_size:null,city:"",file_L:[],blog_url:"",img_url:[],qrbind:null,address:{province:"北京",city:"北京市"},pro:[{id:1,name:"北京市",value:"北京"},{id:2,name:"天津市",value:"天津"},{id:3,name:"河北省",value:"河北"},{id:4,name:"山西省",value:"山西"},{id:5,name:"内蒙古自治区",value:"内蒙古"},{id:6,name:"辽宁省",value:"辽宁"},{id:7,name:"吉林省",value:"吉林"},{id:8,name:"黑龙江省",value:"黑龙江"},{id:9,name:"上海市",value:"上海"},{id:10,name:"江苏省",value:"江苏"},{id:11,name:"浙江省",value:"浙江"},{id:12,name:"安徽省",value:"安徽"},{id:13,name:"福建省",value:"福建"},{id:14,name:"江西省",value:"江西"},{id:15,name:"山东省",value:"山东"},{id:16,name:"河南省",value:"河南"},{id:17,name:"湖北省",value:"湖北"},{id:18,name:"湖南省",value:"湖南"},{id:19,name:"广东省",value:"广东"},{id:20,name:"广西壮族自治区",value:"广西"},{id:21,name:"海南省",value:"海南"},{id:22,name:"重庆市",value:"重庆"},{id:23,name:"四川省",value:"四川"},{id:24,name:"贵州省",value:"贵州"},{id:25,name:"云南省",value:"云南"},{id:26,name:"西藏自治区",value:"西藏"},{id:27,name:"陕西省",value:"陕西"},{id:28,name:"甘肃省",value:"甘肃"},{id:29,name:"青海省",value:"青海"},{id:30,name:"宁夏回族自治区",value:"宁夏"},{id:31,name:"新疆维吾尔自治区",value:"新疆"}]},n()(t,"city",["北京市"]),n()(t,"recom_code",""),t},components:{Imgthumb:f},mounted:function(){registerup(this),appendimg(this),$("input").iCheck({checkboxClass:"icheckbox_square-red",radioClass:"iradio_square-red",increaseArea:"20%"})},methods:{getcity:function(){this.address.city="";var t=this,e=1;this.pro.forEach(function(a){a.value===t.address.province&&(e=a.id)}),$.ajax({url:"http://www.houxiaopang.com/api/v1.1/getcity?id="+e,success:function(e){0===e.code?t.city=e.data.citys:alert("网络拥挤，请稍后再试。")},error:function(){alert("网络拥挤，请稍后再试。")}})},appendfile:function(t){this.file_L.push(t),this.file_L.length>=9&&$("#z_file").hide()},removeImg:function(t){this.file_L.splice(t,1),this.img_url.splice(t,1),this.file_L.length<9&&$("#z_file").show()},valid_form1:function(){var t=this;$("#form").validate({submitHandler:function(){t.submitfrom()},errorPlacement:function(t,e){t.appendTo(e.parent())},rules:{name:"required",email:{required:!0,email:!0},tel:{required:!0,maxlength:11,minlength:11},role:"required",company_name:"required"},messages:{name:"*必填",role:"*必填",company_name:"*必填",tel:{required:"*必填",maxlength:"*格式错误",minlength:"*格式错误"},email:{required:"*必填",email:"*格式错误"}}})},submitfrom:function(){if(this.email=$("[name='email']").eq(0).val(),!this.address.city||""===this.address.province||""===this.address.city)return window.scrollTo(0,700),void $("#city-error").css("display","block");$("#city-error").css("display","none");var t=this.address.province+" "+this.address.city.substring(0,this.address.city.length-1);if(0===this.file_L.length&&""===this.blog_url.trim())return void alert("请填写案例地址或上传案例图片");if(0==$("input[name='agreement']:checked").length)return void alert("请勾选'我已知晓并同意用户协议'");var e=this;_czc.push(["_trackEvent","企业－提交申请","申请"]),$.ajax({url:"http://www.houxiaopang.com/api/v1.1/apply/companyform_new",type:"post",headers:{Authorization:"Token "+token},async:!0,data:{name:$.trim(e.name),tel:$.trim(e.tel),email:$.trim(e.email),city:t,qq:$.trim(e.qq),wx:$.trim(e.wx),recom_code:$.trim(e.recom_code),blog_url:$.trim(e.blog_url),img_url:l()(e.img_url),role:$.trim(e.role),company_web:$.trim(e.company_web),company_name:$.trim(e.company_name),company_size:$.trim(e.company_size)},timeout:5e3,dataType:"json",success:function(t){0===t.code?e.applystatus=1:alert("网络拥挤,请稍后再试")},error:function(){alert("网络拥挤,请稍后再试")}})}},created:function(){var t=this;$.ajax({url:"http://www.houxiaopang.com/api/v1.1/apply/status",type:"get",headers:{Authorization:"Token "+token},success:function(e){0===e.code?(2===e.data.applystatus?location.href="http://houxiaopang.com/admin":t.applystatus=e.data.applystatus,t.qrbind="http://www.houxiaopang.com/api/v1.1/qrbind?token="+token):location.href="http://houxiaopang.com/qrlogin"},error:function(){location.href="http://houxiaopang.com/qrlogin"}})}},h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._m(0,!1,!1),t._v(" "),a("section",{staticClass:"container main",attrs:{id:"mainwin"}},[a("div",{staticClass:"bg_f"}),t._v(" "),a("div",{staticClass:"apply-status"}),t._v(" "),a("div",{staticClass:"mainwidth",attrs:{id:"mainform"}},[t._m(1,!1,!1),t._v(" "),a("form",{directives:[{name:"show",rawName:"v-show",value:0===t.applystatus,expression:"applystatus===0"}],staticClass:"row",attrs:{id:"form",role:"form"}},[t._m(2,!1,!1),t._v(" "),a("p",{staticClass:"row_title"},[t._v("联络人信息")]),t._v(" "),a("div",{staticClass:"row"},[t._m(3,!1,!1),t._v(" "),a("div",{staticClass:"col-md-3 form-group form-right"},[a("i",{staticClass:"iconfontyyy"},[t._v("")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",name:"name",placeholder:"请填写真实姓名"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),t._v(" "),t._m(4,!1,!1),t._v(" "),a("div",{staticClass:"col-md-3 form-group form-right"},[a("i",{staticClass:"iconfontyyy"},[t._v("")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tel,expression:"tel"}],staticClass:"form-control",attrs:{placeholder:"请填写手机号码",name:"tel",type:"text"},domProps:{value:t.tel},on:{input:function(e){e.target.composing||(t.tel=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"row"},[t._m(5,!1,!1),t._v(" "),a("div",{staticClass:"col-md-3 form-group form-right"},[a("i",{staticClass:"iconfontyyy"},[t._v("")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.qq,expression:"qq"}],staticClass:"form-control",attrs:{placeholder:"选填",type:"text",name:"qq"},domProps:{value:t.qq},on:{input:function(e){e.target.composing||(t.qq=e.target.value)}}})]),t._v(" "),t._m(6,!1,!1),t._v(" "),a("div",{staticClass:"col-md-3 form-group form-right"},[a("i",{staticClass:"iconfontyyy"},[t._v("")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.wx,expression:"wx"}],staticClass:"form-control",attrs:{type:"text",placeholder:"选填",name:"wx"},domProps:{value:t.wx},on:{input:function(e){e.target.composing||(t.wx=e.target.value)}}})])]),t._v(" "),t._m(7,!1,!1),t._v(" "),a("div",{staticClass:"row"},[t._m(8,!1,!1),t._v(" "),a("div",{staticClass:"col-md-6 form-group form-right"},[a("i",{staticClass:"iconfontyyy"},[t._v("")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.role,expression:"role"}],staticClass:"form-control",attrs:{type:"text",name:"role",placeholder:"请填写在单位中的职务"},domProps:{value:t.role},on:{input:function(e){e.target.composing||(t.role=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"row"},[t._m(9,!1,!1),t._v(" "),a("div",{staticClass:"col-md-3 form-group form-right",staticStyle:{display:"inline-block"}},[a("i",{staticClass:"iconfontyyy"},[t._v("")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.recom_code,expression:"recom_code"}],staticClass:"form-control",attrs:{type:"text",name:"recom_code"},domProps:{value:t.recom_code},on:{input:function(e){e.target.composing||(t.recom_code=e.target.value)}}})]),t._v(" "),t._m(10,!1,!1)]),t._v(" "),a("p",{staticClass:"row_title",staticStyle:{"margin-top":"30px"}},[t._v("公司 / 工作室基本信息")]),t._v(" "),a("div",{staticClass:"row"},[t._m(11,!1,!1),t._v(" "),a("div",{staticClass:"col-md-6 form-group form-right"},[a("i",{staticClass:"iconfontyyy"},[t._v("")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.company_name,expression:"company_name"}],staticClass:"form-control",attrs:{type:"text",name:"company_name",placeholder:"请填写公司名称"},domProps:{value:t.company_name},on:{input:function(e){e.target.composing||(t.company_name=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"row"},[t._m(12,!1,!1),t._v(" "),a("div",{staticClass:"col-md-6 form-group form-right"},[a("i",{staticClass:"iconfontyyy"},[t._v("")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.company_web,expression:"company_web"}],staticClass:"form-control",attrs:{type:"text",name:"company_web",placeholder:"选填"},domProps:{value:t.company_web},on:{input:function(e){e.target.composing||(t.company_web=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"row"},[t._m(13,!1,!1),t._v(" "),a("div",{staticClass:"col-md-8 form-group form-right"},[a("i",{staticClass:"iconfontyyy",staticStyle:{"z-index":"10"}},[t._v("")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.address.province,expression:"address.province"}],staticClass:"address",on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.address,"province",e.target.multiple?a:a[0])},t.getcity]}},t._l(t.pro,function(e){return a("option",{domProps:{value:e.value}},[t._v(t._s(e.name))])})),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.address.city,expression:"address.city"}],staticClass:"address",staticStyle:{"margin-left":"20px"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.address,"city",e.target.multiple?a:a[0])}}},t._l(t.city,function(e){return a("option",{domProps:{value:e}},[t._v(t._s(e))])})),t._v(" "),a("span",{staticClass:"error",staticStyle:{display:"none"},attrs:{id:"city-error"}},[t._v("*必填")])])]),t._v(" "),t._m(14,!1,!1),t._v(" "),t._m(15,!1,!1),t._v(" "),a("div",{staticClass:"row"},[t._m(16,!1,!1),t._v(" "),a("div",{staticClass:"col-md-8 form-group form-right"},[a("i",{staticClass:"iconfontyyy"},[t._v("")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.blog_url,expression:"blog_url"}],staticClass:"form-control",attrs:{type:"text",placeholder:"站酷、dribble、behance或其他案例展示页面"},domProps:{value:t.blog_url},on:{input:function(e){e.target.composing||(t.blog_url=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"row"},[t._m(17,!1,!1),t._v(" "),a("div",{staticClass:"img-box col-md-10",staticStyle:{padding:"0 0",width:"755px"}},[a("div",{staticClass:"img-section"},[a("div",{staticClass:"z_photo upimg-div clear"},[t._l(t.file_L,function(e,i){return a("Imgthumb",{key:i,attrs:{each_file:e,index:i},on:{removeimg:function(e){t.removeImg(t.id)}}})}),t._v(" "),t._m(18,!1,!1)],2)])])]),t._v(" "),t._m(19,!1,!1),t._v(" "),a("hr",{staticStyle:{"margin-top":"20px"}}),t._v(" "),a("input",{staticClass:"mybtn inputbtn",attrs:{type:"submit",value:"提交材料"},on:{click:t.valid_form1}}),t._v(" "),a("div",{staticClass:"btn",staticStyle:{display:"none"},attrs:{id:"tt"}})]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1===t.applystatus,expression:"applystatus===1"}],staticClass:"waiting-check"},[a("img",{attrs:{src:"http://image.houxiaopang.com/baseform/721/suc1.png",width:"250"}}),t._v(" "),a("h2",{staticStyle:{color:"#313131","margin-top":"30px","margin-bottom":"50px"}},[t._v("您的入驻申请已提交成功!")]),t._v(" "),a("p",{staticStyle:{color:"#797979","font-size":"14px",width:"280px",margin:"0 auto",overflow:"hidden",height:"100px"}},[a("span",{staticStyle:{width:"180px",float:"left","text-align":"left",height:"100%","padding-top":"10px"}},[t._v("\n                        　　我们将在两天内联系您告知申请结果。您也可以扫码关注我们的服务号，接受最新消息通知。非常感谢!\n                    ")]),t._v(" "),a("img",{staticStyle:{width:"100px",display:"block",float:"right"},attrs:{src:t.qrbind,alt:""}})]),t._v(" "),a("a",{staticClass:"mybtn",staticStyle:{display:"block","margin-top":"45px"},attrs:{href:"http://houxiaopang.com"}},[t._v("返回首页")])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:-1===t.applystatus,expression:"applystatus===-1"}],staticClass:"waiting-check"},[a("img",{attrs:{src:"http://image.houxiaopang.com/baseform/721/fail.png",width:"250"}}),t._v(" "),a("h2",{staticStyle:{color:"#313131","margin-top":"50px","margin-bottom":"30px"}},[t._v("您的入驻申请审核失败!")]),t._v(" "),a("p",{staticStyle:{color:"#797979","font-size":"14px"}},[t._v("请完善资料或重新提交。非常感谢!")]),t._v(" "),a("div",{staticClass:"mybtn",staticStyle:{"margin-top":"45px"},on:{click:function(e){t.applystatus=0}}},[t._v("完善资料")])])])])])},y=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"logo-nav"},[a("a",{attrs:{href:"http://houxiaopang.com"}},[a("img",{attrs:{src:"http://image.houxiaopang.com/demand/logodown.png",alt:"猴小胖"}})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{staticClass:"chooseType",attrs:{href:"http://houxiaopang.com/apply"}},[a("i",{staticClass:"iconfontyyy",staticStyle:{position:"relative"}},[t._v("")]),a("span",[t._v("  返回身份选择")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"head-info",staticStyle:{"list-style":"circle"}},[a("li",[t._v("为帮助客户更好的挑选心仪的设计师,请您根据下列要求如实填写。我们将对入驻申请进行审核,确保您有能力满足一般设计要求。"),a("br")]),t._v(" "),a("li",[t._v("您的信任对我们而言意味着一切。正因如此，我们将绝对尊重并保护您的隐私。我们承诺您的隐私信息绝不会在未经许可的情况下私自外泄给不相关的第三方。\n                    ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-2 form-group form-left"},[a("label",[t._v("姓　　名")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-2 form-group form-left"},[a("label",[t._v("手　　机")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-2 form-group form-left"},[a("label",[t._v("Q　　Q")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-2 form-group form-left"},[a("label",[t._v("微　　信")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-2 form-group form-left"},[a("label",[t._v("邮　　箱")])]),t._v(" "),a("div",{staticClass:"col-md-6 form-group form-right parentCls"},[a("i",{staticClass:"iconfontyyy"},[t._v("")]),t._v(" "),a("input",{staticClass:"form-control inputElem",staticStyle:{float:"left"},attrs:{placeholder:"请填写您的常用邮箱",name:"email",type:"text","data-validation":"email"}})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-2 form-group form-left"},[a("label",[t._v("身　　份")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-2 form-group form-left"},[a("label",[t._v("推荐码")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-2 form-group form-right"},[a("label",{staticStyle:{color:"#999999","font-size":"14px"}},[t._v("若无可不填")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-2 form-group form-left"},[a("label",[t._v("名　　称")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-2 form-group form-left"},[a("label",[t._v("公司网站")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-2 form-group form-left"},[a("label",[t._v("所  在  地")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-2 form-group form-left"},[a("label",{staticStyle:{position:"relative"}},[t._v("公司规模"),a("span",{staticStyle:{position:"absolute",top:"20px",right:"20px"}},[t._v("（选填）")])])]),t._v(" "),a("div",{staticClass:"col-md-8 form-group form-right"},[a("ul",{staticClass:"list-unstyled",staticStyle:{"margin-top":"15px"}},[a("li",[a("input",{attrs:{type:"radio",value:"1",name:"company_size"}}),a("span",{staticClass:"lb"},[t._v("5人以下")])]),t._v(" "),a("li",[a("input",{attrs:{type:"radio",value:"2",name:"company_size"}}),a("span",{staticClass:"lb"},[t._v("5-20人")])]),t._v(" "),a("li",[a("input",{attrs:{type:"radio",value:"3",name:"company_size"}}),a("span",{staticClass:"lb"},[t._v("20-50人")])]),t._v(" "),a("li",[a("input",{attrs:{type:"radio",value:"4",name:"company_size"}}),a("span",{staticClass:"lb"},[t._v("50人以上")])])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticStyle:{color:"#737373","padding-left":"100px","padding-top":"50px","list-style":"circle"}},[a("li",[t._v("案例地址和案例图片至少选一项填写")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-2 form-group form-left"},[a("label",[t._v("案例地址")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-2 form-group form-left"},[a("label",[t._v("案例图片")]),t._v(" "),a("label",{staticClass:"help-block",staticStyle:{width:"60px"}},[t._v("(不超过9张,每张小于10M的jpg,png等）")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"z_file fl",attrs:{id:"z_file"}},[a("img",{staticClass:"add-img",attrs:{src:"http://image.houxiaopang.com/baseform/721/addpic.jpg"}}),t._v(" "),a("input",{staticClass:"file",attrs:{type:"file",name:"file",id:"testup",value:"",accept:"image/jpg,image/jpeg,image/png,image/bmp",multiple:""}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ag-row row col-md-offset-2",staticStyle:{"padding-left":"170px"}},[a("input",{attrs:{type:"checkbox",name:"agreement"}}),a("span",{staticClass:"lb"},[t._v("我已知晓并同意"),a("a",{attrs:{target:"_blank",href:"http://image.houxiaopang.com/agreement/%E7%8C%B4%E5%B0%8F%E8%83%96%E7%BD%91%E7%AB%99%E6%9D%A1%E6%AC%BE.pdf"}},[t._v("用户协议")])])])}],C={render:h,staticRenderFns:y},x=C,w=a("/Xao"),b=i,E=w(g,x,!1,b,null,null),q=E.exports;s.a.config.productionTip=!1,new s.a({el:"#app",template:"<App/>",components:{App:q}})},fAQZ:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.449eb42c0f1b0b634260.js.map