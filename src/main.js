/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Main
|
*/

import Vue from 'vue'
import store from './store'
import router from './common/router'
import App from './App'

// UI
import ElementUI from 'element-ui'
import DmUI from 'package/dm-ui'
import AttUI from 'package/att-ui'

Vue.use(ElementUI)
Vue.use(DmUI)
Vue.use(AttUI)

// Tools
import Color from './common/color'
import initFilters from './common/filters/init'
import * as Api from './common/api'

initFilters(Vue)

Vue.prototype.Color = Color
Vue.prototype.$Api = Api

// CSS
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/disney/index.styl'
import '@/common/icons'
import '@/common/permission'

// locale
import initLocale from './utils/locale'
initLocale(Vue)

Vue.config.productionTip = false // 关闭生产提示

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
