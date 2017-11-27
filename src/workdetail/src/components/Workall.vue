<template>
  <div>
    <div class="main">
      <div style="height: 80px;background: #fff;border-top: 1px solid #dedede;">
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
        <ul id="albumsList" style="overflow: hidden">
          <li id="imgwarp" v-for="(itme,index) in albums" v-bind:key="index">
            <a target="_blank" :href="'http://houxiaopang.com/workdetail/album/'+itme.work_id">
              <img :data-original="itme.cover" class="img"></a>
            <p>
              <a :href="'http://houxiaopang.com/workdetail/album/'+itme.work_id" target="_blank">
              <span
                style="height: 19px;padding-left: 0px;cursor: pointer;white-space: nowrap;display: inline-block; width: 100%;overflow: hidden;text-overflow: ellipsis;"
                :title="itme.title" v-html="itme.title"></span></a>
            </p>
            <!--<p v-html="myfilter(itme.up_time)"></p>-->
            <p>
              <a target="_blank" :href="'http://houxiaopang.com/workdetail/user/'+itme.user_id">
                <img :src="itme.headimg"></a>
              <a target="_blank" :href="'http://houxiaopang.com/workdetail/user/'+itme.user_id">
                <span style="color: #666;" v-html="itme.username"></span>
              </a>
              <span style='font-size: 14px;float: right;color: #000;'
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
        albums: [],//作品列表
        categroy: '-1',
        pageinfo: {
          total: 0,     // 记录总条数   默认空，如果小于pageNum则组件不显示   类型Number
          pagenum: 20,    // 每页显示条数,默认10                              类型Number
          current: 1,     // 当前页数，   默认为1                             类型Number
          pagegroup: 5,     // 分页条数     默认为5，需传入奇数                  类型Number
          skin: '#d01667',
        }
      }
    },
    mounted(){
      this.chooseCategory();
    },
    components: {
      pagination
    },
    methods: {
      /*jump(vlaue){
        var id = vlaue.id;
        alert(id)
        if (vlaue.name === "project") {
          //_czc.push(["_trackEvent", '查看作品详情', '点击', id]);
        } else if (vlaue.name === "wechat") {
          //_czc.push(["_trackEvent", '查看简历', '点击', id]);
          window.open("http://houxiaopang.com/workdetail/#/user/" + id);
        }
      },*/
      pagechange: function (current) {     // 页码改变传入新的页码，此处做回调
        this.getdata(this.categroy, current);
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
            _czc.push(["_trackEvent", '查看设计品类', '点击', that.categroy]);
            that.getdata(that.categroy, that.pageinfo.current);
          }
        }
      },
      myfilter(value){
        return getDateDiff(getDateTimeStamp(value));
      },
      getdata(c, page){
        var that = this;
        // todo 此处添加 loading
        $.ajax({
          type: "get",
          url: "http://www.houxiaopang.com/api/v1.1/allwork",
          data: {
            'category': c,
            'page': page
          },
          success(data){
            if (data.code === 0) {
              window.scrollTo(0, 0);
              that.albums = [];
              that.pageinfo.total = data.data.total;
              var json = data.data.album;
              for (var i = 0, size = json.length; i < size; i++) {
                var type = json[i].category;
                if (type == 1) {
                  type = "PPT";
                } else if (type == 2) {
                  type = "UI";
                } else if (type == 3) {
                  type = "文本画册";
                } else if (type == 4) {
                  type = "海报展板";
                } else if (type == 5) {
                  type = "LOGO";
                } else if (type == 6) {
                  type = "企业形象设计（VI）";
                } else if (type == 0) {
                  type = "测试品类";
                }
                json[i].category = type;
                that.albums.push(json[i]);
              }

              that.$nextTick(function () {
                $("#imgwarp .img").lazyload({
                  effect: 'fadeIn'
                });})


            } else {
              alert("网络拥挤，请稍后再试···");
            }
          },
          error(){
            alert("网络拥挤，请稍后再试···");
          }
        });
      }
    },
    created(){
      this.getdata(this.categroy, this.pageinfo.current);
    },
  }
</script>
<style scoped>

  ul {
    list-style: none;
  }

  .main {
    background: #F5F5F5;
  }

  .content {
    box-sizing: border-box;
    width: 1100px;
    margin: 20px auto 0;
    height: 100%;
  }

  .content > ul {
    overflow: hidden;
    box-sizing: border-box;
    list-style: none;
  }

  .content > ul > li {
    width: 260px;
    height: 270px;
    float: left;
    box-sizing: border-box;
    margin-right: 19px;
    margin-bottom: 25px;
    overflow: hidden;
    background: #fff;
    box-shadow: 1px 1px 5px 0 #e9dede;
  }

  .content > ul > li:nth-child(4n) {
    margin-right: 0;
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

  a {
    text-decoration: none;
    color: #313131;
  }

  /*.content > ul > li > p:nth-of-type(2) {
    font-size: 12px;
    color: #666;
    margin-top: 12px;
  }*/

  .content > ul > li > p:nth-of-type(2) {
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
    padding-top: 25px;
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
    color: #313131;
  }

  .active {
    border-bottom: 2px solid #d01667;
  }

  .active > a {
    color: #d01667 !important;
  }
</style>
