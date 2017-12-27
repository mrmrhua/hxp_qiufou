<template>
  <transition name="fade">
    <div class="mymodal" style="background: transparent" v-show="promptshow">\
      <div style="position:relative;width:100%;height: 100%;">
        <div class="prompt">
          <img :src="prompt_img">
          <p v-text="prompt_text"></p>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default{
    props: ['prompt', 'promptshow'],
    computed: {
      prompt_img(){
        if (this.prompt.type === 1) {
          return "http://image.houxiaopang.com/prompt/success.png"
        } else if (this.prompt.type === 2) {
          return "http://image.houxiaopang.com/prompt/loading.gif"
        }
      },
      prompt_text(){
        return this.prompt.text
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
    position: absolute;
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
