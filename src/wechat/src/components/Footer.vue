<template>
  <footer>
    <!--<div class="con">
      <div class="left">
        <div class="logo" style="float: none"></div>
        <p style="margin-top: 10px;line-height: 40px;">一站式设计服务解决方案</p>
      </div>
     &lt;!&ndash; <ul class="center">
        <li><a href="http://houxiaopang.com/help/">客户指南</a></li>
        <li><a href="http://houxiaopang.com/help/aboutus">关于猴小胖</a></li>
        <li><a href="http://houxiaopang.com/help/designer">设计师指南</a></li>
        <li><a href="http://houxiaopang.com/help/contact">联系我们</a></li>
        <li><a href="http://houxiaopang.com/help/faq">常见问题</a></li>
        <li><a href="http://houxiaopang.com/help/contact">意见反馈</a></li>
      </ul>&ndash;&gt;
      <div class="right">
        <p>@2017 杭州求否科技有限公司</p>
        <p>浙ICP备17006185号</p>
        <p><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602008608"><img
          style="margin-top: 5px;" src="http://image.houxiaopang.com/beian.png" alt=""><span
          style="color:#727272;vertical-align: top;">浙公网安备 33010602008608号</span></a></p>
      </div>
    </div>-->


    <p>浙ICP备17006185号<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602008608"><img
      style="vertical-align: -4px" src="http://image.houxiaopang.com/beian.png" alt=""><span
      style="color:#727272;">浙公网安备 33010602008608号</span></a><span style="float: right">©2017 杭州求否科技有限公司</span></p>
  </footer>
</template>
<style scoped>
  footer {
    display: block;
    padding: 10px 0;
    box-sizing: border-box;
    color: #727272;
    height: 50px;
    line-height: 50px;
    width: 1100px;
    margin: 0 auto;
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

  .con > .center > li > a {
    text-decoration: none;
    color: #313131;
  }

  .con > .center > li > a:hover {
    color: #d01667;
  }

  .con > .right {
    width: 400px;
    float: left;
    height: 100%;
  }

  li, a {
    text-decoration: none;
    list-style: none;
    color: #313131;
  }

  .right > p {
    text-align: center;
    height: 30px;
    line-height: 30px;
  }

  /*footer .footer-links, footer .products-links {
    clear: both;
    border-top: 1px solid rgba(101, 105, 115, 0.3)
  }

  footer .footer-links ul, footer .products-links ul {
    *zoom: 1;
    padding-left: 40px;
    margin: 16px 0;
  }

  footer .footer-links ul:before, footer .products-links ul:before, footer .footer-links ul:after, footer .products-links ul:after {
    display: table;
    content: ""
  }

  footer .footer-links ul:after, footer .products-links ul:after {
    clear: both
  }

  footer .footer-links li, footer .products-links li {
    float: left;
    margin: 0 39px 0 0;
    font-size: 14px
  }

  footer .footer-links li a, footer .products-links li a {
    color: #a6a7aa
  }*/
</style>
