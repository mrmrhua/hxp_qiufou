<template>
  <div style="background: #f5f5f5">
    <div class="info">
      <div class="fg"></div>
    </div>
    <div class="userinfo" style="margin-top: 120px">
      <div class="head_div"><img :src="userinfo.headimg"></div>
      <p v-html="userinfo.nickname"></p>
      <!--所在城市&工作经验-->
      <div class="cityexp_box">
        <p><i></i><span v-text="setcity(userinfo.city)"></span></p>
        <p style="margin-left: 150px"><i></i><span v-html="setexp(userinfo.exp)" ></span></p>
      </div>
      <!--风格标签-->
      <div class="stylebox">
        <ul>
          <li><div>扁平风</div></li>
          <li><div>青春活泼</div></li>
          <li><div>大客户经验</div></li>
          <li><div>大客户经验</div></li>
          <li><div>扁平风</div></li>
          <li><div>大客户经验</div></li>
          <li><div>大客户经验</div></li>
          <li><div>大客户经验</div></li>
          <li><div>大客户经验</div></li>
        </ul>
      </div>
      <!--擅长-->
      <div class="sc" v-show="userinfo.filed.length>0">
        <span class="span">擅长领域</span>
        <ul style="width: 800px;padding-top: 10px;margin: 0 auto;">
          <li v-for="item in userinfo.filed" v-html="item"></li>
        </ul>
      </div>
      <div v-show="userinfo.worktime.length>0" class="worktime" >
        <span class="span">可工作时间：</span>
        <ul style="width: 800px;padding-top: 10px;margin: 0 auto;">
          <li v-for="item in userinfo.worktime" v-html="formatWorktime(item)"></li>
        </ul>
      </div>
    </div>

    <!--个人简历-->
    <div  class="userinfo" v-show="userinfo.intro">
      <div  style="overflow: hidden;margin-top: 20px;">
        <span class="span" >个人简介</span>
        <div style="width: 660px;;margin: 20px auto;text-align:left;padding: 14px" v-html="settext(userinfo.intro)">
        </div>
      </div>
    </div>
      <!--项目经历-->
    <div  class="userinfo" v-show="userinfo.project_text.length>0">
      <div  style="overflow: hidden;margin-top: 20px;">
        <span class="span" >项目经历</span>
        <ul id="project_text"
            style="width: 800px;line-height: 20px;margin:0 auto;overflow: hidden;">
          <li v-for="item in userinfo.project_text">
            <div style="width: 660px;border: 1px solid #D9D9D9;margin: 20px auto;text-align: left;padding: 14px">
              <p style="font-weight: 600;" v-html="item.title"></p>
              <p style="margin-bottom: 10px;" v-html="item.desc"></p>
            </div>

          </li>
        </ul>
      </div>
      <!--<div v-show="userinfo.project_text.length>0" @click="showmore" class="more">-->
        <!--<i class="iconfontyyy">&#xe8f8;</i>-->
        <!--<span>展开</span>-->
      <!--</div>-->
    </div>
    <div class="main">
      <div style="height: 115px;background: #fff;width: 1100px;margin: 0 auto;text-align: center;padding-top: 35px;border-bottom: 1px solid #dedede;">
        <span class="span" >作品案例</span>
        <ul id="category" class="category">
          <li class="active"><a>全部</a></li>
          <li><a>PPT定制</a></li>
          <li><a>UI设计</a></li>
          <li><a>企业画册</a></li>
          <li><a>海报展板</a></li>
          <li><a>LOGO</a></li>
          <li><a>企业形象设计VI</a></li>
        </ul>
      </div>
      <div class="content">
        <!--显示的品类-->
        <ul style="overflow: hidden;">
          <li id="imgwarp" v-for="itme in albums">
            <a target="_blank" :href="'http://houxiaopang.com/workdetail/album/'+itme.work_id">
              <img :data-original="itme.cover"  class="img">
            </a>
            <p>
              <a target="_blank" :href="'http://houxiaopang.com/workdetail/album/'+itme.work_id">
              <span
                style="height:19px;padding-left: 0px;cursor: pointer;white-space: nowrap;display: inline-block; width: 100%;overflow: hidden;text-overflow: ellipsis;"
                :title="itme.title" v-html="itme.title"></span></a>
            </p>
            <p v-html="myfilter(itme.up_time)"></p>
            <p>
              <a target="_blank" :href="'http://houxiaopang.com/workdetail/user/'+itme.user_id">
                <img :src="itme.headimg"></a>
              <a target="_blank" :href="'http://houxiaopang.com/workdetail/user/'+itme.user_id">
                <span v-html="itme.username"></span></a>
              <span
                style='font-size: 14px;float: right;margin-right: 10px;'
                v-html="itme.category"></span></p>
          </li>
        </ul>
        <pagination :pageInfo="pageinfo" @change="pagechange"></pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import pagination from './Pagination'

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
    data(){
      return {
        userinfo: {
          project_text: [],
          worktime: [],
          city:'北京 北京',
          filed:[]
        },
        albums: [],
        pageinfo: {
          total: 0,     // 记录总条数   默认空，如果小于pageNum则组件不显示   类型Number
          pagenum: 20,    // 每页显示条数,默认10                              类型Number
          current: 1,     // 当前页数，   默认为1                             类型Number
          pagegroup: 5,     // 分页条数     默认为5，需传入奇数                  类型Number
          skin: '#d01667',
        },
        categroy: '-1',
        more: false,
      }
    },
    created(){
      this.getuserinfo(this.$route.params.id);
      this.getuserworks(this.$route.params.id, this.categroy, this.pageinfo.current, 1);
    },
    mounted(){
      this.chooseCategory();
    },
    components: {
      pagination
    },
    methods: {
      setcity(value){
        var address = value.split(" ")
        if (address[0] === address[1]) {
          return address[0]
        } else {
          return address.join("·")
        }
      },
      setexp(exp){
        if(!exp){
          return "-"
        }
        var y = new Date().getFullYear();
        if (exp >= y) {
          return "学生"
        } else {
          return (y - exp) + "年工作经验";
        }
      },
      settext(value){
        if (value) {
          return value.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");
        }
        return value
      },
/*      showmore(){
        this.more = !this.more;
        if (this.more) {
          $("#project_text").css("height", "auto");
          $(".userinfo .more i").eq(0).html("&#xe8fa;");
          $(".userinfo .more span").eq(0).html("收起");
        } else {
          $("#project_text").css("height", "62px");
          $(".userinfo .more i").eq(0).html("&#xe8f8;");
          $(".userinfo .more span").eq(0).html("展开");
          window.scrollTo(0, 600);
        }
      },*/
      /*jump(data){
       var id = data.id;
       if (data.name === "project") {
       window.open("http://houxiaopang.com/workdetail/#/album/" + id);
       } else if (data.name === "wechat") {
       window.open("http://houxiaopang.com/workdetail/#/user/" + id);
       }
       },*/
      pagechange(current){
        this.getuserworks(this.$route.params.id, this.categroy, current);
      },
      chooseCategory(){
        var that = this;
        var li = document.getElementById("category").children;
        for (var i = 0, size = li.length; i < size; i++) {
          li[i].index = i;
          li[i].onclick = function () {
            $("#category").find("li").each(function () {
              $(this).removeClass("active");
            });
            $(this).addClass("active");

            if (this.index == 0) {
              this.index = -1;
            }
            that.pageinfo.current = 1;
            that.categroy = this.index;
            that.getuserworks(that.$route.params.id, that.categroy, that.pageinfo.current);
          }
        }
      },
      getuserinfo(id){
        var that = this;
        $.ajax({
          type: "get",
          url: "http://www.houxiaopang.com/api/v1.1/resumeinfo",
          data: {
            'designer_id': id,
          },
          success(data){
            if (data.code === 0) {
              if (data.data.worktime == null || data.data.worktime == "") {
                data.data.worktime = []
              }
              data.data.worktime = JSON.parse(data.data.worktime)
              that.userinfo = data.data;
            } else {
              alert(data.data.msg||"网络拥挤，请稍后再试···");
            }
          },
          error(){
            alert("网络拥挤，请稍后再试···");
          }
        });
      },
      getuserworks(id, c, page, flag){
        var that = this;
        $.ajax({
          type: "get",
          url: "http://www.houxiaopang.com/api/v1.1/allwork",
          data: {
            'category': c,
            'designer_id': id,
            'page': page
          },
          success(data){
            if (data.code === 0) {
              if (!flag) {
                window.scrollTo(0, document.getElementById("category").offsetTop);
              }
              that.albums = [];
              var json = data.data.album;
              that.pageinfo.total = data.data.total;
              for (var i = 0, size = json.length; i < size; i++) {
                var type = json[i].category;
                if (type === 1) {
                  type = "PPT";
                } else if (type === 2) {
                  type = "UI";
                } else if (type === 3) {
                  type = "文本画册";
                } else if (type === 4) {
                  type = "海报展板";
                } else if (type === 5) {
                  type = "LOGO";
                } else if (type === 6) {
                  type = "企业形象设计（VI）";
                } else if (type === 0) {
                  type = "测试品类";
                }
                json[i].category = type;
                that.albums.push(json[i]);
              }
              that.$nextTick(function () {
                $("#imgwarp .img").lazyload({
                  effect: 'fadeIn'
                });
              });
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
      myfilter(value){
        return getDateDiff(getDateTimeStamp(value));
      },

    }
  }
</script>

<style scoped>
  .info {
    background: url('http://image.houxiaopang.com/workdetail/bg.png') no-repeat;
    background-size: cover;
    width: 100%;
    height: 340px;
    position: absolute;
    top: 90px;
    z-index: 0;
  }

  .fg {
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
  }

  .span{
    font-size:18px;
    color:#D01667;
    line-height:19px;
  }

  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: #313131;
  }
  .userinfo {
    width: 1100px;
    margin: 20px auto;
    box-sizing: border-box;
    color: #727272;
    line-height: 40px;
    padding: 15px 60px 50px;
    background: #ffffff;
    text-align: center;
    position: relative;
    z-index: 0;
  }


  .userinfo > .head_div {
    margin: -70px auto 0 auto;
    width: 110px;
    height: 110px;
    background: #fff;
    border-radius: 50%;
  }

  .userinfo > .head_div > img {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-left: 5px;
    margin-top: 5px;
    border-radius: 50%;

  }

  .userinfo > p:nth-of-type(1) {
    font-size: 30px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #313131;
  }

  .cityexp_box{
    text-align: center;
    color: #999;
    height: 30px;
    line-height: 30px;
    font-size: 16px;

  }
  .cityexp_box > p{
    display: inline-block;
    position: relative;
  }


  .cityexp_box > p > i {
    background: url('http://image.houxiaopang.com/workdetail/dingwei.png') no-repeat;
    width: 12px;
    height: 17px;
    background-size: cover;
    position: absolute;
    top: 6px;
    left: -20px;
  }
  .stylebox{
    text-align: center;
    width: 800px;
    margin: 30px auto;
    overflow: hidden;
  }
  .stylebox >ul{
    width: 100%;
  }
  .stylebox >ul >li{
    display: inline-block;
    margin-right: 14px;
    margin-bottom: 10px;
  }
  .stylebox >ul >li >div{
    border: 1px solid #d9d9d9;
    border-radius: 100px;
    padding:0 25px;
  }

  .main {
    background: #F5F5F5;
  }

  .sc {
    overflow: hidden;
    margin:30px 0;
    text-align: center;
  }

  .userinfo > .sc li{
    display: inline-block;
    padding: 0 25px;
    text-align: center;
    height: 40px;
    line-height: 38px;
    margin-right: 20px;
    margin-bottom: 10px;
    background: #f5f5f5;
    color: #828282;
  }

  .worktime {
    overflow: hidden;
    margin:30px 0;
    text-align: center;
  }

  .userinfo > .worktime li{
    display: inline-block;
    padding: 0 25px;
    text-align: center;
    height: 40px;
    line-height: 38px;
    margin-right: 20px;
    margin-bottom: 10px;
    background: #f5f5f5;
    color: #828282;
  }


  .userinfo > .more {
    width: 60px;
    margin: 0 auto;
    color: #c0bebe;
    cursor: pointer;
  }

  .userinfo > .more:hover {
    color: #d01667;
  }

  .userinfo > .more > span {
    padding-left: 5px;
    font-size: 14px;
  }

  .content {
    box-sizing: border-box;
    width: 1100px;
    margin: 0 auto;
    height: 100%;
    background: #ffffff;
  }

  .content > ul {
    overflow: hidden;
    box-sizing: border-box;
    list-style: none;
    width: 821px;
    margin: 0 auto;
  }

  .content > ul > li {
    width: 260px;
    height: 295px;
    float: left;
    box-sizing: border-box;
    margin-top: 29px;
    margin-bottom: 25px;
    overflow: hidden;
    background: #fff;
    box-shadow: 1px 1px 5px 0 #e9dede;
  }

  .content > ul > li:nth-child(3n+2) {
    margin: 29px 20px 25px 21px;
  }

  .content > ul > li:hover {
    box-shadow: 3px 3px 5px 0 #d8d5d5;
  }

  .content > ul > li .img {
    width: 240px;
    height: 180px;
    cursor: pointer;
    margin: 10px 10px 0;
  }

  .content > ul > li > p {
    color: #313131;
    box-sizing: border-box;
    padding: 0 10px;
  }

  .content > ul > li > p:nth-of-type(1) {
    font-size: 14px;
    color: #333;
    margin-top: 1px;
  }

  .content > ul > li > p:nth-of-type(2) {
    font-size: 12px;
    color: #666;
    margin-top: 12px;
  }

  .content > ul > li > p:nth-of-type(3) {
    overflow: hidden;
    height: 42px;
    padding: 0 12px;
    background: #f9f9f9;
    margin: 12px 0 0;
    line-height: 42px;
  }

  .content > ul > li > p  img {
    display: inline-block;
    width: 24px;
    border-radius: 50%;
    cursor: pointer;
    vertical-align: -8px;
  }

  .content > ul > li > p > span:nth-of-type(1) {
    cursor: pointer;
  }

  .content > ul > li > p > span {
    vertical-align: top;
    font-size: 14px;
  }

  .category {
    padding-top: 30px;
    width: 1000px;
    margin: 0 auto;
  }

  .category li:hover {
    border-bottom: 2px solid #d01667;
    cursor: pointer;
  }

  .category li {
    display: inline-block;
    margin-right: 30px;
    font-size: 16px;
    padding: 4px 5px;
  }

  .category li a {
    color: #6c7279;
  }

  .active {
    border-bottom: 2px solid #d01667;
  }

  #project_text > li:last-child > p:last-child {
    margin-bottom: 0 !important;
  }
</style>
