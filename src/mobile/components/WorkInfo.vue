<template>
  <div>
    <div class="work_info">
      <div class="userinfo">
        <img class="headimg" :src="userinfo.headimg">
        <div class="userinfo_text">
          <p class="nickname" v-html="userinfo.nickname"></p>
          <p class="description" v-html="setexp(userinfo.exp)"></p>
        </div>
        <p class="learn_more">learn more</p>
      </div>
      <div class="work_text">
        <p class="title" v-html="projectinfo.title"></p>
        <p class="desc" v-html="projectinfo.description"></p>
      </div>
    </div>
    <div v-for="src in projectinfo.works" style="margin-bottom: 20px;">
      <x-img :src="src" style="width: 100%;display: block" :offset="50"></x-img>
    </div>
    <footer style="color: #bbb;padding: 10px 15px;letter-spacing: 1px;">
      <p>本作品由猴小胖：{{userinfo.nickname}} 版权所有，禁止匿名转载；禁止商业使用；禁止个人使用；</p>
    </footer>
  </div>
</template>

<script>
  import {XImg} from 'vux'
  export default {
    components: {
      XImg
    },
    data () {
      return {
        projectinfo: {},
        userinfo: {},
        album_id: this.$route.query.album_id,
        user_id: this.$route.query.user_id
      }
    },
    created(){
      this.getuserinfo(this.user_id);
      this.getAlbumInfo(this.album_id);
    },
    methods: {
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
      getAlbumInfo(id){
        var that = this;
        ajax({
          type: "get",
          url: "http://houxiaopang.com/api/v1.1/albumdetail",
          data: {'album_id': id},
          success(result){
            if (result.code === 0) {
              that.projectinfo = result.data;
              that.projectinfo.category = formatCategory(that.projectinfo.category, 1);
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
          url: "http://houxiaopang.com/api/v1.1/resumeinfo",
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
    background: #dddddd;
    padding: 15px 15px;

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
    color: #0f86ff;
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
