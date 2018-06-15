import Game from '@/models/Game'

describe('Game.js', () => {
  let playerOne = { status: 'accepted', invitation_id: 1, user_id: 1 }
  let playerTwo = { status: 'accepted', invitation_id: 2, user_id: 2 }
  let data = {
    owner_id: 1,
    participants: [ playerOne, playerTwo ],
    started: true
  }

  it('should initialize a game with selected set to false', () => {
    let game = Game.from(data)
    expect(game.isSelected).to.eq(false)
  })

  it('should set selected to true', () => {
    let game = Game.from(data)
    game.selected = true
    expect(game.isSelected).to.eq(true)
  })

  it('should know that game can be started by current user', () => {
    let user = { id: 1 }
    let game = Game.from(data)
    expect(game.canBeStartedBy(user)).to.eq(true)
  })

  it('should know that game cannot be started by current user', () => {
    let user = { id: 2 }
    let game = Game.from(data)
    expect(game.canBeStartedBy(user)).to.eq(false)
  })
})
