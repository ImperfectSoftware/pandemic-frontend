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

  get isSelected () {
    return this.selected
  }

  canStartGame = (currentUser) => {
    return this.players.filter(player => player.isReady).length >= 2 &&
      currentUser.id === this.ownerId
  }

  isGameOwner = (currentUser) => {
    return currentUser.id === this.ownerId
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

  addPlayer = (participant) => {
    this.players.push(Player.from({
      acceptedStatus: participant.status,
      invitation_id: participant.invitation_id,
      user_id: participant.user_id,
      username: participant.username
    }))
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

  ownerUsername = () => {
    return this.players.filter(player => player.userId === this.ownerId)[0].username
  }
}
