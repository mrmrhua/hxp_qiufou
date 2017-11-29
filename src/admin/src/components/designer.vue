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
            <input type="file" accept="image/jpg,image/jpeg,image/png" id="headimgupload" @change="uploadimg($event)"
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
          <!--<v-distpicker :province="address.province" :city="address.city"
                        hide-area></v-distpicker>-->
          <div class="address">
            <select @change="getcity(0)" v-model="address.province">
              <option v-for="item in pro" :value="item.value">{{item.name}}</option>
            </select>
            <select v-model="address.city">
              <option v-for="item in city" :value="item">{{item}}</option>
            </select>
          </div>
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
        <div class="context" style="overflow: inherit">
          <div class="doubt">
            <i class="iconfontyyy" style="color: #fe6549;font-size: 18px">&#xe6d4;</i>
            <div class="pop-box" style="width: 260px;top: 40px;left: -20px;">
              <div class="pop-content">
                <div class="doubt_content">邀请好友入驻猴小胖平台时填写你的推荐码，即可在好友成功入驻后获得推荐奖励。</div>
              </div>
              <div class="pop-triangle">
                <i></i>
              </div>
            </div>
          </div>
          <label>推&nbsp;&nbsp;荐&nbsp;&nbsp;码</label>
          <label style="text-align: left;width: 10%;padding-left: 10px;">{{basic.recom_code}}</label>
          <div class="share"@click.stop="showShareMethod">分享给好友
            <div class="pop-box" style="width: 417px;top: 40px;display:block;left: 250px;z-index: 6;color: #333333" v-show="show_share">
              <div class="pop-content">
                <div class="doubt_content">
                  <p>注册链接为<a style="color: #3744FF">www.houxiaopang.com</a></p>
                  <p>复制此链接给好友注册，好友注册成功，并且在注册时填写了您的推荐码， 您即可获得推荐奖励</p>
                </div>
              </div>
              <div class="pop-triangle">
                <i></i>
              </div>
            </div>
          </div>

        </div>
        <div class="btn_image" @click="submitbasic" style="position: relative;">保存</div>
      </form>
      <!--接单设置-->
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
            <li v-for="item in tag" class="label_new">{{item}}
              <div class="newlabel"><i onclick="removeLabel(this)" class="iconfontyyy"
                                       style="float: right;cursor: pointer;">&#xe67c;</i></div>
            </li>
          </ul>
          <input style="display: inline-block;margin-left: 200px;width: 60%; height: 42px"  type="text" v-model="customLabel" @input="labelInput">
          <div class="add_lable_btn" @click="addCustom">添加标签</div>
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
          <label>个人简历</label>
          <!--<i class="iconfontyyy" @click=""
             style="float: right;margin-right: 100px;color: #4cb6cb;cursor: pointer;">&#xe600;</i>-->
          <textarea  style="width: 60%;margin-left: 200px;height: 330px"  :placeholder="resumeText1" rows="4" v-model="worksetting.intro"
                     @input="introInput"></textarea>
          <div class="share" @click.stop="showDemoMethod" style="margin-left: 200px;">查看范例
            <div class="pop-box" v-show="show_demo" style="width: 480px;height: 330px;top: 0px;display:block;z-index: 6;color: #333333;cursor: auto">
              <div class="pop-content">
                <div class="doubt_content">
                  <div class="resume_context">
                    <p>【我的介绍】</p>
                    <p>喜欢有挑战性的项目，专注于互联网产品，追求极致的设计和用户体验，帮助更多的人把想法变成现实。</p>
                    <p>- 拥有五年视觉/交互设计的丰富经验，包括Web端、移动端及后台系统的设计</p>
                    <p>- 曾就职于百度、腾讯等公司，主导及参与过十几个项目的设计过程，积累了丰富的实践经验</p>
                    <p>- 北京邮电大学，工业设计毕业</p>
                  </div>
                  <div class="resume_context" style="margin-top: 20px">
                    <p>【提供的服务】</p>
                    <p>擅长App产品的从0-1的主风格定义</p>
                    <p>Web网站的整案设计</p>
                    <p>H5页面的风格策划及设计</p>
                    <p>Logo的整体定义及细节设计</p>
                    <p>多种风格的图标设计</p>
                  </div>
                </div>
              </div>
              <div class="pop-triangle-down">
                <i></i>
              </div>
            </div>
          </div>
          <span style="position: absolute;right: 120px;">{{worksetting.intro.length}}/500字</span>
        </div>

        <div class="context">
          <label>项目经历</label>
          <!--<i class="iconfontyyy" @click=""
             style="float: right;margin-right: 100px;color: #4cb6cb;cursor: pointer;">&#xe600;</i>-->
          <div id="project" style="margin-left: 200px;">
            <label @click="addproject">标题</label><input style="display: block;" v-model="project.title" type="text" placeholder="填写您参与过的设计项目">
            <label>简介</label><textarea v-model="project.desc" rows="4" placeholder="简要介绍项目与您在其中承担的职责"></textarea>
            <div class="btn_image" style="margin-left: 150px;" @click="addproject">添加</div>
            <!--todo 显示-->
            <div class="new_project" v-for="(item,index) in worksetting.exp">
              <i @click="removeproject(item.id,index)" class="iconfontyyy">&#xe635;</i>
              <p style="color: #313131;font-weight: 600;">{{item.title}}</p>
              <p style="line-height: 20px;color: #727272;" v-html="item.desc"></p>
            </div>
          </div>
        </div>
        <div class="context" style="overflow: inherit">
          <div class="doubt" style="z-index: 99999">
            <i class="iconfontyyy" style="color: #fe6549;font-size: 18px">&#xe6d4;</i>
            <div class="pop-box" style="width: 260px;top: 40px;left: -20px;">
              <div class="pop-content">
                <div class="doubt_content">勾选后您的作品将不会出现在网站作品精选栏目，只有您主动报价客户才能查看您的简历与作品集</div>
              </div>
              <div class="pop-triangle">
                <i></i>
              </div>
            </div>
          </div>
          <label>隐私设置</label>
          <ul style="margin-left: 200px;">
            <li><input type="checkbox" value="1" name="privacy"><span class="checkbox_span">仅允许甲方查看我的资料</span></li>
          </ul>
        </div>
        <div class="context" style="overflow: inherit">
          <div class="doubt">
            <i class="iconfontyyy" style="color: #fe6549;font-size: 18px">&#xe6d4;</i>
            <div class="pop-box" style="width: 260px;top: 40px;left: -20px;">
              <div class="pop-content">
                <div class="doubt_content">如果您能够为客户提供发票，请勾选此处</div>
              </div>
              <div class="pop-triangle">
                <i></i>
              </div>
            </div>
          </div>
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

  export default {
    props: ['show_share','show_demo'],
    data() {
      return {
        promptshow: false,
        flag: true,
        project: {
          title: "",
          desc: ""
        },//项目经历
        address: {
          province: '北京',
          city: "北京市"
        },
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
          email: "",
          recom_code:""
        }, //基本资料
        worksetting: {
          worktime: [],
          tag: [],//风格标签,
          exp: [],
          intro:'',
        },//接单设置
        tag: [],//风格标签，
        modelshow: false,
        headimg_upload: "",//上传头像选择后的文件路径
        pro: [
          {
            "id": 1,
            "name": "北京市",
            "value": "北京"
          },
          {
            "id": 2,
            "name": "天津市",
            "value": "天津"
          },
          {
            "id": 3,
            "name": "河北省",
            "value": "河北"
          },
          {
            "id": 4,
            "name": "山西省",
            "value": "山西"
          },
          {
            "id": 5,
            "name": "内蒙古自治区",
            "value": "内蒙古"
          },
          {
            "id": 6,
            "name": "辽宁省",
            "value": "辽宁"
          },
          {
            "id": 7,
            "name": "吉林省",
            "value": "吉林"
          },
          {
            "id": 8,
            "name": "黑龙江省",
            "value": "黑龙江"
          },
          {
            "id": 9,
            "name": "上海市",
            "value": "上海"
          },
          {
            "id": 10,
            "name": "江苏省",
            "value": "江苏"
          },
          {
            "id": 11,
            "name": "浙江省",
            "value": "浙江"
          },
          {
            "id": 12,
            "name": "安徽省",
            "value": "安徽"
          },
          {
            "id": 13,
            "name": "福建省",
            "value": "福建"
          },
          {
            "id": 14,
            "name": "江西省",
            "value": "江西"
          },
          {
            "id": 15,
            "name": "山东省",
            "value": "山东"
          },
          {
            "id": 16,
            "name": "河南省",
            "value": "河南"
          },
          {
            "id": 17,
            "name": "湖北省",
            "value": "湖北"
          },
          {
            "id": 18,
            "name": "湖南省",
            "value": "湖南"
          },
          {
            "id": 19,
            "name": "广东省",
            "value": "广东"
          },
          {
            "id": 20,
            "name": "广西壮族自治区",
            "value": "广西"
          },
          {
            "id": 21,
            "name": "海南省",
            "value": "海南"
          },
          {
            "id": 22,
            "name": "重庆市",
            "value": "重庆"
          },
          {
            "id": 23,
            "name": "四川省",
            "value": "四川"
          },
          {
            "id": 24,
            "name": "贵州省",
            "value": "贵州"
          },
          {
            "id": 25,
            "name": "云南省",
            "value": "云南"
          },
          {
            "id": 26,
            "name": "西藏自治区",
            "value": "西藏"
          },
          {
            "id": 27,
            "name": "陕西省",
            "value": "陕西"
          },
          {
            "id": 28,
            "name": "甘肃省",
            "value": "甘肃"
          },
          {
            "id": 29,
            "name": "青海省",
            "value": "青海"
          },
          {
            "id": 30,
            "name": "宁夏回族自治区",
            "value": "宁夏"
          },
          {
            "id": 31,
            "name": "新疆维吾尔自治区",
            "value": "新疆"
          }],
        city: [],
        customLabel:'',
        resumeText1:'对您在专业领域获得的成就和经验进行描述，充分展现您的才华和实力，吸引项目方\n\n' +
        '【自我介绍】\n'+'　　对自己的综合描述，让别人感受到您的独特风采;\n　　您的教育背景;\n　　您得到过的骄傲成绩\n\n'+
        '【擅长的服务】\n'+'　　描述您的技能特长;\n　　能给项目方提供的服务\n',
      }
    },
    components: {
      VDistpicker,
      prompt
    },
    created() {
      this.getinfo();
    },
    mounted() {
      $("input[type='checkbox']").iCheck({
        checkboxClass: 'icheckbox_square-red',
        radioClass: 'iradio_square-red',
        increaseArea: '20%' // optional
      });
      this.categroyclick();
      this.labelclick();
    },
    methods: {
      getinfo() {
        var that = this;
        if (login) {
          $.ajax({
            type: "get",
            url: "http://www.houxiaopang.com/api/v1.1/designerdash/userinfo",
            headers: {"Authorization": "Token " + token},
            success(data) {
              if (data.code === 0) {
                if (data.data.usertype === 0) {
                  that.namelabel = "昵　　称";
                  that.timelabel = "毕业年份";
                }
                that.basic = data.data.basic;
                let address = that.basic.city.split(" ");
                that.address = {
                  province: address[0], city: address[1] + "市"
                };
                that.getcity(1);
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
            error(e) {
              alert("网络拥挤，请稍后再试···");
            }
          });
        } else {
          setTimeout(function () {
            that.getinfo();
          }, 1000)
        }
      },
      getcity(va) {
        var that = this
        var id = 1;
        this.pro.forEach(function (item) {
          if (item.value === that.address.province) {
            id = item.id
          }
        })
        $.ajax({
          url: "http://www.houxiaopang.com/api/v1.1/getcity?id=" + id,
          success(res) {
            if (res.code === 0) {
              that.city = res.data.citys
              if(!va){
                that.address.city = that.city[0];
              }
            }
            else {
              alert("网络拥挤，请稍后再试。");
            }
          },
          error() {
            alert("网络拥挤，请稍后再试。");
          }
        })
      },
      showbasefrom() {//显示基本资料
        this.workfrom = false;
        this.basefrom = true;
        document.getElementById("content").scrollTop = 0;
      },
      showworkfrom() {//显示接单设置
        this.basefrom = false;
        this.workfrom = true;
        document.getElementById("content").scrollTop = 0;
      },
      addproject() {//添加项目经历
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
      labelclick() {//点击选择预定义风格标签
        let lis = document.getElementById("label").children;
        let user_label = document.getElementById("user_label");
        for (let i = 0, size = lis.length; i < size; i++) {
          lis[i].onclick = function () {
            if (this.className !== "choose categroy_active") {
              this.className = "choose categroy_active";
              let li = document.createElement("li");
              li.innerText = this.innerText;
              li.classList.add('label_new')
              user_label.appendChild(li);
              li.innerHTML += `<div class="newlabel"><i onclick="removeLabel(this)" class="iconfontyyy" style="float: right;cursor: pointer;">&#xe67c;</i></div>`;
            }
          }
        }
      },
      addnewlabel(ev) {//添加风格标签
        let ul = ev.target.parentElement;
        let li = document.createElement("li");
        li.setAttribute("contenteditable", "true");
        ul.appendChild(li);
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
      addCustom(){   //添加自定义标签
        if(this.customLabel){
            let ul = document.getElementById('user_label');
            let li = document.createElement("li");
            li.innerText = this.customLabel;
            li.classList.add('label_new');
            ul.appendChild(li);
            li.innerHTML += `<div class="newlabel"><i onclick="removeLabel(this)" class="iconfontyyy" style="float: right;cursor: pointer;">&#xe67c;</i></div>`;
            this.customLabel = '';
          }
      },

      submitbasic() {//保存基本资料
        let errs = document.querySelectorAll(".err");
        if (this.basic.nickname === null || this.basic.nickname.trim() === "") {
          errs[0].style.display = "block";
        } else {
          errs[0].style.display = "none";
        }
        //let province = document.querySelectorAll(".address select")[0];
        //let city = document.querySelectorAll(".address select")[1];
        if (!this.address.city || this.address.province === "" || this.address.city === "") {
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
        this.basic.city = this.address.province + " " + this.address.city.substring(0, this.address.city.length - 1);
        if (this.flag) {
          this.flag = false;
          var that = this;
          $.ajax({
            headers: {"Authorization": "Token " + token},
            type: "post",
            url: "http://www.houxiaopang.com/api/v1.1/designerdash/userinfo",
            data: {
              'basic': JSON.stringify(that.basic)
            },
            success(data) {
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
            error() {
              that.flag = true;
              alert("网络拥挤，请稍后再试···");
            }
          });
        }
      },
      submitworksetting() {//保存接单设置
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

          window.scrollTo(0,0);
          return;
        }

        //风格标签
        this.worksetting.tag = [];
        let lis_label = document.getElementById("user_label").children;
        for (let i = 0, size = lis_label.length; i < size; i++) {
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
            url: "http://www.houxiaopang.com/api/v1.1/designerdash/userinfo",
            data: {
              'worksetting': JSON.stringify(that.worksetting)
            },
            success(data) {
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
            error() {
              that.flag = true;
              alert("网络拥挤，请稍后再试···");
            }
          });
        }
      },
      uploadimg(ev) {
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
      chooseimg() {
        document.getElementById("headimgupload").click();
      },
      categroyclick() {//擅长领域点击事件
        let lis = document.getElementById("categroy").children;
        for (let i = 0, size = lis.length; i < size; i++) {
          lis[i].onclick = function () {
            this.className = this.className === "categroy_active" ? "categroy_can" : "categroy_active";
          }
        }
      },
      callbackuploadImg(result) {
        //截图插件上传回调方法
        this.modelshow = false;
        var pic = result.toDataURL();
        var uploadpic = pic.split(",")[1];
        var that = this;
        $.ajax({
          type: 'GET',
          url: 'http://www.houxiaopang.com/api/v1.0/apply/uptoken',
          data: {
            headimg: "1"
          },
          success(data) {
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
      removeproject(id, index) {
        var that = this;//发请求删除 exp
        if (id) {
          $.ajax({
            type: "POST",
            headers: {"Authorization": "Token " + token},
            url: "http://www.houxiaopang.com/api/v1.1/designerdash/userinfo/deletexp",
            data: {
              "exp_id": id
            },
            success(data) {
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
            error() {
              alert("网络拥挤，请稍后再试···");
            }
          });
        } else {
          //删除项目经历
          this.worksetting.exp.splice(index, 1);
        }
      },
      labelInput(){//标签字数限制
        if(this.customLabel.length>20){
          var textVal = this.customLabel.substring(0,20);
          this.customLabel = textVal;
        }
      },
      introInput(){//个人简历字数限制
        if(this.worksetting.intro.length>500){
          var textVal = this.worksetting.intro.substring(0,500);
          this.worksetting.intro = textVal;
        }
      },

      showShareMethod(){
        this.$emit("showshare");
      },
      showDemoMethod(){
        this.$emit("showdemo");
      },

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
    width: 132px;
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
    border: 1px solid #eeeeee;
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
    border: 1px solid #eeeeee;
    cursor: pointer;
  }

  .context > .label > .choose:hover {
    background: #bbb;
    color: #fff;
  }

  .context > .label > .label_new:hover {
    border: 1px solid #bbb;
    background: rgba(0,0,0,0.3);
  }

  .context > .label > li {
    float: left;
    margin-right: 10px;
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
  }
  .context > .label > .label_new:hover .newlabel{
    color: #ffffff;
  }


  .context > #categroy > li:hover ,.context > #label > li:hover{
    background: #bbb;
    color: #fff;
    border: 1px solid #bbb;
  }
/*擅长领域label*/
  .context > #categroy >.categroy_active ,.context > #label >.categroy_active{
    background: #fff;
    color: #D01667;
    border: 1px solid #D01667;
  }
  .context > #categroy > .categroy_can,.context > #label > .categroy_can{
    background: #fff;
    color: #333333;
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

  .pop-box {
    display: none;
    border: 1px solid #DEDEDE;
    position: absolute;
    border-radius: 5px;
    background: #ffffff;
  }

  .doubt_content {
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0px;
    padding: 12px 4px 10px 14px;
  }

  .pop-content {
    width: 100%;
    height: 100%;
  }

  .pop-triangle {
    position: absolute;
    top: -21px;
    left: 17px;
    display: block;
    height: 0;
    width: 0;
    font-size: 0;
    line-height: 0;
    border-color: transparent transparent #DEDEDE transparent;
    border-style: dashed dashed solid dashed;
    border-width: 10px;
  }

  .pop-triangle i {
    position: absolute;
    top: -9px;
    left: -10px;
    display: block;
    height: 0;
    width: 0;
    font-size: 0;
    line-height: 0;
    border-color: transparent transparent #fff transparent;
    border-style: dashed dashed solid dashed;
    border-width: 10px;
  }

  .pop-triangle-down {
    position: absolute;
    left: 17px;
    display: block;
    height: 0;
    width: 0;
    font-size: 0;
    line-height: 0;
    border-color: #DEDEDE transparent transparent transparent;
    border-style: solid dashed dashed dashed;
    border-width: 10px;
  }

  .pop-triangle-down i {
    position: absolute;
    top: -12px;
    left: -10px;
    display: block;
    height: 0;
    width: 0;
    font-size: 0;
    line-height: 0;
    border-color: #fff transparent transparent transparent;
    border-style: solid dashed dashed dashed;
    border-width: 10px;
  }
  .resume_context{
    font-size: 14px;
    line-height: 20px;
    color: #333333;
  }



  .doubt {
    position: absolute;
    left: 50px;
    cursor: pointer;
  }

  .doubt:hover .pop-box {
    display: block;
  }
  .share{
    cursor: pointer;
    color: #4762FF;
    display: inline-block;
  }
/*  .share:hover .pop-box{
    display: block !important;
  }*/

  .add_lable_btn{
    display: inline-block;
    line-height: 40px;
    border: 1px solid #bbb;
    padding: 0px 20px;
    margin-left: 10px;
    cursor: pointer;
    color: #d01667;
    background: #FAFAFA;
  }


  #hihi::-webkit-input-placeholder::after {
    display:block;
    content:"Line 2\A Line 3";
  }

</style>
