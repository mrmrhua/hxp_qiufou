<template>
  <div class="warp">
    <div class="uploadhead">
      <div class="headwarp">
        <img style="border-radius: 50%;" :src="basic.headimg" alt="">
        <!--<input id="img_input" type="file" accept="image/*;capture=camera" class="hidefile">-->
      </div>
      <div style="margin-top: 10px;">{{basic.nickname || "未填写"}}</div>
    </div>
    <div class="weui-cells__title">基本资料</div>
    <div class="weui-cells">
      <!--<div class="weui-cell">
        <div class="weui-cell__bd">
          <p>昵称</p>
        </div>
        <div class="weui-cell__ft">{{basic.nickname || "未填写"}}</div>
      </div>-->
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>性别</p>
        </div>
        <div class="weui-cell__ft">{{formatSex(basic.sex)}}</div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>毕业年份</p>
        </div>
        <div class="weui-cell__ft">{{basic.startyear || "未填写"}}</div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>教育经历</p>
        </div>
        <div class="weui-cell__ft">{{basic.school || "未填写"}}</div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>所在地</p>
        </div>
        <div class="weui-cell__ft">{{setcity(basic.city) || "未填写"}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>手机号码</p>
        </div>
        <div class="weui-cell__ft">{{basic.tel || "未填写"}}</div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>邮箱</p>
        </div>
        <div class="weui-cell__ft">{{basic.email || "未填写"}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        basic: {}
      }
    },
    created(){
      var that = this
      if (token) {
        showload("加载中")
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/designerdash/userinfo",
          token: true,
          success(res){
            if (res.code === 0) {
              that.basic = res.data.basic
            } else {
              showModal("网络拥挤，请稍后再试。")
            }
            hideload()
          },
          error(){
            hideload()
            showModal("网络拥挤，请稍后再试。")
          }
        })
      }
    },
    methods: {
      setcity(value){
        if (!value) return
        var c = value.split(" ");
        if (c[0] === c[1]) {
          return c[0]
        } else {
          return value
        }
      },
      uploadimg(){
        var $img_input = document.getElementById("img_input")
        $img_input.click()
      },
      formatSex(value){
        var sex = "未填写"
        switch (value) {
          case 1:
            sex = "男";
            break;
          case 2:
            sex = "女";
            break;
        }
        return sex;
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

  .hidefile {
    display: none;
  }

  .headwarp {
    position: relative;
    width: 80px;
    height: 80px;
    /*background: linear-gradient(to right, #ec8c69, #ed5fa0);*/
    border-radius: 50%;
    display: flex;
    justify-content: center;;
    align-items: center;

  }

  .headwarp > img {
    width: 75px;
  }

  .uploadhead {
    background: #fff;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    font-size: 12px;
    color: #999;
  }

  .weui-cell__ft {
    width: 70%;
    text-align: left;
    word-wrap: break-word;
    word-break: normal;
    color: #666;
  }

  .weui-cell__bd {
    width: 30%;
    color: #666;
  }

  .weui-cell {
    display: flex;
    justify-content: flex-start;
    padding: 5px 15px;
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
  }
</style>
