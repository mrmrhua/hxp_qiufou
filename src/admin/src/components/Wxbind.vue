<template>
  <div class="wx_warp">
    <div style="font-size: 16px;margin-bottom: 20px;">微信服务号绑定</div>
    <div style="border-top: 1px solid #dedede;"></div>
    <div v-show="!isbind" style="padding: 20px 0 0;">
      <img :src="qrbind" alt="" style="margin:0 auto;width: 150px;height: 150px;display: block;">
      <p style="text-align: center;color: #999;padding: 20px;">微信扫码，绑定服务号，实时接收最新项目推送。</p>
    </div>
    <div v-show="isbind" style="padding: 20px 0 0;">
      <p>
        <span style="margin-right: 50px;">您已成功绑定微信服务号</span>
        <span @click="delBind" class="btn">解绑</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        qrbind: "http://www.houxiaopang.com/api/v1.1/qrbind?token=" + token,
        isbind: false
      }
    },
    created(){
      this.init();
    },
    methods: {
      init(){
        if (login) {
          this.isBind()
        } else {
          var that = this;
          setTimeout(function () {
            that.init()
          }, 1000)
        }
      },
      isBind(){ //  获取服务号绑定状态
        var that = this
        $.ajax({
          url: "http://www.houxiaopang.com/api/v1.1/isbind",
          headers: {"Authorization": "Token " + token},
          success(res){
            if (res.code === 0) {
              that.isbind = res.data.isbind
            } else {
              hxpAlert.show("网络拥挤，请稍后再试。")
            }
          },
          error(){
            hxpAlert.show("网络拥挤，请稍后再试。")
          }
        })
      },
      delBind(){ // 解绑服务号
        var that = this
        $.ajax({
          url: "http://www.houxiaopang.com/api/v1.1/delbind",
          type: "POST",
          headers: {"Authorization": "Token " + token},
          success(res){
            if (res.code === 0) {
              that.isbind = false
            } else {
              hxpAlert.show("网络拥挤，请稍后再试。")
            }
          },
          error(){
            hxpAlert.show("网络拥挤，请稍后再试。")
          }
        })
      }

    }

  }

</script>
<style scoped>
  .wx_warp {
    height: 340px;
  }

  .btn {
    display: inline-block;
    width: 60px;
    height: 30px;
    border: 1px solid #d9d9d9;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }

  .btn:hover {
    background: #d01667;
    color: #fff;
    border: 1px solid #d01667;
  }

</style>
