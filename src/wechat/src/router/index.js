import Vue from 'vue'
import Router from 'vue-router'

const project = resolve => require(['@/components/Project'], resolve);
const detail = resolve => require(['@/components/Detail'], resolve);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'project',
      component: project
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    },
    {
      path: "/*",
      redirect: "/"
    }
  ],
})

