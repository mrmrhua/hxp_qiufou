<template>
  <div>
    <div class="projectinfo">
      <p style="font-size: 2rem;font-weight: 600;">xxx设计项目</p>
      <p>查看详情</p>
    </div>
    <div style="background: #bbb;padding: 5px 25px;">
      <p>猴小胖为您推荐以下 <span style="color: #d01667;">3</span> 位设计师</p>
    </div>
    <div v-for="n in 10">
      <div class="designer">
        <router-link tag="div" :to="{'path':'/user','query':{'id':29}}" class="designerInfo">
          <div style="width: 50px;height: 50px;">
            <img class="headimg" src="../../static/5146b04235709653.jpg">
          </div>
          <div style="width: 80%;padding-left: 15px;">
            <p style="font-weight: 600;line-height: 20px;">name</p>
            <p style="width:100%;line-height: 20px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden">
              description description description description description</p>
          </div>
        </router-link>
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
        <div class="workDesc">
          <p>本方案可参考天猫双十一的首页设计</p>
          <p style="width: 20%;text-align: center;border-left: 1px solid #bbb;color: #d01667;">￥2000</p>
        </div>
      </div>
      <div style="height: 10px;background: #bbb;"></div>
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
<style>
  .projectinfo {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 15px;
  }

  .projectinfo > p:nth-of-type(2) {
    border: 1px solid #d01667;
    border-radius: 5px;
    padding: 4px 5px;
    color: #d01667;
  }

  .designer {
    padding: 15px 15px;
  }

  .designer > .designerInfo {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    padding-bottom: 15px;
    border-bottom: 1px solid #d9d9d9;
  }

  .designer > .designerInfo .headimg {
    border-radius: 50%;
    display: block;
    width: 100%;
  }

  .designer > .designerWork {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
    border-bottom: 1px solid #d9d9d9;
  }

  .designer > .designerWork img {
    width: 100%;
  }

  .designer > .workDesc {
    padding: 15px 0 0 0;
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
  }
</style>
