import Projetos from '@/services/api-projetos'
import Tramitacao from '@/services/api-tramitacao'

export const state = () => ({
  projetos: [],
  tramitacoes: [],
  projetosTramitacao: [],
  fetching: false,
  error: false,
  err: ''
})

export const actions = {
  getProjetos: async ({ commit }) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      const { data } = await Projetos.get()
      commit('SET', { data, key: 'projetos' })
    } catch (err) {
      commit('SET', { data: err, key: 'err' })
      commit('SET', { data: true, key: 'error' })
    }
    commit('SET', { data: false, key: 'fetching' })
  },
  getTramitacao: async ({ commit }) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      const { data } = await Tramitacao.get()
      commit('SET', { data, key: 'tramitacoes' })
    } catch (err) {
      commit('SET', { data: err, key: 'err' })
      commit('SET', { data: true, key: 'error' })
    }
    commit('SET', { data: false, key: 'fetching' })
  },
  agruparByTramitacao: ({ commit, state }) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      const data = state.tramitacoes.map((tramitacao) => {
        const projetos = state.projetos.filter(projeto => projeto.id_tramitacao === tramitacao.id)
        return {
          id: tramitacao.id,
          nome: tramitacao.nome,
          projetos
        }
      }).filter(tramitacao => tramitacao.nome !== 'n/a' && tramitacao.nome !== 'Processo Administrativo' &&
        tramitacao.nome !== 'Arquivo KML' && tramitacao.nome !== 'Arquivo SHP')
      commit('SET', { data, key: 'projetosTramitacao' })
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
    state.projetos = []
    state.tramitacoes = []
    state.fetching = false
    state.err = false
    state.err = ''
  }
}
