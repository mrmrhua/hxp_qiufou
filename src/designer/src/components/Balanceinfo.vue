<template>
  <div class="warp">
    <div class="top">
      <div @click="choose(index)" v-for="(item,index) in sort" :class="{active:item.active}" class="sortitem">
        {{item.name}}
      </div>
    </div>
    <div class="listwarp">
      <div id="listitem" class="listitem">
        <div class="list">
          <!--全部列表-->
          <p style="text-align: center;height: 30px;line-height: 30px;" v-show="cashflow.length === 0">暂无记录</p>
          <div class="item" v-for="item in cashflow">
          <div class="l">
            <p>{{item.remark}}</p>
            <p style="font-size: 12px;color: #999">{{item.when}}</p>
          </div>
          <div class="r">
            <p style="font-size: 18px;">{{setMoney(item.change_money)}}</p>
            <p style="font-size: 12px;">{{item.status}}</p>
          </div>
        </div>
        </div>
        <div class="list">
          <!--收入列表-->
          <p style="text-align: center;height: 30px;line-height: 30px;" v-show="shourulist.length === 0">暂无记录</p>
          <div class="item" v-for="item in shourulist">
            <div class="l">
              <p>{{item.remark}}</p>
              <p style="font-size: 12px;color: #999;">{{item.when}}</p>
            </div>
            <div class="r">
              <p style="font-size: 18px;">{{setMoney(item.change_money)}}</p>
              <p style="font-size: 12px;">{{item.status}}</p>
            </div>
          </div>

        </div>
        <div class="list">
          <!--支出列表-->
          <p style="text-align: center;height: 30px;line-height: 30px;" v-show="zhichulist.length === 0">暂无记录</p>
          <div class="item" v-for="item in zhichulist">
            <div class="l">
              <p>{{item.remark}}</p>
              <p style="font-size: 12px;color: #999">{{item.when}}</p>
            </div>
            <div class="r">
              <p style="font-size: 18px;">{{setMoney(item.change_money)}}</p>
              <p style="font-size: 12px;">{{item.status}}</p>
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
        sort: [
          {name: "全部", active: true},
          {name: "收入", active: false},
          {name: "支出", active: false}
        ],
        cashflow: [],
        zhichulist: [],
        shourulist: []
      }
    },
    created(){
      this.getcashflow()
    },
    methods: {
      choose(index){
        this.sort.forEach(function (item) {
          item.active = false
        })
        this.sort[index].active = true
        var t = document.getElementById("listitem")
        if (index === 0) {
          t.style.left = "0"
        } else if (index === 1) {
          t.style.left = "-100%"
        } else if (index === 2) {
          t.style.left = "-200%"
        }
      },
      setMoney(value){
        return value > 0 ? "+" + value.toFixed(2) : value.toFixed(2)
      },
      fenlei(){//收入支出分类
        var that = this
        this.cashflow.forEach(function (item) {
          if (item.change_money > 0) {
            that.shourulist.push(item)
          } else {
            that.zhichulist.push(item)
          }
        })
      },
      getcashflow(){//查看流水
        showload()
        var that = this
        ajax({
          url: "http://www.houxiaopang.com/api/v1.1/designer/getcashflow",
          token: true,
          success(res){
            if (res.code === 0) {
              that.cashflow = res.data.cashflow
              that.fenlei()
            } else {
              showModal("网络拥挤，请稍后再试。")
            }
            hideload()
          },
          error(){
            hideload()
            showModal("网络拥挤，请稍后再试。")
          }
        })
      },
    }
  }
</script>

<style scoped>
  .warp {
    background: #f4f4f4;
    height: 100%;
  }

  .top {
    height: 50px;
    display: flex;
    justify-content: space-around;
    background: #fff;
  }

  .sortitem {
    height: 100%;
    border-bottom: 2px solid transparent;
    font-size: 18px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    justify-content: center;
    transition: border .5s;
  }

  .active {
    border-bottom: 2px solid #d01667;
    color: #d01667;
  }

  .listwarp {
    width: 100%;
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }

  .listitem {
    width: 300%;
    height: 100%;
    overflow: hidden;
    position: relative;
    left: 0;
    transition: left .5s;
  }

  .list {
    width: 33.3333%;
    height: 100%;
    overflow: auto;
    float: left;
    border-top: 1px solid #d9d9d9;
  }

  .item {
    height: 80px;
    padding: 10px 15px;
    background: #fff;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    justify-content: space-between;
  }

  .l {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

  }
  .l p{
    font-size:16px;
  }
  .r {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    color: #fe6549;
    font-size:16px;
  }
</style>
