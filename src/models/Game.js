import Player from '@/models/Player'

export default class Game {
  static from (game) {
    return new Game(game)
  }

  constructor (game) {
    this.id = game.id
    this.started = game.started
    this.owner_id = game.owner_id // eslint-disable-line camelcase
    this.players = []
    game.invites.forEach((invite) => {
      this.players.push(Player.from({
        accepted: invite.accepted,
        invitation_id: invite.id,
        user_id: invite.user.id,
        username: invite.user.username
      }))
    }, this)
  }
}
