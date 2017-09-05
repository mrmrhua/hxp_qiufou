<template>
  <div class="nav">
    <div class="logo" onclick="javascript:location.href='http://houxiaopang.com';"></div>
    <ul class="navinfo">
      <li onclick="javascript:location.href='http://houxiaopang.com';">首页</li>
      <!--<router-link class="active" to="/" tag="li">发单广场</router-link>-->
      <li onclick="javascript:location.href='http://houxiaopang.com/workdetail';">作品精选</li>
    </ul>
    <ul class="userInfo">
      <!--通知功能-->
      <li @click.stop="shownoticeMethod" class="msg" style="position: relative">
        <i class="iconfontyyy" style="font-size: 24px;color:#545a5f;">&#xe71f;</i>
        <span class="noticenum" v-html="noticenum" v-show="noticenum > 0"></span>
        <!--<ul v-show="shownotice">
          <router-link v-show="notice.length > 0" tag="li" to="/Msg"
                       style="min-height: 80px;max-height: 240px;overflow-x: hidden;overflow-y: auto">
            <div v-for="item in notice" style="height: 80px;padding: 10px 15px 0;border-bottom: 1px solid #eceaea;">
              <p v-html="item.title"></p>
              &lt;!&ndash;<p v-html="settime(item.up_time)"
                 style="height: auto;font-size: 12px;line-height: 20px;color: #bbb;"></p>&ndash;&gt;
            </div>
          </router-link>
          <li style="height: 80px;" v-show="notice.length == 0">
            <p style="text-align: center;height: 80px;line-height: 80px;padding: 0 0;">暂无未读消息</p>
          </li>
          <li style="height: 50px;padding: 0 0;bottom: 0;">
            <p style="line-height: 50px;height: 50px;text-align: center;padding-right: 20px;border-top: 1px solid #eceaea;">
              <router-link tag="span" to="/Msg" style="cursor:pointer;">查看全部</router-link>
            </p>
          </li>
        </ul>-->
      </li>
      <router-link tag="li" to="/newalbum">
        <i class="iconfontyyy" style="font-size: 25px;color:#545a5f;">&#xe68a;</i>
      </router-link>
      <li @click.stop="showoptionMethod">
        <img style="width: 40px;height: 40px;border-radius: 50%;display: block" :src="headimg" alt="">
        <ul class="useroption" v-show="show_option">
          <router-link tag="li" to="/">我的作品</router-link>
          <router-link tag="li" to="/designer">我的资料</router-link>
          <li @click="jump">我的简历</li>
          <li @click="exit">退出</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    props: ['show_option', 'shownotice'],
    data(){
      return {
        nickname: "",
        headimg: "",
        city: "",
        userid: -1,
        noticenum: 0,//用户消息数量
        notice: [],//通知列表
      }
    },
    watch: {
      '$route'(){
        this.getnoticenum();//获取消息条数
      }
    },
    mounted(){
      if (this.noticenum === 0) {
        this.getMsg();
      }
    },
    methods: {
      exit(){
        $.ajax({
          type: "post",
          headers: {"Authorization": "Token " + token},
          url: "http://houxiaopang.com/api/v1.1/logout",
          success(data){

          },
        });
        window.localStorage.token = "";
        window.localStorage.applystatus = "";
        window.localStorage.houxiaiopanguser = "";
        location.href = "http://houxiaopang.com";

      },
      jump(){
        open("http://houxiaopang.com/workdetail/#/user/" + this.userid);
      },
      showoptionMethod(){
        this.$emit("showoption");
      },
      shownoticeMethod(){
        this.$emit("shownotice");
        this.$nextTick(function () {
          if (this.noticenum > 0) {
            var that = this;
            $.ajax({
              url: 'http://houxiaopang.com/api/v1.1/designerdash/notice/clearall',
              type: "POST",
              headers: {"Authorization": "Token " + token},
              success(data) {
                if (data.code === 0) {
                  that.noticenum = 0;
                  that.$router.push("/Msg");
                }
              },
            });
          } else {
            this.$router.push("/Msg");
          }

        });
      },
      settime(value){
        return getDateDiff(getDateTimeStamp(value));
      },
      getMsg(){
        //获取通知列表
        //this.notice.push();
        var that = this;
        $.ajax({
          url: 'http://houxiaopang.com/api/v1.1/designerdash/notice/recent',
          type: "GET",
          headers: {"Authorization": "Token " + token},
          success(data) {
            that.notice = [];
            if (data.code === 0) {
              for (var i = 0, size = data.data.notice.length; i < size; i++) {
                that.notice.push(data.data.notice[i]);
              }
            }
          },
        });
      },
      getnoticenum(){
        var that = this;
        $.ajax({
          url: 'http://houxiaopang.com/api/v1.1/designerdash/notice/unreadnum',
          type: "GET",
          headers: {"Authorization": "Token " + token},
          success(data) {
            if (data.code === 0) {
              that.noticenum = data.data.num;
              if (that.noticenum > 0) {
                that.getMsg();
              }
            }
          },
        });
      },
    },
    created(){
      var that = this;
      if (token) {//token存在，验证token是否过期
        $.ajax({
          type: "get",
          url: "http://houxiaopang.com/api/v1.1/token/authenticated",
          headers: {"Authorization": "Token " + token},
          success(data){
            if (data.code === 0) {
              login = true;
              window.localStorage.applystatus = data.data.applystatus;
              $.ajax({
                url: 'http://houxiaopang.com/api/v1.1/designerdash/header',
                type: "GET",
                headers: {"Authorization": "Token " + token},
                success(data) {
                  if (data.code === 0) {
                    that.nickname = data.data.nickname;
                    that.headimg = data.data.headimg;
                    that.city = data.data.city;
                    that.userid = data.data.userid;
                    that.$emit('userinfo', {
                      'nickname': that.nickname,
                      'headimg': that.headimg,
                      'city': that.city,
                    });
                    window.localStorage.houxiaiopanguser = JSON.stringify(data.data);
                  }
                },
              });
            }
          },
          error(){
            location.href = "http://houxiaopang.com/qrlogin";
          }
        });
      }
    }
  }
</script>
<style scoped>
  .nav {
    height: 90px;
    line-height: 40px;
    padding: 20px 0;
    font-size: 20px;
    width: 1100px;
    margin: 0 auto;
  }

  .active {
    border-bottom: 2px solid #d01167;
  }

  .useroption {
    width: 110px;
    left: 63px;
    top: 54px;
    z-index: 1;
    font-size: 14px;
    position: absolute;
    background: rgb(255, 255, 255);
    box-shadow: 1px 1px 5px 1px #d6d6d6;
  }

  .useroption > li:last-child {
    border-top: 1px solid #e0e0e0;
  }

  .useroption > li {
    padding: 0 15px;
    line-height: 40px;
    height: 40px;
  }

  .useroption > li:hover {
    background: #e0e0e0;
  }

  .nav > .logo {
    background: url('http://image.houxiaopang.com/demand/logodown.png') no-repeat;
    background-size: cover;
    width: 173px;
    height: 54px;
    text-align: right;
    float: left;
    cursor: pointer;
  }

  .nav > ul {
    float: left;
    padding: 0 10%;
    line-height: 50px;
    list-style: none;
    z-index: 1;
  }

  .nav > ul > li {
    float: left;
    cursor: pointer;
    margin-right: 25px;
  }

  .nav > .navinfo > li:hover {
    border-bottom: 2px solid #d01667;
  }

  ul.userInfo {
    cursor: pointer;
    position: relative;
    float: right;
    line-height: 50px;
    height: 50px;
    padding: 0 0;
  }

  ul.userInfo > li:hover > i {
    color: #d01667 !important;
  }

  ul.userInfo > li {
    height: 50px;
  }

  .noticenum {
    display: block;
    background: #f00;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 8px;
    right: -1px;
    line-height: 16px;
    font-size: 12px;
    border-radius: 50%;
    color: #fff;
    text-align: center;
  }

  .msg {
    font-size: 14px;
  }

  .msg > ul {
    width: 300px;
    position: absolute;
    left: -236px;
    background: rgb(255, 255, 255);
    box-shadow: 1px 1px 5px 1px #d6d6d6
  }

  .msg > ul > li > div > p:nth-of-type(1) {
    overflow: hidden;
    text-overflow: ellipsis;
    height: 40px;
    line-height: 20px;
    color: #313131;
    width: 100%;
  }

  .msg > ul > li > div:hover {
    background: #f5f5f5;
    cursor: pointer;
  }

  .msg > ul > li > p > span:hover {
    color: #d01667;
  }

  .msg > ul > li {
    text-align: left;
    cursor: default;
  }

  .router-link-exact-active {
    border-left: none !important;
  }
</style>
