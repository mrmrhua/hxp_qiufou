<template>
  <div class="conbody">
    <div class="labelpage">
      <ul>
        <li @click="choose(index)" v-for="(item,index) in type" :class="{labelpage_active : item.selected}">{{item.name}}</li>
      </ul>
    </div>
    <div class="demandlist">
      <ul>
        <li @click="next(item.project_id)" v-for="item in demandlist">
          <img v-if="item.lastimg" :src="item.lastimg" class="img" alt="">
          <div v-if="!item.lastimg" style="width:100%;height: 180px;overflow: hidden;">
            <p style="margin-top:80px;text-align: center;color: #787878;">点击添加设计进度图</p>
          </div>
          <p>{{item.title}}</p>
          <p><span style="display: block">客户：{{item.client}}</span><span style="display: block">{{item.up_time}}</span></p>
        </li>
      </ul>
      <div v-show="demandlist.length === 0" style="text-align: center;">
        <i class="iconfontyyy" style="font-size:200px;color: #bfbfbf;">&#xe617;</i>
        <p style="font-size: 16px;color: #bfbfbf;font-weight: 900;">你还没有接过项目哦</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        type: [
          {name: "进行中", selected: true},
          {name: "已完成", selected: false}
        ],
        demandlist: [],
        processing: [],
        finished: []
      }
    },
    created(){
      this.getdemandlist()
    },
    methods: {
      choose(idx){
        var that = this
        if (this.type[idx].selected) return;
        this.type.forEach(function (item, index) {
          item.selected = false
          if (idx === index) {
            item.selected = true
          }
          if (idx === 0) {
            that.demandlist = that.processing
          } else if (idx === 1) {
            that.demandlist = that.finished
          }
        })
      },
      next(id){
        this.$router.push({
          path: "/demand/demandinfo",
          query: {
            id: id
          }
        })
      },
      getdemandlist(){
        var that = this;
        $.ajax({
          url: "http://www.houxiaopang.com/api/v1.1/designer/projectlist",
          type: "GET",
          headers: {"Authorization": "Token " + token},
          success(res){
            if (res.code === 0) {
              res.data.projects.forEach(function (item) {
                //0: 进行中， 1： 已结束， 2: 已关闭
                if (item.status === 0) {
                  that.processing.push(item)
                } else {
                  that.finished.push(item)
                }
              })
              that.demandlist = that.processing
            } else {
              alert("网络拥挤，请稍后再试。")
            }
          },
          error(){
            alert("网络拥挤，请稍后再试。")
          }
        })
      }
    }
  }

</script>
<style scoped>
  .conbody > .labelpage {
    width: 100%;
    height: 50px;
  }

  .labelpage > ul {
    width: 100%;
    height: 100%;
  }

  .labelpage > ul > li {
    float: left;
    padding: 0 3px;
    font-size: 16px;
    line-height: 30px;
    margin-left: 10px;
    margin-right: 25px;
    margin-top: 9px;
    background: #fff;
    cursor: pointer;
  }

  .labelpage > ul > li:hover {
    border-bottom: 2px solid #d01667;
  }

  .labelpage > ul > .labelpage_active {
    border-bottom: 2px solid #d01667;
  }

  .demandlist {
    padding-top: 60px;
    width: 100%;
  }

  .demandlist > ul {
    overflow: hidden;
    box-sizing: border-box;
    list-style: none;
    width: 800px;
  }

  .demandlist > ul > li {
    width: 240px;
    float: left;
    box-sizing: border-box;
    margin-right: 30px;
    margin-bottom: 45px;
    cursor: pointer;
    background: #ffffff;
    padding-bottom: 10px;
    overflow: hidden;
    box-shadow: 1px 1px 8px 5px rgba(153, 153, 153, 0.13);
    margin-left: 3px;
    position: relative;
  }

  .demandlist > ul > li > .img {
    width: 100%;
    height: 180px;
    display: block;
  }

  .demandlist > ul > li:nth-child(3n) {
    margin-right: 3px;
  }

  .demandlist > ul > li > p:nth-of-type(1) {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    padding: 0 10px;
    box-sizing: border-box;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .demandlist > ul > li > p:nth-of-type(2) {
    /*height: 20px;*/
    line-height: 20px;
    font-size: 12px;
    padding: 0 10px;
    box-sizing: border-box;
    color: #bbb;
  }

  .demandlist > p {
    width: 800px;
    margin: 0 auto 0 auto;
    padding-top: 10px;
    box-sizing: border-box;
    height: 37px;
    line-height: 33px;
    font-size: 20px;
  }
</style>
