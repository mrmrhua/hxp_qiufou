<template>
  <div class="warp">
    <div class="weui-cells__title">我的账户信息</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>姓名：</p>
        </div>
        <div class="weui-cell__ft"><span style="float: left;width:80%;">{{walletinfo.name}}</span>
          <router-link tag="span" :to="{path:'/accountedit',query:{type:1}}" style="float: right;color: #348dff;">编辑
          </router-link>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>支付宝账户：</p>
        </div>
        <div class="weui-cell__ft">{{walletinfo.alipay}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>手机号码：</p>
        </div>
        <div class="weui-cell__ft">{{walletinfo.tel}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        walletinfo: {}
      }
    },
    created(){
      try {
        this.walletinfo = JSON.parse(window.localStorage.walletinfo);
      } catch (e) {
        this.$router.push("/balance")
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
    padding: 10px 15px;

  }

  .weui-cell__ft {
    width: 65%;
    text-align: left;
    word-wrap: break-word;
    word-break: normal;
    color: #666;
    padding-left: 15px;
  }

  .weui-cell__bd {
    width: 35%;
    color: #666;
    text-align: right;
  }

  .weui-cell {
    display: flex;
    justify-content: flex-start;
  }

  .weui-cell:before {
    border: none;
  }

  .weui-cells__title {
    color: #333;
    padding-left: 5px;
    font-size: 16px;
  }

  .weui-cells {
    color: #666;
    padding: 10px 0;
  }
</style>
