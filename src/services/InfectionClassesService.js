export default class InfectionClassesService {
  static for (cityName, position, game) {
    return new InfectionClassesService(cityName, position, game).call()
  }

  constructor (cityStaticid, position, game) {
    this.cityStaticid = cityStaticid
    this.position = position
    this.game = game
  }

  call () {
    if (this.game && this.game.infections) {
      let infections = this.game.infections[this.cityStaticid]
      if (infections && infections[this.position]) {
        return `${infections[this.position]}-infections`
      }
    }
    return 'hide-svg-component'
  }
}
