/* eslint camelcase: 0 */
export default class Invitation {
  static from (data) {
    return new Invitation(data)
  }

  constructor ({ id, user_id, game_id, accepted, owner_username, game_name }) {
    this.id = id
    this.userId = user_id
    this.gameId = game_id
    this.accepted = accepted
    this.ownerUsername = owner_username
    this.gameName = game_name
  }

  setAccepted = (value) => {
    this.accepted = value
  }
}
