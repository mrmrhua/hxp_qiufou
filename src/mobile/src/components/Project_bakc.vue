<template>
  <div>
    <div class="projectinfo">
      <p style="font-size: 2rem;color: #fff;" v-html="info.title"></p>
      <router-link :to="{'name':'projectdetail','params':demand_id}">查看详情</router-link>
    </div>
    <div style="background: #bbb;padding: 5px 25px;">
      <p>猴小胖为您推荐以下 <span style="color: #d01667;" v-html="designer.length"></span> 位设计师</p>
    </div>
    <div v-for="(item,index) in designer">
      <div class="designer">
        <div class="designerInfo">
          <div style="width: 3rem;height: 3rem;text-align: center;line-height: 3rem">
            <div class="headimg" v-html="index+1"></div>
          </div>
          <div style="width: 80%;padding-left: 15px;">
            <p style="font-weight: 600;line-height: 20px;" v-html="item.nickname"></p>
            <p style="color:#787878;width:100%;line-height: 20px;word-wrap:break-word;" v-html="item.ideas"></p>
          </div>
        </div>
        <div class="designerWork">
          <div style="width: 33%;overflow: hidden;" v-for="(lis,num) in item.worklist"
               @click="show(num,index)">
            <x-img class="previewer-demo-img" style="width: 100%;" :src="setimg(lis)" alt="" :offset="50"></x-img>
          </div>
          <div v-transfer-dom>
            <previewer :list="setworklist(item.worklist)" :ref="'previewer'+index" :options="options"></previewer>
          </div>
        </div>
        <div class="workDesc">
          <p>工期：<span v-html="item.howlong"></span></p>
          <p style="width: 20%;text-align: center;border-left: 1px solid #bbb;color: #d01667;">￥<span
            v-html="item.howmuch"></span></p>
        </div>
      </div>

      <div style="height: 10px;background: #bbb;"></div>
    </div>
  </div>
</template>
<script>
  import {XImg, Previewer, TransferDom} from 'vux'
  export default{
    directives: {
      TransferDom
    },
    components: {
      XImg,
      Previewer
    },
    data(){
      return {
        info: {},
        demand_id: null,
        designer: {},
        options: {
          getThumbBoundsFn (index) {
            var thumbnail = document.querySelectorAll('.previewer-demo-img')[index];
            var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
            var rect = thumbnail.getBoundingClientRect();
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }
      }
    },
    created(){
      this.demand_id = this.$route.params.id
      if (this.demand_id) {
        this.getdemandinfo(this.demand_id);
        this.getpricelist(this.demand_id);
      } else {
        this.$router.push("/")
      }
    },
    methods: {
      setworklist(value){
        var list = [];
        value.forEach(function (item) {
          list.push({'src': item});
        });
        return list;
      },
      getdemandinfo(id){
        var that = this;
        ajax({
          url: 'http://www.houxiaopang.com/api/v1.1/demanddetail',
          type: "get",
          data: {'demand_id': id},
          success: function (data) {
            if (data.code === 0) {
              that.info = data.data;
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          },
        });
      },
      setindex(){
        var ind = this.imgindex + 1;
        this.imgindex = ind;
        return ind;
      },
      show (num, index) {
        this.$refs['previewer' + index][0].show(num);
      },
      setimg(value){
        value += "?imageView2/1/w/400/h/300";
        return value;
      },
      getpricelist(id){
        var that = this;
        ajax({
          type: 'get',
          url: "http://www.houxiaopang.com/api/v1.1/adminsystem/pricelist_tmp",
          data: {
            'demand_id': id,
          },
          success(data){
            if (data.code === 0) {
              that.designer = data.data;
              /* that.designer.forEach(function (item) {
               item.worklist.forEach(function (imgs) {
               that.imglist.push({'src': imgs});
               });
               });*/
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          },
          error(){
            alert("网络拥挤，请稍后再试···");
          }
        });
      }
    }
  }

</script>
<style>
  .projectinfo {
    display: flex;
    flex-direction: column;
    padding: 15px;
    align-items: center;
    background: linear-gradient(-165deg, #EC8C69 0%, #ED5FA0 100%);
  }

  .projectinfo > a {
    border: 1px solid #fff;
    border-radius: 5px;
    padding: 4px 5px;
    color: #fff;
    align-self: flex-end;
    width: 25%;
    display: flex;
    justify-content: center;
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
    height: 100%;
    background: linear-gradient(-165deg, #EC8C69 0%, #ED5FA0 100%);
    color: #fff;
    font-size: 2rem;
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
