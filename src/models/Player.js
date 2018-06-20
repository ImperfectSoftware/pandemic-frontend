import City from '@/models/City'

export default class Player {
  static from (player) {
    return new Player(player)
  }

  constructor (player) {
    this.id = player.id
    this.cityName = player.city_name
    this.role = player.role
    this.username = player.username
    this.cities = []
    player.cities.forEach((city) => {
      this.cities.push(City.from(city))
    }, this)
    this.events = player.events
  }

  get cssClass () {
    return this.role.split('_').join('-')
  }

  get prettyRole () {
    return this.role.split('_').join(' ')
  }
}
