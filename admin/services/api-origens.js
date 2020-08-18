import { http } from './http'

export default {
  get: (query = '') => {
    return http.get(`/origens.json${query}`)
  }
}
