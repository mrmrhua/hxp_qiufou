import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main.vue'
import designer from '../components/designer.vue'
import faq from '../components/faq.vue'
import aboutus from '../components/aboutus.vue'
import contact from '../components/contact.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      redirect:'/help'
    },
    {
      path: '/help',
      name: 'Main',
      component: Main
    },
    {
      path: "/help/designer",
      name: 'designer',
      component: designer
    },
    {
      path: "/help/faq",
      name: 'faq',
      component: faq
    },
    {
      path: "/help/aboutus",
      name: 'aboutus',
      component: aboutus
    },
    {
      path: "/help/contact",
      name: 'contact',
      component: contact
    },
  ]
})
