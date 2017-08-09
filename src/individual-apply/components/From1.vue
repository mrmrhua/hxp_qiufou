<template>
  <form class="row" id='form' role="form">
    <ul class="head-info" style="list-style: circle;">
      <li>为帮助客户更好的挑选心仪的设计师,请您根据下列要求如实填写。我们将对入驻申请进行审核,确保您有能力满足一般设计要求。<br>
      </li>
      <li>您的信任对我们而言意味着一切。正因如此，我们将绝对尊重并保护您的隐私。我们承诺您的隐私信息绝不会在未经许可的情况下私自外泄给不相关的第三方。
      </li>
    </ul>
    <div class="row">
      <div class="col-md-2 form-group form-left">
        <label>姓　　名</label>
      </div>
      <div class="col-md-3 form-group form-right">
        <i class="iconfontyyy">&#xe638;</i>
        <input v-model='name' type="text" name='name' class="form-control" placeholder="请填写真实姓名">
      </div>
      <div class="col-md-2 form-group form-left">
        <label>手　　机</label>
      </div>
      <div class="col-md-3 form-group form-right">
        <i class="iconfontyyy">&#xe600;</i>
        <input v-model='tel' name='tel' type="text" class="form-control">
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 form-group form-left">
        <label>Q　　Q</label>
      </div>
      <div class="col-md-3 form-group form-right">
        <i class="iconfontyyy">&#xe668;</i>
        <input v-model='qq' placeholder="选填" type="text" class="form-control" name="qq">
      </div>

      <div class="col-md-2 form-group form-left">
        <label>微　　信</label>
      </div>
      <div class="col-md-3 form-group form-right">
        <i class="iconfontyyy">&#xe69e;</i>
        <input v-model='wx' type="text" placeholder="选填" class="form-control" name="wx">
      </div>

    </div>
    <div class="row">
      <div class="col-md-2 form-group form-left">
        <label>所&nbsp;&nbsp;在&nbsp;&nbsp;地</label>
      </div>
      <div class="col-md-8 form-group form-right">
        <i class="iconfontyyy">&#xe61b;</i>
        <div style="float: left" class="city-picker-selector" id="city-picker-search">
          <div class="selector-item storey province">
            <a href="javascript:;" class="selector-name reveal">请选择省份</a>
            <input type="hidden" name="userProvinceId" class="input-price val-error" value=""
                   data-required="userProvinceId">
            <div class="selector-list listing hide">
              <div class="selector-search">
                <input type="text" class="input-search" value="" placeholder="拼音、中文搜索">
              </div>
              <ul>
                <li>北京市</li>
                <li>天津市</li>
              </ul>
            </div>
          </div>
          <div class="selector-item storey city">
            <a href="javascript:;" class="selector-name reveal forbid">请选择城市</a>
            <input type="hidden" name="userCityId" class="input-price val-error" value=""
                   data-required="userCityId">
            <div class="selector-list listing hide">
              <div class="selector-search">
                <input type="text" class="input-search" value="" placeholder="拼音、中文搜索">
              </div>
              <ul></ul>
            </div>
          </div>
          <div class="selector-item storey district">
            <a href="javascript:;" class="selector-name reveal forbid">请选择区县</a>
            <input type="hidden" name="userDistrictId" class="input-price val-error" value=""
                   data-required="userDistrictId">
            <div class="selector-list listing hide">
              <div class="selector-search">
                <input type="text" class="input-search" value="" placeholder="拼音、中文搜索">
              </div>
              <ul></ul>
            </div>
          </div>
        </div>
        <span id="city-error" class="error" style="display: none">*必填</span>
      </div>

    </div>
    <div class="row">
      <div class="col-md-2 form-group form-left">
        <label>邮　　箱</label>
      </div>
      <div class="col-md-6 form-group form-right parentCls">
        <i class="iconfontyyy">&#xe61d;</i>
        <input name='email' type="text" data-validation="email"
               class="form-control inputElem" style="float: left">
      </div>
    </div>

    <div class="row">
      <div class="col-md-2 form-group form-left">
        <label>毕业院校</label>
      </div>
      <div class="col-md-6 form-group form-right">
        <i class="iconfontyyy">&#xe6f2;</i>
        <input v-model='school' type="text" name='school' class="form-control" placeholder="请填写院校全称">
      </div>
    </div>

    <div class="row">
      <div class="col-md-2 form-group form-left">
        <label>所学专业</label>
      </div>
      <div class="col-md-6 form-group form-right">
        <i class="iconfontyyy">&#xe8d6;</i>
        <input v-model='major' name='major' type="text" class="form-control" placeholder="请填写专业全称">
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 form-group form-left">
        <label>毕业年份</label>
      </div>
      <div class="col-md-6 form-group form-right">
        <i class="iconfontyyy">&#xe62a;</i>
        <input v-model='graduate' name='graduate' type="text" class="form-control" placeholder="如：2013">
      </div>
    </div>

    <div style="text-align: center;position: relative;">
      <a href="http://houxiaopang.com/apply" class="chooseType">&larr;返回身份选择</a>
      <input style="outline: none;border: none" type="submit" value="" class="mybtn"
             @click="valid_form1"/>
    </div>
  </form>
</template>

<script>
  export default{

    data(){
      return {
        name: "",
        sex: "",
        born: "",
        city: "",
        tel: "",
        email: "",
        qq: "",
        wx: "",
        school: "",
        major: "",
        graduate: "",
      }
    },

    mounted(){
      $('#city-picker-search').cityPicker({
        dataJson: cityData,
        renderMode: true,
        search: true,
        autoSelected: true,
        keyboard: true,
        storage: false,
        shorthand: true
      });
    },
    methods: {
      valid_form1: function () {
        var that = this;
        var validator = $("#form").validate({
          submitHandler: function (form) {
            that.showform2();
          },
          errorPlacement: function (error, element) {
            error.appendTo(element.parent());
          },
          rules: {
            name: "required",
            email: {
              required: true,
              email: true
            },
            tel: {
              required: true,
              maxlength: 11,
              minlength: 11
            },
            school: "required",
            major: "required",
            graduate: {
              required: true,
              number: true,
              maxlength: 4,
              minlength: 4
            },
          },
          messages: {
            name: "*必填",
            tel: {
              required: "*必填",
              maxlength: "*格式错误",
              minlength: "*格式错误"
            },
            email: {
              required: "*必填",
              email: "*格式错误"
            },
            school: "*必填",
            major: "*必填",
            graduate: {
              required: "*必填",
              number: "*格式错误",
              maxlength: "*格式错误",
              minlength: "*格式错误"
            },
          },
        });
      },

      showform2(){
        this.city = "";
        this.email = $("[name='email']").eq(0).val();
        var a = $("#city-picker-search").find("a");
        this.city += a.text();


        name = this.name;
        city = this.city;
        tel = this.tel;
        email = this.email;
        qq = this.qq;
        wx = this.wx;
        school = this.school;
        major = this.major;
        graduate = this.graduate;

        seen1 = true;
        this.$router.push("/from2");
      }
    }
  }

</script>
<style scoped>
  .chooseType {
    text-decoration: none;
    color: #bfbfbf;
    display: inline-block;
    line-height: 20px;
    position: absolute;
    top: 54px;
    left: 86px;
  }

  .chooseType:hover {
    color: #313131;
  }
</style>
