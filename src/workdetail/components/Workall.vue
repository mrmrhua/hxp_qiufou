<template>
  <div>
    <div class="main">
      <div class="content">
        <div style="height: 80px;">
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
        <!--显示的品类-->
        <ul id="albumsList" style="overflow: hidden">
          <li v-for="itme in albums">
            <router-link tag="img" :to="{name:'project',params:{'id':itme.work_id}}" class="img"
                         :src="itme.cover"></router-link>
            <p>
              <router-link tag="span" style="padding-left: 0;cursor: pointer"
                           :to="{name:'project',params:{'id':itme.work_id}}" v-html="itme.title"></router-link>
            </p>
            <p v-html="itme.category"></p>
            <p>
              <router-link tag="img" :to="{name:'wechat',params:{'id':itme.user_id}}" :src="itme.headimg"></router-link>
              <router-link tag="span" :to="{name:'wechat',params:{'id':itme.user_id}}"
                           v-html="itme.username"></router-link>
              <span
                style='font-size: 14px;float: right;margin-right: 10px;'
                v-html="myfilter(itme.up_time)"></span></p>
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
            that.getdata(that.categroy, that.pageinfo.current);
          }
        }
      },
      myfilter(value){
        return getDateDiff(getDateTimeStamp(value));
      },
      getdata(c, page){
        var that = this;
        this.albums = [];
        $.get("http://houxiaopang.com/api/v1.1/allwork?category=" + c + "&page=" + page, function (data) {
          if (data.code == 0) {
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
          } else {
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
    padding: 15px 0;
    box-sizing: border-box;
    width: 1000px;
    margin: 0 auto;
    height: 100%;
  }

  .content > ul {
    overflow: hidden;
    box-sizing: border-box;
    list-style: none;
  }

  .content > ul > li {
    width: 240px;
    float: left;
    box-sizing: border-box;
    margin-right: 10px;
    margin-bottom: 25px;
    padding-bottom: 10px;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 0 #d8d5d5;
    background: #fff;
  }

  .content > ul > li .img {
    width: 100%;
    height: 180px;
    cursor: pointer;
  }

  .content > ul > li > p {
    color: #313131;
    padding-left: 10px;
    box-sizing: border-box;
  }

  .content > ul > li > p:nth-of-type(1) {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
  }

  .content > ul > li > p:nth-of-type(2) {
    height: 40px;
    line-height: 20px;
    font-size: 14px;
    color: #bbb;
    border-bottom: 1px solid #ddd;
  }

  .content > ul > li > p:nth-of-type(3) {
    overflow: hidden;
    margin-top: 10px;
    padding-left: 8px;

  }

  .content > ul > li > p > img {
    display: inline-block;
    width: 24px;
    border-radius: 50%;
    border: 1px solid #bbb;
    cursor: pointer;
  }

  .content > ul > li > p > span:nth-of-type(1) {
    cursor: pointer;
  }

  .content > ul > li > p > span {
    color: #787878;
    vertical-align: top;
    line-height: 24px;
    padding-left: 15px;
    font-size: 14px;
  }

  .category {
    padding-top: 25px;
  }

  .category li:hover {
    border-bottom: 2px solid #d01667;
    cursor: pointer;
  }

  .category li {
    display: inline-block;
    margin-right: 30px;
    font-size: 20px;
    padding-bottom: 2px;
  }

  .category li a {
    color: #6c7279;
  }

  .active {
    border-bottom: 2px solid #d01667;
  }
</style>
