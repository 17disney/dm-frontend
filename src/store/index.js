import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import explorer from './modules/explorer'
import user from './modules/user'
import wait from './modules/wait'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    explorer,
    user,
    wait
  },
  getters
})

export default store
