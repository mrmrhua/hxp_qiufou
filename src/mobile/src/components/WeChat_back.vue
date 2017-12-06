<template>
  <div>
    <div class="img_head">
      <img class="info_bg" src="http://image.houxiaopang.com/workdetail/bg.png?imageView2/2/w/375">
      <div class="fg"></div>
    </div>
    <div class="userinfo">
      <div class="head_div"><img :src="userinfo.headimg"></div>
      <p v-html="userinfo.nickname"></p>
      <p><i></i><span v-html="userinfo.city"></span>|<span v-html="setexp(userinfo.exp)"></span></p>
      <!--擅长-->
      <div class="sc">
        <span>擅长领域：</span>
        <ul>
          <li v-for="item in userinfo.filed" v-html="item"></li>
        </ul>
      </div>
      <div class="worktime"><span>可工作时间：</span>
        <ul>
          <li v-for="item in userinfo.worktime" v-html="formatWorktime(item)"></li>
        </ul>
      </div>
      <!--项目经历-->
      <div class="projectexp" v-show="userinfo.project_text.length > 0">
        <span>项目经历：</span>
        <ul id="project_text">
          <li v-for="item in userinfo.project_text">
            <p style="font-weight: 600;" v-html="item.title"></p>
            <p style="margin-bottom: 40px;" v-html="item.desc"></p>
          </li>
        </ul>
      </div>
      <div v-show="userinfo.project_text.length > 0" @click="showmore" class="more"><i
        class="iconfont">&#xe8f8;</i><span>展开</span></div>
    </div>

    <group>
      <cell title="品类" :value="category" is-link @click.native="oncatechick"></cell>
    </group>
    <div v-transfer-dom>
      <popup v-model="showcategory" class="checker-popup">
        <div style="padding:10px 10px 20px 10px;">
          <p style="padding: 5px 5px 5px 2px;color:#888;">品类选择</p>
          <checker style="margin-top: 10px;"
                   v-model="category"
                   default-item-class="category-item"
                   selected-item-class="category-item-selected"
                   disabled-item-class="category-item-disabled">
            <checker-item value="全部" @on-item-click="onItemClick">全部</checker-item>
            <checker-item value="PPT定制" @on-item-click="onItemClick">PPT定制</checker-item>
            <checker-item value="UI设计" @on-item-click="onItemClick">UI设计</checker-item>
            <checker-item value="企业画册" @on-item-click="onItemClick">企业画册</checker-item>
            <checker-item value="海报展板" @on-item-click="onItemClick">海报展板</checker-item>
            <checker-item value="LOGO" @on-item-click="onItemClick">LOGO</checker-item>
            <checker-item value="企业形象设计VI" @on-item-click="onItemClick">企业形象设计VI</checker-item>
          </checker>
        </div>
      </popup>
    </div>
    <div v-for="item in albums">
      <router-link tag="div" :to="{'path':'/album','query':{'album_id':item.work_id,'user_id':userid}}"
                   class="worklist">
        <div class="left">
          <x-img :src="item.cover+'?imageView2/2/w/375'" style="width: 100%;display: block" :offset="50"></x-img>
        </div>
        <div class="right">
          <p style="line-height: 2;font-weight: 600" v-html="item.title"></p>
          <p class="albumdesc" v-html="item.desc"></p>
        </div>
        <p class="category-item" v-html="item.category"
           style="display: inline-block;padding: 3px 12px;position: absolute;bottom: 5%;left: 42%;"></p>
      </router-link>
      <div style="width: 200%;height: 1px;background: #d9d9d9;transform-origin: 0 0;transform:scale(0.5);"></div>
    </div>
  </div>
</template>
<script>
  import {XImg, Checker, CheckerItem, Group, Cell, Popup, TransferDom} from 'vux'
  export default{
    data(){
      return {
        userinfo: {
          project_text: []
        },
        albums: [],
        userid: null,
        category: '全部',
        showcategory: false,
        page: 1,
      }
    },
    directives: {
      TransferDom
    },
    components: {
      Checker,
      CheckerItem,
      Group,
      Cell,
      Popup,
      XImg
    },
    created(){
      this.userid = this.$route.query.id
      if (this.userid) {
        this.getuserinfo(this.userid);
        this.getuserworks(this.userid, formatCategory(this.category, 0), this.page);
      } else {
        this.$router.push("/")
      }
    },
    watch: {
      'category'(){
        this.getuserworks(this.userid, formatCategory(this.category, 0), this.page);
      }
    },
    methods: {
      setexp(exp){
        var y = new Date().getFullYear();
        if (exp >= y) {
          return "学生"
        } else if (exp < y) {
          return (y - exp) + "年工作经验";
        } else {
          return "学生"
        }
      },
      getuserinfo(id){
        var that = this;
        ajax({
          type: "get",
          url: "http://www.houxiaopang.com/api/v1.1/resumeinfo",
          data: {
            'designer_id': id,
          },
          success(data){
            if (data.code === 0) {
              that.userinfo = data.data;
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          },
          error(){
            alert("网络拥挤，请稍后再试···");
          }
        });

      },
      getuserworks(id, c, page){
        var that = this;
        ajax({
          type: "get",
          url: "http://www.houxiaopang.com/api/v1.1/allwork",
          data: {
            'category': c,
            'designer_id': id,
            'page': page
          },
          success(data){
            if (data.code == 0) {
              that.albums = [];
              var json = data.data.album;
              for (var i = 0, size = json.length; i < size; i++) {
                json[i].category = formatCategory(json[i].category, 1);
                that.albums.push(json[i]);
              }
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          },
          error(){
            alert("网络拥挤，请稍后再试···");
          }
        });
      },
      formatWorktime(value){
        var worktime = "";
        if (value == "1") {
          worktime = "周一至周五白天";
        } else if (value == "2") {
          worktime = "周一至周五晚间";
        } else if (value == "3") {
          worktime = "周末";
        } else if (value == "4") {
          worktime = "可全职服务";
        } else if (value == "5") {
          worktime = "另议";
        }
        return worktime;
      },
      oncatechick(){
        this.showcategory = true;
      },
      onItemClick () {
        if (!this.disabled) {
          this.showcategory = false
        }
      },
      showmore(){
        this.more = !this.more;
        if (this.more) {
          document.getElementById("project_text").style.height = "auto";
          document.querySelector(".userinfo .more i").innerHTML = "&#xe8fa;";
          document.querySelector(".userinfo .more span").innerHTML = "收起";
        } else {
          document.getElementById("project_text").style.height = "60px";
          document.querySelector(".userinfo .more i").innerHTML = "&#xe8f8;";
          document.querySelector(".userinfo .more span").innerHTML = "展开";
          window.scrollTo(0, 0);
        }
      },
    }
  }
</script>
<style scoped>
  .img_head {
    position: relative;
  }

  .img_head > img {
    width: 100%;
    display: block;
  }

  .img_head > .fg {
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
  }

  .userinfo {
    z-index: 10;
    box-sizing: border-box;
    color: #727272;
    line-height: 40px;
    padding: 15px 0;
    width: 80%;
    margin: 0 auto;
    position: relative;
  }

  .userinfo > .head_div {
    margin: -50px auto 0 auto;
    width: 76px;
    height: 76px;
    background: #fff;
    border-radius: 50%;
  }

  .userinfo > .head_div > img {
    display: inline-block;
    width: 70px;
    height: 70px;
    margin-left: 3px;
    margin-top: 3px;
    border-radius: 50%;
  }

  .userinfo > p:nth-of-type(1) {
    font-size: 30px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #313131;
  }

  .userinfo > p:nth-of-type(2) {
    text-align: center;
    color: #999;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    position: relative;
  }

  .userinfo > p:nth-of-type(2) > span:nth-child(2) {
    padding-right: 15px;
    padding-left: 20px;
  }

  .userinfo > p:nth-of-type(2) > span:nth-child(3) {
    padding-left: 15px;
  }

  .userinfo > p > i {
    background: url('http://image.houxiaopang.com/workdetail/dingwei.png') no-repeat;
    display: inline-block;
    width: 12px;
    height: 16px;
    background-size: cover;
    position: absolute;
    top: 6px;
  }

  .userinfo > .sc {
    overflow: hidden;
    margin-top: 20px;
  }

  .userinfo > .sc > span, .userinfo > .worktime > span, .userinfo > .projectexp > span {
    display: block;
    float: left;
    width: 40%;
    vertical-align: top;
    text-align: right;
  }

  .userinfo > .sc > ul, .userinfo > .worktime > ul, .userinfo > .projectexp > ul {
    width: 60%;
    overflow: hidden;
    margin-top: 10px;
    text-align: left;

  }

  .userinfo > .sc > ul > li {
    float: left;
    padding: 0 18px;
    border-radius: 25px;
    text-align: center;
    height: 22px;
    line-height: 22px;
    margin-left: 10px;
    margin-bottom: 10px;
    background: #eee;
    color: #828282;
  }

  .userinfo > .worktime {
    overflow: hidden;
  }

  .userinfo > .worktime > ul {
    color: #313131;
    padding-left: 10px;
  }

  .userinfo > .worktime > ul > li {
    line-height: 20px;
  }

  .userinfo > .projectexp {
    overflow: hidden;
  }

  .userinfo > .projectexp > ul {
    overflow: hidden;
    padding-left: 10px;
    height: 60px;
    min-height: 60px;
  }

  .userinfo > .projectexp > ul > li {
    line-height: 20px;
  }

  .userinfo > .more {
    width: 60px;
    margin: 0 auto;
    color: #c0bebe;
    cursor: pointer;
  }

  .userinfo > .more > span {
    padding-left: 5px;
    font-size: 1.4rem;
  }

  #project_text > li:last-child > p:last-child {
    margin-bottom: 0 !important;
  }

  .category-item {
    background-color: #ddd;
    color: #222;
    font-size: 14px;
    padding: 6px 12px;
    margin-right: 10px;
    line-height: 14px;
    border-radius: 15px;
    margin-bottom: 10px;
    min-width: 50px;
    text-align: center;
  }

  .category-item-selected {
    background-color: #FF3B3B;
    color: #fff;
  }

  .category-item-disabled {
    color: #999;
  }

  .checker-popup {
    overflow: hidden;
  }

  .worklist {
    padding: 15px 10px;
    overflow: hidden;
    position: relative;
  }

  .worklist > .left {
    width: 40%;
    float: left
  }

  .worklist > .right {
    width: 60%;
    float: left;
    padding-left: 10px;
    position: relative;
  }

  .albumdesc {
    color: #313131;
    font-weight: normal;
    line-height: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
