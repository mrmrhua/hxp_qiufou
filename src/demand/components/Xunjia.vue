<template>
  <div style="background: #f5f5f5;">
    <div style="overflow: hidden;position: relative;z-index:2;">
      <div style="position: absolute;top: 0;left: 0;background: rgba(0,0,0,0.6);height: 100%;width: 100%;"></div>
      <img style="display: block" width="100%" src="http://image.houxiaopang.com/demand/banner2.png" alt="">
    </div>
    <div class="biaodan">
      <div class="content">
        <div class="broker" @click="chat">
          <span style="vertical-align: top;line-height: 50px;color: #313131;">阿华&nbsp;</span>
          <img style="border-radius: 50%;width: 50px;"
               src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503390136223&di=27c7a885cafbe74972fdee3ce3ac3bdc&imgtype=0&src=http%3A%2F%2Fv1.qzone.cc%2Favatar%2F201503%2F29%2F21%2F09%2F5517f985afad0692.png%2521200x200.jpg"
               alt="">
        </div>
        <i @click="back" class="iconfont back">&#xe7a1;<span> 返回</span></i>
        <p>猴小胖项目邀约</p>
        <p>{{info.title}}</p>
        <div class="desc" v-html="info.description"></div>
        <!--<p>营销平台的手机APP开发</p>
        <p>二、主要功能点</p>
        <p>发布游戏、查看游戏详情</p>
        <p>三、可参考产品</p>
        <p>支付宝AR红包</p>-->
        <p><i class="iconfont" style="font-size: 19px;">&#xe693;</i><span> 工期：</span><span
          style="color:#313131;line-height: 26px;">{{info.howlong}}</span></p>
        <p><i class="iconfont" style="font-size: 19px;">&#xe613;</i><span> 预算：</span><span
          style="color:#313131;line-height: 26px;">{{info.howmuch}}</span></p>
        <ul>
          <li class="li_img" @click="jump(item)" v-for="item in info.desc_img"><img :src="setimg(item)" alt=""></li>
        </ul>
        <div id="pj" class="img" @click="show"></div>
      </div>
      <!--模糊图-->
      <div class="content prompt" v-show="prompt">
        <div class="prompt_help" v-show="status == 1">您的入驻申请尚在审核中，请耐心等待。</div>
        <div class="prompt_help" v-show="status == -1" style="cursor: pointer;">您的入驻申请未通过审核，请重新填写申请。</div>
      </div>
      <div class="content" style="margin-top: 60px;" v-show="showfrom">
        <div class="input-group">
          <label>项目报价：</label>
          <input v-model="howmuch" type="text" placeholder="如：9999元">
        </div>
        <div class="input-group">
          <label>工期预估：</label>
          <input v-model="howlong" type="text" placeholder="如：1-2周">
        </div>
        <div class="input-group">
          <label>设计构想（选填）：</label>
          <textarea v-model="ideas" placeholder="最多500字，超出不显示"></textarea>
        </div>
        <!--<p style="color: #727272;font-size: 20px;">猴小胖说明</p>
        <p style="font-size: 18px;color:#727272;margin-bottom: 0;margin-top: 20px;">1.我们将会从中收取一定的服务费</p>
        <p class="shuoming">2.服务费</p>
        <p class="shuoming">3.服务费</p>-->
        <div class="sendimg" @click="reply"></div>
      </div>
    </div>

    <div class="modal" v-show="modalshow">
      <div class="login">
        <div style="text-align: right;padding: 0 15px;line-height: 30px;position: absolute;width: 100%;top:0;"><span
          style="cursor: pointer;" @click="modalshow= false">&#935;</span></div>
        <div id="wxqrcode"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        showfrom: false,
        info: {},
        modalshow: false,
        howmuch: '',
        howlong: '',
        ideas: '',
        prompt: false,
        status: 0,
      }
    },
    created(){
      var that = this;
      $.ajax({
        url: 'http://houxiaopang.com/api/v1.1/demanddetail',
        type: "GET",
        data: {'demand_id': that.$route.params.id},
        success: function (data) {
          if (data.code === 0) {
            that.info = data.data;
          } else {
            alert("网络拥挤，请稍后再试···");
          }
        },
      });
    },
    watch: {
      '$route'(){
        var that = this;
        if (this.$route.query.code) {
          $.ajax({
            url: 'http://houxiaopang.com/api/v1.1/wx_verify',
            type: "GET",
            data: {'code': that.$route.query.code},
            success: function (data) {
              if (data.code === '0') {
                window.localStorage.token = data.data.token;
                token = data.data.token;
                if (data.data.applystatus === 0) {
                  location.href = "http://houxiaopang.com/apply";
                } else {
                  window.localStorage.applystatus = data.data.applystatus;
                  location.assign("http://houxiaopang.com/demand/#/xunjia/" + that.$route.params.id);
                  window.location.reload();
                }
              } else {
                alert('微信授权失败');
                location.assign("http://houxiaopang.com/demand/#/xunjia/" + that.$route.params.id);
                window.location.reload();
              }
            },
            error: function () {
              alert("网络拥挤，请稍后再试···");
            }
          });
        }
      }
    },
    methods: {
      chat(){
        //新窗口打开   咨询经纪人
        if (login) {//如果真，不需要判断token是否过期
          //判断用户状态码，
          //todo 需修改地址
          open("http://localhost/chat");
        } else {
          this.showlogin();
        }
      },
      back(){
        this.showfrom = false;
        document.getElementById("pj").className = "img";
        this.$router.push("/");
      },
      reply(){//提交表单
        if (this.howmuch == "") {
          alert("请填写项目报价");
          return;
        }
        if (this.howlong == "") {
          alert("请填写工期预算");
          return;
        }
        var replyform = {};
        replyform.howmuch = this.howmuch.trim();
        replyform.howlong = this.howlong.trim();
        replyform.ideas = this.ideas.trim();
        var that = this;
        $.ajax({
          type: "post",
          url: "http://houxiaopang.com/api/v1.1/replydemand",
          headers: {"Authorization": "Token " + token},
          data: {
            'demand_id': that.$route.params.id,
            'replyform': JSON.stringify(replyform),
          },
          success(data){
            if (data.code === 0) {
              alert("提交成功！");
              that.showform();
              window.scrollTo(0, 0);
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          },
          error(){
            alert("网络拥挤，请稍后再试···");
          }
        });


      },
      setimg(value){//根据七牛api,设置传回的图片
        return value + "?imageView2/1/w/210/h/210";//根据高宽等比集中裁剪
      },
      showform(){//显示、隐藏报价表单
        this.showfrom = !this.showfrom;
        if (this.showfrom) {
          document.getElementById("pj").className = "active";
        } else {
          document.getElementById("pj").className = "img";
        }
      },
      jump(value){
        open(value);
      },
      show(){
        if (login === true) {//如果真，不需要判断token是否过期
          //判断用户状态码，
          if (this.judgeStatus()) {
            //显示报价表单
            this.showform();
          }
        } else {
          this.showlogin();
        }
      },
      showhelp(){
        this.prompt = true;
      },
      judgeStatus(){//判断状态码
        this.status = window.localStorage.applystatus;
        if (this.status == 2) {
          return true;
        } else {
          this.showhelp();
          return false;
        }
      },
      showlogin(){//显示微信登录
        this.modalshow = true;
        var that = this;
        new WxLogin({
          id: "wxqrcode",
          appid: "wxbfacdb1b99885182",
          scope: "snsapi_login",
          redirect_uri: "http%3a%2f%2fhouxiaopang.com%2fdemand%2f%23%2fxunjia%2f" + that.$route.params.id,
          state: "",
          style: "",
          href: ""
        });
      }
    }
  }
</script>
<style>
  .biaodan {
    z-index: 10;
    position: relative;
    padding-bottom: 50px;
  }

  .biaodan > .content {
    width: 1000px;
    background: #fff;
    padding: 60px 60px;
    box-sizing: border-box;
    margin: -200px auto 60px;
    position: relative;
  }

  .biaodan > .content > .broker {
    position: absolute;
    right: 50px;
    top: 100px;
    cursor: pointer;
  }

  .biaodan > .content > .back {
    color: #bbb;
  }

  .biaodan > .content > .back:hover {
    color: #313131;
  }

  .biaodan > .content > p {
    color: #727272;
    font-size: 18px;
    margin-top: 40px;
    line-height: 24px;

  }

  .desc {
    font-size: 18px;
    margin-top: 20px;
    line-height: 1.5;
  }

  .desc > p {
    word-wrap: break-word;
    margin: 0 0 15px 0;
    color: #333;
  }

  .biaodan > .content > p:nth-of-type(1) {
    color: #d01667;
    font-size: 30px;
  }

  .biaodan > .content > p:nth-of-type(2) {
    color: #313131;
    font-size: 26px;
    margin: 40px 0;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
    line-height: 90px;
  }

  .biaodan > .content > ul {
    list-style: none;
    overflow: hidden;
    margin-top: 30px;
  }

  .biaodan > .content > ul > li {
    float: left;
    margin-right: 10px;
    width: 210px;
    height: 210px;
    text-align: center;
    border: 1px solid #eee;
    overflow: hidden;
    cursor: pointer;
  }

  .li_img {
    opacity: 0.7;
  }

  .li_img:hover {
    opacity: 1;
  }

  .biaodan > .content > ul > li > img {
  }

  .biaodan > .content > .img {
    background: url("http://image.houxiaopang.com/demand/baojia_nml.png");
    background-size: cover;
    width: 200px;
    height: 52px;
    margin: 90px auto 30px auto;
    cursor: pointer;
  }

  .biaodan > .content > .active {
    width: 200px;
    height: 52px;
    margin: 90px auto 30px auto;
    cursor: pointer;
    background: url("http://image.houxiaopang.com/demand/baojia_ovr.png");
    background-size: cover;
  }

  .biaodan > .content > .sendimg {
    background: url("http://image.houxiaopang.com/demand/send_nml.png");
    background-size: cover;
    width: 200px;
    height: 52px;
    margin: 90px auto 30px auto;
    cursor: pointer;
  }

  .biaodan > .content > .sendimg:hover {
    background: url("http://image.houxiaopang.com/demand/send_ovr.png");
    background-size: cover;
  }

  .content > .input-group {
    margin-bottom: 50px;
    overflow: hidden;
  }

  .content > .input-group > label {
    color: #d01667;
    display: inline-block;
    font-size: 24px;
    line-height: 45px;
  }

  .content > .input-group > input {
    outline: none;
    border: 1px solid #999;
    height: 45px;
    font-size: 20px;
    padding-left: 10px;

  }

  ::-webkit-input-placeholder {
    color: #bfbfbf;
  }

  .content > .input-group > textarea {
    width: 99%;
    border: 1px solid #999;
    outline: none;
    font-size: 20px;
    padding-left: 10px;
    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "HeitiSC", "WenQuanYi Micro Hei", sans-serif;
    box-sizing: border-box;
    height: 300px;
    margin-top: 20px;
  }

  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 100;
  }

  .modal > .login {
    width: 403px;
    height: 433px;
    margin: 100px auto;
    background: #fff;
    position: relative;
    padding: 15px 0;
  }

  #wxqrcode {
    width: 302px;
    margin: 0 auto;
  }

  .prompt {
    margin-top: 60px !important;
    height: 395px;
    background: url('http://image.houxiaopang.com/demand/prompt.png') no-repeat !important;
    background-size: 100% !important;
  }

  .prompt > .prompt_help {
    font-size: 20px;
    line-height: 50px;
    background: linear-gradient(to right, #fe6549, #d01667);
    width: 500px;
    margin: 63px auto;
    text-align: center;
    border-radius: 5px;
    color: #fff;
  }
</style>
