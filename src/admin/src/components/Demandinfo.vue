<template>
  <div class="conbody">
    <div class="di_top">
      <p class="di_title">{{post.title}}</p>
      <p class="di_desc"><span>客户：{{post.client}}</span><span style="margin-left: 54px;">接单日期：{{post.starttime}}</span>
      </p>
      <div class="di_btn" v-show="!shoukuang" @click="shoukuang=true">发起收款</div>
      <div class="di_btn" v-show="shoukuang" @click="shoukuang=false">返回</div>
    </div>
    <div v-show="!shoukuang" class="labelpage">
      <ul>
        <li @click="choose(index)" v-for="(item,index) in type" :class="{labelpage_active : item.selected}">{{item.name}}</li>
      </ul>
    </div>
    <div v-show="type[2].selected&&!shoukuang" class="di_info">
      <div style="font-size: 18px;">该项目支付记录</div>
      <table class="table" cellspacing="0" border="0">
        <thead>
        <tr>
          <th>日期</th>
          <th>项目</th>
          <th>金额（元）</th>
          <th>状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in cashflow">
          <td>{{item.when}}</td>
          <td>{{item.remark}}</td>
          <td>{{setmoney(item.change_money)}}</td>
          <td>
            <span>{{item.status}}</span>　<i class="iconfontyyy" :title="item.detail"
                                            style="vertical-align: -2px;font-size: 20px;color:#f00;cursor: pointer;">&#xe691;</i>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-show="type[0].selected&&!shoukuang"
         style="width: 800px;overflow:hidden;margin-top: 9px;margin-bottom: 30px;">
      <div class="di_upfile">
        <div style="font-size: 16px;line-height: 50px;">上传最新作品</div>
        <span class="di_btn_span iconfontyyy" v-show="img_url.length >1" @click="sort">&#xe629; 排序</span>
        <div class="di_upwrapper">
          <ul>
            <li>
              <section class="di_addbtn">
                <img src="http://image.houxiaopang.com/baseform/721/addpic.jpg"
                     class="add-img">
                <input type="file" name="file"
                       value="" class="file" id="file" @change="appendImg"
                       accept="image/jpg,image/jpeg,image/png,image/gif" multiple/>
              </section>
            </li>
            <imgthumb @img_url="rm" v-for="(item,index) in img_url" v-bind:index="index"
                      v-bind:each_file="item" :key="index" demand="1">
            </imgthumb>
          </ul>
          <div id="tt" class="btn" style="display:none"></div>
          <textarea v-model="desc" rows="4" placeholder="请输入注释"></textarea>
          <p class="di_btn" @click="submitpage"
             style="margin-bottom: 10px;position: relative;left: 0;top: 0;margin-top: 17px;">提交</p>
        </div>
      </div>
    </div>
    <div v-show="type[0].selected&&!shoukuang&&post.postlist.length>0" style="position: relative">
      <div style="width: 5px;height: 8px;position: absolute;background: #fff;top: 0;left: 8px;z-index:10"></div>
      <div v-for="(item,index) in post.postlist">
        <div style="padding: 10px 0 10px 20px;margin-left: 10px;border-left: 1px solid #fe6549;position:relative;">
          {{item.up_time}}
          <i v-show="index == 0"
             style="display: block;position:absolute;width: 20px;height: 20px;background: #fe6549;top: 8px;left: -10px;border-radius: 50%;border: 4px solid #ffaa9a;"></i>
          <i v-show="index != 0"
             style="display: block;position:absolute;width: 14px;height: 14px;background: #fe6549;top: 10px;left: -7px;border-radius: 50%;"></i>
        </div>
        <div class="di_list">
          <ul>
            <li @click="open(imgitem)" v-for="imgitem in item.imglist"><img style="cursor:pointer;"
                                                                            :src="imgitem+'?imageView2/1/w/200/h/150'"
                                                                            alt=""></li>
          </ul>
          <div class="desc">{{item.desc}}</div>
        </div>
      </div>
    </div>
    <div v-show="type[1].selected&&!shoukuang" class="di_info">
      <div style="font-size: 18px;">{{demanddetail.title}}</div>
      <div class="di_content" v-html="demanddetail.description">
      </div>
    </div>
    <div v-show="type[1].selected&&!shoukuang&&demanddetail.desc_img.length>0" class="di_imgwarp">
      <p>参考图片</p>
      <ul>
        <li v-for="item in demanddetail.desc_img">
          <img style="width: 100%;" :src="item+'?imageView2/1/w/200/h/150'" alt="">
        </li>
      </ul>
    </div>
    <div v-show="shoukuang" class="di_info" style="margin-top: 40px;position:relative;">
      <div v-show="successmoney" class="di_success_money">
        <p style="text-align: center;font-size:20px;color:rgba(51,51,51,1);margin-top: 50px;">提交成功！</p>
        <p style="margin-top: 20px;text-align: center">系统将立即通知客户付款</p>
        <div @click="wangchengmoney"
             style="cursor: pointer;text-align:center;line-height:35px;width: 127px;height: 35px;margin: 20px auto 0;border: 1px solid #333;color: #333;font-size: 18px;">
          完成
        </div>
      </div>
      <div class="di_content">
        <p>
          <span>项目名称：</span>
          <span style="margin-left: 20px;">{{post.title}}</span>
        </p>
      </div>
      <div class="di_content">
        <p>
          <span>客　　户：</span>
          <span style="margin-left: 20px;">{{post.client}}</span>
        </p>
      </div>
      <div class="di_content">
        <p>
          <span>费用类型：</span>
          <span style="margin-left: 20px;">
            <span @click="choosemoneytype(index)" class="di_moneytype" :class="{di_moneytype_active:item.selected}"
                  v-for="(item,index) in moneyType">{{item.name}}</span>
          </span>
        </p>
      </div>
      <div class="di_content">
        <p>
          <span>费　　用：</span>
          <input v-model="money" type="number" class="di_input_money" style="margin-left: 20px;">
          <span style="margin-left: 10px;">元</span>
        </p>
      </div>
      <div class="di_content">
        <p>
          <span>备　　注：</span>
        </p>
      </div>
      <div class="di_content">
        <textarea v-model="description" rows="4" placeholder="请输入备注，如对此次收款的补充说明。"></textarea>
      </div>
      <p class="di_btn" @click="submitpay"
         style="margin-bottom: 10px;position: relative;left: 0;top: 0;margin-top: 17px;margin-left: 20px;">提交申请</p>
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
    <!-- <prompt :prompt="prompt" :promptshow="promptshow"></prompt>-->
  </div>
</template>
<script>
  import imgthumb from "./Imgthumb.vue"
  import prompt from "./Prompt.vue"
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
        type: [
          {name: "项目进度", selected: true},
          {name: "项目详情", selected: false},
          {name: "收款记录", selected: false}],
        sortmodelshow: false,
        post: {
          postlist: []
        },
        img_url: [],
        img_index: 0,
        shoukuang: false,
        moneyType: [
          {name: "定金", selected: true},
          {name: "额外收费", selected: false},
          {name: "尾款", selected: false}
        ],
        successmoney: false,
        cashflow: [],
        demanddetail: {
          desc_img: []
        },
        desc: "",//上传节点注释
        project_id: null,
        money: null,
        description: "",//发起收款注释
        imgupload: false
      }
    },
    components: {
      imgthumb,
      //prompt
    },
    created(){
      this.project_id = this.$route.query.id
      if (!this.project_id) {
        this.$router.push("/demand")
      } else {
        this.getinfo(this.project_id)
      }
    },
    mounted(){
      registerup(this);//初始化上传图片
    },
    methods: {
      setmoney(value){
        return value > 0 ? "+" + value.toFixed(2) : value.toFixed(2)
      },
      open(value){
        window.open(value)
      },
      getdemanddetail(){
        var that = this
        var id = this.post.demand_id
        $.ajax({
          url: "http://www.houxiaopang.com/api/v1.1/demanddetail",
          data: {demand_id: id},
          success(res){
            if (res.code === 0) {
              that.demanddetail = res.data
            } else {
              alert("网络拥挤，请稍后再试。")
            }
          },
          error(){
            alert("网络拥挤，请稍后再试。")
          }
        })
      },
      getinfo(id){
        var that = this
        $.ajax({
          url: "http://www.houxiaopang.com/api/v1.1/wxfwh/projectpage",
          data: {
            project_id: id
          },
          headers: {"Authorization": "Token " + token},
          success(res){
            if (res.code === 0) {
              that.post = res.data
            } else {
              alert("网络拥挤，请稍候再试")
            }
          },
          error(){
            alert("网络拥挤，请稍候再试")
          }
        })
      },
      getpayinfo(id){
        var that = this
        $.ajax({
          url: "http://www.houxiaopang.com/api/v1.1/designer/getcashflow",
          headers: {"Authorization": "Token " + token},
          data: {
            project_id: id
          },
          success(res){
            if (res.code === 0) {
              that.cashflow = res.data.cashflow
            }
          },
          error(){
            alert("网络拥挤，请稍候再试")
          }
        })
      },
      submitpage(){
        if (this.img_url.length <= 0) {
          alert("请上传图片。")
          return
        }
        if (this.imgupload) {
          alert("请等待图片上传完成。");
          return
        }
        var that = this
        $.ajax({
          type: "POST",
          url: "http://www.houxiaopang.com/api/v1.1/wxfwh/projectpage",
          headers: {"Authorization": "Token " + token},
          data: {
            project_id: that.project_id,
            desc: that.desc,
            imglist: JSON.stringify(that.img_url),
          },
          success(res){
            if (res.code === 0) {
              that.post.postlist.unshift({desc: that.desc, imglist: that.img_url})
              that.img_url = [];
              that.desc = "";
              that.img_index = 0;
            } else {
              alert("网络拥挤，请稍候再试。")
            }
          },
          error(){
            alert("网络拥挤，请稍候再试。")
          }
        })
      },
      submitpay(){
        if (this.money === null || this.money.trim() === "") {
          alert("请输入费用")
          return
        }
        if (!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.money)) {
          alert("费用格式不正确")
          return
        }
        var feetype = null
        this.moneyType.forEach(function (item) {
          if (item.selected === true) {
            feetype = item.name
          }
        })
        var that = this
        $.ajax({
          type: "POST",
          url: "http://www.houxiaopang.com/api/v1.1/chargeapply",
          headers: {"Authorization": "Token " + token},
          data: {
            project_id: that.project_id,
            feetype: feetype,
            money: that.money,
            desc: that.description.trim()
          },
          success(res){
            if (res.code === 0) {
              that.successmoney = true
            } else {
              alert("网络拥挤，请稍候再试。")
            }
          },
          error(){
            alert("网络拥挤，请稍候再试。")
          }
        })
      },
      wangchengmoney(){
        this.choosemoneytype(0);
        this.money = null;
        this.description = "";
        this.successmoney = false
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
            url += "?imageView2/1/w/200/h/150";
            var str = "<li><div class='item' style='width: 200px;height: 150px;overflow: hidden'><img src='" + url + "' width='200'></div></li>";
            ul.innerHTML += str;
          });
          this.initPhoto();
        });

      },
      close(){
        document.body.style.overflow = "auto"
        this.sortmodelshow = false
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
          document.body.style.overflow = "auto";
          this.sortmodelshow = false;
        });
      },
      appendImg: function () {
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
      rm(index){
        this.img_url.splice(index, 1);
        this.img_index--;
      },
      choose(idx){
        if (this.type[idx].selected) return
        var that = this;
        this.type.forEach(function (item, index) {
          item.selected = false
          if (idx === index) {
            item.selected = true
          }
        })
        if (idx === 0) {
          that.getinfo(that.project_id)
        } else if (idx === 1) {
          that.getdemanddetail()
        } else if (idx === 2) {
          that.getpayinfo(that.project_id)
        }
      },
      choosemoneytype(idx){
        this.moneyType.forEach(function (item, index) {
          item.selected = false
          if (idx === index) {
            item.selected = true
          }
        })
      }
    }
  }

</script>
<style>
  .di_top {
    width: 100%;
    height: 100px;
    background: rgba(255, 213, 205, 1);
    overflow: hidden;
    position: relative;
  }

  .di_top > .di_title {
    font-size: 24px;
    color: #333333;
    margin-top: 23px;
    margin-left: 10px;
  }

  .di_success_money {
    width: 345px;
    height: 193px;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -173px;
    margin-top: -96px;
  }

  .di_desc {
    margin-top: 15px;
    margin-left: 10px;
    font-size: 14px;
    color: #333333;
  }

  .di_btn {
    width: 120px;
    height: 50px;
    background: rgba(254, 101, 73, 1);
    border-radius: 4px;
    font-size: 18px;
    line-height: 50px;
    text-align: center;
    color: #FFF;
    position: absolute;
    top: 25px;
    right: 35px;
    cursor: pointer;
  }

  .conbody > .labelpage {
    width: 100%;
    height: 50px;
    margin-top: 10px;
  }

  .di_moneytype {
    display: inline-block;
    height: 100%;
    border: 1px solid #ddd;
    margin-right: 15px;
    padding: 0 20px;
    cursor: pointer;
  }

  .di_moneytype_active {
    border: 1px solid #348DFF;
    color: #348DFF;
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

  .di_input_money {
    height: 30px;
    width: 100px;
    font-size: 16px;
    padding-left: 10px;
    border: 1px solid #ddd;
    outline: none;
  }

  .di_input_money:focus {
    border-color: #545ca6;
  }

  .labelpage > ul > li:hover {
    border-bottom: 2px solid #d01667;
  }

  .labelpage > ul > .labelpage_active {
    border-bottom: 2px solid #d01667;
  }

  .di_info {
    border: 2px dashed #DEDEDE;
    padding: 15px 0 15px 20px;
    margin-top: 9px;
  }

  .di_content {
    padding: 0 20px;
    margin-top: 15px;
    font-size: 16px;
    line-height: 30px;
  }

  .di_imgwarp {
    padding: 0 20px;
  }

  .di_imgwarp > p {
    font-size: 18px;
    height: 60px;
    line-height: 60px;
  }

  .di_imgwarp > ul {
    overflow: hidden;
  }

  .di_imgwarp > ul > li {
    float: left;
    width: 240px;
    height: 180px;
    margin-right: 20px;
    margin-bottom: 20px;
    overflow: hidden;
  }

  .di_imgwarp > ul > li:nth-child(3n) {
    margin-right: 0;
  }

  .di_btn:active {
    opacity: 0.6;
  }

  .table {
    width: 750px;
    border: 1px solid #dedede;
    margin: 25px auto 0;
  }

  th {
    height: 50px;
    width: 25%;
    font-size: 16px;
    background: #ddd;
  }

  tr {
    height: 40px;
    width: 25%;
    font-size: 14px;
    text-align: center;
    background: #fff;
    color: #333;
  }

  tbody > tr:nth-child(2n) {
    background: #edf5ff;
    color: #313131;
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
    margin-top: 10px;
    resize: none;
    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "HeitiSC", "WenQuanYi Micro Hei", sans-serif;
  }

  textarea:focus {
    border-color: #545ca6;
  }

  .di_upfile {
    border: 2px dashed #e0e4e8;
    padding: 0 15px 10px;
    float: left;
    width: 800px;
    position: relative;
  }

  .di_addbtn {
    width: 240px;
    height: 180px;
    display: inline-block;
    position: relative;
    cursor: pointer;
  }

  .di_addbtn .file {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    cursor: pointer;
  }

  .di_btn_span {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #bbb;
    display: inline-block;
    cursor: pointer;
    font-size: 14px;
  }

  .di_btn_span:hover {
    color: #d01667 !important;
  }

  .di_addbtn .add-img {
    width: 100%;
    height: 100%;
  }

  .add-img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .di_addbtn > .zhezhao {
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

  .di_list {
    width: 800px;
    padding: 10px 0 10px 20px;
    margin-left: 10px;
    border-left: 1px solid #fe6549;
  }

  .di_list > ul {
    list-style: none;
    overflow: hidden;
  }

  .di_list > ul > li {
    float: left;
    width: 240px;
    height: 180px;
    margin-right: 24px;
    overflow: hidden;
    text-align: center;
    line-height: 180px;
  }

  .di_list > ul > li:nth-child(3n) {
    margin-right: 0;
  }

  .di_list > ul > li > img {
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
    width: 200px;
    height: 150px;
  }

  .di_upwrapper > ul {
    overflow: hidden;
  }

  .di_upwrapper > ul > li {
    float: left;
    width: 240px;
    height: 180px;
    margin-right: 23px;
    margin-bottom: 15px;
  }

  .di_upwrapper > ul > li:nth-child(3n) {
    margin-right: 0;
  }
</style>
