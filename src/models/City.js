export default class City {
  static from (city) {
    return new City(city)
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

  get radioKey () {
    return `radio-${this.staticid}`
  }
}
