/* eslint camelcase: 0 */

export default class Player {
  static from (data) {
    return new Player(data)
  }

  constructor ({ user_id, username, invitation_id, accepted, id }) {
    this.id = id || ''
    this.invitationId = invitation_id
    this.userId = user_id
    this.username = username
    if (accepted) {
      this.status = 'Ready'
    } else {
      this.status = 'Pending'
    }
  }

  setAccepted = (value) => {
    this.status = value ? 'Ready' : 'Pending'
  }

  get isPending () {
    return this.status === 'Pending'
  }

  get isReady () {
    return this.status === 'Ready'
  }

  get isBrown () {
    return false
  }
}
