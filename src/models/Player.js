export default class Player {
  static from (player) {
    return new Player(player)
  }

  constructor (player) {
    this.id = player.id
    this.cityName = player.city_name
    this.role = player.role
    this.username = player.username
  }

  get cssClass () {
    return this.role.split('_').join('-')
  }

  get prettyRole () {
    return this.role.split('_').join(' ')
  }
}
