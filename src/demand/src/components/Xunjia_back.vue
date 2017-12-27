<template>
  <div style="background: #f5f5f5;">
    <div style="overflow: hidden;position: relative;">
      <div style="position: absolute;top: 0;left: 0;background: rgba(0,0,0,0.6);height: 100%;width: 100%;"></div>
      <img style="display: block" width="100%" src="http://image.houxiaopang.com/demand/banner2.png" alt="">
    </div>
    <div class="biaodan">
      <div class="content" style="margin-bottom: 0">
        <div id="cnzz_consult" class="broker" @click="consult" title="点我咨询">
          <p style="float: left;overflow: hidden;margin-right: 15px;text-align: center">
            <span class="zixun">点我咨询</span>
            <span style="display:block;vertical-align: top;line-height: 22px;color: #cecece;">猴小胖经纪人</span>
          </p>
          <img style="border-radius: 50%;width: 50px;" src="http://userhead.houxiaopang.com/broker/broker.png" alt="">
        </div>
        <p>猴小胖项目邀约</p>
        <p>{{info.title}}</p>
        <div class="desc" v-html="info.description"></div>
        <!--<p>营销平台的手机APP开发</p>
        <p>二、主要功能点</p>
        <p>发布游戏、查看游戏详情</p>
        <p>三、可参考产品</p>
        <p>支付宝AR红包</p>-->
        <p v-show="info.howlong!==''&&info.howlong"><i class="iconfont"
                                                       style="font-size: 19px;">&#xe693;</i><span> 工期：</span><span
          style="color:#313131;line-height: 26px;">{{info.howlong}}</span></p>
        <p v-show="info.howmuch!==''&&info.howmuch"><i class="iconfont"
                                                       style="font-size: 19px;">&#xe613;</i><span> 预算：</span><span
          style="color:#313131;line-height: 26px;">{{info.howmuch}}</span></p>
        <ul v-show="info.desc_img.length > 0">
          <li class="li_img" @click="jump(item)" v-for="item in info.desc_img"><img :src="setimg(item)" alt=""></li>
        </ul>
        <div id="pj" class="img" @click="show"></div>
      </div>
      <div style="width: 1000px;margin: 0 auto;overflow: hidden;line-height: 30px;">
        <a class="el_a"
           href="http://www.houxiaopang.com/landpage"><i class="iconfont">&#xe60e;</i>&nbsp;我想在以后收到更多这样的项目推送</a>
      </div>
      <div class="content" style="margin-top: 60px;" v-show="showfrom">
        <div class="input-group">
          <label>昵　　称：</label>
          <input v-model="nickname" type="text" placeholder="请输入您的昵称">
        </div>
        <div class="input-group">
          <label>项目报价：</label>
          <input v-model="howmuch" type="text" placeholder="如：9999元">
        </div>
        <div class="input-group">
          <label>工期预估：</label>
          <input v-model="howlong" type="text" placeholder="如：1-2周">
        </div>
        <div class="input-group">
          <label>联系电话：</label>
          <input v-model="tel" type="text" placeholder="请输入您的电话号码">
        </div>
        <div class="input-group">
          <label>设计构想（选填）：</label>
          <textarea v-model="ideas" style="resize: none;" placeholder="简略描述你的设计构想，能加大被客户选中的概率哦！"></textarea>
        </div>
        <div class="input-group">
          <label>上传类似作品：</label><span style="color: #999;">（3张以内）</span>
          <div style="overflow: hidden;margin-top: 20px;">
            <div class="upfile">
              <div class="upwrapper">
                <ul>
                  <li>
                    <section class="addbtn">
                      <img src="http://image.houxiaopang.com/baseform/721/addpic.jpg"
                           class="add-img">
                      <input type="file" name="file"
                             value="" class="file" id="file" @change="appendImg"
                             accept="image/jpg,image/jpeg,image/png,image/gif" multiple/>
                    </section>
                  </li>
                  <imgthumb @img_url="rm" v-for="(item,index) in img_url" v-bind:index="index"
                            v-bind:each_file="item" :key="index">
                  </imgthumb>
                </ul>
                <div id="tt" class="btn" style="display:none"></div>
              </div>
            </div>
          </div>
        </div>
        <!--<p style="color: #727272;font-size: 20px;">猴小胖说明</p>
        <p style="font-size: 18px;color:#727272;margin-bottom: 0;margin-top: 20px;">1.我们将会从中收取一定的服务费</p>
        <p class="shuoming">2.服务费</p>
        <p class="shuoming">3.服务费</p>-->
        <div class="btn_image" @click="reply">提交报价</div>
      </div>
    </div>
    <div class="model" v-show="modal">
      <div class="waiting-check">
        <p style="position:absolute;top: 20px;height: 20px;line-height:20px;width: 100%;padding:0 40px;"><span
          style="float: right;cursor: pointer;color: #000;" @click="close()">X</span></p>
        <img src="http://image.houxiaopang.com/baseform/721/suc1.png" width="250">
        <h2 style="color:#313131;margin-top: 50px;margin-bottom: 30px;">您已成功提交报价!</h2>
        <p style="color: #797979;font-size: 14px;">若您被客户选中，我们将第一时间联系您。入驻猴小胖，获取更多项目推送!</p>
      </div>
    </div>


  </div>
</template>
<script>
  import imgthumb from "@/components/Imgthumb"
  export default {
    data(){
      return {
        showfrom: false,
        info: {
          howmuch: '',
          howlong: '',
          desc_img: []
        },
        howmuch: '',
        howlong: '',
        ideas: '',
        status: 0,
        tel: '',
        img_url: [],
        nickname: '',
        modal: false,
        flag: true,
      }
    },
    components: {
      'imgthumb': imgthumb,
    },
    mounted(){
      var loginuser = window.localStorage.houxiaiopanguser
      if (loginuser) {
        this.nickname = JSON.parse(loginuser).nickname;
      }
      registerup(this);//初始化上传图片
    },
    created(){
      var that = this;
      $.ajax({
        url: 'http://www.houxiaopang.com/api/v1.1/demanddetail',
        type: "GET",
        data: {'demand_id': that.$route.params.id},
        success: function (data) {
          if (data.code === 0) {
            that.info = data.data;
          } else {
            alert("网络拥挤，请稍后再试···");
          }
        },
      });
    },
    watch: {
      '$route'(){
        var that = this;
        if (this.$route.query.code) {
          $.ajax({
            url: 'http://www.houxiaopang.com/api/v1.1/wx_verify',
            type: "GET",
            data: {'code': that.$route.query.code},
            success: function (data) {
              if (data.code === '0') {
                window.localStorage.token = data.data.token;
                token = data.data.token;
                if (data.data.applystatus === 0) {
                  location.href = "http://houxiaopang.com/apply";
                } else {
                  window.localStorage.applystatus = data.data.applystatus;
                  location.assign("http://houxiaopang.com/demand/#/xunjia/" + that.$route.params.id);
                  window.location.reload();
                }
              } else {
                alert('微信授权失败');
                location.assign("http://houxiaopang.com/demand/#/xunjia/" + that.$route.params.id);
                window.location.reload();
              }
            },
            error: function () {
              alert("网络拥挤，请稍后再试···");
            }
          });
        }
      }
    },
    methods: {
      close(){
        this.modal = false;
      },
      back(){
        this.showfrom = false;
        document.getElementById("pj").className = "img";
        this.$router.push("/");
      },
      reply(){//提交表单
        if (this.howmuch == "") {
          alert("请填写昵称");
          return;
        }
        if (this.howmuch == "") {
          alert("请填写项目报价");
          return;
        }
        if (this.howlong == "") {
          alert("请填写工期预算");
          return;
        }
        if (!(/^1[34578]\d{9}$/.test(this.tel.trim()))) {
          alert("请填写有效的联系方式");
          return;
        }
        var replyform = {};
        replyform.nickname = this.nickname;
        replyform.howmuch = this.howmuch.trim();
        replyform.howlong = this.howlong.trim();
        replyform.ideas = this.ideas.trim();
        replyform.tel = this.tel.trim();
        if (login === true) {
          var user = eval("(" + window.localStorage.houxiaiopanguser + ")");
          replyform.user_id = user.userid;
        }
        replyform.worklist = JSON.stringify(this.img_url);
        var that = this;
        if (this.flag) {
          this.flag = false;
          $.ajax({
            type: "post",
            url: "http://www.houxiaopang.com/api/v1.1/replydemand_tmp",
            data: {
              'demand_id': that.$route.params.id,
              'replyform': JSON.stringify(replyform),
            },
            success(data){
              if (data.code === 0) {
                that.showform();
                window.scrollTo(0, 0);
                that.modal = true;
              } else {
                alert("网络拥挤，请稍后再试···");
              }
              this.flag = true;
            },
            error(){
              alert("网络拥挤，请稍后再试···");
              this.flag = true;
            }
          });
        }
      },
      setimg(value){//根据七牛api,设置传回的图片
        return value + "?imageView2/1/w/210/h/210";//根据高宽等比集中裁剪
      },
      showform(){//显示、隐藏报价表单
        this.showfrom = !this.showfrom;
        if (this.showfrom) {
          _czc.push(["_trackEvent", "报价", "点击", "", "", "pj"]);
          document.getElementById("pj").className = "active";
        } else {
          document.getElementById("pj").className = "img";
        }
      },
      jump(value){
        open(value);
      },
      rm(index){
        this.img_url.splice(index, 1);
      },
      show(){
        this.showform();//显示表单
      },
      appendImg: function () {
        var file_input = document.getElementById("file");
        if (file_input.files.length > 3 || this.img_url.length === 3) {
          alert("3张以内");
          return;
        }
        for (var i = 0, size = file_input.files.length; i < size; i++) {
          // todo 直接上传  img .length  带上loading    imgutl[]
          uploader.addFile(file_input.files[i]);
        }
      },

      consult(){
        _czc.push(["_trackEvent", "咨询", "点击", "", "", "cnzz_consult"]);
        qimoChatClick();
      }
    }
  }
</script>
<style>
  .biaodan {
    z-index: 10;
    position: relative;
    padding-bottom: 50px;
  }

  .biaodan > .content {
    width: 1000px;
    background: #fff;
    padding: 60px 60px;
    box-sizing: border-box;
    margin: -200px auto 60px;
    position: relative;
  }

  .biaodan > .content > .broker {
    position: absolute;
    right: 50px;
    top: 90px;
    cursor: pointer;
  }

  .biaodan > .content > .back {
    color: #bbb;
  }

  .biaodan > .content > .back:hover {
    color: #313131;
  }

  .biaodan > .content > p {
    color: #727272;
    font-size: 18px;
    margin-top: 40px;
    line-height: 24px;

  }

  .desc {
    font-size: 18px;
    margin-top: 20px;
    line-height: 1.5;
  }

  .desc > p {
    word-wrap: break-word;
    margin: 0 0 15px 0;
    color: #333;
  }

  .biaodan > .content > p:nth-of-type(1) {
    color: #d01667;
    font-size: 30px;
  }

  .biaodan > .content > p:nth-of-type(2) {
    color: #313131;
    font-size: 26px;
    margin: 40px 0;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
    line-height: 90px;
  }

  .biaodan > .content > ul {
    list-style: none;
    overflow: hidden;
    margin-top: 30px;
  }

  .biaodan > .content > ul > li {
    float: left;
    margin-right: 10px;
    width: 210px;
    height: 210px;
    text-align: center;
    border: 1px solid #eee;
    overflow: hidden;
    cursor: pointer;
  }

  .li_img {
    opacity: 1;
  }

  .li_img:hover {
    opacity: 0.7;
  }

  .biaodan > .content > .img {
    background: url("http://image.houxiaopang.com/demand/baojia_nml.png");
    background-size: cover;
    width: 200px;
    height: 52px;
    margin: 90px auto 30px auto;
    cursor: pointer;
  }

  .biaodan > .content > .active {
    width: 200px;
    height: 52px;
    margin: 90px auto 30px auto;
    cursor: pointer;
    background: url("http://image.houxiaopang.com/demand/baojia_ovr.png");
    background-size: cover;
  }

  .btn_image {
    width: 200px;
    height: 52px;
    cursor: pointer;
    border-radius: 25px;
    text-align: center;
    line-height: 52px;
    color: #d01667;
    background-color: #fff;
    border: 1px solid #d01667;
    margin: 30px auto;
    font-size: 24px;
  }

  .btn_image:hover {
    color: #fff;
    background: linear-gradient(to right, #d01667, #fe6549);
    border: none;
  }

  .content > .input-group {
    margin-bottom: 50px;
    overflow: hidden;
  }

  .content > .input-group > label {
    color: #d01667;
    display: inline-block;
    font-size: 24px;
    line-height: 45px;
  }

  .content > .input-group > input {
    outline: none;
    border: 1px solid #999;
    height: 45px;
    font-size: 20px;
    padding-left: 10px;

  }

  ::-webkit-input-placeholder {
    color: #bfbfbf;
  }

  .content > .input-group > textarea {
    width: 99%;
    border: 1px solid #999;
    outline: none;
    font-size: 20px;
    padding-left: 10px;
    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "HeitiSC", "WenQuanYi Micro Hei", sans-serif;
    box-sizing: border-box;
    height: 300px;
    margin-top: 20px;
  }

  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 100;
  }

  .modal > .login {
    width: 403px;
    height: 433px;
    margin: 100px auto;
    background: #fff;
    position: relative;
    padding: 15px 0;
  }

  #wxqrcode {
    width: 302px;
    margin: 0 auto;
  }

  .prompt {
    margin-top: 60px !important;
    height: 395px;
    background: url('http://image.houxiaopang.com/demand/prompt.png') no-repeat !important;
    background-size: 100% !important;
  }

  .prompt > .prompt_help {
    font-size: 20px;
    line-height: 50px;
    background: linear-gradient(to right, #fe6549, #d01667);
    width: 500px;
    margin: 63px auto;
    text-align: center;
    border-radius: 5px;
    color: #fff;
  }

  .upfile {
    border: 2px dashed #e0e4e8;
    padding: 30px 15px;
    float: left;
  }

  .addbtn {
    width: 200px;
    height: 150px;
    display: inline-block;
    position: relative;
    cursor: pointer;
  }

  .addbtn .file {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    cursor: pointer;
  }

  .addbtn .add-img {
    width: 100%;
    height: 100%;
  }

  .add-img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .addbtn > .zhezhao {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: silver;
    text-align: center;
    line-height: 150px;
    display: none;
  }

  .upwrapper > ul {
    list-style: none;
  }

  .upwrapper > ul > li {
    float: left;
    width: 200px;
    height: 150px;
    margin-right: 15px;
    margin-bottom: 15px;
  }

  .upwrapper > ul > li:nth-child(4n+0) {
    margin-right: 0;
  }

  .waiting-check {
    text-align: center;
    color: rgb(83, 126, 136);
    padding: 60px 0;
    background: #fff;
    width: 800px;
    margin: 100px auto;
    border-radius: 15px;
    position: relative;
  }

  .waiting-check h1 {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .model {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1024;
    background: rgba(0, 0, 0, 0.6);
  }

  .el_a {
    float: right;
    color: #787878;
    text-decoration: none
  }

  .el_a:hover {
    color: #d01667;
  }

  .zixun {
    display: block;
    vertical-align: top;
    line-height: 22px;
    border: 1px solid #d01667;
    margin: 3px 0;
  }

  .zixun:hover {
    background: #d01667;
    color: #fff;
  }
</style>
