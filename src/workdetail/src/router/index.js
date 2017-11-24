import Vue from 'vue'
import Router from 'vue-router'
const project = resolve => require(['@/components/projectinfo'], resolve);
const workall = resolve => require(['@/components/Workall'], resolve);
const wechat = resolve => require(['@/components/WeChat'], resolve);
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'workall',
      component: workall,
    },
    {
      path: '/album/:id',
      name: 'project',
      component: project,
    },
    {
      path: '/user/:id',
      name: 'wechat',
      component: wechat,
    },
    {path: '/*', redirect: '/'}
  ]
})
