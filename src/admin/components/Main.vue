<template>
  <!--最近上传组件-->
  <div class="conbody">
    <p>最近上传</p>
    <div class="content">
      <div class="zjsc_list">
        <ul style="overflow: hidden">
          <li v-for="item in recentalbum" @click="jump(item.id)">
            <img class="img" width="240" :src="item.url"/>
            <p v-html="item.title"></p>
            <p v-html="item.type"></p>
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
</template>
<script>
  import token from "@/components/token.js"
  export default{
    data(){
      return {
        recentalbum: [], //最近上传列表，对象数组，包含url封面地址，title，品类，id
        show: false,
      }
    },
    created(){
      this.getRecentAlbumList();
    },
    methods: {
      jump(id){
        open("http://houxiaopang.com/workdetail/#/" + id);
      },
      getRecentAlbumList(){
        var that = this;
        $.ajax({
          url: 'http://houxiaopang.com/api/v1.1/designerdash/index/recent',
          type: "GET",
          headers: {"Authorization": "Token " + token},
          timeout: 5000,
          success: function (data) {
            if (data.code != 0) {
              alert("最近上传列表获取失败！");
            } else {
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
                that.recentalbum.push(obj);
              }
              if (that.recentalbum.length === 0) {
                that.show = true;
              } else {
                that.show = false;
              }
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
      }
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

  .zjsc_list {
    padding: 40px 0;
    box-sizing: border-box;
    width: 1000px;
    margin: 0 auto;
    height: 100%;
  }

  .zjsc_list > ul {
    overflow: hidden;
    box-sizing: border-box;
    list-style: none;
  }

  .zjsc_list > ul > li {
    width: 240px;
    float: left;
    box-sizing: border-box;
    margin-right: 10px;
    margin-bottom: 25px;
    cursor: pointer;
    padding-bottom: 10px;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 0 #d8d5d5;

  }

  .zjsc_list > ul > li .img {
    width: 100%;
    height: 180px;
  }

  .zjsc_list > ul > li > p:nth-child(2) {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    padding-left: 10px;
    box-sizing: border-box;
  }

  .zjsc_list > ul > li > p:nth-child(3) {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    padding-left: 10px;
    box-sizing: border-box;
    color: #bbb;
  }
</style>
