export default class SharedClassNotification {
  constructor () {
    this.showCloseNotification = false
    this.showActions = false
    this.hide = true
    this.message = ''
    this.sharedCardId = ''
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

  updateNotification = (data) => {
    let senderUsername = data.payload.sender_username
    let receiverUsername = data.payload.receiver_username
    let username = data.currentPlayerUsername
    let cityName = data.payload.city_name
    if (receiverUsername === username) {
      this.message = `${senderUsername} would like to share ${cityName} player card` +
        ' with you'
      this.showActions = true
      this.sharedCardId = data.payload.id
    } else if (senderUsername === username) {
      this.message = "You've sent a city player card. Waiting for a response..."
      this.showCloseNotification = true
    } else {
      this.message = `${senderUsername} sent ${cityName} player card to ` +
        `${receiverUsername}.`
      this.showCloseNotification = true
    }
    this.hide = false
  }

  hideNotification = () => {
    this.hide = true
  }
}
