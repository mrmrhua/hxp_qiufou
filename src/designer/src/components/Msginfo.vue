<template>
  <div class="warp">
    <div class="content">
      <div>{{msg.title}}</div>
      <div v-html="msg.content"></div>
      <div>{{msg.up_time}}</div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        msg: null
      }
    },
    created(){
      var notice = JSON.parse(window.localStorage.notice)
      var idx = this.$route.params.idx
      this.msg = notice[idx]
    }
  }

</script>
<style scoped>
  .warp {
    height: 100%;
    position: relative;
    background: #f4f4f4;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px 15px;
  }

  .content {
    background: #fff;
    border-radius: 5px;
  }

  .content > div:nth-of-type(1) {
    font-weight: 600;
    font-size: 18px;
    color: #313131;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content > div:nth-of-type(2) {
    font-size: 14px;
    color: #999;
    padding: 0 15px;
    min-height: 60px;
  }

  .content > div:nth-of-type(3) {
    height: 40px;
    color: #999;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 15px;
    font-size: 14px;
  }
</style>
