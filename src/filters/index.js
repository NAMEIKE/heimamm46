import Vue from 'vue'
// 导入moment
import moment from 'moment'
// 注册全局过滤器 处理日期
Vue.filter('formatTime',value => {
  return moment(value).format('YYYY/MM/DD')
})