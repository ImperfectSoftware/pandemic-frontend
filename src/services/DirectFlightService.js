import axios from '@/backend/vue-axios'

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
      .catch(e => this.directFlightFerryFailed(e))
  }

  directFlightSuccess = (data) => {
  }

  directFlightFerryFailed = (e) => {
    console.log(e)
  }
}
