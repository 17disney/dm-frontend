import Card from './Card'
import Content from './Content'
import Header from './Header'
import Main from './Main'
import SelectDate from './SelectDate'

function install(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true
  const components = [Card, Content, Header, Main, SelectDate]
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
