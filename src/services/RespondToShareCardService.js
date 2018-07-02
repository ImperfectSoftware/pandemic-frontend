import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class RespondToShareCardService {
  static call (payload) {
    return new RespondToShareCardService(payload).call()
  }

  constructor (payload) {
    this.response = payload.response
    this.game = payload.game
    this.id = payload.notification.sharedCardId
  }

  call () {
    axios.put(`/games/${this.game.id}/share_cards/${this.id}`, {
      accepted: this.response
    })
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }
}
Object.assign(RespondToShareCardService.prototype, serviceResponseHandler)
