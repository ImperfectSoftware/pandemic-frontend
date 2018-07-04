import axios from '@/backend/vue-axios'
import store from '.././store'
import serviceResponseHandler from '@/mixins/serviceResponseHandler'

export default class CreateGameService {
  static call () {
    new CreateGameService().call()
  }

  call () {
    axios.post('/games')
      .then(request => this.createGameSuccess(request.data))
      .catch((e) => this.handleError(e))
  }

  createGameSuccess = (data) => {
    store.dispatch('unshiftGame', data.game)
    store.dispatch('hideGenericNotification')
  }
}
Object.assign(CreateGameService.prototype, serviceResponseHandler)
