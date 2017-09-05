<template>
  <div id="app">
    <myNav @shownotice="shownoticeMethod" @showoption="showoptionMethod" :show_option="show_option"
           :shownotice="shownotice"></myNav>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
  import myNav from "@/components/Nav"
  import Foot from "@/components/Footer"
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
</style>
