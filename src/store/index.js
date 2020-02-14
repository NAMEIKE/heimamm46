import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    // 用户头像
    usericon:'',
    // 用户名字
    username:'',
  },
  mutations:{
    changeIcon(state,name){
      state.usericon = name
    },
    changeName(state,name){
      state.username = name
    },
  }
})
// 暴露出去
export default store