import Game from '@/models/Game'
import * as MutationTypes from './mutation-types'

const state = {
  games: []
}

const mutations = {
  [MutationTypes.PUSH_GAME] (state, payload) {
    state.games.push(Game.from(payload))
  },
  [MutationTypes.UNSHIFT_GAME] (state, payload) {
    console.log(payload)
    state.games.unshift(Game.from(payload))
  }
}

const getters = {
  games (state) {
    return state.games
  }
}

const actions = {
  pushGame ({ commit }, payload) {
    commit(MutationTypes.PUSH_GAME, payload)
  },
  unshiftGame ({ commit }, payload) {
    commit(MutationTypes.UNSHIFT_GAME, payload)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
