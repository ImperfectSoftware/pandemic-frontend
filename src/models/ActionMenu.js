export default class ActionMenu {
  constructor () {
    this.hide = true
    this.minHeight = 300
    this.maxWidth = 200
    this.x = 0
    this.y = 0
  }

  showMenu = (payload) => {
    this.hide = false
    this.cityName = payload.cityName
    this.windowHeight = payload.windowHeight
    this.windowWidth = payload.windowWidth
    this.x = this.calculateX(payload.windowWidth, payload.pageX)
    this.y = this.calculateY(payload.windowHeight, payload.pageY)
  }

  get style () {
    return {
      top: `${this.y}px`,
      left: `${this.x}px`,
      'max-width': `${this.maxWidth}px`,
      'min-height': `${this.minHeight}px`
    }
  }

  calculateX (windowWidth, pageX) {
    if (pageX + this.maxWidth > windowWidth) {
      return pageX - this.maxWidth
    } else {
      return pageX
    }
  }

  calculateY (windowHeight, pageY) {
    let doesNotFitBelow = pageY + this.minHeight > windowHeight
    let itFitsAbove = pageY - this.minHeight >= 0
    if (doesNotFitBelow && itFitsAbove) {
      return pageY - this.minHeight
    } else {
      return pageY
    }
  }
}
