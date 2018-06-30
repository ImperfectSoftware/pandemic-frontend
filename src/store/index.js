import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import cable from './cable'
import games from './games'
import error from './error'
import actionsMenu from './actionsMenu'
import invitations from './invitations'
import playerActionsMenu from './playerActionsMenu'
import sharedCardNotification from './sharedCardNotification'
import cureMenu from './cureMenu'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    actionsMenu,
    auth,
    cable,
    cureMenu,
    error,
    games,
    invitations,
    playerActionsMenu,
    sharedCardNotification
  }
})
