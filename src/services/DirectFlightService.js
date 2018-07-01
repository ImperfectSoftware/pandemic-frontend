import axios from '@/backend/vue-axios'
import errorHandler from '@/mixins/errorHandler'
import store from '@/store'

export default class DirectFlightService {
  static call (payload) {
    new DirectFlightService(payload).call()
  }

  constructor (payload) {
    this.actionMenu = payload.actionMenu
    this.game = payload.game
  }

  call () {
    axios.post(
      `/games/${this.game.id}/direct_flights`, {
        city_staticid: this.actionMenu.cityStaticid
      }
    )
      .then(request => this.directFlightSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  directFlightSuccess = (data) => {
    if (data.error) {
      store.dispatch('showGenericNotification', { message: data.error })
    }
  }
}
Object.assign(DirectFlightService.prototype, errorHandler)
