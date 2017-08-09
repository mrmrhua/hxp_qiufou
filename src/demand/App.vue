<template>
  <div id="app">
    <mynav></mynav>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <foot></foot>
  </div>
</template>

<script>
  import nav from "@/components/nav"
  import foot from "@/components/Footer"

  export default {
    name: 'app',
    components: {
      'mynav': nav,
      'foot': foot
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
    font-family: 'iconfont';  /* project id 378553 */
    src: url('//at.alicdn.com/t/font_ids21uodkarcz0k9.eot');
    src: url('//at.alicdn.com/t/font_ids21uodkarcz0k9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_ids21uodkarcz0k9.woff') format('woff'),
    url('//at.alicdn.com/t/font_ids21uodkarcz0k9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_ids21uodkarcz0k9.svg#iconfont') format('svg');
  }
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    cursor: pointer;
  }
</style>
