export default class City {
  static from (city) {
    return new City(city)
  }

  constructor (city) {
    this.name = city.name
    this.color = city.color
    this.population = city.population
    this.density = city.density
    this.neighborsNames = city.neighbors_names
  }

  get cssClass () {
    return this.color + '-city'
  }
}
