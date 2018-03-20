import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import * as Utils from './utils'
import * as Filters from './filters'
import Icon from '@/components/Icon'

import '@/styles/disney/index.styl'
import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.prototype.Utils = Utils
Vue.prototype.Message = Message()
Vue.prototype.Filters = Filters
Vue.component('icon', Icon)

Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key])
})

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
