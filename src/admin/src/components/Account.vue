<template>
  <div>
    <div class="accinfo">
      <div class="info">
        <p style="padding-left: 8px;color: #333;font-size: 16px;">账户余额（元）</p>
        <p style="font-size: 32px;color: #333;margin-top: 11px">￥{{setMoney(walletinfo.money, 1)}}</p>
      </div>
      <div tag="div" class="btn" @click="tixian">提现</div>
    </div>
    <div class="trusteeship">
      <span>猴小胖托管金额{{setMoney(walletinfo.frozen_money,1)}}元</span>
      <div class="trust-pic">
        <img src="http://image.houxiaopang.com/account/img/reminder.png" alt="" style="width: 21px;height: 21px">
        <!--<span>客户已支付的项目费用将由猴小胖托管，在项目成功验收后支付给您</span>-->
        <div class="pop-box" style="width: 390px;top: 40px;left: -15px;">
          <div class="pop-content">
            <div class="doubt_content">客户已支付的项目费用将由猴小胖托管，在项目成功验收后支付给您</div>
          </div>
          <div class="pop-triangle">
            <i></i>
          </div>
        </div>
      </div>
    </div>
    <div class="icon">提现流程</div>
    <img style="display: block;width: 700px;margin: 35px auto 0;" src="../assets/liucheng.png" alt="">
    <div class="icon">账户管理</div>
    <div class="bindaccount">
      <div v-show="isbind === 0" style="width: 100%;height: 100%;overflow: hidden;">
        <div style="margin-top: 70px;text-align: center;font-size: 20px;">您暂时没有绑定账号</div>
        <div class="btn btn_bind" @click="isbind=1">点击绑定</div>
      </div>
      <div v-show="isbind === 1" style="width: 100%;height: 100%;overflow: hidden;padding: 10px 0;position: relative">
        <div class="group">
          <label>姓　　名：</label>
          <input v-model="name" type="text">
        </div>
        <div class="group">
          <label>支付宝账户：</label>
          <input v-model="alipay" type="text">
        </div>
        <div class="group">
          <label>手机号码：</label>
          <input v-model="tel" type="text">
        </div>
        <div class="group">
          <label>验 证 码：</label>
          <input v-model="code" type="text"><span @click="slider()" :class="{'zhecolor':color}" class="myspan_slider">{{text}}</span>
        </div>
        <div class="btn btn_submit" @click="bindaccount">保存</div>
      </div>
      <div v-show="isbind === 2" style="width: 100%;height: 100%;overflow: hidden;padding: 10px 0;position: relative">
        <div class="group">
          <label>姓　　名：</label>
          <span>{{walletinfo.name}}</span>
        </div>
        <div class="group">
          <label>支付宝账户：</label>
          <span>{{walletinfo.alipay}}</span>
        </div>
        <div class="group">
          <label>手机号码：</label>
          <span>{{walletinfo.tel}}</span>
        </div>
        <div class="btn btn_submit" @click="isbind = 1">修改</div>
      </div>
    </div>
    <div class="help">
      <span style="cursor: pointer;color: #348ddf;">需要帮助?</span>
      <p style="font-size: 14px;color: #333;">如需提现到银行卡或其他服务，请致电　0571-28121302</p>
    </div>
    <div v-show="cashflow.length > 0" class="icon" style="margin-top: 25px;">余额明细</div>
    <table v-show="cashflow.length > 0" class="table" cellspacing="0" border="0">
      <thead>
      <tr>
        <th>日期</th>
        <th>项目</th>
        <th>金额（元）</th>
        <th>状态</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in cashflow">
        <td>{{item.when}}</td>
        <td>{{item.remark}}</td>
        <td>{{setMoney(item.change_money)}}</td>
        <td>
          <span>{{item.status}}</span>　<i :title="item.detail" v-show="item.detail" class="iconfontyyy"
                                          style="vertical-align: -2px;font-size: 20px;color:#f00;cursor: pointer;">&#xe691;</i>
        </td>
      </tr>
      </tbody>
    </table>

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
        isbind: 0,// 0 未绑定，1 显示绑定框，2已经绑定
        walletinfo: {
          money: 0,
          frozen_money:0,
        },
        cashflow: [],
        delmodel: false,
        text: '获取短信验证码',
        s: 60,
        isrun: false,
        tel: null,
        name: null,
        alipay: null,
        code: null,
        subing: false,
        color: false,
      }
    },
    created(){
      this.init()
    },
    mounted(){
      var that = this
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
      init(){
        if (login) {
          this.getbind()
          this.getcashflow()
        } else {
          var that = this
          setTimeout(function () {
            that.init();
          }, 1000)
        }
      },
      slider(){//发送验证码按钮点击
        if (this.tel === null || this.tel.trim() === "") {
          alert("请填写手机号")
          return
        }

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
            this.color = false
            that.text = "获取短信验证码"
            that.s = 60;
            clearInterval(a)
          }
        }, 1000)
        this.delmodel = false
        $("#slider").slider("restore");
      },

      sendsliderapi(){
        var that = this
        $.ajax({
          url: "http://www.houxiaopang.com/api/v1.1/designer/verifysend",
          headers: {"Authorization": "Token " + token},
          data: {
            tel: that.tel.trim()
          },
          success(res){
            if (res.code === 0) {

            }
          },
          error(){

          }
        })
      },
      tixian(){
        if (this.walletinfo.hasAlipay) {
          if (parseInt(this.walletinfo.money) > 0) {
            this.$router.push('/account/withdraw')
          } else {
            alert("账户余额不足。")
          }
        } else {
          alert("您暂时没有绑定账号。")
        }
      },
      setMoney(value, pa){
        if (pa) {
          return value.toFixed(2)
        }
        return value > 0 ? "+" + value.toFixed(2) : value.toFixed(2)
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
              if (that.walletinfo.hasAlipay) {
                that.isbind = 2
              }
            }
          },
          error(){
            alert("网络拥挤，请稍后再试。")
          }
        })
      },
      getcashflow(){//查看流水
        var that = this
        $.ajax({
          url: "http://www.houxiaopang.com/api/v1.1/designer/getcashflow",
          headers: {"Authorization": "Token " + token},
          success(res){
            if (res.code === 0) {
              that.cashflow = res.data.cashflow
            }
          },
          error(){
            alert("网络拥挤，请稍后再试。")
          }
        })
      },
      bindaccount(){
        if (this.code === null || this.code.trim === ""
          || this.name === null || this.name.trim === ""
          || this.tel === null || this.tel.trim === ""
          || this.alipay === null || this.alipay.trim === "") {
          alert("表单需填写完整。");
          return
        }
        if (this.subing) {
          return
        }
        this.subing = true
        var that = this
        $.ajax({
          url: "http://www.houxiaopang.com/api/v1.1/designer/bindalipay",
          headers: {"Authorization": "Token " + token},
          type: "post",
          data: {
            tel: that.tel.trim(),
            alipay: that.alipay.trim(),
            name: that.name.trim(),
            code: that.code.trim()
          },
          success(res){
            if (res.code === 0) {
              that.walletinfo.hasAlipay = true
              that.walletinfo.name = that.name.trim()
              that.walletinfo.tel = that.tel.trim()
              that.walletinfo.alipay = that.alipay.trim()
              that.isbind = 2
            } else {
              alert("验证码错误！")
            }
            that.subing = false
          },
          error(){
            alert("网络拥挤，请稍后再试！")
            that.subing = false
          }
        })
      }
    }
  }

</script>
<style scoped>
  .accinfo {
    height: 80px;
    overflow: hidden;
  }

  .info {
    float: left;
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

  .btn {
    float: right;
    width: 100px;
    height: 40px;
    border: 1px solid #d01667;
    color: #d01667;
    text-align: center;
    line-height: 40px;
    margin: 15px 26px 15px 87px;
    font-size: 16px;
    cursor: pointer;
  }

  .btn:hover {
    background: linear-gradient(to right, #fe6549, #d01667);
    color: #fff;
    border-color: #fff;
  }

  .btn_submit {
    width: 100px;
    height: 40px;
    position: absolute;
    right: 35px;
    bottom: 23px;
    line-height: 44px;
    margin: 0 0;
  }

  .btn_bind {
    width: 110px;
    height: 40px;
    line-height: 40px;
    margin: 30px auto 0;
    float: none;
  }

  .help {
    padding: 10px 25px;
    font-size: 16px;
  }

  .icon {
    display: block;
    width: 150px;
    margin-top: 50px;
    margin-left: -35px;
    background: url("../assets/icon.png") no-repeat;
    height: 50px;
    background-size: 100%;
    color: #fff;
    line-height: 50px;
    padding-left: 20px;
    font-size: 18px;
  }

  .bindaccount {
    width: 750px;
    height: 220px;
    border: 2px dashed #d9d9d9;
    margin: 30px auto 0;
  }

  .table {
    width: 750px;
    border: 1px solid #dedede;
    margin: 25px auto 0;
  }

  th {
    height: 50px;
    width: 25%;
    font-size: 16px;
    background: #c2ddff;
  }

  tr {
    height: 40px;
    width: 25%;
    font-size: 14px;
    text-align: center;
    background: #fff;
  }

  tbody > tr:nth-child(2n) {
    background: #edf5ff;
    color: #313131;
  }

  .group {
    overflow: hidden;
    margin-top: 15px;
    position: relative;
  }

  .group > label {
    float: left;
    width: 150px;
    text-align: right;
    height: 30px;
    line-height: 30px;
  }

  /*.group > .input {
    width: 261px;
    float: left;
    height: 28px;
    border:1px solid #dddddd;
    line-height: 28px;
    padding:0 10px;
    margin-left: 36px;
  }*/
  .group > span {
    display: inline-block;
    height: 30px;
    margin-left: 25px;
    line-height: 30px;
  }

  .group > input {
    width: 261px;
    outline: none;
    padding-left: 10px;
    box-sizing: border-box;
    display: block;
    float: left;
    height: 30px;
    border: 1px solid #cbd5dd;
    border-radius: 2px;
    font-size: 14px;
    margin-left: 36px;
  }

  .group > input:focus {
    border-color: #545ca6;
  }

  .zhecolor {
    color: #999 !important;
  }

  .myspan_slider {
    cursor: pointer;
    margin-left: 20px;
    color: #348dff;
  }

  .trusteeship{
    padding-left: 8px;
    font-size: 18px;
    color: #666666;
    display: flex;
    align-items: center;
  }
  .trusteeship img{
    cursor: pointer;
    margin-right: 13px;
  }
  .trusteeship span:last-child{
    display: none;
    font-size: 14px;
  }
  .trust-pic{
    margin-left:11px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .trust-pic:hover .pop-box{
    display: block;
  }

  .pop-box {
    display: none;
    border: 1px solid #DEDEDE;
    position: absolute;
    border-radius: 5px;
    background: #ffffff;
  }

  .doubt_content {
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0px;
    padding: 12px 4px 10px 14px;
  }

  .pop-content {
    width: 100%;
    height: 100%;
  }

  .pop-triangle {
    position: absolute;
    top: -21px;
    left: 17px;
    display: block;
    height: 0;
    width: 0;
    font-size: 0;
    line-height: 0;
    border-color: transparent transparent #DEDEDE transparent;
    border-style: dashed dashed solid dashed;
    border-width: 10px;
  }

  .pop-triangle i {
    position: absolute;
    top: -9px;
    left: -10px;
    display: block;
    height: 0;
    width: 0;
    font-size: 0;
    line-height: 0;
    border-color: transparent transparent #fff transparent;
    border-style: dashed dashed solid dashed;
    border-width: 10px;
  }
</style>
