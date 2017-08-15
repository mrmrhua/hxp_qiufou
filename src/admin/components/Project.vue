<template id="project">
  <div class="conbody">
    <div class="content" style="height: 100%;top:0">
      <div class="project">
        <div class="left">
          <ul id="pinglei_ul">
            <li class="checkPinglei">全部</li>
            <li>PPT</li>
            <li>UI</li>
            <li>文本画册</li>
            <li>海报展板</li>
            <li>LOGO</li>
            <li>企业形象设计（VI）</li>
          </ul>
          <p style="color: #bbb;padding-left: 20px;box-sizing: border-box;">更多品类，敬请期待···</p>
        </div>
        <div class="project_list">
          <div class="scroo">
            <p>我的作品集</p>
            <ul>
              <li v-for="item in projectalbum" @click="jump(item.id)">
                <img class="img" width="240" :src="item.url"/>
                <p v-html="item.title"></p>
                <p v-html="item.type"></p>
                <div class="option">
                  <i @click.stop="edit(item.id)" class="iconfontyyy"
                     style="color:#bbb;font-size: 18px;margin-left: 10px;">&#xe609;</i>
                  <i @click.stop="rm(item.id,index)" class="iconfontyyy"
                     style="color:#bbb;font-size: 18px;margin-left: 10px;">&#xe66d;</i>
                </div>
              </li>
            </ul>
            <div v-show="show" style="text-align: center">
              <i class="iconfontyyy" style="font-size:200px;color: #bfbfbf;">&#xe617;</i>
              <p style="font-size: 16px;color: #bfbfbf;font-weight: 900;">你还没有创建过任何作品</p>
              <router-link to="/newalbum" tag="div" class="btn_image">上传作品</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mymodal" v-show="delmodel">
      <div class="conte">
        <div style="background: #bbb;height: 30px;line-height: 30px;padding: 0 15px;">
          <span style="color: #fff;">删除提醒</span><span
          style="float: right;cursor: pointer"
          @click="delmodel=false"><i class="iconfontyyy">&#xe67c;</i></span>
        </div>
        <div style="position: relative">
          <i class="iconfontyyy" style="display: inline-block;font-size: 90px;">&#xe60e;</i>
          <p style="position: absolute;top: 20px;left: 110px;font-size: 18px;">确定删除此图片作品？</p>
          <div style="height: 30px;line-height: 30px;position: absolute;top: 65px;left: 150px;">
            <span
              style="display: inline-block;background: #d01667;padding: 0 15px;color: #fff;cursor: pointer;"
              @click="remove">确定</span>
            <span @click="delmodel=false" style="display: inline-block;padding: 0 15px;cursor: pointer;">取消</span>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
  import token from "@/components/token.js"
  function addclick(that) {
    var li = document.getElementById("pinglei_ul").children;
    for (var i = 0, size = li.length; i < size; i++) {
      li[i].index = i;
      li[i].onclick = function () {
        $("#pinglei_ul").find("li").each(function () {
          $(this).removeClass("checkPinglei");
        });
        $(this).addClass("checkPinglei");

        if (this.index == 0) {
          this.index = -1;
        }
        that.getCollection(this.index);
      }
    }
  }

  //获取我的作品 c : 品类id

  export default{
    data(){
      return {
        projectalbum: [],
        show: false,
        delmodel: false,
        removeid: -1,
        removeindex: -1,
      }
    },
    mounted(){
      addclick(this);
    },
    created(){
      this.getCollection(-1);
    },
    methods: {
      jump(id){
        open("http://houxiaopang.com/workdetail/#/album/" + id);
      },
      getCollection(c) {
        var that = this;
        $.ajax({
          type: "GET",
          data: {
            category: c
          },
          url: 'http://houxiaopang.com/api/v1.1/designerdash/collection',
          headers: {"Authorization": "Token " + token},
          timeout: 5000,
          success: function (data) {
            if (data.code === 0) {
              that.projectalbum = [];
              for (var i = 0, size = data.data.length; i < size; i++) {
                var json = data.data[i];
                var type = json.category;
                if (type == 1) {
                  type = "PPT";
                } else if (type == 2) {
                  type = "UI";
                } else if (type == 3) {
                  type = "文本画册";
                } else if (type == 4) {
                  type = "海报展板";
                } else if (type == 5) {
                  type = "LOGO";
                } else if (type == 6) {
                  type = "企业形象设计（VI）";
                } else if (type == 0) {
                  type = "测试品类";
                }
                var obj = {
                  url: json.cover_url,
                  title: json.title,
                  id: json.album_id,
                  type: type,
                };
                that.projectalbum.push(obj);
              }
              if (that.projectalbum.length === 0) {
                that.show = true;
              } else {
                that.show = false;
              }
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          },
          error(e){
            if (e.status === 401) {
              location.href = "http://houxiaopang.com/qrlogin";
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          }
        });
      },
      rm(id, index){
        this.removeid = id;
        this.removeindex = index;
        this.delmodel = true
      },
      remove(){
        var that = this
        // 删除相册:
        $.ajax({
          type: "post",
          headers: {"Authorization": "Token " + token},
          url: "http://houxiaopang.com/api/v1.1/designerdash/deletealbum",
          data: {
            album_id: that.removeid
          },
          success(data){
            if (data.code == 0) {
              that.recentalbum.splice(that.removeindex, 1);
              that.delmodel = false;
            } else {
              alert("网络拥挤，请稍候再试···");
            }
          },
          error(){
            alert("网络拥挤，请稍候再试···");
          }
        });
      },
      edit(id){
        this.$router.push({
          path: "/newalbum",
          query: {
            album_id: id
          }
        });
      }
    }
  }
</script>
<style scoped>
  .btn_image {
    width: 150px;
    height: 39px;
    cursor: pointer;
    border-radius: 25px;
    text-align: center;
    line-height: 39px;
    color: #788188;
    background-color: #fff;
    border: 1px solid #dbe2e7;
    border-bottom-color: #d5dde3;
    box-shadow: 0 1px 1px rgba(90, 90, 90, 0.1);
    margin: 30px auto;
  }

  .btn_image:hover {
    border: 1px solid #adadad;
    color: #333;
    background-color: #ebebeb;
  }

  .project {
    width: 100%;
    height: 100%;
    display: table;
  }

  .project > .left {
    width: 200px;
    background-color: #E0EAEC;
    display: table-cell;
    vertical-align: top;
  }

  .project > .left > ul {
    width: 100%;
    overflow: hidden;
  }

  .project > .left > ul > li {
    height: 37px;
    line-height: 37px;
    padding-left: 20px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
  }

  .project > .left > ul > li:hover {
    background: #4DB6CB;
    color: #FFF;
    border-bottom: none;
  }

  .checkPinglei {
    background: #4DB6CB;
    color: #FFF;
    border-bottom: none;
  }

  .project_list {
    display: table-cell;
    vertical-align: top;
    background: #F7FAFA;
    position: relative;
    overflow-y: auto;
  }

  .project_list > .scroo {
    position: absolute;
    width: 100%;
  }

  .project_list > .scroo > ul {
    overflow: hidden;
    box-sizing: border-box;
    list-style: none;
    padding: 15px 25px;
    width: 800px;
    margin: 0 auto;

  }

  .project_list > .scroo > ul > li {
    width: 240px;
    float: left;
    box-sizing: border-box;
    margin-right: 10px;
    margin-bottom: 45px;
    cursor: pointer;
    background: #ffffff;
    border-radius: 5px;
    padding-bottom: 10px;
    overflow: hidden;
    box-shadow: 1px 1px 5px 0 #d8d5d5;
    position: relative;
  }

  .project_list .iconfontyyy:hover {
    color: #f2f2f2 !important;
  }

  .project_list > .scroo > ul > li:hover .option {
    display: block;
  }

  .project_list > .scroo > ul > li > .option {
    width: 100%;
    height: 30px;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    line-height: 30px;
    top: 150px;
    left: 0;
    display: none;
  }

  .project_list > .scroo > ul > li > .img {
    width: 100%;
    height: 180px;
  }

  .project_list > .scroo > ul > li > p:nth-of-type(1) {
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    padding-left: 10px;
    box-sizing: border-box;
  }

  .project_list > .scroo > ul > li > p:nth-of-type(2) {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    padding-left: 10px;
    box-sizing: border-box;
    color: #bbb;
  }

  .project_list > .scroo > p {
    width: 800px;
    margin: 0 auto 0 auto;
    padding-left: 27px;
    padding-top: 10px;
    box-sizing: border-box;
    height: 37px;
    line-height: 33px;
    font-size: 20px;
  }

  .mymodal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mymodal > .conte {
    width: 350px;
    height: 140px;
    overflow: hidden;
    background: #FFF;
    border-radius: 5px;
    padding: 0 0;
  }
</style>
