<template>
  <router-view :login="login"></router-view>
</template>
<script>
  export default{
    data(){
      return {
        login: false
      }
    },
    created(){
      showload("加载中");
      var code = getQueryString("code");
      if (code) {
        this.getuid(code)//微信登录
      } else {
        if (!token) {
          this.wxlogin();
        } else {
          this.authenticated();
        }
      }
    },
    methods: {
      wxlogin() {
        location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx35c4ce958bc7eb68&redirect_uri=https%3A%2F%2Fm.houxiaopang.com%2Fdemand%2F%23%2Fworkproject&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
      },
      authenticated() {
        var that = this
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/wxfwh/token/clientauthenticated",
          token: true,
          timeout: 5000,
          success(res){
            if (res.code === 0) {
              that.login = true
              if(that.$route.path == "/workproject" || that.$route.path == "/workproject/"){
                that.$router.push("/workproject/demand")
              }
            }
          },
          error(error){
            hideload();
            that.login = true
            if (error.status === 401) {
              that.wxlogin();
            } else {
              showModal("网络拥挤，请稍后再试。")
            }
          }
        })
      },
      getuid(code) {
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/wx_verfify_client",
          data: {
            code: code
          },
          timeout: 5000,
          success(res){
            if (res.code === 0) {
              window.localStorage.token = res.data.token
              token = res.data.token
              location.href = "https://m.houxiaopang.com/demand/#/workproject"
            } else {
              showModal("登录失败，请重试。")
            }
            hideload();
          },
          error(){
            hideload();
            showModal("登录失败，请重试。")
          }
        })
      },
    }
  }
</script>
