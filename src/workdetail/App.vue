<template>
  <div id="app">
    <mynav @shownotice="shownoticeMethod" @showoption="showoptionMethod" :show_option="show_option"
           :shownotice="shownotice"></mynav>
    <router-view></router-view>
    <myfooter></myfooter>
  </div>
</template>

<script>
  import nav from "@/components/Nav"
  import footer from "@/components/Footer"
  export default {
    name: 'app',
    data(){
      return {
        show_option: false,
        shownotice: false,
      }
    },
    components: {
      'mynav': nav,
      'myfooter': footer
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
  * {
    margin: 0 0;
    padding: 0 0;
    letter-spacing: 1px;
    box-sizing: border-box;
  }

  body {
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "HeitiSC", "WenQuanYi Micro Hei", sans-serif;
  }

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
  ul{
    list-style: none;
  }
</style>
