import * as MutationTypes from './mutation-types'
import PlayerActionMenu from '@/models/PlayerActionMenu'
import GetPossiblePlayerActionsService from '@/services/GetPossiblePlayerActionsService'

const state = {
  menu: new PlayerActionMenu()
}

const mutations = {
  [MutationTypes.HIDE_PLAYER_ACTION_MENU] (state) {
    if (!state.menu.hide) {
      state.menu.hide = true
    }
  },
  [MutationTypes.SHOW_PLAYER_ACTION_MENU] (state, payload) {
    state.menu.showMenu(payload)
  },
  [MutationTypes.UPDATE_PLAYER_ACTION_MENU] (state, payload) {
    state.menu.updateMenu(payload)
  }
}

const getters = {
  playerActionMenu (state) {
    return state.menu
  }
}

const actions = {
  hidePlayerActionMenu ({ commit }, targetElement) {
    if (targetElement === null || !targetElement.classList.contains('player')) {
      commit(MutationTypes.HIDE_PLAYER_ACTION_MENU)
    }
  },
  showPlayerActionMenu ({ commit }, payload) {
    commit(MutationTypes.SHOW_PLAYER_ACTION_MENU, payload)
    GetPossiblePlayerActionsService.call(payload)
  },
  updatePlayerActionMenu ({ commit }, payload) {
    commit(MutationTypes.UPDATE_PLAYER_ACTION_MENU, payload)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
