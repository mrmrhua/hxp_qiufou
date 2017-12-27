<template>
  <div style="min-height: 340px;">
    <p style="font-size: 20px;font-weight: 600;padding: 0 40px;"><i class="iconfontyyy"
                                                                    style="color:#888;font-size: 30px;font-weight: normal">&#xe603;</i><span
      style="display: inline-block;vertical-align: top;margin-left: 20px;">消息中心</span>
      <span class="msg_remove" @click="removemsg">
        <i class="iconfontyyy" style="font-size: 14px;">&#xe66d;</i>&nbsp;清空消息</span>
    </p>
    <p style="width: 100%;height: 1px;background: #bbb;margin-top: 20px;"></p>
    <div class="msg_main">
      <div v-show="notice.length == 0" style="text-align: center;color: #727272;padding: 20px 0;">
        您暂时没有收到任何消息！
      </div>
      <div class="msg_content" v-for="item in notice">
        <div class="msg_img">
          <img style="border-radius: 50%;" width="60%"
               src="http://image.houxiaopang.com//admin/logo/logo.png" alt="">
        </div>
        <div class="msg_text">
          <span style="font-size: 16px;" v-html="item.title"></span><span
          style="margin-left: 20px;font-size: 12px;color: #727272;" v-html="item.up_time"></span>
          <div class="msg_box" style="max-height: 57px;">
            <div class="msg_con" v-html="item.content"></div>
            <div class='msg_zz'>
              <p onclick='showmsginfo(this)' class='oc'>
                <i class='iconfontyyy'>&#xe610;</i>
                <span>展开</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mymodal" v-show="delmodel">
      <div class="conte">
        <div style="background: #bbb;height: 30px;line-height: 30px;padding: 0 15px;">
          <span style="color: #fff;">删除提醒</span><span
          style="float: right;cursor: pointer"
          @click="delmodel=false"><i class="iconfontyyy">&#xe67c;</i></span>
        </div>
        <div style="position: relative">
          <i class="iconfontyyy" style="display: inline-block;font-size: 90px;margin-left: 10px;margin-top: 5px;">&#xe691;</i>
          <p style="position: absolute;top: 20px;left: 110px;font-size: 18px;">确定删除所有消息？</p>
          <div style="height: 30px;line-height: 30px;position: absolute;top: 65px;left: 150px;">
            <span
              style="display: inline-block;background: #d01667;padding: 0 15px;color: #fff;cursor: pointer;"
              @click="remove">确定</span>
            <span @click="delmodel=false" style="display: inline-block;padding: 0 15px;cursor: pointer;">取消</span>
          </div>
        </div>
      </div>
    </div>
    <prompt prompt="success" :promptshow="promptshow"></prompt>
  </div>
</template>
<script>
  import prompt from "@/components/Prompt"
  export default{
    data(){
      return {
        notice: [],
        delmodel: false,
        promptshow: false,
      }
    },
    components: {
      prompt
    },
    created(){
      this.init()
    },
    methods: {
      init(){
        if (login) {
          this.getinfo();
        } else {
          var that = this;
          setTimeout(function () {
            that.init()
          }, 1000)
        }
      },
      getinfo(){ //获取所有消息
        var that = this;
        $.ajax({
          url: "http://www.houxiaopang.com/api/v1.1/designerdash/notice/all",
          type: "GET",
          headers: {"Authorization": "Token " + token},
          success(data) {
            that.notice = [];
            if (data.code === 0) {
              for (var i = 0, size = data.data.notice.length; i < size; i++) {
                that.notice.push(data.data.notice[i]);
                that.$nextTick(function () {
                  var msg_cons = document.querySelectorAll(".msg_con");
                  msg_cons.forEach(function (item, index) {
                    if (item.clientHeight <= 57) {
                      item.nextElementSibling.style.display = "none";
                    }
                  });
                });
              }
            } else {
              hxpAlert.show("网络拥挤，请稍后再试···");
            }
          },
          error(){
            hxpAlert.show("网络拥挤，请稍后再试···");
          }
        });
      },
      remove(){ // 清空消息
        var that = this;
        that.delmodel = false;
        $.ajax({
          type: "post",
          url: "http://www.houxiaopang.com/api/v1.1/designerdash/notice/removeall",
          headers: {"Authorization": "Token " + token},
          success(data){
            if (data.code === 0) {
              that.promptshow = true;
              setTimeout(function () {
                that.promptshow = false;
                that.notice = [];
              }, 1000);
            } else {
              hxpAlert.show("网络拥挤，请稍后再试···");
            }

          },
          error(){
            hxpAlert.show("网络拥挤，请稍后再试···");
          }
        });
      },
      removemsg(){ // 删除提示
        this.delmodel = true;
      }
    }
  }
</script>
<style scoped>
  .msg_main {
    width: 800px;
    margin: 0 auto;
    padding: 20px 0;
  }

  .msg_content {
    overflow: hidden;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #bbb;
  }

  .msg_remove {
    display: inline-block;
    vertical-align: top;
    float: right;
    font-size: 14px;
    color: #787878;
    font-weight: normal;
    cursor: pointer;
  }

  .msg_remove:hover {
    color: #d01667;
  }

  .msg_content:last-of-type {
    border-bottom: none;
  }

  .msg_content > .msg_img {
    width: 10%;
    float: left;
  }

  .msg_content > .msg_text {
    width: 90%;
    float: left;
  }

  .msg_zz {
    overflow: hidden;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: right;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 1));
  }

  .msg_zz p {
    cursor: pointer;
  }

  .msg_zz span {
    display: inline-block;
    vertical-align: top;
  }

  .msg_box {
    position: relative;
    width: 100%;
    color: #727272;
    margin-top: 10px;
    overflow: hidden;
  }

  .msg_con {
    width: 90%;
  }

  .oc {
    float: right;
  }

  .oc:hover {
    color: #d01667;
  }

  .mymodal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mymodal > .conte {
    width: 350px;
    height: 140px;
    overflow: hidden;
    background: #FFF;
    border-radius: 5px;
    padding: 0 0;
  }
</style>
