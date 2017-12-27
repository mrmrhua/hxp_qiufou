<template>
  <div class="warp">
    <div class="head">
      <div class="category">
        <span @click="choosecate(index)" :class="item.active" v-for="(item,index) in catelist">{{item.val}}</span>
      </div>
    </div>
    <div id="worklist" v-if="albumlist.length>0" class="worklist">
      <div class="itemwarp">
        <div id="container" class="item" :key="index" @click="next(item.album_id)"
             v-for="(item,index) in albumlist">
          <img v-lazyload="setimg(item.cover_url)" style="width: 100%;display: block">
          <div class="albuminfo">
            <p style="padding: 2px 0">{{item.title}}</p>
            <span style="padding: 2px 0;color: #999;font-size: 12px;">{{setcate(item.category)}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="albumlist.length===0" class="worklist center">
      <img src="http://image.houxiaopang.com/wx/web/none.png" alt="">
      <p style="color:#999;margin-top:10px; ">没有任何作品</p>

    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        catelist: [
          {val: "全部", active: "active"},
          {val: "PPT", active: ""},
          {val: "UI", active: ""},
          {val: "文本画册", active: ""},
          {val: "海报展板", active: ""},
          {val: "LOGO", active: ""},
          {val: "企业形象（VI）", active: ""}
        ],
        albumlist: [],
        category: -1,
      }
    },
    created(){
      this.getworklist(-1);
    },
    methods: {
      setimg(value){
        return value + "?imageView2/2/w/375"
      },
      choosecate(idx){
        var that = this
        this.catelist.forEach(function (item, index) {
          item.active = ""
          if (idx === index) {
            item.active = "active"
            that.category = idx === 0 ? -1 : idx;
            that.getworklist(that.category);
          }
        });
      },
      next(idx){
        this.$router.push({name: 'workinfo', params: {id: idx}})
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
          type = "海报展板";
        } else if (type === 5) {
          type = "LOGO";
        } else if (type === 6) {
          type = "企业形象设计（VI）";
        } else if (type === 0) {
          type = "测试品类";
        }
        return type;
      },
      getworklist(c){
        showload("加载中···")
        var that = this;
        ajax({
          url: "https://www.houxiaopang.com/api/v1.1/designerdash/collection",
          token: true,
          data: {
            category: c
          },
          success(res){
            if (res.code === 0) {
              that.albumlist = res.data
            }
            hideload();
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
    overflow: hidden;
  }

  .active {
    color: #fe6549;
    border-bottom: 1px solid #fe6549 !important;
  }

  .head {
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    width: 100%;
    overflow-x: auto;
  }

  .category {
    position: relative;
    height: 40px;
    display: inline-block;
    white-space: nowrap;
  }

  .category > span {
    display: inline-block;
    width: 70px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-bottom: 1px solid transparent;
    box-sizing: border-box;
    transition: all .5s;
  }

  .worklist {
    width: 100%;
    position: absolute;
    top: 40px;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .itemwarp {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
    flex-flow: wrap;
  }

  .item {
    width: 49%;
    margin-bottom: 10px;
    box-shadow: 1px 1px 5px #bbb;
  }

  .worklist > ul > li:nth-child(2n) {
    float: right;
  }

  .albuminfo {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 3px 5px;
  }
</style>
