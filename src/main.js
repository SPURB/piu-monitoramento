import './styles.scss'
const Mapa = () => import('./components/Mapa.vue')
const Sumario = () => import('./components/Sumario.vue')
const Ficha = () => import('./components/Ficha.vue')
import { http } from './api'

new Vue({
	el: '#app',
	mixins: [ http ],
	components: {
		Mapa,
		Sumario,
		Ficha
	},
	data:{
		projectId: 0,
		isFocused: false,
		display: {
			mapa: true,
			sumario: true,
			ficha: false,
		},
		api: {
			fetching: false,
			message: '',
			error: false
		},
		projetos: [],
		tramitacao: []
	},
	created () {
		const dataTables = [ 'projetos', 'tramitacao' ].map(table => this.fetchJson(table))

		Promise.all(dataTables)
			.then(res => {
				this.projetos = res[0]
				this.tramitacao = res[1]
			})
			.catch(err => {
				this.error.status = true
				this.error.message = err
			})
	},
	mounted () {
		const loader = document.getElementById('loader')
		loader.style.visibility = 'hidden'
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