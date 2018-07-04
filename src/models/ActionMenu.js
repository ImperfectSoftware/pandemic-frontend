import menuMixin from '@/mixins/menuMixin'

export default class ActionMenu {
  constructor () {
    this.canDrive = false
    this.canDirectFlight = false
    this.canCharterFlight = false
    this.canShuttleFlight = false
    this.canBuildResearchStation = false
    this.canRemoveResearchStation = false
    this.canTreatYellow = false
    this.canTreatBlack = false
    this.canTreatBlue = false
    this.canTreatRed = false
    this.displayGovernmentGrantOption = false
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

  updateMenu = (payload) => {
    this.canDrive = payload.can_drive
    this.canCharterFlight = payload.can_charter_flight
    this.canDirectFlight = payload.can_direct_flight
    this.canBuildResearchStation = payload.can_build_research_station
    this.canRemoveResearchStation = payload.can_remove_research_station
    this.canShuttleFlight = payload.can_shuttle_flight
    this.canTreatYellow = payload.can_treat_yellow
    this.canTreatBlack = payload.can_treat_black
    this.canTreatBlue = payload.can_treat_blue
    this.canTreatRed = payload.can_treat_red
    this.displayGovernmentGrantOption = payload.display_government_grant_option
  }

  get style () {
    return this.elementStyle()
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

  get buildResearchStationCssClasses () {
    return this.sharedClasses() +
      this.displayClass(this.canBuildResearchStation)
  }

  get useGovernmentGrantCssClasses () {
    return this.sharedClasses() +
      this.displayClass(this.displayGovernmentGrantOption)
  }

  get removeResearchStationCssClasses () {
    return this.sharedClasses() +
      this.displayClass(this.canRemoveResearchStation)
  }

  get treatBlueDiseaseCssClass () {
    return this.sharedClasses() +
      this.sharedDiseaseCssClass() +
      this.displayClass(this.canTreatBlue)
  }

  get treatRedDiseaseCssClass () {
    return this.sharedClasses() +
      this.sharedDiseaseCssClass() +
      this.displayClass(this.canTreatRed)
  }

  get treatYellowDiseaseCssClass () {
    return this.sharedClasses() +
      this.sharedDiseaseCssClass() +
      this.displayClass(this.canTreatYellow)
  }

  get treatBlackDiseaseCssClass () {
    return this.sharedClasses() +
      this.sharedDiseaseCssClass() +
      this.displayClass(this.canTreatBlack)
  }

  sharedDiseaseCssClass = () => {
    return ' disease-button'
  }

  displayClass = (value) => {
    return value ? '' : ' d-none'
  }

  canTakeNoActions = () => {
    if (this.canDrive) { return false }
    if (this.canDirectFlight) { return false }
    if (this.canCharterFlight) { return false }
    if (this.canShuttleFlight) { return false }
    if (this.canBuildResearchStation) { return false }
    if (this.canRemoveResearchStation) { return false }
    if (this.canTreatBlue) { return false }
    if (this.canTreatRed) { return false }
    if (this.canTreatYellow) { return false }
    if (this.canTreatBlack) { return false }
    return true
  }
}

Object.assign(ActionMenu.prototype, menuMixin)
