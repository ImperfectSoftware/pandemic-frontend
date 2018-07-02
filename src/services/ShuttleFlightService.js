import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class ShuttleFlightService {
  static call (payload) {
    new ShuttleFlightService(payload).call()
  }

  constructor (payload) {
    this.actionMenu = payload.actionMenu
    this.game = payload.game
  }

  call () {
    axios.post(
      `/games/${this.game.id}/shuttle_flights`, {
        city_staticid: this.actionMenu.cityStaticid
      }
    )
      .then(request => this.shuttleFlightSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  shuttleFlightSuccess = (data) => {
  }

  shuttleFlightFerryFailed = (e) => {
    console.log(e)
  }
}
Object.assign(ShuttleFlightService.prototype, serviceResponseHandler)
