//引入vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'



//使用vuex
Vue.use(Vuex);

const actions={} //准备actions用于响应组件的动作
const mutations = {} //用于操作数据
const state ={} //用于存储数据


//创建store
export default new Vuex.store({
    actions,
    mutations,
    state
})