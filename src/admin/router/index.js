import Vue from 'vue'
import Router from 'vue-router'

const main = resolve => require(['@/components/Main'], resolve);
const newAlbum = resolve => require(['@/components/Newalbum'], resolve);
const project = resolve => require(['@/components/Project'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'admin',
      component: main
    },
    {
      path: '/newalbum',
      name: 'newalbum',
      component: newAlbum
    },
    {
      path: '/project',
      name: 'project',
      component: project
    }
  ],
})

