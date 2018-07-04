import Player from '@/models/Player'
import City from '@/models/City'
import EventPlayerCard from '@/models/EventPlayerCard'

export default class Game {
  static from (game) {
    return new Game(game)
  }

  constructor (game) {
    this.id = game.id
    this.skipInfections = game.skip_infections
    this.betweenEpidemicStages = game.between_epidemic_stages
    this.actionsTaken = game.actions_taken
    this.active = game.active
    this.infections = game.infections
    this.researchStations = game.research_stations
    this.players = {}
    this.activePlayerId = game.active_player_id
    game.players.forEach((player) => {
      this.players[player.position] = Player.from(player, this)
    }, this)
    this.redStatus = game.red_status
    this.blackStatus = game.black_status
    this.blueStatus = game.blue_status
    this.yellowStatus = game.yellow_status
    this.infectionDiscardPile = []
    game.infection_discard_pile.forEach((city) => {
      this.infectionDiscardPile.push(City.from(city))
    }, this)
    this.eventDiscardPile = []
    game.event_discard_pile.forEach((event) => {
      this.eventDiscardPile.push(EventPlayerCard.from(event))
    }, this)
  }

  get diseaseColors () {
    return ['black', 'yellow', 'red', 'blue']
  }

  get actionsLeft () {
    return 4 - this.actionsTaken
  }

  get isActive () {
    return this.active
  }

  get activePlayer () {
    let key = Object.keys(this.players)
      .filter(key => this.players[key].id === this.activePlayerId)[0]
    return this.players[key]
  }

  get isInfectionDiscardPileEmpty () {
    return this.infectionDiscardPile.length === 0
  }

  get isEventDiscardPileEmpty () {
    return this.eventDiscardPile.length === 0
  }

  get epidemicButtonCssClasses () {
    return this.betweenEpidemicStages ? '' : 'd-none'
  }

  currentPlayer = (username) => {
    let key = Object.keys(this.players)
      .filter(key => this.players[key].username === username)[0]
    return this.players[key]
  }

  isCurrentPlayerActive = () => {
    return this.activePlayer.id ===
      this.currentPlayer(this.activePlayer.username)
  }

  diseaseCss = (color) => {
    return `city-rectangle-${color}`
  }

  usedInfectionsFor = (color) => {
    let counter = 0
    Object.keys(this.infections).forEach((key) => {
      let infection = this.infections[key]
      let infections = [infection.one, infection.two, infection.three]
      counter += infections
        .filter(infectionColor => infectionColor === color).length
    }, this)
    return counter
  }

  remainingInfectionsFor = (color) => {
    return 24 - this.usedInfectionsFor(color)
  }

  showEradicatedClassFor = (color) => {
    return 'd-none'
  }

  showBottleClassFor = (color) => {
    let colorStatus = this[`${color}Status`]
    if (colorStatus === 'cured' || colorStatus === 'eradicated') {
      return `cured-bottle-${color}`
    }
    return 'disease-not-cured'
  }
}
