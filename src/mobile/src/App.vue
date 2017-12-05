<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  * {
    margin: 0 0;
    padding: 0 0;
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
  }
  html {
    font-size: 62.5%;
    height: 100%;
  }

  body {
    height: 100%;
    font-size: 1.4rem;
    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "HeitiSC", "WenQuanYi Micro Hei", sans-serif;
  }

  #app {
    height: 100%;
  }

  ul {
    list-style: none;
  }

  @font-face {
    font-family: 'iconfont';  /* project id 386639 */
    src: url('//at.alicdn.com/t/font_386639_j0cp6fbjq7ojemi.eot');
    src: url('//at.alicdn.com/t/font_386639_j0cp6fbjq7ojemi.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_386639_j0cp6fbjq7ojemi.woff') format('woff'),
    url('//at.alicdn.com/t/font_386639_j0cp6fbjq7ojemi.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_386639_j0cp6fbjq7ojemi.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  .modal-open {
    position: relative !important;
    overflow: auto;
  }

  .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before {
    color: #d01667 !important;
  }

  .weui-cells:before, .weui-cells:after {
    border: none !important;
  }
</style>
