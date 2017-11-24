<template>
    <div>
        <div class="logo-nav">
            <a href="http://houxiaopang.com">
                <img src="http://image.houxiaopang.com/demand/logodown.png" alt="猴小胖">
            </a>
        </div>
        <section class="container main" id="mainwin">
            <div class="bg_f"></div>
            <div class="apply-status">
            </div>
            <div class="mainwidth" id="mainform">
                <a href="http://houxiaopang.com/apply" class="chooseType"><i class="iconfontyyy"
                                                                             style="position:relative;">&#xe7a1;</i><span>&nbsp;&nbsp;返回身份选择</span></a>
                <form v-show="applystatus===0" class="row" id='form' role="form">
                    <ul class="head-info" style="list-style: circle;">
                        <li>为帮助客户更好的挑选心仪的设计师,请您根据下列要求如实填写。我们将对入驻申请进行审核,确保您有能力满足一般设计要求。<br>
                        </li>
                        <li>您的信任对我们而言意味着一切。正因如此，我们将绝对尊重并保护您的隐私。我们承诺您的隐私信息绝不会在未经许可的情况下私自外泄给不相关的第三方。
                        </li>
                    </ul>
                    <div class="row">
                        <div class="col-md-2 form-group form-left">
                            <label>姓　　名</label>
                        </div>
                        <div class="col-md-3 form-group form-right">
                            <i class="iconfontyyy">&#xe638;</i>
                            <input v-model='name' type="text" name='name' class="form-control" placeholder="请填写真实姓名">
                        </div>
                        <div class="col-md-2 form-group form-left">
                            <label>手　　机</label>
                        </div>
                        <div class="col-md-3 form-group form-right">
                            <i class="iconfontyyy">&#xe600;</i>
                            <input v-model='tel' placeholder="请填写手机号码" name='tel' type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2 form-group form-left">
                            <label>Q　　Q</label>
                        </div>
                        <div class="col-md-3 form-group form-right">
                            <i class="iconfontyyy">&#xe668;</i>
                            <input v-model='qq' placeholder="选填" type="text" class="form-control" name="qq">
                        </div>

                        <div class="col-md-2 form-group form-left">
                            <label>微　　信</label>
                        </div>
                        <div class="col-md-3 form-group form-right">
                            <i class="iconfontyyy">&#xe69e;</i>
                            <input v-model='wx' type="text" placeholder="选填" class="form-control" name="wx">
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-2 form-group form-left">
                            <label>所&nbsp;&nbsp;在&nbsp;&nbsp;地</label>
                        </div>
                        <div class="col-md-8 form-group form-right">
                            <i style="z-index: 10;" class="iconfontyyy">&#xe61b;</i>
                            <select class="address" @change="getcity" v-model="address.province">
                                <option v-for="item in pro" :value="item.value">{{item.name}}</option>
                            </select>
                            <select style="margin-left: 20px;" class="address" v-model="address.city">
                                <option v-for="item in city" :value="item">{{item}}</option>
                            </select>
                            <span id="city-error" class="error" style="display: none">*必填</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2 form-group form-left">
                            <label>邮　　箱</label>
                        </div>
                        <div class="col-md-6 form-group form-right parentCls">
                            <i class="iconfontyyy">&#xe61d;</i>
                            <input name='email' type="text" data-validation="email" placeholder="请填写您的常用邮箱"
                                   class="form-control inputElem" style="float: left">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2 form-group form-left">
                            <label>毕业年份</label>
                        </div>
                        <div class="col-md-6 form-group form-right">
                            <i class="iconfontyyy">&#xe62a;</i>
                            <input v-model='graduate' name='graduate' type="text" class="form-control"
                                   placeholder="如：2013">
                        </div>
                    </div>
                  <div class="row">
                    <div class="col-md-2 form-group form-left">
                      <label>推荐码</label>
                    </div>
                    <div class="col-md-3 form-group form-right" style="display: inline-block">
                      <i class="iconfontyyy">&#xe608;</i>
                      <input v-model='recom_code'  type="text" class="form-control" name="recom_code" >
                    </div>
                    <div class="col-md-2 form-group form-right">
                      <label style="color:#999999;font-size: 14px">若无可不填</label>
                    </div>
                  </div>
                    <ul style="color: #737373;padding-left: 100px;padding-top: 50px;list-style: circle;">
                        <li>个人网址和作品图片至少选一项填写</li>
                    </ul>
                    <div class="row">
                        <div class="col-md-2 form-group form-left">
                            <label>个人网址</label>
                        </div>
                        <div class="col-md-8 form-group form-right">
                            <i class="iconfontyyy">&#xe664;</i>
                            <input class="form-control" type="text" v-model="blog_url" placeholder="站酷、lofter或其他个人博客">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2 form-group form-left">
                            <label>作品图片</label>
                            <label class="help-block" style="width: 60px;">(不超过9张,每张小于10M的jpg,png等）</label>
                        </div>
                        <div class="img-box col-md-10" style="padding: 0 0;width: 755px;">
                            <div class="img-section">
                                <div class="z_photo upimg-div clear">
                                    <Imgthumb @removeimg="removeImg(id)" v-for="(each_file,index) in file_L"
                                              v-bind:each_file="each_file"
                                              v-bind:index='index' :key="index"></Imgthumb>
                                    <section class="z_file fl" id="z_file">
                                        <img src="http://image.houxiaopang.com/baseform/721/addpic.jpg" class="add-img">
                                        <input type="file" name="file" id="testup" class="file" value=""
                                               accept="image/jpg,image/jpeg,image/png,image/bmp" multiple/>
                                    </section>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="ag-row row col-md-offset-2" style="padding-left: 170px">
                        <input type="checkbox" name='agreement'><span class="lb">我已知晓并同意<a target="_blank"
                                                                                           href="http://image.houxiaopang.com/agreement/%E7%8C%B4%E5%B0%8F%E8%83%96%E7%BD%91%E7%AB%99%E6%9D%A1%E6%AC%BE.pdf">用户协议</a></span>
                    </div>
                    <hr style="margin-top: 20px">
                    <input @click="valid_form1" type="submit" class="mybtn inputbtn" value="提交材料">
                    <div id="tt" class="btn" style="display:none"></div>
                </form>
                <div class="waiting-check" v-show="applystatus===1">
                    <img src="http://image.houxiaopang.com/baseform/721/suc1.png" width="250">
                    <h2 style="color:#313131;margin-top: 30px;margin-bottom: 50px;">您的入驻申请已提交成功!</h2>
                    <p style="color: #797979;font-size: 14px;width:280px;margin: 0 auto;overflow: hidden;height:100px;">
                        <span style="width: 180px;float: left;text-align: left;height: 100%;padding-top:10px;">
                            　　我们将在两天内联系您告知申请结果。您也可以扫码关注我们的服务号，接受最新消息通知。非常感谢!
                        </span>
                        <img :src="qrbind" alt="" style="width: 100px;display: block;float: right;">
                    </p>
                    <a href="http://houxiaopang.com" class="mybtn" style="display: block;margin-top: 45px;">返回首页</a>
                </div>
                <div class="waiting-check" v-show="applystatus===-1">
                    <img src="http://image.houxiaopang.com/baseform/721/fail.png" width="250">
                    <h2 style="color:#313131;margin-top: 50px;margin-bottom: 30px;">您的入驻申请审核失败!</h2>
                    <p style="color: #797979;font-size: 14px;">请完善资料或重新提交。非常感谢!</p>
                    <div class="mybtn" @click="applystatus=0" style="margin-top: 45px;">完善资料</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Imgthumb from "./components/Imgthumb.vue"
    export default {
        name: 'app',
        data(){
            return {
                applystatus: 0,
                name: "",
                sex: "",
                born: "",
                //city: "",
                tel: "",
                email: "",
                qq: "",
                wx: "",
                school: "",
                major: "",
                graduate: "",

                file_L: [],
                blog_url: '',
                img_url: [],
                qrbind: null,
                address: {
                    province: '北京',
                    city: "北京市"
                },
                pro: [
                    {
                        "id": 1,
                        "name": "北京市",
                        "value": "北京"
                    },
                    {
                        "id": 2,
                        "name": "天津市",
                        "value": "天津"
                    },
                    {
                        "id": 3,
                        "name": "河北省",
                        "value": "河北"
                    },
                    {
                        "id": 4,
                        "name": "山西省",
                        "value": "山西"
                    },
                    {
                        "id": 5,
                        "name": "内蒙古自治区",
                        "value": "内蒙古"
                    },
                    {
                        "id": 6,
                        "name": "辽宁省",
                        "value": "辽宁"
                    },
                    {
                        "id": 7,
                        "name": "吉林省",
                        "value": "吉林"
                    },
                    {
                        "id": 8,
                        "name": "黑龙江省",
                        "value": "黑龙江"
                    },
                    {
                        "id": 9,
                        "name": "上海市",
                        "value": "上海"
                    },
                    {
                        "id": 10,
                        "name": "江苏省",
                        "value": "江苏"
                    },
                    {
                        "id": 11,
                        "name": "浙江省",
                        "value": "浙江"
                    },
                    {
                        "id": 12,
                        "name": "安徽省",
                        "value": "安徽"
                    },
                    {
                        "id": 13,
                        "name": "福建省",
                        "value": "福建"
                    },
                    {
                        "id": 14,
                        "name": "江西省",
                        "value": "江西"
                    },
                    {
                        "id": 15,
                        "name": "山东省",
                        "value": "山东"
                    },
                    {
                        "id": 16,
                        "name": "河南省",
                        "value": "河南"
                    },
                    {
                        "id": 17,
                        "name": "湖北省",
                        "value": "湖北"
                    },
                    {
                        "id": 18,
                        "name": "湖南省",
                        "value": "湖南"
                    },
                    {
                        "id": 19,
                        "name": "广东省",
                        "value": "广东"
                    },
                    {
                        "id": 20,
                        "name": "广西壮族自治区",
                        "value": "广西"
                    },
                    {
                        "id": 21,
                        "name": "海南省",
                        "value": "海南"
                    },
                    {
                        "id": 22,
                        "name": "重庆市",
                        "value": "重庆"
                    },
                    {
                        "id": 23,
                        "name": "四川省",
                        "value": "四川"
                    },
                    {
                        "id": 24,
                        "name": "贵州省",
                        "value": "贵州"
                    },
                    {
                        "id": 25,
                        "name": "云南省",
                        "value": "云南"
                    },
                    {
                        "id": 26,
                        "name": "西藏自治区",
                        "value": "西藏"
                    },
                    {
                        "id": 27,
                        "name": "陕西省",
                        "value": "陕西"
                    },
                    {
                        "id": 28,
                        "name": "甘肃省",
                        "value": "甘肃"
                    },
                    {
                        "id": 29,
                        "name": "青海省",
                        "value": "青海"
                    },
                    {
                        "id": 30,
                        "name": "宁夏回族自治区",
                        "value": "宁夏"
                    },
                    {
                        "id": 31,
                        "name": "新疆维吾尔自治区",
                        "value": "新疆"
                    }],
                city: ["北京市"],
              recom_code:""
            }
        },
        components: {
            Imgthumb
        },
        mounted(){
            registerup(this);
            appendimg(this);
            $('input').iCheck({
                checkboxClass: 'icheckbox_square-red',
                radioClass: 'iradio_square-red',
                increaseArea: '20%' // optional
            });
        },
        methods: {
            getcity(){
                this.address.city = "";
                var that = this
                var id = 1;
                this.pro.forEach(function (item) {
                    if (item.value === that.address.province) {
                        id = item.id
                    }
                })
                $.ajax({
                    url: "http://www.houxiaopang.com/api/v1.1/getcity?id=" + id,
                    success(res){
                        if (res.code === 0) {
                            that.city = res.data.citys
                        }
                        else {
                            alert("网络拥挤，请稍后再试。");
                        }
                    },
                    error(){
                        alert("网络拥挤，请稍后再试。");
                    }
                })
            },
            appendfile: function (file) {
                this.file_L.push(file);
                if (this.file_L.length >= 9) {
                    $("#z_file").hide();
                }
            },
            removeImg(index){
                this.file_L.splice(index, 1);
                this.img_url.splice(index, 1);
                if (this.file_L.length < 9) {
                    $("#z_file").show();
                }
            },
            valid_form1: function () {
                var that = this;
                $("#form").validate({
                    submitHandler: function () {
                        that.submitfrom();
                    },
                    errorPlacement: function (error, element) {
                        error.appendTo(element.parent());
                    },
                    rules: {
                        name: "required",
                        email: {
                            required: true,
                            email: true
                        },
                        tel: {
                            required: true,
                            maxlength: 11,
                            minlength: 11
                        },
                        graduate: {
                            required: true,
                            number: true,
                            maxlength: 4,
                            minlength: 4
                        },
                    },
                    messages: {
                        name: "*必填",
                        tel: {
                            required: "*必填",
                            maxlength: "*格式错误",
                            minlength: "*格式错误"
                        },
                        email: {
                            required: "*必填",
                            email: "*格式错误"
                        },
                        graduate: {
                            required: "*必填",
                            number: "*格式错误",
                            maxlength: "*格式错误",
                            minlength: "*格式错误"
                        },
                    },
                });
            },
            submitfrom(){
                this.email = $("[name='email']").eq(0).val();
                if (!this.address.city || this.address.province === "" || this.address.city === "") {
                    window.scrollTo(0, 100)
                    $("#city-error").css("display", "block");
                    return
                }
                $("#city-error").css("display", "none");
                var currentCity = this.address.province + " " + this.address.city.substring(0, this.address.city.length - 1);
                if (this.file_L.length === 0 && this.blog_url.trim() === '') {
                    alert("请填写个人网址或上传作品图片");
                    return;
                }
                var isAgree = $("input[name='agreement']:checked");
                if (isAgree.length == 0) {
                    alert("请勾选'我已知晓并同意用户协议'");
                    return;
                }
                var that = this;
                _czc.push(["_trackEvent", '个人－提交申请', '申请']);
                $.ajax({
                    url: 'http://www.houxiaopang.com/api/v1.1/apply/form_new',
                    type: 'post',
                    headers: {"Authorization": "Token " + token},
                    async: true,
                    data: {
                        name: $.trim(that.name),
                        tel: $.trim(that.tel),
                        email: $.trim(that.email),
                        city: currentCity,
                        qq: $.trim(that.qq),
                        wx: $.trim(that.wx),
                        graduate: $.trim(that.graduate),
                        blog_url: $.trim(that.blog_url),
                        img_url: JSON.stringify(that.img_url),
                        recom_code:$.trim(that.recom_code)
                    },
                    timeout: 5000,    //超时时间
                    dataType: 'json',
                    success: function (result) {
                        if (result.code === 0) {
                            that.applystatus = 1;
                        } else {
                            alert('网络拥挤,请稍后再试');
                        }
                    },
                    error: function () {
                        alert('网络拥挤,请稍后再试');
                    }
                });
            },
            getStatus(){
                var that = this;
                $.ajax({
                    url: "http://www.houxiaopang.com/api/v1.1/apply/status",
                    type: "get",
                    headers: {"Authorization": "Token " + token},
                    success: function (data) {
                        if (data.code === 0) {
                            data.data.applystatus === 2 ? location.href = 'http://houxiaopang.com/admin' : that.applystatus = data.data.applystatus;
                            that.qrbind = "http://www.houxiaopang.com/api/v1.1/qrbind?token=" + token;
                        } else {
                            location.href = "http://houxiaopang.com/qrlogin";
                        }
                    },
                    error: function () {
                        location.href = "http://houxiaopang.com/qrlogin";
                    }
                })
            }
        },
        created(){
            this.getStatus();
        }
    }
</script>

<style>
    .logo-nav {
        height: 60px;
        margin: 20px auto;
        width: 1170px;
    }

    .logo-nav img {
        height: 60px;
    }

    .up-section .type-upimg {
        display: none;
    }

    ::-ms-clear, ::-ms-reveal {
        display: none;
    }

    textarea {
        outline: none;
        line-height: 14px;
        padding-left: 4px;
        padding-top: 4px;
        border: 1px solid #ccc;
        color: #444;
        font-size: 14px;
        text-align: left;
    }

    .overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .clear {
        clear: both;
    }

    .full {
        width: 1210px;
        min-width: 1210px;
        margin: 0 auto;
    }

    .full-big {
        width: 1340px;
        min-width: 1340px;
        margin: 0 auto;
    }

    .img-full {
        display: block;
        width: 100%;
    }

    ::-webkit-input-placeholder {
        color: #777;
        font-size: 14px;
    }

    :-moz-placeholder {
        /* Firefox 18- */
        color: #777;
        font-size: 14px;
    }

    ::-moz-placeholder {
        /* Firefox 19+ */
        color: #777;
        font-size: 14px;
    }

    :-ms-input-placeholder {
        color: #777;
        font-size: 14px;
    }

    /* ====clear float====== */
    /*nav a:visited{color: rgb(65,65,65);}
    aside a:visited{color: rgb(65,65,65);}*/
    .fl {
        float: left;
    }

    .fr {
        float: right;
    }

    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    /* reset */
    .pic img {
        display: none;
    }

    * {
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }

    @font-face {
      font-family: 'iconfont';  /* project id 200173 */
      src: url('//at.alicdn.com/t/font_200173_1rp85x0auz2p4x6r.eot');
      src: url('//at.alicdn.com/t/font_200173_1rp85x0auz2p4x6r.eot?#iefix') format('embedded-opentype'),
      url('//at.alicdn.com/t/font_200173_1rp85x0auz2p4x6r.woff') format('woff'),
      url('//at.alicdn.com/t/font_200173_1rp85x0auz2p4x6r.ttf') format('truetype'),
      url('//at.alicdn.com/t/font_200173_1rp85x0auz2p4x6r.svg#iconfont') format('svg');
    }

    .iconfontyyy {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    body {
        font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "HeitiSC", "WenQuanYi Micro Hei", sans-serif;
        font-style: normal;
    }

    .navbar-brand {
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .main {
        padding: 0;
        margin-top: 20px;
        position: relative;
        background: #f5f5f5 url("http://image.houxiaopang.com/baseform/721/bg.png") no-repeat;
        background-size: 100%;
        width: 1170px;
    }

    .bg_f {
        position: absolute;
        width: 100%;
        height: 396px;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.4);
    }

    .apply-status {
        min-height: 160px;
        padding: 30px 10%;
        position: relative;
    }

    /**********************/
    /* form */
    /**********************/

    .mainwidth {
        width: 1000px;
        margin: 0 auto;
    }

    .row {
        margin: 0;
    }

    #mainform {
        background: white;
        margin-bottom: 50px;
        padding: 60px 0 40px;
        position: relative;
        box-shadow: 1px 1px 5px #dcdada;
    }

    .head-info {
        margin: 0 auto 40px auto;
        width: 80%;
        color: #8b8b8b;
        font-size: 16px;
    }

    .mybtn {
        width: 150px;
        height: 40px;
        margin: 0 auto;
        border: 1px solid #d01667;
        line-height: 40px;
        text-align: center;
        border-radius: 25px;
        color: #d01667;
        cursor: pointer;
        font-size: 16px;
    }

    .mybtn:hover {
        background: linear-gradient(to left, #d01667, #fe6549);
        color: #fff;
        border: none;
    }

    #mainform .form-control {
        border: 1px solid rgb(83, 126, 136);
        border-radius: 2px;
        /*display: inline-block;*/
        max-width: 100%;
        width: 69%;
        padding-left: 36px;
    }

    #mainform label {
        font-weight: normal;
        line-height: 34px;
    }

    #mainform i {
        position: absolute;
        line-height: 34px;
        color: #FA5E4A;
        margin-left: 10px;
        left: 0;
    }

    label.error, span.error {
        float: left;
        color: red;
        padding-left: 10px;
        line-height: 34px;
    }

    #mainform input.error, #mainform select.error {
        float: left;
    }

    #mainform .help-block {
        line-height: 20px;
        margin-top: -10px;
        font-size: 12px;
    }

    /**********************/
    /* login button sytle */
    /**********************/

    /*.btn {
        border: none;
        border-radius: 4px;
        transition: all 0.4s ease-in-out;
    }*/

    /*.btn:focus {*/
    /*background: rgb(83,126,136);*/
    /*border-color: transparent;*/
    /*}*/

    .btn-success {
        background: rgb(83, 126, 136);
        font-weight: 300;
        letter-spacing: 2px;
        padding: 10px 20px;
        margin: 20px 20px 50px 80px;
    }

    .btn-success:hover {
        background: #222;
    }

    /**********************/
    /* form sytle */
    /**********************/

    #mainform label {
        display: block;
    }

    #form .form-group {
        margin-top: 15px;
        margin-bottom: 15px;
        padding-left: 85px;
        padding-right: 0;
        box-sizing: border-box;
    }

    #form2 .form-group {
        margin-top: 15px;
        margin-bottom: 15px;
        padding-left: 111px;
        padding-right: 0;
        box-sizing: border-box;
    }

    .parentCls > ul {
        background: #fff;
        list-style: none;
        font-size: 14px;
    }

    .parentCls > ul > li {
        height: 28px;
        line-height: 28px;
        padding-left: 36px;
    }

    .parentCls > ul > li:hover {
        background: rgb(83, 126, 136);
        color: #FFFFFF;
    }

    #mainform .form-right {
        padding-left: 0;
    }

    /**********************/
    /* form2 */
    /**********************/

    #mainform #form2 li {
        /*display: inline;*/
        /*margin-right: 40px;*/
        line-height: 3rem;
        letter-spacing: 1px;
    }

    #mainform #form2 label {
        font-size: 22px;
        color: #d94585;
    }

    #mainform #form2 .help-block {
        font-size: 14px;
    }

    #mainform #form2 .formsepline {
        width: 80%;
        height: 2px;
        margin: 20px auto;
        background: #D54E21;
        opacity: 0.6;
    }

    .lb {
        margin-left: 10px;
    }

    #pro-exp {
        padding-left: 12px !important;
    }

    /*loading*/
    .loader-mask {
        z-index: 1000;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: #ececeb;
    }

    .loader-mask .loader-content {
        width: 500px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -250px;
        margin-top: -80px;
        /*height: 160px;*/
        text-align: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background: white;
        -webkit-box-shadow: 10px 10px 5px #888888;
        -moz-box-shadow: 10px 10px 5px #888888;
        box-shadow: 10px 10px 5px #888888;
        border-radius: 10px;
        letter-spacing: 1px;
    }

    @-webkit-keyframes scale {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
        }

        45% {
            -webkit-transform: scale(0.1);
            transform: scale(0.1);
            opacity: 0.7;
        }

        80% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes scale {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
        }

        45% {
            -webkit-transform: scale(0.1);
            transform: scale(0.1);
            opacity: 0.7;
        }

        80% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
        }
    }

    .ball-pulse > div:nth-child(0) {
        -webkit-animation: scale 0.75s 0s infinite cubic-bezier(.2, .68, .18, 1.08);
        animation: scale 0.75s 0s infinite cubic-bezier(.2, .68, .18, 1.08);
    }

    .ball-pulse > div:nth-child(1) {
        -webkit-animation: scale 0.75s 0.12s infinite cubic-bezier(.2, .68, .18, 1.08);
        animation: scale 0.75s 0.12s infinite cubic-bezier(.2, .68, .18, 1.08);
    }

    .ball-pulse > div:nth-child(2) {
        -webkit-animation: scale 0.75s 0.24s infinite cubic-bezier(.2, .68, .18, 1.08);
        animation: scale 0.75s 0.24s infinite cubic-bezier(.2, .68, .18, 1.08);
    }

    .ball-pulse > div:nth-child(3) {
        -webkit-animation: scale 0.75s 0.36s infinite cubic-bezier(.2, .68, .18, 1.08);
        animation: scale 0.75s 0.36s infinite cubic-bezier(.2, .68, .18, 1.08);
    }

    .ball-pulse > div {
        width: 15px;
        height: 15px;
        border-radius: 100%;
        margin: 2px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        display: inline-block;
        background: rgb(83, 126, 126);
    }

    #loader-upspan {
        font-size: 24px;
        color: rgb(83, 126, 136);
        margin-top: 10px;
    }

    /**********************/
    /* waiting check    */
    /**********************/
    .waiting-check {
        text-align: center;
        color: rgb(83, 126, 136);
        padding-bottom: 60px;
    }

    .home {
        background: url("http://image.houxiaopang.com/baseform/721/btn_home.png") no-repeat;
        background-size: cover;
        margin: 45px auto 0 auto;
        width: 150px;
        height: 39px;
        cursor: pointer;
    }

    .home:hover {
        background: url("http://image.houxiaopang.com/baseform/721/btn_home_ovr.png") no-repeat;
        background-size: cover;
    }

    .backbtn {
        background: url("http://image.houxiaopang.com/baseform/721/back.png") no-repeat;
        background-size: cover;
        margin: 45px auto 0 auto;
        width: 150px;
        height: 39px;
        cursor: pointer;
    }

    .backbtn:hover {
        background: url("http://image.houxiaopang.com/baseform/721/btnback_ovr.png") no-repeat;
        background-size: cover;
    }

    .waiting-check h1 {
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .ag-row {
        margin-bottom: 10px;
    }

    .inputbtn {
        margin-top: 20px;
        display: block;
        outline: none;
        background: transparent;
    }

    .chooseType {
        position: absolute;
        left: 50px;
        top: 15px;
        color: #787878;
    }

    .chooseType:hover {
        color: #787878;
    }

    .address {
        border: 1px solid rgb(83, 126, 136);
        width: 176px;
        height: 36px;
        line-height: 34px;
        float: left;
        padding-left: 30px;
        position: relative;
		-webkit-appearance : none;
		background : none;
		-moz-appearance : none;
        border-radius: 2px;
    }
</style>
