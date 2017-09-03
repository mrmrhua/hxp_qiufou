<template>
  <footer>
    <div class="con">
      <div class="left">
        <div class="logo" style="float: none"></div>
        <p style="margin-top: 20px;line-height: 40px;">杭州求否科技有限公司旗下平台</p>
      </div>
      <ul class="center">
        <li><span onclick="javascript:location.href='http://houxiaopang.com/help/#/';">客户指南</span></li>
        <li><span onclick="javascript:location.href='http://houxiaopang.com/help/#/aboutus';">关于猴小胖</span></li>
        <li><span onclick="javascript:location.href='http://houxiaopang.com/help/#/designer';">设计师指南</span></li>
        <li><span onclick="javascript:location.href='http://houxiaopang.com/help/#/contact';">联系我们</span></li>
        <li><span onclick="javascript:location.href='http://houxiaopang.com/help/#/faq';">常见问题</span></li>
        <li><span onclick="javascript:location.href='http://houxiaopang.com/help/#/contact';">意见反馈</span></li>
      </ul>
      <div class="right">
        <p>@2017 杭州求否科技有限公司</p>
        <p>浙ICP备17006185号</p>
      </div>
    </div>
  </footer>
</template>
<style scoped>
  footer {
    height: 220px;
    display: block;
    padding: 40px 0;
    box-sizing: border-box;
    color: #727272;
  }

  ul {
    list-style: none;
  }

  footer > .con {
    width: 1100px;
    margin: 0 auto;
    height: 100%;
  }

  .logo {
    background: url('http://image.houxiaopang.com/demand/logodown.png') no-repeat;
    background-size: cover;
    width: 173px;
    height: 54px;
    text-align: right;
    float: left;
    cursor: pointer;
  }

  .con > .left {
    height: 100%;
    float: left;
    width: 300px;
  }

  .con > .center {
    height: 100%;
    float: left;
    width: 300px;
  }

  .con > .center > li {
    float: left;
    padding-left: 50px;
    width: 150px;
    box-sizing: border-box;
    height: 30px;
    line-height: 30px;

  }

  .con > .center > li > span {
    cursor: pointer;
  }

  .con > .center > li > span:hover {
    color: #d01667;
  }

  .con > .right {
    width: 400px;
    float: left;
    height: 100%;
  }

  .right > p {
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
</style>
