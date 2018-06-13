import * as MutationTypes from './mutation-types'
import store from '.././store'
import axios from '@/backend/vue-axios'
import Game from '@/models/Game'
import Player from '@/models/Player'
import GameSubscription from '@/subscriptions/GameSubscription'
import InvitationSubscription from '@/subscriptions/InvitationSubscription'

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
  [MutationTypes.UPDATE_SELECTED_GAME] (state, game) {
    let selectedGame = state.games.filter(game => game.isSelected)[0]
    if (selectedGame && game) {
      selectedGame.selected = false
    }
    if (game) {
      game.selected = true
    }
  },
  [MutationTypes.PUSH_PLAYER] (state, payload) {
    let game = getters.selectedGame(state)
    game.players.push(Player.from({
      acceptedStatus: payload.acceptedStatus,
      invitation_id: payload.id,
      user_id: payload.user.id,
      username: payload.user.username
    }))
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
  updateSelectedGame ({ commit }, game) {
    commit(MutationTypes.UPDATE_SELECTED_GAME, game)
  },
  pushPlayer ({ commit }, payload) {
    commit(MutationTypes.PUSH_PLAYER, payload)
  },
  setupGamesDashboard ({ dispatch }) {
    dispatch('createConsumer')
    // display invitations
    axios.get('/invitations')
      .then(request => (function (data) {
        data.invitations.forEach((attributes) => {
          dispatch('pushInvitation', attributes)
        })
      }(request.data)))
      .catch((e) => console.log(e))
    // display games
    axios.get('/games.json')
      .then(request => (function (request) {
        request.data.games.forEach((game) => {
          dispatch('pushGame', game)
        })
        dispatch('updateSelectedGame', store.getters.games[0])
      }(request)))
      .catch((e) => console.log(e))
    // subscribe to receive invitations
    InvitationSubscription.from(
      store.getters.cableConsumer,
      store.getters.invitations,
      store.getters.currentUser.id
    ).subscribe()
  },
  createGame ({ dispatch }) {
    axios.post('/games')
      .then(request => (function (data) {
        dispatch('unshiftGame', data.game)
        dispatch('updateError', { error: { display: false } })
      }(request.data)))
      .catch((e) => (function (e) {
        console.log(e)
        dispatch('updateError', {
          message: "We're sorry, something went wrong. Please try again later.",
          css: 'alert-danger',
          display: true
        })
      }(e)))
  },
  startGame ({ commit }, game) {
    StartGameService.call(game)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
