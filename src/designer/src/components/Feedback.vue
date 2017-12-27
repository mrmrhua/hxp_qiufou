<template>
  <div style="height: 100%;background: #f4f4f4;overflow: hidden;">
    <div class="weui-cells__title">意见反馈</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">
            <textarea v-model="content" style="height: 100px;" class="weui-textarea"
                      placeholder="在使用中有任何问题，都可以反馈给我们，可以帮助我们让猴小胖做的更好哦"></textarea>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">您的意见被采纳将会有小礼品赠送</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">手机号</div>
        </div>
        <div class="weui-cell__bd">
          <input v-model="tel" type="number" class="weui-input" placeholder="请输入联系方式"/>
        </div>
      </div>
    </div>
    <div @click="submit" class='mybtn'>提交反馈</div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        content: null,
        tel: null
      }
    },
    methods: {
      submit(){
        if (this.content === null || this.content.trim() === "") {
          showModal("请填写意见反馈！");
          return
        }
        if (this.tel) {
          this.tel = this.tel.trim()
        }
        var that = this
        showload("提交中")
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/designer/feedback",
          type: "post",
          data: {
            tel: this.tel,
            content: this.content.trim()
          },
          success(res) {
            if (res.code === 0) {
              that.$router.push("/main")
            } else {
              showModal('网络拥挤，请稍后再试')
            }
            hideload()
          },
          fail() {
            hideload()
            showModal('网络拥挤，请稍后再试')
          }
        })
      }
    }
  }
</script>
<style scoped>
  .mybtn {
    width: 200px;
    height: 47px;
    background: linear-gradient(to right, #ec8c69, #ed5fa0);
    text-align: center;
    line-height: 47px;
    color: #fff;
    font-size: 18px;
    border-radius: 5px;
    margin: 50px auto 15px;
  }
</style>
