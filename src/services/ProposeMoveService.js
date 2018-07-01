import axios from '@/backend/vue-axios'
import store from '@/store'
import errorHandler from '@/mixins/errorHandler'

export default class ProposeMoveService {
  static call (payload) {
    new ProposeMoveService(payload).call()
  }

  constructor (payload) {
    this.game = payload.game
    this.playerId = payload.playerId
    this.cityStaticid = payload.cityStaticid
  }

  call () {
    axios.post(
      `/games/${this.game.id}/movement_proposals`, {
        city_staticid: this.cityStaticid,
        player_id: this.playerId,
        airlift: false
      }
    )
      .then(request => this.proposeMoveSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  proposeMoveSuccess = (data) => {
    store.dispatch('hidePlayerActionMenu', null)
  }
}
Object.assign(ProposeMoveService.prototype, errorHandler)
