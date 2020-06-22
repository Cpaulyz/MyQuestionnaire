import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/router/permission'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'http://localhost:8999'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import { Message } from 'element-ui'

axios.interceptors.response.use((response) => {
  switch (response.status) {
    case 200:
      return response
    case 404:
      return false
    case 500:
      Message.error('服务器异常')
      return false
    default:
      Message.error(response.data.message)
      return false
  }
})