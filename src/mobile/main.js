import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import WorkInfo from './components/WorkInfo.vue'
import WeChat from './components/WeChat.vue'
import Project from './components/Project.vue'
import PPT from './components/PPT.vue'
import ChooseType from './components/ChooseType.vue'

Vue.use(VueRouter);

const routes = [{
  path: '/',
  component: PPT
},
  {
    path: '/album',
    component: WorkInfo
  },
  {
    path: "/ChooseType",
    component: ChooseType
  },
  {
    path: '/user',
    component: WeChat
  }, {
    path: "/*",
    redirect: "/"
  }];

const router = new VueRouter({
  routes
});

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
