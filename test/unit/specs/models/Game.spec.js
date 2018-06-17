import Game from '@/models/Game'

describe('Game.js', () => {
  let playerOne = {
    status: 'accepted',
    invitation_id: 1,
    user_id: 1,
    username: 'one'
  }
  let playerTwo = {
    status: 'accepted',
    invitation_id: 2,
    user_id: 2,
    username: 'two'
  }
  let playerThree = {
    status: 'inactive',
    invitation_id: 3,
    user_id: 3,
    username: 'three'
  }
  let data = {
    owner_id: playerOne.user_id,
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

  it('should know if the game is started', () => {
    let game = Game.from(data)
    expect(game.hasStarted).to.eq(true)
  })

  it('should know that game can be started by current user', () => {
    let user = { id: playerOne.user_id }
    let game = Game.from(data)
    expect(game.canBeStartedBy(user)).to.eq(true)
  })

  it('should know that game cannot be started by current user', () => {
    let user = { id: playerTwo.user_id }
    let game = Game.from(data)
    expect(game.canBeStartedBy(user)).to.eq(false)
  })

  it('should know if the user is a game owner', () => {
    let user = { id: playerOne.user_id }
    let game = Game.from(data)
    expect(game.isGameOwner(user)).to.eq(true)
  })

  it('should know if the user is not a game owner', () => {
    let user = { id: playerTwo.user_id }
    let game = Game.from(data)
    expect(game.isGameOwner(user)).to.eq(false)
  })

  it('updates player status to accepted when player accepts invite', () => {
    let user = { id: playerOne.user_id }
    data.participants = [ playerOne, playerThree ]
    let game = Game.from(data)
    expect(game.canBeStartedBy(user)).to.eq(false)
    game.handleInvitationResponse(playerThree.user_id, 'accepted')
    expect(game.canBeStartedBy(user)).to.eq(true)
  })

  it('removes player from games player list on invitation declined', () => {
    data.participants = [ playerOne, playerThree ]
    let game = Game.from(data)
    game.handleInvitationResponse(playerThree.user_id, 'declined')
    expect(game.players.length).to.eq(1)
  })

  it('should be able to add a player from payload', () => {
    let game = Game.from(data)
    expect(game.players.length).to.eq(2)
    game.addPlayer(playerThree)
    expect(game.players.length).to.eq(3)
  })

  it('should know if the user passed in is the owner', () => {
    let user = { id: playerOne.user_id }
    let game = Game.from(data)
    expect(game.isOwner(user)).to.eq(true)
  })

  it('should know if the user passed in is not the owner', () => {
    let user = { id: playerTwo.user_id }
    let game = Game.from(data)
    expect(game.isOwner(user)).to.eq(false)
  })

  it("should return the owner's username", () => {
    let game = Game.from(data)
    expect(game.ownerUsername()).to.eq(playerOne.username)
  })
})
