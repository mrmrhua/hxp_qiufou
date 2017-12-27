<template>
  <div class="warp"></div>
</template>
<script>
  export default{
    created(){
      showload("加载中···");
    }
  }
</script>
<style scoped>
  .warp {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: #fff;
    font-size: 14px;
    color: #999;
  }

</style>
