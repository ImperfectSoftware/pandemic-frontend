/* global localStorage */

import ActionCable from 'action-cable-react-jwt'
import * as MutationTypes from './mutation-types'

const WEBSOCKET_HOST = 'ws://localhost:3000/cable'

const state = {
  consumer: ActionCable.createConsumer(WEBSOCKET_HOST, localStorage.token)
}

const mutations = {
  [MutationTypes.CREATE_CONSUMER] (state) {
    state.consumer = ActionCable
      .createConsumer(WEBSOCKET_HOST, localStorage.token)
  },
  [MutationTypes.DELETE_CONSUMER] (state) {
    // TODO: disconnect consumer here
    state.consumer = null
  }
}

const getters = {
  cableConsumer (state) {
    return state.consumer
  }
}

const actions = {
  createConsumer ({ commit }) {
    commit(MutationTypes.CREATE_CONSUMER)
  },

  deleteConsumer ({ commit }) {
    commit(MutationTypes.DELETE_CONSUMER)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
