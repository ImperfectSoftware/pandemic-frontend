export default class PlayerClassesService {
  static for (cityStaticid, position, game) {
    return new PlayerClassesService(cityStaticid, position, game).call()
  }

  constructor (cityStaticid, position, game) {
    this.cityStaticid = cityStaticid
    this.position = position
    this.game = game
  }

  call () {
    if (this.game && this.game.players) {
      let player = this.game.players[this.position]
      if (player && player.cityStaticid === this.cityStaticid) {
        return `${player.cssClass} btn`
      }
    }
    return 'hide-svg-component'
  }
}
