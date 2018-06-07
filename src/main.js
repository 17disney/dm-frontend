import Vue from 'vue'
import store from './store'
import router from './common/router'
import VueI18n from 'vue-i18n'
import App from './App'

// UI
import ElementUI from 'element-ui'
import DmUI from '@/dm-ui'
import AttUI from '@/att-ui'

// Language
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

// Tools
import Color from './common/color'
import initFilters from './common/filters/init'
import * as Api from './common/api'

import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/disney/index.styl'
import '@/common/icons'
import '@/common/permission'

Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(DmUI)
Vue.use(AttUI)

Vue.locale('en', enLocale)
Vue.locale('zh-cn', zhLocale)

initFilters(Vue)

Vue.prototype.Color = Color
Vue.prototype.$Api = Api

Vue.config.productionTip = false // 关闭生产提示

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
