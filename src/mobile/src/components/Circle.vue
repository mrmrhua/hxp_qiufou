<template>
  <div class="c_warp">
    <div class="c_desc">
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
        desc: ""
      }
    },
    created(){
      var id = this.$route.query.id
      if (!id) {
        this.$router.push("/")
        return
      }
      this.getinfo(id)
      hideload();
    },
    methods: {
      getinfo(id){
        var that = this;
        ajax({
          url: "http://www.houxiaopang.com/api/v1.2/circle/getprojectworks",
          data: {
            id: id
          },
          success(res){
            if (res.code === 0) {
              that.imglist = res.data.works;
            } else {
              showModal("网络拥挤，请稍后再试。")
            }
          },
          error(){
            showModal("网络拥挤，请稍后再试。")
          }
        })
      },
      next(id, src){
        this.$router.push({
          path: "annotation",
          query: {
            id: id,
            src: src
          }
        })
      },
      setDesc(value){
        return value.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>")
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
  }
</style>
