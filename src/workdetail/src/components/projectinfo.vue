<template>
  <div>
    <div class="top-wrapper">
      <div class="top">
        <div class="head">
          <a :href="'http://houxiaopang.com/workdetail/user/'+projectinfo.belong_id" target="_blank">
            <img :src="projectinfo.belong_head">
            <span>　{{projectinfo.belong_nick}}</span>
          </a>
        </div>
        <div class="title">{{projectinfo.title}}</div>
        <div class="category">
          <ul>
            <li>{{projectinfo.category}}</li>
          </ul>
        </div>
        <div class="otherMsg">
          <ul>
            <li style="margin-right: 25px;" v-if="projectinfo.price !=='无' && projectinfo.price">参考价格：{{projectinfo.price}}</li>
            <li v-if="projectinfo.not_business">禁止商用<span v-if="projectinfo.not_anonymous || projectinfo.not_single">;</span></li>
            <li v-if="projectinfo.not_anonymous">禁止转载<span v-if="projectinfo.not_single">;</span></li>
            <li v-if="projectinfo.not_single">禁止个人使用</li>

          </ul>
        </div>
        <div class="time">{{projectinfo.up_time}}</div>


      </div>
    </div>


    <div class="work">
      <div class="worklist">
        <div class="desc" v-html="projectinfo.description"></div>
        <div id="banbox"  class="ban_box">
          <span>作者设置了隐私保护，禁止保存到本地</span>
        </div>
        <img  v-for="item in projectinfo.works" class="loadlazy" :data-original="item"
             alt=""  ondragstart="return false;" >
      </div>
    </div>

  </div>
</template>

<script>

  function ban() {
    document.body.onmouseup = function(e){     //在body里点击触发事件
      var res = document.getElementById('banbox');      //找到id为box的div
      if(e.button===2&&e.target.className==='loadlazy'){       //如果button=1（鼠标左键），button=2（鼠标右键），button=0（鼠标中间键）
        document.oncontextmenu = function(){return false};     //禁止鼠标右键菜单显示
        res.style.top = e.pageY+'px';     //鼠标点击时给div定位Y轴
        res.style.left = e.pageX+'px';    //鼠标点击时给div定位X轴
        res.style.display = 'block';        //显示div盒子
      }else{
        res.style.display = 'none';         //否则不显示div盒子
        document.oncontextmenu = function(){return true};
      }
    }
  }

  function categorychange(type) {
    var type = type;
    if (type == 1) {
      type = "PPT";
    } else if (type == 2) {
      type = "UI";
    } else if (type == 3) {
      type = "文本画册";
    } else if (type == 4) {
      type = "海报展览";
    } else if (type == 5) {
      type = "LOGO";
    } else if (type == 6) {
      type = "企业形象设计（VI）";
    } else if (type == 0) {
      type = "测试品类";
    }
    return type;
  }


  export default{
    name: 'project',
    data(){
      return {
        projectinfo: {},
        modelshow: false,
      }
    },
    created(){
      this.getingf(this.$route.params.id);
    },
    components: {},
    mounted(){
    },
    methods: {

      /*jump(){
       window.open("http://houxiaopang.com/workdetail/#/user/" + this.projectinfo.belong_id);
       },*/

      getingf(id){
        var that = this;
        $.ajax({
          type: "GET",
          url: "http://www.houxiaopang.com/api/v1.1/albumdetail",
          data: {'album_id': id},
          success(result){
            if (result.code === 0) {
              that.projectinfo = result.data;
              if(!result.data.not_saved){
                ban();
              }
              that.projectinfo.category = categorychange(that.projectinfo.category);
              that.$nextTick(function () {
                $("img.loadlazy").lazyload({
                  effect: 'fadeIn'
                });
              });
            } else {
              location.href = "http://houxiaopang.com/404";
            }
          }
        });
      }
    }
  }
</script>
<style scoped>
  .top-wrapper{
    width: 100%;
    border-top: 1px solid #dedede;
  }
  .top {
    width: 1000px;
    margin: 0 auto;
    position: relative;
  }

  a{
	text-decoration:none;
	color: #313131;
  }


  .top > .head {
    position: absolute;
    top: 33%;
    right: 0;
    cursor: pointer;
  }

  .top > .head img {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .top > .head span {
    vertical-align: top;
    line-height: 50px;
    color: #313131;
    font-size: 16px;
    margin-right: 10px;
  }

  .title {
    font-size: 32px;
    font-weight: 700;
    line-height: 90px;

  }

  .desc {
    color: #313131;
    font-size: 20px;
    line-height: 30px;
    clear: both;
    text-align: left;
    margin: 20px 0 45px;
  }

  .time {
    font-size: 15px;
    color: #969899;
    line-height: 30px;
    float: right;
  }

  .category,.otherMsg {
    float: left;
  }

  .category,.otherMsg > ul {
    list-style: none;
    overflow: hidden;
  }

  .category > ul > li {
    width: auto;
    padding: 0 20px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border-radius: 25px;
    float: left;
    border: 1px solid #dcdee0;;
    margin-right: 25px;
    color: #969899;
  }

  .otherMsg >ul >li{
    width: auto;
    padding: 0 5px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    float: left;
    color: #969899;
  }


  .work {
    width: 100%;
    background: #ffffff;
    overflow: hidden;
    margin-top: 60px;
    border-top: 1px solid #dedede;
    padding: 0 0 150px;
  }

  .worklist {
    width: 1000px;
    margin: 0 auto;
    text-align: center;
    background: #fff;

  }

  /*.worklist > ul {
    list-style: none;
    column-count: 2;
  }

  .worklist ul li {
    float: left;
    width: 450px;
    margin-bottom: 50px;
    margin-right: 25px;
    cursor: pointer;
    box-shadow: 1px 1px 5px 0 #8e8a8a;
  }*/
  .loadlazy {
    cursor: pointer;
    max-width: 1000px;
    display: block;
    margin: 10px auto;
  }

  .ban_box{
    position:absolute;
    background: #222;
    display: none;
    font-size: 12px;
    color: #ffffff;
    border-radius: 5px;
    padding: 10px 15px;
  }
</style>
