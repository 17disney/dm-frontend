import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import app from './modules/app'
import explorer from './modules/explorer'
import user from './modules/user'
import wait from './modules/wait'
import ticket from './modules/ticket'
import forecast from './modules/forecast'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    explorer,
    user,
    wait,
    ticket,
    forecast
  },
  plugins: [createPersistedState()],
  getters
})

export default store
