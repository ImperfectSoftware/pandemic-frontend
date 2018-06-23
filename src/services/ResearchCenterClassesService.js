export default class ResearchCenterClassesService {
  static for (cityStaticid, game) {
    return new ResearchCenterClassesService(cityStaticid, game).call()
  }

  constructor (cityStaticid, game) {
    this.cityStaticid = cityStaticid
    this.game = game
  }

  call () {
    if (this.game && this.game.researchStations) {
      if (this.game.researchStations.indexOf(this.cityStaticid) !== -1) {
        return 'research-station-active'
      }
    }
    return 'hide-svg-component'
  }
}
