import * as MutationTypes from './mutation-types'
import City from '@/models/City'

const state = {
  cities: [],
  shouldShow: false
}

const mutations = {
  [MutationTypes.UPDATE_RESILIENT_POPULATION_CITIES] (state, cities) {
    state.cities = cities.map(city => City.from(city))
    state.shouldShow = true
  },
  [MutationTypes.HIDE_RESILIENT_POPULATION_CITIES] (state) {
    state.shouldShow = false
  }
}

const getters = {
  resilientPopulationCities (state) {
    return state.cities
  },
  showDiscardedInfectionCities (state) {
    return state.shouldShow
  }
}

const actions = {
  updateResilientPopulationCities ({ commit }, cities) {
    commit(MutationTypes.UPDATE_RESILIENT_POPULATION_CITIES, cities)
  },
  hideResilientPopulationCities ({ commit }) {
    commit(MutationTypes.HIDE_RESILIENT_POPULATION_CITIES)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
