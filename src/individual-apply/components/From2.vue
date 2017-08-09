<template>
  <form class="row" id="form2" role="form">
    <!--start 企业形象设计-->
    <div class="row">
      <div class="col-md-4 form-group form-left">
        <label>企业形象设计</label>
      </div>
      <div class="col-md-8 form-group form-right">
        <ul class="list-unstyled">
          <li><input type="checkbox" name='category' value="LOGO设计"><span class="lb">LOGO设计</span>
          </li>
          <li><input type="checkbox" name='category' value="宣传画册"><span class="lb">宣传画册</span>
          </li>
          <li><input type="checkbox" name='category' value="海报三折页"><span class="lb">海报三折页</span>
          </li>
          <li><input type="checkbox" name='category' value="PPT美化"><span class="lb">PPT美化</span>
          </li>
          <br>
          <li><input type="checkbox" name='category' value="包装设计"><span class="lb">包装设计</span>
          </li>
          <li><input type="checkbox" name='category' value="吉祥物设计"><span class="lb">吉祥物设计</span>
          </li>
          <li><input type="checkbox" name='category' value="VI系统"><span class="lb">VI系统</span>
          </li>
        </ul>
      </div>
    </div>
    <!--end 企业形象设计-->
    <hr class="formsepline">
    <!--start ui-->
    <div class="row">
      <div class="col-md-4 form-group form-left">
        <label>UI类</label>
      </div>
      <div class="col-md-8 form-group form-right">
        <ul class="list-unstyled">
          <li><input type="checkbox" name='category' value="网页UI"><span class="lb">网页UI</span>
          </li>
          <li><input type="checkbox" name='category' value="APP UI"><span class="lb">APP UI</span>
          </li>
          <li><input type="checkbox" name='category' value="网店美化"><span class="lb">网店美化</span>
          </li>
          <li><input type="checkbox" name='category' value="H5设计"><span class="lb">H5设计</span>
          </li>
          <li><input type="checkbox" name='category' value="图标设计"><span class="lb">图标设计</span>
          </li>
        </ul>
      </div>
    </div>
    <!--end ui-->
    <hr class="formsepline">
    <!--start 插画类-->
    <div class="row">
      <div class="col-md-4 form-group form-left">
        <label>插画类</label>
      </div>
      <div class="col-md-8 form-group form-right">
        <ul class="list-unstyled">
          <li><input type="checkbox" name='category' value="书报刊插画"><span class="lb">书报刊插画</span>
          </li>
          <li><input type="checkbox" name='category' value="手绘"><span class="lb">手绘</span></li>
          <li><input type="checkbox" name='category' value="墙绘"><span class="lb">墙绘</span></li>
          <li><input type="checkbox" name='category' value="卡通形象"><span class="lb">卡通形象</span>
          </li>
          <li><input type="checkbox" name='category' value="表情包"><span class="lb">表情包</span></li>
        </ul>
      </div>
    </div>
    <!--end 插画类-->
    <hr class="formsepline">
    <div class="row">
      <div class="col-md-4 form-group form-left">
        <label>可工作时间</label>
      </div>
      <div class="col-md-8 form-group form-right">
        <ul class="list-unstyled">
          <li><input type="checkbox" value="1" name="worktime"><span class="lb">周一至周五白天</span></li>
          <li><input type="checkbox" value="2" name="worktime"><span class="lb">周一至周五晚间</span></li>
          <li><input type="checkbox" value="3" name="worktime"><span class="lb">周末</span></li>
          <li><input type="checkbox" value="4" name="worktime"><span class="lb">都可以</span></li>
          <li><input type="checkbox" value="5" name="worktime"><span class="lb">其他时间</span></li>
        </ul>

      </div>
    </div>
    <hr class="formsepline">
    <div class="row">
      <div class="col-md-4 form-group form-left">
        <label>工作状态</label>
      </div>
      <div class="col-md-8 form-group form-right">
        <ul class="list-unstyled">
          <li><input type="radio" value="1" name="identity"><span class="lb">在校学生</span></li>
          <li><input type="radio" value="2" name="identity"><span class="lb">广告/设计公司的专职设计师</span></li>
          <li><input type="radio" value="3" name="identity"><span class="lb">其他公司的专职设计师</span></li>
          <li><input type="radio" value="4" name="identity"><span class="lb">以上都不是</span></li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 form-group form-left">
        <label>项目经历 / 价格</label>
        <label class="help-block">(选填)</label>
      </div>

      <div class="col-md-8 form-group form-right">
        <textarea style="padding-left: 15px" id="textarea" maxlength="200" class="form-control"
                  v-model="project_text"
                  rows="6"></textarea>
        <span style="float: right;margin-right: 160px;"><var id="wordwrap"
                                                             class="word">200</var>/200</span>
      </div>
    </div>
    <div class="btns">
      <div class="nextbtn" v-on:click='valid_form2'></div>
      <div class="prevbtn" v-on:click='showform1'></div>
    </div>
  </form>
</template>
<script>
  export default{
    data(){
      return {
        project_text: '',
      }
    },
    methods: {
      valid_form2(){
        var worktype = $("input[name='category']:checked");
        if (worktype.length == 0) {
          alert("请勾选擅长的类型");
          return;
        }
        var checkedTIme = $("input[name='worktime']:checked");
        if (checkedTIme.length == 0) {
          alert("请勾选'可工作时间'");
          return;
        }
        var checkedIden = $("input[name='identity']:checked");
        if (checkedIden.length == 0) {
          alert("请勾选'工作状态'");
          return;
        }
        var cat = $("input[name='category']:checked");
        for (var i = 0; i < cat.length; i++) {
          category.push(cat[i].value);
        }
        var wor = $("input[name='worktime']:checked");
        for (var i = 0; i < wor.length; i++) {
          worktime.push(wor[i].value);
        }
        var iden = $("input[name='identity']:checked");
        if (iden[0] != null) {
          identity = iden[0].value;
        }
        project_text = this.project_text;
        this.showform3();
      },
      showform1(){
        seen1 = false;
        this.$router.push("/");
      },
      showform3(){
        seen2 = true;
        this.$router.push("/from3");
      },
      statInputNum() {
        var textArea = $("#textarea");
        var numItem = $("#wordwrap");
        var max = numItem.text(),
          curLength;
        textArea.attr("maxlength", max);
        curLength = textArea.val().length;
        numItem.text(max - curLength);
        textArea.on('input propertychange', function () {
          var a = max - $(this).val().length;
          numItem.text(a);
          if (a == '0') {
            numItem.get(0).style.color = "#f00";
          } else {
            numItem.get(0).style.color = "";
          }
        });
      }
    },
    mounted(){
      this.statInputNum();
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-red',
        radioClass: 'iradio_square-red',
        increaseArea: '20%' // optional
      });
    }

  }
</script>
