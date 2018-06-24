// import axios from '@/backend/vue-axios'
// import store from '.././store'

export default class GetPossiblePlayerActionsService {
  static call (payload) {
    new GetPossiblePlayerActionsService(payload).call()
  }

  constructor (payload) {
    this.cityStaticid = payload.cityStaticid
    this.game = payload.game
  }

  call () {
    // make call
  }
}
