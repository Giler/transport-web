import Vue from 'vue'

import 'normalize.css'
import '../theme/index.css'
import '@/assets/styles/main.less'
import 'vue-smart-grid/dist/default.css'
import ElementUI from 'element-ui'
import SmartGrid from 'vue-smart-grid'
import 'element-ui/lib/theme-default/index.css'

var App = require('./App.vue')

import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'
import '@/directives'
import '@/filters/' // 注册过滤器

Vue.use(ElementUI);
Vue.use(SmartGrid)
sync(store, router) // sync store and router

new Vue({
  components: { App },
  router,
  store,
  render: h => h(App)
}).$mount('#app')

