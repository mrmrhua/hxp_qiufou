<template>
  <div style="height: 100%;position:relative;">
    <div class="worktitle">
      xx科技PPT项目设计
    </div>
    <div class="group">
      <span>项目报价</span>
      <input type="text" placeholder="请输入项目报价">
    </div>
    <div class="group">
      <span>工期估计</span>
      <input type="text" placeholder="请输入工期预算">
    </div>
    <div class="group">
      <span>联系电话</span>
      <input type="text" placeholder="请输入联系电话">
    </div>
    <div style="border: none;padding: 0 1rem;">
      <p style="font-size: 1.6rem;line-height: 4rem">设计构想（选填）</p>
      <textarea placeholder="请输入你的大致设计构想"></textarea>
    </div>
    <div id="btn_warp" class="btn_div">
      <div class="btn">提交报价</div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        height: 0,
      }
    },
    mounted(){
      this.height = document.getElementById("app").offsetHeight;
      this.resize();
    },
    methods: {
      resize(){//防止输入时，虚拟键盘将btn顶上去，
        var that = this;
        window.onresize = function () {
          var warp = document.getElementById("btn_warp");
          if (document.getElementById("app").offsetHeight < that.height) {
            warp.style.position = "relative";
            warp.style.marginTop = "0";
          } else {
            warp.style.position = "absolute";
            warp.style.marginTop = "0";
          }
        }
      }
    }

  }
</script>
<style scoped>
  .worktitle {
    font-size: 2.4rem;
    color: #313131;
    text-align: center;
    background: #f5f5f5;
    padding: 1.5rem 0 1rem;
  }

  .group {
    font-size: 1.6rem;
    line-height: 4rem;
    display: flex;
    padding: 0 1rem;
    border-bottom: 1px solid #ddd;
  }

  .group > input {
    font-size: 1.6rem;
    margin-left: 1rem;
    outline: none;
    border: none;
    color: #787878;
    vertical-align: top;
  }

  textarea {
    resize: none;
    width: 100%;
    border-radius: 5px;
    height: 120px;
    padding: 1rem 1rem;
    color: #787878;
    font-size: 1.6rem;
  }

  .btn_div {
    position: absolute;
    height: 8rem;
    background: #f5f5f5;
    width: 100%;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
  }

  .btn {
    margin: 0 auto;
    width: 40%;
    background: linear-gradient(90deg, #d01667, #fe6549);
    height: 3.5rem;
    line-height: 3.5rem;
    border-radius: 25px;
    color: #fff;
    text-align: center;
  }

</style>
