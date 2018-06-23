import axios from '@/backend/vue-axios'

export default class PlaceResearchStationService {
  static call (payload) {
    new PlaceResearchStationService(payload).call()
  }

  constructor (payload) {
    this.actionMenu = payload.actionMenu
    this.game = payload.game
  }

  call () {
    axios.post(`/games/${this.game.id}/research_stations`)
      .then(request => this.placeResearchStationSuccess(request.data))
      .catch(e => this.placeResearchStationFailed(e))
  }

  placeResearchStationSuccess = (data) => {
  }

  placeResearchStationFailed = (e) => {
    console.log(e)
  }
}
