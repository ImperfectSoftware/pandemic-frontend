export default class ResearchCenterClassesService {
  static for (cityName) {
    return new ResearchCenterClassesService(cityName).call()
  }

  constructor (cityName) {
    this.cityName = cityName
  }

  call () {
    return 'hide-svg-component'
  }
}
