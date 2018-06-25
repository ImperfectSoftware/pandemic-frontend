import axios from '@/backend/vue-axios'
import store from '@/store'
import errorHandler from '@/mixins/errorHandler'

export default class GiveCardsService {
  static call (payload) {
    new GiveCardsService(payload).call()
  }

  constructor (payload) {
    this.game = payload.game
    this.playerId = payload.playerId
    this.cityStaticid = payload.cityStaticid
  }

  call () {
    axios.post(
      `/games/${this.game.id}/give_cards.json`, {
        city_staticid: this.cityStaticid,
        player_id: this.playerId
      }
    )
      .then(request => this.giveCardsSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  giveCardsSuccess = (data) => {
    store.dispatch('hidePlayerActionMenu', null)
  }
}
Object.assign(GiveCardsService.prototype, errorHandler)
