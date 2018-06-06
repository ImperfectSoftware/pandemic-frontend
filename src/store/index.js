import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import cable from './cable'
import games from './games'
import invitations from './invitations'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    cable,
    games,
    invitations
  }
})
