export default class ResearchCenterClassesService {
  static for (cityName, game) {
    return new ResearchCenterClassesService(cityName, game).call()
  }

  constructor (cityName, game) {
    this.cityName = cityName
    this.game = game
  }

  call () {
    return 'hide-svg-component'
    // return 'btn scientist'
  }
}
