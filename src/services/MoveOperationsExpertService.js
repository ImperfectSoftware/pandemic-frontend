import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class MoveOperationsExpertService {
  static call (payload) {
    new MoveOperationsExpertService(payload).call()
  }

  constructor (payload) {
    this.game = payload.game
    this.discarded = payload.discarded
    this.to = payload.to
  }

  call () {
    axios.post(
      `/games/${this.game.id}/operations_expert_flights`, {
        discarded_city_staticid: this.discarded,
        destination_city_staticid: this.to
      }
    )
  }
}
Object.assign(MoveOperationsExpertService.prototype, serviceResponseHandler)
