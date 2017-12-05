<template>
  <div class="toastwarp">
    <div style="width: 35%;margin-bottom: 1rem">
      <img width="100%" style="display: block" src="http://image.houxiaopang.com/mobile/tmp/pc.png" alt="">
    </div>
    <p>为了更好的使用体验</p>
    <p>请您使用PC端访问该页面</p>
    <p v-html="url"></p>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        url: "houxiaopang.com/w/" + this.$route.query.id,
      }

    }
  }
</script>
<style scoped>
  .toastwarp {
    display: flex;
    align-items: center;
    flex-flow: column;
    height: 80%;
    justify-content: center;
  }

  p {
    font-size: 2rem;
    line-height: 4rem;
    color: #313131;
    font-weight: 600;
  }

  p:last-child {
    font-size: 1.4rem;
    color: #787878;
    line-height: 1;
  }
</style>
