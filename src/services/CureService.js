import axios from '@/backend/vue-axios'
import errorHandler from '@/mixins/errorHandler'

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
      .then(request => this.cureSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  cureSuccess = (data) => {
    console.log(data)
  }
}
Object.assign(CureService.prototype, errorHandler)
