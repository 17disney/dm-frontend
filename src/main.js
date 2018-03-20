import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import store from './store'
import { Message } from 'element-ui'
import * as Utils from './utils'
import router from './common/router'
import * as Filters from './common/filters'
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
