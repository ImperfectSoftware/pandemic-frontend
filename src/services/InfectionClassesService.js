export default class InfectionClassesService {
  static for (cityName, position, game) {
    return new InfectionClassesService(cityName, position, game).call()
  }

  constructor (cityName, position, game) {
    this.cityName = cityName
    this.position = position
    this.game = game
  }

  call () {
    if (this.game && this.game.infections) {
      let infections = this.game.infections[this.cityName]
      if (infections && infections[this.position]) {
        return `${infections[this.position]}-infections btn`
      }
    }
    return 'hide-svg-component'
  }
}
