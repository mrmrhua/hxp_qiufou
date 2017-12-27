<template>
  <div class="warp">
    <div class='head'>
      <div class="sc_title">
        <span
          style='flex-shrink:1;width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'>
          <span style="font-size:20px;">{{post.title}}</span>
          <div style="margin-top: 5px;">设计师：{{post.designer}}</div>
        </span>
      </div>
    </div>
    <div class="topbar">
      <span @click="choose(index)" v-for="(item,index) in tabbar" :class="{active:item.active}">{{item.name}}</span>
    </div>
    <div class='schedule'>
      <div class="cont_warp" :style="{left:left}">
        <!--进度-->
        <div class="jindu">
          <div style='position:relative;'>
            <div class='zz'></div>
          </div>
          <div class='content' v-for="item in post.postlist">
            <div class='time_item'>
              <div class='time_left'>
                <div class='dian'></div>
                <div style='margin-left:10px;box-sizing:border-box;padding-top:2px'>{{item.up_time}}</div>
              </div>
              <div class='time_right'>共{{item.imglist.length}}张图片</div>
            </div>
            <div class='detail' @click="next(item.post_id,item.desc)">
              <div class='context' v-html="setDesc(item.desc)"></div>
              <div class='imglist'>
                <div class='imgwarp'
                     v-for="(imgitem,imgindex) in item.imglist"
                     v-if="imgindex < 2">
                  <img class="previewer-demo-img" :src="imgitem">
                </div>
              </div>
              <div class='total'>点击查看更多</div>
            </div>
          </div>
        </div>
        <!--记录-->
        <div class="jilu">
          <div class="jilu_item" v-for="item in cashflow">
            <div class="jilu_l">
              <p>{{item.remark}}</p>
              <p style="font-size: 12px;">{{item.when}}</p>
            </div>
            <div class="jilu_r">
              <p style="font-size: 18px;">{{setMoney(item.change_money)}}</p>
              <p style="font-size: 12px;">{{item.status}}</p>
            </div>
          </div>
        </div>
        <!--详情-->
        <div class="xiangqing">
          <div style="padding: 10px 15px;">
            <p style="font-size: 18px;">{{demanddetail.title}}</p>
            <div style="font-size: 14px;margin-top: 10px;line-height: 30px;" v-html="demanddetail.description">
            </div>
            <div style="margin-top: 10px;">
              <p style="font-size: 18px;">参考图片</p>
              <ul style="width: 100%;display: flex;justify-content: space-between;flex-flow: wrap;margin-top: 5px;">
                <li @click="showimgview(index)" v-for="(item,index) in demanddetail.desc_img"
                    style="overflow:hidden;width: 49%;height: 100px;background: #000;margin-bottom: 5px;">
                  <img class="previewer-demo-img" style="width: 100%;" :src="item+'?imageView2/1/w/200/h/150'" alt="">
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--空-->
    <div class="none" v-show="post.postlist.length === 0&&tabbar[0].active">
      <div class="none-img">
        <!--<img class="logo" src='../../assets/none.png'>-->
        <span style='color:#999;'>还没有上传过进度稿哦</span>
      </div>
    </div>
    <div v-transfer-dom>
      <previewer :list="setworklist(list)" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>
<script>
  import {Previewer, TransferDom} from 'vux'
  export default{
    directives: {
      TransferDom
    },
    components: {
      Previewer
    },
    data(){
      return {
        tabbar: [
          {name: "项目进度", active: true},
          {name: "支付记录", active: false},
          {name: "项目详情", active: false}
        ],
        left: 0,
        project_id: null,
        post: {
          postlist: []
        },
        cashflow: [],
        works: [],
        show: false,
        demanddetail: {
          desc_img: []
        },
        list: [],
        options: {
          getThumbBoundsFn (index) {
            var thumbnail = document.querySelectorAll('.previewer-demo-img')[index];
            var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
            var rect = thumbnail.getBoundingClientRect();
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }
      }
    },
    created(){
      this.project_id = this.$route.query.id
      if (!this.project_id) {
        this.$router.push("/project")
      } else {
        showload("加载中")
        this.getinfo(this.project_id)
      }
    },
    methods: {
      setworklist(value){
        var list = [];
        value.forEach(function (item) {
          list.push({'src': item});
        });
        return list;
      },
      showimgview (num) {
        this.list = this.demanddetail.desc_img;
        this.$nextTick(function () {
          this.$refs.previewer.show(num)
        })
      },
      next(id, desc){
        window.localStorage.postdesc = desc
        this.$router.push({
          path: "/workproject/circle",
          query: {
            id: id,
          }
        });
      },
      getdemanddetail(){
        var that = this
        var id = this.post.demand_id
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/demanddetail",
          data: {demand_id: id},
          success(res){
            if (res.code === 0) {
              that.demanddetail = res.data
            } else {
              showModal("网络拥挤，请稍候再试")
            }
            hideload()
          },
          error(){
            hideload()
            showModal("网络拥挤，请稍候再试")
          }
        })
      },
      choose(idx){
        this.tabbar.forEach(function (item, index) {
          item.active = false
          if (idx === index) {
            item.active = true
          }
        })
        if (idx === 0) {
          this.left = 0;
        } else if (idx === 1) {
          if (this.cashflow.length === 0) {
            showload("加载中")
            this.getpayinfo(this.project_id)
          }
          this.left = "-100%";
        } else if (idx === 2) {
          if (!this.demanddetail.title) {
            showload("加载中")
            this.getdemanddetail()
          }
          this.left = "-200%";
        }
      },
      setDesc(value){
        return value.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>")
      },
      setMoney(value){
        return value > 0 ? "+" + value.toFixed(2) : value.toFixed(2)
      },
      getpayinfo(id){
        var that = this
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/wxfwh/payrecord",
          token: true,
          data: {
            project_id: id
          },
          success(res){
            if (res.code === 0) {
              that.cashflow = res.data.cashflow
            } else {
              showModal(res.msg)
            }
            hideload()
          },
          error(){
            hideload()
            showModal("网络拥挤，请稍候再试")
          }
        })
      },
      getinfo(id){
        var that = this
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/wxfwh/client/projectpage",
          data: {
            project_id: id
          },
          token: true,
          success(res){
            if (res.code === 0) {
              that.post = res.data
              wxshare(that.post.title, "https://m.houxiaopang.com/demand/#/workproject/share/" + id)//desc , url
            } else {
              showModal("网络拥挤，请稍候再试")
            }
            hideload()
          },
          error(){
            hideload();
            showModal("网络拥挤，请稍候再试")
          }
        })
      },
    }
  }

</script>

<style scoped>
  .warp {
    height: 100%;
    background: #f4f4f4;
    position: relative;
    overflow: hidden;
  }

  .topbar {
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
  }

  .topbar > span {
    width: 80px;
    text-align: center;
    border-bottom: 2px solid transparent;
    font-size: 14px;
    height: 40px;
    transition: all .5s;
  }

  .active {
    border-bottom: 2px solid #ed5fa0 !important;
  }

  .content {
    background: #fff;
    box-sizing: border-box;
    border-left: 1px solid #ed5fa0;
    width: 100%;
    float: right;
    padding-bottom: 20px;
  }

  .zz {
    position: absolute;
    left: -5px;
    top: 0;
    height: 10px;
    width: 10px;
    background: #fff;
  }

  .icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: -2px;
  }

  .logo {
    width: 128px;
    height: 128px;
    display: block;
  }

  .head {
    padding: 10px 15px;
    background: linear-gradient(to right, #fe6549, #d01667);
    width: 100%;
    box-sizing: border-box;
    height: 80px;
    color: #fff;
    opacity: 0.8;
  }

  .sc_title {
    display: flex;
    justify-content: space-between;
  }

  .none {
    position: absolute;
    top: 104px;
    left: 0;
    width: 100%;
    bottom: 0;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
  }

  .none-img {
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: center;
  }

  .btn_sm {
    flex-shrink: 0;
    font-size: 14px;
    text-align: center;
    width: 100px;
    height: 35px;
    line-height: 35px;
    background: #FF697A;
    margin-top: 20px;
  }

  .time_item {
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: space-between;
  }

  .time_left {
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 10px 0 0;
    color: #ed5fa0;
  }

  .dian {
    background: #ed5fa0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-left: -7px;
    z-index: 10;
  }

  .time_right {
    font-size: 12px;
    color: #999;
    margin-right: 20px;
    /*height: 50px;
    line-height: 50px;*/
  }

  .detail {
    background: #fff;
  }

  .context {
    padding: 0 17px 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;

  }

  .imglist {
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    flex-wrap: wrap;
  }

  .imgwarp {
    width: 49%;
    height: 120px;
    margin-bottom: 7px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #dedede;
  }

  .imglist > .imgwarp:nth-child(2n) {
    margin-right: 0;
  }

  .schedule {
    position: absolute;
    top: 120px;
    overflow: hidden;
    width: 100%;
    left: 0;
    bottom: 0;
    background: #fff;
    margin-top: 8px;
  }

  .cont_warp {
    width: 300%;
    left: 0;
    transition: left 0.5s;
    position: relative;
    height: 100%;
    overflow: hidden;
    display: flex;
  }

  .jindu {
    width: 33.33%;
    padding-left: 10px;
    height: 100%;
    overflow-y: auto;
  }

  .jilu {
    width: 33.33%;
    background: #f4f4f4;
    height: 100%;
    overflow-y: auto;
  }

  .xiangqing {
    width: 33.33%;
    background: #fff;
    height: 100%;
    overflow-y: auto;
  }

  .jilu_item {
    height: 60px;
    padding: 5px 15px;
    background: #fff;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    justify-content: space-between;
  }

  .jilu_l {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .jilu_r {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    color: #fe6549;
  }

  .total {
    margin-top: -7px;
    height: 40px;
    z-index: 2;
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /*.text {
    border-radius: 0;
    color: #ed5fa0;
    background: transparent;
    margin: 0 0;
    padding: 0 0;
    font-size: 16px;
    width: 50%;
    border-right: 1rpx solid #d9d9d9;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }*/

  button::after {
    content: none;
  }

</style>
