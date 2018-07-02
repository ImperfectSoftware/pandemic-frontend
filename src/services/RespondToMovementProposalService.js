import axios from '@/backend/vue-axios'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class RespondToMovementProposalService {
  static call (payload) {
    return new RespondToMovementProposalService(payload).call()
  }

  constructor (payload) {
    this.response = payload.response
    this.game = payload.game
    this.id = payload.notification.movementProposalId
    this.airlift = payload.airlift
  }

  call () {
    axios.put(`/games/${this.game.id}/movement_proposals/${this.id}`, {
      accepted: this.response,
      airlift: this.airlift
    })
      .then(request => this.handleSuccess(request.data))
      .catch(e => this.handleError(e))
  }
}
Object.assign(RespondToMovementProposalService.prototype, serviceResponseHandler)
