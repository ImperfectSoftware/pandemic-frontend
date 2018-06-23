import axios from '@/backend/vue-axios'

export default class RemoveResearchStationService {
  static call (payload) {
    new RemoveResearchStationService(payload).call()
  }

  constructor (payload) {
    this.actionMenu = payload.actionMenu
    this.cityId = payload.actionMenu.cityStaticid
    this.game = payload.game
  }

  call () {
    axios.delete(`/games/${this.game.id}/research_stations/${this.cityId}`)
      .then(request => this.buildResearchStationSuccess(request.data))
      .catch(e => this.buildResearchStationFailed(e))
  }

  buildResearchStationSuccess = (data) => {
  }

  buildResearchStationFailed = (e) => {
    console.log(e)
  }
}