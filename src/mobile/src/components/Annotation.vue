<template>
  <div class="a_warp">
    <div @click="back" id="div_parent" class="a_content">
      <div style="position: relative;width: 100%;">
        <img id="image" style="width: 100%;display: block" :src="src" alt="">
        <canvas id="can" style="position:absolute;top: 0;left: 0;"></canvas>
        <img v-show="!start &&showpz" class="a_image" v-for="(item,index) in  pz" :src="setbase(item.content)"
             :style="{zIndex : index}"
             alt="">
      </div>
      <div v-show="!start" class="a_pizhu">
        <div @click="showpz=false" v-show="showpz" style="align-self: flex-end;padding-bottom: 10px;">隐藏批注</div>
        <div @click="showpz=true" v-show="!showpz" style="align-self: flex-end;padding-bottom: 10px;">显示批注</div>
        <div v-show="(pz.length > 0)&&showpz" class="a_list" :class="{isnone:(index==pz.length-1)}"
             v-for="(item,index) in pz">
          <div style="display: flex;justify-content: space-between;align-items: center">
            <div class="a_arcnum">{{item.commentIndex}}</div>
            <div>{{item.upTime}}</div>
          </div>
          <div style="font-size: 14px;color: #666;margin-top: 5px;">{{item.description}}</div>
        </div>
        <div v-show="(pz.length === 0)&&showpz" style="text-align: center;padding-bottom: 10px;color: #787878;">
          没有有任何批注哦
        </div>
      </div>
    </div>
    <div class="a_foot_be" v-show="!start">
      <!--<div style="color: #666;">分享</div>-->
      <div @click="start = true" style="color: #4762FF;">新建批注</div>
    </div>
    <div class="a_foot_after" v-show="start">
      <div @click="cancel">取消</div>
      <div style="width: 46%;display: flex;justify-content: space-around;align-items: center">
        <div @click="undo" style="display: flex;justify-content: center;align-items: center"><i class="iconfont"
                                                                                                style="font-size: 14px;">&#xe688;</i>
        </div>
        <div class="a_color" :style="{background:color}" @click="showcolors=!showcolors">
          <div class="a_colors" v-show="showcolors">
            <div @click="setcolor(item)" v-for="item in colors" class="a_color" :style="{background:item}"></div>
          </div>
        </div>
        <div @click="aler" style="display: flex;justify-content: center;align-items: center"><i class="iconfont"
                                                                                                style="font-size: 20px;">&#xe605;</i>
        </div>
        <div @click="redo" style="display: flex;justify-content: center;align-items: center"><i class="iconfont"
                                                                                                style="font-size: 14px;">&#xe613;</i>
        </div>
      </div>
      <div @click="over">确认</div>
    </div>
    <div class="a_text" v-show="showinput">
      <input id="a_descinput" v-model="desc" placeholder="输入批注内容" type="text">
      <div @click="submit" style="color: #4762FF;">保存</div>
    </div>
  </div>
</template>
<script>

  /*
  *
  * 圈点批划功能v1.0版
  *  图片放大缩小会导致界面卡顿所以此版本取消了该功能
  *
  *
  *
  * */


  var draw = { // 绘画对象
    data: {
      c: null, // 画笔
      can: null, // 画布
      start: {
        x: 0,
        y: 0
      },
      first: {
        x: 0,
        y: 0
      },
      color: "#FF445B",
      colors: "",
      lineWidth: 2,
      startdraw: false,
      candraw: false,//开始结束绘图模式
      scroll: 0, // 偏移量
      scrollY: 0,
      num: 1,
      saves: [],//撤销，恢复。数据源
      saveindex: -1,
      move: false//撤销与恢复的index, -1 代表没有用过
    },
    init(image) {
      // 绘画对象初始化
      this.data.can = document.getElementById("can");
      this.data.can.width = image.offsetWidth;
      this.data.can.height = image.offsetHeight;
      this.data.c = this.data.can.getContext("2d");
      this.drawInit(this.data.can);
    },

    drawLine(c, start, end) { // 画线条功能
      c.strokeStyle = this.data.color;
      c.lineWidth = this.data.lineWidth;
      c.beginPath();
      c.moveTo(start.x, start.y);
      c.lineTo(end.x, end.y);
      c.stroke();
      c.closePath();
    },
    drawText(c, start, num) { // 画数字功能
      if (start.x < 10) {
        start.x = 10;
      }
      if (start.x + 10 > this.data.can.width) {
        start.x = this.data.can.width - 10
      }
      if (start.y + 10 > this.data.can.height) {
        start.y = this.data.can.height - 10
      }
      if (start.y < 10) {
        start.y = 10
      }
      c.beginPath();
      c.arc(start.x, start.y, 10, 0, 2 * Math.PI);
      c.fillStyle = this.data.color;
      c.fill();
      c.closePath();
      c.beginPath();
      c.fillStyle = "#fff";
      c.font = "12px impact";
      if (num < 10) { // 计算位置，尽量保持位置居中
        c.fillText(num, start.x - 3, start.y + 4);
      } else {
        c.fillText(num, start.x - 7, start.y + 4);
      }
      c.closePath();
    },
    drawInit(can) { // 开始绘画的函数
      var that = this;
      can.ontouchstart = function (e) { // 手指开始触碰画布
        if (that.data.candraw && e.touches.length === 1) { // 一根手指 并且可以开始绘画
          e.preventDefault();
          that.data.scroll = document.getElementById("div_parent").scrollTop // 计算滚动距离 让手指在画布上画线的位置不偏差
          that.data.start.x = e.touches[0].pageX;
          that.data.start.y = e.touches[0].pageY + that.data.scroll;
          that.data.first = that.data.start;
          that.data.startdraw = true;

          /*
          * 判断是否撤销获取恢复过。
          * 保持绘画的列表逻辑不混乱
          * */
          if (that.data.saveindex !== that.data.saves.length - 1) {//如果不相等，说明撤销过，丢弃
            if (that.data.saveindex === -1) {
              that.data.saves = [];
            } else {
              var save_tmp = [];
              for (var i = 0, size = that.data.saves.length; i < size; i++) {
                if (i <= that.data.saveindex) {
                  save_tmp.push(that.data.saves[i]);
                } else {
                  break;
                }
              }
              that.data.saves = save_tmp;
            }
          }
        } else if (e.touches.length > 1) {  // 两根手指 可以开始移动画布的位置
          that.data.move = true
          that.data.scrollY = e.touches[0].pageY
        }
      };
      can.ontouchmove = function (e) { // 手指开始在画布上移动。即开始绘画
        if (that.data.startdraw && e.touches.length === 1 && !that.data.move) { // 判断是否可以进行绘画
          var end = {};
          end.x = e.touches[0].pageX;
          end.y = e.touches[0].pageY + that.data.scroll;
          that.drawLine(that.data.c, that.data.start, end); //画线条
          that.data.start = end; // 使线条连续
        } else if (that.data.move && that.data.candraw) { // 判断是否进行的时候滑动操作，两指滑动画布
          var y = that.data.scrollY - e.touches[0].pageY;
          //if (y > 0) {
          document.getElementById("div_parent").scrollTop += y
          that.data.scrollY = e.touches[0].pageY;
          /* } else if (y < 0) {
           if (document.getElementById("div_parent").scrollTop - y > 0) {
           document.getElementById("div_parent").scrollTop -= y;
           } else {
           document.getElementById("div_parent").scrollTop = 0;
           }
           }*/
        }
      };
      can.ontouchend = function (e) { // 手指离开画布
        if (that.data.startdraw && e.touches.length === 0) { // 谨慎的作法
          if (that.data.move) { // 进行的是移动操作的话
            that.data.move = false
          } else { // 进行的是绘画操作
            //画数字，在开始的位置
            that.drawText(that.data.c, that.data.first, that.data.num);
            // 保存这次的绘画
            that.data.saves.push(that.data.c.getImageData(0, 0, that.data.can.width, that.data.can.height))
            // 标记加一
            that.data.saveindex++;
          }
          // 关闭开始绘画
          that.data.startdraw = false;
        }
      }
    }
  }
  export default {
    data() {
      return {
        src: "",//服务器返回的图片
        start: false,//新建批注
        showcolors: false,//选择颜色
        colors: ["#FF445B", "#4762FF", "#333333"],
        color: "#FF445B",
        pizhu: {
          image: null,
          desc: null //
        },//当前保存的批注
        desc: "",//当前的批注文字
        showinput: false,//输入批注
        pz: [],//服务器返回的以前的批注
        showpz: true,

      }
    },
    created() {
      showload("初始化中")
      var id = this.$route.query.id
      var src = this.$route.query.src
      if (!id || !src) {
        this.$router.push("/")
        return;
      }
      // 获取此图片的圈点批划
      this.getinfo(id, src);
    },
    watch: {
      "start"() {
          // 保证开始圈地批划时，画布总在最上端
          // 并且，结束圈点批划时，显示到最后一条的批注
        if (this.start) {
          document.getElementById("div_parent").scrollTop = 0;
          draw.data.candraw = true
        } else {
          draw.data.candraw = false
          this.$nextTick(function () {
            document.getElementById("div_parent").scrollTop = 19941209;
          })
        }
        // 清除画布，是界面整洁，逻辑清晰
        draw.data.c.clearRect(0, 0, draw.data.can.width, draw.data.can.height)
      }
    },
    methods: {
      aler() {
        showModal("用两个手指可实现上下滑动");
      },
      setbase(value) {  // 由于保存base64 图片时，后台对特殊字符的处理不同，所以这里要处理一下，才可以正确的显示以前的圈点批划
        return value.replace(/ /g, "+");
      },
      getinfo(id, src) { // 获取圈点批划数据
        var that = this;
        ajax({
          url: "http://www.houxiaopang.com/api/v1.2/circle/getcomments",
          data: {
            id: id
          },
          success(res) {
            that.pz = res.data.comments
            draw.data.num = that.pz.length + 1;
            that.src = src;
            var image = document.getElementById("image");
            image.addEventListener("load", function () {
              draw.init(image);
              hideload()
            });
            wxshare("客户反馈", "https://m.houxiaopang.com/demand/#/workproject/annotation?id=" + id + "&src=" + src)//desc , url
          },
          error() {
            showModal("网络拥挤，请稍后再试。")
            hideload()
          }
        })
      },
      setcolor(value) { // 设置画笔颜色
        draw.data.color = value;
        this.color = value;
      },
      over() { // 保存绘画时的操作。显示批注框，并获取焦点
        this.pizhu.image = draw.data.can.toDataURL("image/png"); // 拿到base64 的图片
        this.showinput = true
        this.$nextTick(function () {
          document.getElementById("a_descinput").focus()
        })
      },
      back() {
        if (this.showinput) {
          this.showinput = false
        }
      },
      submit() { // 提价批注
        if (this.desc.trim() === "") {
          showModal("请填写批注");
          return
        }
        if (draw.data.saves.length === 0) {
          showModal("您还没有给作品添加过批注哦");
          return
        }
        showload("保存中")
        var that = this;
        var clientid = window.localStorage.hxpclientid;
        if (clientid === "null" || !clientid) {
          clientid = null;
        }
        ajax({
          url: "http://www.houxiaopang.com/api/v1.2/circle/addcomment",
          data: {
            commentIndex: draw.data.num,
            description: that.desc.trim(),
            content: that.pizhu.image,
            imageId: that.$route.query.id,
            userId: clientid//客户id
          },
          type: "post",
          success(res) {
            if (res.code === 0) {
                // 成功后的处理
              that.pz.push({
                commentIndex: draw.data.num,
                description: that.desc.trim(),
                content: that.pizhu.image,
                upTime: res.data.up_time,
              })
              that.showinput = false;
              that.start = false;
              draw.data.num++;
              that.desc = ""
              draw.data.saves = []
              draw.data.saveindex = -1
            } else {
              showModal()
            }
            hideload()
          },
          error() {
            showModal()
            hideload()
          }
        })
      },
      cancel() { // 取消
        this.showinput = false;
        this.start = false;
        this.desc = ""
        draw.data.saves = []
        draw.data.saveindex = -1
        this.start = false;
      },
      undo() { //撤销
        if (draw.data.saveindex > 0) {
          draw.data.saveindex--;
          draw.data.c.putImageData(draw.data.saves[draw.data.saveindex], 0, 0);
        } else if (draw.data.saveindex === 0) {
          draw.data.saveindex = -1;
          draw.data.c.clearRect(0, 0, draw.data.can.width, draw.data.can.height)
        }
      },
      redo() {//恢复
        if (draw.data.saveindex < draw.data.saves.length - 1) {
          draw.data.saveindex++;
          draw.data.c.putImageData(draw.data.saves[draw.data.saveindex], 0, 0);
        }
      }
    }
  }

</script>

<style scoped>
  .a_warp {
    height: 100%;
    position: relative;
    background: #f4f4f4;
  }

  .a_content {
    bottom: 50px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .a_foot_be {
    height: 50px;
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    border-top: 1px solid #dedede;
  }

  .a_foot_after {
    height: 50px;
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #dedede;
    background: #fff;
  }

  .a_color {
    height: 25px;
    width: 25px;
    position: relative;
  }

  .a_colors {
    position: absolute;
    justify-content: space-between;
    display: flex;
    width: 100px;
    height: 40px;
    top: -44px;
    left: -38px;
  }

  .a_text {
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 19941209;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 15px;
    background: #fff;
    border-top: 1px solid #dedede;
  }

  .a_text > input {
    width: 80%;
    margin-left: 2px;
    height: 30px;
    padding: 0 10px;
  }

  .a_image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: block;
  }

  .a_list {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #dedede;
    padding: 5px 0;
  }

  .a_arcnum {
    height: 25px;
    width: 25px;
    background: #FF445B;
    border-radius: 50%;
    color: #fff;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .a_pizhu {
    display: flex;
    flex-direction: column;
    padding: 10px 15px 0;
    border-top: 1px solid #dedede;
    background: #fff;
  }

  .isnone {
    border: none;
  }
</style>
