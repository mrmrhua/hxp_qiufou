<template>
  <div class="warp" id="box">
    <myNav></myNav>
    <div class="main">
      <div class="content_home">
        <div class="left">
          <div class="top">
            <p><img style="width: 70px;border-radius: 50%;"
                    :src="user.headimg" alt=""></p>
            <p style="color:#313131;" v-text="user.nickname"></p>
            <!--<p style="color: #828282;" v-text="city"></p>-->
          </div>
          <div class="bottom">
            <ul>
              <router-link tag="li" to="/">进行中的</router-link>
              <!-- <router-link tag="li" to="/ds">最近浏览</router-link>-->
            </ul>
          </div>
        </div>
        <div class="right">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import myNav from "@/components/Nav"
  import foot from "@/components/Footer"
  export default{
    components: {
      myNav,
      foot
    },
    data() {
      return {
        user: {
          headimg: null,
          nickname: null
        },
      }
    },
    created(){
      if (window.localStorage.houxiaopanguser) {
        this.user = JSON.parse(window.localStorage.houxiaopanguser)
      }

    }
  }
</script>

<style>
  @font-face {
    font-family: 'iconfont';  /* project id 335733 */
    src: url('//at.alicdn.com/t/font_335733_tyu5k90l4gh6ko6r.eot');
    src: url('//at.alicdn.com/t/font_335733_tyu5k90l4gh6ko6r.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_335733_tyu5k90l4gh6ko6r.woff') format('woff'),
    url('//at.alicdn.com/t/font_335733_tyu5k90l4gh6ko6r.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_335733_tyu5k90l4gh6ko6r.svg#iconfont') format('svg');
  }

  * {
    padding: 0 0;
    margin: 0 0;
    box-sizing: border-box;
    letter-spacing: 1px;
  }

  body {
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "HeitiSC", "WenQuanYi Micro Hei", sans-serif;
  }

  .warp {
    border-spacing: 0;
    height: 100%;
    width: 100%;
  }

  .main {
    background: #f5f5f5;
    padding: 30px 0;
    overflow: hidden;
  }

  .main > .content_home {
    width: 1100px;
    margin: 0 auto;
  }

  .main > .content_home > .left {
    width: 200px;
    float: left;
    margin-right: 30px;
  }

  .main > .content_home > .left > .top {
    width: 100%;
    background: #fff;
    padding: 25px;
    text-align: center;
  }

  .top > p {
    line-height: 30px;
    font-size: 16px;
  }

  .main > .content_home > .left > .bottom {
    width: 100%;
    margin-top: 30px;
    background: #fff;
  }

  .main > .content_home > .left > .bottom > ul {
    width: 100%;
    padding: 10px 0;
  }

  .main > .content_home > .left > .bottom > ul > li {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    font-size: 16px;
    border-left: 3px solid #fff;
    cursor: pointer;
  }

  .router-link-exact-active {
    border-left: 3px solid #d01667 !important;
  }

  .main > .content_home > .left > .bottom > ul > li:hover {
    border-left: 3px solid #d01667;
  }

  .main > .content_home > .right {
    width: 870px;
    float: left;
    background: #fff;
    padding: 30px 35px;
  }

  ul {
    list-style: none;
  }

  .iconfontyyy {
    font-family: "iconfont", serif !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    font-size: 24px;
  }

  .btn_image {
    width: 150px;
    height: 39px;
    cursor: pointer;
    border-radius: 25px;
    text-align: center;
    line-height: 39px;
    color: #d01667;
    background-color: #fff;
    border: 1px solid #d01667;
    margin: 30px auto;
  }

  .err {
    display: none;
    color: #f00;
    position: absolute;
    top: 0;
    left: 10px;
  }

  .btn_image:hover {
    color: #fff;
    background: linear-gradient(to right, #d01667, #fe6549);
    border: none;
  }

  #img-container {
    width: 400px;
    height: 400px;
    float: left
  }

  #img-preview {
    width: 160px;
    height: 120px;
    overflow: hidden;
  }

  .mymodal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 20;
  }

  .mymodal > .conte {
    width: 630px;
    margin: 30px auto;
    overflow: hidden;
    background: #FFF;
    border-radius: 5px;
    padding: 15px;
  }

  .mymodal > .conte > .div_btns {
    width: 100%;
    height: 50px;
    float: left;
    line-height: 50px;
  }

  .mymodal > .conte > .div_btns > button {
    border-radius: 25px;
    width: 70px;
    height: 30px;
    outline: none;
    cursor: pointer;
    text-align: center;
    color: #d01667;
    background-color: #fff;
    border: 1px solid #d01667;
  }

  .mymodal > .conte > .div_btns > button:hover {
    color: #fff;
    background: linear-gradient(to right, #d01667, #fe6549);
    border: none;
  }

  .mymodal > .conte > .div_btns > i {
    display: inline-block;
    width: 50px;
    text-align: center;
    vertical-align: top;
    cursor: pointer;
  }
</style>
