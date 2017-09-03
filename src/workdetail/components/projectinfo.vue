<template>
  <div>
    <div class="top">
      <div @click="jump" class="head">
        <span>{{projectinfo.belong_nick}}</span>
        <img :src="projectinfo.belong_head">
      </div>
      <div class="title">{{projectinfo.title}}</div>
      <div class="category">
        <ul>
          <li>{{projectinfo.category}}</li>
        </ul>
      </div>
      <div class="time">{{projectinfo.up_time}}</div>
      <div class="desc">{{projectinfo.description}}</div>

    </div>
    <div class="work">
      <div class="worklist">
        <img @click="showphoto(item)" v-for="item in projectinfo.works" class="loadlazy" :data-original="item"
             alt="">
      </div>
    </div>
  </div>
</template>
<script>

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
      jump(){
        window.open("http://houxiaopang.com/workdetail/#/user/" + this.projectinfo.belong_id);
      },
      showphoto(src){
        //this.modelshow = true;
        //document.getElementById("showphoto").src = src;
        open(src, '图片预览');
      },
      getingf(id){
        var that = this;
        $.ajax({
          type: "GET",
          url: "http://houxiaopang.com/api/v1.1/albumdetail",
          data: {'album_id': id},
          success(result){
            if (result.code == 0) {
              that.projectinfo = result.data;
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
<style>
  .top {
    width: 1000px;
    margin: 0 auto;
    position: relative;
  }

  .top > .head {
    position: absolute;
    top: 33%;
    right: 0;
    cursor: pointer;
  }

  .top > .head > img {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .top > .head > span {
    vertical-align: top;
    line-height: 50px;
    color: #313131;
    font-size: 16px;
    margin-right: 10px;
  }

  .title {
    font-size: 32px;
    font-weight: 700;
    line-height: 130px;

  }

  .desc {
    color: #313131;
    font-size: 20px;
    line-height: 30px;
    clear: both;
    margin-top: 72px;
  }

  .time {
    font-size: 15px;
    color: #969899;
    line-height: 30px;
    float: right;
  }

  .category {
    float: left;
  }

  .category > ul {
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

  .work {
    width: 100%;
    background: #ffffff;
    overflow: hidden;
    margin-top: 120px;
    border-top: 1px solid #bbb;
    padding: 150px 0;
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

</style>
