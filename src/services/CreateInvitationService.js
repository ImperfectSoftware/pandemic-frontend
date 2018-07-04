import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class CreateInvitationService {
  static call (payload) {
    new CreateInvitationService(payload).call()
  }

  constructor (payload) {
    this.gameId = payload.gameId
    this.username = payload.username
  }

  call () {
    axios.post(
      `/games/${this.gameId}/invitations.json`,
      { username: this.username }
    )
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }
}
Object.assign(CreateInvitationService.prototype, serviceResponseHandler)
