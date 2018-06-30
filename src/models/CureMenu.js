import menuMixin from '@/mixins/menuMixin'

export default class CureMenu {
  constructor () {
    this.hide = true
    this.width = 200
    this.height = 0
    this.x = 0
    this.y = 0
  }

  get style () {
    return this.elementStyle()
  }

  get displayCssClass () {
    return this.hide ? 'd-none' : ''
  }

  showMenu = (payload) => {
    this.hide = false
    this.windowHeight = payload.windowHeight
    this.windowWidth = payload.windowWidth
    this.x = this.calculateX(payload.windowWidth, payload.pageX)
    this.y = this.calculateY(payload.windowHeight, payload.pageY)
    this.height = payload.citiesCount * 34 + 50
  }
}
Object.assign(CureMenu.prototype, menuMixin)
