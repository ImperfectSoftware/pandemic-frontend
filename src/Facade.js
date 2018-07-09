import axios from '@/backend/vue-axios'
import store from '@/store'

export default class Facade {
  constructor (payload) {
    this.game = store.getters.activeGame
  }

  airlift (cityStaticid, playerId) {
    let params = { city_staticid: cityStaticid, player_id: playerId }
    axios.post(`/games/${this.game.id}/airlifts`, params)
      .then(request => this.hidePlayerActionMenuOnSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  proposeMove (cityStaticid, playerId) {
    let params = { city_staticid: cityStaticid, player_id: playerId }
    axios.post(`/games/${this.game.id}/movement_proposals`, params)
      .then(request => this.hidePlayerActionMenuOnSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  receiveCards (cityStaticid, playerId) {
    let params = { city_staticid: cityStaticid, player_id: playerId }
    axios.post(`/games/${this.game.id}/get_cards.json`, params)
      .then(request => this.hidePlayerActionMenuOnSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  giveCity (cityStaticid, playerId) {
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
}
