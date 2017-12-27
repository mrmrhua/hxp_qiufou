<template>
  <div class="warp">
    <div class="content">
      <i class="weui-icon-success weui-icon_msg iconcolor"></i>
      <p style="font-size: 20px;height: 50px;">提现请求成功！</p>
      <p style="color: #666;">预计3-5个工作日内到账</p>
      <p class="money">￥{{setMoney(walletinfo.money)}}</p>
      <router-link tag="div" to="/main" class="mybtn">完成</router-link>
    </div>
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
      setMoney(value){
        return value.toFixed(2)
      }
    }

  }

</script>
<style scoped>
  .warp {
    background: #f4f4f4;
    height: 100%;
  }

  .money {
    font-size: 36px;
    margin-top: 25px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    padding: 20px 15px 5px;
  }

  .iconcolor {
    color: #fe6549;
    margin: 20px 0;
  }

  .mybtn {
    margin-top: 25px;
  }
</style>
