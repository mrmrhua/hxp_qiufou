<template>
  <div class="bloglist">
    <div class="blogbox" v-for="n in 10">
      <img src="" alt="">
      <div class="blog_content">
        <div class="blog_text">
          <h3>
            的萨克简单快乐洒进来看打架撒拉科技的了撒建档立卡时间啊第六课三角阿里多撒多撒多撒大</h3>
          <p>dsadsad大框架的电路设计阿里打开就洒了接单电路设计阿里看大家撒立刻决定啦来得及撒垃圾的了撒觉得累开始</p>
        </div>
        <div class="blog_footer"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .bloglist {
    width: 1000px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 40px;
  }

  .blogbox {
    width: 485px;
    height: 300px;
    float: left;
    margin-right: 30px;
    margin-bottom: 30px;
    opacity: 1;
    cursor: pointer;
    border:1px solid #bbb;
  }

  .blogbox:hover {
    opacity: 0.8;
  }

  .blogbox > img {
    display: block;
    float: left;
    width: 45%;
    height: 100%;
    background: #f0f0f0;
  }

  .blogbox:nth-of-type(2n) {
    margin-right: 0;
  }

  .blogbox > .blog_content {
    width: 55%;
    float: left;
    height: 100%;
    position: relative;
  }

  .blogbox > .blog_content > .blog_footer {
    position: absolute;
    bottom: 0;
    height: 70px;
    background: burlywood;
    width: 100%;
    padding: 0 20px;
  }

  .blogbox > .blog_content > .blog_text {
    position: absolute;
    bottom: 70px;
    width: 100%;
    top: 0;
    padding: 10px 20px 0;
  }

  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    width: 100%;
    font-size: 16px;
    line-height: 1.5;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    width: 100%;
    line-height: 1.5;
    color: #727272;
    margin-top: 10px;
  }
</style>
