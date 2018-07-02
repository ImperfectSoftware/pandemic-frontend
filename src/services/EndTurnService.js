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
      .then(request => this.endTurnSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  endTurnSuccess = (data) => {
    console.log(data)
  }
}
Object.assign(EndTurnService.prototype, serviceResponseHandler)
