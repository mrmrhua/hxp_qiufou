<template>
  <div>
    <div style="margin-bottom: 60px">
      <span class="back" @click="back">< 返回</span>
    </div>
    <div class="context">
      <div style="width: 800px;overflow:hidden;">
        <div class="upfile">
          <span class="btn_span iconfontyyy" v-show="img_url.length >1" @click="sort">&#xe629; 排序</span>
          <div class="upwrapper">
            <ul>
              <li>
                <section class="addbtn">
                  <img src="http://image.houxiaopang.com/baseform/721/addpic.jpg"
                       class="add-img">
                  <input type="file" name="file"
                         value="" class="file" id="file" @change="appendImg"
                         accept="image/jpg,image/jpeg,image/png,image/gif" multiple/>
                </section>
              </li>
              <imgthumb @img_url="rm" v-for="(item,index) in img_url" v-bind:index="index"
                        v-bind:each_file="item" :key="index">
              </imgthumb>
            </ul>
            <div id="tt" class="btn" style="display:none"></div>
            <p class="label">添加注释</p>
            <textarea v-model="desc" rows="4" placeholder="请输入注释"></textarea>
            <p @click="submint" class="btn_image">提交</p>
          </div>
        </div>
      </div>
    </div>
    <div v-for="item in post">
      <div style="margin: 30px 0 10px">{{item.up_time}}</div>
      <div class="list">
        <ul>
          <li v-for="imgs in item.imglist"><img style="cursor:pointer;" @click="showimg(imgs)" :src="imgs" alt=""></li>
        </ul>
        <div class="desc">{{item.desc}}</div>
      </div>
    </div>
    <!--排序模态框-->
    <div class="mymodal" v-show="sortmodelshow">
      <div class="conte" style="width: 700px;height: 585px;overflow: hidden;padding: 0;">
        <div style="width: 100%;height: 50px;padding-left: 28px;padding-right:15px;padding-top: 15px;">
          <span>排序</span><span
          style="float: right;cursor: pointer"
          @click="close"><i class="iconfontyyy">&#xe67c;</i></span>
        </div>
        <div style="height: 495px;overflow-y: auto">
          <ul id="sort" style="margin: 0 auto;width: 645px;">
          </ul>
        </div>
        <div style="height: 30px;">
          <span class="btn_image" style="margin: 0 50px 0 0;height: 30px;line-height: 30px;width: 100px;float: right;"
                @click="sortover">确定</span>
        </div>

      </div>
    </div>
    <prompt :prompt="prompt" :promptshow="promptshow"></prompt>
  </div>
</template>
<script>
  import imgthumb from "@/components/Imgthumb"
  import prompt from "@/components/Prompt"

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
        img_url: [],
        post: [],
        id: null,
        img_index: 0,
        promptshow: false,
        sortmodelshow: false,
        desc: "",
        prompt: {
          type: 1,
          text: "成功"
        },
        replay: false
      }
    },
    components: {
      'imgthumb': imgthumb,
      prompt
    },
    created(){
      this.id = this.$route.params.id;
      this.getinfo()
    },
    mounted(){
      registerup(this);//初始化上传图片
    },
    methods: {
      showsumbit(){
        this.promptshow = true
        this.prompt = {
          type: 2,
          text: "提交中···"
        }
      },
      showsuccess(){
        this.promptshow = true
        this.prompt = {
          type: 1,
          text: "成功"
        }
      },
      hideprompt(){
        this.promptshow = false
      },
      close(){
        document.body.style.overflow = 'auto';
        this.sortmodelshow = false
      },
      initPhoto(){
        $("#sort .item").each(function (i) {
          this.init = function () { // 初始化
            this.box = $(this).parent();
            $(this).attr("index", i).css({
              position: "absolute",
              left: this.box.offset().left,
              top: this.box.offset().top
            }).appendTo("#sort");
            this.drag();
          },
            this.move = function (callback) {  // 移动
              $(this).stop(true).animate({
                left: this.box.offset().left,
                top: this.box.offset().top
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
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden"
        this.sortmodelshow = true;
        this.$nextTick(function () {
          var ul = document.getElementById("sort");
          ul.innerHTML = "";
          [].forEach.call(this.img_url, function (url) {
            var str = "<li><div class='item' style='width: 200px;height: 150px;overflow: hidden'><img src='" + url + "' width='200'></div></li>";
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
          this.close();
        });

      },
      rm(index){
        this.img_url.splice(index, 1);
        this.img_index--;
      },
      appendImg(){
        this.replay = true
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
      submint(){
        if (this.img_url.length <= 0) {
          alert("请上传图片");
          return
        }
        if (this.replay) {
          alert("请等待图片上传完成。");
          return
        }
        this.showsumbit()
        var desc = this.desc.trim() === "" ? null : this.desc
        var that = this
        $.ajax({
          url: "https://m.houxiaopang.com/wxapi/v1.1/postlist",
          type: "post",
          headers: {"Authorization": "Token " + token},
          data: {
            'imglist': JSON.stringify(that.img_url),
            'project_id': that.id,
            'desc': desc
          },
          success(data) {
            if (data.code === 0) {
              that.img_url = []
              that.img_index = 0
              that.desc = ""
              that.getinfo()
            } else {
              alert("网络拥挤，请稍后再试···");
            }
            that.hideprompt();
          },
          error(){
            alert("网络拥挤，请稍后再试···");
            that.hideprompt();
          }
        });
      },
      getinfo(){
        var that = this
        $.ajax({
          url: "https://m.houxiaopang.com/wxapi/v1.1/postlist",
          type: "GET",
          data: {
            project_id: that.id
          },
          success(data) {
            if (data.code === 0) {
              that.post = data.data.post
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          },
          error(){
            alert("网络拥挤，请稍后再试···");
          }
        });
      },
      showimg(src){
        open(src, '图片预览');
      },
      back(){
        this.$router.back()
      }
    }
  }
</script>

<style>
  .label {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  textarea {
    width: 100%;
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

  textarea:focus {
    border-color: #545ca6;
  }

  .upfile {
    border: 2px dashed #e0e4e8;
    padding: 40px 15px 30px;
    float: left;
    width: 800px;
    position: relative;
  }

  .addbtn {
    width: 240px;
    height: 180px;
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

  .back {
    cursor: pointer;
    opacity: 0.4;
  }

  .back:hover {
    opacity: 1;
  }

  .btn_span {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #bbb;
    display: inline-block;
    cursor: pointer;
    font-size: 14px;
  }

  .btn_span:hover {
    color: #d01667 !important;
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

  .addbtn > .zhezhao {
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

  .list {
    width: 800px;
    border: 1px solid #d9d9d9;
    padding: 10px 15px;
  }

  .list > ul {
    list-style: none;
    overflow: hidden;
  }

  .list > ul > li {
    float: left;
    width: 240px;
    height: 180px;
    margin-right: 24px;
    overflow: hidden;
  }

  .list > ul > li:nth-child(3n) {
    margin-right: 0;
  }

  .list > ul > li > img {
    width: 240px;
  }

  .desc {
    padding: 10px 0;
    font-size: 16px;
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
    width: 240px;
    height: 180px;
  }

  .upwrapper > ul {
    overflow: hidden;
  }

  .upwrapper > ul > li {
    float: left;
    width: 240px;
    height: 180px;
    margin-right: 23px;
    margin-bottom: 15px;
  }

  .upwrapper > ul > li:nth-child(3n) {
    margin-right: 0;
  }
</style>
