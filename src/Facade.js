import axios from '@/backend/vue-axios'
import store from '@/store'
import GameSubscription from '@/subscriptions/GameSubscription'

export default class Facade {
  get game () {
    return store.getters.activeGame
  }

  get actionMenu () {
    return store.getters.actionMenu
  }

  get playerActionMenu () {
    return store.getters.playerActionMenu
  }

  get forecast () {
    return store.getters.forecast
  }

  get movementProposalNotification () {
    return store.getters.movementProposalNotification
  }

  get sharedCardNotification () {
    return store.getters.sharedCardNotification
  }

  displayGames = () => {
    axios.get('/games')
      .then(request => this.displayGamesSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  displayInvitations = () => {
    axios.get('/invitations')
      .then(request => this.displayInvitationsSuccess(request.data.invitations))
      .catch(e => this.handleError(e))
  }

  respondToSharedCard = (response) => {
    let id = this.sharedCardNotification.sharedCardId
    let params = { accepted: response }
    axios.put(`/games/${this.game.id}/share_cards/${id}`, params)
      .then(request => this.sharedCardNotificationSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  startGame = (gameId, nrOfEpidemicCards) => {
    axios.put(`/games/${gameId}`, { 'nr_of_epidemic_cards': nrOfEpidemicCards })
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  respondToMovementProposal = (response) => {
    let id = this.movementProposalNotification.movementProposalId
    let params = { accepted: response }
    axios.put(`/games/${this.game.id}/movement_proposals/${id}`, params)
      .then(request => this.respondToMovementProposalSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  getStartedGame = (gameId) => {
    axios.get(`/games/${gameId}`)
      .then(request => this.updateActiveGamesSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  getPossiblePlayerActions = () => {
    let params = { params: {
      city_staticid: this.playerActionMenu.cityStaticid,
      player_id: this.playerActionMenu.playerId
    }}
    axios.get(`/games/${this.game.id}/possible_player_actions.json`, params)
      .then(request => this.displayPlayerPossibleActionsSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  getPossibleActions = () => {
    let params = { params: { city_staticid: this.actionMenu.cityStaticid } }
    axios.get(`/games/${this.game.id}/possible_actions.json`, params)
      .then(request => this.displayPossibleActionsSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  respondToInvite = (response, invitation) => {
    axios.put(`/games/${invitation.gameId}/invitations`, { status: response })
      .then(request => this.updateInviteSuccess(request.data, invitation))
      .catch(e => this.handleError(e))
  }

  createGame = () => {
    axios.post('/games')
      .then(request => this.createGameSuccess(request.data))
      .catch((e) => this.handleError(e))
  }

  createInvitation = (gameId, username) => {
    axios.post(`/games/${gameId}/invitations.json`, { username: username })
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
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

  createGameSuccess = (data) => {
    store.dispatch('unshiftGame', data.game)
    store.dispatch('hideGenericNotification')
  }

  updateInviteSuccess = (data, invitation) => {
    invitation.acceptedStatus = data.status
    if (data.status === 'accepted') {
      store.dispatch('unshiftGame', data.game)
    }
  }

  displayPossibleActionsSuccess = (data) => {
    store.dispatch('updateActionMenu', data)
  }

  displayPlayerPossibleActionsSuccess = (data) => {
    store.dispatch('updatePlayerActionMenu', data)
  }

  updateActiveGamesSuccess = (game) => {
    if (game.error) {
      this.handleSuccess(game)
    } else {
      store.dispatch('pushActiveGame', game)
      GameSubscription.from(store.getters.cableConsumer, game).subscribe()
    }
  }

  respondToMovementProposalSuccess = (data) => {
    if (data.error) {
      this.handleSuccess(data)
    } else {
      store.dispatch('hideMovementProposalNotification')
    }
  }

  sharedCardNotificationSuccess = (data) => {
    if (data.error) {
      this.handleSuccess(data)
    } else {
      store.dispatch('hideSharedCardNotification')
    }
  }

  displayGamesSuccess = (data) => {
    data.games.forEach(game => store.dispatch('pushGame', game))
    store.dispatch('updateSelectedGame', store.getters.games[0])
  }

  displayInvitationsSuccess = (invites) => {
    invites.forEach(attributes => store.dispatch('pushInvitation', attributes))
  }
}
