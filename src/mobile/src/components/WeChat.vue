<template>
  <div style="background: #f4f4f4;">
    <div class="jl_top">
      <div class="head_div"><img :src="userinfo.headimg"></div>
      <div style="display: flex;flex-direction: column;justify-content: center;margin-left: 15px;">
        <div style="font-size: 16px;font-weight: 600;" v-html="userinfo.nickname"></div>
        <div style="display: flex;margin-top: 10px;">
          <div v-html="setcity(userinfo.city)"></div>
          <div style="margin-left: 10px;" v-html="setexp(userinfo.exp)"></div>
        </div>
      </div>
    </div>

    <div class="jl_info">
      <div v-show="userinfo.tags.length > 0" style="line-height: 20px;margin-bottom: 8px;">风格标签：</div>
      <div v-show="userinfo.tags.length > 0" style="display: flex;flex-wrap: wrap;">
        <div v-for="item in userinfo.tags" v-html="item" class="jl_cate"></div>
      </div>
      <div v-show="userinfo.filed.length > 0" style="line-height: 20px;margin-bottom: 8px;">擅长领域：</div>
      <div v-show="userinfo.filed.length > 0" style="display: flex;flex-wrap: wrap;">
        <div v-for="item in userinfo.filed" v-html="item" class="jl_worktime"></div>
      </div>
      <div v-show="userinfo.worktime.length > 0" style="line-height: 20px;margin-bottom: 8px;">可工作时间：</div>
      <div v-show="userinfo.worktime.length > 0" style="display: flex;flex-wrap: wrap;">
        <div v-for="(item,index) in userinfo.worktime" :key="index" v-text="formatWorktime(item)"
             class="jl_worktime"></div>
      </div>
    </div>

    <div class="jl_intro">
      <div style="font-size :16px;border-left: 3px solid #FF445B;padding-left:5px;">个人简历：</div>
      <div style="margin-top: 5px;border-top: 1px solid #dedede;"></div>
      <div style="padding: 10px 15px;color: #666;" v-html="settext(userinfo.intro)"></div>
    </div>

    <div class="jl_intro">
      <div style="font-size :16px;border-left: 3px solid #FF445B;padding-left:5px;">项目经验：</div>
      <div style="margin-top: 5px;border-top: 1px solid #dedede;"></div>
      <div style="padding: 0 15px 10px;">
        <div class="jl_exp" v-for="item in userinfo.project_text">
          <div style="display: flex;align-items: center;height: 30px;"><span
            style="width:10px;height: 10px;display:block;border-radius: 50%;border:1px solid #d9d9d9;"></span>
            <span style="font-size: 14px;color: #333;margin-left: 7px;" v-html="item.title"></span>
          </div>
          <div style="font-size: 12px;color: #666;padding-left: 17px;" v-html="item.desc"></div>
        </div>
      </div>
    </div>
    <group style="border-bottom: 1px solid #dedede;">
      <cell title="作品案例：" :value="category" is-link @click.native="oncatechick"></cell>
    </group>
    <div v-transfer-dom>
      <popup v-model="showcategory" class="checker-popup">
        <div style="padding:10px 10px 20px 10px;">
          <p style="padding: 5px 5px 5px 2px;color:#888;">品类选择</p>
          <checker style="margin-top: 10px;"
                   v-model="category"
                   default-item-class="category_item"
                   selected-item-class="category-item-selected"
                   disabled-item-class="category-item-disabled">
            <checker-item value="全部" @on-item-click="onItemClick">全部</checker-item>
            <checker-item value="PPT定制" @on-item-click="onItemClick">PPT定制</checker-item>
            <checker-item value="UI设计" @on-item-click="onItemClick">UI设计</checker-item>
            <checker-item value="LOGO" @on-item-click="onItemClick">LOGO</checker-item>
            <checker-item value="企业画册" @on-item-click="onItemClick">企业画册</checker-item>
            <checker-item value="海报展板" @on-item-click="onItemClick">海报展板</checker-item>
            <checker-item value="企业形象设计VI" @on-item-click="onItemClick">企业形象设计VI</checker-item>
          </checker>
        </div>
      </popup>
    </div>
    <div style="background: #fff;padding: 0 10px;" v-for="item in albums">
      <router-link tag="div" :to="{'path':'/album','query':{'album_id':item.work_id,'user_id':userid}}"
                   class="worklist">
        <div class="left">
          <x-img :src="item.cover+'?imageView2/2/w/375'" style="width: 100%;display: block" :offset="50"></x-img>
        </div>
        <div class="right">
          <p style="font-size: 14px; white-space: nowrap;text-overflow: ellipsis;overflow: hidden;"
             v-html="item.title"></p>
          <p class="albumdesc" v-html="item.desc"></p>
        </div>
        <p class="category-item" v-html="item.category"></p>
      </router-link>
      <div style="width: 200%;height: 1px;background: #d9d9d9;transform-origin: 0 0;transform:scale(0.5);"></div>
    </div>
    <div style="padding: 0 10px;display: flex;height: 30px;align-items: center;justify-content: center" v-show="isover">没有更多了~</div>
  </div>
</template>
<script>
  import {XImg, Checker, CheckerItem, Group, Cell, Popup, TransferDom} from 'vux'
  function getScrollTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }
  //文档的总高度
  function getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
  }
  //浏览器视口的高度
  function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }

  export default{
    data(){
      return {
        userinfo: {
          project_text: [],
          worktime: [],
          filed: [],
          tags: []
        },
        albums: [],
        userid: null,
        category: '全部',
        showcategory: false,
        page: 1,
        total: 0,
        isover: false,
        isgetting: false
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
      showload();
      this.userid = this.$route.query.id
      if (this.userid) {
        this.getuserinfo(this.userid);
        this.getuserworks(this.userid, formatCategory(this.category, 0), this.page);
      } else {
        this.$router.push("/")
      }
      this.init();
    },
    watch: {
      'category'(){
        this.page = 1;
        this.total = 0;
        this.isover = false;
        this.albums = [];
        showload();
        this.getuserworks(this.userid, formatCategory(this.category, 0), this.page);
      }
    },
    methods: {
      init(){
        var that = this;
        window.onscroll = function () {
          if (getScrollTop() + getWindowHeight() >= (getScrollHeight() - 20)) {
            if (!that.isgetting && !that.isover) {
              showload();
              that.page++;
              that.getuserworks(that.userid, formatCategory(that.category, 0), that.page);
            }
          }
        };
      },
      settext(value){
        if (value) {
          return value.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");
        }
        return value
      },
      setexp(exp){
        if (!exp) {
          return "-";
        }
        var y = new Date().getFullYear();
        if (exp >= y) {
          return "学生"
        } else if (exp < y) {
          return (y - exp) + "年工作经验";
        } else {
          return "学生"
        }
      },

      setcity(value){
        if (value) {
          var a = value.split(" ");
          if (a[0] == a[1]) {
            return a[0];
          } else {
            return a[0] + "·" + a[1];
          }
        }
        return value;
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
              data.data.worktime = JSON.parse(data.data.worktime)
              that.userinfo = data.data;
            } else {
              showModal();
            }
            hideload()
          },
          error(){
            showModal();
            hideload()
          }
        });

      },
      getuserworks(id, c, page){
        this.isgetting = true;
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
            if (data.code === 0) {
              var json = data.data.album;
              for (var i = 0, size = json.length; i < size; i++) {
                json[i].category = formatCategory(json[i].category, 1);
                that.albums.push(json[i]);
              }
              that.total = data.data.total
              if (that.page >= Math.floor((that.total - 1) / 20) + 1) {
                that.isover = true;
              }
            } else {
              showModal();
            }
            that.isgetting = false;
            hideload()
          },
          error(){
            hideload()
            that.isgetting = false;
            showModal();
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
      /* showmore(){
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
       },*/
    }
  }
</script>
<style scoped>

  .userinfo {
    box-sizing: border-box;
    color: #727272;
    line-height: 40px;
    padding: 15px 0;
    width: 80%;
    margin: 0 auto;
    position: relative;
  }

  .head_div {
    width: 76px;
    height: 76px;
    background: #fff;
    border-radius: 50%;
  }

  .head_div > img {
    display: inline-block;
    width: 70px;
    height: 70px;
    margin-left: 3px;
    margin-top: 3px;
    border-radius: 50%;
  }

  .jl_top {
    display: flex;
    padding: 10px 15px;
    background: #fff;
  }

  .jl_info {
    display: flex;
    background: #fff;
    padding: 10px 15px 0;
    flex-direction: column;
    margin-top: 10px;
  }

  .jl_intro {
    display: flex;
    background: #fff;
    padding: 10px 0 0;
    flex-direction: column;
    margin-top: 10px;
  }

  .jl_cate {
    border: 1px solid #D9D9D9;
    font-size: 12px;
    border-radius: 100px;
    padding: 3px 15px;
    margin-right: 10px;
    margin-bottom: 8px;
  }

  .jl_worktime {
    font-size: 12px;
    padding: 5px 10px;
    margin-right: 10px;
    margin-bottom: 8px;
    background: #F2F4F5;
  }

  .jl_exp {
    background: #FAFAFA;
    display: flex;
    flex-direction: column;
    padding: 5px 8px;
    margin-top: 10px;
  }

  .category-item {
    background: #fff;
    margin-right: 10px;
    line-height: 14px;
    border-radius: 15px;
    margin-bottom: 10px;
    min-width: 50px;
    color: #69adff;
    text-align: center;
    border: 1px solid #C8DBFF;
    font-size: 12px;
    display: inline-block;
    padding: 3px 10px;
    position: absolute;
    bottom: 5%;
    left: 42%;
  }

  .category_item {
    background: #fff;
    margin-right: 10px;
    line-height: 14px;
    margin-bottom: 10px;
    color: #333;
    text-align: center;
    border: 1px solid #dedede;
    font-size: 14px;
    display: inline-block;
    padding: 10px 15px;
  }

  .category-item-selected {
    background-color: #FF445B;
    color: #fff;
  }

  .category-item-disabled {
    color: #999;
  }

  .checker-popup {
    overflow: hidden;
  }

  .worklist {
    overflow: hidden;
    position: relative;
    padding: 10px 0;
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
    color: #666;
    font-weight: normal;
    line-height: 14px;
    font-size: 12px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    height: 28px;
    margin-top: 5px;
  }

  .weui-cell {
    padding: 10px 15px 10px 0;
  }


</style>
