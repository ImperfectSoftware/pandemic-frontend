import Invitation from '@/models/Invitation'

describe('Invitation.js', () => {
  let user = { id: 1 }
  let game = { owner_username: 'Mlpinit', name: 'Forg1', id: 2 }
  let data = { game: game , status: 'accepted', user: user, id: 3 }

  it('knows if it is accepted', () => {
    let invitation = Invitation.from(data)
    expect(invitation.isAccepted).to.eq(true)
  })

  it('knows if it is declined', () => {
    data.status = 'declined'
    let invitation = Invitation.from(data)
    expect(invitation.isDeclined).to.eq(true)
  })

  it('knows if it is inactive', () => {
    data.status = 'inactive'
    let invitation = Invitation.from(data)
    expect(invitation.isInactive).to.eq(true)
  })

  it('knows the game name', () => {
    let invitation = Invitation.from(data)
    expect(invitation.gameName).to.eq(game.name)
  })

  it("knows the owner's username", () => {
    let invitation = Invitation.from(data)
    expect(invitation.gameName).to.eq(game.name)
  })

  it("knows the game id", () => {
    let invitation = Invitation.from(data)
    expect(invitation.gameId).to.eq(game.id)
  })

  it("knows the user's id", () => {
    let invitation = Invitation.from(data)
    expect(invitation.userId).to.eq(user.id)
  })

  it("knows the invitation id", () => {
    let invitation = Invitation.from(data)
    expect(invitation.id).to.eq(data.id)
  })

})
