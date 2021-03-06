import City from '@/models/City'
import store from '@/store'
import EventPlayerCard from '@/models/EventPlayerCard'

export default class Player {
  static from (player, game) {
    return new Player(player, game)
  }

  constructor (player, game) {
    this.game = game
    this.id = player.id
    this.cityStaticid = player.location_staticid
    this.role = player.role
    this.prettyRole = player.pretty_role
    this.username = player.username
    this.cityPlayerCards = []
    this.eventPlayerCards = []
    player.cities.forEach((city) => {
      this.cityPlayerCards.push(City.from(city))
    }, this)
    player.events.forEach((eventCard) => {
      this.eventPlayerCards.push(EventPlayerCard.from(eventCard))
    }, this)
    if (this.cityPlayerCards.length + this.eventPlayerCards.length > 7) {
      store.dispatch('showGenericNotification', {
        message: 'You have more than 7 player cards. Please discard cards.'
      })
    }
  }

  get isContingencyPlaner () {
    return this.prettyRole === 'Contingency Planer'
  }

  get cssClass () {
    return this.role.split('_').join('-')
  }

  get selectedCss () {
    return this.isActive ? 'active' : 'not-active'
  }

  get isActive () {
    return this === this.game.activePlayer
  }

  get hasNoPlayerCards () {
    return (this.eventPlayerCards.length + this.cityPlayerCards.length) === 0
  }

  get hasTooManyCards () {
    return this.cityPlayerCards.length + this.eventPlayerCards.length > 7
  }

  canTakeCard = (eventName) => {
    return this.isContingencyPlaner && eventName !== 'Epidemic'
  }
}
