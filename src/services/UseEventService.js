import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class UseEventService {
  static call (payload) {
    new UseEventService(payload).call()
  }

  constructor (payload) {
    this.game = payload.game
    this.event = payload.event
  }

  call () {
    console.log(this.event)
    if (this.event.isQuietNight) {
      axios.post(`/games/${this.game.id}/skip_infections`)
        .then(request => this.handleSuccess(request.data))
        .catch(e => this.handleError(e))
    }
  }
}
Object.assign(UseEventService.prototype, serviceResponseHandler)
