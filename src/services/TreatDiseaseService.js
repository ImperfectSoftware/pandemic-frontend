import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class TreatDiseaseService {
  static call (payload) {
    new TreatDiseaseService(payload).call()
  }

  constructor (payload) {
    this.actionMenu = payload.actionMenu
    this.game = payload.game
    this.color = payload.color
  }

  call () {
    axios.post(`/games/${this.game.id}/treat_diseases`, {
      color: this.color,
      quantity: 1,
      city_staticid: this.actionMenu.cityStaticid
    })
      .then(request => this.treatDiseaseSuccess(request.data))
      .catch(e => this.treatDiseaseFailed(e))
  }

  treatDiseaseSuccess = (data) => {
  }
}
Object.assign(TreatDiseaseService.prototype, serviceResponseHandler)
