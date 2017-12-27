<template>
  <div class="rz_warp">
    <div style="font-size: 18px;margin-bottom: 20px;">实名认证</div>
    <div style="border-top: 1px solid #dedede;"></div>
    <div class="content" id="submitData" v-if="flag===0">
      <div class="flow-box">
          <img src="http://image.houxiaopang.com/auth/img/flow1.png" alt="" style="margin-bottom: 16px">
        <p style="position: absolute;left: 95px">提交材料</p>
        <p style="position: absolute;left: 370px">人工审核</p>
        <p style="position: absolute;right: 95px">实名结果</p>
      </div>
      <form class="content_form">
        <div class="context">
          <label>真实姓名</label>
          <input  v-model="success.name" type="text" style="width: 180px">
        </div>
        <div class="context">
          <label>身份证号码</label>
          <input  v-model="success.card" type="text" style="width: 180px">
        </div>
        <div class="context">
          <label>身份证信息面照片</label>
          <div style="float: left">
            <div class="upfile">
              <div class="shadow">
                <div><img src="http://image.houxiaopang.com/auth/img/addPic.png" alt=""></div>
                <input type="file" name="file"
                       value="" class="file" id="frontFile"  @change="appendImg('frontFile')"
                       accept="image/jpg,image/jpeg,image/png,image"/>
              </div>
              <div class="upwrapper">
                <section class="addbtn" id="frontSide">
                  <img id="frontSideImg" src="http://image.houxiaopang.com/auth/img/frontSide.png" class="add-img">
                </section>
              </div>
            </div>
          </div>
          <div class="attention-box">
            <p>1.上传文件格式支持png，jpg</p>
            <p>2.文件大小不超过10MB</p>
            <p>3.拍照时对焦点请置于身份证上，保证身份证信息清晰且未遮挡</p>
            <p>4.文件为数码照片，请勿进行美化和修改，以免申请失败</p>
          </div>
        </div>
        <div class="context">
          <label>身份证国徽面照片</label>
          <div style="float: left;">
            <div class="upfile" style="padding-right: 30px;">
              <div class="shadow">
                <div><img src="http://image.houxiaopang.com/auth/img/addPic.png" alt=""></div>
                <input type="file" name="file"
                       value="" class="file" id="backFile"  @change="appendImg('backFile')"
                       accept="image/jpg,image/jpeg,image/png,image" />
              </div>
                <div class="upwrapper">
                  <section class="addbtn" id="backSide">
                    <img id="backSideImg" src="http://image.houxiaopang.com/auth/img/backSide.png" class="add-img">
                  </section>
                </div>
            </div>
          </div>
          <div class="attention-box">
            <p>1.上传文件格式支持png，jpg</p>
            <p>2.文件大小不超过10MB</p>
            <p>3.拍照时对焦点请置于身份证上，保证身份证信息清晰且未遮挡</p>
            <p>4.文件为数码照片，请勿进行美化和修改，以免申请失败</p>
          </div>
        </div>
        <div style="text-align: center">
          <p style="font-size: 14px;color:rgba(255,68,91,1);">您的照片仅用于猴小胖平台的实名认证，不会用于其他商业用途或泄露给第三方，请您放心！</p>
        </div>
        <div id="submit_btn" class="btn_image" @click="submitForm">提交</div>
      </form>

    </div>
    <div class="content" id="reView" v-if="flag===1">
      <div class="flow-box">
        <img src="http://image.houxiaopang.com/auth/img/flow2.png" alt="" style="margin-bottom: 16px">
        <p style="position: absolute;left: 95px">提交材料</p>
        <p style="position: absolute;left: 370px">人工审核</p>
        <p style="position: absolute;right: 95px">实名结果</p>
      </div>
      <div class="Result-box">
        <p>提交成功</p>
        <p>工作人员将会在1-2个工作日内完成审核</p>
      </div>
    </div>
    <div class="content" id="Result" v-if="flag===2 || flag===-1">
      <div class="flow-box">
        <img src="http://image.houxiaopang.com/auth/img/flow3.png" alt="" style="margin-bottom: 16px">
        <p style="position: absolute;left: 95px">提交材料</p>
        <p style="position: absolute;left: 370px">人工审核</p>
        <p style="position: absolute;right: 95px">实名结果</p>
      </div>
      <div class="Result-box" id="Result-suc" v-if="flag===2">
        <p>恭喜您，已完成实名认证</p>
        <div><label>姓名:</label><p>{{success.name}}</p></div>
        <div><label>身份证号码:</label><p>{{success.card}}</p></div>
      </div>
      <div class="Result-box" id="Result-err" v-if="flag===-1">
        <p>认证失败！</p>
        <p>您提交的信息有误，请<a href="javascript:;" @click="flag=0" style="text-decoration: none;color: #1D54FF;cursor: pointer">重新认证</a></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        flag:0,
        ban_flag:false,
        success:{
          name:"",
          card:""
        }
      }
    },
    methods:{
      submitForm: function () { // 提交表单
        if(document.getElementById("frontFile").files.length !== 1 || document.getElementById("backFile").files.length !== 1
          || this.success.name.trim() ==='' || this.success.name === null || this.success.card.trim() ==='' || this.success.card === null){
          hxpAlert.show("请将表单信息提写完整后再提交信息");
          return ;
        }
        var fd  = new FormData();
        fd.append("cardimgup",document.getElementById("frontFile").files[0])
        fd.append("cardimgdown",document.getElementById("backFile").files[0])
        fd.append("name",this.success.name)
        fd.append("card",this.success.card)
        if(!this.ban_flag) {
          this.ban_flag = true;
          var that = this ;
          ajax({
            type: "file",
            timeout: -1,
            url: 'http://www.houxiaopang.com/api/v1.2/verified/addverified',
            data: fd,
            token: true,
            success(res) {
              if (res.code === 0) {
                that.flag = 1;
              } else {
                hxpAlert.show("网络拥挤，请稍后再试。")
              }
              that.ban_flag = false;
            },
            error() {
              that.ban_flag = false;
              hxpAlert.show("网络拥挤，请稍后再试。")
            }
          })
        }else {
          hxpAlert.show("请等待表单提交")
        }
      },
      appendImg: function (id) { // 图片上传
        var file_input = document.getElementById(id).files[0];
        var url = window.URL.createObjectURL(file_input);
        if(id === 'frontFile'){
          document.getElementById("frontSideImg").src = url
        }else {
          document.getElementById("backSideImg").src = url
        }

      },
    },
    created(){
      var that = this;
      /*实名认证获取状态*/
      ajax({
        url: "http://www.houxiaopang.com/api/v1.2/verified/getverified",
        token : true,
        timeout:6000,
        success(res){
          if (res.code === 0) {
              that.flag = res.data.status;
              if(that.flag === 2){
                that.success = res.data.verified;
              }
          } else {
            hxpAlert.show("网络拥挤，请稍后再试!")
          }
        },
        error(){
          hxpAlert.show("网络拥挤，请稍后再试！")
        }
      })
    }
  }

</script>
<style scoped>
  .rz_warp {
  }

  .flow-box{
    text-align: center;
    position: relative;
    margin: 47px 0px 27px;
  }

  .content_form {
    width: 800px;
    margin: 0 auto;
    padding: 40px 0;
    box-sizing: border-box;
  }
  .content > .content_form > .context {
    overflow: hidden;
    line-height: 30px;
    margin-bottom: 40px;
    position: relative;
  }

  .context > label {
    width: 20%;
    float: left;
    display: block;
    text-align: right;
    padding-right: 20px;
    box-sizing: border-box;
  }

  .context > input {
    width: 80%;
    outline: none;
    padding-left: 10px;
    box-sizing: border-box;
    display: block;
    height: 30px;
    border: 1px solid #cbd5dd;
    border-radius: 2px;
    font-size: 14px;
  }

  .context > input:focus {
    border-color: #545ca6;
  }
  .upfile {
    border: 2px dashed #e0e4e8;
    padding: 15px 25px;
    float: left;
    width:180px;
    height:120px;
    position: relative;
  }
  .shadow{
    position:absolute;
    left:0%;
    top:0%;
    width:100%;
    height:100%;
    z-index:1000;
    background: rgba(0,0,0,0.3);
    display: none;
  }
  .shadow div{
    position: absolute;
    height: 54px;
    width: 54px;
    left: 63px;
    top: 33px;
    cursor: pointer;
  }
  .upfile:hover .shadow{
    display: block;
  }

  .addbtn {
    width: 130px;
    height: 90px;
    display: inline-block;
    position: relative;
    cursor: pointer;
    overflow: hidden;
  }

   .file {
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


  .attention-box{
    float: left;
    margin-left: 18px;
    font-size: 12px;
  }

  .Result-box{
    margin: 200px 0;
    text-align: center;
    font-size: 14px;
  }
  .Result-box p:first-child{
    font-size:20px;
    color:rgba(255,68,91,1);
    line-height:21px;
  }
  .Result-box p:nth-child(2){
    margin: 30px 0 16px;
  }
  .Result-box >div{
    width: 500px;
    margin: 0 auto
  }
  .Result-box >div label{
    float: left;
    text-align: right;
    display: block;
    width: 200px;
    margin-right: 20px
  }
  .Result-box >div p{
    text-align: left;
  }
</style>
