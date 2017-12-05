<template>
  <div class="warp">
    <div class="uploadhead">
      <div class="headwarp">
        <img src="../assets/cam@2x.png" alt="">
      </div>

    </div>
    <div class="group">
      <span>昵称</span>
      <input type="text" placeholder="请输入项目报价">
    </div>
    <div class="group groupnd">
      <span>性别</span>
      <select>
        <option>男</option>
        <option>女</option>
      </select>
    </div>
    <div class="group groupnd">
      <span>毕业年份</span>
      <select>
        <option v-for="n in 61" :value="n+1969" v-html="n+1969">{{n}}</option>
      </select>
    </div>
    <div class="group">
      <span>教育经历</span>
      <input type="text" placeholder="请输入项目报价">
    </div>
    <div class="group">
      <span>所在地</span>
      <input type="text" placeholder="请输入项目报价">
    </div>
    <div class="group">
      <span>手机号码<span style="color:#999;font-size: 1.2rem;">（仅自己可见）</span></span>
      <input type="number" placeholder="请输入项目报价">
    </div>
    <div class="group">
      <span>邮箱<span style="color:#999;font-size: 1.2rem;">（仅自己可见）</span></span>
      <input type="text" placeholder="请输入项目报价">
    </div>

  </div>
</template>
<script>
  export default{

    data(){

    },
    methods: {}
  }

</script>

<style scoped>
  .warp {
    height: 100%;
    position: relative;
    background: #f4f4f4;
  }

  .headwarp {
    width: 120px;
    height: 120px;
    background: linear-gradient(to right, #ec8c69, #ed5fa0);
    border-radius: 50%;
    display: flex;
    justify-content: center;;
    align-items: center;
  }

  .headwarp > img {
    width: 75%;
  }

  .uploadhead {
    background: #fff;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .warp > .group:last-child {
    border-bottom: none;
  }

  .group {
    background: #fff;
    font-size: 1.6rem;
    line-height: 4rem;
    display: flex;
    padding: 0 1rem;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
    width: 100%;
  }

  .group > span {
    width: 150px;
    flex-shrink: 0;
  }

  .group > input, select {
    -webkit-appearance: none;
    font-size: 1.6rem;
    outline: none;
    border: none;
    flex-shrink: 1;
    color: #313131;
    vertical-align: top;
    width: 70%;
    text-align: right;
    background: transparent;
  }

  select {
    direction: rtl;
    padding-right: 20px;
  }

  .groupnd {
    position: relative;
  }

  .groupnd:after {
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: absolute;
    top: 50%;
    right: 15px;
    margin-top: -4px;
  }
</style>
