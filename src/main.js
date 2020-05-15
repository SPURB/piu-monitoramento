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
	created(){
		[
			'projetos',
			'tramitacao',
		].forEach(table => {
			this.fetchJson(table)
				.then(res => this[table] = res)
				.catch(err => {
					this.error.status = true
					this.error.message = err
				})
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