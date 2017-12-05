<template>
  <div>
    <div class="work_info">
      <div class="userinfo">
        <img class="headimg" :src="userinfo.headimg">
        <div class="userinfo_text">
          <p class="nickname" v-html="userinfo.nickname"></p>
          <p class="description" v-html="setexp(userinfo.exp)"></p>
        </div>
        <router-link :to="{name:'user',query:{id:user_id}}" tag="p" class="learn_more">更多</router-link>
      </div>
      <div class="work_text">
        <p class="title" v-html="projectinfo.title"></p>
        <p class="desc" v-html="projectinfo.description"></p>
      </div>
    </div>
    <div v-for="(src,idx) in projectinfo.works" style="margin-bottom: 20px;" @click="show(idx)">
      <x-img class="previewer-demo-img" :src="src" style="width: 100%;display: block" :offset="50"></x-img>
    </div>
    <footer style="color: #bbb;padding: 10px 15px;letter-spacing: 1px;">
      <p>本作品由猴小胖签约设计师：{{userinfo.nickname}} 版权所有，禁止匿名转载；禁止商业使用；禁止个人使用；</p>
    </footer>
    <div v-transfer-dom>
      <previewer :list="setworklist(projectinfo.works)" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
  import {XImg, Previewer, TransferDom} from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      XImg,
      Previewer
    },
    data () {
      return {
        projectinfo: {
          works: []
        },
        userinfo: {},
        album_id: null,
        user_id: null,
        options: {
          getThumbBoundsFn (index) {
            var thumbnail = document.querySelectorAll('.previewer-demo-img')[index];
            var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
            var rect = thumbnail.getBoundingClientRect();
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }
      }
    },
    created(){
      this.album_id = this.$route.query.album_id
      this.user_id = this.$route.query.user_id
      if (this.album_id && this.user_id) {
        this.getuserinfo(this.user_id);
        this.getAlbumInfo(this.album_id);
      } else {
        this.$router.push("/")
      }
    },
    methods: {
      setworklist(value){
        var list = [];
        value.forEach(function (item) {
          list.push({'src': item});
        });
        return list;
      },
      setexp(exp){
        var y = new Date().getFullYear();
        if (exp >= y) {
          return "学生"
        } else if (exp < y) {
          return (y - exp) + "年工作经验";
        } else {
          return "学生"
        }
      },
      show (num) {
        this.$refs.previewer.show(num)
      },
      getAlbumInfo(id){
        var that = this;
        ajax({
          type: "get",
          url: "http://www.houxiaopang.com/api/v1.1/albumdetail",
          data: {'album_id': id},
          success(result){
            if (result.code === 0) {
              result.data.category = formatCategory(result.data.category, 1);
              that.projectinfo = result.data;
            } else {
              location.href = "http://houxiaopang.com/404";
            }
          }
        });
      },
      getuserinfo(id){
        var that = this;
        ajax({
          type: "get",
          url: "http://www.houxiaopang.com/api/v1.1/resumeinfo",
          data: {
            'designer_id': id,
          },
          success(data){
            if (data.code === 0) {
              that.userinfo = data.data;
            } else {
              alert("网络拥挤，请稍后再试···");
            }
          },
          error(){
            alert("网络拥挤，请稍后再试···");
          }
        });
      },
    }
  }
</script>

<style scoped>
  .work_info {
    text-align: left;

  }

  .work_info > .userinfo {
    overflow: hidden;
    background: linear-gradient(to right, #fe6549, #d01667);
    padding: 15px 15px;
    color: #fff;
  }

  .work_info > .userinfo > .headimg {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #000;
    float: left;
  }

  .work_info > .userinfo > .userinfo_text {
    width: 150px;
    vertical-align: top;
    float: left;
    line-height: 30px;
    margin-left: 20px;
    height: 70px;
  }

  .work_info > .userinfo > .userinfo_text > .nickname {
    margin-top: 5px;
    font-weight: 600;
    letter-spacing: 0;
  }

  .work_info > .userinfo > .userinfo_text > .description {
    letter-spacing: 0;
  }

  .work_info > .userinfo > .learn_more {
    color: #fff;
    margin-top: 42px;
    float: right;
  }

  .work_text {
    padding: 10px 25px;
  }

  .work_text > .title {
    font-weight: 600;
    font-size: 24px;
  }

  .work_text > .desc {
    font-size: 14px;
    color: #313131;
    margin-top: 10px;
    line-height: 20px;
  }
</style>
