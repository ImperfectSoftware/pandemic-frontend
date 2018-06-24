import menuMixin from '@/mixins/menuMixin'

export default class ActionMenu {
  constructor () {
    this.canDrive = false
    this.canDirectFlight = false
    this.canCharterFlight = false
    this.canShuttleFlight = false
    this.canBuildResearchStation = false
    this.canRemoveResearchStation = false
    this.canDiscoverCure = false
    this.canShareKnowledge = false
    this.cureColor = ''
    this.cityStaticid = ''
    this.cityName = ''
    this.canTreatYellow = false
    this.canTreatBlack = false
    this.canTreatBlue = false
    this.canTreatRed = false
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
    this.canDiscoverCure = payload.can_discover_cure
    this.canBuildResearchStation = payload.can_build_research_station
    this.canRemoveResearchStation = payload.can_remove_research_station
    this.canShuttleFlight = payload.can_shuttle_flight
    this.cureColor = payload.cure_color
    this.canTreatYellow = payload.can_treat_yellow
    this.canTreatBlack = payload.can_treat_black
    this.canTreatBlue = payload.can_treat_blue
    this.canTreatRed = payload.can_treat_red
    this.canShareKnowledge = payload.can_share_knowledge
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

  get removeResearchStationCssClasses () {
    return this.sharedClasses() +
      this.displayClass(this.canRemoveResearchStation)
  }

  get shareKnowledgeCssClasses () {
    return this.sharedClasses() +
      this.displayClass(this.canShareKnowledge)
  }

  get discoverCureCssClasses () {
    return this.sharedClasses() + this.displayClass(this.canDiscoverCure)
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

  sharedClasses = () => {
    return 'btn btn-block btn-secondary shared-btn'
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
    if (this.canDiscoverCure) { return false }
    if (this.canTreatBlue) { return false }
    if (this.canTreatRed) { return false }
    if (this.canTreatYellow) { return false }
    if (this.canTreatBlack) { return false }
    return true
  }
}

Object.assign(ActionMenu.prototype, menuMixin)
