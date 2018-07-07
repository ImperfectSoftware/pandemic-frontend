import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import cable from './cable'
import games from './games'
import actionsMenu from './actionsMenu'
import invitations from './invitations'
import playerActionsMenu from './playerActionsMenu'
import sharedCardNotification from './sharedCardNotification'
import cureMenu from './cureMenu'
import genericNotification from './genericNotification'
import movementProposalNotification from './movementProposalNotification'
import forecast from './forecast'
import resilientPopulationCards from './resilientPopulationCards'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    actionsMenu,
    auth,
    cable,
    cureMenu,
    games,
    genericNotification,
    invitations,
    movementProposalNotification,
    playerActionsMenu,
    sharedCardNotification,
    forecast,
    resilientPopulationCards
  }
})
