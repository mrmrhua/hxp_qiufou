import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import designer from '@/components/designer'
import faq from '@/components/faq'
import aboutus from '@/components/aboutus'
import contact from '@/components/contact'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: "/designer",
      name: 'designer',
      component: designer
    },
    {
      path: "/faq",
      name: 'faq',
      component: faq
    },
    {
      path: "/aboutus",
      name: 'aboutus',
      component: aboutus
    },
    {
      path: "/contact",
      name: 'contact',
      component: contact
    },
    {
      path: "/*",
      redirect: "/"
    }
  ]
})
