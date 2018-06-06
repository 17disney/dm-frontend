import Icon from './Icon'

function install(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true
  const components = [Icon]
  components.forEach(Component => {
    Component.install(Vue)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default {
  install
}
