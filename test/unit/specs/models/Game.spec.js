import Game from '@/models/Game'

describe('Game.js', () => {
  let activePlayer = {
    id: 1,
    position: 'one',
    cities: [],
    events: []
  }
  let player = {
    id: 2,
    username: 'John',
    position: 'two',
    cities: [],
    events: []
  }
  let data = {
    actions_taken: 2,
    active: true,
    active_player_id: 1,
    players: [
      activePlayer,
      player
    ]
  }

  it('should know how many actions are left', () => {
    let game = Game.from(data)
    expect(game.actionsLeft).to.eq(2)
  })

  it('should know if the game is active', () => {
    let game = Game.from(data)
    expect(game.isActive).to.eq(true)
  })

  it('should know the active player', () => {
    let game = Game.from(data)
    expect(game.activePlayer.id).to.eq(activePlayer.id)
  })

  it('should know the current player', () => {
    let game = Game.from(data)
    expect(game.currentPlayer(player.username).id).to.eq(player.id)
  })
})
