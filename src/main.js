import './styles.scss'
import mapa from './components/mapa'
import sumario from './components/sumario'
import ficha from './components/ficha'

function loadCanvas(){
	if(document.getElementsByTagName('canvas')[0] == undefined){
		setTimeout(function(){ 
			document.getElementsByTagName('canvas')[0].getContext('2d').globalCompositeOperation = 'multiply';
		}, 3000);
	}
	else {
		document.getElementsByTagName('canvas')[0].getContext('2d').globalCompositeOperation = 'multiply';
	}
}

function ready(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		fn();
	}
	else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
ready(loadCanvas)

new Vue({
	el: '#app',
	data:{
		projectId: undefined,
		isFocused: false,
		display:{
			mapa: true,
			sumario: true,
			ficha: false,
		},
		api: {
			fetching: false,
			message: '',
			error: false
		},
		monitoramento: undefined,
		hiperlinks: undefined
	}, 
	computed:{
		apiPath() { return 'https://spurb.github.io/piu-monitoramento-backend/'}
	},
	components: {
		mapa,
		sumario,
		ficha
	},
	created(){
		this.fetchFile(this.apiPath, 'monitoramento')
		this.fetchFile(this.apiPath, 'hiperlinks')
	},
	watch:{
		projectId(newprop, oldprop){
			if(this.projectId != undefined) {
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
	methods:{
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
			if (id == undefined){
				this.display.sumario = true
				this.display.ficha = false
				this.isFocused = false
			} 
		}
	}
})