export default class PlayerClassesService {
  static for (cityName, position) {
    return new PlayerClassesService(cityName, position).call()
  }

  constructor (cityName, position) {
    this.cityName = cityName
    this.position = position
  }

  call () {
    return 'hide-svg-component'
  }
}
