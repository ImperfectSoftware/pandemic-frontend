export default class EventPlayerCard {
  // Static ids:
  // Resilient Population - 1, One Quiet Night - 4, Forecast - 5

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

  get isUsable () {
    return ['1', '4', '5'].indexOf(this.staticid) !== -1
  }

  get isQuietNight () {
    return this.staticid === '4'
  }
}
