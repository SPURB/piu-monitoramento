import './styles.scss'
import mapa from './components/Mapa.vue'
import sumario from './components/Sumario.vue'
import Ficha from './components/Ficha.vue'
import { http } from './api'

new Vue({
	el: '#app',
	mixins: [ http ],
	components: {
		mapa,
		sumario,
		Ficha
	},
	data:{
		projectId: 0,
		isFocused: false,
		display:{
			// mapa: true,
			// sumario: false,
			// ficha: true,
			mapa: true,
			sumario: true,
			ficha: false,
		},
		api: {
			fetching: false,
			message: '',
			error: false
		},
		monitoramento: [],
		hiperlinks: [],
	}, 
	computed:{
		apiPath() { return 'https://spurb.github.io/piu-monitoramento-backend/'}
	},
	created(){
		this.fetchFile(this.apiPath, 'monitoramento')
		this.fetchFile(this.apiPath, 'hiperlinks')

		this.fetchJson('projetos')
			.then(res=> this.monitoramento = res)
			.catch(err => {
				this.error.status = true
				this.error.message = err
			})

	},
	watch:{
		projectId () {
			if(this.projectId !== 0) {
				this.display.sumario = false
				this.display.ficha = true
				this.isFocused = true
			}
			else{
				this.display.mapa = true
				this.display.sumario = true
				this.display.ficha = false
				this.isFocused = false
			}
		}
	},
	methods: {
		fetchFile(url, file){
			this.api.fetching = true
			this.api.message = 'Enviando solicitação...'
			const oReq = new XMLHttpRequest()
			oReq.addEventListener("load", evt => {
				this[file] = JSON.parse(evt.target.response)
				this.api.fetching = false
				this.api.message = `Requisição para ${file} realizada com sucesso`
			})
			oReq.addEventListener("error", evt => {
				this[file] = JSON.parse(evt.target.response)
				this.api.fetching = false
				this.api.message = 'Erro! A requisição falhou'
			})
			oReq.addEventListener("abort", evt => {
				this.api.fetching = false
				this.api.message = 'Erro! A requisição foi cancelada'
			})
			oReq.open('GET', `${url}${file}.json`, true)
			oReq.send()
		},
		receiveId(id){
			this.projectId = id
			if (id === 0){
				this.display.sumario = true
				this.display.ficha = false
				this.isFocused = false
			} 
		}
	}
})