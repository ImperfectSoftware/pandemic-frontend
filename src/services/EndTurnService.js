import axios from '@/backend/vue-axios'
import errorHandler from '@/mixins/errorHandler'

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
Object.assign(EndTurnService.prototype, errorHandler)
