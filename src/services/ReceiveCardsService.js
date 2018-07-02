import axios from '@/backend/vue-axios'
import store from '@/store'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class ReceiveCardsService {
  static call (payload) {
    new ReceiveCardsService(payload).call()
  }

  constructor (payload) {
    this.game = payload.game
    this.playerId = payload.playerId
    this.cityStaticid = payload.cityStaticid
  }

  call () {
    axios.post(
      `/games/${this.game.id}/get_cards.json`, {
        city_staticid: this.cityStaticid,
        player_id: this.playerId
      }
    )
      .then(request => this.receiveCardsSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  receiveCardsSuccess = (data) => {
    store.dispatch('hidePlayerActionMenu', null)
  }
}
Object.assign(ReceiveCardsService.prototype, serviceResponseHandler)
