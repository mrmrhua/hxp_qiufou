<template>
  <form style="padding: 0 32px 32px 32px" class="row">
    <div class="row">
      <div class="col-md-2 form-group form-left">
        <label>个人网址</label>
        <label class="help-block">(选填)</label>
      </div>
      <div class="col-md-8 form-group form-right" style="padding-left: 15px">
        <i class="iconfontyyy" style="left:15px">&#xe664;</i>
        <input class="form-control" type="text" v-model="blog_url" placeholder="站酷、lofter或其他个人博客">
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 form-group form-left">
        <label>作品图片</label>
        <label class="help-block">(不超过9张,每张小于10M的jpg,png等）</label>
      </div>
      <div class="img-box col-md-10">
        <div class="img-section">
          <!--<p class="up-p"><span class="up-span">最多可以上传9张图片</span></p>-->
          <div class="z_photo upimg-div clear">
            <Imgthumb @removeimg="removeImg(id)" v-for="(each_file,index) in file_L" v-bind:each_file="each_file"
                      v-bind:index='index' :key="index"></Imgthumb>
            <section class="z_file fl" id="z_file">
              <img src="http://image.houxiaopang.com/baseform/721/addpic.jpg" class="add-img">
              <input type="file" name="file" id="testup" class="file" value=""
                     accept="image/jpg,image/jpeg,image/png,image/bmp" multiple/>
            </section>
          </div>

        </div>
      </div>
    </div>
    <div class="ag-row row col-md-offset-2" style="padding-left: 170px">
      <input type="checkbox" name='agreement'><span class="lb">我已知晓并同意<a target="_blank"
                                                                         href="http://image.houxiaopang.com/agreement/%E7%8C%B4%E5%B0%8F%E8%83%96%E7%BD%91%E7%AB%99%E6%9D%A1%E6%AC%BE.pdf">用户协议</a></span>
    </div>
    <hr style="margin-top: 20px">
    <div class="btns">
      <div class="prevbtn" v-on:click='showform2'></div>
      <div class="submitbtn" v-on:click='submitapply'></div>
    </div>
    <div id="tt" class="btn" style="display:none"></div>
  </form>
</template>
<script>
  import Imgthumb from "@/components/Imgthumb"
  export default{
    data(){
      return {
        file_L: [],
        blog_url: '',
        img_url: []
      }
    },
    methods: {
      showform2(){
        seen2 = false;
        this.$router.push("/from2");
      },
      submitapply(){
        //提交表单
        if (this.file_L.length == 0) {
          alert("请上传文件");
          return;
        }

        var isAgree = $("input[name='agreement']:checked");
        if (isAgree.length == 0) {
          alert("请勾选'我已知晓并同意用户协议'");
          return;
        }
        var that = this;
        $.ajax({
          url: 'http://houxiaopang.com/api/v1.1/apply/form',
          type: 'post',
          headers: {"Authorization": "Token " + token},
          async: true,
          data: {
            name: $.trim(name),
            tel: $.trim(tel),
            email: $.trim(email),
            city: $.trim(city),
            qq: $.trim(qq),
            wx: $.trim(wx),
            school: $.trim(school),
            major: $.trim(major),
            graduate: $.trim(graduate),
            category: JSON.stringify(category),
            worktime: JSON.stringify(worktime),
            identity: $.trim(identity),
            project_text: $.trim(project_text),
            blog_url: $.trim(that.blog_url),
            img_url: JSON.stringify(that.img_url),
          },
          timeout: 5000,    //超时时间
          dataType: 'json',
          success: function (result) {
            if (result.code == 0) {
              applystatus == 1;
              that.$router.push("/from4");
            } else {
              alert('网络拥挤,请稍后再试');
            }
          },
          error: function (data) {
            alert('网络拥挤,请稍后再试');
          }
        });

      },
      appendfile: function (file) {
        this.file_L.push(file);
      },
      removeImg(index){
        this.file_L.splice(index, 1);
        this.img_url.splice(index, 1);
        if (num < 9) {
          $("#z_file").show();
        }
      }
    },
    components: {
      Imgthumb
    },
    mounted(){
      registerup(this);
      appendimg(this);
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-red',
        radioClass: 'iradio_square-red',
        increaseArea: '20%' // optional
      });
    }

  }
</script>
