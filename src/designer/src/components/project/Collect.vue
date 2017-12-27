<template>
  <div class="warp">
    <img style="width: 100px;" src="../../assets/getmoney@2x.png" alt="">
    <div class="content">
      <div class="cell">
        <div class="l">项目名称：</div>
        <div class="r">{{title}}</div>
      </div>
      <div class="cell">
        <div class="l">客　　户：</div>
        <div class="r">{{name}}</div>
      </div>
      <div class="cell">
        <div class="l">费用类型：</div>
        <div class="r">
          <div @click="choose(index)" :class="{active:item.selected}" class="tag" v-for="(item,index) in collecttype">
            <img v-show="item.selected" class="imgtag_icon" src="../../assets/selected@2x.png" alt="">
            {{item.name}}
          </div>
        </div>
      </div>
      <div class="cell">
        <div class="l">费　　用：</div>
        <div class="r" style="justify-content: flex-start;align-items: center">
          <input type="number" v-model="money"
                 style="outline: none;border: 1px solid #d9d9d9;height: 30px;width: 100px;font-size: 16px;padding-left: 10px;">
          <span>（元）</span>
        </div>
      </div>
      <div class="cell">
        <div class="l">备　　注：</div>
        <div class="r"></div>
      </div>
      <textarea v-model="desc"
                style="padding:8px 10px;resize: none;border: 1px solid #d9d9d9;outline: none;width: 100%;background: #fafafa;font-size:16px;height: 114px;"
                placeholder="请填写收款补充说明"></textarea>
      <div class="btn" @click="submitpay">提交申请</div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        collecttype: [
          {name: "定金", selected: true},
          {name: "额外收费", selected: false},
          {name: "尾款", selected: false},
        ],
        money: "",
        desc: "",
        name: null,
        title: null,
        project_id: null
      }
    },
    created(){
      this.name = this.$route.query.name
      this.title = this.$route.query.title
      this.project_id = this.$route.query.id
      if (this.name === null || this.title === null || this.project === null) {
        this.$router.push("/project")
      }
    },
    methods: {
      choose(idx){
        this.collecttype.forEach(function (item, index) {
          item.selected = false
          if (index === idx) {
            item.selected = true
          }
        })
      },
      submitpay(){
        if (this.money === null || this.money.trim() === "") {
          showModal("请输入费用")
          return
        }
        if (!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.money)) {
          showModal("费用格式不正确")
          return
        }
        var feetype = null
        this.collecttype.forEach(function (item) {
          if (item.selected === true) {
            feetype = item.name
          }
        })
        showload("提交中")
        var that = this
        ajax({
          type: "POST",
          url: "https://www.houxiaopang.com/api/v1.1/chargeapply",
          token: true,
          data: {
            project_id: that.project_id,
            feetype: feetype,
            money: that.money.trim(),
            desc: that.desc.trim()
          },
          success(res){
            if (res.code === 0) {
              showModal("提交成功\n系统将立即通知客户付款。")
              that.money = ""
              that.desc = ""
              that.choose(0)
            } else {
              showModal("网络拥挤，请稍候再试。")
            }
            hideload()
          },
          error(){
            hideload()
            showModal("网络拥挤，请稍候再试。")
          }
        })
      },
    }
  }
</script>
<style scoped>
  .warp {
    padding: 20px 0;
    min-height: 100%;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
  }

  .content {
    width: 300px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
  }

  .cell {
    display: flex;
    height: 40px;
    align-items: center;
  }

  .l {
    width: 90px;
    flex-shrink: 0;
    font-size: 16px;
  }

  .r {
    width: 100%;
    flex-shrink: 1;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }

  .tag {
    padding: 3px 10px;
    border: 1px solid #999;
    font-size: 16px;
    position: relative;
  }

  .btn {
    font-size: 16px;
    width: 120px;
    height: 40px;
    border: 1px solid #ff445b;
    display: flex;
    margin-top: 30px;
    align-self: center;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    color: #ff445b;
  }

  .imgtag_icon {
    position: absolute;
    right: -1px;
    bottom: -1px;
    width: 15px;
    height: 15px;
    z-index: 10;
  }

  .active {
    border: 1px solid #2570ff;
    color: #2570ff;
  }
</style>
