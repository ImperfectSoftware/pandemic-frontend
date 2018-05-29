/* global localStorage */
import auth from '@/store/auth'
import store from '@/store'
import User from '@/models/User'

let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Impvc2lhaEBiYXJ' +
  'yb3dzYmVja2VyLmlvIiwiZXhwIjoxNTI3NjQ0OTIyfQ.RLR155WB7W-24N6dmgcqp6DTIhAjul' +
  'I1recxhpMpCUk'
localStorage.token = token

describe('auth.js', () => {
  it('should have a getter for currentUser', () => {
    let user = User.from(token)
    let state = {user: user}
    expect(auth.getters.currentUser(state).id).to.eq(user.id)
  })

  it('signs in', () => {
    store.dispatch('signin') // <=
    expect(auth.state.user.id).to.eq(1)
  })

  it('signs out', () => {
    store.dispatch('signout') // <=
    expect(auth.state.user).to.eq(null)
  })
})
