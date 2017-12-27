import Vue from 'vue'
import Router from 'vue-router'

const DesignerInfo = resolve => require(['@/components/DesignerInfo'], resolve);
const Worklist = resolve => require(['@/components/Worklist'], resolve);
const Msg = resolve => require(['@/components/Msg'], resolve);
const Index = resolve => require(['@/components/Index'], resolve);
const Workinfo = resolve => require(['@/components/Workinfo'], resolve);
const Main = resolve => require(['@/components/Main'], resolve);
const Msginfo = resolve => require(['@/components/Msginfo'], resolve);
const Alert = resolve => require(['@/components/Alert'], resolve);
const Balance = resolve => require(['@/components/Balance'], resolve);
const Account = resolve => require(['@/components/Account'], resolve);
const Withdraw = resolve => require(['@/components/Withdraw'], resolve);
const Withdrawinfo = resolve => require(['@/components/Withdrawinfo'], resolve);
const Balanceinfo = resolve => require(['@/components/Balanceinfo'], resolve);
const Accountedit = resolve => require(['@/components/Accountedit'], resolve);
const Feedback = resolve => require(['@/components/feedback'], resolve);
const Project = resolve => require(['@/components/project/Project'], resolve);
const Schedule = resolve => require(['@/components/project/Schedule'], resolve);
const Collect = resolve => require(['@/components/project/Collect'], resolve);


/*
 * 路由各个界面
 * 请看下面的title 设置
 * */

Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      meta: {
        title: '猴小胖设计服务专家'
      }
    },
    {
      path: "/feedback",
      name: "feedback",
      component: Feedback,
      meta: {
        title: '意见反馈'
      }
    },
    {
      path: "/project",
      name: "project",
      component: Project,
      meta: {
        title: '项目管理'
      }
    },
    {
      path: "/schedule",
      name: "schedule",
      component: Schedule,
      meta: {
        title: '项目详情'
      }
    },
    {
      path: "/collect",
      name: "collect",
      component: Collect,
      meta: {
        title: '收款申请'
      }
    },
    {
      path: "/main",
      name: "main",
      component: Main,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: "/balance",
      name: "balance",
      component: Balance,
      meta: {
        title: '账户余额'
      }
    },
    {
      path: "/balanceinfo",
      name: "balanceinfo",
      component: Balanceinfo,
      meta: {
        title: '余额明细'
      }
    },
    {
      path: "/account",
      name: "account",
      component: Account,
      meta: {
        title: '账户管理'
      }
    },
    {
      path: "/accountedit",
      name: "accountedit",
      component: Accountedit,
      meta: {
        title: '账户管理'
      }
    },
    {
      path: "/withdraw",
      name: "withdraw",
      component: Withdraw,
      meta: {
        title: '余额提现'
      }
    },
    {
      path: "/withdrawinfo",
      name: "withdrawinfo",
      component: Withdrawinfo,
      meta: {
        title: '余额提现'
      }
    },
    /*{
     path: '/replay',
     name: 'replay',
     component: Replay
     }, */
    {
      path: "/designerInfo",
      name: "designerInfo",
      component: DesignerInfo,
      meta: {
        title: '我的资料'
      }
    },
    {
      path: '/worklist',
      name: 'worklist',
      component: Worklist,
      meta: {
        title: '我的作品'
      }
    },
    {
      path: '/msg',
      name: 'msg',
      component: Msg,
      meta: {
        title: '我的消息'
      }
    },
    {
      path: '/msginfo/:idx',
      name: 'msginfo',
      component: Msginfo,
      meta: {
        title: '我的消息'
      }
    },
    {
      path: '/workinfo/:id',
      name: 'workinfo',
      component: Workinfo,
      meta: {
        title: '我的作品'
      }
    },
    {
      path: "/alert",
      name: "alert",
      component: Alert,
      meta: {
        title: '猴小胖设计服务专家'
      }
    },
    {
      path: "/*",
      redirect: "/"
    }
  ]
})


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) { // 如果路由中设置了title
    document.title = to.meta.title;
  } else { //否则
    document.title = "猴小胖设计服务专家";
  }
  next();
})

export default router
