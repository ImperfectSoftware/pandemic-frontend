import Invitation from '@/models/Invitation'
import * as MutationTypes from './mutation-types'
import RespondToInviteService from '@/services/RespondToInviteService'
import CreateInvitationService from '@/services/CreateInvitationService'

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
  },
  createInvitation ({ dispatch }, payload) {
    CreateInvitationService.call(payload)
  },
  respondToInvite ({ commit }, payload) {
    RespondToInviteService.call(payload)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
