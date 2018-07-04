import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class DiscardCardService {
  static call (payload) {
    new DiscardCardService(payload).call()
  }

  constructor (payload) {
    this.game = payload.game
    this.compositeId = payload.compositeId
  }

  call () {
    axios.delete(`/games/${this.game.id}/discard_cards`, {
      data: {
        composite_id: this.compositeId
      }
    })
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }
}
Object.assign(DiscardCardService.prototype, serviceResponseHandler)
