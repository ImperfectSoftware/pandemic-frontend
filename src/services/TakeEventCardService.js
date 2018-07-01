import axios from '@/backend/vue-axios'
import store from '@/store'
import errorHandler from '@/mixins/errorHandler'

export default class TakeEventCardService {
  static call (payload) {
    new TakeEventCardService(payload).call()
  }

  constructor (payload) {
    this.game = payload.game
    this.eventStaticid = payload.eventStaticid
  }

  call () {
    axios.post(
      `/games/${this.game.id}/special_cards`, {
        event_card_staticid: this.eventStaticid
      }
    )
      .then(request => this.takeEventCardSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  takeEventCardSuccess = (data) => {
    if (data.error) {
      store.dispatch('showGenericNotification', { message: data.error })
    }
  }

  shuttleFlightFerryFailed = (e) => {
    console.log(e)
  }
}
Object.assign(TakeEventCardService.prototype, errorHandler)
