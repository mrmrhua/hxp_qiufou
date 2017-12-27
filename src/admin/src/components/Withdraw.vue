<template>
  <div>
    <div class="title">
      <router-link to="/account" style="border: none !important;" tag="span">返回</router-link>
      确认提现信息
    </div>
    <div class="info">
      <div class="infoitem">
        <div class="lf">姓名：</div>
        <div class="rt">{{walletinfo.name}}</div>
      </div>
      <div class="infoitem">
        <div class="lf">支付宝账户：</div>
        <div class="rt">{{walletinfo.alipay}}</div>
      </div>
      <div class="infoitem">
        <div class="lf">提现金额：</div>
        <div class="rt">￥{{setMoney(walletinfo.money)}}</div>
      </div>
      <div class="infoitem">
        <div class="lf">到账时间：</div>
        <div class="rt">3-5个工作日</div>
      </div>
    </div>
    <div class="info" style="background: #fff;padding-top: 10px;height: 100px;">
      <div class="infoitem">
        <div class="lf">手机号：</div>
        <div class="rt">{{walletinfo.tel}}</div>
      </div>
      <div class="infoitem" style="margin-top: 10px;">
        <div class="lf">验证码：</div>
        <div class="rt">
          <input v-model="code" type="text">
          <span @click="slider()" :class="{'zhecolor':color}" class="myspan_slider">{{text}}</span>
        </div>
      </div>
    </div>
    <div @click="tixian" class="btn">提交申请</div>
    <div class="mymodal" v-show="delmodel">
      <div class="conte">
        <div style="background: #DEDEDE;height: 30px;line-height: 30px;padding: 0 15px;">
          <span>滑块验证</span><span
          style="float: right;cursor: pointer"
          @click="delmodel=false"><i class="iconfontyyy">&#xe67c;</i></span>
        </div>
        <div style="width: 300px;margin: 50px auto">
          <div id="slider"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        msg: null,
        walletinfo: {
          money: 0
        },
        delmodel: false,
        text: '获取短信验证码',
        s: 60,
        isrun: false,
        code: null,
        subing: false,
        color: false
      }
    },
    created(){
      this.getbind(); // 获取钱包信息
    },
    mounted(){
      var that = this
      // 初始化滑块验证
      $("#slider").slider({
        width: 300, // width
        height: 40, // height
        sliderBg: "#F2F4F5", // 滑块背景颜色
        color: "#333333", // 文字颜色
        fontSize: 14, // 文字大小
        bgColor: "rgba(255,68,91,0.7)", // 背景颜色
        textMsg: "按住滑块，拖拽验证", // 提示文字
        successMsg: "验证通过了哦", // 验证成功提示文字
        successColor: "#fff", // 滑块验证成功提示文字颜色
        time: 400, // 返回时间
        callback: function (result) { // 回调函数，true(成功),false(失败)
          if (result) {
            that.sendslider()
          }
        }
      });
    },
    methods: {
      setMoney(value){
        return value.toFixed(2)
      },
      tixian(){ //提现点击事件
        if (this.code === null || this.code.trim() === "") {
          hxpAlert.show("请填写短信验证码。")
          return
        }
        if (this.subing) {
          hxpAlert.show("提现申请已经提交。")
          return
        }
        this.subing = true
        this.withdarwapply()
      },
      slider(){//发送验证码按钮点击
        if (!this.isrun) {
          this.delmodel = true
        }
      },
      sendslider(){//获取验证码
        this.isrun = true
        this.sendsliderapi()
        this.color = true
        this.text = this.s + "秒后重新发送"
        var that = this
        var a = setInterval(function () {
          that.s--;
          that.text = that.s + "秒后重新发送"
          if (that.s === 0) {
            that.isrun = false
            that.color = false
            that.text = "获取短信验证码"
            that.s = 60;
            clearInterval(a)
          }
        }, 1000)
        this.delmodel = false
        $("#slider").slider("restore");
      },
      sendsliderapi(){ // 发送短信验证码
        var that = this
        $.ajax({
          url: "http://www.houxiaopang.com/api/v1.1/designer/verifysend",
          headers: {"Authorization": "Token " + token},
          data: {
            tel: that.walletinfo.tel.trim()
          },
          success(res){
            if (res.code === 0) {

            }
          },
          error(){

          }
        })
      },
      getbind(){//获取钱包信息
        var that = this
        $.ajax({
          url: "http://www.houxiaopang.com/api/v1.1/designer/walletinfo",
          headers: {"Authorization": "Token " + token},
          timeout: 5000,
          success(res){
            if (res.code === 0) {
              that.walletinfo = res.data;
            }
          },
          error(){
            hxpAlert.show("网络拥挤，请稍后再试。")
          }
        })
      },
      withdarwapply(){//提现申请
        var that = this
        $.ajax({
          url: "http://www.houxiaopang.com/api/v1.1/designer/withdrawapply",
          headers: {"Authorization": "Token " + token},
          type: "post",
          data: {
            money: that.walletinfo.money,
            tel: that.walletinfo.tel,
            code: that.code
          },
          success(res){
            if (res.code === -1) {
              hxpAlert.show("网络拥挤，请稍后再试。")
            } else if (res.code === 0) {
              hxpAlert.show("提现申请已提交，请耐心等待。")
              that.$router.push('/account');
            }
            that.subing = false
          },
          error(){
            that.subing = false
            hxpAlert.show("网络拥挤，请稍后再试。")
          }
        })
      },
    }
  }
</script>
<style scoped>
  .title {
    text-align: center;
    height: 50px;
    font-size: 18px;
    border-bottom: 1px solid #d9d9d9;
    overflow: hidden;
  }

  .title > span {
    float: left;
    font-size: 14px;
    background: #fff;
    cursor: pointer;
    margin-left: 15px;
  }

  .mymodal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mymodal > .conte {
    width: 350px;
    height: 170px;
    overflow: hidden;
    background: #FFF;
    border-radius: 5px;
    padding: 0 0;
    text-align: center
  }

  .info {
    width: 640px;
    height: 150px;
    background: #f5f5f5;
    margin: 10px auto 0;
    padding: 15px 0;
  }

  .infoitem {
    width: 100%;
    font-size: 14px;
    overflow: hidden;
  }

  .lf {
    width: 50%;
    float: left;
    text-align: right;
    padding-right: 10px;
    height: 30px;
    line-height: 30px;
  }

  .rt {
    width: 50%;
    float: left;
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
  }

  input {
    width: 130px;
    outline: none;
    padding-left: 10px;
    box-sizing: border-box;
    display: block;
    float: left;
    height: 30px;
    border: 1px solid #cbd5dd;
    border-radius: 2px;
    font-size: 14px;
  }

  input:focus {
    border-color: #545ca6;
  }

  .btn {
    width: 120px;
    height: 44px;
    border: 1px solid #d01667;
    color: #d01667;
    text-align: center;
    line-height: 44px;
    font-size: 16px;
    cursor: pointer;
    margin: 30px auto 0;
  }

  .btn:hover {
    background: linear-gradient(to right, #fe6549, #d01667);
    color: #fff;
    border: 1px solid #fff;
  }

  .zhecolor {
    color: #999 !important;
  }

  .myspan_slider {
    font-size: 14px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    margin-left: 20px;
    color: #348dff;
  }
</style>
