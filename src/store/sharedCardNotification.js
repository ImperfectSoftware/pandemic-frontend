import * as MutationTypes from './mutation-types'
import SharedCardNotification from '@/models/SharedCardNotification'

const state = {
  card: new SharedCardNotification()
}

const mutations = {
  [MutationTypes.GIVE_SHARED_CARD_NOTIFICATION] (state, payload) {
    state.card.updateGiveNotification(payload)
  },
  [MutationTypes.RECEIVE_SHARED_CARD_NOTIFICATION] (state, payload) {
    state.card.updateReceiveNotification(payload)
  },
  [MutationTypes.HIDE_SHARED_CARD_NOTIFICATION] (state) {
    state.card.hideNotification()
  }
}

const getters = {
  sharedCardNotification (state) {
    return state.card
  }
}

const actions = {
  giveSharedCardNotification ({ commit }, payload) {
    commit(MutationTypes.GIVE_SHARED_CARD_NOTIFICATION, payload)
  },
  receiveSharedCardNotification ({ commit }, payload) {
    commit(MutationTypes.RECEIVE_SHARED_CARD_NOTIFICATION, payload)
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
