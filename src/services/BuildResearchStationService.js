import axios from '@/backend/vue-axios'

export default class BuildResearchStationService {
  static call (payload) {
    new BuildResearchStationService(payload).call()
  }

  constructor (payload) {
    this.actionMenu = payload.actionMenu
    this.game = payload.game
  }

  call () {
    axios.post(`/games/${this.game.id}/research_stations`)
      .then(request => this.buildResearchStationSuccess(request.data))
      .catch(e => this.buildResearchStationFailed(e))
  }

  buildResearchStationSuccess = (data) => {
  }

  buildResearchStationFailed = (e) => {
    console.log(e)
  }
}
