export default class InfectionClassesService {
  static for (cityName, position) {
    return new InfectionClassesService(cityName, position).call()
  }

  constructor (cityName, position) {
    this.cityName = cityName
    this.position = position
  }

  call () {
    return 'hide-svg-component'
  }
}
