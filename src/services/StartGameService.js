import axios from '@/backend/vue-axios'

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
    // TODO: add logic to redirect and start game
  }

  startingGameFailed = (e) => {
    console.log(e)
  }
}
