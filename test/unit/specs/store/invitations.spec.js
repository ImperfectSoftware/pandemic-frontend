import store from '@/store'
import axios from '@/backend/vue-axios'
import moxios from 'moxios'

describe('invitations.js', () => {
  let baseUrl = 'http://localhost:3000/'
  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install(axios)
  })

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall(axios)
  })

  it('should add an invitation', () => {
    store.dispatch('pushInvitation', {
      id: 1,
      user: {
        id: 2
      },
      game: {
        id: 3,
        owner_username: 'John',
        name: 'FrankenWorld'
      },
      status: 'accepted'
    })
    expect(store.getters.invitations[0].isAccepted).to.eq(true)
  })

  context('with successful response', () => {
    it('should create invitation', (done) => {
      let url = `${baseUrl}games/3/invitations.json`
      moxios.stubRequest(url, { status: 200, response: {} })
      store.dispatch('updateError', { display: true })
      store.dispatch('createInvitation', { gameId: 3, username: 'John' })
      moxios.wait(function () {
        expect(store.getters.error.display).to.eq(false)
        done()
      })
    })
  })

  context('with failed response', () => {
    it('should not create invitation', (done) => {
      let url = `${baseUrl}games/3/invitations.json`
      moxios.stubRequest(url, { status: 200, response: { error: true } })
      store.dispatch('createInvitation', { gameId: 3, username: 'John' })
      moxios.wait(function () {
        expect(store.getters.error.display).to.eq(true)
        done()
      })
    })
  })

  it('should respond to invitation', (done) => {
    let url = `${baseUrl}games/1/invitations.json`
    let invitation = { gameId: 1, acceptedStatus: false }
    let payload = { invitation: invitation, value: true }
    moxios.stubRequest(url, { status: 200, response: {
      status: true,
      game: {
        participants: []
      }
    }})
    store.dispatch('respondToInvite', payload)
    moxios.wait(function () {
      expect(invitation.acceptedStatus).to.eq(true)
      done()
    })
  })
})
