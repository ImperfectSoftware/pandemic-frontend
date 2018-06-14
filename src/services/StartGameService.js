import axios from '@/backend/vue-axios'
import store from '.././store'

export default class StartGameService {
  static call (game) {
    new StartGameService(game).call()
  }

  constructor (game) {
    this.game = game
  }

  call () {
    axios.put(`/games/${this.game.id}`)
      .then(request => this.startingGame(request.data))
      .catch((e) => this.startingGameFailed(e))
  }

  startingGame = (data) => {
    if (data.error) {
      store.dispatch('updateError', {
        message: data.error,
        css: 'alert-danger',
        display: true
      })
    }
    // TODO: add logic to redirect and start game in the game subscriber if the
    // game was started succesfully (3,2,1)
  }

  startingGameFailed = (e) => {
    console.log(e)
  }
}
