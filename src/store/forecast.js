import * as MutationTypes from './mutation-types'

const state = {
  forecast: [],
  showForecast: false
}

const mutations = {
  [MutationTypes.UPDATE_FORECAST] (state, forecast) {
    state.forecast = forecast
    state.showForecast = true
  },
  [MutationTypes.HIDE_FORECAST] (state, forecast) {
    state.forecast = forecast
    state.showForecast = false
  }
}

const getters = {
  forecast (state) {
    return state.forecast
  },
  showForecast (state) {
    return state.showForecast
  }
}

const actions = {
  updateForecast ({ commit }, forecast) {
    commit(MutationTypes.UPDATE_FORECAST, forecast)
  },
  hideForecast ({ commit }) {
    commit(MutationTypes.HIDE_FORECAST)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
