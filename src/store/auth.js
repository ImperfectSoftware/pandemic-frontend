/* global localStorage */

import User from '@/models/User'
import * as MutationTypes from './mutation-types'

const state = {
  user: User.from(localStorage.token)
}

const mutations = {
  [MutationTypes.SIGNIN] (state) {
    state.user = User.from(localStorage.token)
  },
  [MutationTypes.SIGNOUT] (state) {
    state.user = null
    delete localStorage.token
  }
}

const getters = {
  currentUser (state) {
    return state.user
  }
}

const actions = {
  signin ({ commit }) {
    commit(MutationTypes.SIGNIN)
  },

  signout ({ commit }) {
    commit(MutationTypes.SIGNOUT)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
