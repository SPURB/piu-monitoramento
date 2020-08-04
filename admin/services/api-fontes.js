import { http } from './http'

export default {
  get: (query = '') => {
    return http.get(`/fontes.json${query}`)
  }
}
