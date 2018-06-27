import store from '@/store'

describe('sharedCardNotification.js', () => {
  it('updates shared card notification', () => {
    store.dispatch('updateSharedCardNotification', {
      payload: {
        sender_username: 'John'
      },
      currentPlayerUsername: 'John'
    })
    expect(store.getters.sharedCardNotification.message).to
      .eq("You've sent a city player card. Waiting for a response...")
    expect(store.getters.sharedCardNotification.showCloseNotification)
      .to.eq(true)
  })

  it('hides shared card notification', () => {
    store.dispatch('hideSharedCardNotification')
    expect(store.getters.sharedCardNotification.hide).to.eq(true)
  })
})
