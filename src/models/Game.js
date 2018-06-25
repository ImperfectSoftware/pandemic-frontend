import Player from '@/models/Player'

export default class Game {
  static from (game) {
    return new Game(game)
  }

  constructor (game) {
    this.id = game.id
    this.actionsTaken = game.actions_taken
    this.active = game.active
    this.infections = game.infections
    this.researchStations = game.research_stations
    this.players = {}
    this.activePlayerId = game.active_player_id
    game.players.forEach((player) => {
      this.players[player.position] = Player.from(player)
    }, this)
  }

  get actionsLeft () {
    return 4 - this.actionsTaken
  }

  get isActive () {
    return this.active
  }

  get activePlayer () {
    let key = Object.keys(this.players)
      .filter(key => this.players[key].id === this.activePlayerId)[0]
    return this.players[key]
  }

  currentPlayer = (username) => {
    let key = Object.keys(this.players)
      .filter(key => this.players[key].username === username)[0]
    return this.players[key]
  }
}
