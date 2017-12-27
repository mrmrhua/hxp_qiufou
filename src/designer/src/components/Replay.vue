<template>
  <div class="warp">
    <div class="uploadhead">
      <div class="headwarp" @touchend="uploadimg">
        <img v-show="!headimg" class="icon" src="http://image.houxiaopang.com/wx/web/cam@2x.png" alt="">
        <img v-show="headimg" :src="headimg" class="headimg" alt="">
        <input id="img_input" @change="getimg($event)" type="file" accept="image/*" class="hidefile">
      </div>
      <div style="margin-top: 10px;">点击上传你的头像</div>
    </div>

    <div class="weui-cells__title">基本资料</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">昵称</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入昵称"/>
        </div>
      </div>

      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">性别</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select">
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">毕业年份</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2">
            <option v-for="n in 61" :value="n+1969">{{n + 1969}}</option>
          </select>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">教育经历</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入"/>
        </div>
      </div>


    </div>
    <div class="weui-cells__title">所在地</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">省份</label>
        </div>
        <div class="weui-cell__bd">
          <select id="pro" @change="getcity" class="weui-select">
            <option v-for="item in pro" :value="item.value">{{item.name}}</option>
          </select>
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">城市</label>
        </div>
        <div class="weui-cell__bd">
          <select id="city" class="weui-select">
            <option v-for="item in city" :value="item">{{item}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">仅自己可见</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell "><!--class weui-cell_vcode-->
        <div class="weui-cell__hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="tel" placeholder="请输入手机号"/>
        </div>
        <!-- <div class="weui-cell__ft">
           <button class="weui-vcode-btn">获取验证码</button>
         </div>-->
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">邮箱</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="email" placeholder="请输入邮箱"/>
        </div>
      </div>
    </div>
    <div class="mybtn" @click="submit">申请入驻</div>
    <div id="tt" style="display: none"></div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
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
        city: ["北京市"],
        headimg: null
      }
    },
    created(){

    },
    mounted(){
      var that = this
      registerup(function (value) {
        that.imguploadCallback(value)
      });
    },
    methods: {
      getcity(){
        this.city = [];
        var that = this
        var id = 1;
        for (var i = 0, size = this.pro.length; i < size; i++) {
          if (this.pro[i].value === document.getElementById("pro").value) {
            id = this.pro[i].id
            break
          }
        }
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/getcity?id=" + id,
          success(res){
            if (res.code === 0) {
              that.city = res.data.citys
            }
            else {
              showModal("网络拥挤，请稍后再试。")
            }
          },
          timeout: 2000,
          error(e){
            showModal("网络拥挤，请稍后再试。")
          }
        })
      },
      uploadimg(){
        document.getElementById("img_input").click();
      },
      getimg(e){
        uploader.addFile(e.target.files[0]);
      },
      imguploadCallback(value){
        console.log(value);
        this.headimg = value
      },
      submit(){//验证
        var c = document.getElementById("city").value;
        var city = document.getElementById("pro").value + " " + c.substring(0, c.length - 1);
        console.log(city);
        showload("提交中···")
        //todo 提交成功后跳转个人中心 或 提示pc端上传审核作品
        setTimeout(hideload, 2000)
      }
    }
  }

</script>

<style scoped>
  .warp {
    height: 100%;
    position: relative;
    background: #f4f4f4;
  }

  .hidefile {
    display: none;
  }

  .headwarp {
    position: relative;
    width: 100px;
    height: 100px;
    background: linear-gradient(to right, #ec8c69, #ed5fa0);
    border-radius: 50%;
    display: flex;
    justify-content: center;;
    align-items: center;

  }

  .headwarp > .icon {
    width: 75%;
    z-index: 10;
  }

  .headimg {
    z-index: 100;
    width: 85%;
  }

  .uploadhead {
    background: #fff;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    font-size: 12px;
    color: #999;
  }

</style>
