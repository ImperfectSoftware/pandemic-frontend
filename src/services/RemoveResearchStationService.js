import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

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
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }
}
Object.assign(RemoveResearchStationService.prototype, serviceResponseHandler)
