import Game from '@/models/Game'

describe('Game.js', () => {
  let data = { actions_left: 2 }

  it('should know how many actions are left', () => {
    let game = Game.from(data)
    expect(game.actionsLeft).to.eq(2)
  })
})
