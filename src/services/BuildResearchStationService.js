import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

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
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }
}
Object.assign(BuildResearchStationService.prototype, serviceResponseHandler)
