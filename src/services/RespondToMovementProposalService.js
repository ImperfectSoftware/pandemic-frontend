import axios from '@/backend/vue-axios'
import errorHandler from '@/mixins/errorHandler'

export default class RespondToMovementProposalService {
  static call (payload) {
    return new RespondToMovementProposalService(payload).call()
  }

  constructor (payload) {
    this.response = payload.response
    this.game = payload.game
    this.id = payload.notification.movementProposalId
  }

  call () {
    axios.put(`/games/${this.game.id}/movement_proposals/${this.id}`, {
      accepted: this.response
    })
      .then(request => this.respondToMovementProposalSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  respondToMovementProposalSuccess = (data) => {
  }
}
Object.assign(RespondToMovementProposalService.prototype, errorHandler)
