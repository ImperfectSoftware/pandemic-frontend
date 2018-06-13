import axios from '@/backend/vue-axios'
import store from '.././store'

export default class CreateGameService {
  static call () {
    new CreateGameService().call()
  }

  call () {
    axios.post('/games')
      .then(request => this.createGameSuccess(request.data))
      .catch((e) => this.createGameFailed(e))
  }

  createGameSuccess = (data) => {
    store.dispatch('unshiftGame', data.game)
    store.dispatch('updateError', { error: { display: false } })
  }

  createGameFailed = (e) => {
    console.log(e)
    store.dispatch('updateError', {
      message: "We're sorry, something went wrong. Please try again later.",
      css: 'alert-danger',
      display: true
    })
  }
}
