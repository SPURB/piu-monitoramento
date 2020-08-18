export const state = () => ({
  fetching: false,
  error: false
})

export const actions = {
  setupOn: async ({ commit, dispatch }) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      await dispatch('home/getTramitacao', null, { root: true })
      await dispatch('crud-projeto/getProponentes', null, { root: true })
      await dispatch('crud-projeto/getOrigens', null, { root: true })
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
  }
}
