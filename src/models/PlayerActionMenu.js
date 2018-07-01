import menuMixin from '@/mixins/menuMixin'

export default class PlayerActionMenu {
  constructor () {
    this.hide = true
    this.receiveCities = []
    this.giveCities = []
    this.locations = []
    this.playerUsername = ''
    this.position = ''
    this.cityStaticid = ''
    this.height = 310
    this.width = 200
    this.playerUsername = ''
    this.playerId = ''
    this.x = 0
    this.y = 0
  }

  get noActionsClasses () {
    if (this.receiveCities.length !== 0) {
      return 'd-none'
    } else if (this.giveCities.length !== 0) {
      return 'd-none'
    } else if (this.locations.length !== 0) {
      return 'd-none'
    }
    return ''
  }

  showMenu = (payload) => {
    let player = payload.game.players[payload.position]
    this.hide = false
    this.position = payload.position
    this.playerUsername = player.username
    this.playerId = player.id
    this.cityStaticid = payload.cityStaticid
    this.windowHeight = payload.windowHeight
    this.windowWidth = payload.windowWidth
    this.x = this.calculateX(payload.windowWidth, payload.pageX)
    this.y = this.calculateY(payload.windowHeight, payload.pageY)
  }

  updateMenu = (payload) => {
    this.receiveCities = payload.receive_cities
    this.giveCities = payload.give_cities
    this.locations = payload.locations
  }

  get style () {
    return this.elementStyle()
  }

  get cssClasses () {
    return this.sharedClasses()
  }
}
Object.assign(PlayerActionMenu.prototype, menuMixin)
