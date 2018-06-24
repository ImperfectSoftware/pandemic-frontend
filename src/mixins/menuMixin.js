let menuMixin = {
  elementStyle () {
    return {
      top: this.y + 'px',
      left: this.x + 'px',
      'width': this.width + 'px',
      'height': this.height + 'px'
    }
  },
  calculateX (windowWidth, pageX) {
    if (pageX + this.width > windowWidth) {
      return pageX - this.width
    } else {
      return pageX
    }
  },
  calculateY (windowHeight, pageY) {
    let doesNotFitBelow = pageY + this.height > windowHeight
    let itFitsAbove = pageY - this.height >= 0
    if (doesNotFitBelow && itFitsAbove) {
      return pageY - this.height
    } else {
      return pageY
    }
  },
  sharedClasses () {
    return 'btn btn-block btn-secondary shared-btn'
  }
}

export default menuMixin
