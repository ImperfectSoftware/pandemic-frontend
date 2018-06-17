import axios from '@/backend/vue-axios'
import store from '.././store'

export default class RespondToInviteService {
  static call (payload) {
    new RespondToInviteService(payload).call()
  }

  constructor (payload) {
    this.invitation = payload.invitation
    this.gameId = this.invitation.gameId
    this.value = payload.value
  }

  call () {
    axios.put(`/games/${this.gameId}/invitations.json`, { status: this.value })
      .then(request => this.updateInviteSuccess(request.data))
      .catch(() => this.updateInviteFailed())
  }

  updateInviteSuccess = (data, invitation) => {
    this.invitation.acceptedStatus = data.status
    if (data.status === 'accepted') {
      store.dispatch('unshiftGame', data.game)
    }
  }

  updateInviteFailed = (e) => {
    console.log(e)
  }
}
