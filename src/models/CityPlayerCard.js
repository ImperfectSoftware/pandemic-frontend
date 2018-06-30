export default class CityPlayerCard {
  static from (city) {
    return new CityPlayerCard(city)
  }

  constructor (city) {
    this.staticid = city.staticid
    this.name = city.name
    this.color = city.color
    this.population = city.population
    this.density = city.density
  }

  get cssClass () {
    return 'city-name'
  }

  get rectangleCssClass () {
    return `city-rectangle-${this.color}`
  }
}
