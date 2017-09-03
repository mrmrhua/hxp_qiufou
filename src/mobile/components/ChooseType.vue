<template>
  <div style="height: 100%;">
    <div class="type_head">
      <p @click="group=true;individua=false;" :class="{active: group}">企业用</p>
      <p @click="individua=true;group=false;" :class="{active: individua}">个人用</p>
    </div>
    <div id="checklists">
      <checklist v-show="group" :options="groupMap"
                 v-model="groupList"></checklist>
      <checklist v-show="individua" :options="individuaMap"
                 v-model="individuaList"></checklist>
    </div>
    <div @click="next()"
         style="color:#fff;text-align:center;font-size:1.6rem;line-height: 5rem;background: #d01667;height: 5rem;position: absolute;bottom: 0;width: 100%">
      下一步
    </div>
  </div>
</template>
<script>
  import {Checklist} from 'vux'

  export default{
    data(){
      return {
        group: true,
        individua: false,
        groupList: [],
        groupMap: ['品牌推广', '企业培训', '企业介绍', '企业宣传', '产品发布', '产品介绍', '项目推广', '项目交流', '商业计划书', '商务演讲', '投资合作', '工作总结', '年会颁奖', '节日庆典', '其他'],
        individuaMap: ["工作汇报", "毕业答辩", "计划总结", "求职简历", "岗位竞聘", "演讲演示", "节日庆典", "其他",],
        individuaList: []
      }
    },
    components: {
      Checklist
    },
    mounted(){

    },
    methods: {
      next(){
        if (this.group) {
          if (this.groupList.length === 0) {
            alert("请选择");
            return;
          }
          console.log(this.groupList);
        } else if (this.individua) {
          if (this.individuaList.length === 0) {
            alert("请选择");
            return;
          }
          console.log(this.individuaList);
        }
      }
    }

  }
</script>
<style scoped>
  .type_head {
    display: flex;
    justify-content: space-around;
    height: 5rem;
    align-items: center;
    box-shadow: 0 1px 5px 0 #d2d2d2;
    padding-bottom: 1rem;
  }

  .type_head > p {
    font-size: 1.6rem;
    padding: 0.5rem 1.5rem;
    height: 3.3rem;
    line-height: 3.1rem;
  }

  .active {
    color: #d01667;
    border-bottom: 2px solid #d01667;
  }

  #checklists {
    position: absolute;
    top: 5.5rem;
    bottom: 5rem;
    width: 100%;
    overflow: auto;
    padding: 0 1.4rem 0 0;
  }
</style>
