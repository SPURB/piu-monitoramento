import { http } from './http'

export default {
  get: (query = '') => {
    return http.get(`/projetos.json${query}`)
  }
}
