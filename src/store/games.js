import store from '.././store'
import GameSubscription from '@/subscriptions/game-subscription'
import Game from '@/models/Game'
import * as MutationTypes from './mutation-types'

const state = {
  games: []
}

const mutations = {
  [MutationTypes.PUSH_GAME] (state, payload) {
    let game = Game.from(payload)
    GameSubscription.from(store.getters.cableConsumer, game).subscribe()
    state.games.push(game)
  },
  [MutationTypes.UNSHIFT_GAME] (state, payload) {
    let selectedGame = state.games.filter(game => game.isSelected)[0]
    state.games.unshift(Game.from(payload))
    GameSubscription.from(store.getters.cableConsumer, state.games[0])
      .subscribe()
    state.games[0].selected = true
    if (selectedGame) {
      selectedGame.selected = false
    }
  },
  [MutationTypes.UPDATE_SELECTED_GAME] (state, gameId) {
    let game = state.games.filter(game => game.id === gameId)[0]
    let selectedGame = state.games.filter(game => game.isSelected)[0]
    if (selectedGame) {
      selectedGame.selected = false
    }
    game.selected = true
  }
}

const getters = {
  games (state) {
    return state.games
  },
  selectedGame (state) {
    return state.games.filter(game => game.isSelected)[0]
  }
}

const actions = {
  pushGame ({ commit }, payload) {
    commit(MutationTypes.PUSH_GAME, payload)
  },
  unshiftGame ({ commit }, payload) {
    commit(MutationTypes.UNSHIFT_GAME, payload)
  },
  updateSelectedGame ({ commit }, gameId) {
    commit(MutationTypes.UPDATE_SELECTED_GAME, gameId)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
