import axios from '@/backend/vue-axios'
import store from '@/store'

export default class Facade {
  get game () {
    return store.getters.activeGame
  }

  get actionMenu () {
    return store.getters.actionMenu
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
}
