/* eslint camelcase: 0 */
export default class Invitation {
  static from (data) {
    return new Invitation(data)
  }

  constructor (data) {
    this.id = data.id
    this.userId = data.user.id
    this.gameId = data.game.id
    this.acceptedStatus = data.status
    this.ownerUsername = data.game.owner_username
    this.gameName = data.game.name
  }

  isAccepted = () => {
    return this.acceptedStatus === 'accepted'
  }

  isDeclined = () => {
    return this.acceptedStatus === 'declined'
  }

  isInactive = () => {
    return this.acceptedStatus === 'inactive'
  }
}
