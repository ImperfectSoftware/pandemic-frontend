/* eslint camelcase: 0 */

export default class Player {
  static from (data) {
    return new Player(data)
  }

  constructor ({ user_id, username, invitation_id, acceptedStatus, id }) {
    this.id = id || ''
    this.invitationId = invitation_id
    this.userId = user_id
    this.username = username
    if (acceptedStatus) {
      this.acceptedStatus = acceptedStatus
    } else {
      this.acceptedStatus = 'inactive'
    }
  }

  setAcceptedStatus = (value) => {
    this.acceptedStatus = value
  }

  get isDeclined () {
    return this.acceptedStatus === 'declined'
  }

  get isPending () {
    return this.acceptedStatus === 'inactive'
  }

  get isReady () {
    return this.acceptedStatus === 'accepted'
  }
}
