import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App'
import store from './store'
import router from './common/router'
import Icon from '@/components/Icon'
import { Message } from 'element-ui'
import * as Utils from './utils'
import * as Filters from './common/filters'

import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/disney/index.styl'
import '@/common/icons'
import '@/common/permission'

Vue.use(ElementUI, { locale })
Vue.component('icon', Icon)

Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key])
})

Vue.prototype.Utils = Utils
Vue.prototype.Message = Message
Vue.prototype.Filters = Filters
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
