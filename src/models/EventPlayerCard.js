export default class EventPlayerCard {
  static from (eventCard) {
    return new EventPlayerCard(eventCard)
  }

  constructor (eventCard) {
    this.staticid = eventCard.staticid
    this.name = eventCard.name
  }

  get compositeId () {
    return `special-card-${this.staticid}`
  }
}
