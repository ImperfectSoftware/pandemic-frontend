import CityPlayerCard from '@/models/CityPlayerCard'
import EventPlayerCard from '@/models/EventPlayerCard'

export default class Player {
  static from (player) {
    return new Player(player)
  }

  constructor (player) {
    this.id = player.id
    this.cityName = player.city_name
    this.role = player.role
    this.username = player.username
    this.cityPlayerCards = []
    this.eventPlayerCards = []
    player.cities.forEach((city) => {
      this.cityPlayerCards.push(CityPlayerCard.from(city))
    }, this)
    player.events.forEach((eventCard) => {
      this.eventPlayerCards.push(EventPlayerCard.from(eventCard))
    }, this)
  }

  get cssClass () {
    return this.role.split('_').join('-')
  }

  get prettyRole () {
    return this.role.split('_').join(' ')
  }
}
