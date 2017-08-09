import Vue from 'vue'
import Router from 'vue-router'
import From1 from '@/components/From1'
import From2 from '@/components/From2'
import From3 from '@/components/From3'
import From4 from '@/components/From4'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'From1',
      component: From1
    },
    {
      path: '/from2',
      name: 'From2',
      component: From2
    },
    {
      path: '/from3',
      name: 'From3',
      component: From3
    },
    {
      path: '/from4',
      name: 'From4',
      component: From4
    }
  ]
})
