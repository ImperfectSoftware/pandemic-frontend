import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import cable from './cable'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    cable
  }
})
