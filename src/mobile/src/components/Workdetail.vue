<template>
  <div>
    <div style="padding: 1.5rem 2rem;position:fixed;width: 100%;top: 0;bottom: 4rem;overflow: auto">
      <div class="worktitle" v-html="info.title"></div>
      <p class="type">项目介绍</p>
      <div class="workcontent">
        <div style="font-size: 1.6rem;line-height: 1.8rem;margin-bottom: 1rem;overflow-wrap: break-word"
             v-html="info.description"></div>
        <p style="line-height: 2.4rem;"><i class="iconfont" style="color: #d01667;font-size: 2.2rem;">&#xe615;</i><span
          class="left">工期:</span><span v-html="info.howlong"></span></p>
        <p style="line-height: 2.4rem;"><i class="iconfont" style="color: #d01667;">&#xe600;</i><span
          class="left">预算:</span><span v-html="info.howmuch"></span></p>
      </div>
      <p class="type">参考图片</p>
      <div class="workcontent">
        <div class="workimg">
          <div v-for="(item,index) in info.desc_img" @click="show(index)"
               style="width: 48%;height: 100px;margin-bottom: 1rem;border: 1px solid #e0e0e0;overflow: hidden">
            <img class="previewer-demo-img" width="100%" :src="item" alt="">
          </div>
        </div>
      </div>

      <div v-transfer-dom>
        <previewer :list="list" ref="previewer" :options="options"></previewer>
      </div>
    </div>
    <router-link tag="div" :to="{'path':'/Toast','query':{'id':id}}" class="btn">立即报价</router-link>
  </div>
</template>
<script>
  import {Previewer, TransferDom} from 'vux'
  export default{
    directives: {
      TransferDom
    },
    data(){
      return {
        info: {},
        id: null,
        list: [],
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
    components: {
      Previewer
    },
    created(){
      this.id = this.$route.params.id
      if (!this.id) {
        this.$router.push("/")
        return
      }
      var that = this;
      ajax({
        url: 'http://www.houxiaopang.com/api/v1.1/demanddetail',
        type: "get",
        data: {'demand_id': that.id},
        success: function (data) {
          if (data.code === 0) {
            that.info = data.data;
            for (var i = 0, size = that.info.desc_img.length; i < size; i++) {
              that.list.push({'src': that.info.desc_img[i]});
            }
          } else {
            alert("网络拥挤，请稍后再试···");
          }
        },
      });
    },
    methods: {
      show (index) {
        this.$refs.previewer.show(index);
      }
    }
  }
</script>
<style scoped>
  .worktitle {
    font-size: 2.4rem;
    color: #313131;
    text-align: center;
    border-bottom: 1px solid #bbb;
    line-height: 4rem;
  }

  .type {
    font-size: 1.8rem;
    color: #595959;
    border-left: 2px solid #d01667;
    padding-left: 1rem;
    margin: 1rem 1rem 1rem;
  }

  .workcontent {
    box-shadow: 1px 1px 3px #bbb;
    padding: 0.5rem 1rem;
  }

  span {
    color: #787878;
    font-size: 1.6rem;
  }

  .left {
    margin: 0 0.7rem
  }

  .workimg {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .btn {
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    right: 0;
    background: #d01667;
    color: #fff;
    font-size: 2rem;
    line-height: 4rem;

  }
</style>
