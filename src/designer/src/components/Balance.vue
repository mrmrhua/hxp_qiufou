<template>
  <!--余额-->
  <div class="warp">
    <router-link tag="p" to="/balanceinfo" class="balance_info">余额明细 <img class="icon"
                                                                          style="margin-right: 0;margin-left: 2px;width: 14px;height: 14px;"
                                                                          src="../assets/left.png" alt=""></router-link>
    <img src="../assets/star@2x.png" class="img" alt="">
    <p class="balance">账户余额</p>
    <p class="money"><span style="font-size: 30px;">￥</span>{{setMoney(walletinfo.money)}}</p>
    <p>猴小胖托管金额{{setMoney(walletinfo.frozen_money,1)}}元</p>
    <div @click="tixian" class="mybtn">我要提现</div>
    <router-link tag="p" to="/account" style="align-self: flex-end;font-size: 16px;">账户管理</router-link>
    <!--<div class="natice">
      <img class="icon" src="../assets/naticeicon@2x.png" alt="">
      一笔金额转出中
    </div>-->
    <div class="modal" v-show="isband">
      <div class="md_con">
        <p style="font-size: 16px;">您还没有绑定支付宝账户哦~</p>
        <router-link to="/accountedit" tag="p" style="color: blue;margin-top: 20px;font-size: 16px">前往绑定</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        isband: false,
        walletinfo: {
          money: 0
        }
      }
    },
    created(){
      showload("加载中···")
      this.getbind()
    },
    methods: {
      tixian(){
        if (parseFloat(this.walletinfo.money) > 0) {
          this.$router.push("/withdraw")
        } else {
          showModal("账户余额不足。")
        }
      },
      setMoney(value){
        return value.toFixed(2)
      },
      getbind(){//获取钱包信息
        var that = this
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/designer/walletinfo",
          token: true,
          timeout: 5000,
          success(res){
            if (res.code === 0) {
              that.walletinfo = res.data;
              if (!that.walletinfo.hasAlipay) {
                that.isband = true
              }
              window.localStorage.walletinfo = JSON.stringify(res.data)
            }
            hideload()
          },
          error(){
            hideload()
            showModal("网络拥挤，请稍后再试。")
          }
        })
      },
    }
  }
</script>
<style scoped>
  .warp {
    height: 100%;
    overflow: hidden;
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    color: #313131;
    position: relative;
  }

  .balance_info {
    align-self: flex-end;
    color: #E74055;
    margin-bottom: 10px;
    display: flex;
    font-size: 16px;
    align-items: center;
  }

  .balance {
    font-size: 18px;
    height: 50px;
    line-height: 50px;
  }

  .natice {
    align-self: flex-start;
    color: #666;
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  .img {
    width: 40%;
  }

  .icon {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }

  .money {
    font-size: 36px;
    color: #E74055;
  }

  .mybtn {
    border-radius: 0;
    width: 100%;
    background: linear-gradient(to right, #fe6549, #d01667);
    margin-top: 30px;
    font-size: 18px;
    height: 50px;
    line-height: 50px;
    margin-bottom: 20px;
  }

  .modal {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .md_con {
    height: 25%;
    width: 80%;
    background: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

  }
</style>
