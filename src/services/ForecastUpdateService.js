import axios from '@/backend/vue-axios'
import store from '@/store'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class ForecastUpdateService {
  static call (payload) {
    new ForecastUpdateService(payload).call()
  }

  constructor (payload) {
    this.game = payload.game
    this.forecast = payload.forecast
  }

  get cityStaticids () {
    return this.forecast.map(city => city.staticid).reverse()
  }

  call () {
    axios.patch(`/games/${this.game.id}/forecasts`, {
      city_staticids: this.cityStaticids
    })
      .then(request => this.forecastUpdateSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  forecastUpdateSuccess = (data) => {
    if (data.error) {
      this.handleSuccess(data)
    } else {
      store.dispatch('hideForecast')
    }
  }
}
Object.assign(ForecastUpdateService.prototype, serviceResponseHandler)
