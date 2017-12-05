import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
//作品详情
const WorkInfo = resolve => require(['./components/WorkInfo.vue'], resolve);
//推荐设计师
const Project = resolve => require(['./components/Project.vue'], resolve);
// 项目详情，报价按钮
const Workdetail = resolve => require(['./components/Workdetail.vue'], resolve);
// 电脑端操作提示页面
const Toast = resolve => require(['./components/Toast.vue'], resolve);
//项目详情，无报价按钮
const projectdetail = resolve => require(['./components/projectdetail.vue'], resolve);
// 404页面
const notfond = resolve => require(['./components/404.vue'], resolve);
//付款
const Receipt = resolve => require(['./components/Receipt.vue'], resolve);
//公对公
const Prompt = resolve => require(['./components/Prompt.vue'], resolve);
//支付成功
const Paysuccess = resolve => require(['./components/Paysuccess.vue'], resolve);
//项目管理 路由嵌套
const DemandMessage = resolve => require(['./components/DemandMessage.vue'], resolve);
//项目管理
const Demand = resolve => require(['./components/Demand.vue'], resolve);
//项目进度
const Schedule = resolve => require(['./components/Schedule.vue'], resolve);
// 个人简历
const WeChat = resolve => require(['./components/WeChat.vue'], resolve);
//圈点批划
const Circle = resolve => require(['./components/Circle.vue'], resolve);


const Annotation = resolve => require(['./components/Annotation.vue'], resolve);

//import Price from './components/Price.vue' // 报价页面
//import replay from "./components/Replay.vue" // 入驻申请

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: notfond
  },
  {
    path: '/detail/:id',
    component: Workdetail,
    meta: {
      title: '项目报价'
    }
  },
  {
    path: '/workproject',
    component: DemandMessage,
    children: [
      {
        path: 'demand',
        component: Demand,
        meta: {
          title: '项目管理'
        }
      },
      {
        path: 'schedule',
        component: Schedule,
        meta: {
          title: '项目进度'
        }
      },
      {
        path: "circle",
        component: Circle,
        meta: {
          title: '项目进度'
        }
      },
      {
        path: "annotation",
        component: Annotation,
        meta: {
          title: '项目进度'
        }

      }
    ]
  },
  {
    path: '/user',
    name: "user",
    component: WeChat,
    meta: {
      title: '个人简历'
    }
  },
  {
    path: "/prompt",
    component: Prompt,
    meta: {
      title: '收款单'
    }
  },
  {
    path: "/receipt",
    component: Receipt,
    meta: {
      title: '收款单'
    }
  },
  {
    path: '/Toast',
    component: Toast,
    meta: {
      title: '项目报价'
    }
  },
  {
    path: "/paysuccess",
    component: Paysuccess,
    meta: {
      title: '收款单'
    }
  },
  {
    path: '/projectdetail/:id',
    name: 'projectdetail',
    component: projectdetail,
    meta: {
      title: '项目详情'
    }
  },
  {
    path: '/project/:id',
    component: Project,
    meta: {
      title: '设计师推荐'
    }
  },
  {
    path: '/album',
    component: WorkInfo,
    meta: {
      title: '作品详情'
    }
  },
  {
    path: "/*",
    redirect: "/"
  }];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "猴小胖设计服务专家";
  }
  next();
})
FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
