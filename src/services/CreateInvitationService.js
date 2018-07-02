import axios from '@/backend/vue-axios'
import store from '.././store'
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
      .then(request => this.createInvitationSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  createInvitationSuccess = (data) => {
    if (data.error) {
      store.dispatch('updateError', {
        message: data.error,
        css: 'alert-warning',
        display: true
      })
    } else {
      store.dispatch('updateError', { display: false })
    }
  }
}
Object.assign(CreateInvitationService.prototype, serviceResponseHandler)
