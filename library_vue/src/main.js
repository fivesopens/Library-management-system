import Vue from 'vue'
import App from './App.vue'

//引入store
// import store from './store'

//引入elementUi
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入路由器
import router from './router'


Vue.config.productionTip = false

// 格式化时间
import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs

new Vue({
  el:'#app',
  render: h => h(App),
  // store,
  router,

  beforeCreate(){
    Vue.prototype.$bus = this //安装全局事件总线
  }

}).$mount('#app')
