<template>
  <section class="up-section loading fl">
    <span class="up-span"></span>
    <img class='close-upimg' src="http://image.houxiaopang.com/baseform/a7.png" @click="delconfirm">
    <img class='up-img up-opcity' v-bind:src="getfileurl">
  </section>
</template>
<script>
  export default{
    props: ['each_file', 'index'],
    computed: {
      getfileurl: function () {
        return window.URL.createObjectURL(this.each_file)
      }
    },
    mounted: function () {
      //todo 文件上传
      uploader.addFile(this.each_file);
    },
    methods: {
      delconfirm: function () {
        this.$emit("removeimg", this.index);
      }
    }
  }

</script>
