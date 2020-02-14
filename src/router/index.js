import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 注册路由
Vue.use(VueRouter)
// 导入进度条组件
import NProgress from 'nprogress';
// 导入进度条样式
import 'nprogress/nprogress.css'
// 导入仓库
import store from '@/store/index.js'
// 导入token的工具函数 获取token
import {
  getToken,
  removeToken
} from '@/utils/token.js';
// 导入用户信息获取接口
import {
  info
} from '@/api/index.js';
// 按需导入Element-ui的弹框
import {
  Message
} from 'element-ui';

import login from '../views/login/login.vue'
import index from '../views/index/index.vue';
// 导入嵌套的组件
import chart from '../views/index/chart/chart.vue'
import enterprise from '../views/index/enterprise/enterprise.vue'
import question from '../views/index/question/question.vue'
import subject from '../views/index/subject/subject.vue'
import user from '../views/index/user/user.vue'

// 路由实例化
const router = new VueRouter({
  routes: [
    // 空地址的重定向
    {
      path: '/',
      redirect: login,
      // component: login
    },
    {
      path: '/login',
      component: login,
      meta: {
        title: "登录"
      },
    },
    {
      path: '/index',
      component: index,
      meta: {
        title: "首页"
      },
      // 嵌套的路由规则
      children: [{
          // 地址不需要写/
          // 最终解析的是 /index/chart'
          path: 'chart',
          component: chart,
          meta: {
            title: "数据概览"
          },
        },
        {
          // 地址不需要写/
          // 最终解析的是 /index/enterprise
          path: 'user',
          component: user,
          meta: {
            title: "用户列表"
          },
        },
        {
          path: 'question',
          component: question,
          meta: {
            title: "题库列表"
          },
        },
        {
          path: 'enterprise',
          component: enterprise,
          meta: {
            title: "企业列表"
          },
        },
        {
          path: 'subject',
          component: subject,
          meta: {
            title: "学科列表"
          },
        },
      ]
    },
  ]
});

// 定义 路由白名单 （不需要登录就可以访问的页面）
const whitePaths = ['/login'];

// 导航守卫 beforeEach 进入之前
router.beforeEach((to, form, next) => {
  // 开启进度条
  NProgress.start()
  // 判断访问的页面
  // if (to.path != 'login') {
  // 用路由白名单判断 加 转小写
  if (whitePaths.includes(to.path.toLocaleLowerCase()) != true) {
    // 判断token非空
    if (getToken() == undefined) {
      // 为空
      // 这里的this不是vue实例 想要用vue弹框提示需要导入弹框的组件
      Message.warning('登录状态有误,请检查');
      // 关闭进度条
      NProgress.done()
      // 返回登录页
      next('/login');
    } else {
      // 不为空
      info().then(res => {
        if (res.data.code === 206) {
          Message.warning('登录状态有误,请检查');
          // 删除token
          removeToken();
          // 关闭进度条
          NProgress.done()
          next('/login');
        } else if (res.data.code === 200) {
          // 用户名字
          const username = res.data.data.username;
          // 用户头像
          const userIcon = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
          // 调用仓库的方法
          store.commit('changeIcon',userIcon);
          store.commit('changeName',username);
          // 获取成功,就放走
          next()
        }
      })
    }
  } else {
    // 是登录页
    next();
  }
})
// 导航守卫 afterEach 进入完成之后
router.afterEach( to => {
  // 关闭进度条
  NProgress.done();
  // 修改标题
  window.document.title = to.meta.title;
})
// 暴露出去
export default router