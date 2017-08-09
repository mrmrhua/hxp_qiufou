<template>
  <div id="app">
    <mynav></mynav>
    <router-view></router-view>
    <myfooter></myfooter>
  </div>
</template>

<script>
  import nav from "@/components/nav"
  import footer from "@/components/Footer"
  export default {
    name: 'app',
    components: {
      'mynav': nav,
      'myfooter': footer
    },
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
    src: url('//at.alicdn.com/t/font_0017cvbbftysc3di.eot');
    src: url('//at.alicdn.com/t/font_0017cvbbftysc3di.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_0017cvbbftysc3di.woff') format('woff'),
    url('//at.alicdn.com/t/font_0017cvbbftysc3di.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_0017cvbbftysc3di.svg#iconfont') format('svg');
  }


</style>
