<template>
  <div id="app">
    <div class="logo-nav">
      <a href="/">
        <img src="http://image.houxiaopang.com/demand/logodown.png" alt="">
      </a>
    </div>
    <section class="container main" id="mainwin">
      <div class="bg_f"></div>
      <div class="apply-status">
        <div class="status statuson" v-bind:class="{statusnow:seen1}">
          <div class="status-box">
            <div class="status-icon"></div>
          </div>
          <div class="status-intro" v-bind:class="{statusintronow:seen1}">
            填写基本信息
          </div>
        </div>
        <div class="status-line-box">
          <div class="status-line"></div>
        </div>
        <div class="status statustu" v-bind:class="{statusnowtu:seen2}">
          <div class="status-box">
            <div class="status-icon">
            </div>
          </div>
          <div class="status-intro" v-bind:class="{statusintronow:seen2}">
            填写接单信息
          </div>
        </div>
        <div class="status-line-box">
          <div class="status-line"></div>
        </div>
        <div class="status statusth" v-bind:class="{statusnowth:seen3}">
          <div class="status-box">
            <div class="status-icon">
            </div>
          </div>
          <div class="status-intro" v-bind:class="{statusintronow:seen3}">
            上传相关材料
          </div>
        </div>
        <div class="status-line-box">
          <div class="status-line"></div>
        </div>
        <div class="status statusfou" v-bind:class="{statusnowfou:seen4}">
          <div class="status-box">
            <div class="status-icon">
            </div>
          </div>
          <div class="status-intro" v-bind:class="{statusintronow:seen4}">
            完成审核
          </div>
        </div>
      </div>
      <div class="mainwidth" id="mainform">
		<keep-alive>
          <router-view></router-view>
		</keep-alive>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return {
        seen1: true,
        seen2: false,
        seen3: false,
        seen4: false,
        applystatus: null
      }
    },
    methods: {
      showform1(){
        this.seen1 = true;
        this.seen2 = false;
        this.seen3 = false;
        this.seen4 = false;
      },
      showform2(){
        this.seen1 = false;
        this.seen2 = true;
        this.seen3 = false;
        this.seen4 = false;
      },
      showform3(){
        this.seen1 = false;
        this.seen2 = false;
        this.seen3 = true;
        this.seen4 = false;
      },
      showform4(){
        this.seen1 = false;
        this.seen2 = false;
        this.seen3 = false;
        this.seen4 = true;
      }
    },
    watch: {
      '$route'(){
        var path = this.$route.path;
        if (path === "/") {
          this.showform1();
        } else if (path === "/from2") {
          if (seen1) {
            this.showform2();
          } else {
            this.$router.push("/");
          }
        } else if (path === "/from3") {
          if (seen1 && seen2) {
            this.showform3();
          } else {
            this.$router.push("/");
          }
        } else if (path === "/from4") {
          this.showform4();
        }
        window.scrollTo(0, 0);
      }
    },
    mounted(){
      var that = this;

      $.ajax({
        headers: {"Authorization": "Token " + token},
        url: "http://houxiaopang.com/api/v1.1/apply/status",
        type: "get",
        success: function (data) {
          if (data.code == 0) {
            applystatus = data.data.applystatus;
            if (applystatus == "1" || applystatus == "-1") {
              that.$router.push('/from4');
            } else {
              that.$router.push('/');
            }
          } else {
            //location.href = "http://houxiaopang.com/qrlogin";
          }
        },
        error: function () {
          //location.href = "http://houxiaopang.com/qrlogin";
        }
      });
    }

  }
</script>

<style>
  .logo-nav {
    height: 60px;
    margin: 20px 0 20px 100px;
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

  i,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  br,
  em,
  dl,
  dd,
  li,
  ul,
  ol,
  td,
  th,
  pre,
  form,
  body,
  input,
  strong,
  textarea,
  select, figcaption, figure {
    margin: 0;
    padding: 0;
  }

  a, button {
    cursor: pointer;
  }

  @font-face {
  font-family: 'iconfont';  /* project id 200173 */
  src: url('//at.alicdn.com/t/font_cij8dnp9mufskyb9.eot');
  src: url('//at.alicdn.com/t/font_cij8dnp9mufskyb9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_cij8dnp9mufskyb9.woff') format('woff'),
  url('//at.alicdn.com/t/font_cij8dnp9mufskyb9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_cij8dnp9mufskyb9.svg#iconfont') format('svg');
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

  .status {
    float: left;
    width: 10%;
    box-sizing: border-box;
  }

  .statuson {
    background: url("http://image.houxiaopang.com/baseform/721/1.png") 17px 10px no-repeat;
    background-size: 60px 60px;
  }

  .statustu {
    background: url("http://image.houxiaopang.com/baseform/721/2.png") 17px 10px no-repeat;
    background-size: 60px 60px;

  }

  .statusth {
    background: url("http://image.houxiaopang.com/baseform/721/3.png") 17px 10px no-repeat;
    background-size: 60px 60px;
  }

  .statusfou {
    background: url("http://image.houxiaopang.com/baseform/721/four.png") 17px 10px no-repeat;
    background-size: 60px 60px;
  }

  .status-box {
    width: 100%;
    /*status-box和status-intro对应*/
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
  }

  .status-intro {
    /*==status-icon的宽度*/
    width: 100%;
    height: 30px;
    line-height: 30px;
    /*font-size: 20px;*/
    text-align: center;
    color: #FFF;
    font-weight: lighter;
    opacity: 0.6;
  }

  .statusintronow {
    opacity: 1;
  }

  .status-icon {
    height: 60px;
    width: 60px;
    display: inline-block;

  }

  .statusnow {
    background: url("http://image.houxiaopang.com/baseform/721/one.png") 16px 10px no-repeat;
    background-size: 60px 60px;
  }

  .statusnowtu {
    background: url("http://image.houxiaopang.com/baseform/721/two.png") 16px 10px no-repeat;
    background-size: 60px 60px;
  }

  .statusnowth {
    background: url("http://image.houxiaopang.com/baseform/721/th.png") 16px 10px no-repeat;
    background-size: 60px 60px;

  }

  .statusnowfou {
    background: url("http://image.houxiaopang.com/baseform/721/4.png") 16px 10px no-repeat;
    background-size: 60px 60px;
  }

  .icon-num {
    font-size: 30px;
    /*50-padding(1*2)*/
    line-height: 60px;
    font-weight: lighter;
    /*根据status-icon尺寸决定*/
    margin: 0 auto;

  }

  .status-line-box {
    float: left;
    box-sizing: border-box;
    width: 20%;
    height: 100px;
    text-align: center;
  }

  .status-line {
    height: 3px;
    width: 90%;
    display: inline-block;
    margin-top: 45px;
    background: url("http://image.houxiaopang.com/baseform/721/line.png") no-repeat;
    background-size: 100%;

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
  }

  .head-info {
    margin: 0 auto 40px auto;
    width: 80%;
    color: #8b8b8b;
    font-size: 16px;
  }

  .mybtn {
    background: url("http://image.houxiaopang.com/baseform/721/btn.png") no-repeat;
    background-size: cover;
    margin: 45px auto 0 auto;
    width: 150px;
    height: 39px;
    cursor: pointer;
  }

  .mybtn:hover {
    background: url("http://image.houxiaopang.com/baseform/721/btn_ovr.png") no-repeat;
    background-size: cover;
  }

  .btns {
    width: 60%;
    margin: 50px auto 0 auto;
  }

  .nextbtn {
    background: url("http://image.houxiaopang.com/baseform/721/btn.png") no-repeat;
    background-size: cover;
    width: 150px;
    height: 39px;
    cursor: pointer;
    float: right;
  }

  .nextbtn:hover {
    background: url("http://image.houxiaopang.com/baseform/721/btn_ovr.png") no-repeat;
    background-size: cover;
  }

  .prevbtn {
    background: url("http://image.houxiaopang.com/baseform/721/btnlast_nml.png") no-repeat;
    background-size: cover;
    width: 150px;
    height: 39px;
    cursor: pointer;
    float: left;

  }

  .prevbtn:hover {
    background: url("http://image.houxiaopang.com/baseform/721/btnlast_ovr.png") no-repeat;
    background-size: cover;
  }

  .submitbtn {
    background: url("http://image.houxiaopang.com/baseform/721/btnsend_nml.png") no-repeat;
    background-size: cover;
    width: 150px;
    height: 39px;
    cursor: pointer;
    float: right;
  }

  .submitbtn:hover {
    background: url("http://image.houxiaopang.com/baseform/721/btnsend_ovr.png") no-repeat;
    background-size: cover;
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

  .btn {
    border: none;
    border-radius: 4px;
    transition: all 0.4s ease-in-out;
  }

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
</style>
