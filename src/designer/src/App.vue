<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created(){
      if (code) {
        this.getuid()//微信登录
      } else {
        if (!token) {
          this.wxlogin();
        } else {
          this.authenticated();
        }
      }
    },
    methods: {
      wxlogin() {//
        if (path === null || path === "/" || path === "" || path === 'null')
          location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx35c4ce958bc7eb68&redirect_uri=https%3A%2F%2Fm.houxiaopang.com%2Fadmin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        else
          location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx35c4ce958bc7eb68&redirect_uri=https%3A%2F%2Fm.houxiaopang.com%2Fadmin%2F%23%2F" + path + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
      },
      authenticated() {//
        var that = this
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/token/authenticated",
          token: true,
          timeout: 5000,
          success(res){
            if (res.code === 0) {
              login = true;
              window.localStorage.applystatus = res.data.applystatus;
              applystatus = res.data.applystatus;
              if (res.data.applystatus === 2) {
                if (path === null || path === "/" || path === "" || path === 'null') {
                  that.$router.push("/main")
                } else {
                  that.$router.push(path)
                }
              } else {
                that.$router.push("/alert")
              }
            }
          },
          error(error){
            if (error.status === 401) {
              that.wxlogin();
            } else {
              hideload();
              showModal("网络拥挤，请稍后再试。")
            }
          }
        })
      },
      getuid() {
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/wx_getuid",
          data: {
            code: code
          },
          timeout: 5000,
          success(res){
            if (res.code === 0) {
              window.localStorage.token = res.data.token
              window.localStorage.applystatus = res.data.applystatus;
              var path = window.localStorage.path;
              if (path === null || path === "/" || path === "" || path === 'null') {
                location.href = "https://m.houxiaopang.com/admin"
              } else {
                location.href = "https://m.houxiaopang.com/admin/#/" + path
              }
            } else {
              showModal("登录失败，请退出重试。")
            }
            hideload();
          },
          error(){
            hideload();
            showModal("登录失败，请退出重试。")
          }
        })
      },
    }
  }
</script>

<style>
  #app {
    height: 100%;
  }

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
