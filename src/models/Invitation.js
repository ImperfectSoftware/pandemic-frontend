/* eslint camelcase: 0 */
export default class Invitation {
  static from (data) {
    return new Invitation(data)
  }

  constructor (data) {
    this.id = data.id
    this.userId = data.user_id
    this.gameId = data.game_id
    this.acceptedStatus = data.status
    this.ownerUsername = data.owner_username
    this.gameName = data.game_name
  }

  setAcceptedStatus = (value) => {
    this.acceptedStatus = value
  }
}
