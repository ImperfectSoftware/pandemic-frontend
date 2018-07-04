import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

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
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }
}
Object.assign(StartGameService.prototype, serviceResponseHandler)
