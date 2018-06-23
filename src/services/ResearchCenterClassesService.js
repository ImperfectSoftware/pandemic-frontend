export default class ResearchCenterClassesService {
  static for (cityStaticid, game) {
    return new ResearchCenterClassesService(cityStaticid, game).call()
  }

  constructor (cityStaticid, game) {
    this.cityStaticid = cityStaticid
    this.game = game
  }

  call () {
    return 'hide-svg-component'
    // return 'btn scientist'
  }
}
