<template id="newablue">
  <div class="conbody">
    <!--<p style="font-size: 16px;">上传作品集</p>-->
    <div class="labelpage">
      <ul>
        <li @click="showlocalfrom" :class="{labelpage_active : localfrom}">上传本地作品</li>
        <li @click="showplatfrom" :class="{labelpage_active : platfrom}">其它平台导入</li>
      </ul>
    </div>
    <div class="content" id="content">
      <form class="content_form" v-show="localfrom">
        <div class="context">
          <span class="err">*必填</span>
          <label>标　　题</label>
          <input v-model="title" type="text" placeholder="请输入作品名称">
        </div>
        <div class="context">
          <label>简　　介<span style="position: absolute;left: 96px;top: 25px;color: #999;">(选填)</span></label>
          <textarea id="editor" placeholder="请输入作品简介"  v-model="desc"></textarea>
          <!--<textarea v-model="desc" rows="4" placeholder="请输入作品说明（限200字）"></textarea>-->
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
          <label>作品价格区间</label>
          <select name="price"  v-model="price" style="width: 261px;">
            <option value="无">无</option>
            <option value="0-2000元">0-2000元</option>
            <option value="2000-4000元">2000-4000元</option>
            <option value="4000-6000元">4000-6000元</option>
            <option value="6000-8000元">6000-8000元</option>
            <option value="8000元以上">8000元以上</option>
          </select>
        </div>

        <div class="context">
          <label>作品转载权限</label>
          <ul >
            <li><input type="checkbox" value="1" name="power"><span class="checkbox_span">禁止商用</span></li>
            <li style="margin-left: 160px"><input type="checkbox" value="2" name="power"><span class="checkbox_span">禁止匿名转载</span></li>
            <li style="margin-left: 160px"><input type="checkbox" value="3" name="power"><span class="checkbox_span">禁止个人使用</span></li>
          </ul>
        </div>

        <div class="context">
          <span class="err">*必填</span>
          <label>禁止右键保存</label>
          <div>
            <input type="radio" value="true" name="ban" checked><span style="margin-right: 20px;margin-left: 10px">是</span>
            <input type="radio" value="false" name="ban"><span style="margin-right: 20px;margin-left: 10px">否</span>
          </div>
        </div>

        <div class="context">
          <span class="err">*必填</span>
          <span class="btn_span iconfontyyy" v-show="img_url.length > 1" @click="sort">&#xe629; 排序</span>
          <label>上传作品</label>
          <div style="float: left;max-width: 60%;">
            <div class="upfile" style="padding-top:45px;">
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
                <section class="addbtn" id="album_cover" style="overflow: hidden;">
                  <img id="cropedimg" style="height: auto;"
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
      <form class="content_form" v-show="platfrom">
        <div class="context">
          <span class="err">*必填</span>
          <label style="text-align: left;width: auto;margin-left: 50px">请选择平台</label>
<!--          <span style="color: #bbb;font-size: 12px;">(目前仅支持以下四个平台)</span>-->
          <ul id="platname">
            <li class="plat_active">站酷</li>
            <li class="plat_can" style="pointer-events: none;background: #ffffff;color: #bbb">更多平台敬请期待</li>
<!--            <li class="plat_can" style="pointer-events: none;background: #e0e0e0">UI中国</li>
            <li class="plat_can" style="pointer-events: none;background: #e0e0e0">Bechance</li>
            <li class="plat_can" style="pointer-events: none;background: #e0e0e0">Lofter</li>-->
          </ul>
        </div>
        <div class="context" style="padding-bottom: 40px;margin-bottom: 0px">
          <div>
            <span class="err">*必填</span>
            <label style="text-align: left;margin-left: 50px">请输入您的个人主页地址</label>
          </div>
          <span  style="position:absolute;top: auto;bottom:30px;left: 150px;font-size: 12px;color: #bbb">参考:www.zcool.com.cn/u/xxxxx 或 xxxxxxx.zcool.com.cn</span>
          <span class="err" style="top: auto;bottom:10px;left: 150px">请填写正确地址</span>

          <input type="text" v-model="prourl" style="width: 60%;height: 40px;margin: 20px 0 20px 150px">
        </div>
        <div class="context">
          <label style="text-align: left;margin-left: 50px;font-size: 12px;width: auto">友情提示:</label>
          <p style="width:60%;display: inline-block;font-size: 12px">您只能输入属于自己作品的链接。猴小胖不允许任何窃取他人创意成果的行为，一经查实将封禁账号，并追究法律责任！</p>
        </div>
        <div class="btn_image" style="width: 120px" @click="submitplatfrom">提交</div>
      </form>
      <form class="content_form" v-show="leading">
        <div class="context" style="display: table;width: 100%">
          <div class="leading">
            <img src="../../static/img/wait.png" alt="" style="height: 54px;width: 54px">
            <p style="font-size: 16px;margin-top: 58px">系统将为您导入，预计在十分钟内完成。</p>
          </div>

        </div>
      </form>
    </div>
    <!--排序模态框-->
    <div class="mymodal" v-show="sortmodelshow">
      <div class="conte" style="width: 700px;height: 585px;overflow: hidden;padding: 0;">
        <div style="width: 100%;height: 50px;padding-left: 28px;padding-right:15px;padding-top: 15px;">
          <span>排序</span><span
          style="float: right;cursor: pointer"
          @click="closeovser"><i class="iconfontyyy">&#xe67c;</i></span>
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
    <prompt prompt="success" :promptshow="promptshow"></prompt>
    <!--上传封面模态框-->
    <div class="mymodal" v-show="modelshow">
      <div class="conte">
        <div style="width: 100%;line-height: 30px;height: 39px;"><span>上传封面</span><span
          style="float: right;cursor: pointer"
          @click="close"><i class="iconfontyyy">&#xe67c;</i></span>
        </div>
        <div id="img-container">
          <img id="new_img" crossorigin="anonymous" src="../../static/img/cover_default.png">
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
            <input style="display: none;" id="inputImage" name="file" type="file"
                   accept="image/jpg,image/jpeg,image/png">
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
        flag: true,
        platFlag:true,
        promptshow: false,
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
        imgupload: false,
        editor:null,
        price:'无',
        not_business:false,
        not_anonymous:false,
        not_single:false,
        not_saved:true,

        toolbar: ['bold', 'italic', 'underline', 'strikethrough',
          'color', '|', 'ol', 'ul',  '|',
          'link', '|', 'indent', 'outdent'
        ],//自定义工具栏

        localfrom:true,
        platfrom:false,
        leading:false,
        prourl:'',
      }
    },
    mounted(){
        // 初始化富文本插件
      this.editor = new Simditor({
        textarea: $('#editor'),
        placeholder: '',
        params: {},
        upload: false,
        tabIndent: true,
        toolbar: this.toolbar,
        toolbarFloat: true,
        toolbarFloatOffset: 0,
        toolbarHidden: false,
        pasteImage: false,
        cleanPaste: false,
      });
      // 初始化平台选择点击事件
      this.platclick();

      registerup(this);//初始化上传图片

      // 初始化截图插件
      cropper(this.uploadImg, {
        img: "#new_img",
        preview: "#img-preview",
        aspectRatio: 4 / 3,
        inputImage: "#inputImage"
      });
      // 初始化选择宽状态
      $("input[type='checkbox']").iCheck({
        checkboxClass: 'icheckbox_square-red',
        radioClass: 'iradio_square-red',
        increaseArea: '20%' // optional
      });
      $("input[type='radio']").iCheck({
        radioClass: 'iradio_square-red',
      });
    },
    components: {
      'imgthumb': imgthumb,  // 上传图片的渲染样式
      // BounceLoader
      prompt // 好看的成功提示框
    },
    methods: {
      initPhoto(){ // 初始化排序功能
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
      sort(){ // 排序点击事件
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden"
        this.sortmodelshow = true;
        this.$nextTick(function () {
          var ul = document.getElementById("sort");
          ul.innerHTML = "";
          [].forEach.call(this.img_url, function (url) {
            url += "?imageView2/1/w/200/h/150";
            var str = "<li><div class='item' style='width: 200px;height: 150px;overflow: hidden'><img src='" + url + "' width='200'></div></li>";
            ul.innerHTML += str;
          });
          this.initPhoto();
        });

      },
      close(){ // 关闭模态框
        document.body.style.overflow = "auto"
        this.modelshow = false
      },
      closeovser(){ // 关闭排序模态框
        document.body.style.overflow = "auto";
        this.sortmodelshow = false;
      },
      sortover(){ //结束排序
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
          document.body.style.overflow = "auto"
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
          url: 'http://www.houxiaopang.com/api/v1.0/apply/uptoken',
          success(data){
            //赋值给alllist数组,
            var url = "http://upload.qiniu.com/putb64/-1";
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
              if (xhr.readyState == 4) {
                var data = eval("(" + xhr.responseText + ")");
                that.ablumfile = "http://work.houxiaopang.com/" + data.key;
                cropedimg.nextElementSibling.style.display = "none";
              }
            };
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.setRequestHeader("Authorization", "UpToken " + data.uptoken);
            xhr.send(uploadpic);
          },
        });
      },
      changeImg: function () { // 添加图片点击
        document.getElementById("inputImage").click();
      },
      rm(index){ // 删除图片
        this.img_url.splice(index, 1);
        this.img_index--;
      },
      submit: function () { // 提交作品
        this.desc = this.editor.getValue()
        //禁止右键保存选中
        let ban = $("input[type='radio'][name='ban']:checked");
        if(ban[0]){
          if(ban[0].value === "true"){
            this.not_saved = true;
          }else if(ban[0].value === "false"){
            this.not_saved = false;
          }
        }

        // this.loading = true;
        if (this.title === null || this.title.trim() === "") {
          $(".err").eq(0).css("display", "block");
        } else {
          $(".err").eq(0).css("display", "none");
        }
        if (this.not_saved === null) {
          $(".err").eq(1).css("display", "block");
        } else {
          $(".err").eq(1).css("display", "none");
        }
        if (this.img_url.length <= 0) {
          $(".err").eq(2).css("display", "block");
        } else {
          $(".err").eq(2).css("display", "none");
        }
        if (this.ablumfile == 'http://image.houxiaopang.com/baseform/721/addpic.jpg') {
          $(".err").eq(3).css("display", "block");
        } else {
          $(".err").eq(3).css("display", "none");
        }
        for (var i = 0; i < 4; i++) {
          if ($(".err").eq(i).css("display") == "block") {
            return;
          }
        }

        //作品转载权限
        this.not_business = false;
        this.not_anonymous = false;
        this.not_single = false;
        let power = $("input[type='checkbox'][name='power']:checked");
        if(power.length != 0){
          for(let i=0;i<power.length;i++){
            if(power[i].value === "1"){
              this.not_business = true;
            }else if(power[i].value === "2"){
              this.not_anonymous = true;
            }else{
              this.not_single = true;
            }
          }
        }


        if (this.imgupload) {
          hxpAlert.show("请等待图片上传完成。")
          return
        }
        //todo 提交
        if (this.flag) {
          this.flag = false;
          _czc.push(["_trackEvent", '上传作品集-提交', '点击']);
          var that = this;
          $.ajax({
            headers: {"Authorization": "Token " + token},
            url: "http://www.houxiaopang.com/api/v1.1/newalbum",
            type: "POST",
            data: {
              title: that.title.trim(),
              work_list: JSON.stringify(that.img_url),
              cover: that.ablumfile,
              description: that.desc.trim(),
              category: that.category,
              album_id: that.album_id,
              price:that.price,
              not_business:that.not_business,
              not_anonymous:that.not_anonymous,
              not_single:that.not_single,
              not_saved:that.not_saved
            },
            success: function (data) {
              that.flag = true;
              if (data.code === 0) {
                that.promptshow = true;
                setTimeout(function () {
                  that.promptshow = false;
                  that.$router.push({path: '/'});
                }, 1000);
              } else {
                hxpAlert.show("网络拥挤，请稍后再试···");
              }
            },
            error: function (e) {
              that.flag = true;
              if (e.status === 401) {
                location.href = "http://houxiaopang.com/qrlogin";
              } else {
                hxpAlert.show("网络拥挤，请稍后再试···");
              }
            }
          });
        }
      },
      appendImg: function () { // 添加图片
        this.imgupload = true
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
      show_upload_album: function () { // 显示模态框
        this.modelshow = true;
      },
      showlocalfrom() {//显示上传本地作品
        this.localfrom = true;
        this.platfrom = false;
        this.leading = false;
        document.getElementById("content").scrollTop = 0;
      },
      showplatfrom() {//显示其它平台导入
        this.localfrom = false;
        this.platfrom = true;
        this.leading = false;
        document.getElementById("content").scrollTop = 0;
      },
      platclick() {//平台类别选择
        let lis = document.getElementById("platname").children;
        for (let i = 0, size = lis.length; i < size; i++) {
          lis[i].onclick = function () {
            if(this.className === "plat_can"){
              for(let i = 0, size = lis.length; i < size; i++){
                lis[i].className = "plat_can";
              }
            }
            this.className = this.className === "plat_active" ? "plat_can" : "plat_active";
          }
        }
      },
      judgeUrl:function (platname,url) { // 验证导入平台的地址
        var Cts = url;
        if(platname === '站酷'){
          if(Cts === "http://www.zcool.com.cn" || Cts === "www.zcool.com.cn" || Cts === "zcool.com.cn"){
            return ;
          }
          else {
            if(Cts.indexOf('zcool.com.cn') > -1 ){
              if(Cts.indexOf('www.') > -1){
                var regex = /www\.(?=(zcool\.com\.cn))/.test(Cts);
                if(regex){
                return true;
                }else {
                  return;
                }
              }else {
                return true;
              }
            }
          }
        }
        return ;
      },
      submitplatfrom:function () { // 提交导入平台作品
        //选择平台
        let lis = document.getElementById("platname").children;
        this.platname = '';
        for (let i = 0, size = lis.length; i < size; i++) {
          if (lis[i].className === "plat_active") {
            this.platname = lis[i].innerText;
          }
        }
        if(this.platname === ''){
          $(".err").eq(4).css("display", "block");
        }else {
          $(".err").eq(4).css("display", "none");
        }
        if(this.prourl === ''){
          $(".err").eq(5).css("display", "block");
        }else {
          $(".err").eq(5).css("display", "none");
        }
        if($(".err").eq(5).css("display") === "none"){
          if(!this.judgeUrl(this.platname,this.prourl)){
            $(".err").eq(6).css("display", "block");
          }else {
            $(".err").eq(6).css("display", "none");
          }
        }
        for (var i = 4; i < 7; i++) {
          if ($(".err").eq(i).css("display") === "block") {
            return;
          }
        }
        if(this.platFlag){
          this.platFlag = false;
          var that = this;
          $.ajax({
            headers: {"Authorization": "Token " + token},
            url: "http://www.houxiaopang.com/api/v1.2/verified/workinsert",
            type: "POST",
            data: {
              url:that.prourl
            },
            success: function (data) {
              that.platFlag = true;
              data = JSON.parse(data);
              if (data.code == 0) {
                that.platfrom = false;
                that.leading = true;
              }
              else if(data.code === -2){
                hxpAlert.show("不支持此网站");
              }else {
                hxpAlert.show("网络拥挤，请稍后再试···");
              }
            },
            error: function (e) {
              that.platFlag = true;
              if (e.status === 401) {
                location.href = "http://houxiaopang.com/qrlogin";
              } else {
                hxpAlert.show("网络拥挤，请稍后再试···");
              }
            }
          });
        }

      },

    },
    created(){
      _czc.push(["_trackEvent", '上传作品集-进入', '点击']);
      this.album_id = this.$route.query.album_id;
      if (this.album_id) {
        var that = this;
        $.ajax({ // 获取作品信息（编辑）
          type: "get",
          url: "http://www.houxiaopang.com/api/v1.1/newalbum",
          headers: {"Authorization": "Token " + token},
          data: {
            album_id: that.album_id
          },
          success(data){
            if (data.code === 0) {

              var json = data.data;
              that.title = json.title;
              that.desc = json.description;
              that.editor.setValue(that.desc);
              that.img_url = json.worklist;
              that.ablumfile = json.cover;
              that.img_index = json.worklist.length;
              that.category = json.category;
              that.price = json.price;
              that.not_business = json.not_business;
              that.not_anonymous = json.not_anonymous;
              that.not_single = json.not_single;
              that.not_saved = json.not_saved;
              if(that.not_business){
                $("input[type='checkbox'][name='power'][value='" + 1 + "']").iCheck('check');
              }
              if(that.not_anonymous){
                $("input[type='checkbox'][name='power'][value='" + 2 + "']").iCheck('check');
              }
              if(that.not_single){
                $("input[type='checkbox'][name='power'][value='" + 3 + "']").iCheck('check');
              }
              if(that.not_saved){
                $("input[type='radio'][name='ban'][value='" + true + "']").iCheck('check');
              }else {
                $("input[type='radio'][name='ban'][value='" + false + "']").iCheck('check');
              }

              that.$nextTick(function () {
                $(".up-section").removeClass("loading");
                $(".up-img").removeClass("up-opcity");
              });
            } else {
              hxpAlert.show("网络拥挤，请稍后再试···");
            }
          },
          error(){
            hxpAlert.show("网络拥挤，请稍后再试···");
          }
        });
      }
    },
    watch: {
      "$route"(){ // 清空作品表单填写的信息
        this.title = '';
        this.desc = '';
        this.editor.setValue('');
        this.img_url = [];
        this.ablumfile = 'http://image.houxiaopang.com/baseform/721/addpic.jpg';
        this.category = 1;
        this.sortmodelshow = false;
        this.modelshow = false;//模态框显示
        this.img_index = 0;
        this.album_id = null;
        this.price = "无";
        this.not_business=false;
        this.not_anonymous=false
        this.not_single=false;
        this.not_saved=true;
        $("input[type='checkbox'][name='power'][value='" + 1 + "']").iCheck('uncheck');
        $("input[type='checkbox'][name='power'][value='" + 2 + "']").iCheck('uncheck');
        $("input[type='checkbox'][name='power'][value='" + 3 + "']").iCheck('uncheck');
        $("input[type='radio'][name='ban'][value='" + true + "']").iCheck('check');
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

/*  .context > .desc {
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

  .context > .desc:focus {
    border-color: #545ca6;
  }*/

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

  .btn_span {
    position: absolute;
    top: 10px;
    left: 553px;
    color: #bbb;
    display: inline-block;
    cursor: pointer;
    font-size: 14px;
  }

  .btn_span:hover {
    color: #d01667 !important;
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

  .upwrapper > ul {
  }

  .upwrapper > ul > li {
    float: left;
    width: 200px;
    height: 150px;
    margin-right: 15px;
    margin-bottom: 15px;
  }
  .checkbox_span {
    margin-left: 20px;
  }


  .context > #platname{
    overflow: hidden;
    margin: 30px 0 0 150px;
  }

  .context > #platname > li {
    float: left;
    margin-right: 30px;
    border: 1px solid #eeeeee;
    padding: 5px 20px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .context > #platname >.plat_active ,.context > #label >.plat_active{
    background: #fff;
    color: #D01667;
    border: 1px solid #D01667;
  }
  .context > #platname > .plat_can,.context > #label > .plat_can{
    background: #fff;
    color: #333333;
  }
  .context > #platname > li:hover{
    color: #D01667;
    border: 1px solid #D01667;
  }
  .leading{
    text-align: center;
    width: 100%;
    height: 400px;
    display: table-cell;
    vertical-align: middle;
  }
</style>
