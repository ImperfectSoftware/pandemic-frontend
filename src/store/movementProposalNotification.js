import * as MutationTypes from './mutation-types'
import MovementProposalNotification from '@/models/MovementProposalNotification'

const state = {
  notification: new MovementProposalNotification()
}

const mutations = {
  [MutationTypes.SHOW_MOVEMENT_PROPOSAL_NOTIFICATION] (state, payload) {
    state.notification.show(payload)
  },
  [MutationTypes.HIDE_MOVEMENT_PROPOSAL_NOTIFICATION] (state) {
    state.notification.hide = true
  }
}

const getters = {
  movementProposalNotification (state) {
    return state.notification
  }
}

const actions = {
  showMovementProposalNotification ({ commit }, payload) {
    commit(MutationTypes.SHOW_MOVEMENT_PROPOSAL_NOTIFICATION, payload)
  },
  hideMovementProposalNotification ({ commit }) {
    commit(MutationTypes.HIDE_MOVEMENT_PROPOSAL_NOTIFICATION)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
