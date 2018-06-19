export default class PlayerClassesService {
  static for (cityName, position, game) {
    return new PlayerClassesService(cityName, position, game).call()
  }

  constructor (cityName, position, game) {
    this.cityName = cityName
    this.position = position
    this.game = game
  }

  call () {
    if (this.game.players) {
      let player = this.game.players[this.position]
      if (player && player.location === this.cityName) {
        return player.cssClass()
      }
    }
    return 'hide-svg-component'
  }
}
