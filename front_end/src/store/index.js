import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import customer from './modules/customer'
import paper from './modules/paper'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    customer,
    paper,
    user
  },
  getters
})
