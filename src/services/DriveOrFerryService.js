import axios from '@/backend/vue-axios'

export default class DriveOrFerryService {
  static call (payload) {
    new DriveOrFerryService(payload).call()
  }

  constructor (payload) {
    this.actionMenu = payload.actionMenu
    this.game = payload.game
  }

  call () {
    axios.post(
      `/games/${this.game.id}/line_movements`, {
        city_staticid: this.actionMenu.cityStaticid
      }
    )
      .then(request => this.driveOrFerrySuccess(request.data))
      .catch(e => this.driveOrFerryFailed(e))
  }

  driveOrFerrySuccess = (data) => {
  }

  driveOrFerryFailed = (e) => {
    console.log(e)
  }
}
