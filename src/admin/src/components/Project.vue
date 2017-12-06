<template id="project">
  <div class="project">
    <div class="category">
      <div>
        <div class="cate" @click.stop="showcategoryMethode"><span
          style="line-height: 27px;color: #d01667;" v-text="category"></span>
          <i class="iconfontyyy" style="color:#d01667;font-size: 30px;vertical-align: top">&#xe821;</i>
          <ul v-show="showcategory" class="pinglei_ul">
            <li class="cateactive"><span>全部品类</span></li>
            <li><span>PPT</span></li>
            <li><span>UI</span></li>
            <li><span>文本画册</span></li>
            <li><span>海报展板</span></li>
            <li><span>LOGO</span></li>
            <li><span>企业形象VI</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="project_list">
      <ul>
        <li v-for="(item,index) in projectalbum" @click="jump(item.id)">
          <div class="img" style="overflow: hidden;"><img width="240" :src="item.url"/></div>
          <p :title="item.title" v-html="item.title"></p>
          <p v-html="item.type"></p>
          <div class="option">
            <i @click.stop="edit(item.id)" class="iconfontyyy"
               style="color:#bbb;font-size: 18px;margin-left: 10px;">&#xe609;</i>
            <i @click.stop="rm(item.id,index)" class="iconfontyyy"
               style="color:#bbb;font-size: 18px;margin-left: 10px;">&#xe66d;</i>
          </div>
        </li>
      </ul>
      <div  v-show="projectalbum.length === 0" style="text-align: center">
        <i class="iconfontyyy" style="font-size:200px;color: #bfbfbf;">&#xe617;</i>
        <p style="font-size: 16px;color: #bfbfbf;font-weight: 900;">你还没有创建过任何作品</p>
        <router-link to="/newalbum" tag="div" class="btn_image">上传作品</router-link>
      </div>
      <pagination :pageInfo="pageinfo" @change="pagechange"></pagination>
    </div>
    <div class="mymodal" v-show="delmodel">
      <div class="conte">
        <div style="background: #DEDEDE;height: 30px;line-height: 30px;padding: 0 15px;text-align: center;">
          <span >删除提醒</span><span
          style="float: right;cursor: pointer"
          @click="delmodel=false"><i class="iconfontyyy">&#xe67c;</i></span>
        </div>
        <div style="text-align: center;margin: 25px 30px 20px">
          <i class="iconfontyyy" style="font-size: 43px;color: red">&#xe691;</i>
          <p style="font-size: 18px;margin:15px 0 ;">确定删除此图片作品？</p>
          <div style="height: 30px;line-height: 30px;">
            <span
              style="display: inline-block;color:#4762FF;padding: 0 15px;cursor: pointer;"
              @click="remove">确定</span>
            <span @click="delmodel=false" style="display: inline-block;padding: 0 15px;cursor: pointer;">取消</span>
          </div>
        </div>
      </div>
    </div>
    <prompt prompt="success" :promptshow="promptshow"></prompt>
  </div>
</template>
<script>
  import prompt from "@/components/Prompt"
  import pagination from './Pagination'
  export default{
    props: ['showcategory'],
    data(){
      return {
        projectalbum: [],
        delmodel: false,
        removeid: -1,
        removeindex: -1,
        promptshow: false,
        category: "全部品类",
        cc:-1,
        pageinfo: {
          total: 0,     // 记录总条数   默认空，如果小于pageNum则组件不显示   类型Number
          pagenum: 12,    // 每页显示条数,默认10                              类型Number
          current: 1,     // 当前页数，   默认为1                             类型Number
          pagegroup: 3,     // 分页条数     默认为5，需传入奇数                  类型Number
          skin: '#d01667',
        }
      }
    },
    mounted(){
      var that = this;
      $(".pinglei_ul > li").each(function (i) {
        $(this).click(function () {
          i = i === 0 ? -1 : i;
          that.category = $(this).text();
          that.getCollection(i,that.pageinfo.current);
        });
      });
//      this.chooseCategory();
    },
    created(){
      this.getCollection(-1,this.pageinfo.current);
    },
    methods: {
      showcategoryMethode(){
        this.$emit("showcategory");
      },
      jump(id){
        open("http://houxiaopang.com/workdetail/album/" + id);
      },
      getCollection(c,page) {
        var that = this;
        $.ajax({
          type: "GET",
          data: {
            category: c,
            page: page
          },
          url: 'http://www.houxiaopang.com/api/v1.1/designerdash/collection',
          headers: {"Authorization": "Token " + token},
          timeout: 5000,
          success: function (data) {
            if (data.code === 0) {
              that.projectalbum = [];
              that.pageinfo.total = data.total;

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
        this.delmodel = true;
      },
      remove(){
        var that = this;
        that.delmodel = false;
        // 删除相册:
        $.ajax({
          type: "post",
          headers: {"Authorization": "Token " + token},
          url: "http://www.houxiaopang.com/api/v1.1/designerdash/deletealbum",
          data: {
            album_id: that.removeid
          },
          success(data){
            if (data.code === 0) {
              that.projectalbum.splice(that.removeindex, 1);
              that.promptshow = true;
              setTimeout(function () {
                that.promptshow = false;
              }, 1000);
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
      },
      pagechange: function (current) {     // 页码改变传入新的页码，此处做回调
        if(this.category == "全部品类"){
          this.cc = -1;
        } else if (this.category == "PPT") {
          this.cc = 1;
        } else if (this.category =="UI") {
          this.cc = 2;
        } else if (this.category =="文本画册") {
          this.cc = 3;
        } else if (this.category =="海报展板") {
          type = "海报展板";
          this.cc = 4;
        } else if (this.category =="LOGO") {
          this.cc = 5;
        } else if (this.category =="企业形象设计（VI）") {
          this.cc = 6;
        } else if (this.category =="测试品类") {
          this.cc = 0;
        }
        this.getCollection(this.cc, current);

      },
/*      chooseCategory(){
        var that = this;
        var li = document.getElementById("category").children;
        for (var i = 0, size = li.length; i < size; i++) {
          li[i].index = i;
          li[i].onclick = function () {
            $("#category").find("li").each(function () {
              $(this).removeClass("active");
            });
            $(this).addClass("active");

            if (this.index == 0) {
              this.index = -1;
            }
            that.pageinfo.current = 1;
            that.categroy = this.index;
            that.getCollection(that.categroy, that.pageinfo.current);
          }
        }
      },*/


    },
    components: {
      prompt,
      pagination
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
    color: #d01667;
    background-color: #fff;
    border: 1px solid #d01667;
    margin: 30px auto;
  }

  .btn_image:hover {
    color: #fff;
    background: linear-gradient(to right, #d01667, #fe6549);
    border: none;
  }

  .pinglei_ul {
    overflow: hidden;
    position: absolute;
    top: -15px;
    left: 100%;
    width: 200px;
    border: 1px solid #bbb;
    background: #fff;
    padding: 10px 25px;
    cursor: default;
    z-index: 1;
  }

  .cateactive {
    color: #d01667;
    padding-left: 0 !important;
  }

  .pinglei_ul > li {
    line-height: 35px;
    padding-left: 35px;
  }

  .pinglei_ul > li > span {
    cursor: pointer;
  }

  .pinglei_ul > li > span:hover {
    color: #d01667;
  }

  .project {
    width: 100%;
    min-height: 400px;
  }

  .category .cate {
    float: left;
    cursor: pointer;
    padding-left: 5px;
    font-size: 18px;
    position: relative;
  }

  .project_list {
    width: 100%;
    padding-top: 60px;
  }

  .project_list > ul {
    overflow: hidden;
    box-sizing: border-box;
    list-style: none;
    width: 800px;
  }

  .project_list > ul > li {
    width: 240px;
    float: left;
    box-sizing: border-box;
    margin-right: 30px;
    margin-bottom: 45px;
    cursor: pointer;
    background: #ffffff;
    padding-bottom: 10px;
    overflow: hidden;
    box-shadow: 1px 1px 5px 1px #d6d6d6;
    margin-left: 3px;
    position: relative;
  }

  .project_list .option > .iconfontyyy:hover {
    color: #f2f2f2 !important;
  }

  .project_list > ul > li:hover .option {
    display: block;
  }

  .project_list > ul > li > .option {
    width: 100%;
    height: 30px;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    line-height: 30px;
    top: 150px;
    left: 0;
    display: none;
  }

  .project_list > ul > li > .img {
    width: 100%;
    height: 180px;
  }

  .project_list > ul > li:nth-child(3n) {
    margin-right: 3px;
  }

  .project_list > ul > li > p:nth-of-type(1) {
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    padding-left: 10px;
    box-sizing: border-box;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .project_list > ul > li > p:nth-of-type(2) {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    padding-left: 10px;
    box-sizing: border-box;
    color: #bbb;
  }

  .project_list > p {
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
    background: rgba(0, 0, 0, 0.4);
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mymodal > .conte {
    width: 350px;
    overflow: hidden;
    background: #FFF;
    border-radius: 5px;
    padding: 0 0;
  }
</style>
