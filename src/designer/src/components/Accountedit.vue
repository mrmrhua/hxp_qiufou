<template>
  <div class="warp">
    <div class="alert">
      <img class="icon" src="../assets/naticeicon@2x.png" alt="">
      <p style="font-size: 12px;">为保证资金安全，只能绑定本人的支付宝账户</p>
    </div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">姓名：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="walletinfo.name" placeholder="请输入支付宝账户姓名"/>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">支付宝账户：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="walletinfo.alipay" placeholder="请输入支付宝账户"/>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">手机号码：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" v-model="walletinfo.tel" placeholder="请输入您的手机号码"/>
        </div>
      </div>
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label">验证码：</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="code" class="weui-input" placeholder="请输入验证码"/>
        </div>
        <div class="weui-cell__ft">
          <button @click="slider" :class="{'zhecolor':color}" class="weui-vcode-btn">{{text}}</button>
        </div>
      </div>
    </div>
    <div class="link_btn"><span @click="bindaccount" class="link_btn" style="padding: 0 15px;">保存</span></div>
    <p class="desc">没有支付宝？</p>
    <p class="desc">-请咨询人工服务　0571-28121302</p>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        walletinfo: {
          name: null,
          alipay: null,
          tel: null,
        },
        code: null,
        text: '获取验证码',
        color: false,
        isrun: false,
        s: 60
      }
    },
    created(){
      if (this.$route.query.type == "1") {
        this.walletinfo = JSON.parse(window.localStorage.walletinfo)
      }
    },
    methods: {
      slider(){
        if (this.isrun) return
        if (this.walletinfo.tel === null || this.walletinfo.tel.trim() === "") {
          showModal("请填写手机号。")
          return
        }
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.walletinfo.tel.trim()))) {
          showModal("手机号格式错误。")
          return;
        }
        this.isrun = true
        this.sendsliderapi()
        this.color = true
        this.text = this.s + "秒后重新获取"
        var that = this
        var a = setInterval(function () {
          that.s--;
          that.text = that.s + "秒后重新获取"
          if (that.s === 0) {
            that.isrun = false
            that.color = false
            that.text = "获取验证码"
            that.s = 60;
            clearInterval(a)
          }
        }, 1000)

      },
      sendsliderapi(){
        var that = this
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/designer/verifysend",
          token: true,
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
      bindaccount(){
        if (this.code === null || this.code.trim() === ""
          || this.walletinfo.name === null || this.walletinfo.name.trim() === ""
          || this.walletinfo.tel === null || this.walletinfo.tel.trim() === ""
          || this.walletinfo.alipay === null || this.walletinfo.alipay.trim() === "") {
          showModal("请将信息填写完整。")
          return
        }
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.walletinfo.tel.trim()))) {
          showModal("手机号格式错误。")
          return;
        }
        showload("提交中···")
        var that = this
        ajax({
          url: "http://www.houxiaopang.com/api/v1.1/designer/bindalipay",
          token: true,
          type: "post",
          data: {
            tel: that.walletinfo.tel.trim(),
            alipay: that.walletinfo.alipay.trim(),
            name: that.walletinfo.name.trim(),
            code: that.code.trim()
          },
          success(res){
            if (res.code === 0) {
              that.$route.push("/account")
            } else {
              showModal("验证码错误！")
            }
            hideload()
          },
          error(){
            hideload()
            showModal("网络拥挤，请稍后再试！")
          }
        })
      }
    }
  }
</script>
<style scoped>
  .warp {
    height: 100%;
    position: relative;
    background: #f4f4f4;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .alert {
    height: 40px;
    background: yellow;
    display: flex;
    padding: 0 15px;
    align-items: center;
    color: #fe6549;
  }

  .weui-cells {
    margin-top: 0;
  }

  .icon {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }

  .weui-cell__bd {
    flex-shrink: 0;
  }

  .link_btn {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #348dff;
  }

  .desc {
    color: #666;
    font-size: 12px;
    padding-left: 10px;
    line-height: 1.5;
  }

  .zhecolor {
    color: #999 !important;
  }

  .weui-vcode-btn {
    color: #348dff;
    font-size: 14px;
  }
</style>
