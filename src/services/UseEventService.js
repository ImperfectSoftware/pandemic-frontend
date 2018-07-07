import axios from '@/backend/vue-axios'
import store from '@/store'
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
    if (this.event.isQuietNight) {
      axios.post(`/games/${this.game.id}/skip_infections`)
        .then(request => this.handleSuccess(request.data))
        .catch(e => this.handleError(e))
    } else if (this.event.isForecast) {
      axios.post(`/games/${this.game.id}/forecasts`)
        .then(request => this.handleForecastSuccess(request.data))
        .catch(e => this.handleError(e))
    }
  }

  handleForecastSuccess = (data) => {
    if (data.error) {
      this.handleSuccess(data)
    } else {
      store.dispatch('updateForecast', data.cities)
    }
  }
}
Object.assign(UseEventService.prototype, serviceResponseHandler)
