<template>
  <div class="c_warp">
    <div v-show="desc&&desc.trim() !=''" class="c_desc">
      <div style="font-size: 16px;">设计师备注：</div>
      <div style="font-size: 12px;margin-top: 5px;" v-html="setDesc(desc)"></div>
    </div>
    <div class="c_list">
      <div @click="next(item.id,item.workUrl)" class="c_imgwarp" v-for="item in imglist">
        <img :src="item.workUrl" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        imglist: [],
        desc: null
      }
    },
    created(){
      var id = this.$route.query.id
      if (!id) {
        this.$router.push("/")
        return
      }
      this.desc = window.localStorage.postdesc
      this.getinfo(id)
    },
    methods: {
      getinfo(id){
        var that = this;
        ajax({
          url: "https://www.houxiaopang.com/api/v1.2/circle/getprojectworks",
          data: {
            id: id
          },
          success(res){
            if (res.code === 0) {
              that.imglist = res.data.works;
            } else {
              showModal("网络拥挤，请稍后再试。")
            }
            hideload();
          },
          error(){
            showModal("网络拥挤，请稍后再试。")
            hideload();
          }
        })
      },
      next(id, src){
        this.$router.push({
          path: "/workproject/annotation",
          query: {
            id: id,
            src: src
          }
        })
      },
      setDesc(value){
        if (value) {
          if (value.trim() === "") {
            return "未填写"
          }
          return value.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>")
        } else {
          return "未填写"
        }
      },
    }

  }
</script>
<style scoped>
  .c_warp {
    padding: 10px 15px;
  }

  .c_desc {
    display: flex;
    flex-direction: column;
  }

  .c_list {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-flow: wrap;
    margin-top: 20px;
  }

  .c_imgwarp {
    overflow: hidden;
    display: flex;
    align-items: center;
    width: 49%;
    height: 120px;
    margin-bottom: 10px;
    justify-content: center;
    border: 1px solid #dedede;
  }
</style>
