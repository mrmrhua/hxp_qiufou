<template>
  <!--最近上传组件-->
  <div class="conbody">
    <p>最近上传</p>
    <div class="content">
      <div class="zjsc_list">
        <ul style="overflow: hidden">
          <li v-for="(item,index) in recentalbum" @click="jump(item.id)">
            <img class="img" width="240" :src="item.url"/>
            <p v-html="item.title"></p>
            <p v-html="item.type"></p>
            <div class="option">
              <i @click.stop="edit(item.id)" class="iconfontyyy" style="color:#bbb;font-size: 18px;margin-left: 10px;">&#xe609;</i>
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
    <!--删除 - 模态框-->
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
  export default{
    data(){
      return {
        recentalbum: [], //最近上传列表，对象数组，包含url封面地址，title，品类，id
        show: false,
        delmodel: false,
        removeid: -1,
        removeindex: -1,
      }
    },
    created(){
      this.getRecentAlbumList();
    },
    methods: {
      jump(id){
        open("http://houxiaopang.com/workdetail/#/album/" + id);
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
              //location.href = "http://houxiaopang.com/qrlogin";
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
          url: "http://houxiaopang.com/api/v1.1/designerdash/deletealbum",
          headers: {"Authorization": "Token " + token},
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
    position: relative;
  }

  .zjsc_list .iconfontyyy:hover {
    color: #f2f2f2 !important;
  }

  .zjsc_list > ul > li:hover .option {
    display: block;
  }

  .zjsc_list > ul > li > .option {
    width: 100%;
    height: 30px;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    line-height: 30px;
    top: 150px;
    left: 0;
    display: none;
  }

  .zjsc_list > ul > li .img {
    width: 100%;
    height: 180px;
  }

  .zjsc_list > ul > li > p:nth-of-type(1) {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    padding-left: 10px;
    box-sizing: border-box;
  }

  .zjsc_list > ul > li > p:nth-of-type(2) {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    padding-left: 10px;
    box-sizing: border-box;
    color: #bbb;
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
