export default class Player {
  static from (player) {
    return new Player(player)
  }

  constructor (player) {
    this.location = player.location
    this.role = player.role
  }

  cssClass = () => {
    return this.role.split('_').join('-')
  }
}
