import axios from '@/backend/vue-axios'
import store from '@/store'

export default class Facade {
  get game () {
    return store.getters.activeGame
  }

  get actionMenu () {
    return store.getters.actionMenu
  }

  get forecast () {
    return store.getters.forecast
  }

  discardInfectionCard = (cityStaticid) => {
    let params = { data: { city_staticid: cityStaticid } }
    axios.delete(`/games/${this.game.id}/resilient_populations`, params)
      .then(request => this.discardSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  arrangeCards = () => {
    let cityStaticids = this.forecast.map(city => city.staticid).reverse()
    let params = { city_staticids: cityStaticids }
    axios.patch(`/games/${this.game.id}/forecasts`, params)
      .then(request => this.forecastUpdateSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  useEvent = (event) => {
    if (event.isQuietNight) {
      axios.post(`/games/${this.game.id}/skip_infections`)
        .then(request => this.handleSuccess(request.data))
        .catch(e => this.handleError(e))
    } else if (event.isForecast) {
      axios.post(`/games/${this.game.id}/forecasts`)
        .then(request => this.handleForecastSuccess(request.data))
        .catch(e => this.handleError(e))
    } else if (event.isResilientPopulation) {
      axios.get(`/games/${this.game.id}/resilient_populations`)
        .then(request => this.getCitiesSuccess(request.data))
        .catch(e => this.handleError(e))
    }
  }

  infect = () => {
    axios.post(`/games/${this.game.id}/infections`)
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  flipCard = () => {
    axios.post(`/games/${this.game.id}/flip_cards`)
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  takeEventCard = (staticid) => {
    let params = { event_card_staticid: staticid }
    axios.post(`/games/${this.game.id}/special_cards`, params)
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  discardCard = (compositeId) => {
    let params = { data: { composite_id: compositeId } }
    axios.delete(`/games/${this.game.id}/discard_cards`, params)
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  cureDisease = (citiesStaticids) => {
    let params = { city_staticids: citiesStaticids }
    axios.post(`/games/${this.game.id}/cure_diseases`, params)
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  driveOrFerry = () => {
    let params = { city_staticid: this.actionMenu.cityStaticid }
    axios.post(`/games/${this.game.id}/line_movements`, params)
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  directFlight = () => {
    let params = { city_staticid: this.actionMenu.cityStaticid }
    axios.post(`/games/${this.game.id}/direct_flights`, params)
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  charterFlight = () => {
    let params = { city_staticid: this.actionMenu.cityStaticid }
    axios.post(`/games/${this.game.id}/charter_flights`, params)
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  shuttleFlight = () => {
    let params = { city_staticid: this.actionMenu.cityStaticid }
    axios.post(`/games/${this.game.id}/shuttle_flights`, params)
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  governmentGrant = () => {
    let params = { city_staticid: this.actionMenu.cityStaticid }
    axios.post(`/games/${this.game.id}/government_grant`, params)
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  buildResearchStation = () => {
    let params = { city_staticid: this.actionMenu.cityStaticid }
    axios.post(`/games/${this.game.id}/research_stations`, params)
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  removeResearchStation = () => {
    let cityId = this.actionMenu.cityStaticid
    axios.delete(`/games/${this.game.id}/research_stations/${cityId}`)
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  treatDisease = (color) => {
    let params = {
      color: color,
      quantity: 1,
      city_staticid: this.actionMenu.cityStaticid
    }
    axios.post(`/games/${this.game.id}/treat_diseases`, params)
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  moveOperationsExpert = (discarded) => {
    let toCityStaticid = this.actionMenu.cityStaticid
    let params = {
      discarded_city_staticid: discarded,
      destination_city_staticid: toCityStaticid
    }
    axios.post(`/games/${this.game.id}/operations_expert_flights`, params)
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  airlift = (cityStaticid, playerId) => {
    let params = { city_staticid: cityStaticid, player_id: playerId }
    axios.post(`/games/${this.game.id}/airlifts`, params)
      .then(request => this.hidePlayerActionMenuOnSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  proposeMove = (cityStaticid, playerId) => {
    let params = { city_staticid: cityStaticid, player_id: playerId }
    axios.post(`/games/${this.game.id}/movement_proposals`, params)
      .then(request => this.hidePlayerActionMenuOnSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  receiveCards = (cityStaticid, playerId) => {
    let params = { city_staticid: cityStaticid, player_id: playerId }
    axios.post(`/games/${this.game.id}/get_cards.json`, params)
      .then(request => this.hidePlayerActionMenuOnSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  giveCity = (cityStaticid, playerId) => {
    let params = { city_staticid: cityStaticid, player_id: playerId }
    axios.post(`/games/${this.game.id}/give_cards.json`, params)
      .then(request => this.hidePlayerActionMenuOnSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  hidePlayerActionMenuOnSuccess = (data) => {
    store.dispatch('hidePlayerActionMenu', null)
  }

  handleError = (e) => {
    store.dispatch('showGenericNotification', {
      message: "We're sorry, something went wrong. Please try again later."
    })
  }

  handleSuccess = (data) => {
    if (data.error) {
      store.dispatch('showGenericNotification', { message: data.error })
    } else {
      store.dispatch('hideGenericNotification')
    }
  }

  handleForecastSuccess = (data) => {
    if (data.error) {
      this.handleSuccess(data)
    } else {
      store.dispatch('updateForecast', data.cities)
    }
  }

  getCitiesSuccess = (data) => {
    if (data.error) {
      this.handleSuccess(data)
    } else {
      store.dispatch('updateResilientPopulationCities', data.cities)
    }
  }

  forecastUpdateSuccess = (data) => {
    if (data.error) {
      this.handleSuccess(data)
    } else {
      store.dispatch('hideForecast')
    }
  }
}
