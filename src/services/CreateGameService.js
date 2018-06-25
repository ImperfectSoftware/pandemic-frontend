import axios from '@/backend/vue-axios'
import store from '.././store'
import errorHandler from '@/mixins/errorHandler'

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
    store.dispatch('updateError', { error: { display: false } })
  }
}
Object.assign(CreateGameService.prototype, errorHandler)
