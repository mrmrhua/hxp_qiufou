<template>
  <div class="warp">
    <div class="none" v-show="msginfo.length ===0">
      <img src="http://image.houxiaopang.com/wx/web/message@2x.png" style="margin-left: 19%;width: 45%;" alt="">
      <p style="margin-top: 7%;">暂时还没有消息哦~</p>
    </div>
    <div class="weui-cells">
      <router-link :key="index" tag="div" class="weui-cell" :to="{name:'msginfo',params:{idx:index}}"
                   v-for="(item,index) in msginfo">
        <div class="weui-cell__hd"><img src="http://image.houxiaopang.com/wx/web/Combined@2x.png" alt=""
                                        style="width:20px;;display:block"></div>
        <div class="weui-cell__bd">
          <p>{{item.title}}</p>
          <p v-html="item.content"></p>
        </div>
        <div class="weui-cell__ft" style="font-size: 12px;">{{item.up_time}}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        msginfo: []
      }
    },
    created(){
      this.getMsg();
    },
    methods: {
      getMsg(){
        var that = this
        showload("加载中···")
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/designerdash/notice/all",
          token: true,
          timeout: 5000,
          success(res){
            if (res.code === 0) {
              that.msginfo = res.data.notice
              window.localStorage.notice = JSON.stringify(res.data.notice)
              if (res.data.notice.length > 0) {
                that.clear()
              }
            }
            hideload()
          },
          error(){
            hideload()
            showModal("网络拥挤，请稍后再试。")
          }
        })
      },
      clear(){
        ajax({
          url: 'http://www.houxiaopang.com/api/v1.1/designerdash/notice/clearall',
          type: "POST",
          token: true,
          success(data) {

          },
        });
      }
    }
  }
</script>
<style scoped>
  .warp {
    height: 100%;
    position: relative;
    background: #f4f4f4;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .none {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #ed5fa0;
    padding-top: 25%;
  }

  .weui-cells {
    margin-top: 0;
  }

  .weui-cell {
    justify-content: space-between;
  }

  .weui-cell__hd {
    background: linear-gradient(to right, #fe6549, #d01667);
    border-radius: 50%;
    overflow: hidden;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .weui-cell__bd {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 50px;
  }

  .weui-cell__bd > p:nth-of-type(1) {
    font-size: 16px;
    color: #313131;
  }

  .weui-cell__bd > p:nth-of-type(2) {
    color: #999;
    font-size: 12px;
    width: 150px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
