<template>
  <div class="warp">
    <div class="main">
      <div class="to">
        <p style="width: 70px;">提现至</p>
        <p>{{walletinfo.alipay}}</p>
      </div>
      <div class="d">账户余额</div>
      <div class="money">￥{{setMoney(walletinfo.money)}}</div>
    </div>
    <div @click="tixian" class="mybtn">确定提现</div>
    <p style="color: #666;">温馨提示：提现到账需3-5个工作日</p>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        walletinfo: {
          money: 0
        }
      }
    },
    created(){
      try {
        this.walletinfo = JSON.parse(window.localStorage.walletinfo);
      } catch (e) {
        this.$router.push("/balance")
      }
    },
    methods: {
      tixian(){
        this.withdarwapply()
      },
      setMoney(value){
        return value.toFixed(2)
      },
      withdarwapply(){//提现申请
        showload("提交中···")
        var that = this
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/designer/withdrawapply_wx",
          token: true,
          type: "post",
          timeout: 5000,
          data: {
            money: that.walletinfo.money,
            tel: that.walletinfo.tel,
          },
          success(res){
            if (res.code === 0) {
              that.$router.push('/withdrawinfo');
            }
            hideload()
          },
          error(){
            hideload()
            showModal("网络拥挤，请稍后再试。")
          }
        })
      }
    }

  }

</script>
<style scoped>

  .warp {
    height: 100%;
    background: #f4f4f4;
    padding: 10px 15px;
  }

  .mybtn {
    width: 100%;
    background: linear-gradient(to right, #fe6549, #d01667);
    font-size: 16px;
    border-radius: 0;
    margin-top: 25px;
  }

  .main {
    background: #fff;
    padding: 10px 15px;
  }

  .to {
    border-bottom: 1px solid #d9d9d9;
    height: 40px;
    display: flex;
    align-items: center;
  }

  .d {
    height: 30px;
    display: flex;
    align-items: center;
    color: #666;
  }

  .money {
    font-size: 30px;
    display: flex;
    align-items: center;
    height: 50px;
  }
</style>
