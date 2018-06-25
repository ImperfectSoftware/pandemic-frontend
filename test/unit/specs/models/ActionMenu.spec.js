import ActionMenu from '@/models/ActionMenu'

describe('ActionMenu.js', () => {
  it('initializes with default values', () => {
    let menu = new ActionMenu()
    expect(menu.canDrive).to.eq(false)
    expect(menu.canDirectFlight).to.eq(false)
    expect(menu.canCharterFlight).to.eq(false)
    expect(menu.canShuttleFlight).to.eq(false)
    expect(menu.canTreatYellow).to.eq(false)
    expect(menu.canTreatBlack).to.eq(false)
    expect(menu.canTreatBlue).to.eq(false)
    expect(menu.canTreatRed).to.eq(false)
    expect(menu.canBuildResearchStation).to.eq(false)
    expect(menu.canRemoveResearchStation).to.eq(false)
    expect(menu.canDiscoverCure).to.eq(false)
    expect(menu.cureColor).to.eq('')
    expect(menu.cityStaticid).to.eq('')
    expect(menu.cityName).to.eq('')
    expect(menu.hide).to.eq(true)
    expect(menu.height).to.eq(310)
    expect(menu.width).to.eq(200)
    expect(menu.x).to.eq(0)
    expect(menu.y).to.eq(0)
  })

  it('displays menu correctly', () => {
    let data = {
      cityStaticid: 1,
      windowHeight: 600,
      windowWidth: 800,
      pageX: 200,
      pageY: 200,
    }
    let menu = new ActionMenu()
    menu.showMenu(data)
    expect(menu.hide).to.eq(false)
    expect(menu.cityStaticid).to.eq(data.cityStaticid)
    expect(menu.x).to.eq(200)
    expect(menu.y).to.eq(200)
  })

  it('displays menu on the left if no space on the right', () => {
    let data = {
      cityStaticid: 1,
      windowHeight: 600,
      windowWidth: 800,
      pageX: 700,
      pageY: 200,
    }
    let menu = new ActionMenu()
    menu.showMenu(data)
    expect(menu.x).to.eq(500)
    expect(menu.y).to.eq(200)
  })

  it('displays menu towards the top if no space left on the bottom', () => {
    let data = {
      cityStaticid: 1,
      windowHeight: 600,
      windowWidth: 800,
      pageX: 700,
      pageY: 500,
    }
    let menu = new ActionMenu()
    menu.showMenu(data)
    expect(menu.x).to.eq(500)
    expect(menu.y).to.eq(190)
  })

  it('sets the element style', () => {
    let menu = new ActionMenu()
    expect(menu.style.top).to.eq('0px')
    expect(menu.style.left).to.eq('0px')
    expect(menu.style.width).to.eq('200px')
    expect(menu.style.height).to.eq('310px')
  })

  it('updates possible acctions correctly', () => {
    let data = {
      can_drive: true,
      can_charter_flight: true,
      can_direct_flight: true,
      can_discover_cure: true,
      can_build_research_station: true,
      can_remove_research_station: true,
      can_shuttle_flight: true,
      cure_color: 'yellow',
      can_treat_yellow: true,
      can_treat_black: true,
      can_treat_blue: true,
      can_treat_red: true,
    }
    let menu = new ActionMenu()
    menu.updateMenu(data)
    expect(menu.canDrive).to.eq(true)
    expect(menu.canDirectFlight).to.eq(true)
    expect(menu.canCharterFlight).to.eq(true)
    expect(menu.canShuttleFlight).to.eq(true)
    expect(menu.canTreatYellow).to.eq(true)
    expect(menu.canTreatBlack).to.eq(true)
    expect(menu.canTreatBlue).to.eq(true)
    expect(menu.canTreatRed).to.eq(true)
    expect(menu.canBuildResearchStation).to.eq(true)
    expect(menu.canRemoveResearchStation).to.eq(true)
    expect(menu.canDiscoverCure).to.eq(true)
    expect(menu.cureColor).to.eq('yellow')
  })

  it('knows if it should display no actions text', () => {
    let menu = new ActionMenu()
    expect(menu.noActionsClasses).to.eq('body-card')
  })

  it('should not display no actions text if player can Drive', () => {
    let menu = new ActionMenu()
    menu.updateMenu({ can_drive: true })
    expect(menu.noActionsClasses).to.eq('d-none')
  })

  it('should not display no actions text if player can C Flight', () => {
    let menu = new ActionMenu()
    menu.updateMenu({ can_charter_flight: true })
    expect(menu.noActionsClasses).to.eq('d-none')
  })

  it('should not display no actions text if player can D Flight', () => {
    let menu = new ActionMenu()
    menu.updateMenu({ can_direct_flight: true })
    expect(menu.noActionsClasses).to.eq('d-none')
  })

  it('should not display no actions text if player can discover cure', () => {
    let menu = new ActionMenu()
    menu.updateMenu({ can_discover_cure: true })
    expect(menu.noActionsClasses).to.eq('d-none')
  })

  it('should not display no actions text if player can build STA', () => {
    let menu = new ActionMenu()
    menu.updateMenu({ can_build_research_station: true })
    expect(menu.noActionsClasses).to.eq('d-none')
  })

  it('should not display no actions text if player can remove STA', () => {
    let menu = new ActionMenu()
    menu.updateMenu({ can_remove_research_station: true })
    expect(menu.noActionsClasses).to.eq('d-none')
  })

  it('should not display no actions text if player can S Flight', () => {
    let menu = new ActionMenu()
    menu.updateMenu({ can_shuttle_flight: true })
    expect(menu.noActionsClasses).to.eq('d-none')
  })

  it('should not display no actions text if player treat yellow', () => {
    let menu = new ActionMenu()
    menu.updateMenu({ can_treat_yellow: true })
    expect(menu.noActionsClasses).to.eq('d-none')
  })

  it('should not display no actions text if player treat black', () => {
    let menu = new ActionMenu()
    menu.updateMenu({ can_treat_black: true })
    expect(menu.noActionsClasses).to.eq('d-none')
  })

  it('should not display no actions text if player treat blue', () => {
    let menu = new ActionMenu()
    menu.updateMenu({ can_treat_blue: true })
    expect(menu.noActionsClasses).to.eq('d-none')
  })

  it('should not display no actions text if player treat red', () => {
    let menu = new ActionMenu()
    menu.updateMenu({ can_treat_red: true })
    expect(menu.noActionsClasses).to.eq('d-none')
  })

  it('displays correct css classes', () => {
    let menu = new ActionMenu()
    expect(menu.driveCssClasses).to
      .eq('btn btn-block btn-secondary shared-btn d-none')
    expect(menu.directFlightCssClasses).to
      .eq('btn btn-block btn-secondary shared-btn d-none')
    expect(menu.charterFlightCssClasses).to
      .eq('btn btn-block btn-secondary shared-btn d-none')
    expect(menu.shuttleFlightCssClasses).to
      .eq('btn btn-block btn-secondary shared-btn d-none')
    expect(menu.buildResearchStationCssClasses).to
      .eq('btn btn-block btn-secondary shared-btn d-none')
    expect(menu.removeResearchStationCssClasses).to
      .eq('btn btn-block btn-secondary shared-btn d-none')
    expect(menu.discoverCureCssClasses).to
      .eq('btn btn-block btn-secondary shared-btn d-none')
    expect(menu.treatBlueDiseaseCssClass).to
      .eq('btn btn-block btn-secondary shared-btn disease-button d-none')
    expect(menu.treatRedDiseaseCssClass).to
      .eq('btn btn-block btn-secondary shared-btn disease-button d-none')
    expect(menu.treatYellowDiseaseCssClass).to
      .eq('btn btn-block btn-secondary shared-btn disease-button d-none')
    expect(menu.treatBlackDiseaseCssClass).to
      .eq('btn btn-block btn-secondary shared-btn disease-button d-none')
  })

  it('shows treat red disease css class', () => {
    let menu = new ActionMenu()
    menu.updateMenu({ can_treat_red: true })
    expect(menu.treatRedDiseaseCssClass).to
      .eq('btn btn-block btn-secondary shared-btn disease-button')
  })
})
