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
          <select name="category" v-model="category" style="width: 261px;">
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
          <span class="btn_span" v-show="img_url.length > 1" @click="sort">排序</span>
          <label>上传作品</label>
          <div style="float: left;max-width: 70%;">
            <div class="upfile">
              <div class="upwrapper">
                <ul>
                  <li>
                    <section class="addbtn">
                      <img src="http://image.houxiaopang.com/baseform/721/addpic.jpg"
                           class="add-img">
                      <input type="file" name="file"
                             value="" class="file" id="file" @change="appendImg"
                             accept="image/*" multiple/>
                    </section>
                  </li>
                  <imgthumb @img_url="rm(index)" v-for="(item,index) in img_url" v-bind:index="index"
                            v-bind:each_file="item" :key="index">
                  </imgthumb>
                </ul>
                <div id="tt" class="btn" style="display:none"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="context">
          <span class="err">*必填</span>
          <label>上传封面</label>
          <div style="float: left">
            <div class="upfile" style="padding-right: 30px;">
              <div class="upwrapper" style="height: 150px;">
                <section class="addbtn" id="album_cover">
                  <img id="cropedimg"
                       :src="ablumfile"
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
    <!--排序模态框-->
    <div class="mymodal" v-show="sortmodelshow">
      <div class="conte" style="width: 700px;height: 575px;overflow: hidden;padding: 0;">
        <div style="width: 100%;height: 40px;padding-left: 15px;padding-right:15px;padding-top: 10px;">
          <span>排序</span><span
          style="float: right;cursor: pointer"
          @click="sortmodelshow=false"><i class="iconfontyyy">&#xe67c;</i></span>
        </div>
        <div style="height: 495px;overflow-y: auto">
          <ul id="sort" style="position:relative;margin: 0 auto;width: 645px;">

          </ul>
        </div>
        <div style="height: 30px;">
          <span class="btn_span" @click="sortover"
                style="position:relative;top:0;left:0;float: right;margin-right: 52px;cursor: pointer">确定</span>
        </div>

      </div>
    </div>
    <!--上传封面模态框-->
    <div class="mymodal" v-show="modelshow">
      <div class="conte">
        <div style="width: 100%;line-height: 30px;height: 39px;"><span>上传封面</span><span
          style="float: right;cursor: pointer"
          @click="modelshow=false"><i class="iconfontyyy">&#xe67c;</i></span>
        </div>
        <div id="img-container">
          <img src="http://image.houxiaopang.com/admindash/cover_default.png">
        </div>
        <div style="float: left;margin-left: 10px;">
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
  function Pointer(x, y) {
    this.x = x;
    this.y = y;
  }
  function Position(left, top) {
    this.left = left;
    this.top = top;
  }
  export default{
    data(){
      return {
        title: '',
        desc: '',
        img_url: [],
        ablumfile: 'http://image.houxiaopang.com/baseform/721/addpic.jpg',
        category: 1,
        sortmodelshow: false,
        modelshow: false,//模态框显示
        // color: '#FB5E4B',
        //loading: false,
        img_index: 0,
        album_id: null,
      }
    },
    mounted(){
      registerup(this);//初始化上传图片
      cropper(this.uploadImg, {
        img: "#img-container > img",
        preview: "#img-preview",
        aspectRatio: 4 / 3,
        inputImage: "#inputImage"
      });
    },
    components: {
      'imgthumb': imgthumb,
      // BounceLoader
    },
    methods: {
      initPhoto(){
        $("#sort .item").each(function (i) {
          this.init = function () { // 初始化
            this.box = $(this).parent();
            $(this).attr("index", i).css({
              position: "absolute",
              left: this.box.get(0).offsetLeft,
              top: this.box.get(0).offsetTop
            }).appendTo("#sort");
            this.drag();
          },
            this.move = function (callback) {  // 移动
              $(this).stop(true).animate({
                left: this.box.get(0).offsetLeft,
                top: this.box.get(0).offsetTop
              }, 500, function () {
                if (callback) {
                  callback.call(this);
                }
              });
            },
            this.collisionCheck = function () {
              var currentItem = this;
              var direction = null;
              $(this).siblings(".item").each(function () {
                if (
                  currentItem.pointer.x > this.box.offset().left &&
                  currentItem.pointer.y > this.box.offset().top &&
                  (currentItem.pointer.x < this.box.offset().left + this.box.width()) &&
                  (currentItem.pointer.y < this.box.offset().top + this.box.height())
                ) {
                  // 返回对象和方向
                  if (currentItem.box.offset().top < this.box.offset().top) {
                    direction = "down";
                  } else if (currentItem.box.offset().top > this.box.offset().top) {
                    direction = "up";
                  } else {
                    direction = "normal";
                  }
                  this.swap(currentItem, direction);
                }
              });
            },
            this.swap = function (currentItem, direction) { // 交换位置
              if (this.moveing) return false;
              var directions = {
                normal: function () {
                  var saveBox = this.box;
                  this.box = currentItem.box;
                  currentItem.box = saveBox;
                  this.move();
                  $(this).attr("index", this.box.index());
                  $(currentItem).attr("index", currentItem.box.index());
                },
                down: function () {
                  // 移到上方
                  var box = this.box;
                  var node = this;
                  var startIndex = currentItem.box.index();
                  var endIndex = node.box.index();
                  ;
                  for (var i = endIndex; i > startIndex; i--) {
                    var prevNode = $("#sort .item[index=" + (i - 1) + "]")[0];
                    node.box = prevNode.box;
                    $(node).attr("index", node.box.index());
                    node.move();
                    node = prevNode;
                  }
                  currentItem.box = box;
                  $(currentItem).attr("index", box.index());
                },
                up: function () {
                  // 移到上方
                  var box = this.box;
                  var node = this;
                  var startIndex = node.box.index();
                  var endIndex = currentItem.box.index();
                  ;
                  for (var i = startIndex; i < endIndex; i++) {
                    var nextNode = $("#sort .item[index=" + (i + 1) + "]")[0];
                    node.box = nextNode.box;
                    $(node).attr("index", node.box.index());
                    node.move();
                    node = nextNode;
                  }
                  currentItem.box = box;
                  $(currentItem).attr("index", box.index());
                }
              }
              directions[direction].call(this);
            },
            this.drag = function () { // 拖拽
              var oldPosition = new Position();
              var oldPointer = new Pointer();
              var isDrag = false;
              var currentItem = null;
              $(this).mousedown(function (e) {
                e.preventDefault();
                oldPosition.left = $(this).position().left;
                oldPosition.top = $(this).position().top;
                oldPointer.x = e.clientX;
                oldPointer.y = e.clientY;
                isDrag = true;

                currentItem = this;

              });
              $(document).mousemove(function (e) {
                var currentPointer = new Pointer(e.clientX, e.clientY);
                if (!isDrag) return false;
                $(currentItem).css({
                  "opacity": "0.8",
                  "z-index": 999
                });
                var left = currentPointer.x - oldPointer.x + oldPosition.left;
                var top = currentPointer.y - oldPointer.y + oldPosition.top;
                $(currentItem).css({
                  left: left,
                  top: top
                });
                currentItem.pointer = currentPointer;
                // 开始交换位置

                currentItem.collisionCheck();


              });
              $(document).mouseup(function () {
                if (!isDrag) return false;
                isDrag = false;
                currentItem.move(function () {
                  $(this).css({
                    "opacity": "1",
                    "z-index": 0
                  });
                });
              });
            }
          this.init();
        });
      },
      sort(){
        this.sortmodelshow = true;
        this.$nextTick(function () {
          let ul = document.getElementById("sort");
          ul.innerHTML = "";
          [].forEach.call(this.img_url, function (url) {
            let str = ` <li>
            <div class="item" style="width: 200px;height: 150px;overflow: hidden"><img src="${url}" width="200"></div>
          </li>`;
            ul.innerHTML += str;
          });
          this.initPhoto();
        });

      },
      sortover(){
        var newsort = [];
        $("#sort .item").each(function () {
          newsort.push($(this).attr("index"));
        });
        var temp_img = [];
        var that = this;
        [].forEach.call(this.img_url, function (file, index) {
          temp_img[newsort[index]] = that.img_url[index];
        });
        this.img_url = temp_img;
        this.$nextTick(function () {
          this.sortmodelshow = false;
        });
      },
      uploadImg(result){//截图上传封面
        var cropedimg = document.getElementById("cropedimg");
        cropedimg.nextElementSibling.style.display = "block";
        this.modelshow = false;
        //todo 上传图片
        var pic = result.toDataURL();
        var uploadpic = pic.split(",")[1];
        var that = this;
        $.ajax({
          type: 'GET',
          url: 'http://houxiaopang.com/api/v1.0/apply/uptoken',
          success(data){
            //赋值给alllist数组,
            var url = "http://upload.qiniu.com/putb64/-1";
            var xhr = new XMLHttpRequest();
            //var xhrget = new XMLHttpRequest();
            // var obj;
            xhr.onreadystatechange = function () {
              if (xhr.readyState == 4) {
                var data = eval("(" + xhr.responseText + ")");
                that.ablumfile = "http://work.houxiaopang.com/" + data.key;
                /*cropedimg.src = pic;*/
                cropedimg.nextElementSibling.style.display = "none";
              }
            }
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.setRequestHeader("Authorization", "UpToken " + data.uptoken);
            xhr.send(uploadpic);
          },
        });
      },
      changeImg: function () {
        document.getElementById("inputImage").click();
      },
      rm(index){
        this.img_url.splice(index, 1);
        this.img_index--;
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
        for (var i = 0; i < 4; i++) {
          if ($(".err").eq(i).css("display") == "block") {
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
            title: that.title.trim(),
            work_list: JSON.stringify(that.img_url),
            cover: that.ablumfile,
            description: that.desc.trim(),
            category: that.category,
            album_id: that.album_id
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
      appendImg: function () {
        var file_input = document.getElementById("file");
        for (var i = 0, size = file_input.files.length; i < size; i++) {
          this.img_url.splice(this.img_url.length + i, 0, 0);
        }
        this.$nextTick(function () {
          for (var j = 0, jsize = file_input.files.length; j < jsize; j++) {
            // todo 直接上传  img .length  带上loading    imgutl[]
            uploader.addFile(file_input.files[j]);
          }
        });
      },
      show_upload_album: function () {
        this.modelshow = true;
      },
    },
    created(){
      this.album_id = this.$route.query.album_id;
      if (this.album_id) {
        var that = this;
        $.ajax({
          type: "get",
          url: "http://houxiaopang.com/api/v1.1/newalbum",
          headers: {"Authorization": "Token " + token},
          data: {
            album_id: that.album_id
          },
          success(data){
            if (data.code === 0) {
              var json = data.data;
              that.title = json.title;
              that.desc = json.description;
              that.img_url = json.worklist;
              that.ablumfile = json.cover;
              that.img_index = json.worklist.length;
              that.category = json.category;
              that.$nextTick(function () {
                $(".up-section").removeClass("loading");
                $(".up-img").removeClass("up-opcity");
              });
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          },
          error(){
            alert("网络拥挤，请稍后再试···");
          }
        });
      }
    },
    watch: {
      "$route"(){
        this.title = '';
        this.desc = '';
        this.img_url = [];
        this.ablumfile = 'http://image.houxiaopang.com/baseform/721/addpic.jpg';
        this.category = 1;
        this.sortmodelshow = false;
        this.modelshow = false;//模态框显示
        this.img_index = 0;
        this.album_id = null;
      }
    }

  }
</script>
<style>

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

  .btn_span {
    position: absolute;
    top: 30px;
    left: 149px;
    color: #313131;
    display: inline-block;
    cursor: pointer;
  }

  .btn_span:hover {
    color: #d01667;
  }

  #sort {
    list-style: none;
    overflow: hidden;
  }

  #sort > li {
    float: left;
    width: 200px;
    height: 150px;
    margin-right: 15px;
    margin-bottom: 15px;
  }

  #sort > li > .item {
    width: 200px;
    height: 150px;
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
    width: 630px;
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

  .upwrapper > ul {
  }

  .upwrapper > ul > li {
    float: left;
    width: 200px;
    height: 150px;
    margin-right: 15px;
    margin-bottom: 15px;
  }
</style>
