import axios from '@/backend/vue-axios'
import store from '@/store'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class AirliftMoveService {
  static call (payload) {
    new AirliftMoveService(payload).call()
  }

  constructor (payload) {
    this.game = payload.game
    this.playerId = payload.playerId
    this.cityStaticid = payload.cityStaticid
  }

  call () {
    axios.post(
      `/games/${this.game.id}/airlifts`, {
        city_staticid: this.cityStaticid,
        player_id: this.playerId
      }
    )
      .then(request => this.airliftMoveSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  airliftMoveSuccess = (data) => {
    store.dispatch('hidePlayerActionMenu', null)
  }
}
Object.assign(AirliftMoveService.prototype, serviceResponseHandler)
