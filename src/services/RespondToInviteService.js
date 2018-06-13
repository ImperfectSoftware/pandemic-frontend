import axios from '@/backend/vue-axios'
import store from '.././store'

export default class RespondToInviteService {
  static call (payload) {
    new RespondToInviteService(payload).call(payload)
  }

  call = (payload) => {
    let invitation = payload.invitation
    let gameId = invitation.gameId
    axios.put(`/games/${gameId}/invitations.json`, { status: payload.value })
      .then(request => this.updateInviteSuccess(request.data, invitation))
      .catch(() => this.updateInviteFailed())
  }

  updateInviteSuccess = (data, invitation) => {
    invitation.setAcceptedStatus(data.status)
    if (data.status === 'accepted') {
      store.dispatch('unshiftGame', data.game)
    }
  }

  updateInviteFailed = (e) => {
    console.log(e)
  }
}
