import Player from '@/models/Player'

export default class Game {
  static from (game) {
    return new Game(game)
  }

  constructor (game) {
    this.active = game.active
    this.id = game.id
    this.infections = game.infections
    this.players = {}
    game.players.forEach((player) => {
      this.players[player.position] = Player.from(player)
    }, this)
  }

  get isActive () {
    return this.active
  }
}
