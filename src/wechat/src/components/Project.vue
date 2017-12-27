<template id="project">
  <div class="project">
    <div class="project_list">
      <ul>
        <router-link :to="{name:'detail',params:{id:item.id}}" tag="li" :key="index"
                     v-for="(item,index) in projectlist">
          <div class="dir">
            <div v-if="item.lastimg" style="width:100%;height: 100%;overflow: hidden">
              <img class="img" width="240" :src="item.lastimg"/>
            </div>
            <div v-if="!item.lastimg" style="width:100%;height: 100%;border: 1px dashed #d9d9d9;">
              <p style="margin-top:80px;text-align: center;color: #787878;">点击添加设计进度图</p>
            </div>
          </div>
          <p :title="getName(item.cat)" v-html="getName(item.cat)"></p>
          <p>客户名称：{{item.client}}</p>
          <p style="text-align: right;color: #999;">{{item.up_time}}</p>
        </router-link>
      </ul>
      <div v-show="projectlist.length === 0" style="text-align: center">
        <i class="iconfontyyy" style="font-size:200px;color: #bfbfbf;">&#xe617;</i>
        <p style="font-size: 16px;color: #bfbfbf;font-weight: 900;">你还没有创建过任何项目</p>
      </div>
    </div>
    <div class="mymodal" v-show="delmodel">
      <div class="conte">
        <div style="background: #bbb;height: 30px;line-height: 30px;padding: 0 15px;">
          <span style="color: #fff;">删除提醒</span><span
          style="float: right;cursor: pointer"
          @click="delmodel=false"><i class="iconfontyyy">&#xe67c;</i></span>
        </div>
        <div style="position: relative">
          <i class="iconfontyyy" style="display: inline-block;font-size: 90px;margin-left: 10px;margin-top: 5px;">&#xe691;</i>
          <p style="position: absolute;top: 20px;left: 110px;font-size: 18px;">确定删除此图片作品？</p>
          <div style="height: 30px;line-height: 30px;position: absolute;top: 65px;left: 150px;">
            <span
              style="display: inline-block;background: #d01667;padding: 0 15px;color: #fff;cursor: pointer;">确定</span>
            <span @click="delmodel=false" style="display: inline-block;padding: 0 15px;cursor: pointer;">取消</span>
          </div>
        </div>
      </div>
    </div>
    <prompt :prompt="prompt" :promptshow="promptshow"></prompt>
  </div>
</template>
<script>
  import prompt from "@/components/Prompt"
  export default{
    props: ['showcategory'],
    data(){
      return {
        projectlist: [],
        delmodel: false,
        removeid: -1,
        removeindex: -1,
        promptshow: false,
        prompt: {
          type: "success",
          text: "成功"
        }
      }
    },
    created(){
      this.getprojectlist();
    },
    methods: {

      getName(value){
        return getCatname(value)
      },
      getprojectlist(){
        var that = this
        $.ajax({
          url: "https://m.houxiaopang.com/wxapi/v1.1/projectlist",
          type: "GET",
          headers: {"Authorization": "Token " + token},
          success(data) {
            if (data.code === 0) {
              that.projectlist = data.data.project;
            }
          },
          error(){
            alert("网络拥挤，请稍后再试···");
          }
        });
      }
    },
    components: {
      prompt
    }
  }
</script>
<style scoped>
  .pinglei_ul > li {
    line-height: 35px;
    padding-left: 35px;
  }

  .pinglei_ul > li > span {
    cursor: pointer;
  }

  .pinglei_ul > li > span:hover {
    color: #d01667;
  }

  .project {
    width: 100%;
    min-height: 400px;
  }

  .project_list {
    width: 100%;
  }

  .project_list > ul {
    overflow: hidden;
    box-sizing: border-box;
    list-style: none;
    width: 800px;
  }

  .project_list > ul > li {
    width: 240px;
    float: left;
    box-sizing: border-box;
    margin-right: 30px;
    margin-bottom: 45px;
    cursor: pointer;
    background: #ffffff;
    padding-bottom: 10px;
    margin-left: 3px;
    position: relative;
    border: 1px solid #d9d9d9;
    overflow: hidden;
    border-radius: 5px;
  }

  .project_list .img {
    width: 100%;
    display: block;
    box-sizing: border-box;
    overflow: hidden;
  }

  .dir {
    padding: 15px 15px;
    width: 100%;
    height: 180px;
    display: block;
    box-sizing: border-box;
    overflow: hidden;
  }

  .project_list > ul > li:nth-child(3n) {
    margin-right: 3px;
  }

  .project_list > ul > li > p {
    padding: 0 15px;
  }

  .project_list > ul > li > p:nth-of-type(1) {
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    box-sizing: border-box;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mymodal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mymodal > .conte {
    width: 350px;
    height: 140px;
    overflow: hidden;
    background: #FFF;
    border-radius: 5px;
    padding: 0 0;
  }
</style>
