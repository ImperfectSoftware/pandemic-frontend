import store from '.././store'

let errorHandler = {
  handleError (e) {
    store.dispatch('updateError', {
      message: "We're sorry, something went wrong. Please try again later.",
      css: 'alert-danger',
      display: true
    })
  }
}

export default errorHandler
