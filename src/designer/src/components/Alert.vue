<template>
  <div class="toastwarp">
    <div style="width: 35%;margin-bottom: 1rem">
      <img width="100%" style="display: block" src="http://image.houxiaopang.com/mobile/tmp/pc.png" alt="">
    </div>
    <p>为了更好的使用体验</p>
    <p>请您使用PC端进行入驻申请</p>
    <p>houxiaopang.com/qrlogin</p>
  </div>
</template>
<script>
	export default{
		created(){
			hideload();
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
    font-size: 14px;
    color: #313131;
    font-weight: 600;
  }

  p:last-child {
    font-size: 14px;
    color: #787878;
  }
</style>
