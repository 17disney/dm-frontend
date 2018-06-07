import * as Filters from './index'

export default function init(Vue) {
  Object.keys(Filters).forEach(key => {
    Vue.filter(key, Filters[key])
  })
}
