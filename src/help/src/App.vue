<template>
  <div id="app">
    <myNav @shownotice="shownoticeMethod" @showoption="showoptionMethod" :show_option="show_option"
           :shownotice="shownotice"></myNav>
    <div style="background: #f5f5f5;padding: 30px 0;">
      <div class="warp">
        <div class="left">
            <router-link  to="/help">客户指南</router-link>
            <router-link  to="/help/designer">设计师指南</router-link>
            <router-link  to="/help/faq">常见问题</router-link>
            <router-link  to="/help/aboutus">关于猴小胖</router-link>
            <router-link  to="/help/contact">联系我们</router-link>
        </div>
        <div class="right">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
  import myNav from "./components/Nav.vue"
  import Foot from "./components/Footer.vue"
  export default {
    name: 'app',
    data(){
      return {
        show_option: false,
        shownotice: false,
      }
    },
    components: {
      myNav,
      Foot
    },
    mounted(){
      var that = this;
      document.onclick = function () {
        if (that.show_option) {
          that.show_option = false;
        }
        if (that.shownotice) {
          that.shownotice = false;
        }
      }
    },
    methods: {
      shownoticeMethod(){
        if (this.show_option) {
          this.show_option = false;
        }
        this.shownotice = true;
      },
      showoptionMethod(){
        if (this.shownotice) {
          this.shownotice = false;
        }
        this.show_option = true;
      }
    }
  }
</script>

<style>
  @font-face {
    font-family: 'iconfont';  /* project id 335733 */
    src: url('//at.alicdn.com/t/font_335733_30de29a5t949rudi.eot');
    src: url('//at.alicdn.com/t/font_335733_30de29a5t949rudi.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_335733_30de29a5t949rudi.woff') format('woff'),
    url('//at.alicdn.com/t/font_335733_30de29a5t949rudi.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_335733_30de29a5t949rudi.svg#iconfont') format('svg');
  }

  .iconfontyyy {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    margin: 0 0;
    padding: 0 0;
    letter-spacing: 1px;
    box-sizing: border-box;
  }

  ul {
    list-style: none;
  }

  body {
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "HeitiSC", "WenQuanYi Micro Hei", sans-serif;
  }

  .warp {
    width: 1000px;
    margin: 0 auto;
    overflow: hidden;
  }

  .warp > .left {
    width: 200px;
    float: left;
    background: #fff;
    padding: 10px 0;
  }

  .warp > .right {
    width: 800px;
    float: left;
    padding: 0 0 0 30px;
  }


  .warp > .left > a {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    font-size: 16px;
    border-left: 3px solid #fff;
    text-decoration: none;
    color: #313131;
    display: block;
  }

  .router-link-exact-active {
    border-left: 3px solid #d01667 !important;
  }

  .warp > .left > a:hover {
    border-left: 3px solid #d01667;
  }

  .content {
    background: #fff;
    padding: 30px 30px;
  }

  .content > h3 {
    font-size: 24px;
    line-height: 1.5;
  }

  .content > p {
    font-size: 16px;
    color: #727272;
    line-height: 2;
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>
