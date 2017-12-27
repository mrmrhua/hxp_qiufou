import Vue from 'vue'
import Router from 'vue-router'

/*
* 懒加载各个页面
*
* 全局登录功能，在nav组件实现
* 页脚在 footer 组件实现
*
*  imgthumb 组件是上传图片的渲染组件
*
* */
// 创建作品集
const newAlbum = resolve => require(['@/components/Newalbum'], resolve);

// 我的作品集
const project = resolve => require(['@/components/Project'], resolve);

//我的资料
const designer = resolve => require(['@/components/designer'], resolve);
// 消息通知
const Msg = resolve => require(['@/components/Msg'], resolve);
//服务号绑定
const Wxbind = resolve => require(['@/components/Wxbind'], resolve);

// 我的账户 嵌套路由 开始
const AccountManage = resolve => require(['@/components/AccountManage'], resolve);
// 我的账户
const Account = resolve => require(['@/components/Account'], resolve);
// 账户 提现
const Withdraw = resolve => require(['@/components/Withdraw'], resolve);
// 我的账户 嵌套路由 end



// 我的项目 嵌套路由开始
const DemandManage = resolve => require(['@/components/DemandManage'], resolve);
// 我的项目
const Demand = resolve => require(['@/components/Demand'], resolve);
// 我的项目详情
const Demandinfo = resolve => require(['@/components/Demandinfo'], resolve);
// 我的项目 嵌套路由 end

// 实名认证  后台api java
const authentication = resolve => require(['@/components/authentication'], resolve);

Vue.use(Router)
/*
*   路由
* */
export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/project"
    },
    {
      path: "/project",
      name: "project",
      component: project
    },
    {
      path: "/wxbind",
      name: "wxbind",
      component: Wxbind
    },
    {
      path: '/newalbum',
      name: 'newalbum',
      component: newAlbum
    },
    {
      path: '/designer',
      name: 'designer',
      component: designer
    },
    {
      path: "/Msg",
      name: 'Msg',
      component: Msg
    },
    {
      path: "/account",
      component: AccountManage,
      children: [
        {
          path: '/',
          component: Account
        },
        {
          path: 'withdraw',
          component: Withdraw
        },
      ]
    },
    {
      path: "/demand",
      component: DemandManage,
      children: [
        {
          path: '/',
          component: Demand
        },
        {
          path: 'demandinfo',
          component: Demandinfo
        }
      ]
    },
    {
      path:"/authentication",
      name:"authentication",
      component:authentication
    },
    {
      path: '/*',
      redirect: "/"
    }
  ],
})

