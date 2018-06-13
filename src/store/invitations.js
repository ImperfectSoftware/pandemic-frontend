import Invitation from '@/models/Invitation'
import * as MutationTypes from './mutation-types'
import axios from '@/backend/vue-axios'
import RespondToInviteService from '@/services/RespondToInviteService'

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
    axios.post(
      `/games/${payload.gameId}/invitations.json`,
      { username: payload.username }
    )
      .then(request => (function (data) {
        if (data.error) {
          dispatch('updateError', {
            message: data.error,
            css: 'alert-warning',
            display: true
          })
        } else {
          dispatch('updateError', { error: { display: false } })
          dispatch('pushPlayer', data)
        }
      }(request.data)))
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
