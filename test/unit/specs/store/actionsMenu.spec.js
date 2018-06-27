import store from '@/store'
import axios from '@/backend/vue-axios'
import moxios from 'moxios'

describe('actionsMenu.js', () => {
  let baseUrl = 'http://localhost:3000/'
  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install(axios)
  })

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall(axios)
  })

  let response = {
    can_drive: true,
    can_charter_flight: true,
    can_direct_flight: true,
    can_discover_cure: true,
    can_build_research_station: true,
    can_remove_research_station: true,
    can_shuttle_flight: true,
    cure_color: true,
    can_treat_yellow: true,
    can_treat_black: true,
    can_treat_blue: true,
    can_treat_red: true
  }
  let payload = {
    game: {
      id: 1
    },
    cityStaticid: 2,
    windowHeight: 600,
    windowWidth: 800,
    pageX: 200,
    pageY: 200
  }

  it('hides the action menu', () => {
    store.dispatch('hideActionMenu', null)
    expect(store.getters.actionMenu.hide).to.eq(true)
  })

  it('shows the action menu for a city', (done) => {
    let url = `${baseUrl}games/1/possible_actions.json?city_staticid=2`
    moxios.stubRequest(url, { status: 200, response: response })
    store.dispatch('showActionMenu', payload)
    moxios.wait(function () {
      expect(store.getters.actionMenu.canDrive).to.eq(true)
      expect(store.getters.actionMenu.hide).to.eq(false)
      done()
    })
  })

  it('show action menu error is handled correctly', (done) => {
    let url = `${baseUrl}games/1/possible_actions.json?city_staticid=2`
    moxios.stubRequest(url, { status: 500 })
    store.dispatch('showActionMenu', payload)
    moxios.wait(function () {
      expect(store.getters.error.display).to.eq(true)
      done()
    })
  })
})
