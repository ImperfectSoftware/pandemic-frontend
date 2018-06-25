import axios from '@/backend/vue-axios'
import store from '.././store'
import errorHandler from '@/mixins/errorHandler'

export default class GetPossibleActionsService {
  static call (payload) {
    new GetPossibleActionsService(payload).call()
  }

  constructor (payload) {
    this.cityStaticid = payload.cityStaticid
    this.game = payload.game
  }

  call () {
    axios.get(
      `/games/${this.game.id}/possible_actions.json`,
      { params: { city_staticid: this.cityStaticid } }
    )
      .then(request => this.displayPossibleActionsSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  displayPossibleActionsSuccess = (data) => {
    store.dispatch('updateActionMenu', data)
  }

  displayPossibleActionsFailed = (e) => {
    console.log(e)
  }
}
Object.assign(GetPossibleActionsService.prototype, errorHandler)
