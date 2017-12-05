<template>
  <div class="correct-wrapper" id="app">
    <div class="nav-wrapper">
      <div class="correct-nav">
        <div class="nav-left"><p><i class="iconfont">&#xe713;</i></p></div>
        <div class="nav-right"><p>返回我的项目</p></div>
      </div>
    </div>
    <div class="box-wrapper">
      <div class="correct-box" id="cbox">
        <div class="correct-left">
          <div class="correct-pic" v-for="i in itemsUrl">
            <img :src="i.url" style="width: 100%;height: 100%" @click="toggleImg(i.url)">
          </div>
        </div>
        <div class="correct-center" id="ccenter">
          <!--放大缩小按钮                    <div class="turn-size">
                                  <div class="zoom-in"><i class="iconfont">&#xe601;</i></div>
                                  <div class="size-text">100%</div>
                                  <div class="zoom-out"><i class="iconfont">&#xe6f5;</i></div>
                              </div>-->
          <div class="toggle-box">
            <div :class="[toggle_btn,{active_btn:isActive1}]" @click="togglePic('1')"><p>显示原图</p></div>
            <div :class="[toggle_btn,{active_btn:isActive2}]" @click="togglePic('2')"><p>显示批注</p></div>
          </div>
          <div class="content-pic">
            <img :src=centerImgUrl alt="">
          </div>
        </div>
        <div class="correct-right">
          <div class="text-wrapper">
            <div class="text-box">
              <div class="text-title">
                <div class="circle">1</div>
              </div>
              <div class="text-content">文字论文字评论文字论文字评论文字论文字评论文字论文字评</div>
              <div class="text-footer">
                <div class="footer-left">2017/10/12 20:23</div><!--<div class="footer-right">回复</div>--></div>
              <!--回复内容显示框                           <div class="answer-box">
                                              <div><p style="color: #4762FF">您回复了吴鹏</p></div>
                                              <div>论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评</div>
                                              <div style="margin-bottom: 10px;overflow: hidden"><div class="footer-left">2017/10/12 20:23</div></div>
                                          </div>-->
            </div>
            <div class="text-box">
              <div class="text-title">
                <div class="circle">2</div>
              </div>
              <div class="text-content">论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评</div>
              <div class="text-footer">
                <div class="footer-left">2017/10/12 20:23</div><!--<div class="footer-right">回复</div>--></div>
              <div class="answer-box">
                <div><p style="color: #4762FF">您回复了吴鹏</p></div>
                <div>论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评</div>
                <div style="margin-bottom: 10px;overflow: hidden">
                  <div class="footer-left">2017/10/12 20:23</div>
                </div>
              </div>
            </div>
            <div class="text-box">
              <div class="text-title">
                <div class="circle">3</div>
              </div>
              <div class="text-content">文字论文字评</div>
              <div class="text-footer">
                <div class="footer-left">2017/10/12 20:23</div><!--<div class="footer-right">回复</div>--></div>
              <div class="answer-box">
                <div><p style="color: #4762FF">您回复了吴鹏</p></div>
                <div>论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评</div>
                <div style="margin-bottom: 10px;overflow: hidden">
                  <div class="footer-left">2017/10/12 20:23</div>
                </div>
              </div>
            </div>
            <div class="text-box">
              <div class="text-title">
                <div class="circle">4</div>
              </div>
              <div class="text-content">论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评</div>
              <div class="text-footer">
                <div class="footer-left">2017/10/12 20:23</div><!--<div class="footer-right">回复</div>--></div>
              <div class="answer-box">
                <div><p style="color: #4762FF">您回复了吴鹏</p></div>
                <div>论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评论文字论文字评</div>
                <div style="margin-bottom: 10px;overflow: hidden">
                  <div class="footer-left">2017/10/12 20:23</div>
                </div>
              </div>
            </div>
          </div>
          <!--回复输入框                    <div class="submit-box">
                                  <div class="box-text"><textarea placeholder="输入内容"></textarea></div>
                                  <div class="cancel-btn"><p>取消</p></div>
                                  <div class="submit-btn"><p>提交</p></div>
                              </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        isActive1: false,
        isActive2: true,
        toggle_btn: 'toggle_btn',
        itemsUrl: [
          {url: '1.jpg'},
          {url: '2.jpg'},
          {url: '3.jpg'},
          {url: '4.jpg'},
          {url: '5.jpg'},
          {url: '6.jpg'},
          {url: '1.jpg'},
          {url: '2.jpg'},
          {url: '3.jpg'},
          {url: '4.jpg'},
          {url: '5.jpg'},
          {url: '6.jpg'}
        ],
        centerImgUrl: this.itemsUrl,
      }
    },
    created(){
      this.init();
    },
    methods: {
      init(){
        var sWidth = document.getElementById("cbox").clientWidth;
        var sHeight = document.getElementById("cbox").clientHeight;
        var cWidth = sWidth - 500;
        var cHeight = sHeight;
        var ccenter = document.getElementById("ccenter");
        ccenter.style.width = cWidth + "px";
        ccenter.style.height = cHeight + "px";
      },
      toggleImg: function (url) {
        this.centerImgUrl = url;
        this.isActive1 = false;
        this.isActive2 = true;
      },
      togglePic: function (index) {
        if (index == '1') {
          this.isActive1 = true;
          this.isActive2 = false;
        } else {
          this.isActive1 = false;
          this.isActive2 = true;
        }
      }
    }
  }
</script>
<style scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 481670 */
    src: url('//at.alicdn.com/t/font_481670_kz96sr638i2akyb9.eot');
    src: url('//at.alicdn.com/t/font_481670_kz96sr638i2akyb9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_481670_kz96sr638i2akyb9.woff') format('woff'),
    url('//at.alicdn.com/t/font_481670_kz96sr638i2akyb9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_481670_kz96sr638i2akyb9.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: "iconfont", serif !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
  }

  .correct-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .nav-wrapper {
    width: 100%;
    border: 1px solid #DEDEDE;
  }

  .correct-nav {
    width: 1100px;
    height: 67px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .correct-nav p {
    cursor: pointer;
  }

  .nav-left {
    font-size: 18px;
    line-height: 25px;
  }

  .nav-left i {
    font-weight: bold;
  }

  .nav-right {
    font-size: 18px;
    color: #333333;
    line-height: 25px;
  }

  .box-wrapper {
    width: 100%;
    position: absolute;
    top: 69px;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }

  .correct-box {
    width: 100%;
    height: 100%;
    display: table;
    vertical-align: top;
  }

  .correct-left {
    width: 250px;
    height: 100%;
    border: 1px solid #DEDEDE;
    overflow-y: auto;
    position: absolute;
    left: 0px;
    padding: 0 10px;

  }

  .correct-center {
    position: absolute;
    top: 0;
    left: 250px;
    bottom: 0;
    text-align: center;
    margin: 0 auto;
    overflow: auto;
  }

  .toggle-box {
    margin: 20px auto;
    width: 260px;
    height: 40px;
  }

  .toggle_btn {
    width: 130px;
    height: 40px;
    float: left;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    background: #ffffff;
    color: #4762FF;
    border: 1px solid #4762FF;
  }

  .active_btn {
    background: #4762FF;
    color: #ffffff;
  }

  .correct-pic {
    width: 100%;
    height: 140px;
    margin-bottom: 10px;
    background: #F5F5F5;
  }

  .correct-pic :hover {
    box-shadow: 0px 2px 6px 0 #4F88FF;
  }

  .correct-pic:first-child {
    margin-top: 10px;
  }

  .correct-right {
    width: 250px;
    vertical-align: top;
    height: 100%;
    border: 1px solid #DEDEDE;
    overflow-y: auto;
    position: absolute;
    right: 0px;
    padding: 0 10px;
  }

  .text-box {
    width: 100%;
    min-height: 100px;
    margin-bottom: 10px;
    box-shadow: 0px 3px 4px 1px #F2F4F5;
    overflow: hidden;
  }

  .text-box:first-child {
    margin-top: 10px;
  }

  .text-title {
    margin: 10px 10px 0px;
    line-height: 28px
  }

  .circle {
    width: 28px;
    height: 28px;
    background: red;
    border-radius: 50%;
    color: #ffffff;
    text-align: center;
    line-height: 28px;
    /*float: left;*/
    margin-right: 7px;
  }

  .text-content {
    margin: 10px;
  }

  .text-footer {
    margin: 0px 10px 10px;
    overflow: hidden;
  }

  .footer-left {
    float: left;
    font-size: 12px;
    line-height: 17px;
    color: #666666;
  }

  .footer-right {
    float: right;
    color: #4762FF;
    cursor: pointer;
  }

  .answer-box {
    display: none;
    width: 95%;
    min-height: 95px;
    border-top: 1px solid #DEDEDE;
    overflow: hidden;
    margin: 0 auto;
  }

  .answer-box > div {
    font-size: 12px;
    line-height: 17px;
    margin-top: 7px
  }

  .submit-box {
    display: none;
    position: absolute;
    width: 220px;
    height: 130px;
    right: 10px;
    left: 10px;
    bottom: 20px;
    box-shadow: 0px 3px 4px 1px #F2F4F5;
    overflow: hidden;
  }

  .box-text {
    width: 100%;
    height: 100px;
    border-radius: 2px;
  }

  .box-text textarea {
    background: rgba(250, 250, 250, 1);
    width: 100%;
    height: 100%;
    padding: 10px 17px;
    border: none;
    resize: none;
  }

  .cancel-btn, .submit-btn {
    width: 110px;
    height: 30px;
    float: left;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }

  .cancel-btn {
    background: #ffffff;
    color: #4762FF;
    border: 1px solid #4762FF;
  }

  .submit-btn {
    background: #4762FF;
    color: #ffffff;
  }

  .turn-size {
    display: flex;
    margin: 27px 0px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .size-text {
    margin: 0px 10px;
  }

  .zoom-in i, .zoom-out i {
    color: #4762FF;
    font-size: 24px;
    cursor: pointer;
  }

  .content-pic {
    /*width: 430px;*/
    /*height: 290px;*/
    background: #F5F5F5;
    margin: 0 auto;
  }
</style>
