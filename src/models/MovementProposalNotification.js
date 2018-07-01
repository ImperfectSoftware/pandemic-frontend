export default class MovementProposalNotification {
  constructor () {
    this.showCloseNotification = false
    this.showActions = false
    this.hide = true
    this.message = ''
    this.movementProposalId = ''
  }

  get cssClasses () {
    if (this.hide) {
      return 'd-none'
    }
    return ''
  }

  get actionsCssClasses () {
    if (this.showActions) {
      return 'btn btn-secondary'
    }
    return 'd-none'
  }

  get closeNotificationCssClasses () {
    if (this.showCloseNotification) {
      return 'btn btn-secondary float-right'
    }
    return 'd-none'
  }

  show = (data) => {
    let puppetUsername = data.payload.puppet_username
    let proponentUsername = data.payload.proponent_username
    let username = data.currentPlayerUsername
    let cityName = data.payload.city_name
    if (puppetUsername === username) {
      this.message = `${proponentUsername} would like to move you to ` +
        `${cityName}.`
      this.showActions = true
      this.movementProposalId = data.payload.id
    } else if (proponentUsername === username) {
      this.message = `You've sent a proposal to move ${puppetUsername} to ` +
        `${cityName}.`
      this.showCloseNotification = true
    } else {
      this.message = `${proponentUsername} sent a request to move ` +
        `${puppetUsername} to ${cityName}.`
      this.showCloseNotification = true
    }
    this.hide = false
  }
}
