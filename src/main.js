import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App'
import store from './store'
import router from './common/router'
import Color from './common/color'
import { Message } from 'element-ui'
import * as Utils from './utils'
import * as Filters from './common/filters'
import waitTimes from './common/api/wait-times'

import Icon from '@/components/Icon'
import AttMedia from '@/components/Att/AttMedia'
import AttStatus from '@/components/Att/AttStatus'
import AttWaitTime from '@/components/Att/AttWaitTime'
import AttCountNumber from '@/components/Att/AttCountNumber'
import AttCountDateSelect from '@/components/Att/AttCountDateSelect'
import AttDateSelect from '@/components/Att/AttDateSelect'
import AttListSelect from '@/components/Att/AttListSelect'
import AttList from '@/components/AttList/AttList'

import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/disney/index.styl'
import '@/common/icons'
import '@/common/permission'

Vue.use(ElementUI, { locale })

import DmUI from '@/dm-ui'
Vue.use(DmUI)

Vue.component('Icon', Icon)
Vue.component('AttMedia', AttMedia)
Vue.component('AttWaitTime', AttWaitTime)
Vue.component('AttStatus', AttStatus)
Vue.component('AttCountNumber', AttCountNumber)
Vue.component('AttCountDateSelect', AttCountDateSelect)
Vue.component('AttDateSelect', AttDateSelect)
Vue.component('AttListSelect', AttListSelect)
Vue.component('AttList', AttList)

Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key])
})

Vue.prototype.Color = Color
Vue.prototype.Utils = Utils
Vue.prototype.Message = Message
Vue.prototype.Filters = Filters
Vue.prototype.$Api = {
  waitTimes
}
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
