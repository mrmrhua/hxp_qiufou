<template>
  <div class="warp">
    <div class='head'>
      <div class="sc_title">
        <span
          style='flex-shrink:1;width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'>
          <span style="font-size:20px;">{{post.title}}</span>
          <div style="margin-top: 5px;">客户：{{post.client}}</div>
        </span>
        <div @click="collect" class='btn_sm'>发起收款</div>
      </div>
    </div>
    <div class="topbar">
      <span @click="choose(index)" v-for="(item,index) in tabbar" :class="{active:item.active}">{{item.name}}</span>
    </div>
    <div class='schedule'>
      <div class="cont_warp" :style="{left:left}">
        <!--进度-->
        <div class="jindu">
          <div class="jindu_warp">
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
              <div class='detail' @click="showimgview(item.imglist,0)">
                <div class='context'>{{item.desc}}</div>
                <div class='imglist'>
                  <div class='imgwarp' v-for="(imgitem,imgindex) in item.imglist" v-if="imgindex < 2">
                    <img :src="imgitem+'?imageView2/1/w/200/h/150'">
                  </div>
                </div>
                <div class='total'>点击查看</div>
              </div>
            </div>
          </div>
          <div @click="shareyem" class="jindu_btn">分享给客户</div>
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
                <li @click="showimgview(demanddetail.desc_img,index)" v-for="(item,index) in demanddetail.desc_img"
                    style="overflow:hidden;width: 49%;height: 100px;background: #000;margin-bottom: 5px;">
                  <img style="width: 100%;" :src="item+'?imageView2/1/w/200/h/150'" alt="">
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="none" v-show="post.postlist.length === 0&&tabbar[0].active">
      <div class="none-img">
        <!--<img class="logo" src='../../assets/none.png'>-->
        <span style='color:#999;'>还没有上传过进度稿哦</span>
      </div>
    </div>
    <transition name="slide-fade" class="fadeView">
      <div v-if="show">
        <image-view :imgArr="works" :showImageView="true" :imageIndex="imageIndex"
                    v-on:hideImage="show = false"></image-view>
      </div>
    </transition>
  </div>
</template>
<script>
  import imageview from "../ImageView.vue"

  export default {
    data() {
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
        imageIndex: 0
      }
    },
    components: {
      'image-view': imageview
    },
    created() {
      if (login && window.localStorage.applystatus != "2") {
        this.$router.push("/alert")
        return
      }
      this.init();
    },
    methods: {
      shareyem(){
        wxshear(1);
      },
      init(){
        if (login) {
          this.project_id = this.$route.query.id
          if (!this.project_id) {
            this.$router.push("/project")
          } else {
            showload("加载中")
            this.getinfo(this.project_id)
          }
        } else {
          var that = this;
          setTimeout(function () {
            that.init();
          }, 500);
        }
      },
      showimgview(value, index) {
        this.imageIndex = index
        this.works = value
        this.show = true
      },
      collect() {
        this.$router.push({
          path: "/collect",
          query: {
            id: this.project_id,
            title: this.post.title,
            name: this.post.client
          }
        })
      },
      getdemanddetail() {
        var that = this
        var id = this.post.demand_id
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/demanddetail",
          data: {demand_id: id},
          success(res) {
            that.demanddetail = res.data
            hideload()
          },
          error() {
            hideload()
            showModal("网络拥挤，请稍候再试")
          }
        })
      },
      choose(idx) {
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
            showload()
            this.getpayinfo(this.project_id)
          }
          this.left = "-100%";
        } else if (idx === 2) {
          if (!this.demanddetail.title) {
            showload()
            this.getdemanddetail()
          }
          this.left = "-200%";
        }
      },
      setMoney(value) {
        return value > 0 ? "+" + value.toFixed(2) : "-" + value.toFixed(2)
      },
      getpayinfo(id) {
        var that = this
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/designer/getcashflow",
          token: true,
          data: {
            project_id: id
          },
          success(res) {
            that.cashflow = res.data.cashflow
            hideload()
          },
          error() {
            hideload()
            showModal("网络拥挤，请稍候再试")
          }
        })
      },
      getinfo(id) {
        var that = this
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/wxfwh/projectpage",
          data: {
            project_id: id
          },
          token: true,
          success(res) {
            if (res.code === 0) {
              that.post = res.data
              share(that.post.title, id)
            } else {
              showModal("网络拥挤，请稍候再试")
            }
            hideload()
          },
          error() {
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

  .jindu_warp {
    position: absolute;
    top: 0;
    width: 100%;
    bottom: 40px;
    overflow-y: auto;
    padding-left: 10px;
  }

  .jindu_btn {
    position: absolute;
    height: 40px;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fe6549;
    color: #fff;
  }

  .jindu_btn:active {
    opacity: 0.6;
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

  .btn_sm:active {
    opacity: 0.6;
  }

  .share:active {
    opacity: 0.6;
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

  .share {
    position: absolute;
    bottom: 0;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fe6549;
    color: #fff;
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
    height: 100%;
    overflow: hidden;
    position: relative;
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
