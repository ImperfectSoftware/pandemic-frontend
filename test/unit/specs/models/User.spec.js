import User from '@/models/User'

describe('User.js', () => {
  it('should not construct a user with bad token', () => {
    expect(User.from('bad token')).to.eq(null)
  })

  it('should set an id on a user', () => {
    let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1Mjc2NDE3N' +
      'DE3NzF9.TK-847noztAUelTSoeMSITnbOz5usv7-EJ-3rUmIERk'
    let user = User.from(token)
    expect(user.id).to.equal(1)
  })


})
