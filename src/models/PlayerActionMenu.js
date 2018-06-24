import menuMixin from '@/mixins/menuMixin'

export default class PlayerActionMenu {
  constructor () {
    this.hide = true
    this.noActionsClasses = true // should default to false
    this.receiveCities = []
    this.giveCities = []
    this.playerName = 'John'
    this.position = ''
    this.cityStaticid = ''
    this.height = 310
    this.width = 200
    this.x = 0
    this.y = 0
  }

  showMenu = (payload) => {
    this.hide = false
    this.position = payload.position
    this.cityStaticid = payload.cityStaticid
    this.windowHeight = payload.windowHeight
    this.windowWidth = payload.windowWidth
    this.x = this.calculateX(payload.windowWidth, payload.pageX)
    this.y = this.calculateY(payload.windowHeight, payload.pageY)
  }

  updateMenu = (payload) => {
    this.receiveCities = payload.receive_cities
    this.giveCities = payload.give_cities
  }

  get style () {
    return this.elementStyle()
  }

  get cssClasses () {
    return this.sharedClasses()
  }
}

Object.assign(PlayerActionMenu.prototype, menuMixin)
