import Invitation from '@/models/Invitation'
import * as MutationTypes from './mutation-types'

const state = {
  invitations: []
}

const mutations = {
  [MutationTypes.PUSH_INVITATION] (state, payload) {
    state.invitations.push(Invitation.from(payload))
  }
}

const getters = {
  invitations (state) {
    return state.invitations
  }
}

const actions = {
  pushInvitation ({ commit }, payload) {
    commit(MutationTypes.PUSH_INVITATION, payload)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
