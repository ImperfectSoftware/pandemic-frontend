import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class UseGovernmentGrantService {
  static call (payload) {
    new UseGovernmentGrantService(payload).call()
  }

  constructor (payload) {
    this.game = payload.game
    this.cityStaticid = payload.cityStaticid
  }

  call () {
    axios.post(`/games/${this.game.id}/government_grant`, {
      city_staticid: this.cityStaticid
    })
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }
}
Object.assign(UseGovernmentGrantService.prototype, serviceResponseHandler)
