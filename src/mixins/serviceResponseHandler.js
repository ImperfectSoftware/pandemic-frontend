import store from '.././store'

let responseHandler = {
  handleError (e) {
    store.dispatch('showGenericNotification', {
      message: "We're sorry, something went wrong. Please try again later."
    })
  },
  handleSuccess (data) {
    if (data.error) {
      store.dispatch('showGenericNotification', { message: data.error })
    } else {
      store.dispatch('hideGenericNotification')
    }
  }
}

export default responseHandler
