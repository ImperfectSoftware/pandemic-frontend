import DashboardPlayer from '@/models/DashboardPlayer'

describe('DashboardPlayer.js', () => {
  let data = { invitation_id: 1, user_id: 2, username: 'joker' }

  it('defaults player status to inactive', () => {
    let player = DashboardPlayer.from(data)
    expect(player.isPending).to.eq(true)
  })

  it('knows the invitation was accepted', () => {
    data.acceptedStatus = 'accepted'
    let player = DashboardPlayer.from(data)
    expect(player.isReady).to.eq(true)
  })

  it('knows the invitation was declined', () => {
    data.acceptedStatus = 'declined'
    let player = DashboardPlayer.from(data)
    expect(player.isDeclined).to.eq(true)
  })

  it('defaults player id to empty string if not passed in', () => {
    let player = DashboardPlayer.from(data)
    expect(player.id).to.eq('')
  })

  it('sets invitation id', () => {
    let player = DashboardPlayer.from(data)
    expect(player.invitationId).to.eq(data.invitation_id)
  })

  it('sets user id', () => {
    let player = DashboardPlayer.from(data)
    expect(player.userId).to.eq(data.user_id)
  })

  it('sets username', () => {
    let player = DashboardPlayer.from(data)
    expect(player.username).to.eq(data.username)
  })

  it('sets player id', () => {
    data.id = 4
    let player = DashboardPlayer.from(data)
    expect(player.id).to.eq(data.id)
  })
})
