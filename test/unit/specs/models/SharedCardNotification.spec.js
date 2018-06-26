import SharedCardNotification from '@/models/SharedCardNotification'

describe('SharedCardNotification.js', () => {
  let senderData = {
    payload: {
      id: 1,
      sender_username: 'John',
      receiver_username: 'Frank',
      city_name: 'Miami'
    },
    currentPlayerUsername: 'John'
  }

  let receiverData = {
    payload: {
      id: 1,
      sender_username: 'John',
      receiver_username: 'Frank',
      city_name: 'Miami'
    },
    currentPlayerUsername: 'Frank'
  }

  let participantData = {
    payload: {
      sender_username: 'John',
      receiver_username: 'Frank',
      city_name: 'Miami'
    },
    currentPlayerUsername: 'Mark'
  }

  it('initializes with defaults', () => {
    let notification = new SharedCardNotification()
    expect(notification.showCloseNotification).to.eq(false)
    expect(notification.showActions).to.eq(false)
    expect(notification.hide).to.eq(true)
    expect(notification.message).to.eq('')
    expect(notification.sharedCardId).to.eq('')
  })

  it('hides notification', () => {
    let notification = new SharedCardNotification()
    notification.hideNotification()
    expect(notification.hide).to.eq(true)
  })

  it('displays sender message', () => {
    let notification = new SharedCardNotification()
    notification.updateNotification(senderData)
    expect(notification.message).to
      .eq("You've sent a city player card. Waiting for a response...")
    expect(notification.showCloseNotification).to.eq(true)
  })

  it('displays receiver message', () => {
    let notification = new SharedCardNotification()
    notification.updateNotification(receiverData)
    expect(notification.message).to
      .eq('John would like to share Miami player card with you')
    expect(notification.sharedCardId).to.eq(1)
    expect(notification.showActions).to.eq(true)
  })

  it('displays participant message', () => {
    let notification = new SharedCardNotification()
    notification.updateNotification(participantData)
    expect(notification.message).to
      .eq('John sent Miami player card to Frank.')
    expect(notification.showCloseNotification).to.eq(true)
  })

  it('knows it should hide notification', () => {
    let notification = new SharedCardNotification()
    expect(notification.cssClasses).to.eq('d-none')
  })

  it('knows it should not hide notification', () => {
    let notification = new SharedCardNotification()
    notification.updateNotification(participantData)
    expect(notification.cssClasses).to.eq('')
  })

  it('knows it should show close notificaiton for participant', () => {
    let notification = new SharedCardNotification()
    notification.updateNotification(participantData)
    expect(notification.closeNotificationCssClasses).to
      .eq('btn btn-secondary float-right')
  })

  it('knows it should show close notificaiton for sender', () => {
    let notification = new SharedCardNotification()
    notification.updateNotification(senderData)
    expect(notification.closeNotificationCssClasses).to
      .eq('btn btn-secondary float-right')
  })

  it('knows it should not show close notificaiton', () => {
    let notification = new SharedCardNotification()
    notification.updateNotification(receiverData)
    expect(notification.closeNotificationCssClasses).to
      .eq('d-none')
  })

  it('knows it should show actions css classes', () => {
    let notification = new SharedCardNotification()
    notification.updateNotification(receiverData)
    expect(notification.actionsCssClasses).to.eq('btn btn-secondary')
  })

  it('knows it should show actions css classes for participant', () => {
    let notification = new SharedCardNotification()
    notification.updateNotification(participantData)
    expect(notification.actionsCssClasses).to.eq('d-none')
  })

  it('knows it should show actions css classes for sender', () => {
    let notification = new SharedCardNotification()
    notification.updateNotification(senderData)
    expect(notification.actionsCssClasses).to.eq('d-none')
  })
})
