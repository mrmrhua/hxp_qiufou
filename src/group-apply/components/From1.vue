<template>
  <form class="row" id='form' role="form">
    <ul class="head-info" style="list-style: circle;">
      <li>为帮助客户更好的挑选心仪的设计师,请您根据下列要求如实填写。我们将对入驻申请进行审核,确保您有能力满足一般设计要求。<br>
      </li>
      <li>您的信任对我们而言意味着一切。正因如此，我们将绝对尊重并保护您的隐私。我们承诺您的隐私信息绝不会在未经许可的情况下外泄给不相关的第三方。
      </li>
    </ul>
    <p>联络人信息</p>
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
        <label>身　　份</label>
      </div>
      <div class="col-md-6 form-group form-right">
        <i class="iconfontyyy">&#xe656;</i>
        <input v-model='role' type="text" name='role' class="form-control" placeholder="请填写在单位中的职务">
      </div>
    </div>
    <p>公司&nbsp;/&nbsp;工作室基本信息</p>
    <div class="row">
      <div class="col-md-2 form-group form-left">
        <label>名　　称</label>
      </div>
      <div class="col-md-6 form-group form-right">
        <i class="iconfontyyy">&#xe6f2;</i>
        <input v-model='company_name' type="text" name='company_name' class="form-control" placeholder="请填写公司名称">
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 form-group form-left">
        <label>公司网站</label>
      </div>
      <div class="col-md-6 form-group form-right">
        <i class="iconfontyyy">&#xe641;</i>
        <input v-model='company_web' type="text" name='company_web' class="form-control" placeholder="选填">
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
      </div>

    </div>

    <div class="row">
      <div class="col-md-2 form-group form-left">
        <label style="position: relative;">公司规模<span
          style="position: absolute;top: 20px;right: 20px;">（选填）</span></label>
      </div>
      <div class="col-md-8 form-group form-right">
        <ul class="list-unstyled" style="margin-top: 15px">
          <li><input type="radio" value="1" name="company_size"><span class="lb">5人以下</span></li>
          <li><input type="radio" value="2" name="company_size"><span class="lb">5-20人</span></li>
          <li><input type="radio" value="3" name="company_size"><span class="lb">20-50人</span></li>
          <li><input type="radio" value="4" name="company_size"><span class="lb">50人以上</span></li>
        </ul>
      </div>
    </div>
    <div style="text-align: center;position:relative;">
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
        name: "",//姓名
        tel: "",//电话
        qq: "",//QQ
        wx: "",//微信
        email: "",//邮箱
        role: '',//身份
        company_web: '',//公司网站
        company_name: '',//公司名称
        company_size: null,//公司规模1-4
        city: "",//所在地
      }
    },
    mounted(){
      $("[type='radio']").iCheck({
        checkboxClass: 'icheckbox_square-red',
        radioClass: 'iradio_square-red',
        increaseArea: '20%' // optional
      });
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
        $("#form").validate({
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
            role: "required",
            company_name: 'required'

          },
          messages: {
            name: "*必填",
            role: '*必填',
            company_name: '*必填',
            tel: {
              required: "*必填",
              maxlength: "*格式错误",
              minlength: "*格式错误"
            },
            email: {
              required: "*必填",
              email: "*格式错误"
            },
          },
        });
      },

      showform2(){
        city = "";
        email = $("[name='email']").eq(0).val();
        var a = $("#city-picker-search").find("a");
        city += a.text();

        var companysize = $("input[name='company_size']:checked");
        if (companysize.length > 0) {
          //公司规模
          company_size = companysize.eq(0).val();
        }
        name = this.name;
        tel = this.tel;
        qq = this.qq;
        wx = this.wx;
        role = this.role;
        company_web = this.company_web;
        company_name = this.company_name;
        seen1 = true;
        this.$router.push("/from2");
      }
    }
  }

</script>
<style scoped>
  p {
    color: #d01667;
    font-size: 24px;
    padding-left: 85px;
    margin-bottom: 30px;
  }

  p:nth-of-type(2) {
    margin-top: 30px;
  }

  .list-unstyled > li {
    float: left;
    margin-right: 20px;
  }
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
  #taxbox {
    display: inline-block;
    width: 40px;
    border-bottom: 1px solid #000;
    outline: none;
    padding-left: 10px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    height: 20px;
    vertical-align: top;
  }
</style>
