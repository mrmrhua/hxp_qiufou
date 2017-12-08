<template>

  <div style="background: #f5f5f5;">
    <div style="overflow: hidden;position: relative;z-index:0;">
      <div style="position: absolute;top: 0;left: 0;background: rgba(0,0,0,0.6);height: 100%;width: 100%;"></div>
      <img style="display: block" width="100%" src="http://image.houxiaopang.com/demand/banner2.png" alt="">
    </div>
    <div class="biaodan">
      <div class="content">
        <div class="broker" id="cnzz_consult" @click="consult" title="点我咨询">
          <div class="pop-box" style="width: 140px;height:150px;right: -40px;border: 2px solid #D01667 ;">
            <div class="pop-content">
              <div class="doubt_content" style="text-align: center">
                <p style="margin-top: 16px">
                  <img src="../../static/img/head.png" alt="" style="width: 40px;height: 40px">
                </p>
                <p style="margin: 5px 0">经纪人：阿花</p>
                <p style="font-size: 14px;color: rgb(208, 22, 103)">咨询Ta</p>
              </div>
            </div>
            <div class="pop-triangle">
              <i></i>
            </div>
          </div>

        </div>
        <i @click="back" class="iconfont back" style="color: #D01667">&#xe7a1;<span> 返回</span></i>
        <p style="text-align: center;color: #d01667;font-size: 30px;">猴小胖项目报价单</p>
        <div class="content-detail">
          <p>项目名称：<span style="font-weight: 100;margin-left: 12px">{{info.title}}</span></p>
          <div style="margin-top: 25px">
            <p style="float: left"><span style="color: #333333;font-size: 18px;font-weight: bold;">项目介绍：</span></p>
            <div class="desc"  style="display: inline-block;margin-left: 12px" v-html="info.description"></div>
          </div>
          <p><span>工　　期：</span><span style="color:#313131;line-height: 26px;font-weight: 100;margin-left: 12px">{{info.howlong}}</span></p>
          <p><span>预　　算：</span><span style="color:#D01667;line-height: 26px;font-weight: 100;margin-left: 12px">￥{{info.howmuch}}</span></p>
          <p>参考图片：</p>
          <ul>
            <li class="li_img" @click="jump(item)" v-for="item in info.desc_img"><img :src="setimg(item)"  alt=""></li>
          </ul>
        </div>
        <div  id="pj" class="showbj" @click="show">
          我要报价 <span><img src="../../static/img/drop_down.png" alt=""></span>
        </div>
        <div class="bj_box" v-show="showfrom">
          <div style="border: 2px dashed #dedede;margin: 80px 0">
            <p style="margin: 25px 0; text-align: center;font-size:20px;color:rgba(51,51,51,1);line-height:27px;font-weight: bold;">报价流程</p>
            <div class="process_box">
              <div style="width: 110px;margin-left: 35px;"><p>设计师报价</p></div>
              <div><p><img src="../../static/img/return.png" alt=""></p></div>
              <div style="width: 130px;"><p>经纪人整理后报送给客户</p></div>
              <div><p><img src="../../static/img/return.png" alt=""></p></div>
              <div style="width: 130px;"><p>客户挑选并确定设计师</p></div>
              <div><p><img src="../../static/img/return.png" alt=""></p></div>
              <div style="width: 110px"><p>托管资金开始合作</p></div>
            </div>
          </div>


          <div class="input-group" style="position: relative;overflow:inherit;">
            <label>项目报价：</label>
            <input v-model="howmuch" type="text" placeholder="如：9999.00">
            <div style="position: absolute;top: 20px;left: 330px" @click.stop="showbjxzMethod">
              <!--<a style="color: #bbb;font-weight: 100">报价须知</a>-->
              <p style="text-decoration: underline;color: #bbb;cursor: pointer">报价须知</p>
              <div class="pop-box" v-show="show_bjxz" style="width: 300px;height:200px;border: 1px solid #bbb;top: -50px;left: 70px;background: rgba(0,0,0,0.7)">
                <div class="pop-content" style="color: #fff;">
                  <div class="doubt_content" style="text-align: left">
                    <p>1. 客户将根据您的报价和作品进行挑选，并直接将资金托管给猴小胖，因此请您务必填写准确报价。</p>
                    <p style="margin: 10px 0">2. 参考价格计算公式：预估所用时间＊您的时薪＊2，如预估用时6小时，目前时薪40元，总报价可为400-500。</p>
                    <p>3. 如果您对项目需求有任何疑问，请咨询猴小胖经纪人。</p>

                  </div>
                </div>
                <div class="pop-triangle-left">
                  <!--<i></i>-->
                </div>
              </div>
            </div>


          </div>
          <div class="input-group">
            <label>工期预估：</label>
            <input v-model="howlong" type="text" placeholder="如：1-2周">
          </div>
          <div class="input-group" style="position: relative;padding-bottom: 20px">
            <label>设计构想（选填）：</label>
            <textarea v-model="ideas" placeholder="描述您自己的设计想法"></textarea>
            <span style="position: absolute;right: 10px;bottom: -3px">{{ideas.length}}/500字</span>
          </div>
          <!--<div class="upload_box">
              <p style="font-size: 18px;font-weight: bold">上传作品：</p>
              <p>请提交您自己的类似风格作品，或是能够表现自己水平的作品，禁止使用他人设计的参考图</p>
              <p><a>1.从我的作品库里挑选</a></p>
              <p><a @click="showNowBox">2.直接上传</a></p>
              <div class="self_box">

              </div>
              <div class="nowup_box" style="width: 670px"  v-show="show_nowup">
                <div class="upfile" >
                  <div class="upwrapper">
                    <ul>
                      <li>
                        <section class="addbtn">
                          <img src="http://image.houxiaopang.com/baseform/721/addpic.jpg"
                               class="add-img">
                          <input type="file" name="file"
                                 value="" class="file" id="file"  @change="appendImg"
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
          </div>-->
          <div class="upload_box">
            <p style="font-size: 18px;font-weight: bold;text-align: left">投递作品集：<span style="font-size: 14px;font-weight: 100">已选择{{checkNum}}/3个作品</span></p>
            <div class="nowup_box" style="">
              <p style="text-align: right;margin: 10px;color: rgb(37, 112, 255);cursor: pointer"><router-link to="/newalbum" tag="div">上传作品</router-link></p>
              <ul>
                <li @click="checkLi(index)" v-for="(item,index) in projectalbum" style="position: relative">
                  <div class="img" style="overflow: hidden;"><img width="200" :src="item.url"/></div>
                  <p :title="item.title" v-html="item.title"></p>
                  <p v-html="item.type"></p>
                  <div class="zhezhao" v-show="item.choose">
                    <div style="position: absolute;top: 75px;left: 70px"><img src="../../static/img/check.png" alt=""></div>
                  </div>

                </li>
              </ul>
              <div  v-show="projectalbum.length === 0" style="text-align: center;margin-top: 70px;">
                <i class="iconfontyyy" style="font-size:200px;color: #bfbfbf;">&#xe617;</i>
                <p style="font-size: 16px;color: #bfbfbf;font-weight: 900;">你还没有创建过任何作品</p>
              </div>
            </div>
          </div>
          <div class="sendimg" @click="reply"><p>提交报价</p></div>
        </div>
      </div>

    </div>

    <!--扫描登录未完成-->
    <div class="modal" v-show="modalshow">
      <div class="login">
        <div style="text-align: right;padding: 0 20px;line-height: 30px;position: absolute;width: 100%;top:10px;"><span
          style="cursor: pointer;" @click="modalshow= false"><img src="../../static/img/cancel_show.png" /></span></div>
        <div id="wxqrcode"></div>
      </div>
    </div>
  </div>

</template>
<script>
  import imgthumb from "@/components/Imgthumb"
  export default {
    props:['show_bjxz'],
    data(){
      return {
        showfrom: false,
        info: {},
        modalshow: false,
        howmuch: '',
        howlong: '',
        ideas: '',
        prompt: false,
        status: 0,
        projectalbum: [],
        checkNum : 0
      }
    },
    components: {
      'imgthumb': imgthumb,
    },
    mounted(){
//      registerup(this);//初始化上传图片

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
      consult(){
        _czc.push(["_trackEvent", "咨询", "点击", "", "", "cnzz_consult"]);
        qimoChatClick();
      },
      /*chat(){
       //新窗口打开   咨询经纪人
       if (login) {//如果真，不需要判断token是否过期
       //判断用户状态码，
       //todo 需修改地址
       open("http://localhost/chat");
       } else {
       this.showlogin();
       }
       },*/
      back(){
        this.showfrom = false;
        document.getElementById("pj").className = "img";
        this.$router.push("/");
      },
      reply(){//提交表单
        if (this.howmuch == "") {
          alert("请填写项目报价");
          return;
        }
        if (this.howlong == "") {
          alert("请填写工期预算");
          return;
        }
        var checkLis = [];
        for(let i = 0 ;i <this.projectalbum.length;i++){
          if (this.projectalbum[i].choose){
            checkLis.push(this.projectalbum[i].id);
          }
        }

        if(checkLis.length === 0){
          alert("请至少选择上传一个作品")
          return
        }


        var replyform = {};
        replyform.howmuch = this.howmuch.trim();
        replyform.howlong = this.howlong.trim();
        replyform.ideas = this.ideas.trim();
        replyform.albumlist = JSON.stringify(checkLis);

        var that = this;
        $.ajax({
          type: "post",
          url: "http://www.houxiaopang.com/api/v1.1/replydemand",
          headers: {"Authorization": "Token " + token},
          data: {
            'demand_id': that.$route.params.id,
            'replyform': JSON.stringify(replyform),
          },
          success(data){
            if (data.code === 0) {
              alert("提交成功！");
              that.showform();
              window.scrollTo(0, 0);
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          },
          error(){
            alert("网络拥挤，请稍后再试···");
          }
        });
      },
      setimg(value){//根据七牛api,设置传回的图片
        return value + "?imageView2/1/w/210/h/210";//根据高宽等比集中裁剪
      },
      showform(){//显示、隐藏报价表单
        this.showfrom = !this.showfrom;
        /*if (this.showfrom) {
          document.getElementById("pj").className = "active";
        } else {
          document.getElementById("pj").className = "img";
        }*/

        this.getCollection(-1);
      },
      jump(value){
        open(value);
      },
      show(){
        if (login === true) {//如果真，不需要判断token是否过期
          //判断用户状态码，
          if (this.judgeStatus()) {
            //显示报价表单
            this.showform();
          }
        } else {
          this.showlogin();
        }
      },
      showhelp(){
        this.prompt = true;
      },
      judgeStatus(){//判断状态码
        // todo 添加 获取实名认证状态，状态为2 显示否则不显示。
        this.status = window.localStorage.applystatus;
//        var verify = window.localStorage.verify;
        if (this.status == 2) {//未验证是否已实名认证
          return true;
        } else {
//          this.showhelp();
          return false;
        }
      },
      showlogin(){//显示微信登录
        this.modalshow = true;
        var that = this;
        new WxLogin({
          id: "wxqrcode",
          appid: "wxbfacdb1b99885182",
          scope: "snsapi_login",
          redirect_uri: "http%3a%2f%2fhouxiaopang.com%2fdemand%2f%23%2fxunjia%2f" + that.$route.params.id,
          state: "",
          style: "",
          href: ""
        });
      },

      getCollection(c) {
        var that = this;
        $.ajax({
          type: "GET",
          data: {
            category: c
          },
          url: 'http://www.houxiaopang.com/api/v1.1/designerdash/collection',
          headers: {"Authorization": "Token " + token},
          timeout: 5000,
          success: function (data) {
            if (data.code === 0) {
              that.projectalbum = [];
              for (var i = 0, size = data.data.length; i < size; i++) {
                var json = data.data[i];
                var type = json.category;
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
                var obj = {
                  url: json.cover_url,
                  title: json.title,
                  id: json.album_id,
                  type: type,
                  choose:false
                };
                that.projectalbum.push(obj);
              }
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          },
          error(e){
            if (e.status === 401) {
              location.href = "http://houxiaopang.com/qrlogin";
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          }
        });
      },
      checkLi:function (index) {
          if(this.projectalbum[index].choose){
            this.projectalbum[index].choose = !this.projectalbum[index].choose;
            this.checkNum --;
            return
          }else {
            var Num = 0;
            for(let i=0;i<this.projectalbum.length;i++){
              if(this.projectalbum[i].choose){
                Num ++;
              }
            }
            if(Num < 3){
              this.projectalbum[index].choose = !this.projectalbum[index].choose;
              this.checkNum ++;
            }else {
              alert("您最多只能选择三个")
            }
          }


      },
      showbjxzMethod(){
        this.$emit("showbjxz");
      },


    }
  }
</script>
<style>
  ul{
    list-style: none;
  }
  .biaodan {
    z-index: 10;
    position: relative;
    padding-bottom: 50px;
  }

  .biaodan > .content {
    width: 1000px;
    background: #fff;
    padding: 60px 60px 130px 60px;
    box-sizing: border-box;
    margin: -200px auto 60px;
    position: relative;
  }

  .biaodan > .content > .broker {
    position: absolute;
    right: 50px;
    top: 100px;
    cursor: pointer;
  }

  .biaodan > .content > .back {
    color: #bbb;
  }

  .biaodan > .content > .back:hover {
    color: #313131;
  }

  .biaodan > .content > .content-detail{
    width: 670px;
    margin: 0 auto;
  }
  .biaodan > .content > .bj_box{
    width: 674px;
    margin: 0 auto;
  }

  .biaodan > .content > .content-detail >p {
    font-size: 18px;
    margin-top: 23px;
    color:#333333;
    line-height:19px;
    font-weight: bold;
  }

  .desc {
    font-size: 14px;
    line-height: 24px;
    width: 540px;

  }

  .desc > p {
    word-wrap: break-word;
    margin: 0 0 15px 0;
    color: #333;
  }

/*  .biaodan > .content > p:nth-of-type(2) {
    color: #313131;
    font-size: 26px;
    margin: 40px 0;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
    line-height: 90px;
  }*/

  .biaodan > .content > .content-detail > ul {
    list-style: none;
    overflow: hidden;
    margin-top: 30px;
  }

  .biaodan > .content > .content-detail > ul > li {
    float: left;
    margin-right: 23px;
    margin-bottom: 20px;
    width: 200px;
    height: 150px;
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



  .showbj{
    width:170px;
    height:50px;
    border: 1px solid #D01667;
    border-radius: 100px ;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    color: #D01667;
    margin: 50px auto;
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

/*
  .bj_box > div > p{
    text-align: center;
    font-size:20px;
    color:rgba(51,51,51,1);
    line-height:27px;
    font-weight: bold;
  }*/
  .bj_box > div> .process_box{
    text-align: center;
    overflow: hidden;
    margin-bottom: 50px;
  }
  .bj_box > div >.process_box > div:nth-child(2n+1){
    float: left;
    height:80px;
    border: 1px solid #D01667;
    border-radius: 10px ;
    font-size:14px;
    color:rgba(51,51,51,1);
    display: table;
  }
  .bj_box > div > .process_box > div:nth-child(2n){
    float: left;
    margin: 0 15px;
    height:80px;
    font-size:14px;
    color:rgba(51,51,51,1);
    display: table;
  }
  .bj_box > div > .process_box > div:nth-child(2n+1) >p{
    display: table-cell;
    vertical-align: middle;
    padding: 0 16px;
  }
  .bj_box > div > .process_box > div:nth-child(2n) >p{
    display: table-cell;
    vertical-align: middle;
  }
  .bj_box > div > .process_box > div:nth-child(2n) >p > img{
    -moz-transform:scaleX(-1);
    -webkit-transform:scaleX(-1);
    -o-transform:scaleX(-1);
    transform:scaleX(-1);
  }
  .bj_box  .input-group {
    margin-bottom: 20px;
    overflow: hidden;
  }

  .bj_box  .input-group > label {
    color: #333333;
    display: inline-block;
    font-size: 18px;
    line-height: 40px;
    font-weight: bold;
  }

  .bj_box  .input-group > input {
    outline: none;
    border: 1px solid #e0e0e0;
    height: 40px;
    font-size: 16px;
    padding-left: 10px;
  }
  .bj_box  .input-group > input:focus{
    border: 1px solid #4762FF;
  }


  ::-webkit-input-placeholder {
    color: #bfbfbf;
  }

  .bj_box  .input-group > textarea {
    width: 99%;
    border: 1px solid #e0e0e0;
    outline: none;
    font-size: 20px;
    padding: 10px;
    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "HeitiSC", "WenQuanYi Micro Hei", sans-serif;
    box-sizing: border-box;
    height: 300px;
    margin-top: 20px;
  }

  .bj_box > .upload_box{
    position: relative;
  }

  .bj_box > .upload_box > p{
    margin-bottom: 12px;
  }
  .bj_box > .upload_box > p > a{
    cursor: pointer;
  }

  .bj_box > .sendimg{
    width:170px;
    height:50px;
    border: 1px solid #D01667;
    border-radius: 100px ;
    margin: 50px auto;
    text-align: center;
    color: #D01667;
    cursor: pointer;
  }
  .bj_box > .sendimg:hover{
    background: #D01667;
    color: #fff;
  }

  .bj_box > .sendimg > p{
    line-height: 50px;
    font-size: 18px;
  }

  .upload_box > .nowup_box{
    width: 670px;
    height: 480px;
    border: 2px dashed #d6d6d6;
    overflow-y: auto;
  }
  .upload_box > .nowup_box > ul{
    margin-top: 15px;
  }
  .upload_box > .nowup_box > ul >li{
    float: left;
    margin-bottom: 20px;
    width: 200px;
    height: 200px;
    text-align: center;
    border: 1px solid #eee;
    overflow: hidden;
    cursor: pointer;
  }
  .upload_box > .nowup_box > ul >li:nth-child(3n-2){
    margin-left: 20px;
  }
  .upload_box > .nowup_box > ul >li:nth-child(3n-1){
    margin-left: 10px;
    margin-right: 10px;
  }
  .nowup_box > ul > li > p:nth-of-type(1) {
    height: 25px;
    line-height: 25px;
    font-size: 16px;
    padding-left: 8px;
    box-sizing: border-box;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }

  .nowup_box > ul > li > p:nth-of-type(2) {
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    padding-left: 8px;
    box-sizing: border-box;
    color: #bbb;
    text-align: left;
  }
  .nowup_box > ul > li > .zhezhao{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6)
  }
  .nowup_box > ul > li > .zhezhao_active{
    display: block;
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

  .pop-box {
    position: absolute;
    border-radius: 5px;
    background: #ffffff;
  }

  .doubt_content {
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0px;
    padding: 14px;
  }

  .pop-content {
    width: 100%;
    height: 100%;
  }

  .pop-triangle {
    position: absolute;
    top: 65px;
    right: -20px;
    display: block;
    height: 0;
    width: 0;
    font-size: 0;
    line-height: 0;
    border-color: transparent transparent transparent #D01667;
    border-style: dashed dashed dashed solid;
    border-width: 10px;
  }

  .pop-triangle i {
    position: absolute;
    top: -10px;
    left: -12px;
    display: block;
    height: 0;
    width: 0;
    font-size: 0;
    line-height: 0;
    border-color: transparent transparent transparent #fff;
    border-style: dashed dashed dashed solid;
    border-width: 10px;
  }

  .pop-triangle-left {
    position: absolute;
    top: 50px;
    left: -20px;
    display: block;
    height: 0;
    width: 0;
    font-size: 0;
    line-height: 0;
    border-color: transparent rgba(0,0,0,0.7) transparent transparent;
    border-style: dashed solid dashed dashed;
    border-width: 10px;
  }

  .pop-triangle-left i {
    position: absolute;
    top: -10px;
    right: -12px;
    display: block;
    height: 0;
    width: 0;
    font-size: 0;
    line-height: 0;
    border-color: transparent rgba(0,0,0,0.7) transparent transparent;
    border-style: dashed solid dashed dashed;
    border-width: 10px;
  }

</style>
