<template>
  <div class="warp">
    <div class="topbar">
      <span @click="choose(index)" v-for="(item,index) in tabbar" :class='{active:item.active}'>{{item.name}}</span>
    </div>
    <div class="demandlist">
      <div class="none" v-show="project.length > 0">
        <div class="none-img">
          <img class="logo" src='../assets/none.png'>
          <span style='color:#999;'>您还没有认领过项目哦~</span>
        </div>
      </div>
      <div class="list" :style="{left:left}">
        <div class="listwarp" v-show="project.length === 0">
          <div class="item_list" v-for="n in 20">
            <div class="icon_item"><i class="dian_icon"></i><img style="width: 100%;" src="../assets/progress@2x.png"
                                                                 alt=""></div>
            <div class="con_item">
              <div class="top_item">
                <div class="title_item">项目名称项目名称</div>
                <div class="status_item">进行中</div>
              </div>
              <div class="foot_item">
                <div class="from_item">客户：邹打萨达</div>
                <div class="uptime_item">2017-10-28 20:30:25</div>
              </div>
            </div>
          </div>
        </div>
        <div class="listwarp" v-show="project.length === 0">
          <div class="item_list" v-for="n in 20">
            <div class="icon_item"><img style="width: 100%;" src="../assets/complete@2x.png"
                                        alt=""></div>
            <div class="con_item">
              <div class="top_item">
                <div class="title_item">项目名称项目名称</div>
                <div class="status_item"><img style="width:40px;" src="../assets/finish@2x.png" alt=""></div>
              </div>
              <div class="foot_item">
                <div class="from_item">客户：邹打萨达</div>
                <div class="uptime_item">2017-10-28 20:30:25</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        project: [],
        tabbar: [{name: "进行中", active: true}, {name: "已完成", active: false}],
        left: 0
      }
    },
    created(){
    },
    methods: {
      choose(idx){
        this.tabbar.forEach(function (item, index) {
          item.active = false
          if (idx === index) {
            item.active = true
          }
        })
        this.left = idx === 0 ? 0 : "-100%";
      }
    }
  }
</script>
<style scoped>
  .warp {
    height: 100%;
    background: #fff;
    position: relative;
  }

  .topbar {
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #d9d9d9;
  }

  .topbar > span {
    width: 80px;
    text-align: center;
    border-bottom: 2px solid transparent;
    font-size: 14px;
    height: 40px;
    transition: all .5s;
  }

  .active {
    border-bottom: 2px solid #d01667 !important;
  }

  .demandlist {
    position: absolute;
    width: 100%;
    top: 40px;
    bottom: 0;
    overflow: hidden;
  }

  .logo {
    width: 128px;
    height: 128px;
    display: block;
  }

  .none {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    padding-top: 25%;
  }

  .none-img {
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: center;
  }

  .list {
    height: 100%;
    overflow: hidden;
    background: #f4f4f4;
    padding-top: 10px;
    position: relative;
    width: 200%;
    display: flex;
    transition: all 0.5s;
    left: 0;
  }

  .item_list {
    display: flex;
    background: #fff;
    border-bottom: 1px solid #d9d9d9;
    padding: 10px 15px;
    align-items: center;
  }

  .listwarp {
    width: 50%;
    height: 100%;
    overflow-y: auto;
  }

  .icon_item {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    position: relative;
  }

  .con_item {
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    width: 100%;
    height: 60px;
    justify-content: space-between;
    padding-left: 15px;

  }

  .top_item {
    display: flex;
    justify-content: space-between;
  }

  .foot_item {
    display: flex;
    justify-content: space-between;

  }

  .from_item {
    font-size: 12px;
  }

  .uptime_item {
    font-size: 12px;
  }

  .status_item {
    color: #fe6549;
  }

  .dian_icon {
    display: block;
    position: absolute;
    right: -5px;
    top: -5px;
    border: 2px solid #fff;
    background: #f00;
    width: 14px;
    height: 14px;
    border-radius: 50%;
  }
</style>

