<template>
  <div class="warp">
    <div class="content">
      <div class="cell">
        <div class="l">项目名称：</div>
        <div class="r">{{payinfo.title}}</div>
      </div>
      <div class="cell">
        <div class="l">设 计 师：</div>
        <div class="r">{{payinfo.designer}}</div>
      </div>
      <div class="cell">
        <div class="l">费用类型：</div>
        <div class="r">{{payinfo.feetype}}</div>
      </div>
      <div class="cell">
        <div class="l">费　　用：</div>
        <div class="r">{{setmoney(payinfo.money)}}</div>
      </div>
      <div class="cell">
        <div class="l">备　　注：</div>
        <div class="r">{{payinfo.desc || '未填写'}}</div>
      </div>
      <div class="cell" style="justify-content: space-between">
        <router-link :to="{name : 'projectdetail',params:{id:demand_id}}" tag="div" class="l"
                     style="width: auto;color: #2570ff;font-size: 14px;">项目详情＞
        </router-link>
        <router-link :to="{name : 'user',query:{id:payinfo.designer_id}}" tag="div" class="r"
                     style="width: auto;color: #2570ff;font-size: 14px;">设计师详情＞
        </router-link>
      </div>
      <div class="desc_title">支付方式：</div>
      <div class="listwarp">
        <div @click="choose(index)" class="item" :class="{active : item.selected}" v-for="(item,index) in type">
          <div style="height: 100%;display: flex;align-items: center;"><img style="width: 30px;" :src="item.icon"
                                                                            alt="">　{{item.name}}
          </div>
          <img v-show="item.selected" style="width: 22px;" src="../assets/select@2x.png" alt="">
        </div>
      </div>

    </div>
    <div @click="pay" class="btn">去支付</div>
  </div>
</template>
<script>
  import pingpp from "pingpp-js"
  export default{
    data(){
      return {
        type: [
          {name: '支付宝', icon: "./static/css/alipay@2x.png", selected: true},
          {name: '公对公', icon: "./static/css/card@2x.png", selected: false},
          /*{name: '微信支付', icon: "./static/css/weixinpay@2x.png", selected: false}*/
        ],
        payinfo: {
          money: 0
        },
        demand_id: null,
        cashflow: null
      }
    },
    created(){
      this.demand_id = this.$route.query.demand_id
      this.cashflow = this.$route.query.cashflow
      showload("加载中")
      var code = getQueryString("code");
      if (code) {
        this.getuid(code)//微信登录
      } else {
        if (!token) {
          this.wxlogin();
        } else {
          this.authenticated();
        }
      }
    },
    methods: {
      wxlogin() {
        location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx35c4ce958bc7eb68&redirect_uri=https%3A%2F%2Fm.houxiaopang.com%2Fdemand%2F%23%2Freceipt%3fdemand_id%3d" + this.$route.query.demand_id + "%26cashflow%3d" + this.$route.query.cashflow + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
      },
      authenticated() {
        var that = this
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/wxfwh/token/clientauthenticated",
          token: true,
          timeout: 5000,
          success(res){
            if (res.code === 0) {
              if (!that.demand_id || !that.cashflow) {
                that.$router.push("/")
              } else {
                that.getpayinfo()
              }
            }
          },
          error(error){
            if (error.status === 401) {
              that.wxlogin();
            } else {
              hideload();
              showModal("网络拥挤，请稍后再试。")
            }
          }
        })
      },
      getuid(code) {
        var that = this;
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/wx_verfify_client",
          data: {
            code: code
          },
          timeout: 5000,
          success(res){
            if (res.code === 0) {
              window.localStorage.token = res.data.token
              location.href = "https://m.houxiaopang.com/demand/#/receipt?demand_id=" + that.$route.query.demand_id + "&cashflow=" + that.$route.query.cashflow;
            } else {
              showModal("登录失败，请重试。")
            }
            hideload();
          },
          error(){
            hideload();
            showModal("登录失败，请重试。")
          }
        })
      },
      setmoney(value){
        return value.toFixed(2) + " 元";
      },
      choose(idx){
        if (this.type[idx].selected) return
        this.type.forEach(function (item, index) {
          item.selected = false
          if (idx === index) {
            item.selected = true
          }
        })
      },
      getpayinfo(){
        var that = this
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/getclientrecord",
          data: {
            cashflow: this.cashflow
          },
          token: true,
          success: function (res) {
            if (res.code === 0) {
              that.payinfo = res.data;

            } else {
              showModal("网络拥挤，请稍后再试。")
            }
            hideload();
          },
          error: function () {
            showModal("网络拥挤，请稍后再试。")
            hideload();
          }
        })
      },
      pay(){
        var idx = 0;
        if (this.type[1].selected) idx = 1;
        if (idx === 0) {
          this.alipay();
        } else if (idx === 1) {
          this.$router.push("/prompt")
        }
      },
      alipay(){
        var that = this;
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/getalipaycharge",
          type: "post",
          data: {
            money: that.payinfo.money,
            channel: "alipay_wap",
            subject: that.payinfo.title,
            cashflow_id: that.cashflow,
            body: that.payinfo.feetype + " " + that.payinfo.desc
          },
          token: true,
          success: function (res) {
            if (res.code === 0) {
              pingpp.createPayment(res.data.charge, function (result, err) {
                if (result == "success") {
                  // 只有微信公众账号 (wx_pub)、QQ 公众号 (qpay_pub)、支付宝口碑 (alipay_qr)
                  // 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                  console.log(err)
                } else if (result == "fail") {
                  console.log(err)
                  // charge 不正确或者微信公众账号/QQ 公众号/支付宝口碑支付失败时会在此处返回
                } else if (result == "cancel") {
                  console.log(err)
                  // 微信公众账号、QQ 公众号、支付宝口碑支付取消支付
                }
              });
            } else {
              alert("网络拥挤，请稍后再试。")
            }
          },
          error: function () {
            alert("网络拥挤，请稍后再试。")
          }
        })
      }
    }
  }
</script>
<style scoped>
  .warp {
    padding: 20px 0;
    min-height: 100%;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    font-size: 16px;
  }

  .content {
    width: 300px;
    display: flex;
    flex-direction: column;
  }

  .desc_title {
    font-size: 16px;
    height: 40px;
    align-items: center;
    display: flex;
  }

  .cell {
    display: flex;
    align-items: center;
    padding: 5px 0;
  }

  .l {
    width: 90px;
    flex-shrink: 0;
    font-size: 16px;
    align-self: flex-start;
  }

  .r {
    width: 100%;
    flex-shrink: 1;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }

  .btn {
    font-size: 16px;
    width: 120px;
    height: 40px;
    display: flex;
    margin-top: 30px;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    color: #fff;
    background: #ff445b;
  }

  .listwarp {
    display: flex;
    flex-direction: column;
  }

  .listwarp > .item:first-child {
    margin-top: 0;
  }

  .item {
    margin-top: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    border: 1px solid #d9d9d9;
    padding: 0 15px;
    justify-content: space-between;
  }

  .active {
    border: 1px solid #2570ff;
  }
</style>
