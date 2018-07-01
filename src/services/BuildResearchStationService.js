import axios from '@/backend/vue-axios'
import errorHandler from '@/mixins/errorHandler'

export default class BuildResearchStationService {
  static call (payload) {
    new BuildResearchStationService(payload).call()
  }

  constructor (payload) {
    this.actionMenu = payload.actionMenu
    this.game = payload.game
    this.cityStaticid = payload.cityStaticid
  }

  call () {
    axios.post(`/games/${this.game.id}/research_stations`, {
      city_staticid: this.cityStaticid
    })
      .then(request => this.buildResearchStationSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  buildResearchStationSuccess = (data) => {
    console.log(data)
  }
}
Object.assign(BuildResearchStationService.prototype, errorHandler)
