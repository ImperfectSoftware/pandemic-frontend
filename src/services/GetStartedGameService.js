import axios from '@/backend/vue-axios'
import store from '.././store'
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
      .catch((e) => this.updateActiveGamesFailed(e))
  }

  updateActiveGamesSuccess = (game) => {
    if (game.error) {
      // handle server error here
    } else {
      store.dispatch('pushActiveGame', game)
      GameSubscription.from(store.getters.cableConsumer, game).subscribe()
    }
  }

  updateActiveGamesFailed = (e) => {
    console.log(e)
  }
}
