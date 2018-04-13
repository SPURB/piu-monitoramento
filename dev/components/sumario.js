let sumario = {
	name:'sumario',
	data (){
		return {
			data: monitoramento, 
			etapas: {}
		}
	},
	methods:{
		subSecaoValidation(){
			let obj = {
				etapa1: false,
				etapa2: false,
				etapa3: false,
			};
			this.data.map(function(elem) {
				if (elem.etapas != 0) {
					switch (elem.etapas){
						case 1: obj.etapa1 = true; break;
						case 2: obj.etapa2 = true; break;
						case 3: obj.etapa3 = true; break;
					}
				}
			})
			this.etapas = obj;
		}
	},
	mounted(){
		this.subSecaoValidation();
	},
	template: `
	<div id="sumario">
		<h1 v-if="etapas.etapa1">etapa 1</h1>
		<h1 v-if="etapas.etapa2">etapa 2</h1>
		<h1 v-if="etapas.etapa3">etapa 3</h1>
	</div>
	`
}
