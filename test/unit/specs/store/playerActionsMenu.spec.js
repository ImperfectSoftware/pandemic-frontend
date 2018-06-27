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

  it('hides the player action menu', () => {
    store.dispatch('hidePlayerActionMenu', null)
    expect(store.getters.playerActionMenu.hide).to.eq(true)
  })

  context('when not clicking on a player', () => {
    it('hides the player action menu', () => {
      let targetElement = { classList: { contains: function (name) {
        return false
      }}}
      store.dispatch('hidePlayerActionMenu', targetElement)
      expect(store.getters.playerActionMenu.hide).to.eq(true)
    })
  })

  it('shows the player action menu', (done) => {
    let receiveCities = [ 'Miami' ]
    let giveCities = [ 'Chicago' ]
    let params = 'city_staticid=2&player_id=3'
    let url = `${baseUrl}games/1/possible_player_actions.json?${params}`
    moxios.stubRequest(url, { status: 200, response: {
      receive_cities: receiveCities,
      give_cities: giveCities
    }})
    store.dispatch('showPlayerActionMenu', {
      game: {
        id: 1,
        players: [
          {
            id: 3,
            username: 'John'
          }
        ]
      },
      position: 0,
      cityStaticid: 2,
      windowHeight: 600,
      windowWidth: 800,
      pageX: 0,
      pageY: 0
    })
    moxios.wait(function () {
      expect(store.getters.playerActionMenu.receiveCities).to.eq(receiveCities)
      expect(store.getters.playerActionMenu.giveCities).to.eq(giveCities)
      expect(store.getters.playerActionMenu.hide).to.eq(false)
      done()
    })
  })
})
