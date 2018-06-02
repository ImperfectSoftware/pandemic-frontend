import Player from '@/models/Player'

export default class Game {
  static from (game) {
    return new Game(game)
  }

  constructor (game) {
    this.id = game.id
    this.started = game.started
    this.ownerId = game.owner_id // eslint-disable-line camelcase
    this.createdDate = game.created_date // eslint-disable-line camelcase
    this.players = []
    game.participants.forEach((participant) => {
      this.players.push(Player.from({
        accepted: participant.accepted,
        invitation_id: participant.invitation_id,
        user_id: participant.user_id,
        username: participant.username
      }))
    }, this)
  }

  get isReadyToStart () {
    return this.players.filter(player => player.isReady).length >= 2
  }

  setStatusForUsername = (username, accepted) => {
    let player = this.players.filter(player => player.username === username)[0]
    player.setAccepted(accepted)
  }
}
