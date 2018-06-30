import * as MutationTypes from './mutation-types'
import CureMenu from '@/models/CureMenu'

const state = {
  cureMenu: new CureMenu()
}

const mutations = {
  [MutationTypes.HIDE_CURE_MENU] (state) {
    state.cureMenu.hide = true
  },
  [MutationTypes.SHOW_CURE_MENU] (state, payload) {
    state.cureMenu.showMenu(payload)
  }
}

const getters = {
  cureMenu (state) {
    return state.cureMenu
  }
}

const actions = {
  showCureMenu ({ commit }, payload) {
    if (payload.currentPlayer.id === payload.activePlayer.id) {
      commit(MutationTypes.SHOW_CURE_MENU, payload)
    }
  },
  hideCureMenu ({ commit }, targetElement) {
    if (targetElement === null || !targetElement.classList.contains('fa')) {
      commit(MutationTypes.HIDE_CURE_MENU)
    }
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
