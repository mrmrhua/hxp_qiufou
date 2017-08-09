<template>
  <div>
    <div style="overflow: hidden;position: relative;">
      <div style="position: absolute;top: 0;left: 0;background: rgba(0,0,0,0.4);height: 100%;width: 100%;"></div>
      <img style="display: block" width="100%" src="http://image.houxiaopang.com/demand/banner.png" alt="">
    </div>
    <div style="overflow:hidden;background:#f5f5f5;">
      <div class="content">
        <ul id="category" class="category">
          <li class="active"><a>全部</a></li>
          <li><a>PPT定制</a></li>
          <li><a>UI设计</a></li>
          <li><a>企业画册</a></li>
          <li><a>海报展板</a></li>
          <li><a>LOGO</a></li>
          <li><a>企业形象设计VI</a></li>
        </ul>
        <div class="conbody">
          <ul style="overflow: hidden">
            <router-link tag="li" :to="{name:'xuanjia',params:{'id':item.demand_id}}" :key="item.demand_id"
                         v-for="item in demandcenterlist">
              <div class="context">
                <p class="cate"><span>{{item.category}}</span></p>
                <p class="title">{{item.title}}</p>
                <!--<p class="desc" style="height: 135px;" v-html="item.description"></p>-->
                <!--<ul>
                  <li>PPT</li>
                  <li>UI</li>
                </ul>-->
                <p style="text-align: center"><i class="iconfont"
                                                 style="color:#d01667;font-size:100px;">&#xe634;</i><span
                  style="display:block;font-size: 16px;">招募中</span></p>
                <p class="time"><i class="iconfont" style="color:#d01667;font-size: 18px;">&#xe605;</i>　<span
                  style="vertical-align: top;display: inline-block;">{{myfilter(item.up_time)}}</span></p>
              </div>
            </router-link>
          </ul>
          <pagination :pageInfo="pageinfo" @change="pagechange"></pagination>
        </div>
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
        category: '-1',
        demandcenterlist: [], //发单广场列表，对象数组，
        pageinfo: {
          total: 0,     // 记录总条数   默认空，如果小于pageNum则组件不显示   类型Number
          pagenum: 12,    // 每页显示条数,默认10                              类型Number
          current: 1,     // 当前页数，   默认为1                             类型Number
          pagegroup: 5,     // 分页条数     默认为5，需传入奇数                  类型Number
          skin: '#d01667',
        }
      }
    },
    components: {
      pagination
    },
    created(){
      this.getdemandcenterList(this.category, this.pageinfo.current);
    },
    mounted(){
      this.chooseCategory();
    },
    methods: {
      getdemandcenterList(c, page) {
        var that = this;
        $.ajax({
          url: 'http://houxiaopang.com/api/v1.1/demandcenter',
          type: "GET",
          data: {'category': c, 'page': page},
          success: function (data) {
            that.demandcenterlist = [];
            if (data.code != 0) {
              alert("网络拥挤，请稍后在试！");
            } else {
              that.pageinfo.total = data.data.total;
              for (var i = 0, size = data.data.demand.length; i < size; i++) {
                var json = data.data.demand[i];
                var type = json.category;
                if (type == 1) {
                  type = "PPT";
                } else if (type == 2) {
                  type = "UI";
                } else if (type == 3) {
                  type = "文本画册";
                } else if (type == 4) {
                  type = "海报展览";
                } else if (type == 5) {
                  type = "LOGO";
                } else if (type == 6) {
                  type = "企业形象设计（VI）";
                } else if (type == 0) {
                  type = "测试品类";
                }
                json.category = type;
                that.demandcenterlist.push(json);
              }
            }
          },
          error: function () {
            alert("网络拥挤，请稍后再试！");
          }
        });
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
            that.category = this.index;
            that.getdemandcenterList(that.category, that.pageinfo.current);
          }
        }
      },
      pagechange: function (current) {     // 页码改变传入新的页码，此处做回调
        this.getdemandcenterList(this.category, current);
      },
      myfilter(value){
        return getDateDiff(getDateTimeStamp(value));
      },
    },
  }
</script>
<style scoped>
  .category {
    padding: 50px 0;
  }

  .active {
    border-bottom: 2px solid #d01667;
  }

  .category li:hover {
    border-bottom: 2px solid #d01667;
  }

  .category li {
    display: inline-block;
    margin-right: 30px;
    font-size: 20px;
    padding-bottom: 2px;
    cursor: pointer;
  }

  .category li a {
    color: #313131;
    text-decoration: none;
  }

  .content {
    width: 1000px;
    margin: 0 auto;
  }

  .conbody {
    box-sizing: border-box;
    width: 1000px;
    margin: 0 auto;
    height: 100%;
    padding-bottom: 50px;
  }

  .conbody > ul {
    overflow: hidden;
    box-sizing: border-box;
    list-style: none;
  }

  .conbody > ul > li {
    width: 300px;
    height: 356px;
    float: left;
    box-sizing: border-box;
    margin-right: 30px;
    margin-bottom: 25px;
    cursor: pointer;
    background: url("http://image.houxiaopang.com/demand/bg_nml.png");
    background-size: cover;
  }

  .conbody > ul > li:hover {
    background: url("http://image.houxiaopang.com/demand/bg_ovr.png");
    background-size: cover;
  }

  .context {
    padding: 15px 25px;
    position: relative;
    height: 100%;
  }

  .context > .cate {
    text-align: center;
    color: #d01667;
    font-size: 20px;
    line-height: 60px;
  }

  .context > .cate > span {
    border-radius: 19px;
    display: inline-block;
    line-height: 30px;
    padding: 0 25px;
    border: 1px solid #d01667;
  }

  .context > .title {
    text-align: center;
    color: #313131;
    font-size: 22px;
    margin-bottom: 20px;
    line-height: 30px;
    height: 60px;
  }

  .context > .desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    color: #727272;
    font-size: 18px;
  }

  .context > ul {
    list-style: none;
    overflow: hidden;
    margin-top: 40px;
  }

  .context > ul > li {
    width: auto;
    padding: 0 20px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border-radius: 25px;
    float: left;
    border: 1px solid #dcdee0;;
    margin-right: 25px;
    color: #969899;
    font-size: 16px;
  }

  .context > .time {
    text-align: center;
    color: #999898;
    font-size: 16px;
    position: absolute;
    bottom: 20px;
    width: 250px;
  }
</style>
