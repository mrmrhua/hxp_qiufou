<template>
  <div>
    <div class="projectinfo">
      <p style="font-size: 20px;letter-spacing: 2px;">xxx设计项目的撒个电视剧啊</p>
      <router-link tag="p" :to="{'name':'projectdetail','params':demand_id}">查看详情</router-link>
    </div>
    <div style="background: #fff;padding: 5px 25px;">
      <p>猴小胖为您推荐以下 <span style="color: #d01667;">3</span> 位设计师</p>
    </div>
    <div v-for="n in 10" style="background: #f4f4f4;padding: 10px 15px 0">
      <div class="designer">
        <router-link tag="div" :to="{'path':'/user','query':{'id':29}}" class="designerInfo">
          <div style="width: 50px;height: 50px;margin-right: 15px;flex-shrink: 0;">
            <img class="headimg">
          </div>
          <div style="width: 100%;flex-shrink: 1;display: flex;justify-content: space-between;flex-direction: column;">
            <p style="font-size: 16px;">猴小胖</p>
            <p class="labelstylewarp">
              <span class="labelstyle">扁平</span><span class="labelstyle">简洁</span>
              <span class="labelstyle">扁平</span><span class="labelstyle">简洁</span>
            </p>
          </div>
        </router-link>
        <div class="description">
          <div style="font-size: 14px;width: 70px;flex-shrink: 0;">个人简介</div>
          <div style="width: 100%;flex-shrink: 1;font-size: 12px;">
            喜欢有挑战性的项目，专注于互联网产品，追求极致的设计和用户体验，帮助更多的人把想法变成现实。
            <br>- 拥有五年视觉/交互设计的丰富经验，包括Web端、移动端及后台系统的设计
            <br>- 曾就职于百度、腾讯等公司，主导及参与过十几个项目的设计过程，积累了丰富的实践经验
            <br>- 北京邮电大学，工业设计毕业
            <br>- 德国红点设计奖获得者
          </div>
        </div>
        <div style="padding: 5px 0">
          <p>作品案例</p>
          <div class="designerWork">
            <router-link tag="div" :to="{'path':'/album','query':{'album_id':58,'user_id':30}}" style="width: 33%">
              <x-img src="../../static/Desert.jpg" alt="" :offset="50"></x-img>
            </router-link>
            <router-link tag="div" :to="{'path':'/album','query':{'album_id':58,'user_id':30}}" style="width: 33%">
              <x-img src="../../static/Chrysanthemum.jpg" alt="" :offset="50"></x-img>
            </router-link>
            <router-link tag="div" :to="{'path':'/album','query':{'album_id':58,'user_id':30}}" style="width: 33%">
              <x-img src="../../static/Koala.jpg" alt="" :offset="50"></x-img>
            </router-link>
          </div>
        </div>
        <div class="workDesc">
          <p>工期：两周</p>
          <p style="text-align: center;color: #FF445B;">￥2000</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {XImg} from 'vux'
  export default{
    components: {
      XImg
    }
  }
</script>
<style scoped>
  .projectinfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
    min-height: 100px;
    background: #FF445B;
    color: #fff;
  }

  .projectinfo > p:nth-of-type(2) {
    border-radius: 5px;
    padding: 4px 5px;
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
    height: 36px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
  }

  .designer {
    padding: 15px 15px;
    background: #fff;
  }

  .designer > .designerInfo {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    border-bottom: 1px solid #d9d9d9;
    min-height: 62px;
  }

  .designer > .designerInfo .headimg {
    border-radius: 50%;
    display: block;
    width: 100%;
    height: 100%;
    background: chartreuse;
  }

  .designer .designerWork {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
    border-bottom: 1px solid #d9d9d9;
  }

  .designer .designerWork img {
    width: 100%;
  }

  .designer .workDesc {
    padding: 15px 0 0 0;
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
  }

  .description {
    display: flex;
    padding: 5px 0;
    border-bottom: 1px solid #d9d9d9;
  }

  .labelstylewarp {
    width: 100%;
    display: flex;
    flex-flow: wrap;
    margin-top: 10px;
  }
  .labelstyle {
    font-size: 12px;
    padding: 1px 12px;
    display: flex;
    align-items: center;
    border: 1px solid #C8DBFF;
    border-radius: 100px;
    color: #2570FF;
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>
