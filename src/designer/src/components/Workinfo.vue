<template>
  <div id="warp" class="warp">
    <div class="info">
      <div class="left">
        <img :src="userinfo.headimg" alt="">
        <div class="name">{{userinfo.nickname || "未填写"}}</div>
      </div>
      <div class="right">
        <p>{{setcity(userinfo.city)}}</p>
        <p>{{info.up_time}}</p>
      </div>
    </div>
    <div class="title">
      <p v-text="info.title"></p>
      <span class="categroy">{{setcate(info.category)}}</span>
    </div>
    <div class="desc" v-html="info.description"></div>
    <div class="imglist">
      <img @click="selectImg(index)" v-for="(item,index) in info.works" :key="index" v-lazyload="setimg(item)" alt="">
    </div>
    <transition name="slide-fade" class="fadeView">
      <div v-if="show">
        <image-view :imgArr="info.works"
                    :showImageView="true"
                    :imageIndex="imageIndex"
                    v-on:hideImage="show = false"></image-view>
      </div>
    </transition>
  </div>
</template>
<script>
  import imageView from './ImageView.vue'
  export default{
    data(){
      return {
        info: {},
        userinfo: null,
        show: false,
        imageIndex: 0
      }
    },
    components: {
      'image-view': imageView
    },
    created(){
      this.userinfo = JSON.parse(window.localStorage.userinfo)
      this.getinfo(this.$route.params.id)

    },
    methods: {
      selectImg (index) {
        this.show = true
        this.imageIndex = index
      },
      setimg(value){
        return value + "?imageView2/2/w/750"
      },
      setcity(value){
        var c = value.split(" ");
        if (c[0] === c[1]) {
          return c[0]
        } else {
          return value
        }
      },
      setcate(type){
        var type = type;
        if (type === 1) {
          type = "PPT";
        } else if (type === 2) {
          type = "UI";
        } else if (type === 3) {
          type = "文本画册";
        } else if (type === 4) {
          type = "海报展览";
        } else if (type === 5) {
          type = "LOGO";
        } else if (type === 6) {
          type = "企业形象设计（VI）";
        } else if (type === 0) {
          type = "测试品类";
        }
        return type;
      },
      getinfo(id){
        showload("加载中···");
        var that = this
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/albumdetail",
          data: {'album_id': id},
          success(res){
            if (res.code === 0) {
              that.info = res.data
            }
            hideload()
          },
          error(){
            hideload();
            showModal("网络拥挤，请稍后再试。")
          }
        })
      }
    }
  }

</script>
<style scoped>
  .warp {
    height: 100%;
    position: relative;
    background: #fff;
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 20px;
  }

  .info {
    height: 80px;
    display: flex;
    border-bottom: 1px solid #d9d9d9;
  }

  .left {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .name {
    width: 50px;
    font-size: 16px;
  }

  .categroy {
    height: 25px;
    display: inline-block;
    background: rgba(253, 100, 73, 0.2);
    border-radius: 25px;
    text-align: center;
    padding: 0 15px;
    color: #313131;
    line-height: 25px;
    margin-top: 10px;
    font-size: 12px;
  }

  .left > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: chartreuse;
  }

  .right {
    width: 50%;
    height: 100%;
    display: flex;
    color: #999;
    flex-direction: column;
    justify-content: center;
  }

  .right > p {
    font-size: 12px;
  }

  .title {
    border-bottom: 1px solid #d9d9d9;
    padding: 10px 15px;
  }

  .title > p {
    font-weight: 600;
    font-size: 18px;
  }

  .desc {
    padding: 10px 15px;
  }

  .imglist {
    width: 100%;
    background: #f4f4f4;
  }

  .imglist > img {
    width: 100%;
    background: #fff;
    display: block;
    margin-bottom: 10px;
  }
</style>
