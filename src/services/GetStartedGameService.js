import axios from '@/backend/vue-axios'
import store from '.././store'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'
import GameSubscription from '@/subscriptions/GameSubscription'

export default class GetStartedGameService {
  static call (gameId) {
    new GetStartedGameService(gameId).call()
  }

  constructor (gameId) {
    this.gameId = gameId
  }

  call () {
    axios.get(`/games/${this.gameId}`)
      .then(request => this.updateActiveGamesSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  updateActiveGamesSuccess = (game) => {
    if (game.error) {
      // handle server error here
    } else {
      store.dispatch('pushActiveGame', game)
      GameSubscription.from(store.getters.cableConsumer, game).subscribe()
    }
  }
}
Object.assign(GetStartedGameService.prototype, serviceResponseHandler)
