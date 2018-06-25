import axios from '@/backend/vue-axios'
import store from '.././store'
import errorHandler from '@/mixins/errorHandler'

export default class StartGameService {
  static call (game) {
    new StartGameService(game).call()
  }

  constructor (payload) {
    this.game = payload.game
    this.nrOfEpidemicCards = payload.nrOfEpidemicCards
  }

  call () {
    axios.put(`/games/${this.game.id}`, {
      'nr_of_epidemic_cards': this.nrOfEpidemicCards
    })
      .then(request => this.startingGame(request.data))
      .catch(e => this.handleError(e))
  }

  startingGame = (data) => {
    if (data.error) {
      store.dispatch('updateError', {
        message: data.error,
        css: 'alert-danger',
        display: true
      })
    }
  }
}
Object.assign(StartGameService.prototype, errorHandler)
