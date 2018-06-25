import axios from '@/backend/vue-axios'
import errorHandler from '@/mixins/errorHandler'

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
      .catch(e => this.handleError(e))
  }

  buildResearchStationSuccess = (data) => {
  }
}
Object.assign(BuildResearchStationService.prototype, errorHandler)
