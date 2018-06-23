import axios from '@/backend/vue-axios'

export default class CharterFlightService {
  static call (payload) {
    new CharterFlightService(payload).call()
  }

  constructor (payload) {
    this.actionMenu = payload.actionMenu
    this.game = payload.game
  }

  call () {
    axios.post(
      `/games/${this.game.id}/charter_flights`, {
        city_staticid: this.actionMenu.cityStaticid
      }
    )
      .then(request => this.charterFlightSuccess(request.data))
      .catch(e => this.charterFlightFerryFailed(e))
  }

  charterFlightSuccess = (data) => {
  }

  charterFlightFerryFailed = (e) => {
    console.log(e)
  }
}
