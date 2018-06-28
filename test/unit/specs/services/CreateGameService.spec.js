/* global localStorage */
import store from '@/store'
import axios from '@/backend/vue-axios'
import moxios from 'moxios'
import CreateGameService from '@/services/CreateGameService'

let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Impvc2lhaEBiYXJ' +
  'yb3dzYmVja2VyLmlvIiwiZXhwIjoxNTI3NjQ0OTIyfQ.RLR155WB7W-24N6dmgcqp6DTIhAjul' +
  'I1recxhpMpCUk'
localStorage.token = token

describe('CreateGameService.js', () => {
  let baseUrl = 'http://localhost:3000/'
  let data = {
    status: 'accepted',
    game: {
      id: 8,
      owner_id: 1,
      participants: [
        { status: 'accepted', invitation_id: 1, user_id: 1, username: 'one' },
        { status: 'accepted', invitation_id: 2, user_id: 2, username: 'two' }
      ],
      started: false
    }
  }

  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install(axios)
  })

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall(axios)
  })

  it('accepts a game invite', (done) => {
    moxios.stubRequest(`${baseUrl}games`, {
      status: 200,
      response: data
    })
    let gamesCount = store.getters.games.length
    store.dispatch('createGame')
    moxios.wait(function () {
      expect(store.getters.games.length - gamesCount).to.eq(1)
      done()
    })
  })

  it('handles server error gracefully', (done) => {
    // store.dispatch('signin')
    moxios.stubRequest(`${baseUrl}games`, { status: 500 })
    store.dispatch('createGame')
    moxios.wait(function () {
      expect(store.getters.error.display).to.eq(true)
      done()
    })
  })
})
