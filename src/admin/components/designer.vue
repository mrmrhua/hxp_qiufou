<template>
  <div class="conbody">
    <div class="labelpage">
      <ul>
        <li @click="showbasefrom" :class="{labelpage_active : basefrom}">基本资料</li>
        <li @click="showworkfrom" :class="{labelpage_active : workfrom}">接单设置</li>
      </ul>
    </div>
    <div class="content" id="content" style="top: 50px;">
      <form class="content_form" v-show="basefrom">
        <div class="context">
          <label>头　　像</label>
          <span style="color: #bbb;font-size: 12px;">仅支持JPG、PNG格式，文件小于1M(方形图)</span>
          <div class="headimg_up">
            <div class="zhezhao" @click="chooseimg"><i class="iconfontyyy">&#xe68a;</i>
              <p>上传</p></div>
            <input type="file" accept="image/*" id="headimgupload" @change="uploadimg($event)"
                   style="display: none;">
            <img :src="basic.headimg">
          </div>
        </div>
        <div class="context">
          <span class="err">*必填</span>
          <label>{{namelabel}}</label>
          <input v-model="basic.nickname" type="text" style="width:261px;">
        </div>
        <div class="context">
          <label>性　　别</label>
          <select v-model="basic.sex" name="sex" style="width: 261px;">
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
        </div>
        <div class="context">
          <label>{{timelabel}}</label>
          <select v-model="basic.startyear" style="width: 261px;">
            <option v-for="n in 61" :value="n+1969" v-html="n+1969"></option>
          </select>
        </div>
        <div class="context">
          <label>教育经历</label>
          <input v-model="basic.school" type="text" style="width: 261px;" placeholder="请填写高校名称">
        </div>
        <div class="context">
          <span class="err">*必填</span>
          <label>所&nbsp;&nbsp;在&nbsp;&nbsp;地</label>
          <v-distpicker :province="address.province" :city="address.city"
                        hide-area></v-distpicker>
        </div>
        <div class="context">
          <span class="err">*必填</span>
          <span class="err">*格式错误</span>
          <label>手　　机</label><input v-model="basic.tel" style="width: 261px;float: left;" type="text"><span
          class="zhusi">仅自己可见</span>
        </div>
        <div class="context">
          <span class="err">*必填</span>
          <span class="err">*格式错误</span>
          <label>邮　　箱</label><input v-model="basic.email" style="width: 261px;float: left;" type="text"><span
          class="zhusi">仅自己可见</span>
        </div>
        <div class="btn_image" @click="submitbasic">保存</div>
      </form>

      <form class="content_form" v-show="workfrom">
        <div class="context">
          <span class="err">*必填</span>
          <label>可工作时间</label>
          <ul style="margin-left: 200px;">
            <li><input type="checkbox" value="1" name="worktime"><span class="checkbox_span">周一至周五白天</span></li>
            <li><input type="checkbox" value="2" name="worktime"><span class="checkbox_span">周一至周五晚间</span></li>
            <li><input type="checkbox" value="3" name="worktime"><span class="checkbox_span">周末</span></li>
            <li><input type="checkbox" value="4" name="worktime"><span class="checkbox_span">都可以</span></li>
            <li><input type="checkbox" value="5" name="worktime"><span class="checkbox_span">其他时间</span></li>
          </ul>
        </div>
        <div class="context">
          <span class="err">*必填</span>
          <label>擅长领域</label>
          <ul id="categroy">
            <li>LOGO设计</li>
            <li>宣传画册</li>
            <li>海报三折页</li>
            <li>PPT美化</li>
            <li>包装设计</li>
            <li>吉祥物设计</li>
            <li>VI系统</li>
            <li>网页UI</li>
            <li>APP UI</li>
            <li>网店美化</li>
            <li>H5设计</li>
            <li>图标设计</li>
            <li>书报刊插画</li>
            <li>手绘</li>
            <li>墙绘</li>
            <li>卡通形象</li>
            <li>表情包</li>
          </ul>
        </div>

        <div class="context">
          <label>风格标签</label>
          <ul id="user_label" class="label">
            <li v-for="item in tag">{{item}}
              <div class="newlabel"><i onclick="removeLabel(this)" class="iconfontyyy"
                                       style="float: right;cursor: pointer;">&#xe67c;</i></div>
            </li>
            <li @click="addnewlabel($event)" class="label_new">+ 新标签</li>
          </ul>
          <ul id="label" class="label" style="margin-top: 20px;">
            <li class="choose">大客户经验</li>
            <li class="choose">简洁风</li>
            <li class="choose">手绘</li>
            <li class="choose">扁平</li>
            <li class="choose">拟物</li>
            <li class="choose">青春活泼</li>
            <li class="choose">Material Design</li>
            <li class="choose">苹果设计风格</li>
          </ul>
        </div>

        <div class="context">
          <label>项目经历</label>
          <!--<i class="iconfontyyy" @click=""
             style="float: right;margin-right: 100px;color: #4cb6cb;cursor: pointer;">&#xe600;</i>-->
          <div id="project" style="margin-left: 200px;">
            <label @click="addproject">标题</label><input style="display: block;" v-model="project.title" type="text">
            <label>简介</label><textarea v-model="project.desc" rows="4"></textarea>
            <div class="btn_image" style="margin-left: 150px;" @click="addproject">添加</div>
            <!--todo 显示-->
            <div class="new_project" v-for="(item,index) in worksetting.exp">
              <i @click="removeproject(item.id,index)" class="iconfontyyy">&#xe635;</i>
              <p style="color: #313131;font-weight: 600;">{{item.title}}</p>
              <p style="line-height: 20px;color: #727272;" v-html="item.desc"></p>
            </div>
          </div>
        </div>
        <div class="context">
          <label>隐私设置</label>
          <ul style="margin-left: 200px;">
            <li><input type="checkbox" value="1" name="privacy"><span class="checkbox_span">仅允许甲方查看我的资料</span></li>
          </ul>
        </div>
        <div class="context">
          <label>发　　票</label>
          <ul style="margin-left: 200px;">
            <li><input type="checkbox" value="1" name="ticket"><span class="checkbox_span">支持开发票</span></li>
          </ul>
        </div>
        <div class="btn_image" @click="submitworksetting">保存</div>
      </form>
    </div>

    <!--上传模态框-->
    <div class="mymodal" v-show="modelshow">
      <div class="conte">
        <div style="width: 100%;line-height: 30px;height: 39px;"><span>上传头像</span><span
          style="float: right;cursor: pointer"
          @click="modelshow=false"><i class="iconfontyyy">&#xe67c;</i></span>
        </div>
        <div id="img-cont">
          <img :src="headimg_upload">
        </div>

        <div style="float: left;margin-left: 10px;">
          <div id="img-pre"></div>
        </div>
        <div class="div_btns">
          <i data-method="zoom" data-option="0.1"
             title="放大" class="iconfontyyy">&#xe72a;</i>
          <i class="iconfontyyy" data-method="zoom" data-option="-0.1" type="button"
             title="缩小">&#xe63b;</i>
          <i class="iconfontyyy" data-method="rotate" data-option="-45" type="button"
             title="左旋">&#xe670;</i>
          <i class="iconfontyyy" data-method="rotate" data-option="45" type="button"
             title="右旋">&#xe628;</i>
          <button style="float: right;width:100px;margin-top: 10px;" data-method="getCroppedCanvas" type="button">
            确定
          </button>
        </div>
      </div>
    </div>
    <prompt prompt="success" :promptshow="promptshow"></prompt>
  </div>
</template>
<script>
  import VDistpicker from 'v-distpicker'
  import prompt from "@/components/Prompt"
  export default{
    data(){
      return {
        promptshow: false,
        flag: true,
        project: {
          title: "",
          desc: ""
        },//项目经历
        address: {
          province: "北京市", city: "市"
        },//所在地
        namelabel: "昵　　称",
        timelabel: "毕业年份",
        basefrom: true,//基本资料 显示
        workfrom: false,//接单设置 显示
        //usertype: 0,//个人或企业
        basic: {
          nickname: "",
          sex: 2,
          startyear: 2017,
          tel: "",
          email: ""
        }, //基本资料
        worksetting: {
          worktime: [],
          tag: [],//风格标签,
          exp: [],
        },//接单设置
        tag: [],//风格标签，
        modelshow: false,
        headimg_upload: ""//上传头像选择后的文件路径
      }
    },
    components: {
      VDistpicker,
      prompt
    },
    created(){
      let that = this;
      $.ajax({
        type: "get",
        url: "http://houxiaopang.com/api/v1.1/designerdash/userinfo",
        headers: {"Authorization": "Token " + token},
        success(data){
          if (data.code === 0) {
            if (data.data.usertype === 0) {
              that.namelabel = "昵　　称";
              that.timelabel = "毕业年份";
            }
            that.basic = data.data.basic;
            let address = that.basic.city.split(" ");
            that.address = {
              province: address[0], city: address[1]
            };

            that.worksetting = data.data.worksetting;
            //可工作时间
            for (let i = 0, size = that.worksetting.worktime.length; i < size; i++) {
              let a = that.worksetting.worktime[i];
              $("input[type='checkbox'][name='worktime'][value='" + a + "']").iCheck('check');
            }
            //擅长领域
            for (let i = 0, size = that.worksetting.category.length; i < size; i++) {
              let a = that.worksetting.category[i];
              let lis = document.getElementById("categroy").children;
              for (let j = 0, size = lis.length; j < size; j++) {
                if (lis[j].innerText === a) {
                  lis[j].className = "categroy_active";
                }
              }
            }
            //风格标签
            that.tag = data.data.worksetting.tag;
            let lis = document.getElementById("label").children;
            for (let i = 0, size = lis.length; i < size; i++) {
              for (let j = 0, size = that.tag.length; j < size; j++) {
                if (lis[i].innerText === that.tag[j]) {
                  lis[i].className = "choose categroy_active";
                }
              }
            }
            let p = that.worksetting.privacy;//隐私设置
            $("input[type='checkbox'][name='privacy'][value='" + p + "']").iCheck('check');
            let t = that.worksetting.ticket;//发票
            $("input[type='checkbox'][name='ticket'][value='" + t + "']").iCheck('check');
          }
        },
        error(e){
          alert("网络拥挤，请稍后再试···");
        }
      });
    },
    mounted(){
      $("input[type='checkbox']").iCheck({
        checkboxClass: 'icheckbox_square-red',
        radioClass: 'iradio_square-red',
        increaseArea: '20%' // optional
      });
      this.categroyclick();
      this.labelclick();
    },
    methods: {
      showbasefrom(){//显示基本资料
        this.workfrom = false;
        this.basefrom = true;
        document.getElementById("content").scrollTop = 0;
      },
      showworkfrom(){//显示接单设置
        this.basefrom = false;
        this.workfrom = true;
        document.getElementById("content").scrollTop = 0;
      },
      addproject(){//添加项目经历
        if (this.project.title.trim() === "" || this.project.desc.trim() === "") {
          alert("标题或简介不能为空！");
          return;
        }
        this.worksetting.exp.push({
          "title": this.project.title.trim(),
          "desc": this.project.desc.trim().replace(/\n/g, "<br>")
        });
        this.project = {
          title: "",
          desc: ""
        };
      },
      labelclick(){//点击选择预定义风格标签
        let lis = document.getElementById("label").children;
        let user_label = document.getElementById("user_label");
        for (let i = 0, size = lis.length; i < size; i++) {
          lis[i].onclick = function () {
            if (this.className !== "choose categroy_active") {
              this.className = "choose categroy_active";
              let li = document.createElement("li");
              li.innerText = this.innerText;
              user_label.insertBefore(li, user_label.lastChild);
              li.innerHTML += `<div class="newlabel"><i onclick="removeLabel(this)" class="iconfontyyy" style="float: right;cursor: pointer;">&#xe67c;</i></div>`;
            }
          }
        }
      },
      addnewlabel(ev){//添加风格标签
        let ul = ev.target.parentElement;
        let li = document.createElement("li");
        li.setAttribute("contenteditable", "true");
        ul.insertBefore(li, ul.lastChild);
        li.focus();
        li.onkeydown = function (e) {//按下enter事件
          if (e.keyCode === 13) {
            if (!this.flag) {
              if (this.innerHTML == "") {
                ul.removeChild(li);
              } else {
                this.flag = true;
                this.removeAttribute("contenteditable");
                this.innerHTML += `<div class="newlabel"><i onclick="removeLabel(this)" class="iconfontyyy" style="float: right;cursor: pointer;">&#xe67c;</i></div>`;
              }
            }
          }
        };
        li.onblur = function () {//按下失去焦点事件
          if (!this.flag) {
            if (this.innerHTML == "") {
              ul.removeChild(li);
            } else {
              this.flag = true;
              this.removeAttribute("contenteditable");
              this.innerHTML += `<div class="newlabel"><i onclick="removeLabel(this)" class="iconfontyyy" style="float: right;cursor: pointer;">&#xe67c;</i></div>`;
            }
          }
        }
      },
      submitbasic(){//保存基本资料
        let errs = document.querySelectorAll(".err");
        if (this.basic.nickname === null || this.basic.nickname.trim() === "") {
          errs[0].style.display = "block";
        } else {
          errs[0].style.display = "none";
        }
        let province = document.querySelectorAll(".address select")[0];
        let city = document.querySelectorAll(".address select")[1];
        if (province.value === "省" || city.value === "市") {
          errs[1].style.display = "block";
        } else {
          errs[1].style.display = "none";
        }
        if (this.basic.tel === null || this.basic.tel.trim() === "") {
          errs[2].style.display = "block";
        } else {
          errs[2].style.display = "none";
        }

        if (this.basic.tel.trim() !== "" && this.basic.tel.length !== 11) {
          errs[3].style.display = "block";
        } else {
          errs[3].style.display = "none";
        }
        if (this.basic.email === null || this.basic.email.trim() === "") {
          errs[4].style.display = "block";
        } else {
          errs[4].style.display = "none";
        }
        let em = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (this.basic.email.trim() !== "" && !em.test(this.basic.email.trim())) {
          errs[5].style.display = "block";
        } else {
          errs[5].style.display = "none";
        }

        for (var i = 0; i < 6; i++) {
          if (errs[i].style.display === "block") {
            return;
          }
        }
        this.basic.city = province.value + " " + city.value;
        if (this.flag) {
          this.flag = false;
          var that = this;
          $.ajax({
            headers: {"Authorization": "Token " + token},
            type: "post",
            url: "http://houxiaopang.com/api/v1.1/designerdash/userinfo",
            data: {
              'basic': JSON.stringify(that.basic)
            },
            success(data){
              that.flag = true;
              if (data.code === 0) {
                that.promptshow = true;
                setTimeout(function () {
                  that.promptshow = false;
                  that.$router.go(0);
                }, 1000);
              }
              else alert("网络拥挤，请稍后再试···");
            },
            error(){
              that.flag = true;
              alert("网络拥挤，请稍后再试···");
            }
          });
        }
      },
      submitworksetting(){//保存接单设置
        let errs = document.querySelectorAll(".err");
        let worktime = $("input[type='checkbox'][name='worktime']:checked");
        //可工作时间
        if (worktime.length === 0) {
          errs[6].style.display = "block";
        } else {
          errs[6].style.display = "none";
          this.worksetting.worktime = [];
          for (let i = 0, size = worktime.length; i < size; i++) {
            this.worksetting.worktime.push(worktime[i].value);
          }
        }
        //擅长领域
        let lis = document.getElementById("categroy").children;
        this.worksetting.category = [];
        for (let i = 0, size = lis.length; i < size; i++) {
          if (lis[i].className === "categroy_active") {
            this.worksetting.category.push(lis[i].innerText);
          }
        }
        if (this.worksetting.category.length === 0) {
          errs[7].style.display = "block";
        } else {
          errs[7].style.display = "none";
        }
        if (errs[6].style.display === "block" || errs[7].style.display === "block") {
          return;
        }

        //风格标签
        this.worksetting.tag = [];
        let lis_label = document.getElementById("user_label").children;
        for (let i = 0, size = lis_label.length - 1; i < size; i++) {
          let text = lis_label[i].innerText.substr(0, lis_label[i].innerText.length - 1);
          this.worksetting.tag.push(text);
        }

        //项目经历
        if (this.project.title.trim() !== "" && this.project.desc.trim() !== "") {
          this.worksetting.exp.push({
            "title": this.project.title.trim(),
            "desc": this.project.desc.trim().replace(/\n/, "<br>"),
          });
          this.project = {
            title: "",
            desc: ""
          };
        }

        //隐私
        let privacy = $("input[type='checkbox'][name='privacy']:checked");
        if (privacy.length === 1) {
          this.worksetting.privacy = 1;
        } else {
          this.worksetting.privacy = 0;
        }
        //发票
        let ticket = $("input[type='checkbox'][name='ticket']:checked");
        if (ticket.length === 1) {
          this.worksetting.ticket = 1;
        } else {
          this.worksetting.ticket = 0;
        }
        let that = this;
        if (this.flag) {
          that.flag = false;
          $.ajax({
            headers: {"Authorization": "Token " + token},
            type: "post",
            url: "http://houxiaopang.com/api/v1.1/designerdash/userinfo",
            data: {
              'worksetting': JSON.stringify(that.worksetting)
            },
            success(data){
              that.flag = true;
              if (data.code === 0) {
                that.promptshow = true;
                setTimeout(function () {
                  that.promptshow = false;
                  that.$router.go(0);
                }, 1000);
              }
              else alert("网络拥挤，请稍后再试···");
            },
            error(){
              that.flag = true;
              alert("网络拥挤，请稍后再试···");
            }
          });
        }
      },
      uploadimg(ev){
        this.headimg_upload = window.URL.createObjectURL(ev.target.files[0]);
        var that = this;
        this.$nextTick(function () {
          cropper(that.callbackuploadImg, {//运行截图插件
            img: "#img-cont > img",
            preview: "#img-pre",
            aspectRatio: 1,
            inputImage: "#headimgupload"
          });
          this.modelshow = true;
        });
      },
      chooseimg(){
        document.getElementById("headimgupload").click();
      },
      categroyclick(){//擅长领域点击事件
        let lis = document.getElementById("categroy").children;
        for (let i = 0, size = lis.length; i < size; i++) {
          lis[i].onclick = function () {
            this.className = this.className === "" ? "categroy_active" : "";
          }
        }
      },
      callbackuploadImg(result){
        //截图插件上传回调方法
        this.modelshow = false;
        var pic = result.toDataURL();
        var uploadpic = pic.split(",")[1];
        var that = this;
        $.ajax({
          type: 'GET',
          url: 'http://houxiaopang.com/api/v1.0/apply/uptoken',
          data: {
            headimg: "1"
          },
          success(data){
            var url = "http://upload.qiniu.com/putb64/-1";
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
              if (xhr.readyState == 4) {
                var data = eval("(" + xhr.responseText + ")");
                that.basic.headimg = "http://userhead.houxiaopang.com/" + data.key;
              }
            }
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.setRequestHeader("Authorization", "UpToken " + data.uptoken);
            xhr.send(uploadpic);
          },
        });
      },
      removeproject(id, index){
        var that = this;//发请求删除 exp
        if (id) {
          $.ajax({
            type: "POST",
            headers: {"Authorization": "Token " + token},
            url: "http://houxiaopang.com/api/v1.1/designerdash/userinfo/deletexp",
            data: {
              "exp_id": id
            },
            success(data){
              if (data.code === 0) {
                that.promptshow = true;
                setTimeout(function () {
                  that.promptshow = false;
                }, 1000);
                that.worksetting.exp.splice(index, 1);
              } else {
                alert("网络拥挤，请稍后再试···");
              }
            },
            error(){
              alert("网络拥挤，请稍后再试···");
            }
          });
        } else {
          //删除项目经历
          this.worksetting.exp.splice(index, 1);
        }
      }
    }
  }

</script>
<style>
  .conbody > .labelpage {
    width: 100%;
    height: 50px;
  }

  .labelpage > ul {
    width: 100%;
    height: 100%;
  }

  .labelpage > ul > li {
    float: left;
    padding: 0 3px;
    font-size: 16px;
    line-height: 30px;
    margin-left: 10px;
    margin-right: 25px;
    margin-top: 9px;
    background: #fff;
    cursor: pointer;
  }

  .labelpage > ul > li:hover {
    border-bottom: 2px solid #d01667;
  }

  .labelpage > ul > .labelpage_active {
    border-bottom: 2px solid #d01667;
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

  .zhusi {
    margin-left: 20px;
    color: rgb(187, 187, 187);
    font-size: 12px;
    line-height: 30px;
    display: inline-block;
    vertical-align: top;
  }

  .context input {
    width: 80%;
    outline: none;
    padding-left: 10px;
    box-sizing: border-box;
    height: 30px;
    border: 1px solid #cbd5dd;
    border-radius: 2px;
    font-size: 14px;
  }

  .context input:focus {
    border-color: #545ca6;
  }

  .context textarea {
    width: 80%;
    outline: none;
    padding-left: 10px;
    padding-top: 10px;
    box-sizing: border-box;
    display: block;
    height: 100px;
    border: 1px solid #cbd5dd;
    border-radius: 2px;
    font-size: 14px;
    resize: none;
    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "HeitiSC", "WenQuanYi Micro Hei", sans-serif;
  }

  .context textarea:focus {
    border-color: #545ca6;
  }

  .context > select {
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

  .address > select {
    outline: none;
    padding: 0 0 0 10px;
    box-sizing: border-box;
    height: 30px;
    border: 1px solid #cbd5dd;
    border-radius: 2px;
    font-size: 14px;
    line-height: 1;
  }

  .address > select:focus {
    border-color: #545ca6;
  }

  .context > select:focus {
    border-color: #545ca6;
  }

  .context > .headimg_up {
    margin-left: 210px;
    position: relative;
  }

  .context > .headimg_up > img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: block;
  }

  .headimg_up > .zhezhao {
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    bottom: 0;
    width: 150px;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    opacity: 0;
    cursor: pointer;
  }

  .headimg_up > .zhezhao:hover {
    opacity: 1;
  }

  .headimg_up > .zhezhao > i {
    margin-top: 43px;
    display: block;
  }

  .checkbox_span {
    margin-left: 20px;
  }

  .context > #categroy, .label {
    overflow: hidden;
    margin-left: 200px;
  }

  .context > #categroy > li {
    float: left;
    margin-right: 10px;
    border: 1px solid #bbb;
    padding: 5px 20px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .context > .label > .label_new {
    cursor: pointer;
    color: #d01667;
    border: 1px solid #d01667;
  }

  .context > .label > .choose {
    cursor: pointer;
  }

  .context > .label > .choose:hover {
    background: #bbb;
    color: #fff;
  }

  .context > .label > .label_new:hover {
    box-shadow: 0 0 2px 0 #d01667;
  }

  .context > .label > li {
    float: left;
    margin-right: 10px;
    border: 1px solid #bbb;
    padding: 5px 20px;
    margin-bottom: 10px;
    min-width: 72px;
    min-height: 42px;
    box-sizing: border-box;
    text-align: center;
    position: relative;
  }

  .newlabel {
    position: absolute;
    top: 0;
    width: 100%;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
  }

  .newlabel:hover {
    opacity: 1;
  }

  .context > #categroy > li:hover {
    background: #bbb;
    color: #fff;
  }

  .categroy_active {
    background: #bbb;
    color: #fff;
  }

  #project .new_project {
    width: 80%;
    padding: 20px 0;
    position: relative;
    border-bottom: 1px solid #bbb;
  }

  #project .new_project:last-child {
    border: none;
  }

  #project .new_project > i {
    display: none;
    float: right;
    cursor: pointer;
    line-height: 24px;
    text-align: center;
    font-size: 20px;
    color: #d01667;
  }

  #project .new_project:hover > i {
    display: block;
  }

  #img-cont {
    width: 400px;
    height: 400px;
    float: left
  }

  #img-pre {
    width: 160px;
    height: 120px;
    overflow: hidden;
  }
</style>
