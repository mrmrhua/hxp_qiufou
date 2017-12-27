<template>
  <li>
    <section class="up-section loading" :style="{width: width,height: height}">
      <span class="up-span"></span>
      <img class='close-upimg' src="http://image.houxiaopang.com/baseform/a7.png" @click="delconfirm">
      <img class='up-img up-opcity' v-bind:src="each_file+'?imageView2/1/w/200/h/150'">
    </section>
  </li>
</template>
<script>
  export default{
    props: ['each_file', 'index', 'demand'],
    data(){
      return {
        width: '200px',
        height: '150px'
      }
    },
    created(){
      if (this.demand) { // 设置项目中的图片渲染大小
        this.width = "240px"
        this.height = "180px"
      }
    },
    methods: {
      delconfirm: function () { // 删除图片
        this.$emit('img_url', this.index);
      }
    }
  }

</script>
<style>

  .up-section {
    vertical-align: top;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 1px 0;
    text-align: center;
    line-height: 150px;
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

  .upimg-div .up-section {
    width: 160px;
    height: 120px;
    overflow: hidden;
  }

  .up-img {
    width: 100%;
  }

</style>
