import Proponentes from '@/services/api-proponentes'
import Origens from '@/services/api-origens'

export const state = () => ({
  proponentes: [],
  origens: [],
  fetching: false,
  error: false,
  err: ''
})

export const actions = {
  getProponentes: async ({ commit }) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      const { data } = await Proponentes.get()
      commit('SET', { data, key: 'proponentes' })
    } catch (err) {
      commit('SET', { data: err, key: 'err' })
      commit('SET', { data: true, key: 'error' })
    }
    commit('SET', { data: false, key: 'fetching' })
  },
  getOrigens: async ({ commit }) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      const { data } = await Origens.get()
      commit('SET', { data, key: 'origens' })
    } catch (err) {
      commit('SET', { data: err, key: 'err' })
      commit('SET', { data: true, key: 'error' })
    }
    commit('SET', { data: false, key: 'fetching' })
  }
}

export const mutations = {
  SET: (state, { data, key }) => {
    state[key] = data
  },
  RESET: (state) => {
    state.proponentes = []
    state.origens = []
    state.fetching = false
    state.err = false
    state.err = ''
  }
}
