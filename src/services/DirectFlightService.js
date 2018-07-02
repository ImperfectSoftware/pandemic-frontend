import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class DirectFlightService {
  static call (payload) {
    new DirectFlightService(payload).call()
  }

  constructor (payload) {
    this.actionMenu = payload.actionMenu
    this.game = payload.game
  }

  call () {
    axios.post(`/games/${this.game.id}/direct_flights`, {
      city_staticid: this.actionMenu.cityStaticid
    })
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }
}
Object.assign(DirectFlightService.prototype, serviceResponseHandler)
