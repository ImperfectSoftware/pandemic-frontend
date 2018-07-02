import axios from '@/backend/vue-axios'
import store from '.././store'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class GetPossiblePlayerActionsService {
  static call (payload) {
    new GetPossiblePlayerActionsService(payload).call()
  }

  constructor (payload) {
    this.cityStaticid = payload.cityStaticid
    this.game = payload.game
    this.position = payload.position
  }

  call () {
    axios.get(
      `/games/${this.game.id}/possible_player_actions.json`, {
        params: {
          city_staticid: this.cityStaticid,
          player_id: this.game.players[this.position].id
        }
      }
    )
      .then(request => this.displayPlayerPossibleActionsSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  displayPlayerPossibleActionsSuccess = (data) => {
    store.dispatch('updatePlayerActionMenu', data)
  }
}
Object.assign(GetPossiblePlayerActionsService.prototype, serviceResponseHandler)
