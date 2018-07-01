import * as MutationTypes from './mutation-types'
import GenericNotification from '@/models/GenericNotification'

const state = {
  notification: new GenericNotification()
}

const mutations = {
  [MutationTypes.SHOW_GENERIC_NOTIFICATION] (state, payload) {
    state.notification.message = payload.message
    state.notification.hide = false
  },
  [MutationTypes.HIDE_GENERIC_NOTIFICATION] (state) {
    state.notification.hide = true
  }
}

const getters = {
  genericNotification (state) {
    return state.notification
  }
}

const actions = {
  showGenericNotification ({ commit }, payload) {
    commit(MutationTypes.SHOW_GENERIC_NOTIFICATION, payload)
  },
  hideGenericNotification ({ commit }) {
    commit(MutationTypes.HIDE_GENERIC_NOTIFICATION)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
