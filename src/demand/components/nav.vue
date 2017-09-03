<template>
  <div class="nav">
    <div class="logo" onclick="javascript:location.href='http://houxiaopang.com';"></div>
    <ul>
      <li onclick="javascript:location.href='http://houxiaopang.com';">首页</li>
      <router-link class="active" to="/" tag="li">发单广场</router-link>
      <li onclick="javascript:location.href='http://houxiaopang.com/workdetail';">作品精选</li>
    </ul>
    <div id="desinger" v-show="!login" class="desinger"
         onclick="javascript:location.href='http://houxiaopang.com/qrlogin';">
      <p>我是设计师</p>
    </div>
    <div v-show="login" class="userInfo" onclick="javascript:location.href='http://houxiaopang.com/admin';">
      <span style="font-size: 12px;vertical-align: top" v-html="nickname"></span>
      <img src="http://userhead.houxiaopang.com/ovS1y1eqGJuYTLmesIuyEY5d4Ttg.jpg"
           style="width: 40px;height: 40px;border-radius: 50%;" alt="" :src="headimg">
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        nickname: "",
        headimg: "",
      }
    },
    created(){
      var that = this;
      if (token) {//token存在，验证token是否过期
        $.ajax({
          type: "get",
          url: "http://houxiaopang.com/api/v1.1/token/authenticated",
          headers: {"Authorization": "Token " + token},
          success(data){
            if (data.code === 0) {
              login = true;
              window.localStorage.applystatus = data.data.applystatus;
              $.ajax({
                url: 'http://houxiaopang.com/api/v1.1/designerdash/header',
                type: "GET",
                headers: {"Authorization": "Token " + token},
                success(data) {
                  if (data.code === 0) {
                    that.nickname = data.data.nickname;
                    that.headimg = data.data.headimg;
                    window.localStorage.houxiaiopanguser = JSON.stringify(data.data);
                  }
                },
              });
            }
          },
        });
      }
    }
  }
</script>
<style scoped>
  .nav {
    height: 90px;
    line-height: 40px;
    padding: 20px 0;
    font-size: 20px;
    width: 1000px;
    margin: 0 auto;
  }

  .active {
    border-bottom: 2px solid #d01167;
  }

  .nav > .logo {
    background: url('http://image.houxiaopang.com/demand/logodown.png') no-repeat;
    background-size: cover;
    width: 173px;
    height: 54px;
    text-align: right;
    float: left;
    cursor: pointer;
  }

  .nav > ul {
    float: left;
    padding: 0 10%;
    line-height: 50px;
    list-style: none;
  }

  .nav > ul > li {
    float: left;
    cursor: pointer;
    margin-right: 25px;
  }

  .nav > ul > li:hover {
    border-bottom: 2px solid #d01667;
  }

  .userInfo {
    cursor: pointer;
    position: relative;
    margin-right: -75px;
    margin-top: 5px;
    float: right;
    height: 40px;
  }

  .desinger {
    display: table;
    width: 150px;
    font-size: 16px;
    height: 40px;
    border: 1px solid #d01667;
    border-radius: 30px;
    float: right;
    text-align: center;
    cursor: pointer;
    position: relative;
    margin-right: -75px;
    margin-top: 5px;
  }

  .desinger:hover {
    background: linear-gradient(to right, #d01667, #fe6549);
    color: #fff;
    border: none;
  }
</style>
