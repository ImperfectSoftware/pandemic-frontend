import * as MutationTypes from './mutation-types'

const state = {
  error: {
    message: '',
    css: '',
    display: false
  }
}

const mutations = {
  [MutationTypes.UPDATE_ERROR] (state, error) {
    state.error = error
  }
}

const getters = {
  error (state) {
    return state.error
  }
}

const actions = {
  updateError ({ commit }, error) {
    commit(MutationTypes.UPDATE_ERROR, error)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
