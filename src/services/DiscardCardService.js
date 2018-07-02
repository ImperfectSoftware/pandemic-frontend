import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class DiscardCardService {
  static call (payload) {
    new DiscardCardService(payload).call()
  }

  constructor (payload) {
    this.game = payload.game
    this.cityStaticid = payload.cityStaticid
  }

  call () {
    axios.delete(`/games/${this.game.id}/discard_city_cards`, {
      data: {
        city_staticid: this.cityStaticid
      }
    })
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }
}
Object.assign(DiscardCardService.prototype, serviceResponseHandler)
