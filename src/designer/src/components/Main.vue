<template>
  <div class="warp">
    <div class="userinfo">
      <img class='me' src='http://image.houxiaopang.com/wx/xcx/me.png'>
      <!-- <img src='../a/scanCode.png' class="scanCode">-->
      <div class="po">
        <div class='imgwarp'>
          <img class="userinfo-avatar" :src="userInfo.headimg">
        </div>
        <span class="userinfo-nickname">{{userInfo.nickname || "未填写"}}</span>
      </div>
    </div>
    <div class='demandlist'>
      <div class="weui-cells weui-cells_after-title" style="margin: 0 0">
        <div @touchend="next(index)" v-for="(item,index) in list" class="weui-cell weui-cell_access">
          <div class="weui-cell__bd">
            <img class='icon' :src="item.icon">
            {{item.name}}
            <span v-if="index===3&&num>0" class="msg">{{num}}</span>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>
      <!--<div class="weui-cells weui-cells_after-title" style='margin-top:10px;'>
        <div bindtap='needkonw' class="weui-cell weui-cell_access" hover-class="weui-cell_active" hover-stay-time='100'>
          <div class="weui-cell__bd" style='text-align:center'>用户须知</div>
        </div>
              <div bindtap='help' class="weui-cell weui-cell_access" hover-class="weui-cell_active" hover-stay-time='100'>
          <div class="weui-cell__bd" style='text-align:center'>使用教程</div>
        </div>
      </div>
  -->
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        userInfo: {},
        list: [
          {name: "我的资料", icon: "http://image.houxiaopang.com/wx/web/Group4.png"},
          {name: "我的作品", icon: "http://image.houxiaopang.com/wx/web/Group1.png"},
          {name: "我的项目", icon: "http://image.houxiaopang.com/wx/web/Group2.png"},
          {name: "我的消息", icon: "http://image.houxiaopang.com/wx/web/Group5.png"},
          {name: "我的钱包", icon: "http://image.houxiaopang.com/wx/web/Group6.png"},
          {name: "意见反馈", icon: "http://image.houxiaopang.com/wx/web/Group3.png"}
        ],
        num: 0
      }
    },
    created(){
	  if(login && window.localStorage.applystatus != "2"){
		this.$router.push("/alert")
		return
	  }
	  if(login){
		this.gethead();
		this.getMsg();
	  }
    },
    methods: {
      next(index){
        if (index === 0) {
          this.$router.push("/designerinfo")
        } else if (index === 1) {
          this.$router.push("/worklist")
        } else if (index === 2) {
          this.$router.push("/project")
        } else if (index === 3) {
          this.$router.push("/msg")
        } else if (index === 4) {
          this.$router.push("/balance")
        } else if (index === 5) {
          this.$router.push("/feedback")
        }
      },
      getMsg(){
        var that = this;
        ajax({
          url: 'https://www.houxiaopang.com/api/v1.1/designerdash/notice/unreadnum',
          token: true,
          success(res){
            if (res.code === 0) {
              that.num = res.data.num;
            }
          }
        })
      },
      gethead(){
        showload("加载中···")
        var that = this;
        ajax({
          token: true,
          url: "https://www.houxiaopang.com/api/v1.1/designerdash/header",
          success(res){
            if (res.code === 0) {
              that.userInfo = res.data;
              window.localStorage.userinfo = JSON.stringify(res.data);
            }
            hideload();
          },
          error(){
            hideload();
            showModal("网络拥挤，请稍后再试。")
          }
        })
      }
    }
  }
</script>
<style scoped>
  .warp {
    height: 100%;
    position: relative;
    background: #fff;
    overflow: hidden;
  }

  .msg {
    display: inline-block;
    width: 18px;
    height: 18px;
    background: #f00;
    color: #fff;
    border-radius: 50%;
    text-align: center;
    font-size: 12px;
  }

  .userinfo {
    flex-shrink: 0;
    box-sizing: border-box;
    position: relative;
  }

  .me {
    width: 100%;
    position: relative;
    display: block;
  }

  /* .scanCode {
     position: absolute;
     width: 25px;
     height: 25px;
     top: 15px;
     right: 15px;
   }*/

  .userinfo-avatar {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    display: block;
    background-size: cover;
  }

  .po {
    position: absolute;
    top: 0;
    z-index: 1024;
    bottom: 0;
    width: 100%;
    left: 0;
  }

  .imgwarp {
    background: #efa9ac;
    border-radius: 50%;
    z-index: 10;
    position: relative;
    width: 83px;
    height: 83px;
    margin: 10% auto 0;
    padding: 4px 4px;
  }

  .userinfo-nickname {
    color: #fff;
    font-size: 14px;
    z-index: 10;
    margin-top: 10px;
    text-align: center;
    display: block;
    width: 100%;
  }

  .demandlist {
    overflow-y: auto;
    flex-shrink: 1;
  }

  .icon {
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align: -7px;
    margin-right: 5px;
  }

  .weui-cell {
    border-bottom: 1px solid #d9d9d9;
  }

  .weui-cells:before {
    border: none;
  }
</style>
