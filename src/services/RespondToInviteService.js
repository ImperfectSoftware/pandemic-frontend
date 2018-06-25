import axios from '@/backend/vue-axios'
import errorHandler from '@/mixins/errorHandler'
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
      .catch(e => this.handleError(e))
  }

  updateInviteSuccess = (data, invitation) => {
    this.invitation.acceptedStatus = data.status
    if (data.status === 'accepted') {
      store.dispatch('unshiftGame', data.game)
    }
  }
}
Object.assign(RespondToInviteService.prototype, errorHandler)
