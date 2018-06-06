import Player from '@/models/Player'

export default class Game {
  static from (game) {
    return new Game(game)
  }

  constructor (game) {
    this.id = game.id
    this.name = game.name
    this.started = game.started
    this.ownerId = game.owner_id // eslint-disable-line camelcase
    this.createdDate = game.created_date // eslint-disable-line camelcase
    this.players = []
    game.participants.forEach((participant) => {
      this.players.push(Player.from({
        acceptedStatus: participant.status,
        invitation_id: participant.invitation_id,
        user_id: participant.user_id,
        username: participant.username
      }))
    }, this)
    this.selected = false
  }

  get isReadyToStart () {
    return this.players.filter(player => player.isReady).length >= 2
  }

  get isSelected () {
    return this.selected
  }

  handleInvitationResponse = (username, acceptedStatus) => {
    let player = this.players.filter(player => player.username === username)[0]
    let index = this.players.indexOf(player)
    if (acceptedStatus === 'accepted') {
      player.setAcceptedStatus(acceptedStatus)
    } else {
      this.players.splice(index, 1)
    }
  }

  shoulHideMarks = (user) => {
    if (user.id === this.ownerId) {
      return true
    }
    let player = this.players
      .filter(player => player.username === user.username)[0]
    if (player.isReady) {
      return true
    }
    return false
  }

  isOwner = (user) => {
    return this.ownerId === user.id
  }

  getUserPlayer = (user) => {
    return this.players.filter(player => player.username === user.username)[0]
  }
}
