import Vue from 'vue'

import ElementUI from 'element-ui'
import SmartGrid from 'vue-smart-grid'
// import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'
// 引用API文件
import api from '@/api/axios'
var App = require('./App.vue')

Vue.use(ElementUI)
Vue.use(SmartGrid)
sync(store, router) // sync store and router
Vue.config.productionTip = false
// 将API方法绑定到全局
Vue.prototype.$api = api
new Vue({
  components: { App },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
