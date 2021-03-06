import * as MutationTypes from './mutation-types'
import ActionMenu from '@/models/ActionMenu'
import Facade from '@/Facade'
import IsPartOfCellService from '@/services/IsPartOfCellService'

const state = {
  menu: new ActionMenu()
}

const mutations = {
  [MutationTypes.HIDE_ACTION_MENU] (state) {
    state.menu.hide = true
  },
  [MutationTypes.SHOW_ACTION_MENU] (state, payload) {
    state.menu.showMenu(payload)
  },
  [MutationTypes.UPDATE_ACTION_MENU] (state, payload) {
    state.menu.updateMenu(payload)
  }
}

const getters = {
  actionMenu (state) {
    return state.menu
  }
}

const actions = {
  hideActionMenu ({ commit }, targetElement) {
    let service = new IsPartOfCellService()
    if (!service.call(targetElement)) {
      commit(MutationTypes.HIDE_ACTION_MENU)
    }
  },
  showActionMenu ({ commit }, payload) {
    commit(MutationTypes.SHOW_ACTION_MENU, payload)
    let facade = new Facade()
    facade.getPossibleActions()
  },
  updateActionMenu ({ commit }, payload) {
    commit(MutationTypes.UPDATE_ACTION_MENU, payload)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
