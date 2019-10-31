let vm = new Vue({
	el: '#app',
	data:{
		projectId: undefined,
		isFocused: false,
		display:{
			mapa: true,
			sumario: true,
			ficha: false,
		},
		monitoramento: undefined,
		hiperlinks: undefined
	}, 
	computed:{
		apiPath() {
			if( 
				location.port == '3000'	||
				location.port == '8080' ||
				location.port == '8082' ||
				location.port == '7080'){
				return 'http://spurbsp163:7080/piu-monitoramento-backend/'
			}
			else{
				return 'https://api.gestaourbana.prefeitura.sp.gov.br/piu-monitoramento/'
			}
		}
	},
	components: {
		mapa,
		sumario,
		ficha
	},
	created(){
		this.fetchAPI(this.apiPath)
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
		fetchAPI(path){
			let app = this;
			var ajax = new XMLHttpRequest();
			ajax.open("GET", path, true);
			ajax.send();
			ajax.onreadystatechange = function() {
				if (ajax.readyState == 4 && ajax.status == 200) {
					var data = JSON.parse(ajax.responseText);
					app.monitoramento = data.monitoramento
					app.hiperlinks = data.hiperlinks
				}
			}
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