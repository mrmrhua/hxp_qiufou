<template>
  <div class="warp" id="box">
    <nav>
      <router-link to="/" class="left" v-bind:class="{hid:ifhid}">
        <i class="iconfontyyy">&#xe66b;</i>
        <span>个人中心</span>
      </router-link>
      <a class="contr" @click="ifhid =!ifhid"><i class="iconfontyyy">&#xe720;</i></a>
      <ul class="right">
        <!--<li style="position: relative"><i class="iconfontyyy"
                                          style="font-size: 18px;color:#545a5f;">&#xe71f;</i><span
          class="noticenum" v-html="noticenum" v-show="noticenum"></span></li>-->
        <router-link class="w1" tag="li" to="/newalbum" title="上传作品集"><i class="iconfontyyy"
                                                                        style="font-size: 25px;color:#545a5f;">&#xe68a;</i>
        </router-link>
        <li class="option" style="line-height: 59px;"><span
          style="vertical-align: top;font-size: 12px" v-html="nickname"></span><!--<i
          class="iconfontyyy" style="vertical-align: top;">&#xe611;</i>-->
          <img class="userImg" :src="headimg"/>
          <ul v-show="show_option">
            <li>设置</li>
            <li>退出登录</li>
          </ul>
        </li>
      </ul>
    </nav>
    <div class="content_home">
      <div class="table_display">
        <div class="left" v-bind:class="{hid:ifhid}">
          <a>菜单</a>
          <ul>
            <li hidden><i class="iconfontyyy" v-bind:class="{iconfontyyycg:ifhid}"
                          style="color: #4cb6cb;">&#xe626;</i><span>个人资料</span></li>
            <li hidden><i class="iconfontyyy" v-bind:class="{iconfontyyycg:ifhid}"
                          style="color: #537f72;">&#xe67b;</i><span>我的简历</span></li>
            <router-link title="我的作品集" tag="li" to="/project"><i class="iconfontyyy w2"
                                                                v-bind:class="{iconfontyyycg:ifhid}"
                                                                style="color: #8ca1af;">&#xe60d;</i><span>我的作品集</span>
            </router-link>
          </ul>
          <ul style="position: absolute;bottom: 20px;">
            <li onclick="javascript:location.href='http://houxiaopang.com';"><i id="w3" class="iconfontyyy"
                                                                                style="color: #8ca1af;"
                                                                                v-bind:class="{iconfontyyycg:ifhid}">&#xe62a;</i><span>回到主页</span>
            </li>
          </ul>
        </div>
        <div class="right" v-bind:class="{hidRight:ifhid}">
          <!--路由-->
          <router-view></router-view>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import token from "@/components/token.js"

  if (token == "undefined" || token == "" || token == null) {
    location.href = "http://houxiaopang.com/qrlogin";
  }

  export default{
    data() {
      return {
        ifhid: true,//侧边栏控制
        nickname: '',//用户名称
        headimg: null,//用户头像

        /* fileList: [],//上传图片列表
         ablumfile: '',//上传封面成功图片地址


         title: '',//上传作品标题
         desc: '',//上传作品简介
         img_url: [],//上传图片成功返回地址

         shownewalbum: false,//上传作品显示
         showrecentalbum: true,//最近上传显示

         recentalbum: [], //最近上传列表，对象数组，包含url封面地址，title，品类，id

         projectalbum: [], // 我的作品，同上

         showproject: false,//我的作品显示*/
        show_option: false, //用户操作显示
        noticenum: null,//用户消息数量
      }
    },
    watch: {
      'ifhid'(){
        var zhei = document.querySelector("nav >.contr >i");
        var li = document.querySelectorAll(".content_home > .table_display > .left > ul > li");
        if (this.ifhid) {
          zhei.innerHTML = "&#xe720;";
          for (var i = 0, size = li.length; i < size; i++) {
            li[i].style.padding = "0";
            li[i].style.textAlign = "center";
            li[i].children[0].style.display = "inline-block";
            li[i].children[0].style.width = "100%";
          }
        } else {
          zhei.innerHTML = "&#xe721;";
          for (var i = 0, size = li.length; i < size; i++) {
            li[i].style.padding = "0 20px";
            li[i].style.textAlign = "left";
            li[i].children[0].style.display = "inline";
          }
        }
      },
    },
    created() {

      var that = this;
      setTimeout(function () {
        that.noticenum = 2;
      }, 3000);
    },
    mounted: function () {
      this.getuserinfo();
      var pagewalk = localStorage.pagewalkthrough;
      if (pagewalk != '1') {
        this.yingdao();
        localStorage.pagewalkthrough = 1;
      }
    },
    methods: {
      yingdao(){
        $('body').pagewalkthrough({
          name: 'introduction',
          steps: [{
            popup: { //定义弹出提示引导层
              content: '使用说明',
              type: 'modal'
            }
          },
            {
              wrapper: '.w1',
              //当前引导对应的元素位置
              popup: {
                content: '这里可以上传作品集',
                //关联的内容元素
                type: 'tooltip',
                //弹出方式（tooltip和modal以及nohighlight）
                position: 'bottom' //弹出层位置（top,left, right or bottom）
              }
            },
            {
              wrapper: '.w2',
              popup: {
                content: '这里可以查看作品集',
                type: 'tooltip',
                position: 'right'
              }
            },
            {
              wrapper: '#w3',
              popup: {
                content: '这里可以回到首页',
                type: 'tooltip',
                position: 'top'
              }
            },
          ]
        });
        // 一步一步显示引导页
        $('body').pagewalkthrough('show');
      },
      getuserinfo() {
        var that = this;
        $.ajax({
          url: 'http://houxiaopang.com/api/v1.1/designerdash/header',
          type: "GET",
          headers: {"Authorization": "Token " + token},
          success(data) {
            if (data.code != 0) {
              location.href = "http://houxiaopang.com";
            } else {
              that.nickname = data.data.nickname;
              that.headimg = data.data.headimg;
            }
          },
          timeout: 5000,
          error(e){
            if (e.status === 401) {
              location.href = "http://houxiaopang.com/qrlogin";
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          }
        });
      },
    }
  }
</script>

<style>
  @font-face {
    font-family: 'iconfont';  /* project id 335733 */
    src: url('//at.alicdn.com/t/font_ymy0pwi1d2sjdcxr.eot');
    src: url('//at.alicdn.com/t/font_ymy0pwi1d2sjdcxr.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_ymy0pwi1d2sjdcxr.woff') format('woff'),
    url('//at.alicdn.com/t/font_ymy0pwi1d2sjdcxr.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_ymy0pwi1d2sjdcxr.svg#iconfont') format('svg');
  }

  * {
    padding: 0 0;
    margin: 0 0;
  }

  body {
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "HeitiSC", "WenQuanYi Micro Hei", sans-serif;
  }

  .warp {
    border-spacing: 0;
    height: 100%;
    width: 100%;
  }

  a {
    text-decoration: none;
  }

  a:active, a:hover {

  }

  nav {
    background-color: #fff;
    height: 60px;
    box-sizing: border-box;
    line-height: 60px;
    z-index: 1;
  }

  nav > .left {
    line-height: 60px;
    float: none;
    font-size: 20px;
    font-weight: 700;
    max-height: 60px;
    display: inline-block;
    padding: 0 20px;
    background-color: #4cb6cb;
    color: #fff;
    width: 200px;
    box-sizing: border-box;
  }

  nav > .left > span {
    padding-left: 10px;
  }

  ul {
    list-style: none;
  }

  .iconfontyyy {
    font-family: "iconfont", serif !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    font-size: 24px;
  }

  nav > .contr {
    width: 54px;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    text-align: center;
    margin-left: -4px;
  }

  nav > .contr:hover {
    background-color: #edf2f3;
  }

  nav > .right {
    float: right;
    height: 100%;
  }

  nav > .right > li {
    float: left;
    min-width: 60px;
    height: 60px;
    cursor: pointer;
    text-align: center;
  }

  nav > .right > li:hover {
    background-color: #edf2f3;
  }

  nav > .right > .option {
    position: relative;
    padding: 0 20px;
  }

  nav > .right > .option > ul {
    width: 160px;
    position: absolute;
    top: 60px;
    right: 0;
    z-index: 1;
    box-shadow: 0 0 1px 0;
    box-sizing: border-box;
    background: #fff;
    /*opacity: 0;*/
    /*transition: all 1s;*/
  }

  nav > .right > .option > ul > li {
    height: 37px;
    line-height: 37px;

  }

  .hid {
    width: 70px !important;
  }

  .content_home {
    width: 100%;
    bottom: 0;
    top: 60px;
    position: absolute;
  }

  .content_home > .table_display {
    width: 100%;
    height: 100%;
    display: table;
  }

  .content_home > .table_display > .left {
    width: 200px;
    box-sizing: border-box;
    background: #181f24;;
    height: 100%;
    overflow: hidden;
    display: table-cell;
    /*transition: width 1s;*/
    position: relative;
  }

  .content_home > .table_display > .left > a {
    color: #627b8c !important;
    display: inline-block;
    width: 100%;
    height: 42px;
    line-height: 42px;
    font-size: 12px;
    padding-left: 15px;
    box-sizing: border-box;
  }

  .content_home > .table_display > .left > ul {
    width: 100%;
  }

  .content_home > .table_display > .left > ul > li {
    width: 100%;
    height: 37px;
    line-height: 37px;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
    text-align: center;
  }

  .content_home > .table_display > .left > ul > li > i {
    font-size: 16px;
    display: inline-block;
    width: 100%;
  }

  .iconfontyyycg {
    font-size: 24px !important;
  }

  .content_home > .table_display > .left > ul > li > span {
    color: #8ca1af;
    font-size: 14px;
    padding-left: 20px;
    font-weight: 700;
  }

  .content_home > .table_display > .left > ul > li:hover {
    background-color: #2c3942;
  }

  .content_home > .table_display > .left > ul > li:hover > span {
    color: #ffffff;
  }

  .content_home > .table_display > .right {
    overflow-y: auto;
    box-sizing: border-box;
    display: table-cell;
    vertical-align: top;
    height: 100%;
  }

  .noticenum {
    display: inline-block;
    background: #f00;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 13px;
    right: 16px;
    line-height: 15px;
    font-size: 80%;
    border-radius: 50%;
    color: #fff;
  }

  .userImg {
    width: 40px;
    height: 40px;
    display: inline-block;
    border-radius: 50%;
    top: 10px;
    position: relative;
  }
</style>
