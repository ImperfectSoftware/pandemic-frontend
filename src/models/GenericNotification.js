export default class GenericNotification {
  constructor () {
    this.hide = true
    this.message = ''
  }

  get show () {
    return !this.hide
  }
}
