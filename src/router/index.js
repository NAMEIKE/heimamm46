import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 注册路由
Vue.use(VueRouter)
// 导入进度条组件
import NProgress from 'nprogress';
// 导入进度条样式
import 'nprogress/nprogress.css'
// 导入token的工具函数 获取token
import {getToken,removeToken} from '@/utils/token.js';
// 导入用户信息获取接口
import {info} from '@/api/index.js';
// 按需导入Element-ui的弹框
import { Message } from 'element-ui';

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
    {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      // 嵌套的路由规则
      children: [
        {
          // 地址不需要写/
          // 最终解析的是 /index/chart'
          path: 'chart',
          component: chart
        },
        {
          // 地址不需要写/
          // 最终解析的是 /index/enterprise
          path: 'enterprise',
          component: enterprise
        },
        {
          path: 'question',
          component: question
        },
        {
          path: 'subject',
          component: subject
        },
        {
          path: 'user',
          component: user
        },
      ]
    },
  ]
});

// 导航守卫 beforeEach 进入之前
router.beforeEach((to,form,next) => {
  // 开启进度条
  NProgress.start()
  // 判断访问的页面
  if (to.path != 'login') {
    // 判断token非空
    if (getToken() == undefined) {
      // 为空
      // 这里的this不是vue实例 想要用vue弹框提示需要导入弹框的组件
      Message.warning('登录状态有误,请检查');
      // 返回登录页
      next('/login');
    }else {
      // 不为空
      info().then(res => {
        if (res.data.code === 206) {
          Message.warning('登录状态有误,请检查');
          // 删除token
          removeToken();
          next('/login');
        } else if(res.data.code === 200) {
          // 获取成功,就放走
          next()
        }
      })
    }
  }else {
    // 是登录页
    next();
  }
})
// 导航守卫 afterEach 进入完成之后
router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
// 暴露出去
export default router

