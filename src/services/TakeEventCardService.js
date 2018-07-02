import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class TakeEventCardService {
  static call (payload) {
    new TakeEventCardService(payload).call()
  }

  constructor (payload) {
    this.game = payload.game
    this.eventStaticid = payload.eventStaticid
  }

  call () {
    axios.post(`/games/${this.game.id}/special_cards`, {
      event_card_staticid: this.eventStaticid
    })
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }
}
Object.assign(TakeEventCardService.prototype, serviceResponseHandler)
