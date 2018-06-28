/* global localStorage */
import store from '@/store'
import axios from '@/backend/vue-axios'
import moxios from 'moxios'
import RespondToInviteService from '@/services/RespondToInviteService'

let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Impvc2lhaEBiYXJ' +
  'yb3dzYmVja2VyLmlvIiwiZXhwIjoxNTI3NjQ0OTIyfQ.RLR155WB7W-24N6dmgcqp6DTIhAjul' +
  'I1recxhpMpCUk'
localStorage.token = token

describe('RespondToInviteService.js', () => {
  let baseUrl = 'http://localhost:3000/'
  let invitation = { acceptedStatus: false, gameId: 7 }
  let data = {
    status: 'accepted',
    game: {
      id: 7,
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
    store.dispatch('signin')
    moxios.stubRequest(`${baseUrl}games/7/invitations`, {
      status: 200,
      response: data
    })
    RespondToInviteService.call({ invitation: invitation, value: true })
    moxios.wait(function () {
      expect(invitation.acceptedStatus).to.eq('accepted')
      done()
    })
  })

  it('handles server connection errror', (done) => {
    store.dispatch('signin')
    moxios.stubRequest(`${baseUrl}games/7/invitations`, { status: 500 })
    RespondToInviteService.call({ invitation: invitation, value: true })
    moxios.wait(function () {
      expect(store.getters.error.display).to.eq(true)
      done()
    })
  })
})
