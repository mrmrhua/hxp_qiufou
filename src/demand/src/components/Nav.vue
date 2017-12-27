<template>
  <div class="nav">
    <div class="logo" onclick="javascript:location.href='http://houxiaopang.com';"></div>
    <ul class="navinfo">
      <li onclick="javascript:location.href='http://houxiaopang.com';">首页</li>
      <!--<router-link class="active" to="/" tag="li">发单广场</router-link>-->
      <li onclick="javascript:location.href='http://houxiaopang.com/workdetail';">作品精选</li>
    </ul>
    <div id="desinger" v-show="!login" class="desinger"
         onclick="javascript:location.href='http://houxiaopang.com/qrlogin';">
      <p>我是设计师</p>
    </div>
    <ul v-show="login" class="userInfo">
      <!--通知功能-->
      <li @click.stop="shownoticeMethod" class="msg" style="position: relative">
        <i class="iconfont" style="font-size: 24px;color:#545a5f;">&#xe71f;</i>
        <span class="noticenum" v-html="noticenum" v-show="noticenum > 0"></span>
        <!--<ul v-show="shownotice">
            <router-link v-show="notice.length > 0" tag="li" to="/Msg"
                         style="min-height: 80px;max-height: 240px;overflow-x: hidden;overflow-y: auto">
              <div v-for="item in notice" style="height: 80px;padding: 10px 15px 0;border-bottom: 1px solid #eceaea;">
                <p v-html="item.title"></p>
                <p v-html="settime(item.up_time)"
                   style="height: auto;font-size: 12px;line-height: 20px;color: #bbb;"></p>
              </div>
            </router-link>
            <li style="height: 80px;" v-show="notice.length == 0">
              <p style="text-align: center;height: 80px;line-height: 80px;padding: 0 0;">暂无未读消息</p>
            </li>
            <li style="height: 35px;padding: 0 0;bottom: 0;">
              <p
                style="line-height: 35px;height: 35px;text-align: right;padding-right: 20px;">
                <router-link tag="span" to="/Msg"
                             style="cursor:pointer;">查看更多
                </router-link>
              </p>
            </li>
          </ul>
        </li>-->
      <li onclick="javascript:location.href = 'http://houxiaopang.com/admin/#/newalbum';">
        <i class="iconfont" style="font-size: 25px;color:#545a5f;">&#xe68a;</i>
      </li>
      <li @click.stop="showoptionMethod">
        <img style="width: 40px;height: 40px;border-radius: 50%;display: block" :src="headimg" alt="">
        <ul class="useroption" v-show="show_option">
          <li onclick="javascript:location.href = 'http://houxiaopang.com/admin';">我的作品</li>
          <li onclick="javascript:location.href = 'http://houxiaopang.com/admin/#/designer';">我的资料</li>
          <li @click="jump">我的简历</li>
          <li @click="exit">退出</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  /*
  * 与个人中心一样
  * 注意：发单广场 有下划线
  *
  * */

  function getDateTimeStamp(dateStr) {
    return Date.parse(dateStr.replace(/-/gi, "/"));
  }
  function getDateDiff(dateTimeStamp) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    var result = "刚刚";
    if (monthC >= 1) {
      result = parseInt(monthC) + "个月前";
    } else if (weekC >= 1) {
      result = parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
      result = parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
      result = parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
      result = parseInt(minC) + "分钟前";
    }
    return result;
  }
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
        login: false,
      }
    },
    watch: {
      '$route'(){
        if (login) {
          this.getnoticenum();//获取消息条数
        }
      }
    },
    mounted(){
      if (login) {
        if (this.noticenum === 0) {
          this.getMsg();
        }
      }
    },
    methods: {
      exit(){
        $.ajax({
          type: "post",
          headers: {"Authorization": "Token " + token},
          url: "http://www.houxiaopang.com/api/v1.1/logout",
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
              url: 'http://www.houxiaopang.com/api/v1.1/designerdash/notice/clearall',
              type: "POST",
              headers: {"Authorization": "Token " + token},
              success(data) {
                if (data.code === 0) {
                  that.noticenum = 0;
                  location.href = "http://houxiaopang.com/admin/#/Msg"
                }
              },
            });
          } else {
            location.href = "http://houxiaopang.com/admin/#/Msg"
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
          url: 'http://www.houxiaopang.com/api/v1.1/designerdash/notice/recent',
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
          url: 'http://www.houxiaopang.com/api/v1.1/designerdash/notice/unreadnum',
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
          url: "http://www.houxiaopang.com/api/v1.1/token/authenticated",
          headers: {"Authorization": "Token " + token},
          success(data){
            if (data.code === 0) {
              login = true;
              that.login = true;
              window.localStorage.applystatus = data.data.applystatus;
              $.ajax({
                url: 'http://www.houxiaopang.com/api/v1.1/designerdash/header',
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
                    window.localStorage.verify = data.data.verify_status;
                    window.localStorage.houxiaiopanguser = JSON.stringify(data.data);
                  }
                },
              });
            }
          },
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
  ul{
    list-style: none;
  }
  .useroption {
    width: 110px;
    right: 0;
    top: 54px;
    z-index: 1024;
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
    width: 400px;
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

  .desinger {
    display: table;
    width: 150px;
    font-size: 16px;
    height: 40px;
    border: 1px solid #d01667;
    border-radius: 30px;
    float: right;
    text-align: center;
    cursor: pointer;
    position: relative;
    margin-top: 5px;
  }

  .desinger:hover {
    background: linear-gradient(to right, #d01667, #fe6549);
    color: #fff;
    border: none;
  }

</style>
