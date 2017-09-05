import Vue from 'vue'
import Router from 'vue-router'

const newAlbum = resolve => require(['@/components/Newalbum'], resolve);
const project = resolve => require(['@/components/Project'], resolve);
const designer = resolve => require(['@/components/designer'], resolve);
const Msg = resolve => require(['@/components/Msg'], resolve);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'project',
      component: project
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
    }
  ],
})

