import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class DriveOrFerryService {
  static call (payload) {
    new DriveOrFerryService(payload).call()
  }

  constructor (payload) {
    this.actionMenu = payload.actionMenu
    this.game = payload.game
  }

  call () {
    axios.post(
      `/games/${this.game.id}/line_movements`, {
        city_staticid: this.actionMenu.cityStaticid
      }
    )
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }
}
Object.assign(DriveOrFerryService.prototype, serviceResponseHandler)
