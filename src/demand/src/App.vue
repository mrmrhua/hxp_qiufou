<template>
  <div id="app">
    <mynav @shownotice="shownoticeMethod" @showoption="showoptionMethod" :show_option="show_option"
           :shownotice="shownotice"></mynav>
    <router-view @showbjxz="showbjxzMethod" :show_bjxz="show_bjxz"></router-view>
    <foot></foot>
  </div>
</template>

<script>
  import nav from "@/components/Nav"
  import foot from "@/components/Footer"
  export default {
    name: 'app',
    data(){
      return {
        show_option: false,
        shownotice: false,
        show_bjxz: false,
      }
    },
    components: {
      'mynav': nav,
      'foot': foot
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
        if (that.show_bjxz) {
          that.show_bjxz = false;
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
      },
      showbjxzMethod(){
        if (this.show_bjxz) {
          return
        }
        this.show_bjxz = !this.show_bjxz;
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
    font-family: 'iconfont';  /* project id 378553 */
    src: url('//at.alicdn.com/t/font_378553_vm0fdtwmi4szto6r.eot');
    src: url('//at.alicdn.com/t/font_378553_vm0fdtwmi4szto6r.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_378553_vm0fdtwmi4szto6r.woff') format('woff'),
    url('//at.alicdn.com/t/font_378553_vm0fdtwmi4szto6r.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_378553_vm0fdtwmi4szto6r.svg#iconfont') format('svg');
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

  @font-face {
    font-family: 'iconfontyyy';  /* project id 335733 */
    src: url('//at.alicdn.com/t/font_335733_tyu5k90l4gh6ko6r.eot');
    src: url('//at.alicdn.com/t/font_335733_tyu5k90l4gh6ko6r.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_335733_tyu5k90l4gh6ko6r.woff') format('woff'),
    url('//at.alicdn.com/t/font_335733_tyu5k90l4gh6ko6r.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_335733_tyu5k90l4gh6ko6r.svg#iconfont') format('svg');
  }

  .iconfontyyy {
    font-family: "iconfontyyy", serif !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    font-size: 24px;
  }

</style>
