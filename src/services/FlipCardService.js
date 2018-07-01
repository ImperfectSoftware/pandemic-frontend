import axios from '@/backend/vue-axios'
import errorHandler from '@/mixins/errorHandler'

export default class FlipCardService {
  static call (payload) {
    new FlipCardService(payload).call()
  }

  constructor (payload) {
    this.game = payload.game
  }

  call () {
    axios.post(`/games/${this.game.id}/finish_turns`)
      .then(request => this.flipCardSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  flipCardSuccess = (data) => {
    console.log(data)
  }
}
Object.assign(FlipCardService.prototype, errorHandler)
