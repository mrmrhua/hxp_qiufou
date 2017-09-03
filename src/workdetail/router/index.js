import Vue from 'vue'
import Router from 'vue-router'
import project from '@/components/projectinfo'
import workall from '@/components/Workall'
import wechat from "@/components/WeChat"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/album/:id',
      name: 'project',
      component: project,
     /* beforeEnter: (to, from, next) => {
        window.scrollTo(0, 0);
        next();
      }*/
    },
    {
      path: '/',
      name: 'workall',
      component: workall,
    },
    {
      path: '/user/:id',
      name: 'wechat',
      component: wechat,
      /* beforeEnter: (to, from, next) => {
       window.scrollTo(0, 0);
       next();
       }*/
    },
    {path: '/user', redirect: '/'},
    {path: '/album', redirect: '/'},
    {path: '/*', redirect: '/'}
  ]
})
