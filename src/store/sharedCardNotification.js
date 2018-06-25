import * as MutationTypes from './mutation-types'
import store from '@/store'
import SharedCardNotification from '@/models/SharedCardNotification'

const state = {
  card: new SharedCardNotification()
}

const mutations = {
  [MutationTypes.UPDATE_SHARED_CARD_NOTIFICATION] (state, payload) {
    state.card.updateNotification({
      payload: payload,
      currentPlayerUsername: store.getters.currentUser.username
    })
  },
  [MutationTypes.HIDE_SHARED_CARD_NOTIFICATION] (state, payload) {
    state.card.hideNotification()
  }
}

const getters = {
  sharedCardNotification (state) {
    return state.card
  }
}

const actions = {
  updateSharedCardNotification ({ commit }, payload) {
    commit(MutationTypes.UPDATE_SHARED_CARD_NOTIFICATION, payload)
  },
  hideSharedCardNotification ({ commit }) {
    commit(MutationTypes.HIDE_SHARED_CARD_NOTIFICATION)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
