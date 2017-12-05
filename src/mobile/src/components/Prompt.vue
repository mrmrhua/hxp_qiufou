<template>
  <div class="warp">
    <div class="content">
      <div style="font-size: 18px;font-weight: 600;">如何操作？</div>
      <div style="margin-top: 10px;">— 请贵公司财务人员向该账户打款</div>
      <div style="margin-top: 5px;">— 并告知猴小胖客服人员</div>

      <div class="zh">
        <div class="cell">
          <div class="l">银行账户：</div>
          <div class="r">杭州求否科技有限公司</div>
        </div>
        <div class="cell">
          <div class="l">账　　户：</div>
          <div class="r">201000166793054</div>
        </div>
        <div class="cell">
          <div class="l">开 户 行 ：</div>
          <div class="r">杭州联合银行三墩支行</div>
        </div>
      </div>
      <div style="font-size: 14px;margin-top: 40px;color: #2570ff;">如有任何问题</div>
      <div style="font-size: 14px;margin-top: 5px;">— 致电0571-28121302</div>
      <div @click="back" class="btn">返回</div>
    </div>
  </div>
</template>
<script>
  export default{
    methods: {
      back(){
        this.$router.go(-1);
      }
    }
  }
</script>
<style scoped>
  .warp {
    padding: 20px 0;
    min-height: 100%;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    font-size: 16px;
  }

  .content {
    width: 300px;
    display: flex;
    flex-direction: column;
  }

  .zh {
    background: #f4f4f4;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 30px;
    margin-top: 30px;
  }

  .cell {
    display: flex;
    height: 30px;
    align-items: center;
    width: 100%;
  }

  .l {
    width: 90px;
    flex-shrink: 0;
    font-size: 14px;
  }

  .r {
    width: 100%;
    flex-shrink: 1;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  .btn {
    border: 1px solid #999;
    height: 40px;
    width: 100px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-top: 40px;
  }
</style>
