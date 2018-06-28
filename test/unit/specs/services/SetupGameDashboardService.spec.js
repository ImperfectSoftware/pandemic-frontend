/* global localStorage */
let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Impvc2lhaEBiYXJ' +
  'yb3dzYmVja2VyLmlvIiwiZXhwIjoxNTI3NjQ0OTIyfQ.RLR155WB7W-24N6dmgcqp6DTIhAjul' +
  'I1recxhpMpCUk'
localStorage.token = token

import store from '@/store'
import axios from '@/backend/vue-axios'
import moxios from 'moxios'
import SetupGameDashboardService from '@/services/SetupGameDashboardService'

describe('SetupGameDashboardService.js', () => {
  let baseUrl = 'http://localhost:3000/'
  let gamesData = { games: [
    {
      id: 7,
      owner_id: 1,
      participants: [
        { status: 'accepted', invitation_id: 1, user_id: 1, username: 'one' },
        { status: 'accepted', invitation_id: 2, user_id: 2, username: 'two' }
      ],
      started: false
    },
    {
      id: 6,
      owner_id: 2,
      participants: [
        { status: 'accepted', invitation_id: 1, user_id: 1, username: 'one' },
        { status: 'accepted', invitation_id: 2, user_id: 2, username: 'two' }
      ],
      started: false
    }
  ]}
  let invitationsData = { invitations: [
    {
      id: 1,
      user: { id: 2 },
      game: { id: 3, owner_username: 'John', name: 'FrankenWorld' },
      status: 'accepted'
    }
  ]}

  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install(axios)
  })

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall(axios)
  })

  it('adds new games to the games list', (done) => {
    store.dispatch('signin')
    moxios.stubRequest(`${baseUrl}games`, { status: 200, response: gamesData })
    moxios.stubRequest(`${baseUrl}invitations`, {
      status: 200,
      response: invitationsData
    })
    SetupGameDashboardService.call()
    moxios.wait(function () {
      expect(store.getters.games[1].id).to.eq(6)
      expect(store.getters.selectedGame.id).to.eq(7)
      expect(store.getters.invitations[0].id).to.eq(1)
      done()
    })
  })


  it('handles bad server connection', (done) => {
    store.dispatch('signin')
    moxios.stubRequest(`${baseUrl}games`, { status: 500 })
    moxios.stubRequest(`${baseUrl}invitations`, { status: 200 })
    SetupGameDashboardService.call()
    moxios.wait(function () {
      expect(store.getters.error.display).to.eq(true)
      done()
    })
  })
})
