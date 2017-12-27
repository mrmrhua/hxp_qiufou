import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/Main'
import xuanjia from '@/components/Xunjia'
import xuanjiaback from '@/components/Xunjia_back'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/detail/:id',
      name: 'xuanjia',
      component: xuanjia,
      beforeEnter: (to, from, next) => {
        window.scrollTo(0, 0);
        next();
      }
    },
    {
      path: '/inquiry/:id',
      name: 'inquiry',
      component: xuanjiaback,
      beforeEnter: (to, from, next) => {
        window.scrollTo(0, 0);
        next();
      }
    },
    {
      path: '/*', redirect: '/'
    }
  ],
})
