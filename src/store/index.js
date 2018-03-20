import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import explorer from './modules/explorer'
import user from './modules/user'
import park from './modules/park'
import count from './modules/count'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    explorer,
    user,
    park,
    count
  },
  getters
})

export default store
