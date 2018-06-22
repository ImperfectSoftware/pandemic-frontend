export default class ActionMenu {
  constructor () {
    this.canDrive = false
    this.canDirectFlight = false
    this.canCharterFlight = false
    this.canShuttleFlight = false
    this.canPlaceResearchStation = false
    this.canRemoveResearchStation = false
    this.canDiscoverCure = false
    this.cityStaticid = ''
    this.cityName = ''
    this.hide = true
    this.height = 310
    this.width = 200
    this.x = 0
    this.y = 0
  }

  showMenu = (payload) => {
    this.hide = false
    this.cityStaticid = payload.cityStaticid
    this.windowHeight = payload.windowHeight
    this.windowWidth = payload.windowWidth
    this.x = this.calculateX(payload.windowWidth, payload.pageX)
    this.y = this.calculateY(payload.windowHeight, payload.pageY)
  }

  get style () {
    return {
      top: this.y + 'px',
      left: this.x + 'px',
      'width': this.width + 'px',
      'height': this.height + 'px'
    }
  }

  get noActionsClasses () {
    if (this.canTakeNoActions()) {
      return 'body-card'
    } else {
      return 'd-none'
    }
  }

  get driveCssClasses () {
    return this.sharedClasses() + this.displayClass(this.canDrive)
  }

  get directFlightCssClasses () {
    return this.sharedClasses() + this.displayClass(this.canDirectFlight)
  }

  get charterFlightCssClasses () {
    return this.sharedClasses() + this.displayClass(this.canCharterFlight)
  }

  get shuttleFlightCssClasses () {
    return this.sharedClasses() + this.displayClass(this.canShuttleFlight)
  }

  get placeResearchStationCssClasses () {
    return this.sharedClasses() +
      this.displayClass(this.canPlaceResearchStation)
  }

  get removeResearchStationCssClasses () {
    return this.sharedClasses() +
      this.displayClass(this.canRemoveResearchStation)
  }

  get discoverCureCssClasses () {
    return this.sharedClasses() + this.displayClass(this.canDiscoverCure)
  }

  calculateX (windowWidth, pageX) {
    if (pageX + this.width > windowWidth) {
      return pageX - this.width
    } else {
      return pageX
    }
  }

  calculateY (windowHeight, pageY) {
    let doesNotFitBelow = pageY + this.height > windowHeight
    let itFitsAbove = pageY - this.height >= 0
    if (doesNotFitBelow && itFitsAbove) {
      return pageY - this.height
    } else {
      return pageY
    }
  }

  sharedClasses = () => {
    return 'btn btn-block btn-secondary'
  }

  displayClass = (value) => {
    return value ? '' : ' d-none'
  }

  canTakeNoActions = () => {
    if (this.canDrive) { return false }
    if (this.canDirectFlight) { return false }
    if (this.canCharterFlight) { return false }
    if (this.canShuttleFlight) { return false }
    if (this.canPlaceResearchStation) { return false }
    if (this.canRemoveResearchStation) { return false }
    if (this.canDiscoverCure) { return false }
    return true
  }
}
