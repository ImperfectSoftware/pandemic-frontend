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
    return 'hide-svg-component'
    // return 'btn blue-infections'
  }
}
