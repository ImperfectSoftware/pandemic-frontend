import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class EndTurnService {
  static call (payload) {
    new EndTurnService(payload).call()
  }

  constructor (payload) {
    this.game = payload.game
  }

  call () {
    axios.post(`/games/${this.game.id}/finish_turns`)
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }
}
Object.assign(EndTurnService.prototype, serviceResponseHandler)
