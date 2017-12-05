<template>
  <div>
    <div style="padding:0 15px;position:fixed;width: 100%;top: 0;bottom: 4rem;overflow: auto">
      <div class="worktitle" v-html="info.title"></div>
      <p class="type">项目介绍</p>
      <div class="workcontent">
        <div
          style="padding-bottom:10px;border-bottom:1px solid #dedede;color: #262626;font-size: 1.2rem;line-height: 1.8rem;margin-bottom: 1rem;overflow-wrap: break-word"
          v-html="info.description+'都很少看见啊哈的空间撒谎都快就撒谎就肯定撒电话手机卡号的空间撒谎框架的哈萨克几号的空间撒都很少看见啊哈的看接受到'"></div>
        <p style="margin-top: 10px;"><span class="left">工期:</span><span v-html="info.howlong"></span></p>
        <p style="margin: 10px 0;"><span class="left">预算:</span><span v-html="info.howmuch"></span></p>
      </div>
      <p v-show="info.desc_img.length > 0" class="type">参考图片</p>
      <div class="workcontent" style="border: none" v-show="info.desc_img.length > 0">
        <div class="workimg">
          <div v-for="(item,index) in info.desc_img" @click="show(index)"
               style="width: 48%;height: 100px;margin-bottom: 1rem;border: 1px solid #e0e0e0;overflow: hidden">
            <img class="previewer-demo-img" width="100%" :src="item+'?imageView2/1/w/200/h/200'" alt="">
          </div>
        </div>
      </div>
      <div v-transfer-dom>
        <previewer :list="list" ref="previewer" :options="options"></previewer>
      </div>
    </div>
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
        info: {
          desc_img: []
        },
        id: this.$route.params.id,
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
    font-size: 1.8rem;
    color: #333;
    text-align: center;
    border-bottom: 1px solid #DEDEDE;
    padding: 18px 0;
    font-weight: 600;
  }

  .type {
    font-size: 1.4rem;
    color: #333;
    padding: 10px 0;
    font-weight: 600;
  }

  .workcontent {
    border-bottom: 1px solid #dedede;
  }

  span {
    color: #262626;
    font-size: 1.4rem;
    margin-left: 10px;
  }

  .left {
    margin: 0 0;
    font-size: 14px;
    font-weight: 600;
    color: #333;
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
