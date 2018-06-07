import Cookies from 'js-cookie'
import moment from 'moment'
import Vue from 'vue'

const app = {
  state: {
    locale: null,
    today: moment().format('YYYY-MM-DD'),
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },

    SET_LOCALE: (state, locale) => {
      Vue.config.lang = locale
      state.locale = locale
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },

    setLocale: ({ commit }, locale) => {
      commit('SET_LOCALE', locale)
    }
  }
}

export default app
