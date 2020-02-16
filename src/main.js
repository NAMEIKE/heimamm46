import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js';
// 导入仓库
import store from './store/index'
// 导入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局样式
import './style/base.css'
// 注册ElementUI
Vue.use(ElementUI);
// 导入全局过滤器
import '@/filters/index.js'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注入
  router,
  store
}).$mount('#app')
