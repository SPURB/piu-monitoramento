export const http = {
	methods: {
		fetchJson (file, url = 'https://dev-spurbanismo.github.io/piu-monitoramento-backend/v2/') {
		// fetchJson (file, url = 'http://localhost:8080/v2/') {
		// fetchJson (file, url = './api/v2/') {
				return new Promise((resolve, reject) => {
				const oReq = new XMLHttpRequest()
				oReq.addEventListener("load", evt => resolve(JSON.parse(evt.target.response)))
				oReq.addEventListener("error", evt => reject(`Requisição para ${file} falhou`))
				oReq.addEventListener("abort", evt => reject(`Requisição para ${file} foi cancelada`))
				oReq.open('GET', `${url}${file}.json`, true)
				oReq.send()
			})
		},
		consultaAbertaClass(status) {
			return status ? 'consultaAberta' : ''
		}
	}
}
