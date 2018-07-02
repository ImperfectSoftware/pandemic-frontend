import store from '.././store'

let responseHandler = {
  handleError (e) {
    store.dispatch('updateError', {
      message: "We're sorry, something went wrong. Please try again later.",
      css: 'alert-danger',
      display: true
    })
  },
  handleSuccess (data) {
    if (data.error) {
      store.dispatch('showGenericNotification', { message: data.error })
    }
  }
}

export default responseHandler
