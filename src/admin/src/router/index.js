import Vue from 'vue'
import Router from 'vue-router'

const newAlbum = resolve => require(['@/components/Newalbum'], resolve);
const project = resolve => require(['@/components/Project'], resolve);
const designer = resolve => require(['@/components/designer'], resolve);
const Msg = resolve => require(['@/components/Msg'], resolve);
const Wxbind = resolve => require(['@/components/Wxbind'], resolve);
const AccountManage = resolve => require(['@/components/AccountManage'], resolve);
const Account = resolve => require(['@/components/Account'], resolve);
const Withdraw = resolve => require(['@/components/Withdraw'], resolve);
const Demand = resolve => require(['@/components/Demand'], resolve);
const Demandinfo = resolve => require(['@/components/Demandinfo'], resolve);
const DemandManage = resolve => require(['@/components/DemandManage'], resolve);
const authentication = resolve => require(['@/components/authentication'], resolve);

Vue.use(Router)

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

