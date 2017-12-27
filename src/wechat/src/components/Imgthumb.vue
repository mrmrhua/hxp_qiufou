<template>
  <li>
    <section class="up-section loading">
      <span class="up-span"></span>
      <img class='close-upimg' src="http://image.houxiaopang.com/baseform/a7.png" @click="delconfirm">
      <img class='up-img up-opcity' v-bind:src="each_file">
    </section>
  </li>
</template>
<script>
  export default{
    props: ['each_file', 'index'],
    methods: {
      delconfirm: function () {
        this.$emit('img_url', this.index);
      }
    }
  }

</script>
<style>

  .up-section {
    width: 240px;
    height: 180px;
    vertical-align: top;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 1px 0;
  }

  .up-section .close-upimg {
    position: absolute;
    top: 6px;
    right: 8px;
    display: none;
    z-index: 10;
    cursor: pointer;
  }

  .up-section .up-span {
    display: block;
    width: 100%;
    height: 100%;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    background: rgba(0, 0, 0, .5);
  }

  .up-section:hover .close-upimg {
    display: block;
  }

  .up-section:hover .up-span {
    visibility: visible;
  }

  .loading {
    border: 1px solid #D1D1D1;
    background: url('http://image.houxiaopang.com/baseform/loading.gif') no-repeat center;
  }

  .up-opcity {
    opacity: 0;
  }

  .up-img {
    width: 100%;
  }

</style>
