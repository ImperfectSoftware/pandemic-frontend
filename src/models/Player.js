export default class Player {
  static from (data) {
    return new Player(data)
  }

  constructor (data) {
    this.invitationId = data.id
    this.id = data.user.id
    this.username = data.user.username
    this.status = 'Pending'
  }

  get isPending () {
    return this.status === 'Pending'
  }

  get isReady () {
    return this.status === 'Ready'
  }
}
