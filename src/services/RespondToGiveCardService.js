import axios from '@/backend/vue-axios'

export default class RespondToGiveCardService {
  static call (payload) {
    return new RespondToGiveCardService(payload).call()
  }

  constructor (payload) {
    this.response = payload.response
    this.game = payload.game
    this.id = payload.notification.sharedCardId
  }

  call () {
    axios.put(`/games/${this.game.id}/share_cards/${this.id}`, {
      accepted: this.response
    })
      .then(request => this.respondToGiveCardsSuccess(request.data))
      .catch(e => this.respondToGiveCardsFailed(e))
  }

  respondToGiveCardsSuccess = (data) => {
  }

  respondToGiveCardsFailed = (e) => {
    console.log(e)
  }
}
