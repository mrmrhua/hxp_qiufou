<template>
  <div>
    <div class="waiting-check" v-show="applystatus!=-1">
      <img src="http://image.houxiaopang.com/baseform/721/suc1.png" width="250">
      <h2 style="color:#313131;margin-top: 50px;margin-bottom: 30px;">您的入驻申请已提交成功!</h2>
      <p style="color: #797979;font-size: 14px;">我们的工作人员将在一周内联系您告知申请结果。非常感谢!</p>
      <div class="backbtn" onclick="javascript:location.href='/'"></div>
    </div>
    <div class="waiting-check" v-show="applystatus==-1">
      <img src="http://image.houxiaopang.com/baseform/721/fail.png" width="250">
      <h2 style="color:#313131;margin-top: 50px;margin-bottom: 30px;">您的入驻申请审核失败!</h2>
      <p style="color: #797979;font-size: 14px;">请完善资料或重新提交。非常感谢!</p>
      <div class="home" @click="home"></div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        applystatus: applystatus
      }
    },
    methods: {
      home(){
        this.$router.push('/');
      }
    }
  }
</script>
