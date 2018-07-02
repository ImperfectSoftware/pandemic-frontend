import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class CureService {
  static call (payload) {
    new CureService(payload).call()
  }

  constructor (payload) {
    this.citiesStaticids = payload.citiesStaticids
    this.game = payload.game
  }

  call () {
    axios.post(`/games/${this.game.id}/cure_diseases`, {
      city_staticids: this.citiesStaticids
    })
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }
}
Object.assign(CureService.prototype, serviceResponseHandler)
