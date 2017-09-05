<template>
  <transition name="fade">
    <div class="prompt" v-show="promptshow">
      <img :src="prompt_img">
      <p>{{prompt_text}}</p>
    </div>
  </transition>
</template>
<script>
  export default{
    props: ['prompt', 'promptshow'],
    computed: {
      prompt_img(){
        if (this.prompt === "success") {
          return "http://image.houxiaopang.com/prompt/success.png"
        }
      },
      prompt_text(){
        if (this.prompt === "success") {
          return "成功"
        }
      }
    },
  }
</script>
<style scoped>
  .prompt {
    z-index: 1024;
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    border-radius: 20px;
    position: fixed;
    top: 30%;
    left: 45%;
  }

  .prompt > img {
    margin-top: 30px;
    width: 96px;
    height: 96px;
  }

  .prompt > p {
    font-size: 30px;
    color: #fff;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

</style>
