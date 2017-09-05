<template>
  <div class="chooselist">
    <p class="titlep">请问你需要的PPT服务是？</p>
    <div @click="chooseTypeMethod('PPT模板制作')" class="chooseitem">
      <img width="100%" src="../../static/bg.png" alt="">
      <div class="context">
        <p>PPT模板制作</p>
        <ul>
          <li><span>演示内容梳理</span></li>
          <li><span>演示排版设计</span></li>
          <li><span>演示背景设计</span></li>
        </ul>
        <p>适用于：已有完整的文稿内容</p>
      </div>
    </div>
    <div @click="chooseTypeMethod('PPT全案制作')" class="chooseitem">
      <img width="100%" src="../../static/bg.png" alt="">
      <div class="context">
        <p>PPT全案制作</p>
        <ul>
          <li><span>品牌形象分析</span></li>
          <li><span>文案深度定制</span></li>
          <li><span>排版背景设计</span></li>
        </ul>
        <p>适用于：客户只提供企业材料，设计师辅助进行文案填写、PPT制作</p>
      </div>
    </div>
    <div @click="chooseTypeMethod('PPT美化')" class="chooseitem">
      <img width="100%" src="../../static/bg.png" alt="">
      <div class="context">
        <p>PPT美化</p>
        <ul>
          <li><span>静态内容美化设计</span></li>
          <li><span>内容排版美化设计</span></li>
          <li><span>演示背景美化设计</span></li>
        </ul>
        <p>适用于：客户已有编排好的PPT，需要设计师进一步美化</p>
      </div>


    </div>
  </div>
</template>
<script>
  export default{
    methods: {
      chooseTypeMethod(value){
        pptType = value;
        this.$router.push("/ChooseType");
      }
    }
  }
</script>
<style scoped>
  .chooselist {
    background: #f5f5f5;
    height: 100%;
  }

  .chooselist > .titlep {
    font-size: 1.6rem;
    text-align: center;
    padding: 1.4rem 0;
  }

  .chooselist > .chooseitem {
    width: 100%;
    position: relative;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
  }

  .chooseitem > img {
    width: 100%;
    display: block;
  }

  .chooseitem > .context {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
  }

  .chooseitem > .context > p:nth-of-type(1) {
    font-size: 1.6rem;
    text-align: center;
    color: #d01667;
    flex-grow: 1;
    align-items: center;
  }

  .chooseitem > .context > p:nth-of-type(2) {
    text-align: center;
    color: #727272;
    flex-grow: 1;
    align-items: center;
    font-size: 1.2rem;
  }

  .chooseitem > .context > ul {
    list-style: disc inside none;
    text-align: center;
    color: #d01667;
    flex-grow: 1;
  }

  .chooseitem > .context > ul > li > span {
    color: #313131;
    margin-left: -0.8rem;
  }
</style>
