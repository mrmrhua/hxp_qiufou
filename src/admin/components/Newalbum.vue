<template id="newablue">
  <div class="conbody">
    <!-- <div v-show="loading" style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 100;background: #fff;">
       <BounceLoader :loading="loading" :color="color"
                     style="margin: 200px auto;display: block;width: 60px;"></BounceLoader>
     </div>-->
    <p class="head">上传作品集</p>
    <div class="content">
      <form class="content_form">
        <div class="context">
          <span class="err">*必填</span>
          <label>标　　题</label>
          <input v-model="title" type="text" placeholder="请输入作品名称">
        </div>
        <div class="context">
          <span class="err" style="left:50px;">*限200字</span>
          <label>简　　介<span style="position: absolute;left: 143px;top: 30px;color: #999;">(选填)</span></label>
          <textarea v-model="desc" rows="4" placeholder="请输入作品说明（限200字）"></textarea>
        </div>
        <div class="context">
          <label>所属品类</label>
          <select name="category" style="width: 261px;">
            <option value="1">PPT</option>
            <option value="2">UI</option>
            <option value="3">文本画册</option>
            <option value="4">海报展板</option>
            <option value="5">LOGO</option>
            <option value="6">企业形象设计（VI）</option>
          </select>
        </div>

        <div class="context">
          <span class="err">*必填</span>
          <label>上传作品</label>
          <div style="float: left;max-width: 70%;">
            <div class="upfile">
              <div class="upwrapper">
                <section class="addbtn">
                  <img src="http://image.houxiaopang.com/baseform/721/addpic.jpg"
                       class="add-img">
                  <input type="file" name="file"
                         value="" class="file" id="file" @change="appendImg"
                         accept="image/jpg,image/jpeg,image/png,image/bmp" multiple/>
                </section>
                <imgthumb @filelist="rm(index)" v-for="(item,index) in fileList" v-bind:index="index"
                          v-bind:each_file="item" :key="item.id"></imgthumb>
                <div id="tt" class="btn" style="display:none"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="context">
          <span class="err">*必填</span>
          <label>上传封面</label>
          <div style="float: left">
            <div class="upfile">
              <div class="upwrapper">
                <section class="addbtn" id="album_cover">
                  <img id="cropedimg"
                       src="http://image.houxiaopang.com/baseform/721/addpic.jpg"
                       class="add-img" @click="show_upload_album">
                  <div class="zhezhao"><img
                    src="http://image.houxiaopang.com/baseform/loading.gif"></div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div class="btn_image" @click="submit">提交材料</div>
      </form>
    </div>
    <div class="mymodal" v-show="modelshow">
      <!--模态框-->
      <!--todo 上传插件 start -->
      <div class="conte">
        <div style="width: 100%;line-height: 30px;height: 39px;"><span>上传封面</span><span
          style="float: right;cursor: pointer"
          @click="modelshow=false"><i class="iconfontyyy">&#xe67c;</i></span>
        </div>
        <div id="img-container">
          <img src="http://image.houxiaopang.com/admindash/cover_default.png">
        </div>

        <div style="float: left;margin-left: 40px;">
          <div id="img-preview"></div>
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
          <button @click="changeImg" style="width: 120px">选择文件
            <input style="display: none;" id="inputImage" name="file" type="file" accept="image/*">
          </button>
          <button style="float: right;width:100px;margin-top: 10px;" data-method="getCroppedCanvas" type="button">
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import token from "@/components/token.js"
  import imgthumb from "@/components/Imgthumb"

  // import BounceLoader from 'vue-spinner/src/BounceLoader.vue'

  export default{
    data(){
      return {
        title: '',
        desc: '',
        fileList: [],
        img_url: [],
        ablumfile: '',
        modelshow: false,//模态框显示
        // color: '#FB5E4B',
        //loading: false,
      }
    },
    mounted(){
      registerup(this);
      cropper(this);
    },
    components: {
      'imgthumb': imgthumb,
      // BounceLoader
    },
    methods: {
      changeImg: function () {
        document.getElementById("inputImage").click();
      },
      rm(index){
        this.fileList.splice(index, 1);
        this.img_url.splice(this.index, 1);
      },
      submit: function () {
        if (this.title === null || this.title.trim() === "") {
          $(".err").eq(0).css("display", "block");
        } else {
          $(".err").eq(0).css("display", "none");
        }
        if (this.desc.length > 200) {
          $(".err").eq(1).css("display", "block");
        } else {
          $(".err").eq(1).css("display", "none");
        }
        if (this.img_url.length <= 0) {
          $(".err").eq(2).css("display", "block");
        } else {
          $(".err").eq(2).css("display", "none");
        }
        if (this.ablumfile == '') {
          $(".err").eq(3).css("display", "block");
        } else {
          $(".err").eq(3).css("display", "none");
        }
        console.log(this.ablumfile + '1');
        for (var i = 0; i < 4; i++) {
          if ($(".err").eq(i).css("display") == "block") {
            alert(i);
            return;
          }
        }
        // this.loading = true;
        var that = this;
        //todo 提交
        $.ajax({
          headers: {"Authorization": "Token " + token},
          url: "http://houxiaopang.com/api/v1.1/newalbum",
          type: "POST",
          data: {
            title: this.title.trim(),
            work_list: JSON.stringify(this.img_url),
            cover: this.ablumfile,
            description: this.desc.trim(),
            category: $("[name='category']").val(),
          },
          timeout: 5000,
          success: function (data) {
            //setTimeout(function(){
            //  that.loading = false;
            // },500);
            if (data.code == "0") {
              that.$router.push({path: '/'});
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          },
          error: function (e) {
            if (e.status === 401) {
              location.href = "http://houxiaopang.com/qrlogin";
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          }
        });
      },
      addFile: function (files) {
        this.fileList.push(files);
      },
      appendImg: function () {
        var file_input = document.getElementById("file");
        for (var i = 0, size = file_input.files.length; i < size; i++) {
          this.addFile(file_input.files[i]);
        }
      },
      show_upload_album: function () {
        this.modelshow = true;
      },

    }

  }
</script>
<style scoped>
  .conbody {
    margin: 0 auto;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .conbody > p {
    line-height: 60px;
    height: 60px;
    background-color: #f7fafa;
    padding-left: 15px;
    font-size: 24px;
  }

  .conbody > .content {
    background: #fff;
    position: absolute;
    top: 60px;
    width: 100%;
  }

  .content_form {
    width: 1000px;
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

  .context > textarea {
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
    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "HeitiSC", "WenQuanYi Micro Hei", sans-serif;
  }

  .context > textarea:focus {
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

  .context > select:focus {
    border-color: #545ca6;
  }

  .upfile {
    border: 2px dashed #e0e4e8;
    padding: 30px 15px 30px 30px;
    float: left;
  }

  .addbtn {
    width: 200px;
    height: 150px;
    display: inline-block;
    margin-right: 12px;
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
    z-index: 100;
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

  .err {
    display: none;
    color: #f00;
    position: absolute;
    top: 0;
    left: 75px;
  }

  .zhezhao {
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

  .btn_image {
    width: 150px;
    height: 39px;
    margin: 60px 0 80px 200px;
    cursor: pointer;
    border-radius: 25px;
    text-align: center;
    line-height: 39px;
    color: #788188;
    background-color: #fff;
    border: 1px solid #dbe2e7;
    border-bottom-color: #d5dde3;
    box-shadow: 0 1px 1px rgba(90, 90, 90, 0.1);
  }

  .btn_image:hover {
    border: 1px solid #adadad;
    color: #333;
    background-color: #ebebeb;
  }

  .mymodal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 20;
  }

  .mymodal > .conte {
    width: 600px;
    margin: 30px auto;
    overflow: hidden;
    background: #FFF;
    border-radius: 5px;
    padding: 15px;
  }

  #img-container {
    width: 400px;
    height: 400px;
    float: left
  }

  #img-preview {
    width: 160px;
    height: 120px;
    overflow: hidden;
  }

  .mymodal > .conte > .div_btns {
    width: 100%;
    height: 50px;
    float: left;
    line-height: 50px;
  }

  .mymodal > .conte > .div_btns > button {
    border-radius: 25px;
    width: 70px;
    height: 30px;
    outline: none;
    cursor: pointer;
    text-align: center;
    color: #788188;
    background-color: #fff;
    border: 1px solid #dbe2e7;
    border-bottom-color: #d5dde3;
    box-shadow: 0 1px 1px rgba(90, 90, 90, 0.1);
  }

  .mymodal > .conte > .div_btns > button:hover {
    border: 1px solid #adadad;
    color: #333;
    background-color: #ebebeb;
  }

  .mymodal > .conte > .div_btns > i {
    display: inline-block;
    width: 50px;
    text-align: center;
    vertical-align: top;
    cursor: pointer;
  }
</style>
