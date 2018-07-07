import axios from '@/backend/vue-axios'
import store from '@/store'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class DiscardInfectionService {
  static call (payload) {
    new DiscardInfectionService(payload).call()
  }

  constructor (payload) {
    this.game = payload.game
    this.cityStaticid = payload.cityStaticid
  }

  call () {
    axios.delete(`/games/${this.game.id}/resilient_populations`, {
      data: {
        city_staticid: this.cityStaticid
      }
    })
      .then(request => this.discardSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  discardSuccess = (data) => {
    if (data.error) {
      this.handleSuccess(data)
    } else {
      store.dispatch('hideResilientPopulationCities')
    }
  }
}
Object.assign(DiscardInfectionService.prototype, serviceResponseHandler)
