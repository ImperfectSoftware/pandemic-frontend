import * as MutationTypes from './mutation-types'
import store from '.././store'
import DashboardGame from '@/models/DashboardGame'
import Game from '@/models/Game'
import GameSubscription from '@/subscriptions/GameSubscription'
import CreateGameService from '@/services/CreateGameService'
import StartGameService from '@/services/StartGameService'
import SetupGameDashboardService from '@/services/SetupGameDashboardService'
import GetStartedGameService from '@/services/GetStartedGameService'

const state = {
  games: [],
  activeGames: []
}

const mutations = {
  [MutationTypes.PUSH_GAME] (state, payload) {
    let game = DashboardGame.from(payload)
    GameSubscription.from(store.getters.cableConsumer, game).subscribe()
    state.games.push(game)
  },
  [MutationTypes.UNSHIFT_GAME] (state, payload) {
    let selectedGame = state.games.filter(game => game.isSelected)[0]
    state.games.unshift(DashboardGame.from(payload))
    GameSubscription.from(store.getters.cableConsumer, state.games[0])
      .subscribe()
    state.games[0].selected = true
    if (selectedGame) {
      selectedGame.selected = false
    }
  },
  [MutationTypes.UPDATE_SELECTED_GAME] (state, game) {
    let selectedGame = state.games.filter(game => game.isSelected)[0]
    if (selectedGame && game) {
      selectedGame.selected = false
    }
    if (game) {
      game.selected = true
    }
  },
  [MutationTypes.PUSH_ACTIVE_GAME] (state, game) {
    state.activeGames.push(Game.from(game))
  },
  [MutationTypes.UPDATE_ACTIVE_GAME] (state, game) {
    state.activeGames = []
    state.activeGames.push(Game.from(game))
  }
}

const getters = {
  games (state) {
    return state.games
  },
  selectedGame (state) {
    return state.games.filter(game => game.isSelected)[0]
  },
  activeGame (state) {
    return state.activeGames[0]
  }
}

const actions = {
  pushGame ({ commit }, payload) {
    commit(MutationTypes.PUSH_GAME, payload)
  },
  unshiftGame ({ commit }, payload) {
    commit(MutationTypes.UNSHIFT_GAME, payload)
  },
  updateSelectedGame ({ commit }, game) {
    commit(MutationTypes.UPDATE_SELECTED_GAME, game)
  },
  setupGamesDashboard ({ dispatch }) {
    SetupGameDashboardService.call()
  },
  createGame ({ dispatch }) {
    CreateGameService.call()
  },
  startGame ({ commit }, payload) {
    StartGameService.call(payload)
  },
  initializeStartedGame ({ commit }, gameId) {
    GetStartedGameService.call(gameId)
  },
  pushActiveGame ({ commit }, game) {
    commit(MutationTypes.PUSH_ACTIVE_GAME, game)
  },
  updateActiveGame ({ commit }, game) {
    commit(MutationTypes.UPDATE_ACTIVE_GAME, game)
    store.dispatch('hideActionMenu', null)
    store.dispatch('hideSharedCardNotification')
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
