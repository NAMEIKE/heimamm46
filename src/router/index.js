import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 注册路由
Vue.use(VueRouter)
import login from '../views/login/login.vue'
import index from '../views/index/index.vue';
// 路由实例化
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index
    },
  ]
});
// 暴露出去
export default router

